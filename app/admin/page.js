
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

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
        setMessage("Could not load projects: " + error.message);
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

  async function togglePublish(project) {
    const newStatus =
      project.status === "published" ? "draft" : "published";

    setBusyId(project.id);
    setMessage("");

    const { error } = await supabase
      .from("projects")
      .update({ status: newStatus })
      .eq("id", project.id);

    if (error) {
      setMessage("Update failed: " + error.message);
    } else {
      setProjects((current) =>
        current.map((item) =>
          item.id === project.id
            ? { ...item, status: newStatus }
            : item
        )
      );

      setMessage(
        newStatus === "published"
          ? "Project published successfully!"
          : "Project moved to Draft successfully!"
      );
    }

    setBusyId(null);
  }

  async function deleteProject(project) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setBusyId(project.id);
    setMessage("");

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

    if (error) {
      setMessage("Delete failed: " + error.message);
    } else {
      setProjects((current) =>
        current.filter((item) => item.id !== project.id)
      );

      setMessage("Project deleted successfully!");
    }

    setBusyId(null);
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <p>Loading dashboard...</p>
      </main>
    );
  }

  const publishedCount = projects.filter(
    (project) => project.status === "published"
  ).length;

  const draftCount = projects.filter(
    (project) => project.status === "draft"
  ).length;

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.muted}>Welcome, {email}</p>
        </div>

        <div style={styles.headerActions}>
          <button
            onClick={() => router.push("/admin/projects/new")}
            style={styles.primaryButton}
          >
            + Add New Project
          </button>

          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      </header>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      <section style={styles.statsGrid}>
        <div style={styles.card}>
          <p style={styles.muted}>Total Projects</p>
          <h2 style={styles.number}>{projects.length}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.muted}>Published</p>
          <h2 style={styles.publishedNumber}>{publishedCount}</h2>
        </div>

        <div style={styles.card}>
          <p style={styles.muted}>Drafts</p>
          <h2 style={styles.draftNumber}>{draftCount}</h2>
        </div>
      </section>

      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Your Projects</h2>

        {projects.length === 0 ? (
          <p style={styles.muted}>
            No projects found. Add your first project!
          </p>
        ) : (
          projects.map((project) => (
            <div key={project.id} style={styles.project}>
              <div style={styles.projectInfo}>
                <strong>{project.title}</strong>

                <span
                  style={
                    project.status === "published"
                      ? styles.publishedBadge
                      : styles.draftBadge
                  }
                >
                  {project.status.toUpperCase()}
                </span>

                <span style={styles.category}>
                  {project.category || "Uncategorized"}
                </span>
              </div>

              <div style={styles.projectActions}>
                <button
                  onClick={() => togglePublish(project)}
                  disabled={busyId === project.id}
                  style={
                    project.status === "published"
                      ? styles.unpublishButton
                      : styles.publishButton
                  }
                >
                  {busyId === project.id
                    ? "Please wait..."
                    : project.status === "published"
                    ? "Unpublish"
                    : "Publish"}
                </button>

                <button
                  onClick={() => deleteProject(project)}
                  disabled={busyId === project.id}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
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
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "35px",
  },
  headerActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  title: {
    fontSize: "30px",
    marginBottom: "8px",
  },
  muted: {
    color: "#999999",
  },
  button: {
    background: "#303238",
    color: "#ffffff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  primaryButton: {
    background: "#d6ad60",
    color: "#101114",
    border: "none",
    padding: "12px 22px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
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
    margin: "10px 0 0",
  },
  publishedNumber: {
    fontSize: "38px",
    color: "#65c98b",
    margin: "10px 0 0",
  },
  draftNumber: {
    fontSize: "38px",
    color: "#e5b75d",
    margin: "10px 0 0",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "15px",
  },
  project: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "15px",
    padding: "18px 0",
    borderBottom: "1px solid #303238",
  },
  projectInfo: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  publishedBadge: {
    background: "#173d2a",
    color: "#65c98b",
    padding: "5px 9px",
    borderRadius: "5px",
    fontSize: "11px",
  },
  draftBadge: {
    background: "#44351b",
    color: "#e5b75d",
    padding: "5px 9px",
    borderRadius: "5px",
    fontSize: "11px",
  },
  category: {
    color: "#999999",
    fontSize: "13px",
  },
  projectActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  publishButton: {
    background: "#245c3a",
    color: "#ffffff",
    border: "none",
    padding: "9px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  unpublishButton: {
    background: "#55421e",
    color: "#ffffff",
    border: "none",
    padding: "9px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#702d2d",
    color: "#ffffff",
    border: "none",
    padding: "9px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    background: "#252830",
    border: "1px solid #454954",
    borderRadius: "8px",
    padding: "14px",
    marginBottom: "20px",
    color: "#ffffff",
  },
};
