// ======================================================
// EDUSPACE COURSE PLAYER
// ======================================================


// ======================================================
// LOGIN PROTECTION
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

if (
  !window.EduSpaceData
) {

  throw new Error(
    "EduSpace data.js was not loaded."
  );

}


// ======================================================
// DETAILED COURSE CONTENT
// ======================================================

const COURSE_CONTENT = {


  // ====================================================
  // WEB DEVELOPMENT
  // ====================================================

  "web-development": {

    description:
      "Learn HTML, CSS and JavaScript while building modern websites from scratch.",

    duration:
      "8 hours",

    lessons: [


      // HTML

      {

        id:
          "html-introduction",

        title:
          "Introduction to HTML",

        duration:
          "12 min",

        video:
          "videos/html-basics.mp4",

        description:
          "Learn what HTML is, how webpages are structured and how browsers understand HTML documents.",

        objectives: [

          "Understand HTML documents",

          "Learn basic HTML tags",

          "Create page structure",

          "Understand semantic HTML"

        ],

        materials: [

          {

            title:
              "HTML Study Notes",

            type:
              "PDF",

            file:
              "materials/html-notes.pdf"

          },

          {

            title:
              "HTML Cheat Sheet",

            type:
              "PDF",

            file:
              "materials/html-cheatsheet.pdf"

          }

        ],

        quiz: [

          {

            question:
              "What does HTML stand for?",

            options: [

              "Hyper Text Markup Language",

              "High Text Machine Language",

              "Home Tool Markup Language"

            ],

            answer:
              0

          },

          {

            question:
              "Which element is used for the largest heading?",

            options: [

              "<h6>",

              "<heading>",

              "<h1>"

            ],

            answer:
              2

          },

          {

            question:
              "Which HTML tag creates a paragraph?",

            options: [

              "<p>",

              "<text>",

              "<paragraph>"

            ],

            answer:
              0

          }

        ]

      },


      // CSS

      {

        id:
          "css-fundamentals",

        title:
          "CSS Fundamentals",

        duration:
          "18 min",

        video:
          "videos/css-basics.mp4",

        description:
          "Learn how CSS controls colors, spacing, typography, layouts and the visual appearance of webpages.",

        objectives: [

          "Understand CSS syntax",

          "Style HTML elements",

          "Work with colors",

          "Understand spacing"

        ],

        materials: [

          {

            title:
              "CSS Study Notes",

            type:
              "PDF",

            file:
              "materials/css-notes.pdf"

          }

        ],

        quiz: [

          {

            question:
              "What is CSS mainly used for?",

            options: [

              "Styling webpages",

              "Creating databases",

              "Sending emails"

            ],

            answer:
              0

          },

          {

            question:
              "Which property changes text color?",

            options: [

              "font-color",

              "color",

              "text-style"

            ],

            answer:
              1

          }

        ]

      },


      // FLEXBOX

      {

        id:
          "flexbox-layout",

        title:
          "CSS Flexbox",

        duration:
          "21 min",

        video:
          "videos/flexbox.mp4",

        description:
          "Learn how Flexbox makes it easier to create responsive layouts and align elements.",

        objectives: [

          "Create flex containers",

          "Align page elements",

          "Control spacing",

          "Build responsive layouts"

        ],

        materials: [

          {

            title:
              "Flexbox Guide",

            type:
              "PDF",

            file:
              "materials/flexbox-guide.pdf"

          }

        ],

        quiz: [

          {

            question:
              "Which property enables Flexbox?",

            options: [

              "display: flex",

              "flex: enable",

              "layout: flex"

            ],

            answer:
              0

          }

        ]

      },


      // JAVASCRIPT

      {

        id:
          "javascript-introduction",

        title:
          "JavaScript Basics",

        duration:
          "25 min",

        video:
          "videos/javascript-basics.mp4",

        description:
          "Learn how JavaScript adds interactivity and behavior to modern webpages.",

        objectives: [

          "Understand JavaScript",

          "Create variables",

          "Use functions",

          "Handle user interactions"

        ],

        materials: [

          {

            title:
              "JavaScript Notes",

            type:
              "PDF",

            file:
              "materials/javascript-notes.pdf"

          }

        ],

        quiz: [

          {

            question:
              "Which keyword can create a JavaScript variable?",

            options: [

              "let",

              "style",

              "html"

            ],

            answer:
              0

          },

          {

            question:
              "JavaScript is commonly used to add what to webpages?",

            options: [

              "Interactivity",

              "Paper size",

              "Printer ink"

            ],

            answer:
              0

          }

        ]

      }

    ]

  },



  // ====================================================
  // MATHEMATICS
  // ====================================================

  mathematics: {

    description:
      "Strengthen your mathematics skills with lessons covering algebra, equations and calculus.",

    duration:
      "10 hours",

    lessons: [


      {

        id:
          "algebra-basics",

        title:
          "Introduction to Algebra",

        duration:
          "15 min",

        video:
          "videos/algebra-basics.mp4",

        description:
          "Understand variables, constants, expressions and the basic ideas behind algebra.",

        objectives: [

          "Understand variables",

          "Recognize expressions",

          "Use mathematical operators",

          "Solve simple equations"

        ],

        materials: [

          {

            title:
              "Algebra Notes",

            type:
              "PDF",

            file:
              "materials/algebra-notes.pdf"

          }

        ],

        quiz: [

          {

            question:
              "What is x in the equation x + 3 = 7?",

            options: [

              "3",

              "4",

              "7"

            ],

            answer:
              1

          }

        ]

      },



      {

        id:
          "linear-equations",

        title:
          "Linear Equations",

        duration:
          "22 min",

        video:
          "videos/linear-equations.mp4",

        description:
          "Learn how to solve equations containing one unknown variable.",

        objectives: [

          "Identify linear equations",

          "Move terms correctly",

          "Solve for unknowns",

          "Check solutions"

        ],

        materials: [

          {

            title:
              "Equation Worksheet",

            type:
              "PDF",

            file:
              "materials/equations.pdf"

          }

        ],

        quiz: [

          {

            question:
              "Solve 2x = 10.",

            options: [

              "2",

              "5",

              "10"

            ],

            answer:
              1

          }

        ]

      },



      {

        id:
          "calculus-introduction",

        title:
          "Introduction to Calculus",

        duration:
          "30 min",

        video:
          "videos/calculus.mp4",

        description:
          "Explore the basic concepts of limits, derivatives and rates of change.",

        objectives: [

          "Understand limits",

          "Understand derivatives",

          "Recognize rates of change",

          "Prepare for advanced calculus"

        ],

        materials: [

          {

            title:
              "Calculus Introduction",

            type:
              "PDF",

            file:
              "materials/calculus-notes.pdf"

          }

        ],

        quiz: [

          {

            question:
              "A derivative commonly represents what?",

            options: [

              "Rate of change",

              "File size",

              "Text color"

            ],

            answer:
              0

          }

        ]

      }

    ]

  },



  // ====================================================
  // UI / UX
  // ====================================================

  "ui-ux": {

    description:
      "Learn how to design clean, intuitive and user-friendly digital experiences.",

    duration:
      "7 hours",

    lessons: [


      {

        id:
          "ui-ux-introduction",

        title:
          "Understanding UI & UX",

        duration:
          "13 min",

        video:
          "videos/ui-ux-intro.mp4",

        description:
          "Learn the difference between user interface design and user experience design.",

        objectives: [

          "Understand UI",

          "Understand UX",

          "Learn design principles",

          "Identify user needs"

        ],

        materials: [

          {

            title:
              "UI/UX Introduction",

            type:
              "PDF",

            file:
              "materials/ui-ux-introduction.pdf"

          }

        ],

        quiz: [

          {

            question:
              "What does UX stand for?",

            options: [

              "User Experience",

              "Universal Extension",

              "User Example"

            ],

            answer:
              0

          }

        ]

      },



      {

        id:
          "wireframing",

        title:
          "Wireframing",

        duration:
          "20 min",

        video:
          "videos/wireframing.mp4",

        description:
          "Learn how to plan website and application layouts using low-fidelity wireframes.",

        objectives: [

          "Understand wireframes",

          "Plan page structure",

          "Create screen layouts",

          "Improve design workflows"

        ],

        materials: [

          {

            title:
              "Wireframe Template",

            type:
              "PDF",

            file:
              "materials/wireframe-template.pdf"

          }

        ],

        quiz: [

          {

            question:
              "What is the main purpose of a wireframe?",

            options: [

              "Plan interface structure",

              "Store passwords",

              "Create databases"

            ],

            answer:
              0

          }

        ]

      },



      {

        id:
          "color-typography",

        title:
          "Color & Typography",

        duration:
          "19 min",

        video:
          "videos/color-typography.mp4",

        description:
          "Learn how colors and typography influence readability, hierarchy and visual communication.",

        objectives: [

          "Create color palettes",

          "Understand contrast",

          "Choose readable fonts",

          "Build visual hierarchy"

        ],

        materials: [

          {

            title:
              "Typography Guide",

            type:
              "PDF",

            file:
              "materials/typography.pdf"

          }

        ],

        quiz: [

          {

            question:
              "Good contrast primarily improves what?",

            options: [

              "Readability",

              "Internet speed",

              "Storage capacity"

            ],

            answer:
              0

          }

        ]

      }

    ]

  }

};



