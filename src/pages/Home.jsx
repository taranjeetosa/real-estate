import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Brain,
  BriefcaseBusiness,
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Code2,
  Download,
  FileText,
  House,
  Megaphone,
  Stethoscope,
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

          <h1>Elevate AI <br />for <span>your work.</span></h1>
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
          <div className="float-chip chip-bottom"><BadgeCheck size={17} /> Certified by CampusSeat</div>
          <div className="visual-star star-one">✳</div>
          <div className="visual-star star-two">✳</div>
        </div>
      </div>
      <CourseOverviewStats />
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
    { title: "Certificate", detail: "certified by CampusSeat", icon: BadgeCheck },
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
          The AI Academy is powered by{" "}
          <span className="powered-by-highlight">Braincruise</span> to help you bring AI
          into the practical, everyday skills you need.
        </p>
        <div className="about-detail">
          <p>Each programme is built around a specific function or industry, so learners build exactly the capability their role needs. On completion, every learner is certified by CampusSeat, the certifying authority, for their applied AI competency in their chosen specialisation.</p>
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
  const scrollerRef = useRef(null);
  const trackRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const isPaused = isHovered || isFocused || isInteracting || prefersReducedMotion;

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = (event) => setPrefersReducedMotion(event.matches);

    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track || isPaused) return undefined;

    let frame = 0;
    const loop = () => {
      const loopPoint = track.children[1]?.offsetLeft || 0;
      if (loopPoint > 0) {
        scroller.scrollLeft += 0.55;
        if (scroller.scrollLeft >= loopPoint) scroller.scrollLeft -= loopPoint;
      }
      frame = window.requestAnimationFrame(loop);
    };

    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, [isPaused]);

  useEffect(() => () => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  }, []);

  function scrollTestimonials(direction) {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    const firstGroup = track?.children[0];
    const card = firstGroup?.querySelector(".testimonial-card");
    const loopPoint = track?.children[1]?.offsetLeft || 0;
    if (!scroller || !track || !firstGroup || !card || !loopPoint) return;

    const cardGap = Number.parseFloat(window.getComputedStyle(firstGroup).columnGap) || 0;
    const step = card.getBoundingClientRect().width + cardGap;
    setIsInteracting(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);

    if (direction < 0 && scroller.scrollLeft < step) {
      scroller.scrollLeft += loopPoint;
    }

    scroller.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    resumeTimerRef.current = window.setTimeout(() => {
      setIsInteracting(false);
      resumeTimerRef.current = null;
    }, 900);
  }

  return (
    <div
      className="testimonials-panel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
      }}
    >
      <div className="testimonials-heading">
        <div>
          <p className="why-kicker">LEARNER STORIES</p>
          <h3>In their own words.</h3>
        </div>
        <div className="testimonial-controls" aria-label="Scroll testimonials">
          <button
            className="testimonial-arrow"
            type="button"
            aria-label="Scroll testimonials left"
            onClick={() => scrollTestimonials(-1)}
          >
            <ChevronLeft size={19} />
          </button>
          <button
            className="testimonial-arrow"
            type="button"
            aria-label="Scroll testimonials right"
            onClick={() => scrollTestimonials(1)}
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      <div
        className="testimonial-viewport"
        ref={scrollerRef}
        role="region"
        aria-label="Learner testimonials"
        aria-roledescription="carousel"
        tabIndex={0}
      >
        {publishedTestimonials.length > 0 ? (
          <div className="testimonial-track" ref={trackRef}>
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
        {specialistTracks.map(({ title, description, audience }, index) => (
          <article className="track-card" key={title}>
            <div className="track-card-top"><span className="track-index">TRACK 0{index + 1}</span></div>
            <h3>{title}</h3>
            <p className="track-description">{description}</p>
            <p className="track-audience">{audience}</p>
            <button className="track-link" type="button" onClick={() => onChooseTrack(title)} aria-label={`View syllabus for ${title}`}>
              Know more <ArrowRight className="track-link-arrow" size={16} />
            </button>
          </article>
        ))}
      </div>
      <div className="tracks-note"><span className="note-mark"><Sparkles size={17} /></span><p>Every track includes <strong>10 lessons</strong>, around <strong>20 hours</strong> of online learning, and certification by CampusSeat upon completion.</p></div>
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
      <div className="form-heading"><span>REGISTER YOUR INTEREST</span><h3>Show Interest</h3><p>Share a few details to get started.</p></div>
      <label htmlFor="full-name">Your name</label>
      <input id="full-name" name="name" type="text" autoComplete="name" placeholder="e.g. Alex Morgan" required />
      <label htmlFor="email">Email address</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      <label htmlFor="phone">Phone number</label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required />
      <label htmlFor="track">Choose a specialist track</label>
      <select id="track" name="track" value={selectedTrack} onChange={(event) => onTrackChange(event.target.value)}>
        {specialistTracks.map((track) => <option key={track.title} value={track.title}>{track.title}</option>)}
      </select>
      <button className="button button-primary form-submit" type="submit">Show my interest <ArrowRight size={17} /></button>
      
    </>
  );
}

function WhoThisIsForCard() {
  const audiences = [
    { label: "Managers and team leads", icon: BriefcaseBusiness },
    { label: "Finance, accounting, audit and tax professionals", icon: Calculator },
    { label: "Sales and marketing professionals", icon: Megaphone },
    { label: "Healthcare and nursing professionals", icon: Stethoscope },
    { label: "Real estate professionals", icon: House },
    { label: "Anyone seeking practical AI skills without a technical background", icon: BrainCircuit },
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
      <p className="audience-certification">
        <strong>Certification:</strong> Certified by CampusSeat upon completion.
      </p>
    </section>
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
    <section className="enquiry-section" id="enquire" aria-label="Register your interest">
      <form className="enquiry-form" onSubmit={onSubmit}>
        <InterestForm
          selectedTrack={selectedTrack}
          onTrackChange={onTrackChange}
          submitted={submitted}
          onReset={onReset}
        />
      </form>
      <WhoThisIsForCard />
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
              submitted={submitted}
              onSubmit={handleSubmit}
              onReset={() => setSubmitted(false)}
            />
          </aside>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <TrackSyllabusModal track={activeTrack} onClose={closeTrackModal} />
    </>
  );
}
