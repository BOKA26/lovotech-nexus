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

    // Manual mapping of project names to deployed URLs
    const projectUrlMap: Record<string, string> = {
      'dadi-dignity-compass': 'https://ong-dadi.offotechword.com',
      'flock-folio-app': 'https://flock-folio-app.lovable.app',
      'chambre-haute-connect': 'https://chambre-haute.lovable.app',
      'focal-convert': 'https://shop.offotechword.com',
      'mevos': 'https://offotechword.lovable.app',
      'ai-for-all-biz': 'https://offotechword.lovable.app',
    };

    // Transform and prepare projects for insert
    const projects = repos
      .filter(repo => !repo.name.includes('lovotech-nexus')) // Exclude this portfolio itself
      .map(repo => {
        // Determine the project link - prioritize manual mapping
        let projectLink: string;
        
        // Check manual mapping first
        if (projectUrlMap[repo.name]) {
          projectLink = projectUrlMap[repo.name];
        } else if (repo.homepage && repo.homepage.trim() !== '') {
          // Use the configured homepage (deployed site)
          projectLink = repo.homepage;
        } else if (repo.name.endsWith('.github.io') || repo.name === 'boka26.github.io') {
          // Only construct GitHub Pages URL for actual GitHub Pages repos
          projectLink = `https://boka26.github.io/${repo.name.replace('.github.io', '')}/`;
        } else {
          // Fallback to GitHub repository link if no deployment exists
          projectLink = repo.html_url;
        }
        
        return {
          title: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: repo.description || `Projet ${repo.language || 'GitHub'}`,
          image: repo.homepage && repo.homepage.includes('unsplash') 
            ? repo.homepage 
            : `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop`,
          tags: [
            ...(repo.topics || []).slice(0, 3),
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
