
-- Modify the email column to remove email format requirement
-- and just require minimum 4 characters
ALTER TABLE public.profiles 
ALTER COLUMN email TYPE TEXT;

-- Add a check constraint for minimum 4 characters
ALTER TABLE public.profiles 
ADD CONSTRAINT email_min_length CHECK (length(email) >= 4);

-- Update the handle_new_user function to use a simpler email format
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'username', '')
  );
  RETURN NEW;
END;
$$;
