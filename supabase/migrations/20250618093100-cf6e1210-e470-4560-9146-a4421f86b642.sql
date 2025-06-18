
-- Créer la table users seulement si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Créer la table passwords seulement si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.passwords (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Supprimer les colonnes non utilisées de la table profiles (en ignorant les erreurs si elles n'existent pas)
ALTER TABLE public.profiles DROP COLUMN IF EXISTS full_name;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS avatar_url;

-- Ajouter la référence vers la table users dans profiles seulement si elle n'existe pas
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.users(id) ON DELETE CASCADE;

-- Créer des index pour améliorer les performances (seulement s'ils n'existent pas)
CREATE INDEX IF NOT EXISTS idx_passwords_user_id ON public.passwords(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);

-- Activer RLS sur les nouvelles tables (ignorer l'erreur si déjà activé)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passwords ENABLE ROW LEVEL SECURITY;

-- Créer des politiques RLS pour users (supprimer d'abord si elles existent)
DROP POLICY IF EXISTS "Users can view their own user record" ON public.users;
CREATE POLICY "Users can view their own user record" 
  ON public.users 
  FOR SELECT 
  USING (id = (SELECT user_id FROM public.profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Users can update their own user record" ON public.users;
CREATE POLICY "Users can update their own user record" 
  ON public.users 
  FOR UPDATE 
  USING (id = (SELECT user_id FROM public.profiles WHERE id = auth.uid()));

-- Créer des politiques RLS pour passwords (supprimer d'abord si elles existent)
DROP POLICY IF EXISTS "Users can update their own password" ON public.passwords;
CREATE POLICY "Users can update their own password" 
  ON public.passwords 
  FOR UPDATE 
  USING (user_id = (SELECT user_id FROM public.profiles WHERE id = auth.uid()));
