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
// STORAGE KEYS
// ======================================================

const SUBMISSION_STORAGE_KEY =
  "eduspace-assignment-submissions";


const NOTIFICATION_STORAGE_KEY =
  "eduspace-notifications";


// ======================================================
// ASSIGNMENT DATABASE
// ======================================================

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


const ASSIGNMENTS =
  window.EduSpaceData.assignments;


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


const topAvatar =
  document.getElementById(
    "topAvatar"
  );


const topStudentName =
  document.getElementById(
    "topStudentName"
  );


// STATS

const totalAssignments =
  document.getElementById(
    "totalAssignments"
  );


const upcomingAssignments =
  document.getElementById(
    "upcomingAssignments"
  );


const submittedAssignments =
  document.getElementById(
    "submittedAssignments"
  );


const completedAssignments =
  document.getElementById(
    "completedAssignments"
  );


// FILTERS

const assignmentSearch =
  document.getElementById(
    "assignmentSearch"
  );


const courseFilter =
  document.getElementById(
    "courseFilter"
  );


const assignmentTabs =
  document.querySelectorAll(
    ".assignment-tab"
  );


const allTabCount =
  document.getElementById(
    "allTabCount"
  );


const upcomingTabCount =
  document.getElementById(
    "upcomingTabCount"
  );


const submittedTabCount =
  document.getElementById(
    "submittedTabCount"
  );


const overdueTabCount =
  document.getElementById(
    "overdueTabCount"
  );


const completedTabCount =
  document.getElementById(
    "completedTabCount"
  );


const assignmentList =
  document.getElementById(
    "assignmentList"
  );


const assignmentEmpty =
  document.getElementById(
    "assignmentEmpty"
  );


const resultCount =
  document.getElementById(
    "resultCount"
  );


// MODAL

const assignmentModal =
  document.getElementById(
    "assignmentModal"
  );


const closeAssignmentModal =
  document.getElementById(
    "closeAssignmentModal"
  );


const modalCourseLabel =
  document.getElementById(
    "modalCourseLabel"
  );


const modalAssignmentTitle =
  document.getElementById(
    "modalAssignmentTitle"
  );


const modalStatusBadge =
  document.getElementById(
    "modalStatusBadge"
  );


const modalDueDate =
  document.getElementById(
    "modalDueDate"
  );


const modalDescription =
  document.getElementById(
    "modalDescription"
  );


const modalRequirements =
  document.getElementById(
    "modalRequirements"
  );


const modalMaterials =
  document.getElementById(
    "modalMaterials"
  );


const sideDueDate =
  document.getElementById(
    "sideDueDate"
  );


const sideDueTime =
  document.getElementById(
    "sideDueTime"
  );


const deadlineMessage =
  document.getElementById(
    "deadlineMessage"
  );


const modalPoints =
  document.getElementById(
    "modalPoints"
  );


const modalCourseName =
  document.getElementById(
    "modalCourseName"
  );


const modalAssignmentType =
  document.getElementById(
    "modalAssignmentType"
  );


// GRADE

const gradeCard =
  document.getElementById(
    "gradeCard"
  );


const modalGrade =
  document.getElementById(
    "modalGrade"
  );


const modalFeedback =
  document.getElementById(
    "modalFeedback"
  );


// SUBMISSION

const submissionFormArea =
  document.getElementById(
    "submissionFormArea"
  );


const submissionFile =
  document.getElementById(
    "submissionFile"
  );


const selectedFile =
  document.getElementById(
    "selectedFile"
  );


const selectedFileName =
  document.getElementById(
    "selectedFileName"
  );


const selectedFileSize =
  document.getElementById(
    "selectedFileSize"
  );


const removeSelectedFile =
  document.getElementById(
    "removeSelectedFile"
  );


const submissionNote =
  document.getElementById(
    "submissionNote"
  );


const submitAssignmentButton =
  document.getElementById(
    "submitAssignmentButton"
  );


const submittedPanel =
  document.getElementById(
    "submittedPanel"
  );


const submittedTime =
  document.getElementById(
    "submittedTime"
  );


const submittedFileName =
  document.getElementById(
    "submittedFileName"
  );


const submittedNoteContainer =
  document.getElementById(
    "submittedNoteContainer"
  );


const submittedNote =
  document.getElementById(
    "submittedNote"
  );


// CONFIRM

const confirmSubmissionModal =
  document.getElementById(
    "confirmSubmissionModal"
  );


