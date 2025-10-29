import { CheckCircle2 } from "lucide-react";

const About = () => {
  const values = [
    "Innovation continue",
    "Accessibilité technologique",
    "Performance et simplicité",
    "Accompagnement humain"
  ];

  const reasons = [
    {
      title: "Expertise IA & No-code",
      description: "Maîtrise complète des outils d'intelligence artificielle et no-code les plus performants"
    },
    {
      title: "Rapidité d'exécution",
      description: "Livraison rapide sans compromis sur la qualité grâce à nos méthodes agiles"
    },
    {
      title: "Design professionnel",
      description: "Interfaces modernes et élégantes qui reflètent l'excellence de votre marque"
    },
    {
      title: "Solutions locales",
      description: "Adaptées au contexte africain et à la francophonie avec un accompagnement personnalisé"
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            À propos d'<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Offotechword</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nous aidons les entreprises, startups et indépendants à tirer parti de l'intelligence artificielle 
            pour automatiser, créer et innover sans coder. Notre mission est de démocratiser l'accès à l'IA 
            et au no-code pour tous.
          </p>
        </div>

        {/* Values */}
        <div className="max-w-2xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">Nos valeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">Pourquoi nous choisir</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-bold mb-3 text-primary">{reason.title}</h4>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
