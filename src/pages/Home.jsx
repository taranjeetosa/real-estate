import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  FileText,
  House,
  Megaphone,
  Sparkles,
  Target,
  BriefcaseBusiness,
  Users,
  Video,
  X,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import LeadPopup from "../components/LeadPopup.jsx";
import useLeadSheetSubmission from "../hooks/useLeadSheetSubmission.js";
import {
  courseBenefits,
  courseFaqs,
  learningSteps,
  specialistTracks,
} from "../data/aiCourse.js";
import { whyChooseReasons } from "../data/whyChoose.js";

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Learning pathways", href: "#tracks" },
  { label: "Why real estate", href: "#why-ai" },
];

const heroSlides = [
  "/executive-slider.jpeg",
  "/pexels-tima-miroshnichenko-7567525.jpg",
  "/pexels-thisisengineering-3913031.jpg",
  "/pexels-mikhail-nilov-7988217.jpg",
];

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
          <p className="eyebrow hero-eyebrow">REAL ESTATE CAREER IN DUBAI</p>
          <h1>AI for real<br /><span>estate work.</span></h1>
          <p className="hero-description">
            Build practical skills in property data, AI-supported marketing,
            and market intelligence through three real estate learning pathways.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={onGetStarted}>
              Choose your tier <ArrowRight size={17} />
            </button>
            <a className="text-link" href="#tracks">Explore learning pathways <ArrowDown size={16} /></a>
          </div>
          <div className="hero-proof">
            <span className="proof-icon"><Check size={15} /></span>
            Practical AI for property work <span className="proof-separator">·</span> Three career tiers
          </div>
        </div>

        <div className="hero-visual" role="img" aria-label="Real estate AI learning pathway">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-glow" />
          <div className="visual-card">
            <div className="visual-card-top">
              <span className="live-dot" /> YOUR PROPERTY SKILLS
              <span className="visual-card-menu">•••</span>
            </div>
            <div className="visual-brain"><House size={42} strokeWidth={1.5} /></div>
            <p className="visual-label">AI FOR REAL ESTATE</p>
            <h2>Read the market.<br />Move forward.</h2>
            <div className="visual-progress"><span /></div>
            <div className="visual-card-footer"><span>YOUR LEARNING PATH</span><span>01 — 03</span></div>
          </div>
          <div className="float-chip chip-top"><Sparkles size={16} /> Property-focused AI</div>
          <div className="float-chip chip-bottom"><BriefcaseBusiness size={17} /> OneX Properties support</div>
          <div className="visual-star star-one">✳</div>
          <div className="visual-star star-two">✳</div>
        </div>
      </div>
      <CourseOverviewStats />
      <div className="hero-bottom">
        <span>ONE STOCK ACADEMY</span><span className="hero-bottom-line" /><span>THREE LEARNING PATHWAYS</span><span className="hero-bottom-line" /><span>BUILT FOR REAL ESTATE</span>
      </div>
    </section>
  );
}

