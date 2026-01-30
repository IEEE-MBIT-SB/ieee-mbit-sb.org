import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Instagram
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* 
        Website Designed & Developed by Neel Navdiwala
        © {currentYear} – Unauthorized removal or modification of this credit is prohibited.
      */}

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo_ieee.jpeg"
                alt="IEEE MBIT Student Branch"
                className="h-12 w-auto object-contain"
              />
              <div>
                <p className="font-heading font-bold text-lg">IEEE MBIT</p>
                <p className="font-heading font-bold text-lg">Student Branch</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Advancing Technology for Humanity. IEEE MBIT Student Branch is dedicated to
              fostering technical excellence, innovation, and professional development among students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About IEEE", path: "/about" },
                { name: "Executive Committee", path: "/execom" },
                { name: "Events", path: "/events" },
                { name: "Gallery", path: "/gallery" },
                { name: "Achievements", path: "/Achievements"},
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Madhuben & Bhanubhai Patel Institute of Technology (MBIT),
                  Near Vithal Udyognagar, Anand, Gujarat – 388120, India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:ieee@mbit.edu.in"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ieee@mbit.edu.in
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  +91 2692 232700
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/ieee-mbit-sb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-muted/20 hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </a>

              <a
                href="https://www.instagram.com/ieeembitsb/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-muted/20 hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Stay connected with us on social media for the latest updates and activities.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">

            <p className="text-sm text-muted-foreground">
              © {currentYear} IEEE MBIT Student Branch. All rights reserved.
            </p>

            <p className="text-xs text-muted-foreground opacity-70 select-none">
              Designed & Developed by{" "}
              <span className="font-medium text-primary">
                <a
                href="https://www.linkedin.com/in/NeelNavdiwala"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                Neel Navdiwala
                </a>
              </span>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};
