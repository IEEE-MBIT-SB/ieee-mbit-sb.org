import { motion } from "framer-motion";
import { Calendar, Users, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import Hero from "./Hero";

const stats = [
  { icon: Calendar, value: "50+", label: "Events Organized" },
  { icon: Users, value: "100+", label: "Active Members" },
  { icon: Award, value: "5+", label: "Years of Excellence" },
  { icon: Zap, value: "15+", label: "Technical Workshops" },
];

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <Hero />

      {/* STATS SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-medium text-primary uppercase">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6">
              Shaping Tomorrow’s Technical Leaders
            </h2>
            <p className="text-muted-foreground mb-6">
              IEEE MBIT Student Branch is a vibrant community of engineering
              students passionate about technology and innovation.
            </p>
            <Button asChild>
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </div>

          <div className="rounded-2xl p-10 bg-white shadow-xl border text-center">
            <Users className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Building Community</h3>
            <p className="text-muted-foreground text-sm">
              Together We Innovate
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Join IEEE MBIT?
        </h2>
        <p className="mb-8">
          Be part of a global network advancing technology for humanity.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/contact">Get In Touch</Link>
        </Button>
      </section>
    </Layout>
  );
};

export default Index;
