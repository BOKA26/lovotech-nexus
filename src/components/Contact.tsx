import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Le nom est requis").max(100, "Le nom est trop long (max 100 caractères)"),
  email: z.string().trim().email("Email invalide").max(255, "L'email est trop long"),
  phone: z.string().trim().max(20, "Le numéro est trop long").optional().or(z.literal("")),
  projectType: z.string().trim().max(100, "Le type de projet est trop long").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(2000, "Le message est trop long (max 2000 caractères)")
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Erreur de validation",
        description: result.error.errors[0].message,
        variant: "destructive"
      });
      return;
    }
    
    // TODO: Integrate with Resend or backend
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Contactez-<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">nous</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Prêt à transformer votre entreprise avec l'IA ? Parlons de votre projet
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nom complet</label>
                <Input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <Input 
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+225 XX XX XX XX XX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Type de projet</label>
                <Input 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  placeholder="Ex: Chatbot IA, Automatisation, SaaS..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet..."
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="order-1 md:order-2 space-y-8">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a href="mailto:bsk@offotechword.com" className="text-muted-foreground hover:text-primary transition-colors">
                    bsk@offotechword.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Téléphone</h3>
                  <a href="tel:+2250757705986" className="text-muted-foreground hover:text-accent transition-colors">
                    +225 07 57 70 59 86
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Adresse</h3>
                  <p className="text-muted-foreground">
                    Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Horaires</h3>
                  <p className="text-muted-foreground">
                    Lundi–Vendredi : 8h00–18h00<br />
                    Samedi : 9h00–13h00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