// ======================================================
// COURSE SELECTION
// ======================================================

const urlParameters =
  new URLSearchParams(
    window.location.search
  );


const requestedCourse =
  urlParameters.get(
    "course"
  );


const courseId =
  COURSE_CONTENT[
    requestedCourse
  ]
    ? requestedCourse
    : "web-development";


const sharedCourse =
  window.EduSpaceData
    .getCourse(
      courseId
    );


const course = {

  id:
    courseId,

  title:
    sharedCourse?.title
    ||
    (
      courseId === "ui-ux"
        ? "UI/UX Design"
        : courseId
    ),

  category:
    sharedCourse?.category
    ||
    (
      courseId === "web-development"
        ? "DEVELOPMENT"
        : courseId === "mathematics"
          ? "MATHEMATICS"
          : "DESIGN"
    ),

  description:
    COURSE_CONTENT[
      courseId
    ].description,

  duration:
    COURSE_CONTENT[
      courseId
    ].duration,

  lessons:
    COURSE_CONTENT[
      courseId
    ].lessons

};



// ======================================================
// STORAGE KEYS
// ======================================================

const COMPLETION_KEY =
  `completed-${courseId}`;


const LAST_LESSON_KEY =
  `last-lesson-${courseId}`;



function getVideoStateKey(
  lessonId
) {

  return (
    `video-state-${courseId}-${lessonId}`
  );

}



function getNoteKey(
  lessonId
) {

  return (
    `notes-${courseId}-${lessonId}`
  );

}



function getQuizKey(
  lessonId
) {

  return (
    `quiz-${courseId}-${lessonId}`
  );

}



// ======================================================
// DOM
// ======================================================

const sidebar =
  document.getElementById(
    "sidebar"
  );


const menuButton =
  document.getElementById(
    "menuButton"
  );


const overlay =
  document.getElementById(
    "overlay"
  );


const sidebarCourseName =
  document.getElementById(
    "sidebarCourseName"
  );


const topbarCourseName =
  document.getElementById(
    "topbarCourseName"
  );


const breadcrumbCourse =
  document.getElementById(
    "breadcrumbCourse"
  );


