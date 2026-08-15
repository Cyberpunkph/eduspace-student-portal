// ======================================================
// EDUSPACE DASHBOARD
// ======================================================


// ======================================================
// LOGIN PROTECTION
// ======================================================

if (
  localStorage.getItem("studentLoggedIn") !== "true"
) {
  window.location.href = "index.html";
}


// ======================================================
// SHARED DATA
// ======================================================

if (!window.EduSpaceData) {
  throw new Error(
    "EduSpace data.js was not loaded."
  );
}

const DASHBOARD_COURSES =
  window.EduSpaceData.courses;

const DASHBOARD_ASSIGNMENTS =
  window.EduSpaceData.assignments;


// ======================================================
// STORAGE KEYS
// ======================================================

const NOTIFICATION_STORAGE_KEY =
  "eduspace-notifications";

const SUBMISSION_STORAGE_KEY =
  "eduspace-assignment-submissions";

const MESSAGE_STORAGE_KEY =
  "eduspace-messages-v1";


// ======================================================
// DOM ELEMENTS
// ======================================================

const sidebar =
  document.getElementById("sidebar");

const mobileOverlay =
  document.getElementById("mobileOverlay");

const menuButton =
  document.getElementById("menuButton");

const searchInput =
  document.getElementById("searchInput");

const noResults =
  document.getElementById("noResults");

const continueLearningButton =
  document.getElementById(
    "continueLearningButton"
  );

const dashboardAssignmentList =
  document.getElementById(
    "dashboardAssignmentList"
  );

const dashboardMessageCount =
  document.getElementById(
    "dashboardMessageCount"
  );


// ======================================================
// NOTIFICATIONS
// ======================================================

const notificationMenu =
  document.getElementById(
    "notificationMenu"
  );

const notificationButton =
  document.getElementById(
    "notificationButton"
  );

const notificationDropdown =
  document.getElementById(
    "notificationDropdown"
  );

const notificationBadge =
  document.getElementById(
    "notificationBadge"
  );

const notificationList =
  document.getElementById(
    "notificationList"
  );

const markAllReadButton =
  document.getElementById(
    "markAllReadButton"
  );

const viewAllNotificationsButton =
  document.getElementById(
    "viewAllNotificationsButton"
  );

const notificationFooter =
  document.getElementById(
    "notificationFooter"
  );


// ======================================================
// PROFILE
// ======================================================

const profileMenu =
  document.getElementById(
    "profileMenu"
  );

const profileButton =
  document.getElementById(
    "profileButton"
  );

const profileDropdown =
  document.getElementById(
    "profileDropdown"
  );

const logoutButton =
  document.getElementById(
    "logoutButton"
  );

const appearanceButton =
  document.getElementById(
    "appearanceButton"
  );

const helpButton =
  document.getElementById(
    "helpButton"
  );

const studentNameElement =
  document.getElementById(
    "studentName"
  );

const topAvatar =
  document.getElementById(
    "topAvatar"
  );

const dropdownAvatar =
  document.getElementById(
    "dropdownAvatar"
  );

const dropdownStudentName =
  document.getElementById(
    "dropdownStudentName"
  );

const dropdownStudentEmail =
  document.getElementById(
    "dropdownStudentEmail"
  );

const largeAvatar =
  document.getElementById(
    "largeAvatar"
  );

const profileStudentName =
  document.getElementById(
    "profileStudentName"
  );

const profileEmail =
  document.getElementById(
    "profileEmail"
  );


// ======================================================
// STATISTICS
// ======================================================

const activeCoursesStat =
  document.getElementById(
    "activeCoursesStat"
  );

const completedLessonsStat =
  document.getElementById(
    "completedLessonsStat"
  );

const averageGradeStat =
  document.getElementById(
    "averageGradeStat"
  );

const averageGradeMessage =
  document.getElementById(
    "averageGradeMessage"
  );

const overallProgressStat =
  document.getElementById(
    "overallProgressStat"
  );


// ======================================================
// PROFILE STATS
// ======================================================

const profileCoursesCount =
  document.getElementById(
    "profileCoursesCount"
  );

const profileCompletedCount =
  document.getElementById(
    "profileCompletedCount"
  );

const profileGrade =
  document.getElementById(
    "profileGrade"
  );


// ======================================================
// PROGRESS
// ======================================================

const progressCircle =
  document.getElementById(
    "progressCircle"
  );

const progressCircleValue =
  document.getElementById(
    "progressCircleValue"
  );

const progressMessage =
  document.getElementById(
    "progressMessage"
  );


// ======================================================
// GRADES
// ======================================================

const gradeList =
  document.getElementById(
    "gradeList"
  );


// ======================================================
// TOAST
// ======================================================

const dashboardToast =
  document.getElementById(
    "dashboardToast"
  );


// ======================================================
// APPEARANCE
// ======================================================

const appearanceModal =
  document.getElementById(
    "appearanceModal"
  );

const appearanceCloseButton =
  document.getElementById(
    "appearanceCloseButton"
  );

const appearanceDoneButton =
  document.getElementById(
    "appearanceDoneButton"
  );

const appearanceStatus =
  document.getElementById(
    "appearanceStatus"
  );

const themeOptions =
  document.querySelectorAll(
    "[data-theme-option]"
  );


// ======================================================
// NAVIGATION
// ======================================================

const navLinks =
  document.querySelectorAll(
    ".sidebar-nav .nav-link"
  );


// ======================================================
// STATE
// ======================================================

let toastTimer = null;

let showAllNotifications = false;


// ======================================================
// CREATE INITIALS
// ======================================================

function createInitials(name) {

  if (
    typeof name !== "string" ||
    name.trim() === ""
  ) {
    return "ST";
  }

  const words =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  const letters =
    words
      .map(
        word =>
          word.charAt(0)
      )
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return letters || "ST";

}


