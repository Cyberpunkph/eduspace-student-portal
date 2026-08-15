// ======================================================
// EDUSPACE ACHIEVEMENTS
// ======================================================


// ======================================================
// AUTH
// ======================================================

if (
  localStorage.getItem(
    "studentLoggedIn"
  ) !== "true"
) {

  window.location.href =
    "index.html";

}


// ======================================================
// SHARED DATA
// ======================================================

if (!window.EduSpaceData) {

  throw new Error(
    "EduSpace data.js was not loaded."
  );

}


const COURSES =
  window.EduSpaceData.courses;


// ======================================================
// STORAGE
// ======================================================

const ACHIEVEMENT_STORAGE_KEY =
  "eduspace-achievements";


// ======================================================
// DOM
// ======================================================

const sidebar =
  document.getElementById(
    "sidebar"
  );

const mobileOverlay =
  document.getElementById(
    "mobileOverlay"
  );

const menuButton =
  document.getElementById(
    "menuButton"
  );


const studentName =
  document.getElementById(
    "studentName"
  );

const studentAvatar =
  document.getElementById(
    "studentAvatar"
  );


const unlockedCount =
  document.getElementById(
    "unlockedCount"
  );

const totalBadgeCount =
  document.getElementById(
    "totalBadgeCount"
  );

const completedLessonCount =
  document.getElementById(
    "completedLessonCount"
  );

const achievementPercentage =
  document.getElementById(
    "achievementPercentage"
  );


const achievementProgressText =
  document.getElementById(
    "achievementProgressText"
  );

const achievementProgressFill =
  document.getElementById(
    "achievementProgressFill"
  );

const achievementMotivation =
  document.getElementById(
    "achievementMotivation"
  );


const achievementGrid =
  document.getElementById(
    "achievementGrid"
  );

const achievementEmpty =
  document.getElementById(
    "achievementEmpty"
  );

const filterButtons =
  document.querySelectorAll(
    "[data-filter]"
  );

const achievementToast =
  document.getElementById(
    "achievementToast"
  );


// ======================================================
// STATE
// ======================================================

let currentFilter =
  "all";

let toastTimer =
  null;


// ======================================================
// SAFE JSON
// ======================================================

function readJSON(
  key,
  fallback
) {

  const value =
    localStorage.getItem(
      key
    );


  if (!value) {
    return fallback;
  }


  try {

    return JSON.parse(
      value
    );

  }

  catch {

    return fallback;

  }

}


// ======================================================
// INITIALS
// ======================================================

function createInitials(
  name
) {

  if (
    typeof name !== "string" ||
    !name.trim()
  ) {

    return "ST";

  }


  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        word =>
          word.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase()
    ||
    "ST"
  );

}


// ======================================================
// CLAMP
// ======================================================

function clamp(
  value,
  min,
  max
) {

  return Math.min(
    max,
    Math.max(
      min,
      value
    )
  );

}


// ======================================================
// STUDENT
// ======================================================

function loadStudentInformation() {

  const name =
    localStorage.getItem(
      "studentName"
    )
    ||
    "Student";


  studentName.textContent =
    name;


  studentAvatar.textContent =
    createInitials(
      name
    );

}


// ======================================================
// COMPLETED LESSONS
// ======================================================

function getCompletedLessons(
  courseId
) {

  const completed =
    readJSON(
      `completed-${courseId}`,
      []
    );


  return Array.isArray(
    completed
  )
    ? completed
    : [];

}


// ======================================================
// TOTAL LESSONS
// ======================================================

function getTotalLessonCount() {

  return Object
    .values(
      COURSES
    )
    .reduce(
      (
        total,
        course
      ) =>
        total +
        Number(
          course.totalLessons || 0
        ),
      0
    );

}


// ======================================================
// COMPLETED LESSON COUNT
// ======================================================

function getCompletedLessonCount() {

  return Object
    .keys(
      COURSES
    )
    .reduce(
      (
        total,
        courseId
      ) =>
        total +
        getCompletedLessons(
          courseId
        ).length,
      0
    );

}


// ======================================================
// COURSE PROGRESS
// ======================================================