const courseTitle =
  document.getElementById(
    "courseTitle"
  );


const courseCategory =
  document.getElementById(
    "courseCategory"
  );


const courseDescription =
  document.getElementById(
    "courseDescription"
  );


const courseDuration =
  document.getElementById(
    "courseDuration"
  );


const lessonCount =
  document.getElementById(
    "lessonCount"
  );



const lessonNavigation =
  document.getElementById(
    "lessonNavigation"
  );



const currentLessonTitle =
  document.getElementById(
    "currentLessonTitle"
  );


const currentLessonDuration =
  document.getElementById(
    "currentLessonDuration"
  );


const lessonPositionText =
  document.getElementById(
    "lessonPositionText"
  );


const lessonDescription =
  document.getElementById(
    "lessonDescription"
  );


const learningObjectives =
  document.getElementById(
    "learningObjectives"
  );



const lessonVideo =
  document.getElementById(
    "lessonVideo"
  );


const videoPlaceholder =
  document.getElementById(
    "videoPlaceholder"
  );


const placeholderTitle =
  document.getElementById(
    "placeholderTitle"
  );



const resumeBanner =
  document.getElementById(
    "resumeBanner"
  );


const resumeText =
  document.getElementById(
    "resumeText"
  );


const resumePlayButton =
  document.getElementById(
    "resumePlayButton"
  );


const restartVideoButton =
  document.getElementById(
    "restartVideoButton"
  );



const rewindButton =
  document.getElementById(
    "rewindButton"
  );


const forwardButton =
  document.getElementById(
    "forwardButton"
  );


const playbackSpeed =
  document.getElementById(
    "playbackSpeed"
  );


const videoTimeText =
  document.getElementById(
    "videoTimeText"
  );


const videoWatchText =
  document.getElementById(
    "videoWatchText"
  );


const videoWatchFill =
  document.getElementById(
    "videoWatchFill"
  );



const previousLessonButton =
  document.getElementById(
    "previousLessonButton"
  );


const nextLessonButton =
  document.getElementById(
    "nextLessonButton"
  );


const completeLessonButton =
  document.getElementById(
    "completeLessonButton"
  );



const sidebarProgressFill =
  document.getElementById(
    "sidebarProgressFill"
  );


const sidebarProgressText =
  document.getElementById(
    "sidebarProgressText"
  );


const largeProgressFill =
  document.getElementById(
    "largeProgressFill"
  );


const heroProgressCircle =
  document.getElementById(
    "heroProgressCircle"
  );


const heroProgressText =
  document.getElementById(
    "heroProgressText"
  );


const completedLessonCount =
  document.getElementById(
    "completedLessonCount"
  );


const progressMotivation =
  document.getElementById(
    "progressMotivation"
  );



const materialList =
  document.getElementById(
    "materialList"
  );



const studentNotes =
  document.getElementById(
    "studentNotes"
  );


const saveNotesButton =
  document.getElementById(
    "saveNotesButton"
  );


const savedLabel =
  document.getElementById(
    "savedLabel"
  );



const startQuizButton =
  document.getElementById(
    "startQuizButton"
  );


const quizModal =
  document.getElementById(
    "quizModal"
  );


const closeQuizButton =
  document.getElementById(
    "closeQuizButton"
  );


const quizContent =
  document.getElementById(
    "quizContent"
  );


const quizResult =
  document.getElementById(
    "quizResult"
  );


const quizTitle =
  document.getElementById(
    "quizTitle"
  );


const submitQuizButton =
  document.getElementById(
    "submitQuizButton"
  );


const existingQuizScore =
  document.getElementById(
    "existingQuizScore"
  );



const studentName =
  document.getElementById(
    "studentName"
  );


const studentAvatar =
  document.getElementById(
    "studentAvatar"
  );


const courseToast =
  document.getElementById(
    "courseToast"
  );



// ======================================================
// STATE
// ======================================================

let currentLessonIndex =
  0;


let lastSavedVideoSecond =
  -1;


let toastTimer =
  null;



// ======================================================
// SAFE JSON
// ======================================================

function readJSON(
  key,
  fallback
) {

  const raw =
    localStorage.getItem(
      key
    );


  if (!raw) {

    return fallback;

  }


  try {

    return JSON.parse(
      raw
    );

  }

  catch (error) {

    console.warn(
      `Invalid localStorage value: ${key}`,
      error
    );


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
    typeof name !== "string"
    ||
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
// FORMAT VIDEO TIME
// ======================================================

function formatVideoTime(
  seconds
) {

  if (
    !Number.isFinite(
      seconds
    )
    ||
    seconds < 0
  ) {

    return "0:00";

  }


  const totalSeconds =
    Math.floor(
      seconds
    );


  const minutes =
    Math.floor(
      totalSeconds / 60
    );


  const remainingSeconds =
    totalSeconds % 60;


  return (
    `${minutes}:${String(
      remainingSeconds
    ).padStart(
      2,
      "0"
    )}`
  );

}



// ======================================================
// TOAST
// ======================================================

function showToast(
  message
) {

  if (
    !courseToast
  ) {

    return;

  }


  courseToast.textContent =
    message;


  courseToast
    .classList.add(
      "show"
    );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        courseToast
          .classList.remove(
            "show"
          );

      },
      2200
    );

}



// ======================================================
// STUDENT
// ======================================================

function loadStudentInformation() {

  const savedStudentName =
    localStorage.getItem(
      "studentName"
    )
    ||
    "Student";


  studentName.textContent =
    savedStudentName;


  studentAvatar.textContent =
    createInitials(
      savedStudentName
    );

}



// ======================================================
// COURSE INFO
// ======================================================

