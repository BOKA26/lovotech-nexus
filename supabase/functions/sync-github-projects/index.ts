import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  created_at: string;
  language: string | null;
  homepage: string | null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Authentication required' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const githubToken = Deno.env.get('GITHUB_TOKEN');

    // Create Supabase client with auth header to verify user
    const supabaseAuth = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      console.log('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid token' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabaseAuth
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (roleError || !roleData) {
      console.log('Admin check failed - User:', user.id);
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin role required' }), 
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin user verified:', user.id);

    if (!githubToken) {
      throw new Error('GITHUB_TOKEN not configured');
    }

    console.log('Fetching GitHub repos for authenticated user via /user/repos...');

    // Fetch repos from GitHub API using the authenticated endpoint to include private repos
    const githubResponse = await fetch('https://api.github.com/user/repos?per_page=100&affiliation=owner,collaborator,organization_member', {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'Supabase-Function'
      }
    });

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('GitHub API error:', errorText);
      throw new Error(`GitHub API returned ${githubResponse.status}: ${errorText}`);
    }

    const repos: GitHubRepo[] = await githubResponse.json();
    console.log(`Found ${repos.length} GitHub repos (including private if accessible)`);

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Manual mapping of project names to deployed URLs and metadata
    const projectMetadata: Record<string, { url: string; image: string; category: string }> = {
      'dadi-dignity-compass': {
        url: 'https://ong-dadi.offotechword.com',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
        category: 'ONG & Social'
      },
      'flock-folio-app': {
        url: 'https://flock-folio-app.lovable.app',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        category: 'Portfolio'
      },
      'chambre-haute-connect': {
        url: 'https://chambre-haute.lovable.app',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
        category: 'Business'
      },
      'focal-convert': {
        url: 'https://shop.offotechword.com',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
        category: 'E-commerce'
      },
      'mevos': {
        url: 'https://offotechword.lovable.app',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
        category: 'Tech & Innovation'
      },
      'ai-for-all-biz': {
        url: 'https://offotechword.lovable.app',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        category: 'Intelligence Artificielle'
      },
    };

    // Transform and prepare projects for insert
    const projects = repos
      .filter(repo => !repo.name.includes('lovotech-nexus')) // Exclude this portfolio itself
      .map(repo => {
        // Determine project metadata
        const metadata = projectMetadata[repo.name];
        let projectLink: string;
        let projectImage: string;
        let projectCategory: string;
        
        if (metadata) {
          projectLink = metadata.url;
          projectImage = metadata.image;
          projectCategory = metadata.category;
        } else if (repo.homepage && repo.homepage.trim() !== '') {
          projectLink = repo.homepage;
          projectImage = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop`;
          projectCategory = 'Web';
        } else if (repo.name.endsWith('.github.io') || repo.name === 'boka26.github.io') {
          projectLink = `https://boka26.github.io/${repo.name.replace('.github.io', '')}/`;
          projectImage = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop`;
          projectCategory = 'Web';
        } else {
          projectLink = repo.html_url;
          projectImage = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop`;
          projectCategory = 'GitHub';
        }
        
        return {
          title: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: repo.description || `Projet ${projectCategory}`,
          image: projectImage,
          tags: [
            projectCategory,
            ...(repo.topics || []).slice(0, 2),
            ...(repo.language ? [repo.language] : [])
          ].slice(0, 4),
          link: projectLink,
          created_at: repo.created_at
        };
      });

    console.log(`Prepared ${projects.length} projects for sync`);

    // Delete existing projects and insert new ones
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.error('Error deleting old projects:', deleteError);
      throw deleteError;
    }

    // Insert new projects
    const { data, error: insertError } = await supabase
      .from('projects')
      .insert(projects)
      .select();

    if (insertError) {
      console.error('Error inserting projects:', insertError);
      throw insertError;
    }

    console.log(`Successfully synced ${data?.length || 0} projects`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: data?.length || 0,
        projects: data 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in sync-github-projects:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
