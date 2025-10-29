import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show back button when scrolled down
      setShowBackButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: "Accueil", id: "hero" },
    { label: "À propos", id: "about" },
    { label: "Services", id: "services" },
    { label: "Projets", id: "projects" },
    { label: "Blog", id: "blog" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Offotechword
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {showBackButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("hero")}
                className="gap-2"
              >
                <ArrowLeft size={16} />
                Retour au Portfolio
              </Button>
            )}
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button variant="hero" size="sm">
              Essayer le chatbot
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {showBackButton && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollToSection("hero")}
                  className="gap-2 w-full"
                >
                  <ArrowLeft size={16} />
                  Retour au Portfolio
                </Button>
              )}
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button variant="hero" size="sm" className="w-full">
                Essayer le chatbot
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