const cancelSubmissionButton =
  document.getElementById(
    "cancelSubmissionButton"
  );


const confirmSubmissionButton =
  document.getElementById(
    "confirmSubmissionButton"
  );


// TOAST

const assignmentToast =
  document.getElementById(
    "assignmentToast"
  );


// ======================================================
// STATE
// ======================================================

let currentFilter =
  "all";


let activeAssignmentId =
  null;


let selectedUploadFile =
  null;


// ======================================================
// PROFILE
// ======================================================

function createInitials(
  name
) {

  if (
    !name
    ||
    typeof name !== "string"
  ) {

    return "ST";

  }


  return name
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
    || "ST";

}


function loadStudent() {

  const name =
    localStorage.getItem(
      "studentName"
    )
    || "Student";


  topStudentName.textContent =
    name;


  topAvatar.textContent =
    createInitials(
      name
    );

}


// ======================================================
// SAFE STORAGE
// ======================================================

function readJSONStorage(
  key,
  fallback = []
) {

  const raw =
    localStorage.getItem(
      key
    );


  if (
    raw === null
  ) {

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
// SUBMISSIONS
// ======================================================

function getSubmissions() {

  const submissions =
    readJSONStorage(
      SUBMISSION_STORAGE_KEY,
      {}
    );


  return (
    submissions
    &&
    typeof submissions === "object"
    &&
    !Array.isArray(submissions)
  )
    ? submissions
    : {};

}


function saveSubmissions(
  submissions
) {

  localStorage.setItem(

    SUBMISSION_STORAGE_KEY,

    JSON.stringify(
      submissions
    )

  );

}


function getSubmission(
  assignmentId
) {

  const submissions =
    getSubmissions();


  return submissions[
    assignmentId
  ] || null;

}


// ======================================================
// DATE HELPERS
// ======================================================

function createDueDate(
  assignment
) {

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


  return new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    0,
    0
  );

}


function parseDateOnly(
  dateString
) {

  const [
    year,
    month,
    day
  ] =
    dateString
      .split("-")
      .map(Number);


  return new Date(
    year,
    month - 1,
    day
  );

}


function formatDueDate(
  assignment
) {

  const date =
    parseDateOnly(
      assignment.dueDate
    );


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


function formatLongDate(
  assignment
) {

  const date =
    parseDateOnly(
      assignment.dueDate
    );


  return date.toLocaleDateString(
    undefined,
    {
      weekday:
        "long",

      month:
        "long",

      day:
        "numeric",

      year:
        "numeric"
    }
  );

}


function formatTime(
  time
) {

  const [
    hour,
    minute
  ] =
    time
      .split(":")
      .map(Number);


  const value =
    new Date();


  value.setHours(
    hour,
    minute,
    0,
    0
  );


  return value.toLocaleTimeString(
    [],
    {
      hour:
        "numeric",

      minute:
        "2-digit"
    }
  );

}


// ======================================================
// ASSIGNMENT STATUS
// ======================================================

function getAssignmentStatus(
  assignment
) {

  if (
    assignment.completed
  ) {

    return "completed";

  }


  const submission =
    getSubmission(
      assignment.id
    );


  if (
    submission
  ) {

    return "submitted";

  }


  const dueDate =
    createDueDate(
      assignment
    );


  if (
    Date.now()
    >
    dueDate.getTime()
  ) {

    return "overdue";

  }


  return "upcoming";

}


function getStatusLabel(
  status
) {

  switch (
    status
  ) {

    case "submitted":
      return "Submitted";


    case "overdue":
      return "Overdue";


    case "completed":
      return "Completed";


    default:
      return "Upcoming";

  }

}


// ======================================================
// DEADLINE MESSAGE
// ======================================================

function getDeadlineText(
  assignment
) {

  const status =
    getAssignmentStatus(
      assignment
    );


  if (
    status === "submitted"
  ) {

    return "Submitted";

  }


  if (
    status === "completed"
  ) {

    return "Completed";

  }


  const due =
    createDueDate(
      assignment
    );


  const difference =
    due.getTime()
    -
    Date.now();


  const hours =
    Math.ceil(
      Math.abs(
        difference
      )
      /
      3600000
    );


  const days =
    Math.ceil(
      hours / 24
    );


  if (
    difference < 0
  ) {

    if (
      days <= 1
    ) {

      return "Overdue by 1 day";

    }


    return `Overdue by ${days} days`;

  }


  if (
    hours <= 24
  ) {

    return `Due in ${hours} hours`;

  }


  if (
    days === 1
  ) {

    return "Due tomorrow";

  }


  return `Due in ${days} days`;

}


// ======================================================
// FILTER COUNTS
// ======================================================

function countStatus(
  status
) {

  return ASSIGNMENTS.filter(
    assignment =>
      getAssignmentStatus(
        assignment
      )
      === status
  ).length;

}


// ======================================================
// STATISTICS
// ======================================================

function updateStatistics() {

  const upcoming =
    countStatus(
      "upcoming"
    );


  const submitted =
    countStatus(
      "submitted"
    );


  const overdue =
    countStatus(
      "overdue"
    );


  const completed =
    countStatus(
      "completed"
    );


  totalAssignments.textContent =
    ASSIGNMENTS.length;


  upcomingAssignments.textContent =
    upcoming;


  submittedAssignments.textContent =
    submitted;


  completedAssignments.textContent =
    completed;


  allTabCount.textContent =
    ASSIGNMENTS.length;


  upcomingTabCount.textContent =
    upcoming;


  submittedTabCount.textContent =
    submitted;


  overdueTabCount.textContent =
    overdue;


  completedTabCount.textContent =
    completed;

}


// ======================================================
// FILTERED ASSIGNMENTS
// ======================================================

function getFilteredAssignments() {

  const search =
    assignmentSearch.value
      .trim()
      .toLowerCase();


  const selectedCourse =
    courseFilter.value;


  return ASSIGNMENTS
    .filter(
      assignment => {


        const status =
          getAssignmentStatus(
            assignment
          );


        const matchesStatus =
          currentFilter === "all"
          ||
          status === currentFilter;


        const matchesCourse =
          selectedCourse === "all"
          ||
          assignment.courseId
          === selectedCourse;


        const searchableText =
  `
    ${assignment.title}
    ${courseName(assignment.courseId)}
    ${assignment.description}
    ${assignment.type}
  `
    .toLowerCase();


        const matchesSearch =
          searchableText.includes(
            search
          );


        return (
          matchesStatus
          &&
          matchesCourse
          &&
          matchesSearch
        );

      }
    )
    .sort(
      (
        first,
        second
      ) => {

        return (
          createDueDate(
            first
          )
          -
          createDueDate(
            second
          )
        );

      }
    );

}


// ======================================================
// ASSIGNMENT ICON
// ======================================================

function courseIcon(
  courseId
) {

  return window.EduSpaceData
    .getCourseIcon(
      courseId
    );

}


function courseName(
  courseId
) {

  return window.EduSpaceData
    .getCourseTitle(
      courseId
    );

}


// ======================================================
// RENDER ASSIGNMENTS
// ======================================================

function renderAssignments() {

  const assignments =
    getFilteredAssignments();


  assignmentList.innerHTML =
    "";


  assignmentEmpty.style.display =
    assignments.length === 0
      ? "block"
      : "none";


  resultCount.textContent =
    `${assignments.length} ${
      assignments.length === 1
        ? "assignment"
        : "assignments"
    }`;


  assignments.forEach(
    assignment => {


      const status =
        getAssignmentStatus(
          assignment
        );


      const item =
        document.createElement(
          "article"
        );


      item.className =
        "assignment-item";


      item.innerHTML =
        `

          <div
            class="
              assignment-course-icon
              ${assignment.courseId}
            "
          >
            ${courseIcon(assignment.courseId)}
          </div>


          <div class="assignment-main">


            <div class="assignment-top-line">

              <span class="assignment-course-name">
                ${courseName(
                assignment.courseId
                )}
              </span>


              <span
                class="
                  status-badge
                  ${status}
                "
              >
                ${getStatusLabel(status)}
              </span>

            </div>


            <h3>
              ${assignment.title}
            </h3>


            <p>
              ${assignment.shortDescription}
            </p>


            <div class="assignment-meta">


              <span>
                📅 ${formatDueDate(assignment)}
              </span>


              <span>
                ⏰ ${formatTime(assignment.dueTime)}
              </span>


              <span
                class="${
                  status === "upcoming"
                  ||
                  status === "overdue"
                    ? "due-warning"
                    : ""
                }"
              >
                ${getDeadlineText(assignment)}
              </span>


            </div>


          </div>


          <div class="assignment-actions">


            <span class="assignment-points">

              <strong>
                ${assignment.points}
              </strong>

              points

            </span>


            <button
              class="view-assignment-button"
              type="button"
              data-assignment-id="${assignment.id}"
            >

              ${
                status === "completed"
                  ? "View Result →"
                  : status === "submitted"
                    ? "View Submission →"
                    : "View Assignment →"
              }

            </button>


          </div>

        `;


      assignmentList.appendChild(
        item
      );

    }
  );


  document
    .querySelectorAll(
      "[data-assignment-id]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openAssignment(
              button.dataset.assignmentId
            );

          }
        );

      }
    );

}


