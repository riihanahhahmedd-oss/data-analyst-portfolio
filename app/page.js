
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const GITHUB_URL =
  "https://github.com/riihanahhahmedd-oss/RihanahAhmed.github.io";

const WORK_EMAIL = "riihanahhessa@gmail.com";

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
  "Scikit-learn",
  "C++",
  "AI Automation using n8n",
  "REST APIs",
  "Webhooks",
  "Git & GitHub",
  "Docker",
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      label: "Focus",
      value: "Data Analytics & AI Automation",
      icon: "◎",
    },
  ];

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar">RA</div>
          <h2>Rihannah Ahmed Essa</h2>
          <p>Data Analyst</p>
          <span className="status">
            ● OPEN TO OPPORTUNITIES
          </span>
        </div>

        <nav>
          <a className="active" href="#dashboard">
            ▦ Dashboard
          </a>
          <a href="#about">♙ About Me</a>
          <a href="#projects">▣ Projects</a>
          <a href="#skills">⌘ Skills</a>
          <a href="#education">▤ Education</a>
          <a href="#contact">✉ Contact</a>
        </nav>

        <div className="sidebar-footer">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </aside>

      <section className="content" id="dashboard">
        <header className="topbar">
          <span>✦ DATA ANALYTICS PORTFOLIO</span>
          <span className="live">PERSONAL PORTFOLIO</span>
        </header>

        <section className="hero">
          <p className="eyebrow">
            WELCOME TO MY PORTFOLIO
          </p>

          <h1>
            Turning Data into <span>Insights.</span>
          </h1>

          <p>
            I'm Rihannah Ahmed Essa, an aspiring Data Analyst
            and Computer Science student passionate about
            exploring data, solving business problems, and
            transforming raw information into meaningful
            insights. I'm also interested in AI Agents and
            workflow automation using n8n.
          </p>

          <div className="hero-actions">
            <a
              href="/Rihannah_Ahmed_CV.pdf"
              download
              className="primary-button"
            >
              Download My CV ↓
            </a>

            <a
              href={`mailto:${WORK_EMAIL}`}
              className="secondary-button"
            >
              Contact Me ↗
            </a>
          </div>
        </section>

        <section className="stats">
          {stats.map((item) => (
            <article className="stat-card" key={item.label}>
              <span className="stat-icon">{item.icon}</span>
              <p>{item.label}</p>
              <h2>{item.value}</h2>
            </article>
          ))}
        </section>

        <section className="main-grid">
          <article className="panel" id="about">
            <p className="eyebrow">01 / ABOUT ME</p>

            <h2>
              Curious mind. Data-driven approach.
            </h2>

            <p>
              I'm Rihannah Ahmed Essa, a second-year
              Computer Science student at Tanta University
              with a strong interest in Data Analytics and
              Business Intelligence. I enjoy collecting,
              cleaning, analyzing, and visualizing data to
              discover patterns and solve business problems.

              I'm also exploring AI Automation using n8n,
              Python, APIs, and AI Agents to build smarter
              workflows and automate repetitive tasks.
            </p>
          </article>

          <article className="panel" id="skills">
            <p className="eyebrow">
              02 / DOMAIN EXPERTISE
            </p>

            <h2>Technical Skills</h2>

            <div className="skills">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        </section>

        <section className="panel projects" id="projects">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / SELECTED WORK</p>
              <h2>Featured Projects</h2>
            </div>

            <span className="coming">
              {loading
                ? "LOADING PROJECTS..."
                : `${projects.length} PROJECTS`}
            </span>
          </div>

          {loading && (
            <p>Loading published projects...</p>
          )}

          {!loading && error && (
            <p>{error}</p>
          )}

          {!loading && !error && projects.length === 0 && (
            <p>
              My data analytics projects and business case
              studies will be showcased here soon.
            </p>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="project-list">
              {projects.map((project) => (
                <article
                  className="project-card"
                  key={project.id}
                >
                  {project.cover_image_url && (
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      className="project-image"
                    />
                  )}

                  <p className="eyebrow">
                    {project.category}
                  </p>

                  <h3>{project.title}</h3>

                  <p>{project.summary}</p>

                  {project.tools?.length > 0 && (
                    <div className="skills">
                      {project.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-links">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="panel" id="education">
          <p className="eyebrow">04 / EDUCATION</p>

          <h2>Education & Learning</h2>

          <h3>
            B.Sc. in Computer Science
          </h3>

          <p>
            Second-Year Undergraduate — 2025–Expected 2029
          </p>

          <p>
            Faculty of Computers and Information,
            Tanta University, Egypt.
          </p>
        </section>

        <section className="contact" id="contact">
          <div>
            <p className="eyebrow">LET'S CONNECT</p>

            <h2>Have an opportunity in mind?</h2>

            <p>
              I'd love to connect and discuss Data Analytics,
              Business Intelligence, and AI Automation.
            </p>
          </div>

          <a href={`mailto:${WORK_EMAIL}`}>
            Contact Me ↗
          </a>
        </section>

        <footer>
          <div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            {" · "}
            <a href={`mailto:${WORK_EMAIL}`}>
              Email ↗
            </a>
          </div>

          <p>
            © 2026 Rihannah Ahmed Essa · Built with purpose.
          </p>
        </footer>
      </section>
    </main>
  );
}