function getCoursePercentage(
  courseId
) {

  const course =
    COURSES[
      courseId
    ];


  if (
    !course ||
    !course.totalLessons
  ) {

    return 0;

  }


  return clamp(

    Math.round(
      (
        getCompletedLessons(
          courseId
        ).length
        /
        course.totalLessons
      )
      * 100
    ),

    0,

    100

  );

}


// ======================================================
// COMPLETED COURSE COUNT
// ======================================================

function getCompletedCourseCount() {

  return Object
    .keys(
      COURSES
    )
    .filter(
      courseId =>
        getCoursePercentage(
          courseId
        ) === 100
    )
    .length;

}


// ======================================================
// STARTED COURSE COUNT
// ======================================================

function getStartedCourseCount() {

  return Object
    .keys(
      COURSES
    )
    .filter(
      courseId =>
        getCompletedLessons(
          courseId
        ).length > 0
    )
    .length;

}


// ======================================================
// QUIZ RESULTS
// ======================================================

function getQuizScores() {

  const results =
    [];


  for (
    let index = 0;
    index < localStorage.length;
    index++
  ) {

    const key =
      localStorage.key(
        index
      );


    if (
      !key ||
      !key.startsWith(
        "quiz-"
      )
    ) {

      continue;

    }


    const score =
      Number(
        localStorage.getItem(
          key
        )
      );


    if (
      Number.isNaN(
        score
      )
    ) {

      continue;

    }


    results.push(
      score
    );

  }


  return results;

}


// ======================================================
// NOTE COUNT
// ======================================================

function getNoteCount() {

  let count =
    0;


  for (
    let index = 0;
    index < localStorage.length;
    index++
  ) {

    const key =
      localStorage.key(
        index
      );


    if (
      !key ||
      !key.startsWith(
        "notes-"
      )
    ) {

      continue;

    }


    const note =
      localStorage.getItem(
        key
      );


    if (
      note &&
      note.trim()
    ) {

      count++;

    }

  }


  return count;

}


// ======================================================
// VIDEO STATES
// ======================================================

function getVideoStates() {

  const states =
    [];


  for (
    let index = 0;
    index < localStorage.length;
    index++
  ) {

    const key =
      localStorage.key(
        index
      );


    if (
      !key ||
      !key.startsWith(
        "video-state-"
      )
    ) {

      continue;

    }


    const state =
      readJSON(
        key,
        null
      );


    if (
      !state ||
      typeof state !==
      "object"
    ) {

      continue;

    }


    states.push(
      state
    );

  }


  return states;

}


// ======================================================
// OVERALL LEARNING PROGRESS
// ======================================================

function getOverallLearningProgress() {

  const total =
    getTotalLessonCount();


  if (
    total === 0
  ) {

    return 0;

  }


  return Math.round(
    (
      getCompletedLessonCount()
      /
      total
    )
    * 100
  );

}


// ======================================================
// ACTIVITY SNAPSHOT
// ======================================================

function getActivitySnapshot() {

  const completedLessons =
    getCompletedLessonCount();


  const totalLessons =
    getTotalLessonCount();


  const quizScores =
    getQuizScores();


  const notes =
    getNoteCount();


  const videoStates =
    getVideoStates();


  const watchedVideos =
    videoStates.filter(
      state =>
        Number(
          state.percentage || 0
        ) >= 50
    ).length;


  const completedVideos =
    videoStates.filter(
      state =>
        Number(
          state.percentage || 0
        ) >= 90
    ).length;


  const bestQuizScore =
    quizScores.length
      ? Math.max(
          ...quizScores
        )
      : 0;


  return {

    completedLessons,

    totalLessons,

    overallProgress:
      getOverallLearningProgress(),

    completedCourses:
      getCompletedCourseCount(),

    startedCourses:
      getStartedCourseCount(),

    quizCount:
      quizScores.length,

    bestQuizScore,

    notes,

    watchedVideos,

    completedVideos

  };

}


// ======================================================
// ACHIEVEMENT DEFINITIONS
// ======================================================

