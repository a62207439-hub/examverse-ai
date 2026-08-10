import { useState } from "react";
import "./index.css";
const examSubjects = {
  NEET: {
    Physics: ["Physical World","Units and Measurements","Motion in a Straight Line","Motion in a Plane","Laws of Motion","Work, Energy and Power","Gravitation"],
    Chemistry: ["Some Basic Concepts of Chemistry","Structure of Atom","Classification of Elements","Chemical Bonding","Thermodynamics","Equilibrium","Redox Reactions"],
    Biology: ["The Living World","Biological Classification","Plant Kingdom","Animal Kingdom","Morphology of Flowering Plants","Anatomy of Flowering Plants","Cell: The Unit of Life","Biomolecules","Cell Cycle and Cell Division"]
  },
  JEE: {
    Physics: ["Units and Measurements","Motion in a Straight Line","Motion in a Plane","Laws of Motion","Work, Energy and Power","Gravitation"],
    Chemistry: ["Some Basic Concepts of Chemistry","Structure of Atom","Periodic Classification","Chemical Bonding","Thermodynamics","Equilibrium"],
    Mathematics: ["Sets","Relations and Functions","Trigonometric Functions","Complex Numbers","Linear Inequalities","Permutations and Combinations","Binomial Theorem","Sequences and Series"]
  },
  UPSC: {
    GeneralStudies: ["Indian Polity","Indian History","Indian Geography","Indian Economy","Environment and Ecology","Science and Technology","Current Affairs"]
  },
  SSC: {
    Mathematics: ["Number System","Percentage","Ratio and Proportion","Average","Profit and Loss","Time and Work","Time, Speed and Distance","Algebra","Geometry"],
    Reasoning: ["Analogy","Classification","Series","Coding-Decoding","Blood Relations","Direction Test","Syllogism"],
    English: ["Grammar","Vocabulary","Reading Comprehension","Error Detection","Sentence Improvement"]
  },
  Railway: {
    Mathematics: ["Number System","Percentage","Ratio and Proportion","Profit and Loss","Time and Work","Time and Distance"],
    Reasoning: ["Analogy","Series","Coding-Decoding","Classification","Syllogism"],
    GeneralScience: ["Physics","Chemistry","Biology"]
  },
  Banking: {
    QuantitativeAptitude: ["Number System","Simplification","Percentage","Ratio","Average","Profit and Loss","Time and Work","Data Interpretation"],
    Reasoning: ["Puzzles","Syllogism","Inequality","Coding-Decoding","Blood Relations","Direction Sense"],
    English: ["Reading Comprehension","Grammar","Vocabulary","Error Detection"]
  }
};

const exams = [
  { name: "UPSC", icon: "🏛️", type: "Civil Services" },
  { name: "NEET", icon: "🩺", type: "Medical" },
  { name: "JEE", icon: "⚙️", type: "Engineering" },
  { name: "SSC", icon: "📋", type: "Government" },
  { name: "Railway", icon: "🚆", type: "Government" },
  { name: "Banking", icon: "🏦", type: "Finance" },
];

