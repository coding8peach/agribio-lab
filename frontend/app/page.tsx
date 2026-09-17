"use client";

import { useState } from "react";

export default function Home() {
  /////////
  // 1. STATE
  /////////////
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(0);
  const [showForm, setShowForm] = useState(true);

  const [form, setForm] = useState({
    interests: "",
    skills: "",
    resources: "",
    duration: "12 weeks",
    budget: "$300",
    required_domains:
      "The project must combine agriculture or biology with AI or machine learning.",
    preferred_features:
      "Hardware, sensors, cameras, or microcontrollers when scientifically useful.",
    exploration_preferences:
      "Original data collection, emerging technology, prediction, low-cost innovation, and real-world applications.",
  });

  /////////////////////////////////
  // 2. FUNCTIONS / EVENT HANDLERS
  //////////////////////////////////

  function updateField(field: string, value: string) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  async function generateIdeas() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/research-projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setSelectedProject(0);
      setShowForm(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }
  function loadExample() {
    setForm({
      interests:
        "plant biology, sustainable agriculture, artificial intelligence, and computer vision",
      skills:
        "AP Biology, Python programming, basic machine learning, and basic electronics",
      resources:
        "school greenhouse, laptop, webcam, Raspberry Pi, and common low-cost sensors",
      duration: "12 weeks",
      budget: "$300",
      required_domains:
        "The project must combine agriculture or biology with AI or machine learning.",
      preferred_features:
        "Hardware, sensors, cameras, or microcontrollers when scientifically useful.",
      exploration_preferences:
        "Original data collection, emerging technology, prediction, low-cost innovation, and real-world applications.",
    });
  }

  function exportProject(project: any) {
    const bulletList = (items: string[]) =>
      items.map((item) => `- ${item}`).join("\n");

    const markdown = `# ${project.title}

  ## Research Question

  ${project.research_question}

  ## Scientific Interest

  ${project.scientific_interest}

  ## Scientific Depth

  ${project.scientific_depth}

  ## AI / ML Depth

  ${project.ai_ml_depth}

  ## Experimental Depth

  ${project.experimental_depth}

  ## Feasibility

  ${project.feasibility}

  ## Original Data Potential

  ${project.original_data_potential}

  ## Strengths

  ${bulletList(project.strengths)}

  ## Challenges

  ${bulletList(project.weaknesses)}

  ## Minimum Viable Project

  ${project.minimum_viable_version}

  ## Stretch Version

  ${project.stretch_version}

  ## Major Risks

  ${bulletList(project.major_risks)}

  ## Recommended Scope Changes

  ${bulletList(project.recommended_scope_changes)}

  ## Skills to Learn

  ${bulletList(project.skills_to_learn)}

  ## Preliminary Work

  ${bulletList(project.preliminary_work_needed)}
  `;

    const blob = new Blob([markdown], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "agribio-research-project.md";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  /////////
  // 3. UI
  /////////////

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-3xl">
        {/* <h1 className="text-4xl font-bold">AgriBio Lab</h1>

        <p className="mt-2 text-gray-600">
          AI-powered research project exploration for student researchers.
        </p> */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            🌱 AgriBio Lab
          </h1>

          <p className="mt-2 text-gray-500">
            AI-powered research project exploration for student researchers.
          </p>
        </div>

        {result && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2
                      text-sm font-medium text-gray-700 shadow-sm
                      hover:bg-gray-50"
          >
            {showForm ? "Hide Inputs" : "✎ Edit Inputs"}
          </button>
        )}
      </div>
      {showForm && (
        <div className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow-sm">

          {/* Form header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Project Profile
            </h2>

            <button
              type="button"
              onClick={loadExample}
              className="text-sm font-medium text-green-700 hover:text-green-800"
            >
              Load Example
            </button>
          </div>

          <Field
            label="What are you interested in?"
            value={form.interests}
            onChange={(value) => updateField("interests", value)}
          />

          <Field
            label="What skills do you already have?"
            value={form.skills}
            onChange={(value) => updateField("skills", value)}
          />

          <Field
            label="What resources do you have?"
            value={form.resources}
            onChange={(value) => updateField("resources", value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Project duration"
              value={form.duration}
              onChange={(value) => updateField("duration", value)}
            />

            <Field
              label="Budget"
              value={form.budget}
              onChange={(value) => updateField("budget", value)}
            />
          </div>

          {/* <button
            className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Explore Research Ideas
          </button> */}
          <button
            onClick={generateIdeas}
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Generating recommendations..."
              : result
                ? "Regenerate Recommendations"
                : "Explore Research Ideas"}
          </button>
{loading && (
  <div className="rounded-xl bg-green-50 p-4 text-center">
    <p className="font-medium text-green-900">
      Your AI research team is working...
    </p>

    <p className="mt-1 text-sm text-green-700">
      Researching, refining, and evaluating project ideas. This may take a few minutes.
    </p>
  </div>
)}

{error && (
  <div className="rounded-xl border border-red-200 bg-red-50 p-4">
    <p className="font-medium text-red-800">
      We couldn't generate the recommendations.
    </p>

    <p className="mt-1 text-sm text-red-600">
      {error}
    </p>

    <button
      onClick={generateIdeas}
      className="mt-3 text-sm font-semibold text-red-700 hover:text-red-900"
    >
      Try Again
    </button>
  </div>
)}
            {/* {result && (
              <pre className="overflow-auto rounded-lg bg-gray-100 p-4 text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            )} */}



        </div>
)}
{result && (
  <div className="mt-12">
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
        Research Recommendations
      </p>

      <h2 className="mt-1 text-3xl font-bold text-gray-900">
        Explore your project directions
      </h2>

      <p className="mt-2 text-gray-500">
        Compare three research concepts developed by your AI research team.
      </p>
    </div>

    {/* PROJECT TABS */}
    <div className="flex border-b border-gray-200">
      {result.reviews.map((project: any, index: number) => (
        <button
          key={project.title}
          onClick={() => setSelectedProject(index)}
          className={`border-b-2 px-6 py-3 text-sm font-semibold transition ${
            selectedProject === index
              ? "border-green-700 text-green-700"
              : "border-transparent text-gray-500 hover:text-gray-800"
          }`}
        >
          Project {index + 1}
        </button>
      ))}
    </div>

    {/* PROJECT CONTENT */}
    <ProjectDetail
      project={result.reviews[selectedProject]}
      number={selectedProject + 1}
      onExport={() =>
        exportProject(result.reviews[selectedProject])
      }
    />
  </div>
)}
      </div>

    </main>
  );
}

