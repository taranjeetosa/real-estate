import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Brain,
  Check,
  Clock3,
  Code2,
  Sparkles,
  Target,
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

const navigationLinks = [
  { label: "About", href: "#about" },
  { label: "Specialist tracks", href: "#tracks" },
  { label: "Why AI Academy", href: "#why-ai" },
];

function AiCourseHero({ onGetStarted }) {
  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> SKILL EDUCATION <span className="eyebrow-divider">/</span> BRAINCRUISE CERTIFIED</p>
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
          <div className="float-chip chip-bottom"><BadgeCheck size={17} /> Braincruise certified</div>
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
    { title: "Certificate", detail: "issued by Braincruise", icon: BadgeCheck },
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
          the work you already do.
        </p>
        <div className="about-detail">
          <p>Every track is hands-on and no-code by design. Choose a specialisation made for your function or industry, practise with useful AI tools, and leave with workflows you can put to work right away.</p>
          <button className="inline-link" type="button" onClick={onGetStarted}>Choose your track <ArrowRight size={16} /></button>
        </div>
      </div>
      <div className="benefit-grid" id="why-ai">
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
            <button className="track-link" type="button" onClick={() => onChooseTrack(title)} aria-label={`Enquire about ${title}`}>
              Explore this track <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
      <div className="tracks-note"><span className="note-mark"><Sparkles size={17} /></span><p>Every track includes <strong>10 lessons</strong>, around <strong>20 hours</strong> of online learning, and a Braincruise-issued certificate on completion.</p></div>
    </section>
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
        <h2>Questions, <span>answered.</span></h2>
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
  const [submitted, setSubmitted] = useState(false);

  function goToEnquiry(track) {
    if (track) setSelectedTrack(track);
    document.getElementById("enquire").scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
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
        <CourseModules onChooseTrack={goToEnquiry} />
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
    </>
  );
}
