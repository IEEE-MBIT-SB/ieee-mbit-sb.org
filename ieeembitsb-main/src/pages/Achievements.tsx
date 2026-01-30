import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image_path?: string | null;
}

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching achievements:", error);
    } else if (data) {
      setAchievements(data as Achievement[]);
    }

    setLoading(false);
  };

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <Trophy className="w-14 h-14 mx-auto mb-4 opacity-80" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Student Branch Achievements
        </h1>
        <p className="opacity-80 text-lg max-w-2xl mx-auto">
          Recognitions, awards, and milestones achieved by IEEE MBIT Student Branch
        </p>
      </section>

      {/* ACHIEVEMENTS GRID */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-muted-foreground">
              Loading achievements...
            </div>
          ) : achievements.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No achievements added yet.
            </div>
          ) : (
            <div className="grid gap-8 place-items-center md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((a) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md bg-card border rounded-2xl shadow overflow-hidden"
                >
                  {/* IMAGE */}
                  {a.image_path && (
                    <img
                      src={a.image_path.trim()}
                      alt={a.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  )}

                  {/* CONTENT */}
                  <div className="p-6">
                    <span className="inline-block text-xs font-semibold text-primary mb-2">
                      {a.category}
                    </span>

                    <h3 className="text-xl font-bold mb-2">
                      {a.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      {a.description}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {new Date(a.date).toDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Achievements;