function ProjectDetail({
  project,
  number,
  onExport,
}: {
  project: any;
  number: number;
  onExport: () => void;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-green-700">
            Project {number}
          </p>

          <h3 className="mt-2 text-2xl font-bold leading-tight text-gray-900">
            {project.title}
          </h3>
        </div>

        <button
          onClick={onExport}
          className="shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          ↓ Export
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-green-50 p-5">
        <p className="text-sm font-semibold text-green-900">
          Research Question
        </p>

        <p className="mt-2 leading-7 text-gray-700">
          {project.research_question}
        </p>
      </div>

      {/* DEPTH SUMMARY */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryBox
          label="Scientific Depth"
          value={project.scientific_depth}
        />

        <SummaryBox
          label="AI / ML Depth"
          value={project.ai_ml_depth}
        />

        <SummaryBox
          label="Feasibility"
          value={project.feasibility}
        />
      </div>

      {/* STRENGTHS / WEAKNESSES */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">

        <div>
          <h4 className="font-semibold text-gray-900">
            Strengths
          </h4>

          <ul className="mt-3 space-y-3">
            {project.strengths.map((item: string) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-6 text-gray-600"
              >
                <span className="font-bold text-green-700">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">
            Challenges
          </h4>

          <ul className="mt-3 space-y-3">
            {project.weaknesses.map((item: string) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-6 text-gray-600"
              >
                <span className="text-amber-600">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* EXPANDABLE DETAILS */}
      <div className="mt-8 border-t border-gray-200 pt-4">

        <Detail
          title="Minimum Viable Project"
          content={project.minimum_viable_version}
        />

        <Detail
          title="Stretch Version"
          content={project.stretch_version}
        />

        <Detail
          title="Skills to Learn"
          content={project.skills_to_learn}
        />

        <Detail
          title="Major Risks"
          content={project.major_risks}
        />

        <Detail
          title="Preliminary Work"
          content={project.preliminary_work_needed}
        />

      </div>
    </div>
  );
}

function SummaryBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-gray-800">
        {value}
      </p>
    </div>
  );
}


function Detail({
  title,
  content,
}: {
  title: string;
  content: string | string[];
}) {
  return (
    <details className="border-b border-gray-100 py-4">
      <summary className="cursor-pointer font-semibold text-gray-800">
        {title}
      </summary>

      {Array.isArray(content) ? (
        <ul className="mt-3 space-y-2 pl-5 text-sm leading-6 text-gray-600">
          {content.map((item) => (
            <li key={item} className="list-disc">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm leading-6 text-gray-600">
          {content}
        </p>
      )}
    </details>
  );
}
function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        className="w-full rounded-lg border border-gray-300 px-4 py-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}