function setCourseInformation() {

  document.title =
    `${course.title} | EduSpace`;


  sidebarCourseName.textContent =
    course.title;


  topbarCourseName.textContent =
    course.title;


  breadcrumbCourse.textContent =
    course.title;


  courseTitle.textContent =
    course.title;


  courseCategory.textContent =
    course.category;


  courseDescription.textContent =
    course.description;


  courseDuration.textContent =
    course.duration;


  lessonCount.textContent =
    course.lessons.length;

}



// ======================================================
// INITIAL LESSON
// ======================================================

function resolveInitialLessonIndex() {


  // URL lesson

  const requestedLesson =
    urlParameters.get(
      "lesson"
    );


  if (
    requestedLesson
  ) {

    const requestedIndex =
      course.lessons
        .findIndex(
          lesson =>
            lesson.id ===
            requestedLesson
        );


    if (
      requestedIndex >= 0
    ) {

      return requestedIndex;

    }

  }



  // SAVED LAST LESSON

  const savedLessonId =
    localStorage.getItem(
      LAST_LESSON_KEY
    );


  if (
    savedLessonId
  ) {

    const savedIndex =
      course.lessons
        .findIndex(
          lesson =>
            lesson.id ===
            savedLessonId
        );


    if (
      savedIndex >= 0
    ) {

      return savedIndex;

    }

  }


  return 0;

}



// ======================================================
// REMEMBER LESSON
// ======================================================

function rememberCurrentLesson(
  lesson
) {

  localStorage.setItem(
    LAST_LESSON_KEY,
    lesson.id
  );


  const params =
    new URLSearchParams(
      window.location.search
    );


  params.set(
    "course",
    courseId
  );


  params.set(
    "lesson",
    lesson.id
  );


  history.replaceState(
    null,
    "",
    `${window.location.pathname}?${params.toString()}`
  );

}



// ======================================================
// COMPLETED LESSONS
// ======================================================

function getCompletedLessons() {

  const completed =
    readJSON(
      COMPLETION_KEY,
      []
    );


  return Array.isArray(
    completed
  )
    ? completed.filter(
        id =>
          typeof id ===
          "string"
      )
    : [];

}



// ======================================================
// SAVE COMPLETION
// ======================================================

function saveCompletedLessons(
  completedLessons
) {

  localStorage.setItem(

    COMPLETION_KEY,

    JSON.stringify(
      [
        ...new Set(
          completedLessons
        )
      ]
    )

  );

}



// ======================================================
// CHECK COMPLETION
// ======================================================

function isLessonCompleted(
  lessonId
) {

  return (
    getCompletedLessons()
      .includes(
        lessonId
      )
  );

}



// ======================================================
// GET VIDEO STATE
// ======================================================

function getVideoState(
  lessonId
) {

  const state =
    readJSON(
      getVideoStateKey(
        lessonId
      ),
      null
    );


  if (
    !state
    ||
    typeof state !== "object"
  ) {

    return null;

  }


  return {

    currentTime:
      Number(
        state.currentTime
      )
      || 0,

    duration:
      Number(
        state.duration
      )
      || 0,

    percentage:
      Number(
        state.percentage
      )
      || 0,

    updatedAt:
      state.updatedAt
      ||
      null

  };

}



// ======================================================
// SAVE VIDEO STATE
// ======================================================

function saveVideoState(
  force = false
) {

  const lesson =
    course.lessons[
      currentLessonIndex
    ];


  if (
    !lesson
    ||
    !Number.isFinite(
      lessonVideo.duration
    )
    ||
    lessonVideo.duration <= 0
  ) {

    return;

  }


  const currentSecond =
    Math.floor(
      lessonVideo.currentTime
    );


  if (
    !force
    &&
    currentSecond ===
    lastSavedVideoSecond
  ) {

    return;

  }


  lastSavedVideoSecond =
    currentSecond;


  const percentage =
    clamp(

      Math.round(
        (
          lessonVideo.currentTime
          /
          lessonVideo.duration
        )
        * 100
      ),

      0,
      100

    );


  localStorage.setItem(

    getVideoStateKey(
      lesson.id
    ),

    JSON.stringify({

      currentTime:
        lessonVideo.currentTime,

      duration:
        lessonVideo.duration,

      percentage,

      updatedAt:
        new Date()
          .toISOString()

    })

  );


  updateVideoProgressUI();

  updateLessonNavigationWatchProgress();

}



// ======================================================
// RESET VIDEO
// ======================================================

function resetVideoStateForCurrentLesson() {

  const lesson =
    course.lessons[
      currentLessonIndex
    ];


  localStorage.removeItem(
    getVideoStateKey(
      lesson.id
    )
  );


  lastSavedVideoSecond =
    -1;


  lessonVideo.currentTime =
    0;


  updateVideoProgressUI();

  updateLessonNavigationWatchProgress();


  resumeBanner
    .classList.remove(
      "show"
    );


  showToast(
    "Video restarted from the beginning."
  );

}



// ======================================================
// UPDATE VIDEO PROGRESS
// ======================================================

function updateVideoProgressUI() {

  const duration =
    Number.isFinite(
      lessonVideo.duration
    )
    &&
    lessonVideo.duration > 0
      ? lessonVideo.duration
      : 0;


  const currentTime =
    Number.isFinite(
      lessonVideo.currentTime
    )
      ? lessonVideo.currentTime
      : 0;


  const percentage =
    duration > 0
      ? clamp(
          Math.round(
            (
              currentTime
              /
              duration
            )
            * 100
          ),
          0,
          100
        )
      : 0;


  videoTimeText.textContent =
    `${formatVideoTime(
      currentTime
    )} / ${formatVideoTime(
      duration
    )}`;


  videoWatchText.textContent =
    `${percentage}% watched`;


  videoWatchFill.style.width =
    `${percentage}%`;

}



// ======================================================
// SIDEBAR VIDEO PROGRESS
// ======================================================

