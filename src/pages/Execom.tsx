import { useEffect, useState } from "react";
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

/* SECTION ORDER */
const sectionOrder = [
  "Branch Counselor",
  "IEEE Student Branch",
  "Computer Society",
  "WIE",
  "Design",
  "Social Media",
  "Photography",
  "Documentation",
];

/* SECTION DESCRIPTIONS */
const sectionDescriptions: Record<string, string> = {
  "Branch Counselor":
    "The Branch Counselor provides guidance, mentorship, and oversight to ensure alignment with IEEE policies and academic excellence.",
  "IEEE Student Branch":
    "The core leadership team guiding the student branch operations and activities.",
  "Computer Society":
    "Dedicated to advancing the theory and practice of computer science and engineering.",
  "WIE": "Women in Engineering - Empowering women in technical fields.",
  "Design":
    "Responsible for all creative assets including posters, banners, and branding materials.",
  "Social Media":
    "Managing digital presence, promotions, and online engagement of the student branch.",
  "Photography":
    "Capturing and documenting IEEE events through professional photography.",
  "Documentation":
    "Maintaining records, reports, and official archives of the student branch activities.",
};

/* IMAGE OPTIMIZATION (FAST + NO CROPPING) */
const optimizeImage = (url: string) =>
  `${url}?width=700&quality=60&format=webp`;

const Execom = () => {
  const [members, setMembers] = useState<ExecomMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState("2026");

  useEffect(() => {
    fetchMembers();
  }, [activeYear]);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("execom")
      .select("*")
      .eq("academic_year", activeYear)
      .order("id");

    if (data) setMembers(data);
    setLoading(false);
  };

  const groupedMembers = sectionOrder.reduce((acc, section) => {
    acc[section] = members.filter(
      (m) => m.section?.trim().toLowerCase() === section.toLowerCase()
    );
    return acc;
  }, {} as Record<string, ExecomMember[]>);

  let imageIndex = 0;

  return (
    <Layout>
      {/* HERO */}
      <section className="py-20 ieee-gradient text-center text-primary-foreground">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Executive Committee
        </h1>
        <p className="opacity-80 text-lg">
          Meet the dedicated team leading IEEE MBIT Student Branch
        </p>
      </section>

      {/* YEAR SELECTOR */}
      <section className="py-6 bg-card border-b">
        <div className="flex justify-center gap-2">
          {["2025", "2026"].map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeYear === year
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-20">
              {sectionOrder.map((section) => {
                const sectionMembers = groupedMembers[section];
                if (!sectionMembers?.length) return null;

                return (
                  <div key={section}>
                    {/* SECTION HEADER */}
                    <div className="text-center mb-10">
                      <span className="inline-block px-4 py-2 bg-accent rounded-full text-sm font-medium mb-3">
                        {section}
                      </span>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        {sectionDescriptions[section]}
                      </p>
                    </div>

                    {/* MEMBERS GRID */}
              
                    <div className={section === "Branch Counselor"
                      ? "flex justify-center"
                      : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}
                    >

                      {sectionMembers.map((member) => {
                        const eager = imageIndex++ < 6;

                        return (
                          <div
                            key={member.id}
                            className="bg-card border rounded-2xl overflow-hidden shadow"
                          >
                           {/* IMAGE */}
<div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
  {member.photo_path ? (
    <img
      src={optimizeImage(member.photo_path)}
      alt={member.name}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="
        absolute inset-0
        w-full h-full
        object-cover
        object-[center_20%]
        scale-[1.08]
      "
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <Users className="w-14 h-14 text-muted-foreground" />
    </div>
  )}
</div>



                            {/* TEXT */}
                            <div className="p-4 text-center">
                              <h3 className="font-medium">{member.name}</h3>
                              <p className="text-sm text-primary">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Execom;
