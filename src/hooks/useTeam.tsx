
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useTeam = (teamId: string) => {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          team_members(
            id,
            role,
            joined_at,
            user_id
          )
        `)
        .eq('id', teamId)
        .single();

      if (error) throw error;
      
      // Récupérer les profils séparément
      const userIds = data.team_members?.map(member => member.user_id) || [];
      let profiles = [];
      
      if (userIds.length > 0) {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, username')
          .in('id', userIds);
        
        if (!profilesError && profilesData) {
          profiles = profilesData;
        }
      }
      
      return {
        ...data,
        members: data.team_members?.map(member => {
          const profile = profiles.find(p => p.id === member.user_id);
          return {
            id: member.id,
            name: profile?.full_name || profile?.username || 'Unknown',
            role: member.role,
            joinedAt: member.joined_at
          };
        }) || []
      };
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, name, description }: { id: string; name: string; description?: string }) => {
      const { data, error } = await supabase
        .from('teams')
        .update({ name, description, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['team', data.id] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      toast({
        title: "Success!",
        description: "Team updated successfully",
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
