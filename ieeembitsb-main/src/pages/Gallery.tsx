import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

interface GalleryImage {
  id: string;
  image_path: string;
  caption: string | null;
  event_id: string | null;
  events?: { title: string } | null;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const { data, error } = await supabase.from("gallery").select("*, events(title)").order("created_at", { ascending: false });
    if (!error && data) setImages(data);
    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-20 ieee-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-ieee-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Gallery</motion.h1>
          <p className="text-primary-foreground/80 text-lg">Moments captured from our events and activities</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
          ) : images.length === 0 ? (
            <div className="text-center py-20"><Image className="w-16 h-16 text-muted-foreground mx-auto mb-4" /><p className="text-muted-foreground">No images in gallery yet</p></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, index) => (
                <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                  <img src={img.image_path} alt={img.caption || "Gallery image"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
