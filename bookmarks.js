// ======================================================
// EDUSPACE BOOKMARKS
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

const BOOKMARK_STORAGE_KEY =
  "eduspace-bookmarks-v1";


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


const savedLessonCount =
  document.getElementById(
    "savedLessonCount"
  );

const savedCourseCount =
  document.getElementById(
    "savedCourseCount"
  );

const completedSavedCount =
  document.getElementById(
    "completedSavedCount"
  );

const averageWatchProgress =
  document.getElementById(
    "averageWatchProgress"
  );


const bookmarkSearch =
  document.getElementById(
    "bookmarkSearch"
  );

const bookmarkGrid =
  document.getElementById(
    "bookmarkGrid"
  );

const bookmarkEmpty =
  document.getElementById(
    "bookmarkEmpty"
  );

const filterButtons =
  document.querySelectorAll(
    "[data-filter]"
  );


const confirmModal =
  document.getElementById(
    "confirmModal"
  );

const confirmMessage =
  document.getElementById(
    "confirmMessage"
  );

const cancelRemoveButton =
  document.getElementById(
    "cancelRemoveButton"
  );

const confirmRemoveButton =
  document.getElementById(
    "confirmRemoveButton"
  );


const bookmarkToast =
  document.getElementById(
    "bookmarkToast"
  );


// ======================================================
// STATE
// ======================================================

let currentFilter =
  "all";

let pendingRemoval =
  null;

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
      .slice(0,2)
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
// GET BOOKMARKS
// ======================================================

function getBookmarks() {

  const bookmarks =
    readJSON(
      BOOKMARK_STORAGE_KEY,
      []
    );


  return Array.isArray(
    bookmarks
  )
    ? bookmarks
    : [];

}


// ======================================================
// SAVE BOOKMARKS
// ======================================================

function saveBookmarks(
  bookmarks
) {

  localStorage.setItem(

    BOOKMARK_STORAGE_KEY,

    JSON.stringify(
      bookmarks
    )

  );

}


// ======================================================
// COURSE
// ======================================================

function getCourse(
  courseId
) {

  return (
    COURSES[
      courseId
    ]
    ||
    null
  );

}


// ======================================================
// LESSON TITLE
// ======================================================

function getLessonTitle(
  courseId,
  lessonId
) {

  const course =
    getCourse(
      courseId
    );


  if (!course) {

    return "Lesson";

  }


  return (
    course.lessons?.[
      lessonId
    ]
    ||
    "Lesson"
  );

}


// ======================================================
// VIDEO STATE
// ======================================================

function getVideoState(
  courseId,
  lessonId
) {

  const state =
    readJSON(
      `video-state-${courseId}-${lessonId}`,
      null
    );


  if (
    !state ||
    typeof state !==
    "object"
  ) {

    return {
      percentage:
        0
    };

  }


  return {

    percentage:
      clamp(
        Number(
          state.percentage || 0
        ),
        0,
        100
      )

  };

}


// ======================================================
// COMPLETED
// ======================================================

function isLessonCompleted(
  courseId,
  lessonId
) {

  const completed =
    readJSON(
      `completed-${courseId}`,
      []
    );


  return (
    Array.isArray(completed)
    &&
    completed.includes(
      lessonId
    )
  );

}


// ======================================================
// STATUS
// ======================================================

function getLessonStatus(
  bookmark
) {

  if (
    isLessonCompleted(
      bookmark.courseId,
      bookmark.lessonId
    )
  ) {

    return {
      key:
        "completed",

      label:
        "Completed"
    };

  }


  const state =
    getVideoState(
      bookmark.courseId,
      bookmark.lessonId
    );


  if (
    state.percentage > 0
  ) {

    return {
      key:
        "in-progress",

      label:
        "In Progress"
    };

  }


  return {
    key:
      "not-started",

    label:
      "Not Started"
  };

}


// ======================================================
// FORMAT SAVED DATE
// ======================================================

function formatSavedDate(
  dateValue
) {

  const date =
    new Date(
      dateValue
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "";

  }


  return (
    `Saved ${
      date.toLocaleDateString(
        undefined,
        {
          month:
            "short",

          day:
            "numeric",

          year:
            "numeric"
        }
      )
    }`
  );

}


// ======================================================
// STATS
// ======================================================

function updateStats() {

  const bookmarks =
    getBookmarks();


  const courses =
    new Set();


  let completed =
    0;


  let watchTotal =
    0;


  bookmarks.forEach(
    bookmark => {


      courses.add(
        bookmark.courseId
      );


      if (
        isLessonCompleted(
          bookmark.courseId,
          bookmark.lessonId
        )
      ) {

        completed++;

      }


      watchTotal +=
        getVideoState(
          bookmark.courseId,
          bookmark.lessonId
        ).percentage;

    }
  );


  const average =
    bookmarks.length > 0
      ? Math.round(
          watchTotal /
          bookmarks.length
        )
      : 0;


  savedLessonCount.textContent =
    bookmarks.length;


  savedCourseCount.textContent =
    courses.size;


  completedSavedCount.textContent =
    completed;


  averageWatchProgress.textContent =
    `${average}%`;

}


