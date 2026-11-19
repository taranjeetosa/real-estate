import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock3,
  Download,
  FileText,
  House,
  Megaphone,
  Play,
  Sparkles,
  Target,
  BriefcaseBusiness,
  Users,
  X,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import LeadPopup from "../components/LeadPopup.jsx";
import CountryPhoneField from "../components/CountryPhoneField.jsx";
import useLeadSheetSubmission from "../hooks/useLeadSheetSubmission.js";
import {
  brokerRoadmapSteps,
  courseBenefits,
  courseFaqs,
  learningSteps,
  specialistTracks,
} from "../data/aiCourse.js";
import alumniImages from "../data/alumni.js";
import testimonials from "../data/testimonials.js";
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
          <h1>
            Turn AI
            <br />
            for <span>Real Estate.</span>
          </h1>
          <p className="hero-description">
            Build practical skills in property data, AI-supported marketing, and
            market intelligence through three real estate learning pathways.
          </p>
          <div className="hero-actions">
            <button
              className="button button-primary"
              type="button"
              onClick={onGetStarted}
            >
              Choose your tier <ArrowRight size={17} />
            </button>
            <a className="text-link" href="#tracks">
              Explore learning pathways <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-proof">
            <span className="proof-icon">
              <Check size={15} />
            </span>
            Practical AI for property work{" "}
            <span className="proof-separator">·</span> Three career tiers
          </div>
        </div>

        <div
          className="hero-visual"
          role="img"
          aria-label="Real estate AI learning pathway"
        >
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-glow" />
          <div className="visual-card">
            <div className="visual-card-top">
              <span className="live-dot" /> YOUR PROPERTY SKILLS
              <span className="visual-card-menu">•••</span>
            </div>
            <div className="visual-brain">
              <House size={42} strokeWidth={1.5} />
            </div>
            <p className="visual-label">AI FOR REAL ESTATE</p>
            <h2>
              Read the market.
              <br />
              Move forward.
            </h2>
            <div className="visual-progress">
              <span />
            </div>
            <div className="visual-card-footer">
              <span>YOUR LEARNING PATH</span>
              <span>01 — 03</span>
            </div>
          </div>
          <div className="float-chip chip-top">
            <Sparkles size={16} /> Property-focused AI
          </div>
          <div className="float-chip chip-bottom">
            <BriefcaseBusiness size={17} /> OneX Properties support
          </div>
          <div className="visual-star star-one">✳</div>
          <div className="visual-star star-two">✳</div>
        </div>
      </div>
      <CourseOverviewStats />
      <div className="hero-bottom">
        <span>ONE STOCK ACADEMY</span>
        <span className="hero-bottom-line" />
        <span>THREE LEARNING PATHWAYS</span>
        <span className="hero-bottom-line" />
        <span>BUILT FOR REAL ESTATE</span>
      </div>
    </section>
  );
}

