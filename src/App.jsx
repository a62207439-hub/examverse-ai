import { useState, useEffect } from "react";
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


async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("examverse_logged_in") === "true"
  );
  const [loginEmail, setLoginEmail] = useState(
    localStorage.getItem("examverse_email") || ""
  );
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [examSearch, setExamSearch] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAiRecommend, setShowAiRecommend] = useState(false);
  const [aiGoal, setAiGoal] = useState("");
  const [aiLevel, setAiLevel] = useState("");
const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [demoPlan, setDemoPlan] = useState(
    localStorage.getItem("examverse_demo_plan") || ""
  );
  const [savedExam, setSavedExam] = useState(
    localStorage.getItem("examverse_saved_exam") || ""
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [subjectPerformance, setSubjectPerformance] = useState({});
  const [progressLoaded, setProgressLoaded] = useState(false);

  useEffect(() => {
    try {
      const accountKey = loginEmail.trim().toLowerCase();
      const saved = JSON.parse(
        localStorage.getItem(
          accountKey ? `examverse_progress_${accountKey}` : "examverse_progress"
        ) || "{}"
      );

      if (saved.completedQuizzes !== undefined)
        setCompletedQuizzes(saved.completedQuizzes);

      if (saved.xp !== undefined)
        setXp(saved.xp);

      if (saved.streak !== undefined && Number.isFinite(Number(saved.streak)))
        setStreak(Math.max(0, Number(saved.streak)));

      if (Array.isArray(saved.recentActivity))
        setRecentActivity(saved.recentActivity);

      if (saved.subjectPerformance && typeof saved.subjectPerformance === "object")
        setSubjectPerformance(saved.subjectPerformance);

      if (Array.isArray(saved.scoreHistory))
        setScoreHistory(saved.scoreHistory);
    } catch {
      console.log("Progress data unavailable");
    } finally {
      setProgressLoaded(true);
    }
  }, [loginEmail]);

  const [scoreHistory, setScoreHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([
    { name: "You", score: 0 },
    { name: "Aarav", score: 86 },
    { name: "Priya", score: 82 },
    { name: "Rahul", score: 78 }
  ]);
  useEffect(() => {
    if (!progressLoaded) return;

    const accountKey = loginEmail.trim().toLowerCase();
    if (!accountKey) return;

    const progressData = JSON.stringify({
      completedQuizzes,
      xp,
      streak,
      recentActivity,
      subjectPerformance,
      scoreHistory
    });

    localStorage.setItem(
      `examverse_progress_${accountKey}`,
      progressData
    );

    localStorage.setItem("examverse_progress", progressData);
  }, [
    completedQuizzes,
    xp,
    streak,
    recentActivity,
    subjectPerformance,
    scoreHistory,
    progressLoaded
  ]);

  if (!isLoggedIn) {
    return (
      <main className="app">
        <section className="profile-page login-page">
          <div className="profile-hero">
            
            <div>
              <span className="dashboard-label">EXAMVERSE AI</span>
              <h1>Welcome Back</h1>
              <p>Login to continue your preparation.</p>
            </div>
          </div>

          <div className="profile-card login-card">
            <span className="dashboard-label">ACCOUNT LOGIN</span>

            <input
              className="login-input"
              type="email"
              placeholder="Enter your email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              autoComplete="email"
            />

            <div className="password-wrap">
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {loginError && (
              <p className="login-error">{loginError}</p>
            )}

            {/* LOCAL_ACCOUNT_RECOVERY */}
            <button
              type="button"
              className="profile-action"
              onClick={async () => {
                const email = loginEmail.trim().toLowerCase();

                if (!email) {
                  setLoginError("Enter your account email first.");
                  return;
                }

                const key = `examverse_account_${email}`;
                const account = JSON.parse(
                  localStorage.getItem(key) || "null"
                );

                if (!account) {
                  setLoginError("No account found on this device.");
                  return;
                }

                const password = window.prompt(
                  "🔑 Set your account password:"
                );

                if (password === null) return;

                if (password.length < 6) {
                  setLoginError("Password must be at least 6 characters.");
                  return;
                }

                const confirmPassword = window.prompt(
                  "🔐 Re-enter your password:"
                );

                if (password !== confirmPassword) {
                  setLoginError("Passwords do not match.");
                  return;
                }

                const newHash = await hashPassword(password);

                localStorage.setItem(
                  key,
                  JSON.stringify({
                    ...account,
                    passwordHash: newHash,
                    updatedAt: Date.now()
                  })
                );

                setLoginPassword("");
                setLoginError("");
                window.alert("✅ Password updated. Login with your new password.");
              }}
            >
              🔑 Forgot Password?
            </button>

            <button
              className="quiz-primary login-button"
              onClick={async () => {
                const email = loginEmail.trim().toLowerCase();
                const password = loginPassword;

                if (!email || !password) {
                  setLoginError("Please enter your email and password.");
                  return;
                }

                if (!email.includes("@")) {
                  setLoginError("Please enter a valid email address.");
                  return;
                }

                if (password.length < 6) {
                  setLoginError("Password must be at least 6 characters.");
                  return;
                }

                const passwordHash = await hashPassword(password);
                const accountKey = `examverse_account_${email}`;
                const existing = JSON.parse(
                  localStorage.getItem(accountKey) || "null"
                );

                // Existing account: verify the saved password.
                if (existing) {
                  if (!existing.passwordHash) {
                    setLoginError("Account password data is missing.");
                    return;
                  }

                  if (existing.passwordHash !== passwordHash) {
                    setLoginError("Incorrect password.");
                    return;
                  }
                                } else {
                  // First login: create account on this device.
                  localStorage.setItem(
                    accountKey,
                    JSON.stringify({
                      email,
                      passwordHash,
                      createdAt: Date.now()
                    })
                  );
                }

                localStorage.setItem("examverse_logged_in", "true");
                localStorage.setItem("examverse_email", email);

                setLoginPassword("");
                setLoginError("");
                setIsLoggedIn(true);

                // Restore this user's saved progress.
                const userProgress =
                  localStorage.getItem(`examverse_progress_${email}`);

                if (userProgress) {
                  localStorage.setItem(
                    "examverse_progress",
                    userProgress
                  );
                }
              }}
            >
              Login →
            </button>

            <button
              type="button"
              className="profile-action"
              onClick={() => {
                setForgotEmail(loginEmail);
                setForgotNewPassword("");
                setForgotConfirmPassword("");
                setForgotMessage("");
                setShowForgotPassword(true);
              }}
            >
              🔑 Forgot Password?
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      {showProfile && (
        <section className="profile-page">
          <div className="profile-top">
            <button
              className="back-small"
              onClick={() => setShowProfile(false)}
            >
              ← Back
            </button>

            <span className="profile-title">MY PROFILE</span>
          </div>

          <div className="profile-hero">
            
            <div>
              <span className="dashboard-label">STUDENT</span>
              <h1>ExamVerse Learner</h1>
              <p>Keep learning. Keep improving.</p>
              {loginEmail && (
                <small className="profile-email">{loginEmail}</small>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div>
              <strong>{xp}</strong>
              <span>XP</span>
            </div>

            <div>
              <strong>{completedQuizzes}</strong>
              <span>Quizzes</span>
            </div>

            <div>
              <strong>🔥 {streak}</strong>
              <span>Streak</span>
            </div>
          </div>

          <div className="profile-card">
            <span className="dashboard-label">MY EXAM</span>
            <h2>{savedExam || "No exam selected"}</h2>

            <p>
              {savedExam
                ? "This is your current preparation goal."
                : "Select an exam to start your preparation."}
            </p>

            {savedExam && (
              <button
                className="quiz-primary"
                onClick={() => {
                  const exam = exams.find(e => e.name === savedExam);

                  if (exam) {
                    setSelectedExam(exam);
                    setShowProfile(false);
                  }
                }}
              >
                Continue Preparation →
              </button>
            )}
          </div>

          <div className="profile-card">
            <span className="dashboard-label">ACCOUNT</span>

            <button
              className="profile-action"
              onClick={() => {
                const confirmed = window.confirm(
                  "Reset all progress? XP, streak, quiz history and subject performance will be cleared."
                );

                if (!confirmed) return;

                localStorage.removeItem("examverse_progress");
                localStorage.removeItem("examverse_saved_exam");

                // Reset every progress metric
                setXp(0);
                setStreak(0);
                setCompletedQuizzes(0);
                setRecentActivity([]);
                setSubjectPerformance({});
                setScoreHistory([]);
                setSavedExam("");
                setSelectedExam(null);
                setSelectedSubject(null);
                setSelectedChapter(null);
                setQuizMode(false);
                setQuizIndex(0);
                setQuizScore(0);
                setQuizFinished(false);
              }}
            >
              🗑️ Reset Progress
            </button>

            <button
              className="profile-action"
              onClick={async () => {
                const password = window.prompt("🔐 Enter your account password to logout:");

                if (password === null) return;

                if (!password) {
                  window.alert("Please enter your password.");
                  return;
                }

                const email = loginEmail.trim().toLowerCase();
                const accountKey = `examverse_account_${email}`;
                const account = JSON.parse(
                  localStorage.getItem(accountKey) || "null"
                );

                if (!account || !account.passwordHash) {
                  window.alert("❌ Account credentials not found on this device.");
                  return;
                }

                const passwordHash = await hashPassword(password);

                if (passwordHash !== account.passwordHash) {
                  window.alert("❌ Incorrect password. Logout cancelled.");
                  return;
                }

                localStorage.removeItem("examverse_logged_in");
                setIsLoggedIn(false);
                setLoginPassword("");
                setShowProfile(false);
                setSelectedExam(null);
                setSelectedSubject(null);
                setSelectedChapter(null);
                setQuizMode(false);
                window.alert("✅ Logged out successfully.");
              }}
            >
              🚪 Logout
            </button>

            <button
              className="profile-action"
              onClick={async () => {
                const email = loginEmail.trim().toLowerCase();

                if (!email) {
                  window.alert("❌ Account email not found.");
                  return;
                }

                const accountKey = `examverse_account_${email}`;
                const account = JSON.parse(
                  localStorage.getItem(accountKey) || "null"
                );

                if (!account) {
                  window.alert("❌ No account found on this device.");
                  return;
                }

                const confirmEmail = window.prompt(
                  "📧 Enter your account email to continue:"
                );

                if (confirmEmail === null) return;

                if (confirmEmail.trim().toLowerCase() !== email) {
                  window.alert("❌ Email does not match this account.");
                  return;
                }

                const newPassword = window.prompt(
                  "🔑 Enter your new password (minimum 6 characters):"
                );

                if (newPassword === null) return;

                if (newPassword.length < 6) {
                  window.alert("❌ Password must be at least 6 characters.");
                  return;
                }

                const confirmPassword = window.prompt(
                  "🔐 Re-enter your new password:"
                );

                if (confirmPassword !== newPassword) {
                  window.alert("❌ Passwords do not match.");
                  return;
                }

                const passwordHash = await hashPassword(newPassword);

                localStorage.setItem(
                  accountKey,
                  JSON.stringify({
                    ...account,
                    passwordHash,
                    updatedAt: Date.now()
                  })
                );

                window.alert("✅ Password changed successfully!");
              }}
            >
              🔑 Forgot Password
            </button>
          </div>
        </section>
      )}

      {showDashboard && (
        <section className="dashboard">
          <div className="dashboard-head">
            <div>
              <span className="badge">YOUR LEARNING HUB</span>
              <h1>Dashboard</h1>
              <p>Track your preparation and quiz performance.</p>
            </div>

            <button
              className="dashboard-close"
              onClick={() => setShowDashboard(false)}
            >
              ✕
            </button>
          </div>

          <div className="dashboard-stats">
            <div className="dashboard-stat">
              <span>📚</span>
              <strong>{completedQuizzes}</strong>
              <small>Completed Quizzes</small>
            </div>

            <div className="dashboard-stat">
              <span>🎯</span>
              <strong>{quizScore}</strong>
              <small>Latest Score</small>
            </div>

            <div className="dashboard-stat">
              <span>⚡</span>
              <strong>24/7</strong>
              <small>AI Assistant</small>
            </div>

            <div className="dashboard-stat">
              <span>🏆</span>
              <strong>Active</strong>
              <small>Preparation</small>
            </div>
          </div>

          <div className="dashboard-card">
            <span className="dashboard-label">QUICK START</span>
            <h2>Continue your preparation</h2>
            <p>Select an exam and start learning.</p>

            <button
              className="quiz-primary"
              onClick={() => setShowDashboard(false)}
            >
              Explore Exams →
            </button>
          </div>

          <div className="dashboard-card">
            <span className="dashboard-label">PROGRESS</span>
            <h2>Learning Progress</h2>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(completedQuizzes * 10, 100)}%`
                }}
              />
            </div>

            <p>
              {Math.min(completedQuizzes * 10, 100)}% completed
            </p>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-section-title">
              <div>
                <span className="dashboard-label">ACHIEVEMENT</span>
                <h2>Your Level</h2>
              </div>
              <span className="level-badge">
                LEVEL {Math.floor(xp / 100) + 1}
              </span>
            </div>

            <div className="xp-row">
              <strong>{xp} XP</strong>
              <span>{100 - (xp % 100)} XP to next level</span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{width: `${xp % 100}%`}}
              />
            </div>
          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card compact-card">
              <span className="dashboard-label">DAILY STREAK</span>
              <div className="big-stat">🔥 {streak}</div>
              <p>days active</p>
            </div>

            <div className="dashboard-card compact-card">
              <span className="dashboard-label">QUIZ SCORE</span>
              <div className="big-stat">🎯 {quizScore}</div>
              <p>latest correct answers</p>
            </div>

          </div>

          <div className="dashboard-card">
            <div className="dashboard-section-title">
              <div>
                <span className="dashboard-label">ACTIVITY</span>
                <h2>Recent Activity</h2>
              </div>
            </div>

            {recentActivity.length === 0 ? (
              <div className="activity-empty">
                <span>📚</span>
                <p>No quiz activity yet. Start your first quiz!</p>
              </div>
            ) : (
              <div className="activity-list">
                {recentActivity.map((item, index) => (
                  <div className="activity-item" key={`${item.chapter}-${index}`}>
                    <div className="activity-icon">✓</div>
                    <div>
                      <strong>{item.chapter}</strong>
                      <small>Score: {item.score} • {item.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-card leaderboard-card">
            <span className="dashboard-label">LEADERBOARD</span>
            <h2>Top Learners</h2>

            <div className="leader-row">
              <span>🥇</span>
              <strong>ExamMaster</strong>
              <b>2450 XP</b>
            </div>

            <div className="leader-row">
              <span>🥈</span>
              <strong>StudyPro</strong>
              <b>2180 XP</b>
            </div>

            <div className="leader-row">
              <span>🥉</span>
              <strong>FutureIAS</strong>
              <b>1940 XP</b>
            </div>

            <div className="leader-row you">
              <span>⭐</span>
              <strong>You</strong>
              <b>{xp} XP</b>
            </div>
          </div>
        </section>
      )}

      <nav className="navbar">
        <div className="brand">
          <span className="brand-mark">E</span>
          <span>ExamVerse <b>AI</b></span>
        </div>

        <div className="nav-actions">
          <button
            className="nav-dashboard"
            onClick={() => {
              setShowDashboard(true);
              setShowProfile(false);
            }}
            aria-label="Open dashboard"
          >
            ◫
          </button>

          <button
            className="profile"
            onClick={() => {
              setShowProfile(true);
              setShowDashboard(false);
            }}
            aria-label="Open profile"
          >
            A
          </button>
        </div>
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
          <input
            value={examSearch}
            onChange={(e) => setExamSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                document.querySelector(".exam-grid")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              }
            }}
            placeholder="Search UPSC, NEET, JEE..."
          />
          <button
            onClick={() => {
              document.querySelector(".exam-grid")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            }}
          >
            Search
          </button>
        </div>
      </section>

      <section className="ai-card">
        <div className="ai-icon">✦</div>

        <div>
          <small>PERSONALIZED FOR YOU</small>
          <h2>Find your perfect exam</h2>
          <p>Let AI recommend exams based on your goals.</p>
        </div>

        <button
          type="button"
          className="arrow ai-arrow"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowAiRecommend(true);
          }}
        >
          →
        </button>
      </section>

      {showAiRecommend && (
        <div className="ai-recommend-overlay">
          <div className="ai-recommend-card">

            <button
              className="ai-close"
              onClick={() => setShowAiRecommend(false)}
            >
              ×
            </button>

            <div className="ai-icon">✦</div>

            <small>AI PERSONALIZED RECOMMENDATION</small>
            <h2>Find Your Perfect Exam</h2>
            <p>Select your goal and preparation level.</p>

            <select
              className="login-input"
              value={aiGoal}
              onChange={(e) => setAiGoal(e.target.value)}
            >
              <option value="">Select your goal</option>
              <option value="NEET">Medical / NEET</option>
              <option value="JEE">Engineering / JEE</option>
              <option value="UPSC">Civil Services / UPSC</option>
              <option value="SSC">Government Job / SSC</option>
              <option value="Railway">Railway</option>
              <option value="Banking">Banking</option>
            </select>

            <select
              className="login-input"
              value={aiLevel}
              onChange={(e) => setAiLevel(e.target.value)}
            >
              <option value="">Preparation level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <button
              className="quiz-primary"
              onClick={() => {
                if (!aiGoal || !aiLevel) {
                  alert("Please select both options.");
                  return;
                }

                const exam = exams.find(e => e.name === aiGoal);

                if (exam) {
                  setSelectedExam(exam);
                  setSavedExam(exam.name);
                  localStorage.setItem(
                    "examverse_saved_exam",
                    exam.name
                  );
                  setShowAiRecommend(false);
                  setAiGoal("");
                  setAiLevel("");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              ✦ Get My Recommendation →
            </button>

          </div>
        </div>
      )}

      <section className="section">
        <div className="section-head">
          <div>
            <small>EXPLORE</small>
            <h2>Popular Exams</h2>
          </div>
          <button
            className="view-all"
            onClick={() => setExamSearch("")}
          >
            View all →
          </button>
        </div>

        <div className="exam-grid">
          {exams
            .filter((exam) => {
              const q = examSearch.toLowerCase().trim();
              if (!q) return true;
              return (
                exam.name.toLowerCase().includes(q) ||
                exam.type.toLowerCase().includes(q)
              );
            })
            .map((exam) => (
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

      <section className="premium-section">
        <div className="premium-heading">
          <span className="badge">EXAMVERSE PRO</span>
          <h2>Prepare Smarter. Go Further.</h2>
          <p>Powerful tools for serious exam preparation.</p>
        </div>

        <div className="pricing-grid">

          <article className="price-card">
            <span className="price-label">STARTER</span>
            <h3>Free</h3>
            <p className="price-sub">For exploring ExamVerse</p>

            <ul>
              <li>✓ Exam discovery</li>
              <li>✓ Chapter learning</li>
              <li>✓ Basic quizzes</li>
              <li>✓ AI questions</li>
            </ul>

            <button
              className="price-button"
              onClick={() => setCheckoutPlan("STARTER")}
            >
              Start Free
            </button>
          </article>

          <article className="price-card featured">
            <div className="popular-tag">MOST POPULAR</div>

            <span className="price-label">PRO</span>
            <h3>₹999</h3>
            <p className="price-sub">Advanced preparation</p>

            <ul>
              <li>✓ Unlimited practice</li>
              <li>✓ Advanced quizzes</li>
              <li>✓ Progress analytics</li>
              <li>✓ AI study assistant</li>
              <li>✓ Performance history</li>
            </ul>

            <button
              className="price-button primary"
              onClick={() => setCheckoutPlan("PRO")}
            >
              Choose Pro
            </button>
          </article>

          <article className="price-card">
            <span className="price-label">ULTIMATE</span>
            <h3>₹2999</h3>
            <p className="price-sub">Complete preparation pack</p>

            <ul>
              <li>✓ Everything in Pro</li>
              <li>✓ Full exam roadmap</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Premium question bank</li>
              <li>✓ Priority AI features</li>
            </ul>

            <button
              className="price-button"
              onClick={() => setCheckoutPlan("ULTIMATE")}
            >
              Get Ultimate
            </button>
          </article>

        </div>
      </section>

      <footer>
        <b>ExamVerse AI</b>
        <span>One App. Every Exam.</span>
      </footer>
{checkoutPlan && (
  <div className="checkout-overlay">
    <div className="checkout-modal">

      <button
        className="checkout-close"
        onClick={() => setCheckoutPlan(null)}
      >
        ×
      </button>

      <span className="badge">EXAMVERSE SECURE CHECKOUT</span>

      <h2>
        {checkoutPlan === "STARTER"
          ? "Start Your Free Plan"
          : `Upgrade to ${checkoutPlan}`}
      </h2>

      <p className="checkout-muted">
        {checkoutPlan === "STARTER"
          ? "Create your ExamVerse account to continue."
          : "Complete your account setup before payment."}
      </p>

      <div className="checkout-plan">
        <div>
          <span>Selected Plan</span>
          <strong>{checkoutPlan}</strong>
        </div>

        <strong>
          {checkoutPlan === "STARTER"
            ? "Free"
            : checkoutPlan === "PRO"
              ? "₹999"
              : "₹2999"}
        </strong>
      </div>

      <label>Email</label>
      <input
        className="checkout-input"
        type="email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <label>Password</label>
      <input
        className="checkout-input"
        type="password"
        placeholder="Enter your password"
      />

      {checkoutPlan !== "STARTER" && (
        <div className="payment-box">
          <span className="payment-label">PAYMENT</span>
          <strong>UPI Payment</strong>

          <div className="upi-demo">
            <span>DEMO UPI</span>
            <strong>₹1 Demo Payment</strong>
          </div>

          <p>
            Open your UPI app, enter the amount shown above,
            and complete the payment.
          </p>

          <p className="checkout-warning">
            Payment verification will be connected to the secure
            gateway before paid access is activated.
          </p>
        </div>
      )}

      <button
        className="checkout-primary"
        onClick={() => {
          if (checkoutPlan === "STARTER") {
            localStorage.setItem("examverse_demo_plan", "STARTER");
            setDemoPlan("STARTER");
            setCheckoutPlan(null);
            alert("₹1 Demo Payment Successful. Starter features are now enabled.");
          } else {
            alert(
              "Demo payment submitted. Real payment verification will be connected later."
            );
          }
        }}
      >
        {checkoutPlan === "STARTER"
          ? "Continue Free →"
          : "I've Paid — Verify Payment →"}
      </button>

      <small className="checkout-secure">
        🔒 Your account details are handled securely.
      </small>

    </div>
  </div>
)}

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

        {!quizMode && (
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
                setSelectedAnswer(null);
                setAnswerChecked(false);
              }}
            >
              🧠 Start Chapter Quiz
            </button>
          </div>
        )}

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

                    <h2>
                      {percentage >= 80
                        ? "Excellent Work! 🏆"
                        : percentage >= 50
                        ? "Good Progress! 🎯"
                        : "Keep Practicing! 📚"}
                    </h2>

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
                            const finalScore =
                              quizScore +
                              (selectedAnswer === current.answer ? 1 : 0);

                            const percentage = Math.round(
                              (finalScore / questions.length) * 100
                            );

                            setQuizFinished(true);
                            setCompletedQuizzes(prev => prev + 1);
                            // XP: reward every correct answer.
                            // Streak: increase only when every answer is correct.
                            const earnedXp = finalScore * 10;
                            const perfectQuiz =
                              finalScore === questions.length;

                            setXp(prev => prev + earnedXp);

                            if (perfectQuiz) {
                              setStreak(prev => prev + 1);
                            }

                            setScoreHistory(prev => [
                              ...prev,
                              {
                                exam: selectedExam.name,
                                subject: selectedSubject,
                                chapter: selectedChapter,
                                score: finalScore,
                                total: questions.length,
                                percentage,
                                time: new Date().toLocaleString()
                              }
                            ].slice(-20));

                            setRecentActivity(prev => [
                              {
                                chapter: selectedChapter,
                                score: `${finalScore}/${questions.length}`,
                                time: new Date().toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit"
                                })
                              },
                              ...prev
                            ].slice(0, 10));

                            setSubjectPerformance(prev => {
                              const old = prev[selectedSubject] || {
                                correct: 0,
                                total: 0
                              };

                              return {
                                ...prev,
                                [selectedSubject]: {
                                  correct: old.correct + finalScore,
                                  total: old.total + questions.length
                                }
                              };
                            });
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
              const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ask`, {
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
            } catch (error) {
              console.error("ExamVerse AI:", error);
              setAnswer(
                "AI service is currently unavailable. Please make sure the backend is running and try again."
              );
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

