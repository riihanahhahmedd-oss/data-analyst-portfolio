
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const skills = ["SQL", "Power BI", "Python", "Excel", "Data Visualization"];

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
    { label: "Published Projects", value: projects.length, icon: "▦" },
    { label: "Core Skills", value: "SQL · BI · Python", icon: "⌘" },
    { label: "Focus", value: "Data Analytics", icon: "◎" },
  ];

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar">RA</div>
          <h2>Your Name</h2>
          <p>Data Analyst</p>
          <span className="status">● OPEN TO OPPORTUNITIES</span>
        </div>

        <nav>
          <a className="active" href="#dashboard">▦ Dashboard</a>
          <a href="#about">♙ About Me</a>
          <a href="#projects">▣ Projects</a>
          <a href="#skills">⌘ Skills</a>
          <a href="#education">▤ Education</a>
          <a href="#contact">✉ Contact</a>
        </nav>

        <div className="sidebar-footer">
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </aside>

      <section className="content" id="dashboard">
        <header className="topbar">
          <span>✦ DATA ANALYTICS PORTFOLIO</span>
          <span className="live">PERSONAL PORTFOLIO</span>
        </header>

        <section className="hero">
          <p className="eyebrow">WELCOME TO MY PORTFOLIO</p>
          <h1>My Career at a <span>Glance.</span></h1>
          <p>
            Turning data into meaningful insights and helping businesses
            make smarter, data-driven decisions.
          </p>
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
            <h2>Curious mind. Data-driven approach.</h2>
            <p>
              I am a Computer and Information student passionate about
              data analysis, problem solving, and transforming raw data
              into useful business insights.
            </p>
          </article>

          <article className="panel" id="skills">
            <p className="eyebrow">02 / DOMAIN EXPERTISE</p>
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
              {loading ? "LOADING PROJECTS..." : `${projects.length} PROJECTS`}
            </span>
          </div>

          {loading && <p>Loading published projects...</p>}

          {!loading && error && <p>{error}</p>}

          {!loading && !error && projects.length === 0 && (
            <p>
              No published projects yet. My data analytics projects and
              business case studies will be showcased here soon.
            </p>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="project-list">
              {projects.map((project) => (
                <article className="project-card" key={project.id}>
                  {project.cover_image_url && (
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      className="project-image"
                    />
                  )}

                  <p className="eyebrow">{project.category}</p>
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

        <section className="panel" id="education">
          <p className="eyebrow">04 / EDUCATION</p>
          <h2>Education & Learning</h2>
          <p>Computer and Information — Tanta University</p>
        </section>

        <section className="contact" id="contact">
          <div>
            <p className="eyebrow">LET'S CONNECT</p>
            <h2>Have an opportunity in mind?</h2>
            <p>I'd love to connect and discuss data analytics.</p>
          </div>
          <a href="mailto:your-email@example.com">Contact Me ↗</a>
        </section>

        <footer>© 2026 Your Name · Built with purpose.</footer>
      </section>
    </main>
  );
}
