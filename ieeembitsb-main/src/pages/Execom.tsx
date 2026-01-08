import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface ExecomMember {
  id: string;
  section: string;
  role: string;
  name: string;
  photo_path: string | null;
  academic_year: string;
}

/* 🔝 HIERARCHY ORDER */
const sectionOrder = [
  "Branch Counsellor",
  "IEEE Student Branch",
  "Computer Society",
  "WIE",
  "Design",
  "Social Media",
  "Photography",
  "Documentation"
];

/* 📝 SECTION DESCRIPTIONS */
const sectionDescriptions: Record<string, string> = {
  "Branch Counsellor":
    "The Branch Counsellor provides guidance, mentorship, and oversight to ensure alignment with IEEE policies and academic excellence.",
  "IEEE Student Branch":
    "The core leadership team guiding the student branch operations and activities.",
  "Computer Society":
    "Dedicated to advancing the theory and practice of computer science and engineering.",
  "WIE":
    "Women in Engineering - Empowering women in technical fields.",
    "Design":
    "Responsible for all creative assets including posters, banners, and branding materials.",
  "Photography":
    "Capturing and documenting IEEE events through professional photography.",
  "Social Media":
    "Managing digital presence, promotions, and online engagement of the student branch.",
    "Documentation": 
    "Maintaining records, reports, and official archives of the student branch activities."

};

const Execom = () => {
  const [members, setMembers] = useState<ExecomMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState("2026");

  useEffect(() => {
    fetchMembers();
  }, [activeYear]);

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("execom")
      .select("*")
      .eq("academic_year", activeYear)
      .order("id");

    if (!error && data) {
      setMembers(data);
    }
    setLoading(false);
  };

  const groupedMembers = sectionOrder.reduce((acc, section) => {
    acc[section] = members.filter(
  (m) => m.section?.trim().toLowerCase() === section.toLowerCase());
    return acc;
  }, {} as Record<string, ExecomMember[]>);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 ieee-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-ieee-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
              Executive Committee
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Meet the dedicated team leading IEEE MBIT Student Branch
            </p>
          </motion.div>
        </div>
      </section>

      {/* Academic Year Selector */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Academic Year:
            </span>
            <div className="flex gap-2">
              {["2024", "2025", "2026"].map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeYear === year
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Members by Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-muted-foreground mt-4">
                Loading team members...
              </p>
            </div>
          ) : (
            <div className="space-y-20">
              {sectionOrder.map((section, sectionIndex) => {
                const sectionMembers = groupedMembers[section];
                if (!sectionMembers || sectionMembers.length === 0) return null;

                return (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: sectionIndex * 0.1 }}
                  >
                    {/* Section Header */}
                    <div className="text-center mb-12">
                      <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
                        {section}
                      </span>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        {sectionDescriptions[section]}
                      </p>
                    </div>

                    {/* 🔝 Branch Counsellor – Single Centered Card */}
                    {section === "Branch Counsellor" ? (
                      <div className="flex justify-center">
                        {sectionMembers.map((member) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-card w-72 rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow"
                          >
                            <div className="aspect-square bg-muted relative overflow-hidden">
                              {member.photo_path ? (
                                <img
                                  src={member.photo_path}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent">
                                  <Users className="w-16 h-16 text-primary/50" />
                                </div>
                              )}
                            </div>
                            <div className="p-4 text-center">
                              <h3 className="font-medium text-foreground">
                                {member.name}
                              </h3>
                              <p className="text-sm text-primary font-medium">
                                {member.role}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      /* 🔽 Other Sections – Normal Grid */
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sectionMembers.map((member, index) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border group hover:shadow-xl transition-shadow"
                          >
                            <div className="aspect-square bg-muted relative overflow-hidden">
                              {member.photo_path ? (
                                <img
                                  src={member.photo_path}
                                  alt={member.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent">
                                  <Users className="w-16 h-16 text-primary/50" />
                                </div>
                              )}
                            </div>
                            <div className="p-4 text-center">
                              <h3 className="font-medium text-foreground">
                                {member.name}
                              </h3>
                              <p className="text-sm text-primary font-medium">
                                {member.role}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {members.length === 0 && !loading && (
                <div className="text-center py-20">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No team members found for {activeYear}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Execom;