// ======================================================
// SAFE JSON
// ======================================================

function readJSON(
  key,
  fallback
) {

  const value =
    localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {

    return JSON.parse(value);

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
// CALCULATE PERCENTAGE
// ======================================================

function calculatePercentage(
  completed,
  total
) {

  if (
    !total ||
    total <= 0
  ) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (completed / total) * 100
      )
    )
  );

}


// ======================================================
// STUDENT INFORMATION
// ======================================================

function loadStudentInformation() {

  const studentName =
    localStorage.getItem(
      "studentName"
    ) || "Student";

  const studentEmail =
    localStorage.getItem(
      "studentEmail"
    ) || "student@email.com";

  const initials =
    createInitials(
      studentName
    );


  if (studentNameElement) {
    studentNameElement.textContent =
      studentName;
  }

  if (topAvatar) {
    topAvatar.textContent =
      initials;
  }

  if (dropdownAvatar) {
    dropdownAvatar.textContent =
      initials;
  }

  if (dropdownStudentName) {
    dropdownStudentName.textContent =
      studentName;
  }

  if (dropdownStudentEmail) {
    dropdownStudentEmail.textContent =
      studentEmail;
  }

  if (largeAvatar) {
    largeAvatar.textContent =
      initials;
  }

  if (profileStudentName) {
    profileStudentName.textContent =
      studentName;
  }

  if (profileEmail) {
    profileEmail.textContent =
      studentEmail;
  }

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

  return Array.isArray(completed)
    ? completed
    : [];

}


// ======================================================
// UPDATE COURSE CARDS
// ======================================================

function updateCourseCards() {

  const cards =
    document.querySelectorAll(
      ".course-card[data-course-id]"
    );

  cards.forEach(
    card => {

      const courseId =
        card.dataset.courseId;

      const course =
        DASHBOARD_COURSES[
          courseId
        ];

      if (!course) {
        return;
      }

      const completed =
        getCompletedLessons(
          courseId
        );

      const percentage =
        calculatePercentage(
          completed.length,
          course.totalLessons
        );

      const percentageElement =
        card.querySelector(
          ".course-progress-value"
        );

      const progressFill =
        card.querySelector(
          ".progress-fill"
        );

      const lessonCounter =
        card.querySelector(
          ".course-lesson-count"
        );


      if (percentageElement) {

        percentageElement.textContent =
          `${percentage}%`;

      }


      if (progressFill) {

        progressFill.style.width =
          `${percentage}%`;

      }


      if (lessonCounter) {

        lessonCounter.textContent =
          `${completed.length}/${course.totalLessons} lessons`;

      }


      card.classList.toggle(
        "course-completed",
        percentage === 100
      );

    }
  );

}


// ======================================================
// TOTAL LESSONS
// ======================================================

function getTotalLessons() {

  return Object
    .values(
      DASHBOARD_COURSES
    )
    .reduce(
      (
        total,
        course
      ) => {

        return (
          total +
          Number(
            course.totalLessons || 0
          )
        );

      },
      0
    );

}


// ======================================================
// TOTAL COMPLETED LESSONS
// ======================================================

function getTotalCompletedLessons() {

  return Object
    .keys(
      DASHBOARD_COURSES
    )
    .reduce(
      (
        total,
        courseId
      ) => {

        return (
          total +
          getCompletedLessons(
            courseId
          ).length
        );

      },
      0
    );

}


// ======================================================
// OVERALL PROGRESS
// ======================================================

function getOverallProgress() {

  return calculatePercentage(
    getTotalCompletedLessons(),
    getTotalLessons()
  );

}


// ======================================================
// QUIZ RESULTS
// ======================================================

function getQuizResults() {

  const results = [];

  Object
    .entries(
      DASHBOARD_COURSES
    )
    .forEach(
      (
        [
          courseId,
          course
        ]
      ) => {

        const lessons =
          course.lessons || {};

        Object
          .entries(
            lessons
          )
          .forEach(
            (
              [
                lessonId,
                lessonTitle
              ]
            ) => {

              const score =
                localStorage.getItem(
                  `quiz-${courseId}-${lessonId}`
                );

              if (
                score === null
              ) {
                return;
              }

              const numericScore =
                Number(score);

              if (
                Number.isNaN(
                  numericScore
                )
              ) {
                return;
              }

              results.push({

                courseId,

                courseTitle:
                  course.title,

                lessonId,

                lessonTitle,

                score:
                  Math.max(
                    0,
                    Math.min(
                      100,
                      numericScore
                    )
                  )

              });

            }
          );

      }
    );

  return results;

}


// ======================================================
// AVERAGE GRADE
// ======================================================

function getAverageGrade() {

  const results =
    getQuizResults();

  if (
    results.length === 0
  ) {
    return 0;
  }

  const total =
    results.reduce(
      (
        sum,
        result
      ) => {

        return (
          sum +
          result.score
        );

      },
      0
    );

  return Math.round(
    total /
    results.length
  );

}


// ======================================================
// UPDATE STATISTICS
// ======================================================