function CourseOverviewStats() {
  const highlights = [
    {
      title: "3 pathways",
      detail: "Professional, Manager, Expert",
      icon: Target,
    },
    {
      title: "4–6 weeks",
      detail: "depending on your chosen tier",
      icon: Clock3,
    },
    { title: "Practical AI", detail: "for property workflows", icon: House },
    {
      title: "Internship support",
      detail: "after course completion",
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <section
      className="stats-strip"
      aria-label="Real estate programme highlights"
    >
      {highlights.map(({ title, detail, icon: Icon }) => (
        <div className="stat" key={title}>
          <span className="stat-icon">
            <Icon size={20} />
          </span>
          <span>
            <strong>{title}</strong>
            <small>{detail}</small>
          </span>
        </div>
      ))}
    </section>
  );
}

function PathwayCarousel({ onViewCurriculum, onGetStarted }) {
  const viewportRef = useRef(null);
  const activeIndexRef = useRef(0);
  const interactionPausedRef = useRef(false);
  const resumeAutoplayTimeoutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToCard(index, behavior = "smooth") {
    const viewport = viewportRef.current;
    const targetCard = viewport?.querySelectorAll(".pathway-card")[index];
    if (!viewport || !targetCard) return;

    const targetLeft =
      targetCard.getBoundingClientRect().left -
      viewport.getBoundingClientRect().left +
      viewport.scrollLeft;

    viewport.scrollTo({ left: targetLeft, behavior });
  }

  function pauseAutoplay() {
    interactionPausedRef.current = true;
    window.clearTimeout(resumeAutoplayTimeoutRef.current);
    resumeAutoplayTimeoutRef.current = window.setTimeout(() => {
      interactionPausedRef.current = false;
    }, 8000);
  }

  function updateActiveCard() {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const viewportCenter =
      viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    const cards = [...viewport.querySelectorAll(".pathway-card")];
    const closestCardIndex = cards.reduce((closestIndex, card, index) => {
      const cardCenter =
        card.getBoundingClientRect().left + card.offsetWidth / 2;
      const closestCard = cards[closestIndex];
      const closestCenter =
        closestCard.getBoundingClientRect().left + closestCard.offsetWidth / 2;
      return Math.abs(cardCenter - viewportCenter) <
        Math.abs(closestCenter - viewportCenter)
        ? index
        : closestIndex;
    }, 0);

    if (closestCardIndex !== activeIndexRef.current) {
      activeIndexRef.current = closestCardIndex;
      setActiveIndex(closestCardIndex);
    }
  }

  function moveCarousel(direction) {
    const nextIndex =
      (activeIndexRef.current + direction + specialistTracks.length) %
      specialistTracks.length;
    const isWrapping =
      (direction > 0 && nextIndex === 0) ||
      (direction < 0 && activeIndexRef.current === 0);

    pauseAutoplay();
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    scrollToCard(
      nextIndex,
      isWrapping ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    );
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const viewport = viewportRef.current;
      const viewportBounds = viewport?.getBoundingClientRect();
      if (
        !window.matchMedia("(max-width: 700px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.visibilityState !== "visible" ||
        !viewportBounds ||
        viewportBounds.bottom <= 0 ||
        viewportBounds.top >= window.innerHeight ||
        interactionPausedRef.current
      ) {
        return;
      }

      const nextIndex = (activeIndexRef.current + 1) % specialistTracks.length;
      const isWrapping = nextIndex === 0;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      scrollToCard(nextIndex, isWrapping ? "auto" : "smooth");
    }, 6000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(resumeAutoplayTimeoutRef.current);
    };
  }, []);

  return (
    <section
      className="pathway-preview"
      aria-labelledby="pathway-preview-title"
    >
      <div className="pathway-carousel-shell">
        <div className="pathway-carousel-heading">
          <div>
            <p className="section-kicker">FIND YOUR FIT</p>
            <h2 id="pathway-preview-title">
              A pathway for your <span>next move.</span>
            </h2>
            <p className="pathway-preview-intro">
              Choose a focused programme to build practical AI skills for your
              work in real estate.
            </p>
          </div>
        </div>

        <div className="pathway-carousel-toolbar">
          <span className="pathway-carousel-count">
            {String(activeIndex + 1).padStart(2, "0")}{" "}
            <span>/ {String(specialistTracks.length).padStart(2, "0")}</span>
          </span>
          <div className="pathway-carousel-controls">
            <button
              className="pathway-carousel-arrow"
              type="button"
              aria-label="Previous learning pathway"
              onClick={() => moveCarousel(-1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="pathway-carousel-arrow"
              type="button"
              aria-label="Next learning pathway"
              onClick={() => moveCarousel(1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="pathway-carousel-viewport"
          ref={viewportRef}
          onScroll={updateActiveCard}
          onPointerDown={pauseAutoplay}
          onFocusCapture={pauseAutoplay}
          role="region"
          aria-label="Learning pathway carousel"
          tabIndex={0}
        >
          <div className="pathway-carousel-track">
            {specialistTracks.map(
              ({ title, duration, level, image, focus }, index) => (
                <article className="pathway-card" key={title}>
                  <div className="pathway-card-artwork">
                    <img src={image} alt="" loading="lazy" />
                    <div className="pathway-card-artwork-content">
                      <span className="pathway-card-index">
                        PATHWAY 0{index + 1}
                      </span>
                      <h3>{title}</h3>
                    </div>
                  </div>
                  <div className="pathway-card-body">
                    <div>
                      <p className="pathway-card-label">FOCUS</p>
                      <p className="pathway-card-focus">{focus}</p>
                      <div className="pathway-card-tags">
                        <span>
                          <Clock3 size={13} aria-hidden="true" />
                          {duration}
                        </span>
                        <span>
                          <BriefcaseBusiness size={13} aria-hidden="true" />
                          {level}
                        </span>
                      </div>
                    </div>
                    <div className="pathway-card-outcome">
                      <p className="pathway-card-label">OUTCOME</p>
                      <p>
                        <Check size={15} aria-hidden="true" />
                        Course-completion certificate from One Stock Academy
                      </p>
                    </div>
                    <div className="pathway-card-actions">
                      <button
                        className="pathway-card-primary"
                        type="button"
                        onClick={() => onViewCurriculum(title)}
                      >
                        View Curriculum
                      </button>
                      <button
                        className="pathway-card-secondary"
                        type="button"
                        onClick={() => onGetStarted(title)}
                      >
                        Get AI Certified Now
                      </button>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AiAcademyOverview({ onGetStarted }) {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <p className="section-kicker">REAL ESTATE, WITH AI IN PRACTICE</p>
        <h2>
          Market insight meets <span>property work.</span>
        </h2>
      </div>
      <div className="about-content">
        <p className="about-lead">
          Real estate learning from{" "}
          <span className="powered-by-highlight">One Stock Academy</span>,
          associated partner of OneX Properties.
        </p>
        <div className="about-detail">
          <p>
            One Stock Academy is an associated partner of OneX Properties. The
            programme explores how AI can support property analysis, marketing,
            client engagement, and investment decisions, with practical
            real-world assistance. After course completion, learners can receive
            assistance exploring internship opportunities with OneX Properties.
          </p>
          <button className="inline-link" type="button" onClick={onGetStarted}>
            Choose your tier <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="benefit-grid">
        {courseBenefits.map(({ title, description, icon: Icon }, index) => (
          <article className="benefit-card" key={title}>
            <div className="benefit-top">
              <span className="benefit-icon">
                <Icon size={20} />
              </span>
              <span className="benefit-number">0{index + 1}</span>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AlumniGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % alumniImages.length,
      );
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  function showImage(direction) {
    setActiveIndex(
      (currentIndex) =>
        (currentIndex + direction + alumniImages.length) % alumniImages.length,
    );
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") showImage(-1);
    if (event.key === "ArrowRight") showImage(1);
  }

  return (
    <section
      className="alumni-section"
      id="alumni"
      aria-labelledby="alumni-title"
    >
      <h2 className="alumni-title" id="alumni-title">
        Our Alum<span>ni</span>
      </h2>
      <div
        className="alumni-viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Our Alumni"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="alumni-track">
          {[-1, 0, 1].map((offset) => {
            const imageIndex =
              (activeIndex + offset + alumniImages.length) %
              alumniImages.length;
            const { id, image } = alumniImages[imageIndex];
            const position =
              offset === 0 ? "active" : offset < 0 ? "previous" : "next";

            return (
              <article
                className={`alumni-card alumni-card-${position}`}
                key={id}
                aria-hidden={offset !== 0}
                aria-roledescription="slide"
                aria-label={`${imageIndex + 1} of ${alumniImages.length}`}
              >
                <img
                  src={image}
                  alt={offset === 0 ? "One Stock Academy alumni group" : ""}
                />
              </article>
            );
          })}
        </div>
      </div>
      <div className="alumni-controls" aria-label="Alumni gallery navigation">
        <button
          className="alumni-arrow"
          type="button"
          aria-label="Previous alumni photo"
          onClick={() => showImage(-1)}
        >
          <ChevronLeft size={17} />
        </button>
        <span className="alumni-counter" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(alumniImages.length).padStart(2, "0")}
        </span>
        <button
          className="alumni-arrow"
          type="button"
          aria-label="Next alumni photo"
          onClick={() => showImage(1)}
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </section>
  );
}

function TestimonialsCarousel() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [playingTestimonial, setPlayingTestimonial] = useState(null);
  const publishedTestimonials = testimonials
    .filter(({ published }) => published)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (
      !viewport ||
      !track ||
      paused ||
      playingTestimonial !== null ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return undefined;

    let frame = 0;
    const scrollContinuously = () => {
      const loopPoint = track.children[1]?.offsetLeft || 0;
      if (loopPoint > 0) {
        viewport.scrollLeft += 0.5;
        if (viewport.scrollLeft >= loopPoint) viewport.scrollLeft -= loopPoint;
      }
      frame = requestAnimationFrame(scrollContinuously);
    };

    frame = requestAnimationFrame(scrollContinuously);
    return () => cancelAnimationFrame(frame);
  }, [paused, playingTestimonial]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  function pauseBriefly() {
    setPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimerRef.current = null;
    }, 1200);
  }

  function scrollTestimonials(direction) {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector(".testimonial-card");
    if (!viewport || !card) return;

    pauseBriefly();
    viewport.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 16),
      behavior: "smooth",
    });
  }

  return (
    <div className="testimonials-panel">
      <div className="testimonials-heading">
        <div>
          <p className="why-kicker">STUDENT STORIES</p>
          <h3>Learner experiences.</h3>
        </div>
        <div className="testimonial-controls">
          <button
            className="testimonial-arrow"
            type="button"
            aria-label="Scroll testimonials left"
            onClick={() => scrollTestimonials(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="testimonial-arrow"
            type="button"
            aria-label="Scroll testimonials right"
            onClick={() => scrollTestimonials(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="testimonial-viewport"
        role="region"
        aria-label="One Stock Academy testimonials"
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={pauseBriefly}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setPaused(false);
        }}
      >
        <div className="testimonial-track" ref={trackRef}>
          {[0, 1].map((copyIndex) => (
            <div
              className="testimonial-group"
              key={`testimonial-group-${copyIndex}`}
              aria-hidden={copyIndex > 0}
              inert={copyIndex > 0}
            >
              {publishedTestimonials.map(
                ({ id, name, role, text, image, videoId }) => {
                  const isPlaying =
                    playingTestimonial?.id === id &&
                    playingTestimonial.copyIndex === copyIndex;

                  return (
                    <article
                      className="testimonial-card"
                      key={`${id}-${copyIndex}`}
                    >
                      {isPlaying ? (
                        <>
                          <iframe
                            className="testimonial-video"
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&controls=0&rel=0`}
                            title={`${name}'s One Stock Academy testimonial`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          <button
                            className="testimonial-video-close"
                            type="button"
                            aria-label={`Close ${name}'s video`}
                            onClick={() => setPlayingTestimonial(null)}
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <img
                            className="testimonial-poster"
                            src={image}
                            alt=""
                            loading="lazy"
                          />
                          <div
                            className="testimonial-overlay"
                            aria-hidden="true"
                          />
                          <div className="testimonial-card-content">
                            <div className="testimonial-card-heading">
                              <div>
                                <p className="testimonial-kicker">
                                  ONE STOCK ACADEMY
                                </p>
                                <h4 className="testimonial-name">{name}</h4>
                                <p className="testimonial-role">{role}</p>
                              </div>
                              <button
                                className="testimonial-play"
                                type="button"
                                aria-label={`Play ${name}'s testimonial`}
                                onClick={() =>
                                  setPlayingTestimonial({ id, copyIndex })
                                }
                              >
                                <Play size={18} fill="currentColor" />
                              </button>
                            </div>
                            <p className="testimonial-quote">{text}</p>
                          </div>
                        </>
                      )}
                    </article>
                  );
                },
              )}
            </div>
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
            <h2 id="why-ai-title">
              Real estate skills for <span>an AI-enabled market.</span>
            </h2>
            <p>
              Build practical capability across property data, marketing, and
              market intelligence.
            </p>
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
            {whyChooseReasons.map(
              ({ title, description, icon: Icon }, index) => (
                <article className="why-card" key={title}>
                  <span className="why-icon">
                    <Icon size={18} />
                  </span>
                  <div className="why-card-copy">
                    <div className="why-card-heading">
                      <h3>{title}</h3>
                      <span className="why-number">0{index + 1}</span>
                    </div>
                    <p>{description}</p>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
        <TestimonialsCarousel />
      </div>
    </section>
  );
}
function ChooseYourPathSection({ roadmapProgress }) {
  return (
    <section className="tracks-section" id="tracks">
      <div className="section tracks-heading">
        <div>
          <p className="section-kicker">YOUR CAREER ROADMAP</p>
          <h2>
            Choose your path
            <br />
            <span>in real estate.</span>
          </h2>
        </div>
      </div>
      <BrokerRoadmap isProgressing={roadmapProgress} />
    </section>
  );
}

function BrokerRoadmap({ isProgressing }) {
  return (
    <div className={`broker-roadmap${isProgressing ? " is-progressing" : ""}`}>
      <svg
        className="broker-roadmap-track broker-roadmap-track-desktop"
        viewBox="0 0 1000 320"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="broker-roadmap-track-dotted"
          d="M 1000 120 C 960 120 940 120 890 120"
        />
        <path
          className="broker-roadmap-track-base"
          d="M 890 120 C 792.5 120 792.5 220 695 220 C 597.5 220 597.5 120 500 120 C 402.5 120 402.5 220 305 220 C 207.5 220 207.5 120 110 120"
        />
        <path
          className="broker-roadmap-track-dotted"
          d="M 110 120 C 60 120 40 220 0 220"
        />
        <path
          className="broker-roadmap-track-progress"
          d="M 1000 120 C 960 120 940 120 890 120"
        />
      </svg>
      <svg
        className="broker-roadmap-track broker-roadmap-track-mobile"
        viewBox="0 0 40 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="broker-roadmap-track-dotted" d="M 15 0 L 15 60" />
        <path
          className="broker-roadmap-track-base"
          d="M 15 60 L 15 180 L 15 300 L 15 420 L 15 540"
        />
        <path className="broker-roadmap-track-dotted" d="M 15 540 L 15 600" />
        <path className="broker-roadmap-track-progress" d="M 15 0 L 15 60" />
      </svg>
      <ol className="broker-roadmap-list" aria-label="Broker career roadmap">
        {brokerRoadmapSteps.map(({ title, description }, index) => (
          <li
            className={`broker-roadmap-step${index % 2 ? " is-below" : " is-above"}${isProgressing && index === 0 ? " is-reached" : ""}`}
            key={title}
            style={{
              "--step-x": `${89 - index * 19.5}%`,
              "--step-y": index % 2 ? "68.75%" : "37.5%",
              "--step-order": index,
            }}
          >
            <div className="broker-roadmap-copy">
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
            <span className="broker-roadmap-marker" aria-hidden="true">
              {index + 1}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CourseJourney({ onGetStarted }) {
  return (
    <section className="journey-section" id="journey">
      <div className="section journey-content">
        <div>
          <p className="section-kicker">YOUR LEARNING EXPERIENCE</p>
          <h2>
            Learn, apply,
            <br />
            <span>move forward.</span>
          </h2>
          <p className="journey-description">
            Build real estate capability through guided content, practical
            assistance, and support exploring internship opportunities after
            course completion.
          </p>
          <button
            className="button button-light"
            type="button"
            onClick={onGetStarted}
          >
            Register your interest <ArrowRight size={17} />
          </button>
        </div>
        <div className="journey-steps">
          {learningSteps.map(({ title, description }, index) => (
            <div className="journey-step" key={title}>
              <span className="step-count">0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              {index === learningSteps.length - 1 ? (
                <BriefcaseBusiness size={20} />
              ) : (
                <Check size={19} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackSyllabusModal({ track, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const formRef = useRef(null);
  const tier = specialistTracks.find(({ title }) => title === track);
  const { handleSubmit, sending, submitted, error } = useLeadSheetSubmission({
    formRef,
  });

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

  if (!track || !tier) return null;

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      if (
        dialogRef.current?.querySelector(
          ".country-code-picker button[aria-expanded='true']",
        )
      ) {
        return;
      }
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = dialogRef.current?.querySelectorAll(
      "button:not([disabled]), a[href], input:not([disabled]):not([type='hidden']):not([tabindex='-1']), select:not([disabled]), textarea:not([disabled])",
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
        <h2 id="track-modal-title">
          {tier.title}{" "}
          <span>
            ({tier.duration} · {tier.level})
          </span>
        </h2>
        <p className="track-modal-description">
          {tier.focus} One Stock Academy also provides real-world assistance and
          post-course internship assistance with OneX Properties.
        </p>
        {submitted ? (
          <div className="curriculum-lead-success" role="status">
            <p>Your details have been submitted. Your curriculum is ready.</p>
            <a
              className="button track-modal-download"
              href={tier.curriculumUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Download the ${tier.title} curriculum PDF`}
            >
              Download Curriculum <Download size={19} aria-hidden="true" />
            </a>
          </div>
        ) : (
          <form
            className="curriculum-lead-form"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <input name="source" type="hidden" value="show-interest-form" />
            <input name="track" type="hidden" value={tier.title} />
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              hidden
            />
            <label htmlFor="curriculum-lead-name">Your name</label>
            <input
              id="curriculum-lead-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Alex Morgan"
              required
            />
            <label htmlFor="curriculum-lead-email">Email address</label>
            <input
              id="curriculum-lead-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
            <CountryPhoneField
              id="curriculum-lead-phone"
              label="Phone number"
              placeholder="98765 43210"
            />
            <button
              className="button button-primary curriculum-lead-submit"
              type="submit"
              disabled={sending}
            >
              {sending ? "Submitting..." : "Submit details to unlock"}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            {error && (
              <p className="curriculum-lead-error" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </section>
    </div>
  );
}

function CourseFaq() {
  return (
    <section className="section faq-section" id="faq">
      <div className="faq-heading">
        <p className="section-kicker">GOOD TO KNOW</p>
        <h2>
          FAQ<span>s.</span>
        </h2>
        <p>
          Find the right real estate learning pathway for your experience and
          goals.
        </p>
      </div>
      <div className="faq-list">
        {courseFaqs.map(({ question, answer }, index) => (
          <details className="faq-item" key={question} open={index === 0}>
            <summary>
              {question}
              <span className="faq-plus">+</span>
            </summary>
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
  nameArrivalActive,
  error,
  onReset,
}) {
  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span className="success-icon">
          <Check size={24} />
        </span>
        <h3>Thanks for your interest.</h3>
        <p>
          Your details have been added to our enquiry list. One Stock Academy
          will be in touch.
        </p>
        <button className="inline-link" type="button" onClick={onReset}>
          Submit another enquiry <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="form-heading">
        <span>REGISTER YOUR INTEREST</span>
        <h3>Show Interest</h3>
        <p>Share a few details to get started.</p>
      </div>
      <label htmlFor="full-name">Your name</label>
      <input
        id="full-name"
        className={nameArrivalActive ? "is-arrival-highlight" : undefined}
        name="name"
        type="text"
        autoComplete="name"
        placeholder="e.g. Alex Morgan"
        required
      />
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
      />
      <CountryPhoneField
        id="phone"
        label="Phone number"
        placeholder="98765 43210"
      />
      <label htmlFor="track">Choose a learning pathway</label>
      <select
        id="track"
        name="track"
        value={selectedTrack}
        onChange={(event) => onTrackChange(event.target.value)}
      >
        {specialistTracks.map((track) => (
          <option key={track.title} value={track.title}>
            {track.title}
          </option>
        ))}
      </select>
      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={sending}
      >
        {sending ? "Sending..." : "Enquire about this pathway"}{" "}
        <ArrowRight size={17} />
      </button>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}

function WhoThisIsForCard() {
  const audiences = [
    { label: "People beginning a career in real estate", icon: Users },
    { label: "Property professionals building AI skills", icon: House },
    { label: "Real estate marketing teams and managers", icon: Megaphone },
    {
      label: "Experienced professionals pursuing strategic growth",
      icon: Target,
    },
  ];

  return (
    <section className="audience-card" aria-labelledby="audience-title">
      <p className="audience-kicker">FIND YOUR PLACE</p>
      <h3 id="audience-title">Who this is for</h3>
      <h4>Target audience</h4>
      <ul>
        {audiences.map(({ label, icon: AudienceIcon }) => (
          <li key={label}>
            <span className="audience-role-icon" aria-hidden="true">
              <AudienceIcon size={16} strokeWidth={1.8} />
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <p className="audience-partnership">
        <strong>After course completion:</strong> Internship assistance with
        OneX Properties.
      </p>
    </section>
  );
}

function CourseEnrollmentCard({
  selectedTrack,
  onTrackChange,
  onRoadmapProgress,
  onRoadmapReset,
  nameArrivalActive,
}) {
  const formRef = useRef(null);
  const { handleSubmit, resetSubmission, sending, submitted, error } =
    useLeadSheetSubmission({ formRef, onSubmitted: onRoadmapProgress });

  function resetEnquiry() {
    resetSubmission();
    onRoadmapReset();
  }

  return (
    <section
      className="enquiry-section"
      id="enquire"
      aria-label="Register your interest"
    >
      <form ref={formRef} className="enquiry-form" onSubmit={handleSubmit}>
        <input name="source" type="hidden" value="show-interest-form" />
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          hidden
        />
        <InterestForm
          selectedTrack={selectedTrack}
          onTrackChange={onTrackChange}
          sending={sending}
          submitted={submitted}
          nameArrivalActive={nameArrivalActive}
          error={error}
          onReset={resetEnquiry}
        />
      </form>
      <WhoThisIsForCard />
    </section>
  );
}

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState(specialistTracks[0].title);
  const [activeTrack, setActiveTrack] = useState(null);
  const [roadmapProgress, setRoadmapProgress] = useState(false);
  const [nameArrivalActive, setNameArrivalActive] = useState(false);
  const nameArrivalTimeoutRef = useRef(null);
  const closeTrackModal = useCallback(() => setActiveTrack(null), []);

  useEffect(
    () => () => window.clearTimeout(nameArrivalTimeoutRef.current),
    [],
  );

  function goToEnquiry(track, highlightName = false) {
    if (track) setSelectedTrack(track);
    const nameInput = document.querySelector(".enquiry-form #full-name");
    if (highlightName && nameInput) {
      window.clearTimeout(nameArrivalTimeoutRef.current);
      setNameArrivalActive(true);
      nameArrivalTimeoutRef.current = window.setTimeout(
        () => setNameArrivalActive(false),
        5000,
      );
    }
    nameInput?.focus({ preventScroll: true });
    document.getElementById("enquire").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }

  function openTrackSyllabus(track) {
    setSelectedTrack(track);
    setActiveTrack(track);
  }

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Navbar links={navigationLinks} onGetStarted={() => goToEnquiry()} />
      <main>
        <AiCourseHero onGetStarted={() => goToEnquiry()} />
        <PathwayCarousel
          onViewCurriculum={openTrackSyllabus}
          onGetStarted={(track) => goToEnquiry(track, true)}
        />
        <AlumniGallery />
        <AiAcademyOverview onGetStarted={() => goToEnquiry()} />

        <WhyChooseAcademy />
        <div className="course-followup-layout">
          <div className="course-followup-content">
            <ChooseYourPathSection roadmapProgress={roadmapProgress} />
            <CourseJourney onGetStarted={() => goToEnquiry()} />
            <CourseFaq />
          </div>
          <aside className="course-registration-rail">
            <CourseEnrollmentCard
              selectedTrack={selectedTrack}
              onTrackChange={setSelectedTrack}
              onRoadmapProgress={() => setRoadmapProgress(true)}
              onRoadmapReset={() => setRoadmapProgress(false)}
              nameArrivalActive={nameArrivalActive}
            />
          </aside>
        </div>
      </main>
      <Footer />
      <LeadPopup />
      {activeTrack && (
        <TrackSyllabusModal
          key={activeTrack}
          track={activeTrack}
          onClose={closeTrackModal}
        />
      )}
    </>
  );
}
