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


const quizBank = {
  "The Living World": [
    { q: "Which branch of biology deals with classification?", options: ["Taxonomy", "Ecology", "Genetics", "Physiology"], answer: 0 },
    { q: "The basic unit of classification is:", options: ["Genus", "Species", "Family", "Order"], answer: 1 },
    { q: "Binomial nomenclature was popularized by:", options: ["Darwin", "Linnaeus", "Mendel", "Aristotle"], answer: 1 },
    { q: "The scientific name of humans is:", options: ["Homo erectus", "Homo sapiens", "Pan troglodytes", "Australopithecus"], answer: 1 },
    { q: "A group of related species is called a:", options: ["Genus", "Family", "Order", "Class"], answer: 0 },
    { q: "A group of related genera is called a:", options: ["Species", "Family", "Order", "Phylum"], answer: 1 },
    { q: "Which is the correct format of a scientific name?", options: ["Both words capitalized", "Both words lowercase", "Genus capitalized, species lowercase", "Species capitalized, genus lowercase"], answer: 2 },
    { q: "The study of internal structure of organisms is:", options: ["Morphology", "Anatomy", "Ecology", "Taxonomy"], answer: 1 },
    { q: "The study of external form and structure is called:", options: ["Morphology", "Physiology", "Genetics", "Cytology"], answer: 0 },
    { q: "The branch dealing with functions of living organisms is:", options: ["Anatomy", "Physiology", "Taxonomy", "Ecology"], answer: 1 }
  ],

  "Biological Classification": [
    { q: "Who proposed the five-kingdom classification?", options: ["Whittaker", "Linnaeus", "Darwin", "Mendel"], answer: 0 },
    { q: "Which kingdom includes bacteria?", options: ["Protista", "Monera", "Fungi", "Plantae"], answer: 1 },
    { q: "Bacteria are generally:", options: ["Eukaryotic", "Prokaryotic", "Multicellular", "Non-cellular"], answer: 1 },
    { q: "Which kingdom contains unicellular eukaryotes?", options: ["Monera", "Protista", "Plantae", "Animalia"], answer: 1 },
    { q: "Fungi obtain nutrition mainly by:", options: ["Photosynthesis", "Absorption", "Ingestion", "Chemosynthesis"], answer: 1 },
    { q: "The cell wall of fungi is mainly made of:", options: ["Cellulose", "Chitin", "Peptidoglycan", "Lignin"], answer: 1 },
    { q: "Which organism is commonly placed in Protista?", options: ["Amoeba", "Mushroom", "Bacterium", "Moss"], answer: 0 },
    { q: "Viruses are generally considered:", options: ["Cellular organisms", "Acellular entities", "Plants", "Fungi"], answer: 1 },
    { q: "Lichens represent an association between:", options: ["Algae and fungi", "Bacteria and fungi", "Plants and animals", "Viruses and bacteria"], answer: 0 },
    { q: "Archaebacteria are known for living in:", options: ["Only freshwater", "Extreme environments", "Only forests", "Only oceans"], answer: 1 }
  ],

  "Cell: The Unit of Life": [
    { q: "The powerhouse of the cell is:", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], answer: 2 },
    { q: "The cell membrane is mainly composed of:", options: ["Lipids and proteins", "DNA", "Cellulose only", "Starch"], answer: 0 },
    { q: "The control centre of a eukaryotic cell is:", options: ["Ribosome", "Nucleus", "Lysosome", "Vacuole"], answer: 1 },
    { q: "Protein synthesis occurs mainly on:", options: ["Ribosomes", "Lysosomes", "Vacuoles", "Centrioles"], answer: 0 },
    { q: "The site of packaging and modification of proteins is:", options: ["Golgi apparatus", "Nucleus", "Mitochondria", "Chloroplast"], answer: 0 },
    { q: "Lysosomes contain:", options: ["Digestive enzymes", "DNA only", "Chlorophyll", "Cellulose"], answer: 0 },
    { q: "Photosynthesis in plant cells occurs in:", options: ["Mitochondria", "Chloroplasts", "Ribosomes", "Golgi bodies"], answer: 1 },
    { q: "The fluid component of the cell is called:", options: ["Cytoplasm", "Cell wall", "Nucleolus", "Chromatin"], answer: 0 },
    { q: "The cell wall of plants is mainly composed of:", options: ["Chitin", "Cellulose", "Protein", "Lipid"], answer: 1 },
    { q: "Which organelle is associated with cellular respiration?", options: ["Mitochondria", "Golgi apparatus", "Ribosome", "Lysosome"], answer: 0 }
  ]
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
                    {current.options.map((option, index) => (
                      <button
                        key={`${quizIndex}-${index}`}
                        className="quiz-option"
                        onClick={() => {
                          const nextScore =
                            index === current.answer
                              ? quizScore + 1
                              : quizScore;

                          setQuizScore(nextScore);

                          if (quizIndex + 1 >= questions.length) {
                            setQuizFinished(true);
                          } else {
                            setQuizIndex(quizIndex + 1);
                          }
                        }}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span>{option}</span>

                        <span className="option-arrow">›</span>
                      </button>
                    ))}
                  </div>

                  <div className="quiz-footer">
                    <span>Choose the best answer</span>
                    <span>{questions.length - quizIndex - 1} remaining</span>
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

