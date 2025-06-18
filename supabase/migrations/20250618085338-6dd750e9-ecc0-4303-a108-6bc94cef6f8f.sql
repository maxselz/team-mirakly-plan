
-- First, let's check which constraints exist and add only the missing ones
-- Add foreign key for team_members to profiles if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'team_members_user_id_fkey' 
        AND table_name = 'team_members'
    ) THEN
        ALTER TABLE team_members ADD CONSTRAINT team_members_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES profiles(id);
    END IF;
END $$;

-- Add status constraint if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'tasks_status_check' 
        AND table_name = 'tasks'
    ) THEN
        ALTER TABLE tasks ADD CONSTRAINT tasks_status_check 
            CHECK (status IN ('todo', 'in-progress', 'done'));
    END IF;
END $$;

-- Add priority constraint if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'tasks_priority_check' 
        AND table_name = 'tasks'
    ) THEN
        ALTER TABLE tasks ADD CONSTRAINT tasks_priority_check 
            CHECK (priority IN ('low', 'medium', 'high'));
    END IF;
END $$;
