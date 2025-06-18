
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
          assigned_profile:profiles!tasks_assigned_to_fkey(full_name, username),
          team:teams(name)
        `);

      if (teamId) {
        query = query.eq('team_id', teamId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return data.map(task => ({
        ...task,
        status: task.status as 'todo' | 'in-progress' | 'done',
        priority: task.priority as 'low' | 'medium' | 'high',
        assignedTo: task.assigned_profile?.full_name || task.assigned_profile?.username || 'Unassigned',
        teamName: task.team?.name
      }));
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