function CourseOverviewStats() {
  const highlights = [
    { title: "3 pathways", detail: "Professional, Manager, Expert", icon: Target },
    { title: "4–6 weeks", detail: "depending on your chosen tier", icon: Clock3 },
    { title: "Practical AI", detail: "for property workflows", icon: House },
    { title: "Internship support", detail: "after course completion", icon: BriefcaseBusiness },
  ];

  return (
    <section className="stats-strip" aria-label="Real estate programme highlights">
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
        <p className="section-kicker">REAL ESTATE, WITH AI IN PRACTICE</p>
        <h2>Market insight meets <span>property work.</span></h2>
      </div>
      <div className="about-content">
        <p className="about-lead">
          Real estate learning from{" "}
          <span className="powered-by-highlight">One Stock Academy</span>, associated partner of OneX Properties.
        </p>
        <div className="about-detail">
          <p>One Stock Academy is an associated partner of OneX Properties. The programme explores how AI can support property analysis, marketing, client engagement, and investment decisions, with practical real-world assistance. After course completion, learners can receive assistance exploring internship opportunities with OneX Properties.</p>
          <button className="inline-link" type="button" onClick={onGetStarted}>Choose your tier <ArrowRight size={16} /></button>
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

function ProgramFormats() {
  const formats = [
    {
      icon: Video,
      title: "Video lessons",
      description: "Interactive lessons and case scenarios rooted in property work.",
    },
    {
      icon: Users,
      title: "Live expert sessions",
      description: "Join live sessions and masterclasses with industry context.",
    },
    {
      icon: BookOpen,
      title: "Webinars & tool practice",
      description: "Explore industry webinars and a sandbox for real estate tools.",
    },
  ];

  return (
    <div className="testimonials-panel">
      <div className="testimonials-heading">
        <div>
          <p className="why-kicker">HOW YOU LEARN</p>
          <h3>Learning built around practice.</h3>
        </div>
      </div>

      <div
        className="testimonial-viewport"
        role="region"
        aria-label="Programme learning formats"
        tabIndex={0}
      >
        <div className="testimonial-group">
          {formats.map(({ icon: Icon, title, description }) => (
            <article className="testimonial-card" key={title}>
              <span className="testimonial-mark" aria-hidden="true"><Icon size={22} /></span>
              <p className="testimonial-quote">{title}</p>
              <div className="testimonial-author">
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
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
            <p className="why-kicker">WHY THIS PROGRAMME</p>
            <h2 id="why-ai-title">Real estate skills for <span>an AI-enabled market.</span></h2>
            <p>Build practical capability across property data, marketing, and market intelligence.</p>
            <div className="why-actions">
              <a className="button button-primary" href="#tracks">
                Explore learning pathways <ArrowRight size={16} />
              </a>
              <a className="why-secondary-link" href="#journey">
                See how you will learn <ArrowRight size={15} />
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

        <ProgramFormats />
      </div>
    </section>
  );
}
function CourseModules({ onChooseTrack }) {
  return (
    <section className="tracks-section" id="tracks">
      <div className="section tracks-heading">
        <div>
          <p className="section-kicker">THREE LEARNING PATHWAYS</p>
          <h2>Choose your path<br /><span>in real estate.</span></h2>
        </div>
        <p className="tracks-intro">Choose a programme that fits your experience, from foundational property workflows to strategic market intelligence.</p>
      </div>
      <div className="tracks-grid">
        {specialistTracks.map(({ title, duration, description, audience }, index) => (
          <article className="track-card" key={title}>
            <div className="track-card-top"><span className="track-index">TIER 0{index + 1} · {duration.toUpperCase()}</span></div>
            <h3>{title}</h3>
            <p className="track-description">{description}</p>
            <p className="track-audience">{audience}</p>
            <button className="track-link" type="button" onClick={() => onChooseTrack(title)} aria-label={`View details for ${title}`}>
              Tier details <ArrowRight className="track-link-arrow" size={16} />
            </button>
          </article>
        ))}
      </div>
      <div className="tracks-note"><span className="note-mark"><Sparkles size={17} /></span><p>All three programmes apply AI to real estate practice, with real-world assistance and post-course internship assistance through One Stock Academy&apos;s association with <strong>OneX Properties</strong>.</p></div>
    </section>
  );
}

function TrackSyllabusModal({ track, onClose, onGetStarted }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const tier = specialistTracks.find(({ title }) => title === track);

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
          aria-label="Close tier details"
          onClick={onClose}
          ref={closeButtonRef}
        >
          <X size={18} />
        </button>
        <div className="track-modal-icon" aria-hidden="true">
          <FileText size={43} strokeWidth={1.8} />
          <span>PROGRAMME</span>
        </div>
        <h2 id="track-modal-title">{tier.title} <span>({tier.duration} · {tier.level})</span></h2>
        <p className="track-modal-description">
          {tier.focus} One Stock Academy also provides real-world assistance and post-course internship assistance with OneX Properties.
        </p>
        <button
          className="button track-modal-download"
          type="button"
          onClick={() => onGetStarted(track)}
        >
          Enquire about this tier <ArrowRight size={19} />
        </button>
      </section>
    </div>
  );
}

function CourseJourney({ onGetStarted }) {
  return (
    <section className="journey-section" id="journey">
      <div className="section journey-content">
        <div>
          <p className="section-kicker">YOUR LEARNING EXPERIENCE</p>
          <h2>Learn, apply,<br /><span>move forward.</span></h2>
          <p className="journey-description">Build real estate capability through guided content, practical assistance, and support exploring internship opportunities after course completion.</p>
          <button className="button button-light" type="button" onClick={onGetStarted}>Register your interest <ArrowRight size={17} /></button>
        </div>
        <div className="journey-steps">
          {learningSteps.map(({ title, description }, index) => (
            <div className="journey-step" key={title}>
              <span className="step-count">0{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              {index === learningSteps.length - 1 ? <BriefcaseBusiness size={20} /> : <Check size={19} />}
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
        <p>Find the right real estate learning pathway for your experience and goals.</p>
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

function InterestForm({
  selectedTrack,
  onTrackChange,
  sending,
  submitted,
  error,
  onReset,
}) {
  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span className="success-icon"><Check size={24} /></span>
        <h3>Thanks for your interest.</h3>
        <p>Your details have been added to our enquiry list. One Stock Academy will be in touch.</p>
        <button className="inline-link" type="button" onClick={onReset}>Submit another enquiry <ArrowRight size={15} /></button>
      </div>
    );
  }

  return (
    <>
      <div className="form-heading"><span>REGISTER YOUR INTEREST</span><h3>Show Interest</h3><p>Share a few details to get started.</p></div>
      <label htmlFor="full-name">Your name</label>
      <input id="full-name" name="name" type="text" autoComplete="name" placeholder="e.g. Alex Morgan" required />
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      <label htmlFor="phone">Phone number</label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required />
      <label htmlFor="track">Choose a learning pathway</label>
      <select id="track" name="track" value={selectedTrack} onChange={(event) => onTrackChange(event.target.value)}>
        {specialistTracks.map((track) => <option key={track.title} value={track.title}>{track.title}</option>)}
      </select>
      <button className="button button-primary form-submit" type="submit" disabled={sending}>
        {sending ? "Sending..." : "Enquire about this pathway"} <ArrowRight size={17} />
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </>
  );
}

function WhoThisIsForCard() {
  const audiences = [
    { label: "People beginning a career in real estate", icon: Users },
    { label: "Property professionals building AI skills", icon: House },
    { label: "Real estate marketing teams and managers", icon: Megaphone },
    { label: "Experienced professionals pursuing strategic growth", icon: Target },
  ];

  return (
    <section className="audience-card" aria-labelledby="audience-title">
      <p className="audience-kicker">FIND YOUR PLACE</p>
      <h3 id="audience-title">Who this is for</h3>
      <h4>Target audience</h4>
      <ul>
        {audiences.map(({ label, icon: AudienceIcon }) => (
          <li key={label}>
            <span className="audience-role-icon" aria-hidden="true"><AudienceIcon size={16} strokeWidth={1.8} /></span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <p className="audience-partnership">
        <strong>After course completion:</strong> Internship assistance with OneX Properties.
      </p>
    </section>
  );
}

function CourseEnrollmentCard({
  selectedTrack,
  onTrackChange,
}) {
  const formRef = useRef(null);
  const responseFrameRef = useRef(null);
  const requestIdInputRef = useRef(null);
  const {
    actionUrl,
    handleSubmit,
    resetSubmission,
    sending,
    submitted,
    error,
  } = useLeadSheetSubmission({ formRef, responseFrameRef, requestIdInputRef });

  return (
    <section className="enquiry-section" id="enquire" aria-label="Register your interest">
      <form
        ref={formRef}
        className="enquiry-form"
        action={actionUrl}
        method="post"
        target="show-interest-sheet-response"
        onSubmit={handleSubmit}
      >
        <input ref={requestIdInputRef} name="requestId" type="hidden" />
        <input name="source" type="hidden" value="show-interest-form" />
        <input name="website" type="text" tabIndex={-1} autoComplete="off" hidden />
        <InterestForm
          selectedTrack={selectedTrack}
          onTrackChange={onTrackChange}
          sending={sending}
          submitted={submitted}
          error={error}
          onReset={resetSubmission}
        />
      </form>
      <WhoThisIsForCard />
      <iframe
        ref={responseFrameRef}
        className="lead-popup-response-frame"
        name="show-interest-sheet-response"
        title="Show interest submission response"
      />
    </section>
  );
}

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState(specialistTracks[0].title);
  const [activeTrack, setActiveTrack] = useState(null);
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

  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <Navbar links={navigationLinks} onGetStarted={() => goToEnquiry()} />
      <main>
        <AiCourseHero onGetStarted={() => goToEnquiry()} />
        <AiAcademyOverview onGetStarted={() => goToEnquiry()} />
        <WhyChooseAcademy />
        <div className="course-followup-layout">
          <div className="course-followup-content">
            <CourseModules onChooseTrack={openTrackSyllabus} />
            <CourseJourney onGetStarted={() => goToEnquiry()} />
            <CourseFaq />
          </div>
          <aside className="course-registration-rail">
            <CourseEnrollmentCard
              selectedTrack={selectedTrack}
              onTrackChange={setSelectedTrack}
            />
          </aside>
        </div>
      </main>
      <Footer />
      <LeadPopup />
      <TrackSyllabusModal
        track={activeTrack}
        onClose={closeTrackModal}
        onGetStarted={(track) => {
          closeTrackModal();
          goToEnquiry(track);
        }}
      />
    </>
  );
}