function updateLessonNavigationWatchProgress() {

  const buttons =
    lessonNavigation
      .querySelectorAll(
        ".lesson-nav-item"
      );


  buttons.forEach(
    button => {

      const lessonId =
        button.dataset
          .lessonId;


      const watchValue =
        button.querySelector(
          ".lesson-watch"
        );


      if (
        !lessonId
        ||
        !watchValue
      ) {

        return;

      }


      const state =
        getVideoState(
          lessonId
        );


      const percentage =
        clamp(

          Math.round(
            state?.percentage
            ||
            0
          ),

          0,
          100

        );


      watchValue.textContent =
        percentage > 0
          ? `${percentage}% watched`
          : "Not started";

    }
  );

}



// ======================================================
// RESTORE VIDEO
// ======================================================

function restoreSavedVideoPosition(
  lesson
) {

  const savedState =
    getVideoState(
      lesson.id
    );


  resumeBanner
    .classList.remove(
      "show"
    );


  if (
    !savedState
    ||
    lessonVideo.duration <= 0
  ) {

    updateVideoProgressUI();

    return;

  }


  const safeTime =
    clamp(

      savedState.currentTime,

      0,

      Math.max(
        0,
        lessonVideo.duration - 0.25
      )

    );


  const shouldResume =
    safeTime >= 5
    &&
    safeTime <
    lessonVideo.duration - 5;


  if (
    shouldResume
  ) {

    lessonVideo.currentTime =
      safeTime;


    resumeText.textContent =
      `Resume from ${formatVideoTime(
        safeTime
      )} (${Math.round(
        savedState.percentage
      )}% watched)`;


    resumeBanner
      .classList.add(
        "show"
      );

  }

  else if (
    savedState.percentage >= 95
  ) {

    lessonVideo.currentTime =
      0;

  }


  updateVideoProgressUI();

}



// ======================================================
// SEEK VIDEO
// ======================================================

function seekVideo(
  seconds
) {

  if (
    !Number.isFinite(
      lessonVideo.duration
    )
  ) {

    return;

  }


  lessonVideo.currentTime =
    clamp(

      lessonVideo.currentTime
      +
      seconds,

      0,

      lessonVideo.duration

    );


  saveVideoState(
    true
  );

}



// ======================================================
// PLAY / PAUSE
// ======================================================

function toggleVideoPlayback() {

  if (
    lessonVideo.paused
  ) {

    lessonVideo
      .play()
      .catch(
        () => {}
      );

  }

  else {

    lessonVideo.pause();

  }

}



// ======================================================
// LESSON NAVIGATION
// ======================================================

function renderLessonNavigation() {

  lessonNavigation.innerHTML =
    "";


  const completedLessons =
    getCompletedLessons();


  course.lessons.forEach(
    (
      lesson,
      index
    ) => {


      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "lesson-nav-item";


      button.dataset.lessonId =
        lesson.id;



      // CURRENT LESSON

      if (
        index ===
        currentLessonIndex
      ) {

        button.classList.add(
          "active"
        );

      }



      // COMPLETED

      if (
        completedLessons.includes(
          lesson.id
        )
      ) {

        button.classList.add(
          "completed"
        );

      }



      const state =
        getVideoState(
          lesson.id
        );


      const watchPercentage =
        clamp(

          Math.round(
            state?.percentage
            ||
            0
          ),

          0,
          100

        );


      button.innerHTML =
        `

          <div class="lesson-number">

            ${
              completedLessons.includes(
                lesson.id
              )
                ? "✓"
                : index + 1
            }

          </div>


          <div class="lesson-info">

            <strong>
              ${lesson.title}
            </strong>


            <span>
              ${lesson.duration}
            </span>


            <small class="lesson-watch">

              ${
                watchPercentage > 0
                  ? `${watchPercentage}% watched`
                  : "Not started"
              }

            </small>

          </div>

        `;



      button.addEventListener(
        "click",
        () => {


          openLesson(
            index
          );


          if (
            window.innerWidth <=
            1000
          ) {

            closeSidebar();

          }

        }
      );


      lessonNavigation
        .appendChild(
          button
        );

    }
  );

}



// ======================================================
// MATERIALS
// ======================================================

function renderMaterials(
  lesson
) {

  materialList.innerHTML =
    "";


  if (
    !Array.isArray(
      lesson.materials
    )
    ||
    lesson.materials.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );


    empty.className =
      "material-empty";


    empty.textContent =
      "No materials for this lesson.";


    materialList
      .appendChild(
        empty
      );


    return;

  }



  lesson.materials.forEach(
    material => {


      const link =
        document.createElement(
          "a"
        );


      link.className =
        "material-item";


      link.href =
        material.file;


      link.setAttribute(
        "download",
        ""
      );



      const icon =
        document.createElement(
          "div"
        );


      icon.className =
        "material-icon";


      icon.textContent =
        "📄";



      const info =
        document.createElement(
          "div"
        );


      const title =
        document.createElement(
          "strong"
        );


      const meta =
        document.createElement(
          "span"
        );



      title.textContent =
        material.title;


      meta.textContent =
        `${material.type} • Download`;



      info.append(
        title,
        meta
      );


      link.append(
        icon,
        info
      );


      materialList
        .appendChild(
          link
        );

    }
  );

}



// ======================================================
// OBJECTIVES
// ======================================================

function renderObjectives(
  lesson
) {

  learningObjectives.innerHTML =
    "";


  lesson.objectives.forEach(
    objective => {


      const item =
        document.createElement(
          "div"
        );


      item.className =
        "objective-item";



      const check =
        document.createElement(
          "div"
        );


      check.className =
        "objective-check";


      check.textContent =
        "✓";



      const text =
        document.createElement(
          "span"
        );


      text.textContent =
        objective;



      item.append(
        check,
        text
      );


      learningObjectives
        .appendChild(
          item
        );

    }
  );

}



