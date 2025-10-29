import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Puis-je utiliser vos services sans savoir coder ?",
      answer: "Absolument ! C'est justement notre spécialité. Tous nos services sont conçus pour être accessibles sans aucune connaissance en programmation. Nous utilisons des outils no-code et l'intelligence artificielle pour créer vos solutions."
    },
    {
      question: "Quels outils utilisez-vous ?",
      answer: "Nous utilisons les meilleurs outils du marché : Lovable, Make.com, n8n pour l'automatisation, ChatGPT et autres IA pour l'intelligence artificielle, Airtable et Notion pour les bases de données, et bien d'autres selon vos besoins spécifiques."
    },
    {
      question: "Créez-vous des SaaS complets ?",
      answer: "Oui ! Nous créons des SaaS (Software as a Service) complets et fonctionnels en utilisant des plateformes no-code. De l'authentification aux paiements en passant par les bases de données, nous gérons tout le cycle de développement."
    },
    {
      question: "Combien coûte une automatisation IA ?",
      answer: "Le coût varie selon la complexité du projet. Une automatisation simple peut commencer à partir de 150 000 FCFA, tandis qu'un projet plus complexe avec IA intégrée peut aller de 500 000 FCFA à plusieurs millions. Contactez-nous pour un devis personnalisé gratuit."
    },
    {
      question: "Quel est le délai de livraison ?",
      answer: "La plupart de nos projets sont livrés en 2 à 4 semaines. Pour des projets simples (chatbot, automatisation basique), nous pouvons livrer en 48h à 1 semaine. Les SaaS complexes peuvent prendre 4 à 8 semaines selon les fonctionnalités."
    },
    {
      question: "Offrez-vous un support après la livraison ?",
      answer: "Oui, nous offrons un support gratuit de 30 jours après la livraison. Ensuite, vous pouvez souscrire à un forfait de maintenance mensuel. Nous proposons également des formations pour que vous deveniez autonome."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Questions <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Fréquentes</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Tout ce que vous devez savoir sur nos services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
