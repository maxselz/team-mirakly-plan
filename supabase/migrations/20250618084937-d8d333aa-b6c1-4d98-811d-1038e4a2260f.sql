
-- Create teams table
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team members table for many-to-many relationship
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo' NOT NULL CHECK (status IN ('todo', 'in-progress', 'done')),
  priority TEXT DEFAULT 'medium' NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Teams policies
CREATE POLICY "Users can view teams they are members of" 
  ON public.teams 
  FOR SELECT 
  USING (
    id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create teams" 
  ON public.teams 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Team creators can update their teams" 
  ON public.teams 
  FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Team creators can delete their teams" 
  ON public.teams 
  FOR DELETE 
  USING (auth.uid() = created_by);

-- Team members policies
CREATE POLICY "Users can view team members for teams they belong to" 
  ON public.team_members 
  FOR SELECT 
  USING (
    team_id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team creators can add members" 
  ON public.team_members 
  FOR INSERT 
  WITH CHECK (
    team_id IN (
      SELECT id FROM public.teams WHERE created_by = auth.uid()
    )
  );

CREATE POLICY "Team creators can remove members" 
  ON public.team_members 
  FOR DELETE 
  USING (
    team_id IN (
      SELECT id FROM public.teams WHERE created_by = auth.uid()
    )
  );

-- Tasks policies
CREATE POLICY "Users can view tasks for teams they belong to" 
  ON public.tasks 
  FOR SELECT 
  USING (
    team_id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team members can create tasks" 
  ON public.tasks 
  FOR INSERT 
  WITH CHECK (
    team_id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    ) AND auth.uid() = created_by
  );

CREATE POLICY "Team members can update tasks" 
  ON public.tasks 
  FOR UPDATE 
  USING (
    team_id IN (
      SELECT team_id FROM public.team_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Task creators can delete tasks" 
  ON public.tasks 
  FOR DELETE 
  USING (auth.uid() = created_by);

-- Create indexes for better performance
CREATE INDEX idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX idx_tasks_team_id ON public.tasks(team_id);
CREATE INDEX idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX idx_tasks_status ON public.tasks(status);

-- Create function to automatically add team creator as member
CREATE OR REPLACE FUNCTION public.add_team_creator_as_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.team_members (team_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'admin');
  RETURN NEW;
END;
$$;

-- Create trigger to automatically add team creator as member
CREATE TRIGGER on_team_created
  AFTER INSERT ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.add_team_creator_as_member();
