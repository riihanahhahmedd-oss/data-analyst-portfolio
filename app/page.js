
const stats = [
  { label: "Projects", value: "Coming Soon", icon: "▦" },
  { label: "Core Skills", value: "SQL · BI · Python", icon: "⌘" },
  { label: "Focus", value: "Data Analytics", icon: "◎" },
];

const skills = ["SQL", "Power BI", "Python", "Excel", "Data Visualization"];

export default function Home() {
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
          <a href="https://github.com/" target="_blank">GitHub ↗</a>
          <a href="https://linkedin.com/" target="_blank">LinkedIn ↗</a>
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
            <span className="coming">PROJECTS COMING SOON</span>
          </div>
          <p>
            My data analytics projects and business case studies
            will be showcased here.
          </p>
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