// ======================================================
// MATERIALS
// ======================================================

function renderMaterials(
  assignment
) {

  modalMaterials.innerHTML =
    "";


  if (
    !assignment.materials
    ||
    assignment.materials.length === 0
  ) {

    modalMaterials.innerHTML =
      `
        <p class="assignment-description">
          No materials attached.
        </p>
      `;


    return;

  }


  assignment.materials.forEach(
    material => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "material-item";


      item.innerHTML =
        `

          <div class="material-icon">
            📄
          </div>


          <div class="material-info">

            <strong>
              ${material.title}
            </strong>

            <span>
              ${material.type}
            </span>

          </div>


          <a
            class="material-download"
            href="${material.file}"
            target="_blank"
          >
            Open
          </a>

        `;


      modalMaterials.appendChild(
        item
      );

    }
  );

}


// ======================================================
// REQUIREMENTS
// ======================================================

function renderRequirements(
  assignment
) {

  modalRequirements.innerHTML =
    "";


  assignment.requirements
    .forEach(
      requirement => {

        const item =
          document.createElement(
            "li"
          );


        item.textContent =
          requirement;


        modalRequirements
          .appendChild(
            item
          );

      }
    );

}


// ======================================================
// SUBMISSION DISPLAY
// ======================================================

function renderSubmission(
  assignment
) {

  const submission =
    getSubmission(
      assignment.id
    );


  if (
    assignment.completed
  ) {

    submissionFormArea.style.display =
      "none";


    submittedPanel.classList.add(
      "show"
    );


    submittedTime.textContent =
      "Submission completed and graded";


    submittedFileName.textContent =
      "Previously submitted assignment";


    submittedNoteContainer.style.display =
      "none";


    return;

  }


  if (
    submission
  ) {

    submissionFormArea.style.display =
      "none";


    submittedPanel.classList.add(
      "show"
    );


    submittedFileName.textContent =
      submission.fileName;


    const submittedDate =
      new Date(
        submission.submittedAt
      );


    submittedTime.textContent =
      `Submitted ${
        submittedDate.toLocaleDateString(
          undefined,
          {
            month:
              "short",

            day:
              "numeric",

            year:
              "numeric",

            hour:
              "numeric",

            minute:
              "2-digit"
          }
        )
      }`;


    if (
      submission.note
    ) {

      submittedNoteContainer.style.display =
        "flex";


      submittedNote.textContent =
        submission.note;

    }

    else {

      submittedNoteContainer.style.display =
        "none";

    }


    return;

  }


  submissionFormArea.style.display =
    "block";


  submittedPanel.classList.remove(
    "show"
  );


  selectedUploadFile =
    null;


  submissionFile.value =
    "";


  submissionNote.value =
    "";


  selectedFile.classList.remove(
    "show"
  );

}


