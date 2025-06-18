
-- Supprimer d'abord le trigger qui dépend de la fonction
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Maintenant supprimer la fonction
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Créer une nouvelle fonction pour gérer la création d'utilisateur
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
  
  -- Créer un hash du mot de passe (simple pour l'exemple, utilisez bcrypt en production)
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
  
  -- Créer le profil
  INSERT INTO public.profiles (id, username, user_id)
  VALUES (new_auth_user_id, p_username, new_user_id);
  
  RETURN new_user_id;
END;
$$;
