// ======================================================
// EDUSPACE COURSE LIBRARY
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


const enrolledCoursesCount =
  document.getElementById(
    "enrolledCoursesCount"
  );

const completedCoursesCount =
  document.getElementById(
    "completedCoursesCount"
  );

const completedLessonsCount =
  document.getElementById(
    "completedLessonsCount"
  );

const overallProgressCount =
  document.getElementById(
    "overallProgressCount"
  );


const courseSearch =
  document.getElementById(
    "courseSearch"
  );

const courseFilters =
  document.querySelectorAll(
    "[data-filter]"
  );

const courseLibraryGrid =
  document.getElementById(
    "courseLibraryGrid"
  );

const courseEmpty =
  document.getElementById(
    "courseEmpty"
  );

const coursesToast =
  document.getElementById(
    "coursesToast"
  );


// ======================================================
// STATE
// ======================================================

let currentFilter =
  "all";

let toastTimer =
  null;


// ======================================================
// HELPERS
// ======================================================

function createInitials(name) {

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

  const value =
    readJSON(
      `completed-${courseId}`,
      []
    );


  return Array.isArray(
    value
  )
    ? value
    : [];

}


// ======================================================
// COURSE PROGRESS
// ======================================================

function getCourseProgress(
  courseId
) {

  const course =
    COURSES[
      courseId
    ];


  if (!course) {

    return {
      completed: 0,
      total: 0,
      percentage: 0,
      status: "not-started"
    };

  }


  const completed =
    getCompletedLessons(
      courseId
    ).length;


  const total =
    Number(
      course.totalLessons || 0
    );


  const percentage =
    total > 0
      ? clamp(
          Math.round(
            (
              completed /
              total
            )
            * 100
          ),
          0,
          100
        )
      : 0;


  let status =
    "not-started";


  if (
    percentage === 100
  ) {

    status =
      "completed";

  }

  else if (
    percentage > 0
  ) {

    status =
      "in-progress";

  }


  return {

    completed,

    total,

    percentage,

    status

  };

}


// ======================================================
// COURSE STATUS TEXT
// ======================================================

function getStatusLabel(
  status
) {

  switch (status) {

    case "completed":
      return "Completed";

    case "in-progress":
      return "In Progress";

    default:
      return "Not Started";

  }

}


// ======================================================
// COVER CLASS
// ======================================================

function getCoverClass(
  courseId
) {

  if (
    courseId ===
    "web-development"
  ) {
    return "cover-development";
  }


  if (
    courseId ===
    "mathematics"
  ) {
    return "cover-mathematics";
  }


  return "cover-design";

}


// ======================================================
// LAST LESSON
// ======================================================

function getLastLesson(
  courseId
) {

  const course =
    COURSES[
      courseId
    ];


  if (!course) {
    return null;
  }


  const savedLessonId =
    localStorage.getItem(
      `last-lesson-${courseId}`
    );


  if (
    savedLessonId &&
    course.lessons &&
    course.lessons[
      savedLessonId
    ]
  ) {

    return {

      id:
        savedLessonId,

      title:
        course.lessons[
          savedLessonId
        ]

    };

  }


  const lessonEntries =
    Object.entries(
      course.lessons || {}
    );


  if (
    lessonEntries.length === 0
  ) {

    return null;

  }


  return {

    id:
      lessonEntries[0][0],

    title:
      lessonEntries[0][1]

  };

}


// ======================================================
// STATS
// ======================================================

function updateStats() {

  const courseEntries =
    Object.entries(
      COURSES
    );


  let completedCourses =
    0;

  let completedLessons =
    0;

  let totalLessons =
    0;


  courseEntries.forEach(
    (
      [
        courseId,
        course
      ]
    ) => {

      const progress =
        getCourseProgress(
          courseId
        );


      completedLessons +=
        progress.completed;


      totalLessons +=
        Number(
          course.totalLessons ||
          0
        );


      if (
        progress.status ===
        "completed"
      ) {

        completedCourses++;

      }

    }
  );


  const overallProgress =
    totalLessons > 0
      ? Math.round(
          (
            completedLessons /
            totalLessons
          )
          * 100
        )
      : 0;


  enrolledCoursesCount.textContent =
    courseEntries.length;


  completedCoursesCount.textContent =
    completedCourses;


  completedLessonsCount.textContent =
    completedLessons;


  overallProgressCount.textContent =
    `${overallProgress}%`;

}


