import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("contact_messages")
      .insert([formData]);

    setLoading(false);

    if (error) {
      toast.error("Failed to send message. Please try again.");
    } else {
      setSubmitted(true);
      toast.success("Message sent successfully!");
    }
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="py-20 ieee-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-ieee-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4"
          >
            Contact Us
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg">
            Get in touch with IEEE MBIT Student Branch
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="bg-accent p-8 rounded-2xl text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    Your message has been sent. We’ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Name
                    </label>
                    <Input
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Write your message here..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={loading} className="w-full">
                    {loading ? "Sending..." : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* CONTACT INFO + MAP */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  {/* ADDRESS */}
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-muted-foreground">
                        Madhuben & Bhanubhai Patel Institute of Technology (MBIT),
                        Near Vithal Udyognagar, Anand, Gujarat – 388120, India
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href="mailto:ieee.mbit@gmail.com"
                        className="text-primary hover:underline"
                      >
                        ieee@mbit.edu.in
                      </a>
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <Phone className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-muted-foreground">
                        +91 2692 232700 (College Office)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GOOGLE MAP */}
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border">
                <iframe
                  title="MBIT Location"
                  src="https://www.google.com/maps?q=Madhuben%20and%20Bhanubhai%20Patel%20Institute%20of%20Technology%20Anand&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
