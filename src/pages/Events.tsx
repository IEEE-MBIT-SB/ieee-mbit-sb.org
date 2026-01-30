import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Download, X, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  organizer: string;
  poster_path: string | null;
  report_pdf_path: string | null;
  is_upcoming: boolean;
  registration_link: string | null;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("past");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false });
    if (!error && data) setEvents(data);
    setLoading(false);
  };

  const upcomingEvents = events.filter((e) => e.is_upcoming);
  const pastEvents = events.filter((e) => !e.is_upcoming);
  const displayEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <Layout>
      <section className="py-20 ieee-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-ieee-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Events
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg">Discover our workshops, seminars, and competitions</p>
        </div>
      </section>

      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4 flex justify-center gap-4">
          {(["upcoming", "past"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"}`}>
              {tab === "upcoming" ? "Upcoming Events" : "Past Events"}
            </button>
          ))}
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : displayEvents.length === 0 ? (
            <div className="text-center py-20"><Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No {activeTab} events found</p></div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayEvents.map((event) => (
                <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onClick={() => setSelectedEvent(event)} className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border cursor-pointer group hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    {event.poster_path ? <img src={event.poster_path} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> : <div className="w-full h-full ieee-gradient flex items-center justify-center"><Calendar className="w-12 h-12 text-primary-foreground/50" /></div>}
                    <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">{event.organizer}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-foreground text-lg mb-2">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(event.date).toLocaleDateString()}</span>
                      {event.time && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{event.time}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
             <div className="bg-muted flex items-center justify-center max-h-[70vh] relative">
  {selectedEvent.poster_path ? (
    <img
      src={selectedEvent.poster_path}
      alt={selectedEvent.title}
      className="w-auto max-w-full h-auto max-h-[70vh] object-contain"
    />
  ) : (
    <div className="w-full h-[300px] ieee-gradient flex items-center justify-center">
      <Calendar className="w-20 h-20 text-primary-foreground/50" />
    </div>
  )}
  <button
    onClick={() => setSelectedEvent(null)}
    className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
  >
    <X className="w-5 h-5" />
  </button>
</div>
  <div className="p-6">
                <div className="flex items-center gap-2 mb-3"><span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">{selectedEvent.organizer}</span></div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">{selectedEvent.title}</h2>
                <div className="flex items-center gap-6 text-muted-foreground mb-4">
                  <span className="flex items-center gap-2"><Calendar className="w-5 h-5" />{new Date(selectedEvent.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                  {selectedEvent.time && <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{selectedEvent.time}</span>}
                </div>
                {selectedEvent.description && <p className="text-muted-foreground mb-6 leading-relaxed">{selectedEvent.description}</p>}
                <div className="flex gap-3">
                  {selectedEvent.report_pdf_path && <Button asChild><a href={selectedEvent.report_pdf_path} download><Download className="w-4 h-4 mr-2" />Download Report</a></Button>}
                  {selectedEvent.registration_link && <Button asChild variant="outline"><a href={selectedEvent.registration_link} target="_blank" rel="noopener noreferrer">Register Now</a></Button>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Events;
