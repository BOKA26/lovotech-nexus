import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title: "Chatbot IA E-commerce",
      description: "Assistant virtuel intelligent pour une boutique en ligne avec recommandations personnalisées",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      tags: ["Chatbot", "IA", "E-commerce"],
      link: "#"
    },
    {
      title: "Automatisation RH",
      description: "Système automatisé de gestion des candidatures et onboarding des employés",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      tags: ["Automatisation", "RH", "No-code"],
      link: "#"
    },
    {
      title: "Plateforme SaaS Formation",
      description: "Solution complète de formation en ligne avec suivi des progrès et certification",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
      tags: ["SaaS", "Formation", "Web"],
      link: "#"
    },
    {
      title: "Dashboard Analytics IA",
      description: "Tableau de bord intelligent avec analyses prédictives et visualisations avancées",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      tags: ["IA", "Analytics", "Dashboard"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Projets <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Réalisés</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez quelques-unes de nos réalisations les plus récentes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <a 
                  href={project.link}
                  className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
                >
                  Voir le projet
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
