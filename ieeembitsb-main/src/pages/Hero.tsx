import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">

      {/* 🔹 WATERMARK (HOME HERO ONLY) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/mbit-ieee-logo.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 48%",
          backgroundSize: "700px",
          opacity: 0.14,
          }}
        />


      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
       <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-2 
             bg-blue-50 
             text-blue-900 
             border border-blue-200 border-opacity-10 
             rounded-full 
             text-sm 
             font-semibold 
             mb-6">
          Advancing Technology for Humanity
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6"
        >
          MBIT IEEE
          <span className="block text-primary">Student Branch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Empowering students through technology, innovation, and professional
          development. Join us in shaping the future of engineering excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg">
            <Link to="/events">
              Explore Events <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" 
          className="bg-white/80 backdrop-blur-sm border-blue-300 text-blue-800 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-900 shadow-sm">
            <Link to="/about">Learn More</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