function updateStatistics() {

  const courseCount =
    Object.keys(
      DASHBOARD_COURSES
    ).length;

  const completed =
    getTotalCompletedLessons();

  const progress =
    getOverallProgress();

  const quizResults =
    getQuizResults();

  const averageGrade =
    getAverageGrade();


  if (activeCoursesStat) {

    activeCoursesStat.textContent =
      courseCount;

  }


  if (completedLessonsStat) {

    completedLessonsStat.textContent =
      completed;

  }


  if (averageGradeStat) {

    averageGradeStat.textContent =
      `${averageGrade}%`;

  }


  if (overallProgressStat) {

    overallProgressStat.textContent =
      `${progress}%`;

  }


  if (averageGradeMessage) {

    if (
      quizResults.length === 0
    ) {

      averageGradeMessage.textContent =
        "No quizzes yet";

    }

    else {

      averageGradeMessage.textContent =
        `${quizResults.length} ${
          quizResults.length === 1
            ? "quiz"
            : "quizzes"
        } completed`;

    }

  }


  if (profileCoursesCount) {

    profileCoursesCount.textContent =
      courseCount;

  }


  if (profileCompletedCount) {

    profileCompletedCount.textContent =
      completed;

  }


  if (profileGrade) {

    profileGrade.textContent =
      `${averageGrade}%`;

  }

}


// ======================================================
// PROGRESS CIRCLE
// ======================================================

function updateProgressCircle() {

  if (
    !progressCircle ||
    !progressCircleValue ||
    !progressMessage
  ) {
    return;
  }

  const percentage =
    getOverallProgress();

  const degrees =
    percentage * 3.6;

  const isDark =
    document.documentElement
      .getAttribute(
        "data-theme"
      ) === "dark";

  const emptyColor =
    isDark
      ? "#303541"
      : "#eceef4";


  progressCircleValue.textContent =
    `${percentage}%`;


  progressCircle.style.background =
    `conic-gradient(
      #6874db 0deg ${degrees}deg,
      ${emptyColor} ${degrees}deg 360deg
    )`;


  if (
    percentage === 0
  ) {

    progressMessage.textContent =
      "Start your first lesson.";

  }

  else if (
    percentage < 25
  ) {

    progressMessage.textContent =
      "Nice start. Keep learning!";

  }

  else if (
    percentage < 50
  ) {

    progressMessage.textContent =
      "You're building momentum.";

  }

  else if (
    percentage < 75
  ) {

    progressMessage.textContent =
      "Great progress. Keep going!";

  }

  else if (
    percentage < 100
  ) {

    progressMessage.textContent =
      "Almost there. Keep it up!";

  }

  else {

    progressMessage.textContent =
      "🎉 All lessons completed!";

  }

}


// ======================================================
// RECENT GRADES
// ======================================================

function renderRecentGrades() {

  if (!gradeList) {
    return;
  }

  const results =
    getQuizResults();

  gradeList.innerHTML =
    "";


  if (
    results.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );

    empty.className =
      "empty-state";

    empty.textContent =
      "Complete a lesson quiz to see your grades here.";

    gradeList.appendChild(
      empty
    );

    return;

  }


  results
    .slice(-4)
    .reverse()
    .forEach(
      result => {

        let gradeClass =
          "needs-work";


        if (
          result.score >= 90
        ) {

          gradeClass =
            "excellent";

        }

        else if (
          result.score >= 70
        ) {

          gradeClass =
            "good";

        }


        const item =
          document.createElement(
            "div"
          );

        item.className =
          "grade-item";


        const info =
          document.createElement(
            "div"
          );

        info.className =
          "grade-info";


        const title =
          document.createElement(
            "strong"
          );

        title.textContent =
          result.lessonTitle;


        const course =
          document.createElement(
            "span"
          );

        course.textContent =
          result.courseTitle;


        const score =
          document.createElement(
            "div"
          );

        score.className =
          `grade-score ${gradeClass}`;

        score.textContent =
          `${result.score}%`;


        info.append(
          title,
          course
        );

        item.append(
          info,
          score
        );

        gradeList.appendChild(
          item
        );

      }
    );

}


// ======================================================
// COURSE SEARCH
// ======================================================

function setupCourseSearch() {

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value
          .trim()
          .toLowerCase();

      const cards =
        document.querySelectorAll(
          ".course-card"
        );

      let visibleCount = 0;


      cards.forEach(
        card => {

          const text =
            (
              card.dataset.course ||
              ""
            )
              .toLowerCase();

          const matches =
            text.includes(
              query
            );

          card.style.display =
            matches
              ? ""
              : "none";

          if (matches) {
            visibleCount++;
          }

        }
      );


      if (noResults) {

        noResults.style.display =
          visibleCount === 0
            ? "block"
            : "none";

      }

    }
  );

}


// ======================================================
// COURSE BUTTONS
// ======================================================

function setupCourseButtons() {

  const buttons =
    document.querySelectorAll(
      ".course-button"
    );

  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const card =
            button.closest(
              ".course-card"
            );

          if (!card) {
            return;
          }

          const courseId =
            card.dataset.courseId;

          if (!courseId) {
            return;
          }

          window.location.href =
            `course.html?course=${encodeURIComponent(
              courseId
            )}`;

        }
      );

    }
  );

}


// ======================================================
// CONTINUE LEARNING
// ======================================================

function setupContinueLearning() {

  if (
    !continueLearningButton
  ) {
    return;
  }

  continueLearningButton
    .addEventListener(
      "click",
      () => {

        const coursesSection =
          document.getElementById(
            "courses"
          );

        if (!coursesSection) {
          return;
        }

        coursesSection
          .scrollIntoView({

            behavior:
              "smooth",

            block:
              "start"

          });

      }
    );

}


// ======================================================
// MOBILE SIDEBAR
// ======================================================

function openSidebar() {

  if (sidebar) {

    sidebar.classList.add(
      "open"
    );

  }

  if (mobileOverlay) {

    mobileOverlay.classList.add(
      "show"
    );

  }

}


function closeSidebar() {

  if (sidebar) {

    sidebar.classList.remove(
      "open"
    );

  }

  if (mobileOverlay) {

    mobileOverlay.classList.remove(
      "show"
    );

  }

}