// ======================================================
// GRADE DISPLAY
// ======================================================

function renderGrade(
  assignment
) {

  if (
    typeof assignment.grade
    === "number"
  ) {

    gradeCard.classList.add(
      "show"
    );


    modalGrade.textContent =
      `${assignment.grade}%`;


    modalFeedback.textContent =
      assignment.feedback
      || "No feedback provided.";


    return;

  }


  gradeCard.classList.remove(
    "show"
  );

}


// ======================================================
// OPEN ASSIGNMENT
// ======================================================

function openAssignment(
  assignmentId
) {

  const assignment =
    ASSIGNMENTS.find(
      item =>
        item.id
        === assignmentId
    );


  if (
    !assignment
  ) {

    return;

  }


  activeAssignmentId =
    assignment.id;


  const status =
    getAssignmentStatus(
      assignment
    );


  modalCourseLabel.textContent =
    assignment.course
      .toUpperCase();


  modalAssignmentTitle.textContent =
    assignment.title;


  modalStatusBadge.textContent =
    getStatusLabel(
      status
    );


  modalStatusBadge.className =
    `status-badge ${status}`;


  modalDueDate.textContent =
    `Due ${formatLongDate(assignment)} • ${formatTime(assignment.dueTime)}`;


  modalDescription.textContent =
    assignment.description;


  sideDueDate.textContent =
    formatLongDate(
      assignment
    );


  sideDueTime.textContent =
    formatTime(
      assignment.dueTime
    );


  deadlineMessage.textContent =
    getDeadlineText(
      assignment
    );


  deadlineMessage.className =
    `deadline-message ${status}`;


  modalPoints.textContent =
    assignment.points;


  modalCourseName.textContent =
  courseName(
    assignment.courseId
  );


  modalAssignmentType.textContent =
    assignment.type;


  renderRequirements(
    assignment
  );


  renderMaterials(
    assignment
  );


  renderSubmission(
    assignment
  );


  renderGrade(
    assignment
  );


  assignmentModal.classList.add(
    "show"
  );


  assignmentModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


// ======================================================
// CLOSE ASSIGNMENT
// ======================================================

function closeAssignment() {

  assignmentModal.classList.remove(
    "show"
  );


  assignmentModal.setAttribute(
    "aria-hidden",
    "true"
  );


  activeAssignmentId =
    null;


  selectedUploadFile =
    null;


  document.body.style.overflow =
    "";

}


closeAssignmentModal
  .addEventListener(
    "click",
    closeAssignment
  );


assignmentModal
  .addEventListener(
    "click",
    event => {

      if (
        event.target ===
        assignmentModal
      ) {

        closeAssignment();

      }

    }
  );


// ======================================================
// FILE SELECTION
// ======================================================

function formatFileSize(
  bytes
) {

  if (
    bytes < 1024
  ) {

    return `${bytes} B`;

  }


  if (
    bytes < 1024 * 1024
  ) {

    return `${
      (
        bytes / 1024
      ).toFixed(1)
    } KB`;

  }


  return `${
    (
      bytes
      /
      (
        1024 * 1024
      )
    ).toFixed(1)
  } MB`;

}


submissionFile
  .addEventListener(
    "change",
    () => {

      const file =
        submissionFile.files[
          0
        ];


      if (
        !file
      ) {

        return;

      }


      const recommendedLimit =
        10
        *
        1024
        *
        1024;


      if (
        file.size
        >
        recommendedLimit
      ) {

        showToast(
          "Please select a file smaller than 10 MB."
        );


        submissionFile.value =
          "";


        return;

      }


      selectedUploadFile =
        file;


      selectedFileName.textContent =
        file.name;


      selectedFileSize.textContent =
        formatFileSize(
          file.size
        );


      selectedFile.classList.add(
        "show"
      );

    }
  );


// ======================================================
// REMOVE SELECTED FILE
// ======================================================

removeSelectedFile
  .addEventListener(
    "click",
    () => {

      selectedUploadFile =
        null;


      submissionFile.value =
        "";


      selectedFile.classList.remove(
        "show"
      );

    }
  );


// ======================================================
// START SUBMISSION
// ======================================================

submitAssignmentButton
  .addEventListener(
    "click",
    () => {

      if (
        !selectedUploadFile
      ) {

        showToast(
          "Please select a file before submitting."
        );


        return;

      }


      confirmSubmissionModal
        .classList.add(
          "show"
        );


      confirmSubmissionModal
        .setAttribute(
          "aria-hidden",
          "false"
        );

    }
  );


// ======================================================
// CANCEL SUBMISSION
// ======================================================

cancelSubmissionButton
  .addEventListener(
    "click",
    () => {

      confirmSubmissionModal
        .classList.remove(
          "show"
        );


      confirmSubmissionModal
        .setAttribute(
          "aria-hidden",
          "true"
        );

    }
  );


// ======================================================
// CREATE NOTIFICATION
// ======================================================

function createSubmissionNotification(
  assignment
) {

  const notifications =
    readJSONStorage(
      NOTIFICATION_STORAGE_KEY,
      []
    );


  const safeNotifications =
    Array.isArray(
      notifications
    )
      ? notifications
      : [];


  safeNotifications.push({

    id:
      `assignment-submitted-${assignment.id}-${Date.now()}`,

    type:
      "assignment",

    title:
      "Assignment submitted",

    message:
      assignment.title,

    meta:
  courseName(
    assignment.courseId
  ),

    createdAt:
      new Date()
        .toISOString(),

    read:
      false,

    action:
      "assignments"

  });


  localStorage.setItem(

    NOTIFICATION_STORAGE_KEY,

    JSON.stringify(
      safeNotifications
    )

  );

}


// ======================================================
// CONFIRM SUBMISSION
// ======================================================

confirmSubmissionButton
  .addEventListener(
    "click",
    () => {

      if (
        !activeAssignmentId
        ||
        !selectedUploadFile
      ) {

        return;

      }


      const assignment =
        ASSIGNMENTS.find(
          item =>
            item.id
            === activeAssignmentId
        );


      if (
        !assignment
      ) {

        return;

      }


      const submissions =
        getSubmissions();


      submissions[
        assignment.id
      ] = {

        fileName:
          selectedUploadFile.name,

        fileSize:
          selectedUploadFile.size,

        fileType:
          selectedUploadFile.type,

        note:
          submissionNote.value
            .trim(),

        submittedAt:
          new Date()
            .toISOString()

      };


      saveSubmissions(
        submissions
      );


      createSubmissionNotification(
        assignment
      );


      confirmSubmissionModal
        .classList.remove(
          "show"
        );


      confirmSubmissionModal
        .setAttribute(
          "aria-hidden",
          "true"
        );


      selectedUploadFile =
        null;


      renderSubmission(
        assignment
      );


      updateStatistics();


      renderAssignments();


      const status =
        getAssignmentStatus(
          assignment
        );


      modalStatusBadge.textContent =
        getStatusLabel(
          status
        );


      modalStatusBadge.className =
        `status-badge ${status}`;


      deadlineMessage.textContent =
        getDeadlineText(
          assignment
        );


      deadlineMessage.className =
        `deadline-message ${status}`;


      showToast(
        "✓ Assignment submitted successfully."
      );

    }
  );


// ======================================================
// FILTER TABS
// ======================================================

assignmentTabs.forEach(
  tab => {

    tab.addEventListener(
      "click",
      () => {

        currentFilter =
          tab.dataset.filter;


        assignmentTabs
          .forEach(
            item => {

              item.classList.remove(
                "active"
              );

            }
          );


        tab.classList.add(
          "active"
        );


        renderAssignments();

      }
    );

  }
);


// ======================================================
// SEARCH
// ======================================================

assignmentSearch
  .addEventListener(
    "input",
    renderAssignments
  );


// ======================================================
// COURSE FILTER
// ======================================================

courseFilter
  .addEventListener(
    "change",
    renderAssignments
  );


// ======================================================
// MOBILE SIDEBAR
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


menuButton.addEventListener(
  "click",
  openSidebar
);


mobileOverlay.addEventListener(
  "click",
  closeSidebar
);


// ======================================================
// TOAST
// ======================================================

let toastTimer =
  null;


function showToast(
  message
) {

  assignmentToast.textContent =
    message;


  assignmentToast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        assignmentToast
          .classList.remove(
            "show"
          );

      },
      2400
    );

}


