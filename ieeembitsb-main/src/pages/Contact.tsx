import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* VALIDATION REGEX */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit number

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    /* REQUIRED FIELD CHECK */
    if (!name || !email || !phone || !message) {
      toast.error("All fields are required");
      return;
    }

    /* EMAIL FORMAT CHECK */
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    /* PHONE NUMBER CHECK */
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit contact number");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone,
        message,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error("Failed to send message. Please try again.");
    } else {
      setSubmitted(true);
      toast.success("Message sent successfully!");

      /* RESET FORM */
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
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
              <h2 className="text-2xl font-heading font-bold mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="bg-accent p-8 rounded-2xl text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    Your message has been sent. We’ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* NAME */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
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

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
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

                  {/* PHONE */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Contact Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Message
                    </label>
                    <Textarea
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  {/* SUBMIT */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* CONTACT INFO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-heading font-bold">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-card rounded-xl border">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <p className="text-muted-foreground">
                    MBIT, Near Vithal Udyognagar, Anand, Gujarat – 388120
                  </p>
                </div>

                <div className="flex gap-4 p-4 bg-card rounded-xl border">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <a
                    href="mailto:ieee@mbit.edu.in"
                    className="text-primary hover:underline"
                  >
                    ieee@mbit.edu.in
                  </a>
                </div>

                <div className="flex gap-4 p-4 bg-card rounded-xl border">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <p className="text-muted-foreground">
                    +91 2692 232700
                  </p>
                </div>
              </div>

              {/* MAP */}
              <div className="aspect-video rounded-2xl overflow-hidden border">
                <iframe
                  title="MBIT Location"
                  src="https://www.google.com/maps?q=Madhuben%20and%20Bhanubhai%20Patel%20Institute%20of%20Technology%20Anand&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
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
