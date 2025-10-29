import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Yao M.",
      role: "CEO de StartHub Africa",
      content: "Offotechword a révolutionné notre productivité. Leur automatisation no-code est incroyable. Nous avons gagné plus de 15 heures par semaine!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "Aminata K.",
      role: "Directrice Marketing, EduTech CI",
      content: "Le chatbot IA développé pour notre plateforme a transformé notre support client. Réponses instantanées 24/7, nos clients adorent!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=45"
    },
    {
      name: "Ibrahim S.",
      role: "Fondateur, AgriConnect",
      content: "Grâce à Offotechword, nous avons lancé notre SaaS en moins de 3 semaines. Leur expertise no-code est exceptionnelle.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=33"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ce que disent nos <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">clients</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Des entrepreneurs et entreprises qui nous font confiance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="text-accent/30 mb-4" size={40} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-accent/20"
                />
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