// ======================================================
// ESCAPE
// ======================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !== "Escape"
    ) {

      return;

    }


    closeSidebar();


    confirmSubmissionModal
      .classList.remove(
        "show"
      );


    if (
      assignmentModal
        .classList
        .contains(
          "show"
        )
    ) {

      closeAssignment();

    }

  }
);


// ======================================================
// UPDATE PAGE
// ======================================================

function updatePage() {

  updateStatistics();

  renderAssignments();

}


// ======================================================
// OPEN ASSIGNMENT FROM URL
// ======================================================

function openAssignmentFromURL() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const assignmentId =
    params.get(
      "assignment"
    );


  if (
    !assignmentId
  ) {

    return;

  }


  const assignment =
    window.EduSpaceData
      .getAssignment(
        assignmentId
      );


  if (
    !assignment
  ) {

    return;

  }


  openAssignment(
    assignmentId
  );

}


openAssignmentFromURL();


// ======================================================
// INITIALIZE
// ======================================================

function initializeAssignments() {

  loadStudent();

  updatePage();

}


initializeAssignments();


// ======================================================
// RETURN TO PAGE
// ======================================================

window.addEventListener(
  "pageshow",
  updatePage
);


document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.visibilityState
      === "visible"
    ) {

      updatePage();

    }

  }
);


// ======================================================
// RESIZE
// ======================================================

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