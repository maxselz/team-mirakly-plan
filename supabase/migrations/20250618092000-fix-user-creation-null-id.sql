-- Fix foreign key constraints to prevent null ID errors during user creation
-- This migration ensures all user references point to the correct tables consistently

-- First, remove the conflicting foreign key constraints
ALTER TABLE public.teams DROP CONSTRAINT IF EXISTS teams_created_by_fkey;
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_assigned_to_fkey;
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_created_by_fkey;
ALTER TABLE public.team_members DROP CONSTRAINT IF EXISTS team_members_user_id_fkey;

-- Remove the original foreign key constraints that reference auth.users
ALTER TABLE public.teams DROP CONSTRAINT IF EXISTS teams_created_by_fkey1;
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_assigned_to_fkey1;
ALTER TABLE public.tasks DROP CONSTRAINT IF EXISTS tasks_created_by_fkey1;
ALTER TABLE public.team_members DROP CONSTRAINT IF EXISTS team_members_user_id_fkey1;

-- Now add consistent foreign key constraints that all reference profiles(id)
-- since profiles.id = auth.users.id in our user creation function

ALTER TABLE public.teams 
ADD CONSTRAINT teams_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.tasks 
ADD CONSTRAINT tasks_assigned_to_fkey 
FOREIGN KEY (assigned_to) REFERENCES public.profiles(id) ON DELETE SET NULL;

ALTER TABLE public.tasks 
ADD CONSTRAINT tasks_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.team_members 
ADD CONSTRAINT team_members_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Ensure the add_team_creator_as_member function works correctly
-- Since profiles.id = auth.users.id, this should work without changes
-- but let's make sure the function is robust

CREATE OR REPLACE FUNCTION public.add_team_creator_as_member()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Insert the team creator as an admin member
  -- NEW.created_by is the auth.users.id, which equals profiles.id
  INSERT INTO public.team_members (team_id, user_id, role)
  VALUES (NEW.id, NEW.created_by, 'admin');
  RETURN NEW;
END;
$$;

-- Make sure the create_user_with_password function creates the profile correctly
-- Update to ensure profile.id matches auth.users.id consistently
CREATE OR REPLACE FUNCTION public.create_user_with_password(
  p_username TEXT,
  p_password TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
  new_auth_user_id UUID;
  password_hash TEXT;
BEGIN
  -- Vérifier si le username existe déjà
  IF EXISTS (SELECT 1 FROM public.users WHERE username = p_username) THEN
    RAISE EXCEPTION 'Username already exists';
  END IF;
  
  -- Créer un hash du mot de passe
  password_hash := crypt(p_password, gen_salt('bf'));
  
  -- Créer l'utilisateur dans auth.users avec un email temporaire
  INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (
    p_username || '@temp.local',
    password_hash,
    now(),
    jsonb_build_object('username', p_username)
  )
  RETURNING id INTO new_auth_user_id;
  
  -- Créer l'utilisateur dans notre table users
  INSERT INTO public.users (username)
  VALUES (p_username)
  RETURNING id INTO new_user_id;
  
  -- Créer le mot de passe
  INSERT INTO public.passwords (user_id, password_hash)
  VALUES (new_user_id, password_hash);
  
  -- Créer le profil avec l'ID correspondant à auth.users.id
  -- This is crucial: profiles.id MUST equal auth.users.id
  INSERT INTO public.profiles (id, username, user_id)
  VALUES (new_auth_user_id, p_username, new_user_id);
  
  RETURN new_user_id;
END;
$$; 