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
    const githubToken = Deno.env.get('GITHUB_TOKEN');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!githubToken) {
      throw new Error('GITHUB_TOKEN not configured');
    }

    console.log('Fetching GitHub repos for BOKA26...');

    // Fetch repos from GitHub API
    const githubResponse = await fetch('https://api.github.com/users/BOKA26/repos?sort=updated&per_page=100', {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Supabase-Function'
      }
    });

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('GitHub API error:', errorText);
      throw new Error(`GitHub API returned ${githubResponse.status}: ${errorText}`);
    }

    const repos: GitHubRepo[] = await githubResponse.json();
    console.log(`Found ${repos.length} GitHub repos`);

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Transform and prepare projects for insert
    const projects = repos
      .filter(repo => !repo.name.includes('lovotech-nexus')) // Exclude this portfolio itself
      .map(repo => ({
        title: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        description: repo.description || `Projet ${repo.language || 'GitHub'}`,
        image: repo.homepage && repo.homepage.includes('unsplash') 
          ? repo.homepage 
          : `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop`,
        tags: [
          ...(repo.topics || []).slice(0, 3),
          ...(repo.language ? [repo.language] : [])
        ].slice(0, 4),
        link: repo.homepage || repo.html_url,
        created_at: repo.created_at
      }));

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