function setupSidebar() {

  if (menuButton) {

    menuButton.addEventListener(
      "click",
      openSidebar
    );

  }


  if (mobileOverlay) {

    mobileOverlay.addEventListener(
      "click",
      closeSidebar
    );

  }


  navLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          const href =
            link.getAttribute(
              "href"
            ) || "";


          if (
            href.startsWith("#") &&
            href !== "#"
          ) {

            navLinks.forEach(
              item => {

                item.classList.remove(
                  "active"
                );

              }
            );

            link.classList.add(
              "active"
            );

          }


          if (
            window.innerWidth <= 900
          ) {

            closeSidebar();

          }

        }
      );

    }
  );

}


// ======================================================
// PROFILE DROPDOWN
// ======================================================

function openProfileMenu() {

  if (profileMenu) {

    profileMenu.classList.add(
      "open"
    );

  }

  if (profileButton) {

    profileButton.setAttribute(
      "aria-expanded",
      "true"
    );

  }

}


function closeProfileMenu() {

  if (profileMenu) {

    profileMenu.classList.remove(
      "open"
    );

  }

  if (profileButton) {

    profileButton.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


function toggleProfileMenu() {

  if (
    profileMenu &&
    profileMenu.classList.contains(
      "open"
    )
  ) {

    closeProfileMenu();

  }

  else {

    openProfileMenu();

  }

}


function setupProfileMenu() {

  if (profileButton) {

    profileButton.addEventListener(
      "click",
      event => {

        event.stopPropagation();

        closeNotificationMenu();

        toggleProfileMenu();

      }
    );

  }


  if (profileDropdown) {

    profileDropdown.addEventListener(
      "click",
      event => {

        event.stopPropagation();

      }
    );

  }

}


// ======================================================
// TOAST
// ======================================================

function showToast(message) {

  if (!dashboardToast) {
    return;
  }

  dashboardToast.textContent =
    message;

  dashboardToast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        dashboardToast
          .classList.remove(
            "show"
          );

      },
      2200
    );

}


// ======================================================
// APPEARANCE
// ======================================================

function getThemeName(theme) {

  if (
    theme === "light"
  ) {
    return "Light";
  }

  if (
    theme === "dark"
  ) {
    return "Dark";
  }

  return "System";

}


function updateAppearanceUI() {

  if (
    !window.EduSpaceTheme
  ) {
    return;
  }

  const preference =
    window.EduSpaceTheme
      .getPreference();

  const resolved =
    window.EduSpaceTheme
      .resolveTheme(
        preference
      );


  themeOptions.forEach(
    option => {

      option.classList.toggle(
        "active",
        option.dataset.themeOption ===
        preference
      );

    }
  );


  if (!appearanceStatus) {
    return;
  }


  if (
    preference === "system"
  ) {

    appearanceStatus.textContent =
      `System • ${getThemeName(
        resolved
      )} mode`;

  }

  else {

    appearanceStatus.textContent =
      `${getThemeName(
        preference
      )} mode`;

  }

}


