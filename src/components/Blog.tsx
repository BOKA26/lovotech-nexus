import { Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const posts = [
    {
      title: "Comment l'IA transforme les entreprises en 2025",
      category: "Intelligence artificielle",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      summary: "Découvrez les tendances IA qui révolutionnent le monde des affaires et comment les adopter facilement",
      date: "15 Jan 2025"
    },
    {
      title: "Créer un chatbot intelligent sans coder",
      category: "Tutoriels",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
      summary: "Guide complet pour créer votre premier chatbot IA en utilisant des outils no-code",
      date: "12 Jan 2025"
    },
    {
      title: "Automatisation: Gagnez 20h par semaine",
      category: "Automatisation no-code",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      summary: "Les meilleures pratiques pour automatiser vos tâches répétitives et booster votre productivité",
      date: "10 Jan 2025"
    },
    {
      title: "Construire un SaaS sans développeur",
      category: "Création de SaaS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      summary: "De l'idée au lancement: comment créer votre SaaS avec des outils no-code",
      date: "8 Jan 2025"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Blog <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">IA & Automatisation</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Actualités, tutoriels et conseils pour maîtriser l'intelligence artificielle sans coder
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <article 
              key={index}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-56">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent/90 text-white">
                    <Tag size={12} className="mr-1" />
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4">{post.summary}</p>
                
                <Button variant="ghost" className="px-0 hover:text-accent">
                  Lire l'article →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