function getAchievementDefinitions(
  activity
) {

  return [


    // ==================================================
    // FIRST STEP
    // ==================================================

    {

      id:
        "first-step",

      icon:
        "🌱",

      title:
        "First Step",

      description:
        "Complete your first lesson on EduSpace.",

      current:
        activity.completedLessons,

      target:
        1

    },


    // ==================================================
    // LESSON EXPLORER
    // ==================================================

    {

      id:
        "lesson-explorer",

      icon:
        "📚",

      title:
        "Lesson Explorer",

      description:
        "Complete at least 3 lessons.",

      current:
        activity.completedLessons,

      target:
        3

    },


    // ==================================================
    // HALFWAY THERE
    // ==================================================

    {

      id:
        "halfway-there",

      icon:
        "🚀",

      title:
        "Halfway There",

      description:
        "Reach 50% overall lesson completion.",

      current:
        activity.overallProgress,

      target:
        50,

      suffix:
        "%"

    },


    // ==================================================
    // COURSE FINISHER
    // ==================================================

    {

      id:
        "course-finisher",

      icon:
        "🎓",

      title:
        "Course Finisher",

      description:
        "Complete every lesson in one course.",

      current:
        activity.completedCourses,

      target:
        1

    },


    // ==================================================
    // QUIZ STARTER
    // ==================================================

    {

      id:
        "quiz-starter",

      icon:
        "🧠",

      title:
        "Quiz Starter",

      description:
        "Complete your first lesson quiz.",

      current:
        activity.quizCount,

      target:
        1

    },


    // ==================================================
    // QUIZ ACE
    // ==================================================

    {

      id:
        "quiz-ace",

      icon:
        "⭐",

      title:
        "Quiz Ace",

      description:
        "Earn a score of 90% or higher on a quiz.",

      current:
        activity.bestQuizScore,

      target:
        90,

      suffix:
        "%"

    },


    // ==================================================
    // NOTE TAKER
    // ==================================================

    {

      id:
        "note-taker",

      icon:
        "✍️",

      title:
        "Note Taker",

      description:
        "Save notes for at least one lesson.",

      current:
        activity.notes,

      target:
        1

    },


    // ==================================================
    // VIDEO EXPLORER
    // ==================================================

    {

      id:
        "video-explorer",

      icon:
        "🎬",

      title:
        "Video Explorer",

      description:
        "Watch at least 50% of three lesson videos.",

      current:
        activity.watchedVideos,

      target:
        3

    },


    // ==================================================
    // DEDICATED LEARNER
    // ==================================================

    {

      id:
        "dedicated-learner",

      icon:
        "🔥",

      title:
        "Dedicated Learner",

      description:
        "Complete at least 5 lessons.",

      current:
        activity.completedLessons,

      target:
        5

    },


    // ==================================================
    // EDUSPACE MASTER
    // ==================================================

    {

      id:
        "eduspace-master",

      icon:
        "👑",

      title:
        "EduSpace Master",

      description:
        "Complete every lesson in your EduSpace course library.",

      current:
        activity.completedLessons,

      target:
        activity.totalLessons || 1

    }

  ];

}


// ======================================================
// ENRICH ACHIEVEMENT
// ======================================================

function prepareAchievement(
  achievement
) {

  const current =
    Math.max(
      0,
      Number(
        achievement.current || 0
      )
    );


  const target =
    Math.max(
      1,
      Number(
        achievement.target || 1
      )
    );


  const percentage =
    clamp(
      Math.round(
        (
          current /
          target
        )
        * 100
      ),
      0,
      100
    );


  return {

    ...achievement,

    current,

    target,

    percentage,

    unlocked:
      current >= target

  };

}


// ======================================================
// SAVED ACHIEVEMENT STATE
// ======================================================

function getSavedAchievements() {

  const stored =
    readJSON(
      ACHIEVEMENT_STORAGE_KEY,
      {}
    );


  return (
    stored &&
    typeof stored === "object" &&
    !Array.isArray(stored)
  )
    ? stored
    : {};

}


// ======================================================
// SAVE ACHIEVEMENTS
// ======================================================