function openAppearance() {

  if (!appearanceModal) {
    return;
  }

  updateAppearanceUI();

  appearanceModal.classList.add(
    "show"
  );

  appearanceModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeAppearance() {

  if (!appearanceModal) {
    return;
  }

  appearanceModal.classList.remove(
    "show"
  );

  appearanceModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


function setupAppearance() {

  if (appearanceButton) {

    appearanceButton
      .addEventListener(
        "click",
        () => {

          closeProfileMenu();

          openAppearance();

        }
      );

  }


  if (appearanceCloseButton) {

    appearanceCloseButton
      .addEventListener(
        "click",
        closeAppearance
      );

  }


  if (appearanceDoneButton) {

    appearanceDoneButton
      .addEventListener(
        "click",
        closeAppearance
      );

  }


  if (appearanceModal) {

    appearanceModal
      .addEventListener(
        "click",
        event => {

          if (
            event.target ===
            appearanceModal
          ) {

            closeAppearance();

          }

        }
      );

  }


  themeOptions.forEach(
    option => {

      option.addEventListener(
        "click",
        () => {

          if (
            !window.EduSpaceTheme
          ) {
            return;
          }

          const selectedTheme =
            option.dataset.themeOption;

          window.EduSpaceTheme
            .setPreference(
              selectedTheme
            );

          updateAppearanceUI();

          updateProgressCircle();

          showToast(
            `${getThemeName(
              selectedTheme
            )} appearance selected.`
          );

        }
      );

    }
  );


  window.addEventListener(
    "eduspace-theme-change",
    () => {

      updateAppearanceUI();

      updateProgressCircle();

    }
  );

}


// ======================================================
// HELP / LOGOUT
// ======================================================

function setupAccountActions() {

  if (helpButton) {

    helpButton.addEventListener(
      "click",
      () => {

        closeProfileMenu();

        showToast(
          "Help & Support will be added soon."
        );

      }
    );

  }


  if (logoutButton) {

    logoutButton.addEventListener(
      "click",
      () => {

        logoutButton.disabled =
          true;

        logoutButton.innerHTML =
          "<span>⏳</span> Logging out...";


        setTimeout(
          () => {

            localStorage.removeItem(
              "studentLoggedIn"
            );

            localStorage.removeItem(
              "studentName"
            );

            localStorage.removeItem(
              "studentEmail"
            );

            window.location.href =
              "index.html";

          },
          500
        );

      }
    );

  }

}


// ======================================================
// ASSIGNMENT DATE
// ======================================================

function createAssignmentDueDate(
  assignment
) {

  if (
    !assignment ||
    !assignment.dueDate ||
    !assignment.dueTime
  ) {
    return null;
  }

  const [
    year,
    month,
    day
  ] =
    assignment.dueDate
      .split("-")
      .map(Number);

  const [
    hour,
    minute
  ] =
    assignment.dueTime
      .split(":")
      .map(Number);

  const date =
    new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      0,
      0
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return date;

}


// ======================================================
// ASSIGNMENT SUBMISSIONS
// ======================================================

function getAssignmentSubmissions() {

  const submissions =
    readJSON(
      SUBMISSION_STORAGE_KEY,
      {}
    );

  if (
    submissions &&
    typeof submissions === "object" &&
    !Array.isArray(submissions)
  ) {

    return submissions;

  }

  return {};

}


// ======================================================
// DASHBOARD ASSIGNMENT STATUS
// ======================================================

function getDashboardDeadlineLabel(
  assignment
) {

  if (
    assignment.completed
  ) {
    return "Completed";
  }

  const dueDate =
    createAssignmentDueDate(
      assignment
    );

  if (!dueDate) {
    return "Upcoming";
  }

  const difference =
    dueDate.getTime() -
    Date.now();

  if (
    difference < 0
  ) {
    return "Overdue";
  }

  const hours =
    Math.ceil(
      difference /
      3600000
    );

  const days =
    Math.ceil(
      hours / 24
    );

  if (
    hours <= 24
  ) {
    return "Due soon";
  }

  if (
    days <= 3
  ) {
    return `Due in ${days} days`;
  }

  return "Upcoming";

}


// ======================================================
// RENDER DASHBOARD ASSIGNMENTS
// ======================================================

function renderDashboardAssignments() {

  if (
    !dashboardAssignmentList
  ) {
    return;
  }


  const submissions =
    getAssignmentSubmissions();


  const assignments =
    DASHBOARD_ASSIGNMENTS
      .filter(
        assignment =>
          !assignment.completed
      )
      .filter(
        assignment =>
          createAssignmentDueDate(
            assignment
          )
      )
      .sort(
        (
          first,
          second
        ) => {

          return (
            createAssignmentDueDate(
              first
            ).getTime()
            -
            createAssignmentDueDate(
              second
            ).getTime()
          );

        }
      )
      .slice(
        0,
        3
      );


  dashboardAssignmentList.innerHTML =
    "";


  if (
    assignments.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );

    empty.className =
      "empty-state";

    empty.textContent =
      "No upcoming assignments.";

    dashboardAssignmentList
      .appendChild(
        empty
      );

    return;

  }


  assignments.forEach(
    assignment => {

      const dueDate =
        createAssignmentDueDate(
          assignment
        );


      const isSubmitted =
        Boolean(
          submissions[
            assignment.id
          ]
        );


      const deadlineLabel =
        isSubmitted
          ? "Submitted"
          : getDashboardDeadlineLabel(
              assignment
            );


      const item =
        document.createElement(
          "article"
        );

      item.className =
        "assignment-item";

      item.setAttribute(
        "role",
        "button"
      );

      item.setAttribute(
        "tabindex",
        "0"
      );


      const dateBox =
        document.createElement(
          "div"
        );

      dateBox.className =
        "assignment-date";


      const day =
        document.createElement(
          "strong"
        );

      day.textContent =
        dueDate.getDate();


      const month =
        document.createElement(
          "span"
        );

      month.textContent =
        dueDate
          .toLocaleDateString(
            undefined,
            {
              month:
                "short"
            }
          )
          .toUpperCase();


      dateBox.append(
        day,
        month
      );


      const info =
        document.createElement(
          "div"
        );

      info.className =
        "assignment-info";


      const title =
        document.createElement(
          "strong"
        );

      title.textContent =
        assignment.title;


      const course =
        document.createElement(
          "span"
        );

      course.textContent =
        window.EduSpaceData
          .getCourseTitle(
            assignment.courseId
          );


      info.append(
        title,
        course
      );


      const badge =
        document.createElement(
          "span"
        );

      badge.className =
        "assignment-badge";

      badge.textContent =
        deadlineLabel;


      if (
        deadlineLabel === "Due soon" ||
        deadlineLabel === "Overdue"
      ) {

        badge.classList.add(
          "urgent"
        );

      }


      item.append(
        dateBox,
        info,
        badge
      );


      function openAssignment() {

        window.location.href =
          `assignments.html?assignment=${encodeURIComponent(
            assignment.id
          )}`;

      }


      item.addEventListener(
        "click",
        openAssignment
      );


      item.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            openAssignment();

          }

        }
      );


      dashboardAssignmentList
        .appendChild(
          item
        );

    }
  );

}


// ======================================================
// MESSAGE STATE
// ======================================================

function getDashboardMessageState() {

  const state =
    readJSON(
      MESSAGE_STORAGE_KEY,
      null
    );


  if (
    !state ||
    !Array.isArray(
      state.conversations
    )
  ) {

    return {
      conversations: []
    };

  }


  return state;

}


// ======================================================
// UNREAD MESSAGE COUNT
// ======================================================

function getUnreadMessageCount() {

  const state =
    getDashboardMessageState();


  return state.conversations
    .reduce(
      (
        total,
        conversation
      ) => {

        const unread =
          Number(
            conversation.unread || 0
          );


        if (
          Number.isNaN(unread)
        ) {

          return total;

        }


        return (
          total +
          Math.max(
            0,
            unread
          )
        );

      },
      0
    );

}


// ======================================================
// UPDATE MESSAGE BADGE
// ======================================================

function updateMessageBadge() {

  if (
    !dashboardMessageCount
  ) {
    return;
  }


  const unread =
    getUnreadMessageCount();


  dashboardMessageCount.textContent =
    unread > 9
      ? "9+"
      : unread;


  dashboardMessageCount
    .classList.toggle(
      "show",
      unread > 0
    );

}


// ======================================================
// LAST CONVERSATION MESSAGE
// ======================================================