function App() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  return (
    <main className="app">
      <nav className="navbar">
        <div className="brand">
          <span className="brand-mark">E</span>
          <span>ExamVerse <b>AI</b></span>
        </div>

        <button className="profile">●</button>
      </nav>

      <section className="hero">
        <span className="badge">✦ AI-POWERED EXAM PLATFORM</span>

        <h1>
          Your Future.
          <br />
          <span>One App.</span>
        </h1>

        <p>
          Discover exams, get personalized career guidance
          and never miss an important deadline.
        </p>

        <div className="search-box">
          <span>⌕</span>
          <input placeholder="Search UPSC, NEET, JEE..." />
          <button>Search</button>
        </div>
      </section>

      <section className="ai-card">
        <div className="ai-icon">✦</div>
        <div>
          <small>PERSONALIZED FOR YOU</small>
          <h2>Find your perfect exam</h2>
          <p>Let AI recommend exams based on your goals.</p>
        </div>
        <button className="arrow">→</button>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <small>EXPLORE</small>
            <h2>Popular Exams</h2>
          </div>
          <button className="view-all">View all →</button>
        </div>

        <div className="exam-grid">
          {exams.map((exam) => (
            <article className="exam-card" key={exam.name} onClick={() => setSelectedExam(exam)}>
              <div className="exam-icon">{exam.icon}</div>
              <h3>{exam.name}</h3>
              <p>{exam.type}</p>
              <span>View details →</span>
            </article>
          ))}
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>100+</strong>
          <span>Exams</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>AI Assistant</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Personalized</span>
        </div>
      </section>

      <footer>
        <b>ExamVerse AI</b>
        <span>One App. Every Exam.</span>
      </footer>
{selectedExam && (
  <div className="exam-interface">

    <button onClick={() => {
      setSelectedExam(null);
      setSelectedSubject(null);
      setSelectedChapter(null);
    }}>
      ← Back
    </button>

    <h1>{selectedExam.icon} {selectedExam.name}</h1>
    <p>{selectedExam.type}</p>

    {!selectedSubject && (
      <div className="chapter-panel">
        <h2>Choose a Subject</h2>

        <div className="subject-grid">
          {Object.keys(examSubjects[selectedExam.name] || {}).map((subject) => (
            <button
              className="subject-card"
              key={subject}
              onClick={() => setSelectedSubject(subject)}
            >
              <span>📚</span>
              <strong>{subject}</strong>
              <small>
                {examSubjects[selectedExam.name][subject].length} Chapters
              </small>
            </button>
          ))}
        </div>
      </div>
    )}

    {selectedSubject && !selectedChapter && (
      <div className="chapter-panel">

        <button
          className="back-small"
          onClick={() => setSelectedSubject(null)}
        >
          ← Subjects
        </button>

        <h2>{selectedSubject}</h2>
        <p>Select a chapter to start learning.</p>

        <div className="chapter-grid">
          {examSubjects[selectedExam.name][selectedSubject].map(
            (chapter, index) => (
              <button
                className="chapter-card"
                key={chapter}
                onClick={() => setSelectedChapter(chapter)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{chapter}</strong>
                <small>Ask AI →</small>
              </button>
            )
          )}
        </div>
      </div>
    )}

    {selectedChapter && (
      <div className="chapter-question">

        <button
          className="back-small"
          onClick={() => setSelectedChapter(null)}
        >
          ← Chapters
        </button>

        <div className="selected-chapter">
          <small>{selectedSubject}</small>
          <h2>📖 {selectedChapter}</h2>
          <p>Ask anything about this chapter.</p>
        </div>

        <div className="question-box">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.parentElement
                .querySelector("button")
                ?.click();
            }}
            placeholder={`Ask about ${selectedChapter}...`}
          />

          <button onClick={async () => {
            if (!question.trim()) return;

            setAnswer("Searching latest information...");

            try {
              const res = await fetch("http://localhost:3001/api/ask", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  exam: selectedExam.name,
                  subject: selectedSubject,
                  chapter: selectedChapter,
                  question
                })
              });

              const data = await res.json();
              setAnswer(data.answer || data.error);
            } catch {
              setAnswer("API connection failed.");
            }
          }}>
            Ask
          </button>
        </div>

      </div>
    )}

  </div>
)}

{answer && <div className="answer-box">{answer}</div>}
    </main>
  );
}

export default App;
// SEARCH FUNCTION
setTimeout(() => {
  const input = document.querySelector(".search-box input");
  const button = document.querySelector(".search-box button");
  const cards = document.querySelectorAll(".exam-card");

  if (!input || !button) return;

  const searchExams = () => {
    const query = input.value.toLowerCase().trim();

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = !query || text.includes(query) ? "" : "none";
    });
  };

  button.onclick = searchExams;

  input.onkeydown = (e) => {
    if (e.key === "Enter") searchExams();
  };
}, 500);
