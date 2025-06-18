
-- Add foreign key constraints that are missing

-- Add foreign key for tasks.assigned_to to profiles.id
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

-- Add foreign key for tasks.created_by to profiles.id  
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

-- Add foreign key for teams.created_by to profiles.id
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