function getLastConversationMessage(
  conversation
) {

  if (
    !conversation ||
    !Array.isArray(
      conversation.messages
    ) ||
    conversation.messages.length === 0
  ) {

    return null;

  }


  return conversation.messages[
    conversation.messages.length - 1
  ];

}


// ======================================================
// NOTIFICATION STORAGE
// ======================================================

function getNotifications() {

  const notifications =
    readJSON(
      NOTIFICATION_STORAGE_KEY,
      []
    );

  return Array.isArray(
    notifications
  )
    ? notifications
    : [];

}


function saveNotifications(
  notifications
) {

  localStorage.setItem(
    NOTIFICATION_STORAGE_KEY,
    JSON.stringify(
      notifications
    )
  );

}


// ======================================================
// DEFAULT NOTIFICATIONS
// ======================================================

function createDefaultNotifications() {

  if (
    localStorage.getItem(
      NOTIFICATION_STORAGE_KEY
    ) !== null
  ) {
    return;
  }


  const notifications = [

    {

      id:
        "lesson-javascript",

      type:
        "lesson",

      title:
        "New lesson available",

      message:
        "JavaScript Basics",

      meta:
        "Web Development",

      createdAt:
        new Date(
          Date.now() -
          60 * 60 * 1000
        ).toISOString(),

      read:
        false,

      action:
        "course:web-development"

    }

  ];


  saveNotifications(
    notifications
  );

}


// ======================================================
// MIGRATE OLD NOTIFICATIONS
// ======================================================

function migrateLegacyNotifications() {

  const notifications =
    getNotifications();


  const updated =
    notifications.filter(
      notification =>
        notification.id !==
        "assignment-responsive"
    );


  if (
    updated.length !==
    notifications.length
  ) {

    saveNotifications(
      updated
    );

  }

}


// ======================================================
// ASSIGNMENT NOTIFICATIONS
// ======================================================

function syncAssignmentNotifications() {

  const notifications =
    getNotifications();

  const submissions =
    getAssignmentSubmissions();

  const now =
    Date.now();

  const sevenDays =
    7 *
    24 *
    60 *
    60 *
    1000;


  const baseNotifications =
    notifications.filter(
      notification =>
        notification.source !==
        "assignment-deadline"
    );


  const generatedNotifications =
    [];


  DASHBOARD_ASSIGNMENTS.forEach(
    assignment => {

      if (
        assignment.completed ||
        submissions[
          assignment.id
        ]
      ) {
        return;
      }


      const dueDate =
        createAssignmentDueDate(
          assignment
        );


      if (!dueDate) {
        return;
      }


      const difference =
        dueDate.getTime() -
        now;


      if (
        difference > sevenDays
      ) {
        return;
      }


      const notificationId =
        `assignment-deadline-${assignment.id}-${assignment.dueDate}`;


      const existing =
        notifications.find(
          notification =>
            notification.id ===
            notificationId
        );


      const isOverdue =
        difference < 0;


      let dueLabel =
        "Overdue";


      if (!isOverdue) {

        dueLabel =
          dueDate
            .toLocaleDateString(
              undefined,
              {
                month:
                  "short",

                day:
                  "numeric"
              }
            );

      }


      generatedNotifications.push({

        id:
          notificationId,

        type:
          "assignment",

        title:
          isOverdue
            ? "Assignment overdue"
            : "Assignment due soon",

        message:
          assignment.title,

        meta:
          `${window.EduSpaceData.getCourseTitle(
            assignment.courseId
          )} • ${dueLabel}`,

        createdAt:
          existing
            ? existing.createdAt
            : new Date()
                .toISOString(),

        read:
          existing
            ? existing.read
            : false,

        action:
          `assignment:${assignment.id}`,

        source:
          "assignment-deadline",

        sourceId:
          assignment.id

      });

    }
  );


  saveNotifications(
    [
      ...baseNotifications,
      ...generatedNotifications
    ]
  );

}


// ======================================================
// MESSAGE NOTIFICATIONS
// ======================================================

function syncMessageNotifications() {

  const state =
    getDashboardMessageState();

  const notifications =
    getNotifications();


  const baseNotifications =
    notifications.filter(
      notification =>
        notification.source !==
        "message-unread"
    );


  const generatedNotifications =
    [];


  state.conversations.forEach(
    conversation => {

      const unread =
        Number(
          conversation.unread || 0
        );


      if (
        Number.isNaN(unread) ||
        unread <= 0
      ) {
        return;
      }


      const lastMessage =
        getLastConversationMessage(
          conversation
        );


      if (!lastMessage) {
        return;
      }


      if (
        lastMessage.sender ===
        "student"
      ) {
        return;
      }


      const notificationId =
        `message-unread-${conversation.id}`;


      const existing =
        notifications.find(
          notification =>
            notification.id ===
            notificationId
        );


      let courseName =
        conversation.role ||
        "EduSpace";


      if (
        conversation.courseId
      ) {

        courseName =
          window.EduSpaceData
            .getCourseTitle(
              conversation.courseId
            );

      }


      generatedNotifications.push({

        id:
          notificationId,

        type:
          "message",

        title:
          unread === 1
            ? "New message"
            : `${unread} new messages`,

        message:
          conversation.participant ||
          "EduSpace",

        meta:
          courseName,

        createdAt:
          lastMessage.createdAt ||
          new Date()
            .toISOString(),

        read:
          existing
            ? existing.read
            : false,

        action:
          `message:${conversation.id}`,

        source:
          "message-unread",

        sourceId:
          conversation.id

      });

    }
  );


  saveNotifications(
    [
      ...baseNotifications,
      ...generatedNotifications
    ]
  );

}


