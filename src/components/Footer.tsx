import { Linkedin, Github, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { label: "Accueil", id: "hero" },
    { label: "À propos", id: "about" },
    { label: "Services", id: "services" },
    { label: "Projets", id: "projects" },
    { label: "Blog", id: "blog" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-primary/5 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Offotechword
            </h3>
            <p className="text-muted-foreground mb-6">
              L'IA sans code au service de votre succès. Automatisez, générez et innovez avec nos solutions intelligentes.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://wa.me/2250757705986" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="mailto:bsk@offotechword.com" className="hover:text-primary transition-colors">
                  bsk@offotechword.com
                </a>
              </li>
              <li>
                <a href="tel:+2250757705986" className="hover:text-primary transition-colors">
                  +225 07 57 70 59 86
                </a>
              </li>
              <li>Abidjan, Côte d'Ivoire</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>© {currentYear} Offotechword – Propulsé par l'IA sans code</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
