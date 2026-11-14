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
  { label: "Artificial Intelligence", href: "#home" },
  { label: "Specialist tracks", href: "#tracks" },
  { label: "Learning journey", href: "#journey" },
  { label: "Frequently asked questions", href: "#faq" },
  { label: "Show interest", href: "#enquire" },
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
              Practical, no-code AI learning for professionals, with role-specific
              tracks from the One Stock Academy.
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
            <h2 className="footer-column-title">Explore</h2>
            <div className="footer-links">
              <a href="#about">About the AI Academy</a>
              <a href="#why-ai">Why learn AI</a>
              <a href="#tracks">Specialist tracks</a>
              <a href="#faq">FAQs</a>
            </div>
          </div>

          <div className="footer-column">
            <h2 className="footer-column-title">AI Academy</h2>
            <div className="footer-links">
              {courseLinks.map(({ label, href }) => <a href={href} key={href}>{label}</a>)}
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
          <p>The information provided in this brochure is intended for general informational and promotional purposes only. Course content, modules, learning outcomes, schedules, faculty, fees, certifications, and program delivery may be updated or modified by ONE STOCK ACADEMY without prior notice to reflect industry trends and academic improvements. Participation in this program does not guarantee employment, promotion, or specific business outcomes. Learners are encouraged to verify the latest course details with ONE STOCK ACADEMY before enrollment. All trademarks, logos, and third-party product names mentioned remain the property of their respective owners.
          </p>
        </div>

        <p className="footer-watermark" aria-hidden="true">One Stock Academy</p>

        <div className="footer-bottom-row">
          <span>© {new Date().getFullYear()} One Stock Academy</span>
          <a href="#home">Back to top ↑</a>
          <span>Practical AI education</span>
        </div>
      </div>
    </footer>
  );
}