// ======================================================
// QUIZ NOTIFICATIONS
// ======================================================

function syncQuizNotifications() {

  const quizResults =
    getQuizResults();

  const notifications =
    getNotifications();

  let changed =
    false;


  quizResults.forEach(
    result => {

      const notificationId =
        `quiz-${result.courseId}-${result.lessonId}-${result.score}`;


      const alreadyExists =
        notifications.some(
          notification =>
            notification.id ===
            notificationId
        );


      if (alreadyExists) {
        return;
      }


      notifications.push({

        id:
          notificationId,

        type:
          "quiz",

        title:
          "Quiz completed",

        message:
          `${result.lessonTitle} • ${result.score}%`,

        meta:
          result.courseTitle,

        createdAt:
          new Date()
            .toISOString(),

        read:
          false,

        action:
          `course:${result.courseId}`

      });


      changed =
        true;

    }
  );


  if (changed) {

    saveNotifications(
      notifications
    );

  }

}


// ======================================================
// NOTIFICATION TIME
// ======================================================

function formatNotificationTime(
  dateString
) {

  const date =
    new Date(
      dateString
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }


  const difference =
    Math.max(
      0,
      Date.now() -
      date.getTime()
    );


  const minutes =
    Math.floor(
      difference /
      60000
    );


  if (
    minutes < 1
  ) {
    return "Just now";
  }


  if (
    minutes < 60
  ) {
    return `${minutes}m ago`;
  }


  const hours =
    Math.floor(
      minutes / 60
    );


  if (
    hours < 24
  ) {
    return `${hours}h ago`;
  }


  const days =
    Math.floor(
      hours / 24
    );


  if (
    days < 7
  ) {
    return `${days}d ago`;
  }


  return date.toLocaleDateString(
    undefined,
    {
      month:
        "short",

      day:
        "numeric"
    }
  );

}


// ======================================================
// NOTIFICATION ICON
// ======================================================

function getNotificationIcon(type) {

  switch (type) {

    case "assignment":
      return "📝";

    case "lesson":
      return "📚";

    case "quiz":
      return "✅";

    case "message":
      return "💬";

    default:
      return "🔔";

  }

}


// ======================================================
// RENDER NOTIFICATIONS
// ======================================================

function renderNotifications() {

  if (
    !notificationList ||
    !notificationBadge ||
    !markAllReadButton ||
    !notificationFooter
  ) {
    return;
  }


  const notifications =
    [
      ...getNotifications()
    ]
      .sort(
        (
          first,
          second
        ) => {

          return (
            new Date(
              second.createdAt
            )
            -
            new Date(
              first.createdAt
            )
          );

        }
      );


  const unreadCount =
    notifications.filter(
      notification =>
        !notification.read
    ).length;


  notificationBadge.textContent =
    unreadCount > 9
      ? "9+"
      : unreadCount;


  notificationBadge
    .classList.toggle(
      "hidden",
      unreadCount === 0
    );


  markAllReadButton.disabled =
    unreadCount === 0;


  notificationList.innerHTML =
    "";


  if (
    notifications.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );

    empty.className =
      "notification-empty";


    const icon =
      document.createElement(
        "div"
      );

    icon.className =
      "notification-empty-icon";

    icon.textContent =
      "🔔";


    const title =
      document.createElement(
        "strong"
      );

    title.textContent =
      "You're all caught up";


    const message =
      document.createElement(
        "span"
      );

    message.textContent =
      "New course, assignment, quiz and message updates will appear here.";


    empty.append(
      icon,
      title,
      message
    );


    notificationList.appendChild(
      empty
    );


    notificationFooter.style.display =
      "none";


    return;

  }


  const visibleNotifications =
    showAllNotifications
      ? notifications
      : notifications.slice(
          0,
          5
        );


  visibleNotifications.forEach(
    notification => {

      const item =
        document.createElement(
          "button"
        );

      item.type =
        "button";


      item.className =
        `notification-item${
          notification.read
            ? ""
            : " unread"
        }`;


      item.dataset.notificationId =
        notification.id;


      const icon =
        document.createElement(
          "div"
        );

      icon.className =
        `notification-item-icon ${
          notification.type ||
          "general"
        }`;

      icon.textContent =
        getNotificationIcon(
          notification.type
        );


      const content =
        document.createElement(
          "div"
        );

      content.className =
        "notification-item-content";


      const title =
        document.createElement(
          "span"
        );

      title.className =
        "notification-item-title";

      title.textContent =
        notification.title ||
        "Notification";


      const message =
        document.createElement(
          "span"
        );

      message.className =
        "notification-item-message";

      message.textContent =
        notification.message ||
        "";


      const bottom =
        document.createElement(
          "div"
        );

      bottom.className =
        "notification-item-bottom";


      const meta =
        document.createElement(
          "span"
        );

      meta.className =
        "notification-meta";

      meta.textContent =
        notification.meta ||
        "";


      const separator =
        document.createElement(
          "span"
        );

      separator.className =
        "notification-separator";


      const time =
        document.createElement(
          "span"
        );

      time.textContent =
        formatNotificationTime(
          notification.createdAt
        );


      bottom.append(
        meta,
        separator,
        time
      );


      content.append(
        title,
        message,
        bottom
      );


      item.append(
        icon,
        content
      );


      item.addEventListener(
        "click",
        () => {

          handleNotificationClick(
            notification.id
          );

        }
      );


      notificationList.appendChild(
        item
      );

    }
  );


  if (
    notifications.length > 5
  ) {

    notificationFooter.style.display =
      "block";


    if (
      viewAllNotificationsButton
    ) {

      viewAllNotificationsButton
        .textContent =
          showAllNotifications
            ? "Show recent"
            : `View all notifications (${notifications.length})`;

    }

  }

  else {

    notificationFooter.style.display =
      "none";

  }

}