// ======================================================
// LOAD NOTES
// ======================================================

function loadNotes(
  lesson
) {

  studentNotes.value =
    localStorage.getItem(
      getNoteKey(
        lesson.id
      )
    )
    ||
    "";


  savedLabel
    .classList.remove(
      "show"
    );

}



// ======================================================
// SAVE NOTES
// ======================================================

function saveCurrentNotes() {

  const lesson =
    course.lessons[
      currentLessonIndex
    ];


  localStorage.setItem(

    getNoteKey(
      lesson.id
    ),

    studentNotes.value

  );


  savedLabel
    .classList.add(
      "show"
    );


  setTimeout(
    () => {

      savedLabel
        .classList.remove(
          "show"
        );

    },
    1500
  );

}



// ======================================================
// QUIZ SCORE UI
// ======================================================

function updateQuizScoreUI(
  lesson
) {

  const score =
    localStorage.getItem(
      getQuizKey(
        lesson.id
      )
    );


  if (
    score === null
  ) {

    existingQuizScore.textContent =
      "Not attempted";


    startQuizButton.textContent =
      "Start Quiz →";


    return;

  }


  const numericScore =
    Number(
      score
    );


  existingQuizScore.textContent =
    Number.isNaN(
      numericScore
    )
      ? "Not attempted"
      : `Best score: ${numericScore}%`;


  startQuizButton.textContent =
    "Retake Quiz →";

}



// ======================================================
// LOAD LESSON
// ======================================================

function loadLesson() {

  const lesson =
    course.lessons[
      currentLessonIndex
    ];


  if (
    !lesson
  ) {

    return;

  }



  // REMEMBER CURRENT LESSON

  rememberCurrentLesson(
    lesson
  );



  // TEXT

  currentLessonTitle.textContent =
    lesson.title;


  currentLessonDuration.textContent =
    lesson.duration;


  lessonPositionText.textContent =
    `Lesson ${
      currentLessonIndex + 1
    } of ${
      course.lessons.length
    }`;


  lessonDescription.textContent =
    lesson.description;


  placeholderTitle.textContent =
    lesson.title;



  // CONTENT

  renderObjectives(
    lesson
  );


  renderMaterials(
    lesson
  );


  loadNotes(
    lesson
  );


  updateQuizScoreUI(
    lesson
  );



  // PREVIOUS / NEXT

  previousLessonButton.disabled =
    currentLessonIndex === 0;


  nextLessonButton.disabled =
    currentLessonIndex ===
    course.lessons.length - 1;



  // HIGHLIGHT NEXT WHEN CURRENT IS COMPLETE

  nextLessonButton
    .classList.toggle(

      "ready",

      isLessonCompleted(
        lesson.id
      )
      &&
      currentLessonIndex <
      course.lessons.length - 1

    );



  // COMPLETE BUTTON

  if (
    isLessonCompleted(
      lesson.id
    )
  ) {

    completeLessonButton.textContent =
      "✓ Completed";


    completeLessonButton
      .classList.add(
        "completed"
      );

  }

  else {

    completeLessonButton.textContent =
      "✓ Mark as complete";


    completeLessonButton
      .classList.remove(
        "completed"
      );

  }



  // SIDEBAR

  renderLessonNavigation();



  // RESET VIDEO UI

  lastSavedVideoSecond =
    -1;


  lessonVideo.pause();


  lessonVideo.removeAttribute(
    "src"
  );


  lessonVideo.load();


  lessonVideo.style.display =
    "none";


  videoPlaceholder.style.display =
    "flex";


  resumeBanner
    .classList.remove(
      "show"
    );


  videoTimeText.textContent =
    "0:00 / 0:00";


  videoWatchText.textContent =
    "0% watched";


  videoWatchFill.style.width =
    "0%";



  // LOAD VIDEO

  lessonVideo.src =
    lesson.video;


  lessonVideo.load();

}



// ======================================================
// OPEN LESSON
// ======================================================

function openLesson(
  index
) {

  const safeIndex =
    clamp(

      index,

      0,

      course.lessons.length - 1

    );


  if (
    safeIndex ===
    currentLessonIndex
  ) {

    loadLesson();

    return;

  }



  // SAVE CURRENT VIDEO FIRST

  saveVideoState(
    true
  );


  currentLessonIndex =
    safeIndex;


  loadLesson();



  document
    .querySelector(
      ".video-section"
    )
    ?.scrollIntoView({

      behavior:
        "smooth",

      block:
        "start"

    });

}



// ======================================================
// COURSE PROGRESS
// ======================================================

function updateProgress() {

  const completedLessons =
    getCompletedLessons();


  const percentage =
    course.lessons.length > 0
      ? Math.round(
          (
            completedLessons.length
            /
            course.lessons.length
          )
          * 100
        )
      : 0;



  completedLessonCount.textContent =
    completedLessons.length;


  sidebarProgressText.textContent =
    `${percentage}%`;


  heroProgressText.textContent =
    `${percentage}%`;


  sidebarProgressFill.style.width =
    `${percentage}%`;


  largeProgressFill.style.width =
    `${percentage}%`;



  const degrees =
    percentage * 3.6;



  heroProgressCircle.style.background =
    `conic-gradient(
      white 0deg ${degrees}deg,
      rgba(255,255,255,0.18)
      ${degrees}deg 360deg
    )`;



  if (
    percentage === 0
  ) {

    progressMotivation.textContent =
      "Start your first lesson.";

  }

  else if (
    percentage < 50
  ) {

    progressMotivation.textContent =
      "Nice start. Keep learning!";

  }

  else if (
    percentage < 100
  ) {

    progressMotivation.textContent =
      "Great progress. You're almost there!";

  }

  else {

    progressMotivation.textContent =
      "🎉 Course completed. Great work!";

  }

}



