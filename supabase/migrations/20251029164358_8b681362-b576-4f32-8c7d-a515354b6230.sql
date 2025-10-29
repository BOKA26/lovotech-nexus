-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (portfolio is public)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to insert projects
CREATE POLICY "Authenticated users can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update projects
CREATE POLICY "Authenticated users can update projects" 
ON public.projects 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects" 
ON public.projects 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Insert sample projects
INSERT INTO public.projects (title, description, image, tags, link) VALUES
('Chatbot IA E-commerce', 'Assistant virtuel intelligent pour une boutique en ligne avec recommandations personnalisées', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop', ARRAY['Chatbot', 'IA', 'E-commerce'], '#'),
('Automatisation RH', 'Système automatisé de gestion des candidatures et onboarding des employés', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', ARRAY['Automatisation', 'RH', 'No-code'], '#'),
('Plateforme SaaS Formation', 'Solution complète de formation en ligne avec suivi des progrès et certification', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop', ARRAY['SaaS', 'Formation', 'Web'], '#'),
('Dashboard Analytics IA', 'Tableau de bord intelligent avec analyses prédictives et visualisations avancées', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', ARRAY['IA', 'Analytics', 'Dashboard'], '#');