// ======================================================
// OPEN COURSE
// ======================================================

function openCourse(
  courseId
) {

  window.location.href =
    `course.html?course=${encodeURIComponent(
      courseId
    )}`;

}


// ======================================================
// RESUME COURSE
// ======================================================

function resumeCourse(
  courseId
) {

  const lastLesson =
    getLastLesson(
      courseId
    );


  if (!lastLesson) {

    openCourse(
      courseId
    );

    return;

  }


  window.location.href =
    `course.html?course=${encodeURIComponent(
      courseId
    )}&lesson=${encodeURIComponent(
      lastLesson.id
    )}`;

}


// ======================================================
// CREATE COURSE CARD
// ======================================================

function createCourseCard(
  courseId,
  course
) {

  const progress =
    getCourseProgress(
      courseId
    );


  const lastLesson =
    getLastLesson(
      courseId
    );


  const card =
    document.createElement(
      "article"
    );


  card.className =
    "library-course-card";


  card.dataset.courseId =
    courseId;


  card.dataset.status =
    progress.status;


  card.dataset.search =
    [
      course.title,
      course.subtitle,
      course.category
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();


  // ====================================================
  // COVER
  // ====================================================

  const cover =
    document.createElement(
      "div"
    );


  cover.className =
    `course-cover ${getCoverClass(
      courseId
    )}`;


  const category =
    document.createElement(
      "span"
    );


  category.className =
    "course-category";


  category.textContent =
    course.category ||
    "COURSE";


  const icon =
    document.createElement(
      "span"
    );


  icon.className =
    "course-cover-icon";


  icon.textContent =
    course.icon ||
    "📚";


  cover.append(
    category,
    icon
  );


  // ====================================================
  // BODY
  // ====================================================

  const body =
    document.createElement(
      "div"
    );


  body.className =
    "course-card-body";


  // HEADING

  const heading =
    document.createElement(
      "div"
    );


  heading.className =
    "course-card-heading";


  const headingText =
    document.createElement(
      "div"
    );


  const title =
    document.createElement(
      "h3"
    );


  title.textContent =
    course.title;


  const subtitle =
    document.createElement(
      "p"
    );


  subtitle.textContent =
    course.subtitle ||
    "EduSpace course";


  headingText.append(
    title,
    subtitle
  );


  const status =
    document.createElement(
      "span"
    );


  status.className =
    `course-status ${progress.status}`;


  status.textContent =
    getStatusLabel(
      progress.status
    );


  heading.append(
    headingText,
    status
  );


  // ====================================================
  // PROGRESS
  // ====================================================

  const progressSection =
    document.createElement(
      "div"
    );


  progressSection.className =
    "course-progress";


  const progressHeading =
    document.createElement(
      "div"
    );


  progressHeading.className =
    "course-progress-heading";


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


  progressValue.textContent =
    `${progress.percentage}%`;


  progressHeading.append(
    progressLabel,
    progressValue
  );


  const progressTrack =
    document.createElement(
      "div"
    );


  progressTrack.className =
    "course-progress-track";


  const progressFill =
    document.createElement(
      "div"
    );


  progressFill.className =
    "course-progress-fill";


  progressFill.style.width =
    `${progress.percentage}%`;


  progressTrack.appendChild(
    progressFill
  );


  const progressMeta =
    document.createElement(
      "div"
    );


  progressMeta.className =
    "course-progress-meta";


  const completedText =
    document.createElement(
      "span"
    );


  completedText.textContent =
    `${progress.completed}/${progress.total} lessons`;


  const progressMessage =
    document.createElement(
      "span"
    );


  if (
    progress.status ===
    "completed"
  ) {

    progressMessage.textContent =
      "Course complete 🎉";

  }

  else if (
    progress.status ===
    "in-progress"
  ) {

    progressMessage.textContent =
      "Keep going";

  }

  else {

    progressMessage.textContent =
      "Ready to begin";

  }


  progressMeta.append(
    completedText,
    progressMessage
  );


  progressSection.append(
    progressHeading,
    progressTrack,
    progressMeta
  );


  // ====================================================
  // LAST LESSON
  // ====================================================

  const lastLessonBox =
    document.createElement(
      "div"
    );


  lastLessonBox.className =
    "last-lesson";


  const lastLabel =
    document.createElement(
      "span"
    );


  lastLabel.textContent =
    progress.status ===
    "not-started"
      ? "START WITH"
      : "CONTINUE FROM";


  const lastTitle =
    document.createElement(
      "strong"
    );


  lastTitle.textContent =
    lastLesson
      ? lastLesson.title
      : "Open course";


  lastLessonBox.append(
    lastLabel,
    lastTitle
  );


  // ====================================================
  // ACTIONS
  // ====================================================

  const actions =
    document.createElement(
      "div"
    );


  actions.className =
    "course-actions";


  const openButton =
    document.createElement(
      "button"
    );


  openButton.type =
    "button";


  openButton.className =
    "course-open-button";


  openButton.textContent =
    "View Course";


  const resumeButton =
    document.createElement(
      "button"
    );


  resumeButton.type =
    "button";


  resumeButton.className =
    "course-resume-button";


  if (
    progress.status ===
    "completed"
  ) {

    resumeButton.textContent =
      "Review Course →";

  }

  else if (
    progress.status ===
    "in-progress"
  ) {

    resumeButton.textContent =
      "Continue →";

  }

  else {

    resumeButton.textContent =
      "Start Course →";

  }


  openButton.addEventListener(
    "click",
    () => {

      openCourse(
        courseId
      );

    }
  );


  resumeButton.addEventListener(
    "click",
    () => {

      resumeCourse(
        courseId
      );

    }
  );


  actions.append(
    openButton,
    resumeButton
  );


  body.append(
    heading,
    progressSection,
    lastLessonBox,
    actions
  );


  card.append(
    cover,
    body
  );


  return card;

}


// ======================================================
// RENDER COURSES
// ======================================================

function renderCourses() {

  const query =
    courseSearch.value
      .trim()
      .toLowerCase();


  courseLibraryGrid.innerHTML =
    "";


  let visibleCourses =
    0;


  Object.entries(
    COURSES
  ).forEach(
    (
      [
        courseId,
        course
      ]
    ) => {


      const progress =
        getCourseProgress(
          courseId
        );


      const searchableText =
        [
          course.title,
          course.subtitle,
          course.category
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();


      const matchesSearch =
        searchableText.includes(
          query
        );


      const matchesFilter =
        currentFilter ===
        "all"
        ||
        progress.status ===
        currentFilter;


      if (
        !matchesSearch ||
        !matchesFilter
      ) {

        return;

      }


      courseLibraryGrid
        .appendChild(
          createCourseCard(
            courseId,
            course
          )
        );


      visibleCourses++;

    }
  );


  courseEmpty
    .classList.toggle(
      "show",
      visibleCourses === 0
    );

}


// ======================================================
// FILTERS
// ======================================================

function setFilter(
  filter
) {

  currentFilter =
    filter;


  courseFilters.forEach(
    button => {

      button.classList.toggle(
        "active",
        button.dataset.filter ===
        filter
      );

    }
  );


  renderCourses();

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


  courseSearch.addEventListener(
    "input",
    renderCourses
  );


  courseFilters.forEach(
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
    () => {

      updateStats();

      renderCourses();

    }
  );


  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.visibilityState ===
        "visible"
      ) {

        updateStats();

        renderCourses();

      }

    }
  );

}


// ======================================================
// INITIALIZE
// ======================================================

function initializeCourseLibrary() {

  loadStudentInformation();

  setupEvents();

  updateStats();

  renderCourses();

}


// ======================================================
// START
// ======================================================

initializeCourseLibrary();