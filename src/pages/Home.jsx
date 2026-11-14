import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Brain,
  Check,
  Clock3,
  Code2,
  Download,
  FileText,
  Pause,
  Play,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import {
  courseBenefits,
  courseFaqs,
  learningSteps,
  specialistTracks,
} from "../data/aiCourse.js";
import learnerTestimonials from "../data/testimonials.js";
import { whyChooseReasons } from "../data/whyChoose.js";

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Specialist tracks", href: "#tracks" },
  { label: "Why AI Academy", href: "#why-ai" },
];

const heroSlides = [
  "/executive-slider.jpeg",
  "/pexels-tima-miroshnichenko-7567525.jpg",
  "/pexels-thisisengineering-3913031.jpg",
  "/pexels-mikhail-nilov-7988217.jpg",
];

const publishedTestimonials = learnerTestimonials
  .filter(({ published }) => published)
  .sort((first, second) => first.sortOrder - second.sortOrder);

function HeroBackgroundSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState([]);

  useEffect(() => {
    if (
      loadedSlides.length !== heroSlides.length ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [loadedSlides.length]);

  return (
    <div className="hero-background" aria-hidden="true">
      {heroSlides.map((src, index) => {
        const isLoaded = loadedSlides.includes(src);
        const isActive = isLoaded && index === activeSlide;

        return (
          <img
            key={src}
            className={`hero-background-image${isActive ? " is-active" : ""}`}
            src={src}
            alt=""
            loading="eager"
            fetchPriority={index === 0 ? "high" : "auto"}
            onLoad={() => {
              setLoadedSlides((loaded) =>
                loaded.includes(src) ? loaded : [...loaded, src],
              );
            }}
            onError={() => console.error(`Unable to load hero slide: ${src}`)}
          />
        );
      })}
      <div className="hero-background-overlay" />
    </div>
  );
}

function AiCourseHero({ onGetStarted }) {
  return (
    <section className="hero" id="home">
      <HeroBackgroundSlideshow />
      <div className="hero-grid">
        <div className="hero-copy">

          <h1>Make AI work<br />for <span>your work.</span></h1>
          <p className="hero-description">
            Turn AI from a buzzword into a practical skill. Learn with real
            tools, build useful workflows and find the specialist track
            that fits your role.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={onGetStarted}>
              Find your AI track <ArrowRight size={17} />
            </button>
            <a className="text-link" href="#tracks">Explore the tracks <ArrowDown size={16} /></a>
          </div>
          <div className="hero-proof">
            <span className="proof-icon"><Check size={15} /></span>
            Practical, no-code learning <span className="proof-separator">·</span> Built for busy professionals
          </div>
        </div>

        <div className="hero-visual" role="img" aria-label="Illustration of an AI learning workspace">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-glow" />
          <div className="visual-card">
            <div className="visual-card-top">
              <span className="live-dot" /> YOUR NEXT SKILL
              <span className="visual-card-menu">•••</span>
            </div>
            <div className="visual-brain"><Brain size={42} strokeWidth={1.5} /></div>
            <p className="visual-label">PRACTICAL AI</p>
            <h2>Think smarter.<br />Work better.</h2>
            <div className="visual-progress"><span /></div>
            <div className="visual-card-footer"><span>YOUR LEARNING PATH</span><span>01 — 10</span></div>
          </div>
          <div className="float-chip chip-top"><Sparkles size={16} /> Useful from day one</div>
          <div className="float-chip chip-bottom"><BadgeCheck size={17} /> CampusSeat certified</div>
          <div className="visual-star star-one">✳</div>
          <div className="visual-star star-two">✳</div>
        </div>
      </div>
      <div className="hero-bottom">
        <span>ONE STOCK ACADEMY</span><span className="hero-bottom-line" /><span>EIGHT SPECIALIST TRACKS</span><span className="hero-bottom-line" /><span>BUILT AROUND YOU</span>
      </div>
    </section>
  );
}

function CourseOverviewStats() {
  const highlights = [
    { title: "~20 hours", detail: "per specialist track", icon: Clock3 },
    { title: "10 lessons", detail: "structured for practice", icon: Target },
    { title: "Zero coding", detail: "no technical background needed", icon: Code2 },
    { title: "Certificate", detail: "issued by CampusSeat", icon: BadgeCheck },
  ];

  return (
    <section className="stats-strip" aria-label="AI course highlights">
      {highlights.map(({ title, detail, icon: Icon }) => (
        <div className="stat" key={title}>
          <span className="stat-icon"><Icon size={20} /></span>
          <span><strong>{title}</strong><small>{detail}</small></span>
        </div>
      ))}
    </section>
  );
}

function AiAcademyOverview({ onGetStarted }) {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <p className="section-kicker">AI, MEET EVERYDAY WORK</p>
        <h2>Less theory. More <span>“I can use this.”</span></h2>
      </div>
      <div className="about-content">
        <p className="about-lead">
          The AI Academy, powered by CampusSeat, helps you bring AI into
          the practical, everyday skills you need.
        </p>
        <div className="about-detail">
          <p>Each programme is built around a specific function or industry, so learners build exactly the capability their role needs. On completion, every learner receives a Braincruise-issued certification recognising their applied AI competency in their chosen specialisation.</p>
          <button className="inline-link" type="button" onClick={onGetStarted}>Choose your track <ArrowRight size={16} /></button>
        </div>
      </div>
      <div className="benefit-grid">
        {courseBenefits.map(({ title, description, icon: Icon }, index) => (
          <article className="benefit-card" key={title}>
            <div className="benefit-top"><span className="benefit-icon"><Icon size={20} /></span><span className="benefit-number">0{index + 1}</span></div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LearnerTestimonials() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="testimonials-panel">
      <div className="testimonials-heading">
        <div>
          <p className="why-kicker">LEARNER STORIES</p>
          <h3>In their own words.</h3>
        </div>
        <button
          className="testimonial-toggle"
          type="button"
          aria-label={isPaused ? "Resume testimonial scroll" : "Pause testimonial scroll"}
          aria-pressed={isPaused}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused ? <Play size={13} fill="currentColor" /> : <Pause size={13} />}
          <span>{isPaused ? "Paused" : "Pause"}</span>
        </button>
      </div>

      <div className="testimonial-viewport" aria-label="Learner testimonials">
        {publishedTestimonials.length > 0 ? (
          <div className={`testimonial-track${isPaused ? " is-paused" : ""}`}>
            {[false, true].map((isDuplicate) => (
              <div
                className="testimonial-group"
                key={isDuplicate ? "duplicate" : "original"}
                aria-hidden={isDuplicate}
              >
                {publishedTestimonials.map(({ id, name, role, text, image }) => (
                  <article className="testimonial-card" key={`${id}-${isDuplicate}`}>
                    <span className="testimonial-mark" aria-hidden="true">“</span>
                    <p className="testimonial-quote">{text}</p>
                    <div className="testimonial-author">
                      <img src={image} alt="" loading="lazy" />
                      <div>
                        <h4>{name}</h4>
                        <p>{role}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="testimonials-empty">Learner stories will appear here soon.</p>
        )}
      </div>
    </div>
  );
}

function WhyChooseAcademy() {
  return (
    <section className="why-section" id="why-ai" aria-labelledby="why-ai-title">
      <div className="why-inner">
        <div className="why-left">
          <div className="why-heading">
            <p className="why-kicker">WHY ONE STOCK ACADEMY</p>
            <h2 id="why-ai-title">Why choose <span>ONE STOCK ACADEMY</span></h2>
            <p>Practical, no-code AI learning that fits your role and your schedule.</p>
            <div className="why-actions">
              <a className="button button-primary" href="#tracks">
                Explore specialist tracks <ArrowRight size={16} />
              </a>
              <a className="why-secondary-link" href="#journey">
                See how the programme works <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="why-grid">
            {whyChooseReasons.map(({ title, description, icon: Icon }, index) => (
              <article className="why-card" key={title}>
                <span className="why-icon"><Icon size={18} /></span>
                <div className="why-card-copy">
                  <div className="why-card-heading">
                    <h3>{title}</h3>
                    <span className="why-number">0{index + 1}</span>
                  </div>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <LearnerTestimonials />
      </div>
    </section>
  );
}
function CourseModules({ onChooseTrack }) {
  return (
    <section className="tracks-section" id="tracks">
      <div className="section tracks-heading">
        <div>
          <p className="section-kicker">YOUR WORK, YOUR AI</p>
          <h2>One Stock Academy.<br /><span>Your kind of AI.</span></h2>
        </div>
        <p className="tracks-intro">Start with the work you know. Pick a focused track and explore how AI can help you do it better.</p>
      </div>
      <div className="tracks-grid">
        {specialistTracks.map(({ title, description, audience, icon: Icon }, index) => (
          <article className="track-card" key={title}>
            <div className="track-card-top"><span className="track-icon"><Icon size={21} /></span><span className="track-index">0{index + 1}</span></div>
            <h3>{title}</h3>
            <p className="track-description">{description}</p>
            <p className="track-audience">{audience}</p>
            <button className="track-link" type="button" onClick={() => onChooseTrack(title)} aria-label={`View syllabus for ${title}`}>
              Explore this track <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
      <div className="tracks-note"><span className="note-mark"><Sparkles size={17} /></span><p>Every track includes <strong>10 lessons</strong>, around <strong>20 hours</strong> of online learning, and a CampusSeat-issued certificate on completion.</p></div>
    </section>
  );
}

function TrackSyllabusModal({ track, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!track) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [track]);

  if (!track) return null;

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = dialogRef.current?.querySelectorAll(
      'button:not([disabled]), a[href]',
    );
    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return (
    <div
      className="track-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="track-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="track-modal-title"
        onKeyDown={handleKeyDown}
      >
        <button
          className="track-modal-close"
          type="button"
          aria-label="Close syllabus dialog"
          onClick={onClose}
          ref={closeButtonRef}
        >
          <X size={18} />
        </button>
        <div className="track-modal-icon" aria-hidden="true">
          <FileText size={43} strokeWidth={1.8} />
          <span>PDF</span>
        </div>
        <h2 id="track-modal-title">{track} <span>(20 hrs — 10 Lessons)</span></h2>
        <p className="track-modal-description">
          Get the detailed syllabus, programme structure, and learning
          outcomes for this track.
        </p>
        <a
          className="button track-modal-download"
          href="/Trading_Masterclass_Syllabus.pdf"
          download="Trading_Masterclass_Syllabus.pdf"
        >
          Download PDF <Download size={19} />
        </a>
      </section>
    </div>
  );
}

function CourseJourney({ onGetStarted }) {
  return (
    <section className="journey-section" id="journey">
      <div className="section journey-content">
        <div>
          <p className="section-kicker">A CLEAR PATH FORWARD</p>
          <h2>From curious<br />to <span>confident.</span></h2>
          <p className="journey-description">A structured, self-paced learning experience—designed to help you take the next step with AI, on your terms.</p>
          <button className="button button-light" type="button" onClick={onGetStarted}>Start your journey <ArrowRight size={17} /></button>
        </div>
        <div className="journey-steps">
          {learningSteps.map(({ title, description }, index) => (
            <div className="journey-step" key={title}>
              <span className="step-count">0{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              {index === learningSteps.length - 1 ? <BadgeCheck size={20} /> : <Check size={19} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseFaq() {
  return (
    <section className="section faq-section" id="faq">
      <div className="faq-heading">
        <p className="section-kicker">GOOD TO KNOW</p>
        <h2>FAQ<span>s.</span></h2>
        <p>Everything you need to know before you get started.</p>
      </div>
      <div className="faq-list">
        {courseFaqs.map(({ question, answer }, index) => (
          <details className="faq-item" key={question} open={index === 0}>
            <summary>{question}<span className="faq-plus">+</span></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function InterestForm({ selectedTrack, onTrackChange, submitted, onReset }) {
  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span className="success-icon"><Check size={24} /></span>
        <h3>Thanks for your interest.</h3>
        <p>This frontend demo does not send or store your details. Connect a form service to receive enquiries.</p>
        <button className="inline-link" type="button" onClick={onReset}>Submit another enquiry <ArrowRight size={15} /></button>
      </div>
    );
  }

  return (
    <>
      <div className="form-heading"><span>LET’S TALK AI</span><h3>Find your track</h3><p>Share a few details to get started.</p></div>
      <label htmlFor="full-name">Your name</label>
      <input id="full-name" name="name" type="text" autoComplete="name" placeholder="e.g. Alex Morgan" required />
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      <label htmlFor="track">Choose a specialist track</label>
      <select id="track" name="track" value={selectedTrack} onChange={(event) => onTrackChange(event.target.value)}>
        {specialistTracks.map((track) => <option key={track.title} value={track.title}>{track.title}</option>)}
      </select>
      <button className="button button-primary form-submit" type="submit">Show my interest <ArrowRight size={17} /></button>
      <p className="form-note">Demo form only. Your details stay in this browser and are not sent.</p>
    </>
  );
}

function CourseEnrollmentCard({
  selectedTrack,
  onTrackChange,
  submitted,
  onSubmit,
  onReset,
}) {
  return (
    <section className="enquiry-section" id="enquire">
      <div className="section enquiry-grid">
        <div className="enquiry-copy">
          <p className="section-kicker">YOUR NEXT STEP STARTS HERE</p>
          <h2>Ready to make AI <span>your advantage?</span></h2>
          <p>Tell us which track caught your eye. We’ll help you find your next step.</p>
          <div className="enquiry-points">
            <span><Check size={16} /> No coding required</span>
            <span><Check size={16} /> Flexible online learning</span>
            <span><Check size={16} /> Certificate on completion</span>
          </div>
        </div>
        <form className="enquiry-form" onSubmit={onSubmit}>
          <InterestForm
            selectedTrack={selectedTrack}
            onTrackChange={onTrackChange}
            submitted={submitted}
            onReset={onReset}
          />
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState(specialistTracks[0].title);
  const [activeTrack, setActiveTrack] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const closeTrackModal = useCallback(() => setActiveTrack(null), []);

  function goToEnquiry(track) {
    if (track) setSelectedTrack(track);
    document.getElementById("enquire").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }

  function openTrackSyllabus(track) {
    setSelectedTrack(track);
    setActiveTrack(track);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <Navbar links={navigationLinks} onGetStarted={() => goToEnquiry()} />
      <main>
        <AiCourseHero onGetStarted={() => goToEnquiry()} />
        <CourseOverviewStats />
        <AiAcademyOverview onGetStarted={() => goToEnquiry()} />
        <WhyChooseAcademy />
        <CourseModules onChooseTrack={openTrackSyllabus} />
        <CourseJourney onGetStarted={() => goToEnquiry()} />
        <CourseFaq />
        <CourseEnrollmentCard
          selectedTrack={selectedTrack}
          onTrackChange={setSelectedTrack}
          submitted={submitted}
          onSubmit={handleSubmit}
          onReset={() => setSubmitted(false)}
        />
      </main>
      <Footer />
      <ScrollToTop />
      <TrackSyllabusModal track={activeTrack} onClose={closeTrackModal} />
    </>
  );
}