// ======================================================
// TOAST
// ======================================================

function showToast(
  message
) {

  bookmarkToast.textContent =
    message;


  bookmarkToast
    .classList.add(
      "show"
    );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        bookmarkToast
          .classList.remove(
            "show"
          );

      },
      2200
    );

}


// ======================================================
// OPEN LESSON
// ======================================================

function openLesson(
  bookmark
) {

  window.location.href =
    `course.html?course=${encodeURIComponent(
      bookmark.courseId
    )}&lesson=${encodeURIComponent(
      bookmark.lessonId
    )}`;

}


// ======================================================
// REMOVE MODAL
// ======================================================

function openRemoveModal(
  bookmark
) {

  pendingRemoval =
    bookmark;


  const title =
    getLessonTitle(
      bookmark.courseId,
      bookmark.lessonId
    );


  confirmMessage.textContent =
    `"${title}" will be removed from your saved lessons.`;


  confirmModal
    .classList.add(
      "show"
    );


  document.body.style.overflow =
    "hidden";

}


function closeRemoveModal() {

  pendingRemoval =
    null;


  confirmModal
    .classList.remove(
      "show"
    );


  document.body.style.overflow =
    "";

}


// ======================================================
// REMOVE BOOKMARK
// ======================================================

function removePendingBookmark() {

  if (!pendingRemoval) {
    return;
  }


  const target =
    pendingRemoval;


  const updated =
    getBookmarks()
      .filter(
        bookmark =>
          !(
            bookmark.courseId ===
              target.courseId
            &&
            bookmark.lessonId ===
              target.lessonId
          )
      );


  saveBookmarks(
    updated
  );


  closeRemoveModal();


  updateStats();

  renderBookmarks();


  showToast(
    "Bookmark removed."
  );

}


// ======================================================
// COURSE COVER CLASS
// ======================================================

function getCoverClass(
  courseId
) {

  if (
    courseId ===
    "mathematics"
  ) {

    return "mathematics";

  }


  if (
    courseId ===
    "ui-ux"
  ) {

    return "ui-ux";

  }


  return "";

}


// ======================================================
// CREATE CARD
// ======================================================

