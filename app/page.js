
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const GITHUB_URL =
  "https://github.com/riihanahhahmedd-oss/RihanahAhmed.github.io";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/rihanah-ahmed-772823392/";

const WORK_EMAIL = "riihanahhessa@gmail.com";
const CV_FILE = "/Rihanah%20Ahmed%20CV.pdf";

const skills = [
  "SQL",
  "Power BI",
  "Excel",
  "Python",
  "Data Visualization",
  "Power Query",
  "DAX",
  "Pandas",
  "NumPy",
  "C++",
  "AI Automation using n8n",
  "Webhooks",
  "Git & GitHub",
];

const navigation = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "about", label: "About", icon: "♙" },
  { id: "skills", label: "Skills", icon: "⌘" },
  { id: "projects", label: "Projects", icon: "▣" },
  { id: "education", label: "Education", icon: "▤" },
  { id: "contact", label: "Contact", icon: "✉" },
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        setError("Unable to load projects right now.");
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      label: "Published Projects",
      value: projects.length,
      icon: "▦",
    },
    {
      label: "Core Skills",
      value: "SQL · Excel · BI · Python",
      icon: "⌘",
    },
    {
      label: "Main Focus",
      value: "Data Analytics & AI",
      icon: "◎",
    },
  ];

  return (
    <main className="portfolio" id="home">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-background" />

      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">RA</span>
          <span>
            Rihanah<span className="brand-accent">.</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={
                activeSection === item.id ? "nav-link active" : "nav-link"
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="availability">
          <span className="availability-dot" />
          Available
        </div>
      </header>

      <div className="page-content">
        <section className="hero-section">
          <div className="hero-copy reveal">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              DATA ANALYST PORTFOLIO
            </p>

            <h1>
              Turning Data
              <br />
              Into <span className="gradient-text">Insights.</span>
            </h1>

            <p className="hero-description">
              I'm <strong>Rihanah Ahmed</strong>, an aspiring Data Analyst
              and Computer Science student passionate about exploring
              data, solving business problems, and transforming raw
              information into meaningful insights.
            </p>

            <p className="hero-description secondary-description">
              Exploring Business Intelligence, AI Agents, and workflow
              automation using Python and n8n.
            </p>

            <div className="hero-actions">
              <a
                href={CV_FILE}
                download="Rihanah_Ahmed_CV.pdf"
                className="button button-primary"
              >
                Download CV <span>↓</span>
              </a>

              <a href="#contact" className="button button-outline">
                Let's Connect <span>↗</span>
              </a>
            </div>

            <div className="hero-socials">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <span />
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="visual-label label-top">
              <span className="pulse-dot" />
              DATA IN MOTION
            </div>

            <div className="data-window">
              <div className="window-header">
                <div className="window-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>analytics_dashboard.py</span>
                <span className="window-status">LIVE</span>
              </div>

              <div className="window-body">
                <div className="terminal-heading">
                  <span>01 / DATA OVERVIEW</span>
                  <span>✦</span>
                </div>

                <h3>Insights that<br />drive decisions.</h3>

                <div className="chart-area">
                  <div className="chart-grid">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <svg
                    className="chart-line"
                    viewBox="0 0 400 130"
                    preserveAspectRatio="none"
                    aria-label="Decorative analytics chart"
                  >
                    <defs>
                      <linearGradient id="chartGradient">
                        <stop offset="0%" stopColor="#00e5ff" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 105 C35 95 40 65 80 78 S130 100 165 60 S220 70 250 38 S305 55 335 20 S375 35 400 5"
                      fill="none"
                      stroke="url(#chartGradient)"
                      strokeWidth="3"
                    />
                    <path
                      d="M0 105 C35 95 40 65 80 78 S130 100 165 60 S220 70 250 38 S305 55 335 20 S375 35 400 5 L400 130 L0 130 Z"
                      fill="url(#chartGradient)"
                      opacity=".10"
                    />
                  </svg>
                </div>

                <div className="visual-metrics">
                  <div>
                    <span>DATA</span>
                    <strong>Clean</strong>
                  </div>
                  <div>
                    <span>ANALYSIS</span>
                    <strong>Explore</strong>
                  </div>
                  <div>
                    <span>RESULT</span>
                    <strong>Insights</strong>
                  </div>
                </div>

                <div className="code-lines">
                  <p><span>01</span> data = collect_information()</p>
                  <p><span>02</span> insights = analyze(data)</p>
                  <p><span>03</span> visualize(insights)</p>
                </div>
              </div>
            </div>

            <div className="floating-card float-card-one">
              <span className="floating-icon cyan">⌘</span>
              <div>
                <small>CORE TOOL</small>
                <strong>Power BI</strong>
              </div>
            </div>

            <div className="floating-card float-card-two">
              <span className="floating-icon purple">✦</span>
              <div>
                <small>EXPLORING</small>
                <strong>AI Automation</strong>
              </div>
            </div>

            <div className="visual-label label-bottom">
              <span className="pulse-dot purple-dot" />
              CURIOUS MIND. DATA-DRIVEN APPROACH.
            </div>
          </div>
        </section>

        <section className="stats-grid reveal">
          {stats.map((item) => (
            <article className="stat-card" key={item.label}>
              <span className="stat-icon">{item.icon}</span>
              <div>
                <p>{item.label}</p>
                <h2>{item.value}</h2>
              </div>
              <span className="card-corner">✦</span>
            </article>
          ))}
        </section>

        <section className="section-block about-section" id="about">
          <div className="section-title reveal">
            <p className="eyebrow">01 / ABOUT ME</p>
            <h2>
              Curious mind.
              <br />
              <span className="gradient-text">Data-driven approach.</span>
            </h2>
          </div>

          <div className="about-card glass-card reveal">
            <div className="about-marker">RA<span>.</span></div>
            <div>
              <h3>Turning curiosity into meaningful insights.</h3>
              <p>
                I'm Rihanah Ahmed, a second-year Computer Science
                student at Tanta University with a strong interest in
                Data Analytics and Business Intelligence. I enjoy
                collecting, cleaning, analyzing, and visualizing data
                to discover patterns and solve business problems.
              </p>
              <p>
                I'm also exploring AI Automation using n8n, Python,
                APIs, and AI Agents to build smarter workflows and
                automate repetitive tasks.
              </p>
            </div>
            <span className="about-decoration">01</span>
          </div>
        </section>

        <section className="section-block" id="skills">
          <div className="section-title reveal">
            <p className="eyebrow">02 / DOMAIN EXPERTISE</p>
            <h2>
              Tools I use to
              <span className="gradient-text"> make data useful.</span>
            </h2>
          </div>

          <div className="skills-grid reveal">
            {skills.map((skill, index) => (
              <div className="skill-card" key={skill}>
                <span className="skill-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{skill}</span>
                <span className="skill-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block" id="projects">
          <div className="section-heading reveal">
            <div className="section-title">
              <p className="eyebrow">03 / SELECTED WORK</p>
              <h2>
                Projects that <span className="gradient-text">speak.</span>
              </h2>
            </div>

            <span className="project-count">
              {loading ? "LOADING..." : `${projects.length} PROJECTS`}
            </span>
          </div>

          {loading && (
            <div className="empty-state">Loading published projects...</div>
          )}

          {!loading && error && (
            <div className="empty-state">{error}</div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="empty-state">
              My data analytics projects and business case studies
              will be showcased here soon.
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className="project-card glass-card" key={project.id}>
                  <div className="project-topline">
                    <div className="window-dots">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span>PROJECT / {String(index + 1).padStart(2, "0")}</span>
                  </div>

                  {project.cover_image_url && (
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      className="project-image"
                    />
                  )}

                  <p className="eyebrow">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>

                  {project.tools?.length > 0 && (
                    <div className="skills project-tools">
                      {project.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-links">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer">
                        GitHub ↗
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer">
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section-block" id="education">
          <div className="section-title reveal">
            <p className="eyebrow">04 / EDUCATION</p>
            <h2>
              Learning today.
              <span className="gradient-text"> Building tomorrow.</span>
            </h2>
          </div>

          <div className="education-card glass-card reveal">
            <div className="education-icon">⌘</div>
            <div>
              <span className="education-year">2025 — EXPECTED 2029</span>
              <h3>B.Sc. in Computer Science</h3>
              <p>
                Faculty of Computers and Information,
                Tanta University, Egypt.
              </p>
              <span className="education-status">SECOND-YEAR UNDERGRADUATE</span>
            </div>
          </div>
        </section>

        <section className="contact-section reveal" id="contact">
          <div className="contact-glow" />
          <p className="eyebrow">05 / LET'S CONNECT</p>
          <h2>
            Have an opportunity
            <br />
            <span className="gradient-text">in mind?</span>
          </h2>
          <p>
            I'd love to connect and discuss Data Analytics,
            Business Intelligence, and AI Automation.
          </p>

          <a
            className="button button-primary"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${WORK_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Me <span>↗</span>
          </a>
        </section>

        <footer className="footer">
          <a className="brand" href="#home">
            <span className="brand-icon">RA</span>
            <span>Rihanah<span className="brand-accent">.</span></span>
          </a>
          <p>© 2026 Rihanah Ahmed · Built with purpose.</p>
          <a href="#home" className="back-to-top">Back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