// ======================================================
// COMPLETE / UNCOMPLETE LESSON
// ======================================================

function toggleCurrentLessonCompletion() {

  const lesson =
    course.lessons[
      currentLessonIndex
    ];


  let completedLessons =
    getCompletedLessons();


  const alreadyCompleted =
    completedLessons.includes(
      lesson.id
    );



  if (
    alreadyCompleted
  ) {

    completedLessons =
      completedLessons.filter(
        id =>
          id !== lesson.id
      );


    showToast(
      "Lesson marked as incomplete."
    );

  }

  else {

    completedLessons.push(
      lesson.id
    );


    if (
      currentLessonIndex <
      course.lessons.length - 1
    ) {

      showToast(
        "Lesson completed. Your next lesson is ready."
      );

    }

    else {

      showToast(
        "Course lesson completed. Great work!"
      );

    }

  }



  saveCompletedLessons(
    completedLessons
  );


  updateProgress();


  loadLesson();

}



// ======================================================
// OPEN QUIZ
// ======================================================

function openQuiz() {

  const lesson =
    course.lessons[
      currentLessonIndex
    ];



  quizTitle.textContent =
    `${lesson.title} Quiz`;


  quizContent.innerHTML =
    "";


  quizResult.style.display =
    "none";


  submitQuizButton.style.display =
    "block";



  lesson.quiz.forEach(
    (
      question,
      questionIndex
    ) => {


      const questionElement =
        document.createElement(
          "div"
        );


      questionElement.className =
        "quiz-question";



      const heading =
        document.createElement(
          "h4"
        );


      heading.textContent =
        `${questionIndex + 1}. ${question.question}`;


      questionElement
        .appendChild(
          heading
        );



      question.options.forEach(
        (
          option,
          optionIndex
        ) => {


          const label =
            document.createElement(
              "label"
            );


          label.className =
            "quiz-option";



          const input =
            document.createElement(
              "input"
            );


          input.type =
            "radio";


          input.name =
            `question-${questionIndex}`;


          input.value =
            optionIndex;



          const text =
            document.createElement(
              "span"
            );


          text.textContent =
            option;



          label.append(
            input,
            text
          );


          questionElement
            .appendChild(
              label
            );

        }
      );


      quizContent
        .appendChild(
          questionElement
        );

    }
  );



  quizModal
    .classList.add(
      "show"
    );


  document.body.style.overflow =
    "hidden";

}



// ======================================================
// CLOSE QUIZ
// ======================================================

function closeQuiz() {

  quizModal
    .classList.remove(
      "show"
    );


  document.body.style.overflow =
    "";

}



// ======================================================
// SUBMIT QUIZ
// ======================================================

function submitQuiz() {

  const lesson =
    course.lessons[
      currentLessonIndex
    ];


  let score =
    0;


  let answered =
    0;



  lesson.quiz.forEach(
    (
      question,
      questionIndex
    ) => {


      const selected =
        document.querySelector(
          `input[name="question-${questionIndex}"]:checked`
        );


      if (
        selected
      ) {

        answered++;

      }


      if (
        selected
        &&
        Number(
          selected.value
        )
        ===
        question.answer
      ) {

        score++;

      }

    }
  );



  // REQUIRE ALL QUESTIONS

  if (
    answered <
    lesson.quiz.length
  ) {

    showToast(
      "Answer every question before submitting."
    );


    return;

  }



  const percentage =
    Math.round(
      (
        score
        /
        lesson.quiz.length
      )
      * 100
    );



  const previousStored =
    localStorage.getItem(
      getQuizKey(
        lesson.id
      )
    );


  const previousScore =
    previousStored === null
      ? null
      : Number(
          previousStored
        );



  let bestScore =
    percentage;


  if (
    previousScore !== null
    &&
    !Number.isNaN(
      previousScore
    )
  ) {

    bestScore =
      Math.max(
        previousScore,
        percentage
      );

  }



  localStorage.setItem(

    getQuizKey(
      lesson.id
    ),

    bestScore

  );



  quizResult.style.display =
    "block";


  quizResult.textContent =
    `Your score: ${score}/${lesson.quiz.length} (${percentage}%). Best: ${bestScore}%.`;


  submitQuizButton.style.display =
    "none";


  updateQuizScoreUI(
    lesson
  );

}



// ======================================================
// SIDEBAR
// ======================================================

function openSidebar() {

  sidebar.classList.add(
    "open"
  );


  overlay.classList.add(
    "show"
  );

}



function closeSidebar() {

  sidebar.classList.remove(
    "open"
  );


  overlay.classList.remove(
    "show"
  );

}



// ======================================================
// VIDEO EVENTS
// ======================================================

function setupVideoEvents() {



  // METADATA READY

  lessonVideo.addEventListener(
    "loadedmetadata",
    () => {


      lessonVideo.style.display =
        "block";


      videoPlaceholder.style.display =
        "none";


      restoreSavedVideoPosition(
        course.lessons[
          currentLessonIndex
        ]
      );


      updateVideoProgressUI();

    }
  );



  // PLAYABLE

  lessonVideo.addEventListener(
    "canplay",
    () => {

      lessonVideo.style.display =
        "block";


      videoPlaceholder.style.display =
        "none";

    }
  );



  // VIDEO ERROR

  lessonVideo.addEventListener(
    "error",
    () => {


      lessonVideo.style.display =
        "none";


      videoPlaceholder.style.display =
        "flex";


      resumeBanner
        .classList.remove(
          "show"
        );

    }
  );



  // VIDEO MOVING

  lessonVideo.addEventListener(
    "timeupdate",
    () => {


      updateVideoProgressUI();


      saveVideoState(
        false
      );

    }
  );



  // PAUSE

  lessonVideo.addEventListener(
    "pause",
    () => {

      saveVideoState(
        true
      );

    }
  );



  // FINISHED

  lessonVideo.addEventListener(
    "ended",
    () => {


      saveVideoState(
        true
      );


      resumeBanner
        .classList.remove(
          "show"
        );


      if (
        !isLessonCompleted(
          course.lessons[
            currentLessonIndex
          ].id
        )
      ) {

        showToast(
          "Video finished. Mark this lesson as complete when you're ready."
        );

      }

    }
  );



  // SPEED CHANGED

  lessonVideo.addEventListener(
    "ratechange",
    () => {


      playbackSpeed.value =
        String(
          lessonVideo.playbackRate
        );

    }
  );



  // LEAVING PAGE

  window.addEventListener(
    "beforeunload",
    () => {

      saveVideoState(
        true
      );

    }
  );

}