function createBookmarkCard(
  bookmark
) {

  const course =
    getCourse(
      bookmark.courseId
    );


  if (!course) {
    return null;
  }


  const lessonTitle =
    getLessonTitle(
      bookmark.courseId,
      bookmark.lessonId
    );


  const videoState =
    getVideoState(
      bookmark.courseId,
      bookmark.lessonId
    );


  const status =
    getLessonStatus(
      bookmark
    );


  const card =
    document.createElement(
      "article"
    );


  card.className =
    "bookmark-card";


  // ====================================================
  // COVER
  // ====================================================

  const cover =
    document.createElement(
      "div"
    );


  cover.className =
    `bookmark-card-cover ${getCoverClass(
      bookmark.courseId
    )}`;


  const courseLabel =
    document.createElement(
      "span"
    );


  courseLabel.className =
    "course-label";


  courseLabel.textContent =
    course.category ||
    "COURSE";


  const courseIcon =
    document.createElement(
      "span"
    );


  courseIcon.className =
    "course-icon";


  courseIcon.textContent =
    course.icon ||
    "📚";


  cover.append(
    courseLabel,
    courseIcon
  );


  // ====================================================
  // BODY
  // ====================================================

  const body =
    document.createElement(
      "div"
    );


  body.className =
    "bookmark-card-body";


  const meta =
    document.createElement(
      "div"
    );


  meta.className =
    "bookmark-meta";


  const courseName =
    document.createElement(
      "span"
    );


  courseName.textContent =
    course.title;


  const savedBadge =
    document.createElement(
      "span"
    );


  savedBadge.className =
    "saved-badge";


  savedBadge.textContent =
    "🔖 Saved";


  meta.append(
    courseName,
    savedBadge
  );


  const title =
    document.createElement(
      "h3"
    );


  title.textContent =
    lessonTitle;


  const description =
    document.createElement(
      "p"
    );


  description.textContent =
    videoState.percentage > 0
      ? `You've watched ${Math.round(
          videoState.percentage
        )}% of this lesson.`
      : "Saved for later review.";


  // ====================================================
  // PROGRESS
  // ====================================================

  const progress =
    document.createElement(
      "div"
    );


  progress.className =
    "bookmark-progress";


  const progressHeading =
    document.createElement(
      "div"
    );


  progressHeading.className =
    "bookmark-progress-heading";


  const progressLabel =
    document.createElement(
      "span"
    );


  progressLabel.textContent =
    "Video progress";


  const progressValue =
    document.createElement(
      "strong"
    );


  progressValue.textContent =
    `${Math.round(
      videoState.percentage
    )}%`;


  progressHeading.append(
    progressLabel,
    progressValue
  );


  const progressTrack =
    document.createElement(
      "div"
    );


  progressTrack.className =
    "bookmark-progress-track";


  const progressFill =
    document.createElement(
      "div"
    );


  progressFill.className =
    "bookmark-progress-fill";


  progressFill.style.width =
    `${videoState.percentage}%`;


  progressTrack.appendChild(
    progressFill
  );


  progress.append(
    progressHeading,
    progressTrack
  );


  // ====================================================
  // STATUS
  // ====================================================

  const statusRow =
    document.createElement(
      "div"
    );


  statusRow.className =
    "lesson-status-row";


  const statusElement =
    document.createElement(
      "span"
    );


  statusElement.className =
    `lesson-status ${status.key}`;


  statusElement.textContent =
    status.label;


  const savedDate =
    document.createElement(
      "span"
    );


  savedDate.className =
    "saved-date";


  savedDate.textContent =
    formatSavedDate(
      bookmark.savedAt
    );


  statusRow.append(
    statusElement,
    savedDate
  );


  // ====================================================
  // ACTIONS
  // ====================================================

  const actions =
    document.createElement(
      "div"
    );


  actions.className =
    "bookmark-actions";


  const openButton =
    document.createElement(
      "button"
    );


  openButton.type =
    "button";


  openButton.className =
    "open-lesson-button";


  openButton.textContent =
    status.key ===
    "not-started"
      ? "Start Lesson →"
      : "Continue Lesson →";


  const removeButton =
    document.createElement(
      "button"
    );


  removeButton.type =
    "button";


  removeButton.className =
    "remove-bookmark-button";


  removeButton.title =
    "Remove bookmark";


  removeButton.setAttribute(
    "aria-label",
    `Remove ${lessonTitle} bookmark`
  );


  removeButton.textContent =
    "🗑";


  openButton.addEventListener(
    "click",
    () => {

      openLesson(
        bookmark
      );

    }
  );


  removeButton.addEventListener(
    "click",
    () => {

      openRemoveModal(
        bookmark
      );

    }
  );


  actions.append(
    openButton,
    removeButton
  );


  body.append(
    meta,
    title,
    description,
    progress,
    statusRow,
    actions
  );


  card.append(
    cover,
    body
  );


  return card;

}


// ======================================================
// RENDER
// ======================================================

function renderBookmarks() {

  const query =
    bookmarkSearch.value
      .trim()
      .toLowerCase();


  const bookmarks =
    getBookmarks()
      .filter(
        bookmark => {


          const course =
            getCourse(
              bookmark.courseId
            );


          if (!course) {

            return false;

          }


          const lessonTitle =
            getLessonTitle(
              bookmark.courseId,
              bookmark.lessonId
            );


          const searchable =
            `${course.title} ${lessonTitle}`
              .toLowerCase();


          const matchesSearch =
            searchable.includes(
              query
            );


          const status =
            getLessonStatus(
              bookmark
            );


          const matchesFilter =
            currentFilter ===
              "all"
            ||
            status.key ===
              currentFilter;


          return (
            matchesSearch &&
            matchesFilter
          );

        }
      )
      .sort(
        (
          first,
          second
        ) =>
          new Date(
            second.savedAt || 0
          )
          -
          new Date(
            first.savedAt || 0
          )
      );


  bookmarkGrid.innerHTML =
    "";


  bookmarks.forEach(
    bookmark => {


      const card =
        createBookmarkCard(
          bookmark
        );


      if (card) {

        bookmarkGrid
          .appendChild(
            card
          );

      }

    }
  );


  bookmarkEmpty
    .classList.toggle(
      "show",
      bookmarks.length === 0
    );

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


  renderBookmarks();

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

  bookmarkSearch.addEventListener(
    "input",
    renderBookmarks
  );


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


  cancelRemoveButton.addEventListener(
    "click",
    closeRemoveModal
  );


  confirmRemoveButton.addEventListener(
    "click",
    removePendingBookmark
  );


  confirmModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        confirmModal
      ) {

        closeRemoveModal();

      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key ===
        "Escape"
      ) {

        closeSidebar();

        closeRemoveModal();

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

      renderBookmarks();

    }
  );

}


// ======================================================
// INITIALIZE
// ======================================================

function initializeBookmarks() {

  loadStudentInformation();

  setupEvents();

  updateStats();

  renderBookmarks();

}


// ======================================================
// START
// ======================================================

initializeBookmarks();