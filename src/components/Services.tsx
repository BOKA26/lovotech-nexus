import { Bot, Zap, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import chatbotIcon from "@/assets/chatbot-icon.png";
import automationIcon from "@/assets/automation-icon.png";

const Services = () => {
  const services = [
    {
      icon: <Sparkles size={32} />,
      title: "Intégration d'outils IA",
      description: "Automatisation complète de vos processus métiers avec les meilleurs outils d'intelligence artificielle du marché",
      features: ["ChatGPT & GPT-4", "Automatisation workflow", "Analyse de données", "Génération de contenu"]
    },
    {
      icon: <Bot size={32} />,
      image: chatbotIcon,
      title: "Chatbots intelligents",
      description: "Support client 24/7 avec des conversations fluides et naturelles grâce à l'IA conversationnelle",
      features: ["Réponses instantanées", "Support multilingue", "Base de connaissances", "Intégration WhatsApp"]
    },
    {
      icon: <Zap size={32} />,
      image: automationIcon,
      title: "Automatisation de processus",
      description: "Simplifiez vos tâches répétitives et gagnez un temps précieux avec des automatisations intelligentes",
      features: ["Workflows personnalisés", "Intégrations API", "Synchronisation de données", "Notifications automatiques"]
    },
    {
      icon: <GraduationCap size={32} />,
      title: "Formation & accompagnement IA",
      description: "Devenez autonome dans l'utilisation des outils no-code et d'intelligence artificielle",
      features: ["Sessions personnalisées", "Documentation complète", "Support continu", "Cas pratiques"]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Nos <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Des solutions complètes d'intelligence artificielle sans code pour propulser votre activité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:scale-110 transition-transform">
                  {service.image ? (
                    <img src={service.image} alt={service.title} className="w-8 h-8" />
                  ) : (
                    service.icon
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
              
              <ul className="space-y-2 mt-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="xl" onClick={scrollToContact}>
            Obtenez un audit gratuit maintenant
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
