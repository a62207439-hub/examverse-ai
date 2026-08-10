import { useState } from "react";
import { quizBank } from "./data/quizBank";
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
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

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

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
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

      <section className="progress-dashboard">
        <div className="dashboard-heading">
          <div>
            <span>YOUR LEARNING</span>
            <h2>Progress Dashboard</h2>
          </div>
          <div className="dashboard-badge">● LIVE</div>
        </div>

        <div className="progress-stats">
          <div className="progress-stat">
            <span className="progress-icon">🏆</span>
            <strong>{completedQuizzes}</strong>
            <small>Quizzes Completed</small>
          </div>

          <div className="progress-stat">
            <span className="progress-icon">📚</span>
            <strong>{completedQuizzes}</strong>
            <small>Chapters Practiced</small>
          </div>

          <div className="progress-stat">
            <span className="progress-icon">🎯</span>
            <strong>{completedQuizzes ? Math.round((quizScore / 10) * 100) : 0}%</strong>
            <small>Latest Score</small>
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-card-top">
            <div>
              <small>OVERALL PROGRESS</small>
              <h3>Keep learning, keep improving.</h3>
            </div>
            <strong>{completedQuizzes ? "Active" : "Start"}</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${completedQuizzes ? Math.min(100, completedQuizzes * 10) : 0}%`
              }}
            />
          </div>

          <div className="progress-card-bottom">
            <span>{completedQuizzes} quiz{completedQuizzes === 1 ? "" : "zes"} completed</span>
            <span>{Math.min(100, completedQuizzes * 10)}%</span>
          </div>
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

          <button
            className="quiz-start"
            onClick={() => {
              setQuizMode(true);
              setQuizIndex(0);
              setQuizScore(0);
              setQuizFinished(false);
            }}
          >
            🧠 Start Chapter Quiz
          </button>
        </div>

        {quizMode && (
          <div className="quiz-card">
            {(() => {
              const questions = (quizBank[selectedChapter] || []).slice(0, 10);

              if (!questions.length) {
                return (
                  <div className="quiz-empty">
                    <div className="quiz-empty-icon">📝</div>
                    <h2>Quiz Coming Soon</h2>
                    <p>Questions for this chapter are being prepared.</p>
                    <button onClick={() => setQuizMode(false)}>
                      ← Back to Chapter
                    </button>
                  </div>
                );
              }

              if (quizFinished) {
                const percentage = Math.round(
                  (quizScore / questions.length) * 100
                );

                return (
                  <div className="quiz-result">
                    <div className="result-icon">
                      {percentage >= 80 ? "🏆" : percentage >= 50 ? "🎯" : "📚"}
                    </div>

                    <span className="result-label">QUIZ COMPLETED</span>

                    <h2>Great Work!</h2>

                    <p>
                      You scored <strong>{quizScore}</strong> out of{" "}
                      <strong>{questions.length}</strong>
                    </p>

                    <div className="result-score">
                      <strong>{percentage}%</strong>
                      <span>Your Score</span>
                    </div>

                    <div className="result-actions">
                      <button
                        className="quiz-primary"
                        onClick={() => {
                          setQuizIndex(0);
                          setQuizScore(0);
                          setQuizFinished(false);
                        }}
                      >
                        🔄 Retry Quiz
                      </button>

                      <button
                        className="quiz-secondary"
                        onClick={() => setQuizMode(false)}
                      >
                        ← Back to Chapter
                      </button>
                    </div>
                  </div>
                );
              }

              const current = questions[quizIndex];

              return (
                <>
                  <div className="quiz-top">
                    <div>
                      <span className="quiz-label">CHAPTER QUIZ</span>
                      <h3>{selectedChapter}</h3>
                    </div>

                    <div className="quiz-count">
                      <strong>{quizIndex + 1}</strong>
                      <span>/ {questions.length}</span>
                    </div>
                  </div>

                  <div className="quiz-progress">
                    <div
                      style={{
                        width: `${((quizIndex + 1) / questions.length) * 100}%`
                      }}
                    />
                  </div>

                  <div className="quiz-question">
                    <span>Question {quizIndex + 1}</span>
                    <h2>{current.q}</h2>
                  </div>

                  <div className="quiz-options">
                    {current.options.map((option, index) => {
                      const selected = selectedAnswer === index;
                      const correct = index === current.answer;

                      let optionClass = "quiz-option";

                      if (answerChecked && correct) {
                        optionClass += " correct";
                      } else if (answerChecked && selected && !correct) {
                        optionClass += " wrong";
                      }

                      return (
                        <button
                          key={`${quizIndex}-${index}`}
                          className={optionClass}
                          disabled={answerChecked}
                          onClick={() => {
                            setSelectedAnswer(index);
                            setAnswerChecked(true);

                            if (index === current.answer) {
                              setQuizScore(prev => prev + 1);
                            }
                          }}
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + index)}
                          </span>

                          <span>{option}</span>

                          <span className="option-arrow">
                            {answerChecked && correct
                              ? "✓"
                              : answerChecked && selected
                              ? "✕"
                              : "›"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {answerChecked && (
                    <div className={`quiz-feedback ${
                      selectedAnswer === current.answer ? "feedback-correct" : "feedback-wrong"
                    }`}>
                      <div>
                        <strong>
                          {selectedAnswer === current.answer
                            ? "✓ Correct Answer!"
                            : "✕ Not quite right"}
                        </strong>

                        {selectedAnswer !== current.answer && (
                          <span>
                            Correct answer: <b>{current.options[current.answer]}</b>
                          </span>
                        )}
                      </div>

                      <button
                        className="quiz-next"
                        onClick={() => {
                          if (quizIndex + 1 >= questions.length) {
                            setQuizFinished(true);
                            setCompletedQuizzes(prev => prev + 1);
                          } else {
                            setQuizIndex(prev => prev + 1);
                            setSelectedAnswer(null);
                            setAnswerChecked(false);
                          }
                        }}
                      >
                        {quizIndex + 1 >= questions.length
                          ? "View Result →"
                          : "Next Question →"}
                      </button>
                    </div>
                  )}

                  <div className="quiz-footer">
                    <span>
                      {answerChecked
                        ? "Review your answer"
                        : "Select the best answer"}
                    </span>
                    <span>
                      {questions.length - quizIndex - 1} remaining
                    </span>
                  </div>
                </>
              );
            })()}
          </div>
        )}

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
              const res = await fetch("${import.meta.env.VITE_API_URL}/api/ask", {
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

  if (!input || !button || !cards.length) return;

  const searchExams = () => {
    const query = input.value.toLowerCase().trim();
    let visible = 0;

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      const match = !query || text.includes(query);

      card.style.display = match ? "" : "none";

      if (match) visible++;
    });

    let empty = document.querySelector(".search-empty");

    if (query && visible === 0) {
      if (!empty) {
        empty = document.createElement("div");
        empty.className = "search-empty";
        empty.innerHTML = `
          <div class="search-empty-icon">⌕</div>
          <h3>No results found</h3>
          <p>Try searching for another exam, subject or keyword.</p>
        `;

        const grid = document.querySelector(".exam-grid");
        if (grid) grid.appendChild(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  };

  button.onclick = searchExams;

  input.onkeydown = (e) => {
    if (e.key === "Enter") searchExams();
  };

  input.oninput = searchExams;
}, 300);

