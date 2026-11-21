
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      const { data: { session } } =
        await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      setEmail(session.user.email || "");

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Projects error:", error.message);
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    }

    loadDashboard();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.muted}>Welcome, {email}</p>
        </div>

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </header>

      <section style={styles.card}>
        <h2>Projects Overview</h2>
        <h1 style={styles.number}>{projects.length}</h1>
        <p style={styles.muted}>Total projects in your database</p>
      </section>

      <section style={styles.card}>
        <h2>Your Projects</h2>

        {projects.length === 0 ? (
          <p style={styles.muted}>
            No projects found. We will add your first project soon!
          </p>
        ) : (
          projects.map((project) => (
            <div key={project.id} style={styles.project}>
              <strong>{project.title}</strong>
              <span style={styles.muted}>
                {project.status}
              </span>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#101114",
    color: "#ffffff",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
    gap: "20px",
  },
  title: {
    fontSize: "30px",
    marginBottom: "8px",
  },
  muted: {
    color: "#999999",
  },
  button: {
    background: "#d6ad60",
    color: "#101114",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  card: {
    background: "#191b20",
    border: "1px solid #303238",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "25px",
  },
  number: {
    fontSize: "38px",
    color: "#d6ad60",
  },
  project: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
    borderBottom: "1px solid #303238",
  },
};
