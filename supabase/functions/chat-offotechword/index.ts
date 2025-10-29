import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS = 10; // per minute per IP
const WINDOW_MS = 60000; // 1 minute

// Cleanup old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const recent = timestamps.filter(t => now - t < WINDOW_MS);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
    }
  }
}, 300000);

const SYSTEM_PROMPT = `Tu es OffotechwordBot, l'assistant IA officiel d'Offotechword.

CONTEXTE ENTREPRISE:
Mission: Offotechword aide les entreprises, startups et indépendants à tirer parti de l'intelligence artificielle pour automatiser, innover et croître sans écrire une seule ligne de code.

Valeurs: Innovation, Accessibilité, Performance, Accompagnement humain

COORDONNÉES:
- Email: bsk@offotechword.com
- Téléphone: +225 07 57 70 59 86
- Adresse: Abidjan, Côte d'Ivoire
- Horaires: Lundi–Vendredi : 8h00–18h00 | Samedi : 9h00–13h00

SERVICES:
1. Intégration d'outils IA: Automatisation complète avec OpenAI, Supabase, n8n. Gain de temps, productivité, réduction des erreurs.
2. Chatbots intelligents: Chatbots RAG 24/7 sur web, WhatsApp, Telegram. Support client rapide et fluide.
3. Automatisation de processus: Marketing, comptabilité, administration avec n8n et Supabase.
4. Formation IA sans code: Ateliers pratiques pour particuliers, entreprises, enseignants.

FAQ CLÉS:
- Pas besoin de compétences techniques, tout est sans code
- Création de SaaS complets avec Lovable et Supabase
- Audit gratuit disponible
- Outils: Lovable, Supabase, n8n, Resend
- Délais: Landing page 2-5 jours, chatbot 1-2 semaines, SaaS 3-6 semaines

TON: Professionnel, amical et rassurant. Réponds en français clair.

ACTIONS:
- Si demande d'audit → Proposer l'audit gratuit
- Si demande de prix → Poser 3 questions: type projet, objectif, délai
- Si demande contact → Donner les coordonnées complètes
- Si demande portfolio → Lister les réalisations et proposer exemples
- Si demande formation → Présenter les formations et inscription

MESSAGE D'ACCUEIL: "Bonjour 👋 Je suis OffotechwordBot, votre assistant IA. Je peux vous aider à découvrir nos services, obtenir un audit gratuit, ou discuter de votre projet d'automatisation."

FALLBACK: Si tu ne sais pas, propose un audit gratuit ou contact avec un expert.

Réponds de manière concise, claire et actionnable.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    const now = Date.now();
    const userRequests = rateLimitMap.get(clientIP) || [];
    const recentRequests = userRequests.filter(t => now - t < WINDOW_MS);
    
    if (recentRequests.length >= MAX_REQUESTS) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: "Trop de requêtes. Veuillez réessayer dans une minute." 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Update rate limit tracker
    rateLimitMap.set(clientIP, [...recentRequests, now]);

    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requêtes atteinte, veuillez réessayer plus tard." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits insuffisants, veuillez contacter l'administrateur." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erreur de l'API IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
