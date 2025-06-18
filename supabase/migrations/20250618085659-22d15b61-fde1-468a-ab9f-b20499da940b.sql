
-- Add missing foreign key for team_members.user_id to profiles
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
