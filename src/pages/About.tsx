import { motion } from "framer-motion";
import { Globe, MapPin, Building, BookOpen, GraduationCap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const About = () => {
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
              About IEEE
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Discover the world's largest technical professional organization and our local student branch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is IEEE */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">Global Organization</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                What is IEEE?
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The Institute of Electrical and Electronics Engineers (IEEE) is the world's largest 
                technical professional organization dedicated to advancing technology for the benefit 
                of humanity.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                IEEE and its members inspire a global community to innovate for a better tomorrow 
                through its more than 400,000 members in over 160 countries, and its highly cited 
                publications, conferences, technology standards, and professional and educational activities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                IEEE is the trusted "voice" for engineering, computing, and technology information 
                around the globe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "400K+", label: "Members Worldwide" },
                { value: "160+", label: "Countries" },
                { value: "39", label: "Technical Societies" },
                { value: "1884", label: "Year Founded" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-card p-6 rounded-2xl shadow-lg border border-border text-center"
                >
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* IEEE India Council */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <div className="w-full h-full ieee-gradient flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-2xl font-heading font-bold">IEEE India Council</p>
                    <p className="text-sm opacity-80 mt-2">Serving 100,000+ Members</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-secondary-foreground" />
                </div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">National Body</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                IEEE India Council
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                IEEE India Council is one of the largest and most active councils in IEEE with over 
                100,000 members. It coordinates IEEE activities across India through various sections 
                and chapters.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The council organizes numerous technical conferences, workshops, and student activities 
                throughout the year, fostering innovation and professional development among its members.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IEEE Gujarat Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">Regional Section</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                IEEE Gujarat Section
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                IEEE Gujarat Section is a vibrant community of engineers, researchers, and students 
                across the state of Gujarat. The section actively promotes technical activities and 
                provides platforms for knowledge sharing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With numerous student branches, chapters, and affinity groups, IEEE Gujarat Section 
                continues to grow and contribute to the technological advancement of the region.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-primary to-ieee-blue-light flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <Building className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-2xl font-heading font-bold">Gujarat Section</p>
                    <p className="text-sm opacity-80 mt-2">Part of IEEE Region 10</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About MBIT IEEE SB */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Branch</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2">
              IEEE MBIT Student Branch
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-muted-foreground mb-4 leading-relaxed">
                IEEE MBIT Student Branch was established to provide students with opportunities 
                to interact with professionals, access to technical resources, and platforms to 
                showcase their talents.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Our branch organizes various technical and non-technical events throughout the 
                academic year, including workshops, seminars, hackathons, coding competitions, 
                and industry visits.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We are committed to fostering a culture of innovation, collaboration, and 
                continuous learning among our members, preparing them for successful careers 
                in the ever-evolving field of technology.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-xl border border-border">
                  <BookOpen className="w-8 h-8 text-primary mb-2" />
                  <p className="font-medium text-foreground">Technical Events</p>
                  <p className="text-sm text-muted-foreground">Workshops & Seminars</p>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border">
                  <GraduationCap className="w-8 h-8 text-secondary mb-2" />
                  <p className="font-medium text-foreground">Skill Development</p>
                  <p className="text-sm text-muted-foreground">Training Programs</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
                <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                  Faculty Advisor
                </h3>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">Prof. Dhruv Dalwadi</p>
                    <p className="text-muted-foreground">Branch Counselor</p>
                    <p className="text-sm text-muted-foreground mt-1">Department of Computer Engineering</p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-6 leading-relaxed">
                  Our faculty advisor provides guidance and mentorship to the student branch, 
                  helping us organize impactful events and achieve our goals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
