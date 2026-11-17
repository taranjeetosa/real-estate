import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const socials = [
  { label: "Facebook", icon: faFacebookF, href: "https://www.facebook.com/profile.php?id=61592868800782" },
  { label: "Instagram", icon: faInstagram, href: "https://www.instagram.com/onestock_academy/" },
  { label: "YouTube", icon: faYoutube, href: "https://www.youtube.com/@onestock_academy" },
  { label: "X", icon: faXTwitter, href: "https://x.com/onestockacademy" },
  { label: "LinkedIn", icon: faLinkedinIn, href: "https://www.linkedin.com/in/one-stock-academy-080a06428/" },
];

const courseLinks = [
  { label: "AI for Real Estate Professional", href: "#tracks" },
  { label: "AI for Real Estate Manager", href: "#tracks" },
  { label: "AI for Real Estate Expert", href: "#tracks" },
  { label: "Learning experience", href: "#journey" },
  { label: "Register your interest", href: "#enquire" },
];

export default function Footer() {
  return (
    <footer className="academy-footer" data-testid="site-footer">
      <div className="footer-slashes" aria-hidden="true" />
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand-column">
            <a className="footer-logo-link" href="#home" aria-label="One Stock Academy home">
              <img src="/logo-brand.png" alt="One Stock Academy" className="footer-logo" />
            </a>
            <p className="footer-description">
              Practical AI-powered real estate learning, with real-world and
              post-course internship assistance through One Stock Academy.
            </p>
            <div className="footer-socials" aria-label="Social media">
              {socials.map(({ label, icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-link"
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h2 className="footer-column-title">Real estate academy</h2>
            <div className="footer-links">
              <a href="#about">Programme overview</a>
              <a href="#why-ai">Why this programme</a>
              <a href="#tracks">Certification tiers</a>
              <a href="#faq">FAQs</a>
            </div>
          </div>

          <div className="footer-column">
            <h2 className="footer-column-title">Programme</h2>
            <div className="footer-links">
              {courseLinks.map(({ label, href }) => <a href={href} key={label}>{label}</a>)}
            </div>
          </div>

          <div className="footer-column">
            <h2 className="footer-column-title">Reach us</h2>
            <div className="footer-links footer-contact">
              <a href="tel:+919599037181"><Phone /> +91 95990 37181</a>
              <a href="https://wa.me/919599037181" target="_blank" rel="noopener noreferrer"><MessageCircle /> Chat on WhatsApp</a>
              <a href="mailto:support@onestock.com"><Mail /> support@onestock.com</a>
              <span><MapPin /> Floor-01, H Block, H-189, Sector 63, Noida, Uttar Pradesh 201309</span>
            </div>
          </div>
        </div>

        <div className="footer-course-note">
          <h2>Disclaimer</h2>
          <p>Programme information is provided for general guidance. Course content, schedules, and delivery may change; please confirm current information with One Stock Academy before enrolling. One Stock Academy is an associated partner of OneX Properties and provides real-world assistance and support exploring internship opportunities after course completion. Internship opportunities are subject to availability and are not guaranteed. Completing a programme does not guarantee employment, investment returns, or a specific business outcome.
          </p>
        </div>

        <p className="footer-watermark" aria-hidden="true">One Stock Academy</p>

        <div className="footer-bottom-row">
          <span>© {new Date().getFullYear()} One Stock Academy</span>
          <a href="#home">Back to top ↑</a>
          <span>AI-powered real estate learning</span>
        </div>
      </div>
    </footer>
  );
}