// ======================================================
// MARK NOTIFICATION READ
// ======================================================

function markNotificationRead(
  notificationId
) {

  const updated =
    getNotifications()
      .map(
        notification => {

          if (
            notification.id ===
            notificationId
          ) {

            return {

              ...notification,

              read:
                true

            };

          }

          return notification;

        }
      );


  saveNotifications(
    updated
  );


  renderNotifications();

}


// ======================================================
// MARK ALL NOTIFICATIONS READ
// ======================================================

function markAllNotificationsRead() {

  const updated =
    getNotifications()
      .map(
        notification => ({

          ...notification,

          read:
            true

        })
      );


  saveNotifications(
    updated
  );


  renderNotifications();


  showToast(
    "All notifications marked as read."
  );

}


// ======================================================
// NOTIFICATION CLICK
// ======================================================

function handleNotificationClick(
  notificationId
) {

  const notification =
    getNotifications()
      .find(
        item =>
          item.id ===
          notificationId
      );


  if (!notification) {
    return;
  }


  markNotificationRead(
    notificationId
  );


  closeNotificationMenu();


  const action =
    notification.action;


  // GENERAL ASSIGNMENTS PAGE

  if (
    action === "assignments"
  ) {

    window.location.href =
      "assignments.html";

    return;

  }


  // SPECIFIC ASSIGNMENT

  if (
    typeof action === "string" &&
    action.startsWith(
      "assignment:"
    )
  ) {

    const assignmentId =
      action.substring(
        "assignment:".length
      );


    if (assignmentId) {

      window.location.href =
        `assignments.html?assignment=${encodeURIComponent(
          assignmentId
        )}`;

    }


    return;

  }


  // SPECIFIC MESSAGE

  if (
    typeof action === "string" &&
    action.startsWith(
      "message:"
    )
  ) {

    const conversationId =
      action.substring(
        "message:".length
      );


    if (conversationId) {

      window.location.href =
        `messages.html?conversation=${encodeURIComponent(
          conversationId
        )}`;

    }


    return;

  }


  // COURSE

  if (
    typeof action === "string" &&
    action.startsWith(
      "course:"
    )
  ) {

    const courseId =
      action.substring(
        "course:".length
      );


    if (courseId) {

      window.location.href =
        `course.html?course=${encodeURIComponent(
          courseId
        )}`;

    }

  }

}


// ======================================================
// NOTIFICATION MENU
// ======================================================

function openNotificationMenu() {

  closeProfileMenu();


  if (notificationMenu) {

    notificationMenu.classList.add(
      "open"
    );

  }


  if (notificationButton) {

    notificationButton.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  renderNotifications();

}


function closeNotificationMenu() {

  if (notificationMenu) {

    notificationMenu.classList.remove(
      "open"
    );

  }


  if (notificationButton) {

    notificationButton.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


function toggleNotificationMenu() {

  if (
    notificationMenu &&
    notificationMenu.classList.contains(
      "open"
    )
  ) {

    closeNotificationMenu();

  }

  else {

    openNotificationMenu();

  }

}


// ======================================================
// SETUP NOTIFICATION CENTER
// ======================================================

function setupNotificationCenter() {

  createDefaultNotifications();

  migrateLegacyNotifications();

  syncAssignmentNotifications();

  syncMessageNotifications();

  syncQuizNotifications();

  renderNotifications();


  if (notificationButton) {

    notificationButton
      .addEventListener(
        "click",
        event => {

          event.stopPropagation();

          toggleNotificationMenu();

        }
      );

  }


  if (notificationDropdown) {

    notificationDropdown
      .addEventListener(
        "click",
        event => {

          event.stopPropagation();

        }
      );

  }


  if (markAllReadButton) {

    markAllReadButton
      .addEventListener(
        "click",
        markAllNotificationsRead
      );

  }


  if (
    viewAllNotificationsButton
  ) {

    viewAllNotificationsButton
      .addEventListener(
        "click",
        () => {

          showAllNotifications =
            !showAllNotifications;

          renderNotifications();

        }
      );

  }

}


// ======================================================
// UPDATE DASHBOARD
// ======================================================

function updateDashboard() {

  loadStudentInformation();

  updateCourseCards();

  updateStatistics();

  updateProgressCircle();

  renderRecentGrades();

  renderDashboardAssignments();


  // ASSIGNMENTS

  syncAssignmentNotifications();


  // MESSAGES

  updateMessageBadge();

  syncMessageNotifications();


  // QUIZZES

  syncQuizNotifications();


  // NOTIFICATIONS

  renderNotifications();


  // THEME

  updateAppearanceUI();

}


// ======================================================
// GLOBAL EVENTS
// ======================================================

function setupGlobalEvents() {

  document.addEventListener(
    "click",
    () => {

      closeProfileMenu();

      closeNotificationMenu();

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Escape"
      ) {
        return;
      }

      closeProfileMenu();

      closeNotificationMenu();

      closeSidebar();

      closeAppearance();

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900
      ) {

        closeSidebar();

      }

    }
  );


  window.addEventListener(
    "pageshow",
    updateDashboard
  );


  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.visibilityState ===
        "visible"
      ) {

        updateDashboard();

      }

    }
  );

}


// ======================================================
// INITIALIZE DASHBOARD
// ======================================================

function initializeDashboard() {

  setupCourseSearch();

  setupCourseButtons();

  setupContinueLearning();

  setupSidebar();

  setupProfileMenu();

  setupAppearance();

  setupAccountActions();

  setupNotificationCenter();

  setupGlobalEvents();

  updateDashboard();

}


// ======================================================
// START DASHBOARD
// ======================================================

initializeDashboard();