function saveAchievementState(
  state
) {

  localStorage.setItem(

    ACHIEVEMENT_STORAGE_KEY,

    JSON.stringify(
      state
    )

  );

}


// ======================================================
// DETECT NEW ACHIEVEMENTS
// ======================================================

function syncAchievementState(
  achievements
) {

  const saved =
    getSavedAchievements();


  const updated = {
    ...saved
  };


  const newlyUnlocked =
    [];


  achievements.forEach(
    achievement => {


      const previous =
        saved[
          achievement.id
        ];


      if (
        achievement.unlocked &&
        !previous?.unlocked
      ) {

        newlyUnlocked.push(
          achievement
        );

      }


      updated[
        achievement.id
      ] = {

        unlocked:
          achievement.unlocked,

        unlockedAt:
          achievement.unlocked
            ? previous?.unlockedAt ||
              new Date()
                .toISOString()
            : null

      };

    }
  );


  saveAchievementState(
    updated
  );


  return newlyUnlocked;

}


// ======================================================
// FORMAT UNLOCK DATE
// ======================================================

function getUnlockDate(
  achievementId
) {

  const saved =
    getSavedAchievements();


  const value =
    saved[
      achievementId
    ]?.unlockedAt;


  if (!value) {
    return "";
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "";

  }


  return date.toLocaleDateString(

    undefined,

    {
      month:
        "short",

      day:
        "numeric",

      year:
        "numeric"
    }

  );

}


// ======================================================
// TOAST
// ======================================================

function showToast(
  message
) {

  achievementToast.textContent =
    message;


  achievementToast
    .classList.add(
      "show"
    );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        achievementToast
          .classList.remove(
            "show"
          );

      },
      2800
    );

}


// ======================================================
// RENDER CARD
// ======================================================

function createAchievementCard(
  achievement
) {

  const card =
    document.createElement(
      "article"
    );


  card.className =
    `achievement-card ${
      achievement.unlocked
        ? "unlocked"
        : "locked"
    }`;


  // TOP

  const top =
    document.createElement(
      "div"
    );


  top.className =
    "badge-top";


  const icon =
    document.createElement(
      "div"
    );


  icon.className =
    "achievement-icon";


  icon.textContent =
    achievement.icon;


  const status =
    document.createElement(
      "span"
    );


  status.className =
    `badge-status ${
      achievement.unlocked
        ? "unlocked"
        : "locked"
    }`;


  status.textContent =
    achievement.unlocked
      ? "UNLOCKED"
      : "LOCKED";


  top.append(
    icon,
    status
  );


  // TITLE

  const title =
    document.createElement(
      "h3"
    );


  title.textContent =
    achievement.title;


  // DESCRIPTION

  const description =
    document.createElement(
      "p"
    );


  description.textContent =
    achievement.description;


  // PROGRESS

  const progress =
    document.createElement(
      "div"
    );


  progress.className =
    "badge-progress";


  const progressHeading =
    document.createElement(
      "div"
    );


  progressHeading.className =
    "badge-progress-heading";


  const progressLabel =
    document.createElement(
      "span"
    );


  progressLabel.textContent =
    "Progress";


  const progressValue =
    document.createElement(
      "strong"
    );


  const suffix =
    achievement.suffix || "";


  progressValue.textContent =
    `${Math.min(
      achievement.current,
      achievement.target
    )}${suffix} / ${achievement.target}${suffix}`;


  progressHeading.append(
    progressLabel,
    progressValue
  );


  const track =
    document.createElement(
      "div"
    );


  track.className =
    "badge-progress-track";


  const fill =
    document.createElement(
      "div"
    );


  fill.className =
    "badge-progress-fill";


  fill.style.width =
    `${achievement.percentage}%`;


  track.appendChild(
    fill
  );


  progress.append(
    progressHeading,
    track
  );


  card.append(
    top,
    title,
    description,
    progress
  );


  // UNLOCKED DATE

  if (
    achievement.unlocked
  ) {

    const earned =
      document.createElement(
        "div"
      );


    earned.className =
      "badge-earned";


    const date =
      getUnlockDate(
        achievement.id
      );


    earned.textContent =
      date
        ? `✓ Earned ${date}`
        : "✓ Achievement unlocked";


    card.appendChild(
      earned
    );

  }


  return card;

}