// ======================================================
// KEYBOARD SHORTCUTS
// ======================================================

function setupKeyboardShortcuts() {

  document.addEventListener(
    "keydown",
    event => {


      const tagName =
        document.activeElement
          ?.tagName
          ?.toLowerCase();



      const isTyping =
        tagName === "input"
        ||
        tagName === "textarea"
        ||
        tagName === "select";



      if (
        isTyping
        ||
        quizModal
          .classList.contains(
            "show"
          )
      ) {

        return;

      }



      switch (
        event.key.toLowerCase()
      ) {


        // PLAY / PAUSE

        case " ":

        case "k":

          event.preventDefault();

          toggleVideoPlayback();

          break;



        // BACK 10

        case "arrowleft":

          event.preventDefault();

          seekVideo(
            -10
          );

          break;



        // FORWARD 10

        case "arrowright":

          event.preventDefault();

          seekVideo(
            10
          );

          break;



        // MUTE

        case "m":

          lessonVideo.muted =
            !lessonVideo.muted;


          showToast(
            lessonVideo.muted
              ? "Muted."
              : "Sound on."
          );

          break;



        // FULLSCREEN

        case "f":

          if (
            document.fullscreenElement
          ) {

            document
              .exitFullscreen
              ?.();

          }

          else {

            lessonVideo
              .requestFullscreen
              ?.();

          }

          break;



        // ESCAPE

        case "escape":

          closeSidebar();

          closeQuiz();

          break;

      }

    }
  );

}



// ======================================================
// PAGE EVENTS
// ======================================================

function setupEvents() {



  // SIDEBAR

  menuButton.addEventListener(
    "click",
    openSidebar
  );


  overlay.addEventListener(
    "click",
    closeSidebar
  );



  // PREVIOUS LESSON

  previousLessonButton
    .addEventListener(
      "click",
      () => {


        if (
          currentLessonIndex > 0
        ) {

          openLesson(
            currentLessonIndex - 1
          );

        }

      }
    );



  // NEXT LESSON

  nextLessonButton
    .addEventListener(
      "click",
      () => {


        if (
          currentLessonIndex <
          course.lessons.length - 1
        ) {

          openLesson(
            currentLessonIndex + 1
          );

        }

      }
    );



  // COMPLETE LESSON

  completeLessonButton
    .addEventListener(

      "click",

      toggleCurrentLessonCompletion

    );



  // SAVE NOTES

  saveNotesButton
    .addEventListener(
      "click",
      saveCurrentNotes
    );



  // CTRL + S NOTES

  studentNotes.addEventListener(
    "keydown",
    event => {


      if (
        (
          event.ctrlKey
          ||
          event.metaKey
        )
        &&
        event.key
          .toLowerCase()
        ===
        "s"
      ) {


        event.preventDefault();


        saveCurrentNotes();


        showToast(
          "Notes saved."
        );

      }

    }
  );



  // REWIND

  rewindButton.addEventListener(
    "click",
    () => {

      seekVideo(
        -10
      );

    }
  );



  // FORWARD

  forwardButton.addEventListener(
    "click",
    () => {

      seekVideo(
        10
      );

    }
  );



  // PLAYBACK SPEED

  playbackSpeed.addEventListener(
    "change",
    () => {


      lessonVideo.playbackRate =
        Number(
          playbackSpeed.value
        )
        ||
        1;

    }
  );



  // RESUME

  resumePlayButton
    .addEventListener(
      "click",
      () => {


        resumeBanner
          .classList.remove(
            "show"
          );


        lessonVideo
          .play()
          .catch(
            () => {}
          );

      }
    );



  // RESTART VIDEO

  restartVideoButton
    .addEventListener(

      "click",

      resetVideoStateForCurrentLesson

    );



  // OPEN QUIZ

  startQuizButton
    .addEventListener(
      "click",
      openQuiz
    );



  // CLOSE QUIZ

  closeQuizButton
    .addEventListener(
      "click",
      closeQuiz
    );



  // SUBMIT QUIZ

  submitQuizButton
    .addEventListener(
      "click",
      submitQuiz
    );



  // CLICK OUTSIDE QUIZ

  quizModal.addEventListener(
    "click",
    event => {


      if (
        event.target ===
        quizModal
      ) {

        closeQuiz();

      }

    }
  );



  // RESPONSIVE SIDEBAR

  window.addEventListener(
    "resize",
    () => {


      if (
        window.innerWidth >
        1000
      ) {

        closeSidebar();

      }

    }
  );

}



// ======================================================
// INITIALIZE
// ======================================================

function initializeCoursePlayer() {


  loadStudentInformation();


  setCourseInformation();



  currentLessonIndex =
    resolveInitialLessonIndex();



  setupEvents();


  setupVideoEvents();


  setupKeyboardShortcuts();



  updateProgress();


  loadLesson();

}



// ======================================================
// START
// ======================================================

initializeCoursePlayer();