
-- Add foreign key for tasks.assigned_to to profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'tasks_assigned_to_fkey' 
        AND table_name = 'tasks'
    ) THEN
        ALTER TABLE tasks ADD CONSTRAINT tasks_assigned_to_fkey 
            FOREIGN KEY (assigned_to) REFERENCES profiles(id);
    END IF;
END $$;

-- Add foreign key for tasks.created_by to profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'tasks_created_by_fkey' 
        AND table_name = 'tasks'
    ) THEN
        ALTER TABLE tasks ADD CONSTRAINT tasks_created_by_fkey 
            FOREIGN KEY (created_by) REFERENCES profiles(id);
    END IF;
END $$;

-- Add foreign key for teams.created_by to profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'teams_created_by_fkey' 
        AND table_name = 'teams'
    ) THEN
        ALTER TABLE teams ADD CONSTRAINT teams_created_by_fkey 
            FOREIGN KEY (created_by) REFERENCES profiles(id);
    END IF;
END $$;

-- Add foreign key for team_members.team_id to teams if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'team_members_team_id_fkey' 
        AND table_name = 'team_members'
    ) THEN
        ALTER TABLE team_members ADD CONSTRAINT team_members_team_id_fkey 
            FOREIGN KEY (team_id) REFERENCES teams(id);
    END IF;
END $$;
