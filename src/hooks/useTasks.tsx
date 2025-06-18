
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useTasks = (teamId?: string) => {
  return useQuery({
    queryKey: ['tasks', teamId],
    queryFn: async () => {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          team:teams!tasks_team_id_fkey(name)
        `);

      if (teamId) {
        query = query.eq('team_id', teamId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Récupérer les profils séparément pour éviter les problèmes de relation
      const taskIds = data?.map(task => task.assigned_to).filter(Boolean) || [];
      let profiles = [];
      
      if (taskIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, username')
          .in('id', taskIds);
        
        if (!profilesError && profilesData) {
          profiles = profilesData;
        }
      }
      
      return data?.map(task => {
        const assignedProfile = profiles.find(p => p.id === task.assigned_to);
        return {
          ...task,
          status: task.status as 'todo' | 'in-progress' | 'done',
          priority: task.priority as 'low' | 'medium' | 'high',
          assignedTo: assignedProfile?.full_name || assignedProfile?.username || 'Unassigned',
          teamName: task.team?.name
        };
      }) || [];
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (taskData: {
      teamId: string;
      title: string;
      description?: string;
      assignedTo: string;
      priority: string;
      dueDate?: string;
      status: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Find the assigned user by username
      const { data: assignedUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', taskData.assignedTo)
        .single();

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          team_id: taskData.teamId,
          title: taskData.title,
          description: taskData.description,
          assigned_to: assignedUser?.id,
          priority: taskData.priority,
          due_date: taskData.dueDate,
          status: taskData.status,
          created_by: user.id
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', data.team_id] });
      toast({
        title: "Success!",
        description: "Task created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      const { data, error } = await supabase
        .from('tasks')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['tasks', data.team_id] });
      toast({
        title: "Success!",
        description: "Task updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
};