// ======================================================
// UPDATE SUMMARY
// ======================================================

function updateSummary(
  achievements,
  activity
) {

  const unlocked =
    achievements.filter(
      achievement =>
        achievement.unlocked
    ).length;


  const total =
    achievements.length;


  const percentage =
    total > 0
      ? Math.round(
          (
            unlocked /
            total
          )
          * 100
        )
      : 0;


  unlockedCount.textContent =
    unlocked;


  totalBadgeCount.textContent =
    total;


  completedLessonCount.textContent =
    activity.completedLessons;


  achievementPercentage.textContent =
    `${percentage}%`;


  achievementProgressText.textContent =
    `${percentage}%`;


  achievementProgressFill.style.width =
    `${percentage}%`;


  if (
    unlocked === 0
  ) {

    achievementMotivation.textContent =
      "Complete your first lesson to unlock your first badge.";

  }

  else if (
    unlocked < total / 2
  ) {

    achievementMotivation.textContent =
      "Great start. Keep learning to unlock more achievements.";

  }

  else if (
    unlocked < total
  ) {

    achievementMotivation.textContent =
      "Your badge collection is growing. Keep going!";

  }

  else {

    achievementMotivation.textContent =
      "👑 Every achievement has been unlocked. Incredible work!";

  }

}


// ======================================================
// RENDER ACHIEVEMENTS
// ======================================================

function renderAchievements() {

  const activity =
    getActivitySnapshot();


  const achievements =
    getAchievementDefinitions(
      activity
    )
      .map(
        prepareAchievement
      );


  const newlyUnlocked =
    syncAchievementState(
      achievements
    );


  updateSummary(
    achievements,
    activity
  );


  const visible =
    achievements.filter(
      achievement => {

        if (
          currentFilter ===
          "unlocked"
        ) {

          return achievement.unlocked;

        }


        if (
          currentFilter ===
          "locked"
        ) {

          return !achievement.unlocked;

        }


        return true;

      }
    );


  achievementGrid.innerHTML =
    "";


  visible.forEach(
    achievement => {

      achievementGrid
        .appendChild(
          createAchievementCard(
            achievement
          )
        );

    }
  );


  achievementEmpty
    .classList.toggle(
      "show",
      visible.length === 0
    );


  if (
    newlyUnlocked.length > 0
  ) {

    showToast(
      `🏆 Achievement unlocked: ${newlyUnlocked[0].title}`
    );

  }

}


// ======================================================
// FILTER
// ======================================================

function setFilter(
  filter
) {

  currentFilter =
    filter;


  filterButtons.forEach(
    button => {

      button.classList.toggle(
        "active",
        button.dataset.filter ===
        filter
      );

    }
  );


  renderAchievements();

}


// ======================================================
// SIDEBAR
// ======================================================

function openSidebar() {

  sidebar.classList.add(
    "open"
  );


  mobileOverlay.classList.add(
    "show"
  );

}


function closeSidebar() {

  sidebar.classList.remove(
    "open"
  );


  mobileOverlay.classList.remove(
    "show"
  );

}


// ======================================================
// EVENTS
// ======================================================

function setupEvents() {


  filterButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          setFilter(
            button.dataset.filter
          );

        }
      );

    }
  );


  menuButton.addEventListener(
    "click",
    openSidebar
  );


  mobileOverlay.addEventListener(
    "click",
    closeSidebar
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeSidebar();

      }

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth >
        900
      ) {

        closeSidebar();

      }

    }
  );


  window.addEventListener(
    "pageshow",
    renderAchievements
  );


  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.visibilityState ===
        "visible"
      ) {

        renderAchievements();

      }

    }
  );

}


// ======================================================
// INITIALIZE
// ======================================================

function initializeAchievements() {

  loadStudentInformation();

  setupEvents();

  renderAchievements();

}


// ======================================================
// START
// ======================================================

initializeAchievements();