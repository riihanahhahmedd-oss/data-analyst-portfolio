
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";

export default function NewProjectPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    category: "Data Analytics",
    tools: "",
    business_problem: "",
    insights: "",
    github_url: "",
    live_url: "",
    cover_image_url: "",
    status: "draft",
  });

  useEffect(() => {
    async function checkAdmin() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/admin/login");
        return;
      }

      setChecking(false);
    }

    checkAdmin();
  }, [router]);

  function updateField(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "title" && {
        slug: value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      }),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      router.replace("/admin/login");
      return;
    }

    const project = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary.trim(),
      description: form.description.trim(),
      category: form.category,
      tools: form.tools.split(",").map((item) => item.trim()).filter(Boolean),
      business_problem: form.business_problem.trim(),
      insights: form.insights.split("\n").map((item) => item.trim()).filter(Boolean),
      github_url: form.github_url.trim() || null,
      live_url: form.live_url.trim() || null,
      cover_image_url: form.cover_image_url.trim() || null,
      status: form.status,
    };

    const { error } = await supabase
      .from("projects")
      .insert(project);

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  if (checking) {
    return <main style={styles.page}>Checking admin access...</main>;
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          style={styles.back}
        >
          ← Back to Dashboard
        </button>

        <h1 style={styles.title}>Create New Project</h1>
        <p style={styles.subtitle}>
          Add a new project to your Data Analyst Portfolio.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            ["title", "Project Title", true],
            ["summary", "Short Summary", true],
            ["description", "Full Description", true],
            ["business_problem", "Business Problem", true],
            ["github_url", "GitHub URL", false],
            ["live_url", "Live Demo URL", false],
            ["cover_image_url", "Cover Image URL", false],
          ].map(([name, label, required]) => (
            <label key={name} style={styles.label}>
              {label}
              <textarea
                name={name}
                value={form[name]}
                onChange={updateField}
                required={required}
                rows={name === "description" || name === "business_problem" ? 4 : 2}
                style={styles.input}
              />
            </label>
          ))}

          <label style={styles.label}>
            Project Slug
            <input
              name="slug"
              value={form.slug}
              onChange={updateField}
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Category
            <select
              name="category"
              value={form.category}
              onChange={updateField}
              style={styles.input}
            >
              <option>Data Analytics</option>
              <option>Business Intelligence</option>
              <option>Data Visualization</option>
              <option>SQL</option>
              <option>Python</option>
              <option>Machine Learning</option>
            </select>
          </label>

          <label style={styles.label}>
            Tools (separate with commas)
            <input
              name="tools"
              value={form.tools}
              onChange={updateField}
              placeholder="SQL, Power BI, Python"
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Key Insights (one per line)
            <textarea
              name="insights"
              value={form.insights}
              onChange={updateField}
              rows={4}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Project Status
            <select
              name="status"
              value={form.status}
              onChange={updateField}
              style={styles.input}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={saving} style={styles.submit}>
            {saving ? "Saving Project..." : "Save Project"}
          </button>
        </form>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#101114",
    color: "#ffffff",
    padding: "35px 20px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "850px",
    margin: "auto",
  },
  back: {
    background: "transparent",
    color: "#d6ad60",
    border: "none",
    cursor: "pointer",
    marginBottom: "25px",
    fontSize: "15px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#999",
    marginBottom: "30px",
  },
  form: {
    background: "#191b20",
    border: "1px solid #303238",
    borderRadius: "14px",
    padding: "25px",
    display: "grid",
    gap: "20px",
  },
  label: {
    display: "grid",
    gap: "9px",
    color: "#ddd",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "#101114",
    border: "1px solid #383a40",
    borderRadius: "8px",
    padding: "13px",
    color: "#fff",
    fontSize: "15px",
  },
  submit: {
    background: "#d6ad60",
    color: "#101114",
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "#ff7777",
    overflowWrap: "anywhere",
  },
};
