// ======================================================
// EDUSPACE LEARNING STREAK
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
// STORAGE
// ======================================================

const LEARNING_ACTIVITY_KEY =
  "eduspace-learning-activity-v1";


// ======================================================
// DATE HELPERS
// ======================================================

function toDateKey(
  date
) {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  return (
    `${year}-${month}-${day}`
  );

}


function parseDateKey(
  dateKey
) {

  const [
    year,
    month,
    day
  ] =
    dateKey
      .split("-")
      .map(Number);


  return new Date(
    year,
    month - 1,
    day,
    12,
    0,
    0,
    0
  );

}


function addDays(
  date,
  amount
) {

  const result =
    new Date(date);


  result.setDate(
    result.getDate() +
    amount
  );


  return result;

}


function sameDate(
  first,
  second
) {

  return (
    first.getFullYear() ===
      second.getFullYear()
    &&
    first.getMonth() ===
      second.getMonth()
    &&
    first.getDate() ===
      second.getDate()
  );

}


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
// ACTIVITY STORAGE
// ======================================================

function getActivityState() {

  const state =
    readJSON(
      LEARNING_ACTIVITY_KEY,
      null
    );


  if (
    !state ||
    typeof state !==
    "object" ||
    Array.isArray(state)
  ) {

    return {
      days: {}
    };

  }


  if (
    !state.days ||
    typeof state.days !==
    "object"
  ) {

    state.days = {};

  }


  return state;

}


function saveActivityState(
  state
) {

  localStorage.setItem(

    LEARNING_ACTIVITY_KEY,

    JSON.stringify(
      state
    )

  );

}


// ======================================================
// RECORD ACTIVITY
// ======================================================

function recordActivity(
  type = "study"
) {

  const now =
    new Date();


  const dateKey =
    toDateKey(
      now
    );


  const state =
    getActivityState();


  if (
    !state.days[
      dateKey
    ]
  ) {

    state.days[
      dateKey
    ] = {

      count:
        0,

      types:
        {},

      firstActivityAt:
        now.toISOString(),

      lastActivityAt:
        now.toISOString()

    };

  }


  const day =
    state.days[
      dateKey
    ];


  day.count =
    Number(
      day.count || 0
    ) + 1;


  if (
    !day.types ||
    typeof day.types !==
    "object"
  ) {

    day.types = {};

  }


  day.types[
    type
  ] =
    Number(
      day.types[
        type
      ] || 0
    ) + 1;


  day.lastActivityAt =
    now.toISOString();


  saveActivityState(
    state
  );


  window.dispatchEvent(
    new CustomEvent(
      "eduspace-activity-recorded",
      {
        detail: {
          type,
          dateKey
        }
      }
    )
  );


  return day;

}


// ======================================================
// MANUAL STUDY TODAY
// ======================================================

function recordManualStudyToday() {

  const todayKey =
    toDateKey(
      new Date()
    );


  const state =
    getActivityState();


  const existing =
    state.days[
      todayKey
    ];


  if (
    existing?.types?.manual
  ) {

    return false;

  }


  recordActivity(
    "manual"
  );


  return true;

}


// ======================================================
// PUBLIC API
// ======================================================

window.EduSpaceStreak = {

  recordActivity,

  getActivityState,

  toDateKey

};


// ======================================================
// AUTOMATIC COURSE ACTIVITY
// ======================================================

function setupCourseActivityTracking() {


  // VIDEO STUDY

  const lessonVideo =
    document.getElementById(
      "lessonVideo"
    );


  if (lessonVideo) {

    let videoRecorded =
      false;


    lessonVideo.addEventListener(
      "play",
      () => {

        if (
          videoRecorded
        ) {
          return;
        }


        videoRecorded =
          true;


        recordActivity(
          "video"
        );

      }
    );


    lessonVideo.addEventListener(
      "loadedmetadata",
      () => {

        videoRecorded =
          false;

      }
    );

  }



  // LESSON COMPLETE

  const completeButton =
    document.getElementById(
      "completeLessonButton"
    );


  if (completeButton) {

    completeButton.addEventListener(
      "click",
      () => {

        recordActivity(
          "lesson"
        );

      }
    );

  }



  // NOTES

  const saveNotesButton =
    document.getElementById(
      "saveNotesButton"
    );


  if (saveNotesButton) {

    saveNotesButton.addEventListener(
      "click",
      () => {

        recordActivity(
          "note"
        );

      }
    );

  }



  // QUIZ

  const submitQuizButton =
    document.getElementById(
      "submitQuizButton"
    );


  if (submitQuizButton) {

    submitQuizButton.addEventListener(
      "click",
      () => {

        recordActivity(
          "quiz"
        );

      }
    );

  }

}


// ======================================================
// STREAK PAGE DOM
// ======================================================

const streakPage =
  document.querySelector(
    ".streak-page"
  );


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


const currentStreakElement =
  document.getElementById(
    "currentStreak"
  );


const longestStreakElement =
  document.getElementById(
    "longestStreak"
  );


const activeDaysElement =
  document.getElementById(
    "activeDays"
  );


const weekActiveDaysElement =
  document.getElementById(
    "weekActiveDays"
  );


const studyTodayTitle =
  document.getElementById(
    "studyTodayTitle"
  );


const studyTodayMessage =
  document.getElementById(
    "studyTodayMessage"
  );


const studyTodayButton =
  document.getElementById(
    "studyTodayButton"
  );


const weeklyActivityTotal =
  document.getElementById(
    "weeklyActivityTotal"
  );


const weeklyChart =
  document.getElementById(
    "weeklyChart"
  );


const streakRing =
  document.getElementById(
    "streakRing"
  );


const streakRingValue =
  document.getElementById(
    "streakRingValue"
  );


const streakMessage =
  document.getElementById(
    "streakMessage"
  );


const calendarMonthTitle =
  document.getElementById(
    "calendarMonthTitle"
  );


const learningCalendar =
  document.getElementById(
    "learningCalendar"
  );


const previousMonthButton =
  document.getElementById(
    "previousMonthButton"
  );


const nextMonthButton =
  document.getElementById(
    "nextMonthButton"
  );


const todayMonthButton =
  document.getElementById(
    "todayMonthButton"
  );


const activityBreakdown =
  document.getElementById(
    "activityBreakdown"
  );


const streakToast =
  document.getElementById(
    "streakToast"
  );


// ======================================================
// PAGE STATE
// ======================================================

let calendarDate =
  new Date();


calendarDate.setDate(
  1
);


let toastTimer =
  null;


// ======================================================
// INITIALS
// ======================================================

function createInitials(
  name
) {

  if (
    typeof name !==
      "string" ||
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
// ACTIVE DATE KEYS
// ======================================================

function getActiveDateKeys() {

  const state =
    getActivityState();


  return Object
    .entries(
      state.days
    )
    .filter(
      (
        [
          ,
          day
        ]
      ) =>
        Number(
          day?.count || 0
        ) > 0
    )
    .map(
      (
        [
          key
        ]
      ) =>
        key
    )
    .sort();

}


// ======================================================
// CURRENT STREAK
// ======================================================

function calculateCurrentStreak() {

  const active =
    new Set(
      getActiveDateKeys()
    );


  if (
    active.size === 0
  ) {

    return 0;

  }


  const today =
    new Date();


  let cursor =
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      12
    );


  const todayKey =
    toDateKey(
      cursor
    );


  if (
    !active.has(
      todayKey
    )
  ) {

    cursor =
      addDays(
        cursor,
        -1
      );

  }


  let streak =
    0;


  while (
    active.has(
      toDateKey(
        cursor
      )
    )
  ) {

    streak++;


    cursor =
      addDays(
        cursor,
        -1
      );

  }


  return streak;

}


// ======================================================
// LONGEST STREAK
// ======================================================

function calculateLongestStreak() {

  const keys =
    getActiveDateKeys();


  if (
    keys.length === 0
  ) {

    return 0;

  }


  let longest =
    1;


  let current =
    1;


  for (
    let index = 1;
    index < keys.length;
    index++
  ) {

    const previous =
      parseDateKey(
        keys[
          index - 1
        ]
      );


    const expected =
      addDays(
        previous,
        1
      );


    if (
      toDateKey(
        expected
      ) ===
      keys[
        index
      ]
    ) {

      current++;


      longest =
        Math.max(
          longest,
          current
        );

    }

    else {

      current =
        1;

    }

  }


  return longest;

}


// ======================================================
// WEEK DATA
// ======================================================

function getLastSevenDays() {

  const state =
    getActivityState();


  const today =
    new Date();


  const days =
    [];


  for (
    let offset = 6;
    offset >= 0;
    offset--
  ) {

    const date =
      addDays(
        today,
        -offset
      );


    const key =
      toDateKey(
        date
      );


    const activity =
      state.days[
        key
      ];


    days.push({

      date,

      key,

      count:
        Number(
          activity?.count || 0
        ),

      types:
        activity?.types || {}

    });

  }


  return days;

}


// ======================================================
// TOTAL ACTIVITY TYPES
// ======================================================

function getActivityTotals() {

  const state =
    getActivityState();


  const totals = {

    video:
      0,

    lesson:
      0,

    quiz:
      0,

    note:
      0,

    manual:
      0

  };


  Object
    .values(
      state.days
    )
    .forEach(
      day => {

        const types =
          day?.types || {};


        Object
          .keys(
            totals
          )
          .forEach(
            type => {

              totals[
                type
              ] +=
                Number(
                  types[
                    type
                  ] || 0
                );

            }
          );

      }
    );


  return totals;

}


// ======================================================
// TOAST
// ======================================================

function showStreakToast(
  message
) {

  if (!streakToast) {
    return;
  }


  streakToast.textContent =
    message;


  streakToast
    .classList.add(
      "show"
    );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        streakToast
          .classList.remove(
            "show"
          );

      },
      2400
    );

}


// ======================================================
// STUDENT
// ======================================================

function loadStudentInformation() {

  if (
    !studentName ||
    !studentAvatar
  ) {

    return;

  }


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
// RENDER STATS
// ======================================================

function renderStreakStats() {

  const current =
    calculateCurrentStreak();


  const longest =
    calculateLongestStreak();


  const activeKeys =
    getActiveDateKeys();


  const week =
    getLastSevenDays();


  const weekActive =
    week.filter(
      day =>
        day.count > 0
    ).length;


  currentStreakElement.textContent =
    `${current} ${
      current === 1
        ? "day"
        : "days"
    }`;


  longestStreakElement.textContent =
    `${longest} ${
      longest === 1
        ? "day"
        : "days"
    }`;


  activeDaysElement.textContent =
    activeKeys.length;


  weekActiveDaysElement.textContent =
    `${weekActive} / 7`;


  streakRingValue.textContent =
    current;


  const ringProgress =
    Math.min(
      current,
      7
    );


  const degrees =
    (
      ringProgress /
      7
    )
    *
    360;


  const isDark =
    document.documentElement
      .getAttribute(
        "data-theme"
      ) ===
      "dark";


  const emptyColor =
    isDark
      ? "#30343e"
      : "#eceef4";


  streakRing.style.background =
    `conic-gradient(
      #ed6e62 0deg ${degrees}deg,
      ${emptyColor} ${degrees}deg 360deg
    )`;


  if (
    current === 0
  ) {

    streakMessage.textContent =
      "Start learning today to begin your first streak.";

  }

  else if (
    current === 1
  ) {

    streakMessage.textContent =
      "Your streak has started. Come back tomorrow to keep it going.";

  }

  else if (
    current < 7
  ) {

    streakMessage.textContent =
      `${current} days strong. Keep building your learning habit.`;

  }

  else if (
    current < 30
  ) {

    streakMessage.textContent =
      `🔥 ${current}-day streak! Your consistency is paying off.`;

  }

  else {

    streakMessage.textContent =
      `🏆 Incredible ${current}-day streak. That's serious consistency.`;

  }

}


// ======================================================
// STUDY TODAY UI
// ======================================================

function renderStudyToday() {

  const todayKey =
    toDateKey(
      new Date()
    );


  const state =
    getActivityState();


  const today =
    state.days[
      todayKey
    ];


  const studiedToday =
    Number(
      today?.count || 0
    ) > 0;


  const current =
    calculateCurrentStreak();


  if (
    studiedToday
  ) {

    studyTodayTitle.textContent =
      "Today's study is complete";


    studyTodayMessage.textContent =
      `You've recorded ${
        today.count
      } ${
        today.count === 1
          ? "activity"
          : "activities"
      } today. Your streak is safe.`;


    studyTodayButton.textContent =
      "✓ Studied Today";


    studyTodayButton.disabled =
      true;


    return;

  }


  studyTodayButton.disabled =
    false;


  studyTodayButton.textContent =
    "⚡ Study Today";


  if (
    current > 0
  ) {

    studyTodayTitle.textContent =
      "Keep your streak alive";


    studyTodayMessage.textContent =
      `Study today to continue your ${current}-day learning streak.`;

  }

  else {

    studyTodayTitle.textContent =
      "Start today's learning";


    studyTodayMessage.textContent =
      "Record a study session today and begin building your streak.";

  }

}


// ======================================================
// WEEKLY CHART
// ======================================================

function renderWeeklyChart() {

  const week =
    getLastSevenDays();


  weeklyChart.innerHTML =
    "";


  const maximum =
    Math.max(
      1,
      ...week.map(
        day =>
          day.count
      )
    );


  const total =
    week.reduce(
      (
        sum,
        day
      ) =>
        sum +
        day.count,
      0
    );


  weeklyActivityTotal.textContent =
    total;


  const today =
    new Date();


  week.forEach(
    day => {

      const column =
        document.createElement(
          "div"
        );


      column.className =
        "week-day";


      if (
        day.count > 0
      ) {

        column.classList.add(
          "active"
        );

      }


      if (
        sameDate(
          day.date,
          today
        )
      ) {

        column.classList.add(
          "today"
        );

      }


      const count =
        document.createElement(
          "span"
        );


      count.className =
        "week-count";


      count.textContent =
        day.count;


      const track =
        document.createElement(
          "div"
        );


      track.className =
        "week-bar-track";


      const bar =
        document.createElement(
          "div"
        );


      bar.className =
        "week-bar";


      const percentage =
        day.count > 0
          ? Math.max(
              12,
              Math.round(
                (
                  day.count /
                  maximum
                )
                * 100
              )
            )
          : 4;


      bar.style.height =
        `${percentage}%`;


      track.appendChild(
        bar
      );


      const label =
        document.createElement(
          "span"
        );


      label.className =
        "week-label";


      label.textContent =
        day.date
          .toLocaleDateString(
            undefined,
            {
              weekday:
                "short"
            }
          )
          .slice(
            0,
            3
          );


      column.append(
        count,
        track,
        label
      );


      weeklyChart
        .appendChild(
          column
        );

    }
  );

}


// ======================================================
// CALENDAR
// ======================================================

function renderCalendar() {

  const state =
    getActivityState();


  const year =
    calendarDate
      .getFullYear();


  const month =
    calendarDate
      .getMonth();


  calendarMonthTitle.textContent =
    calendarDate
      .toLocaleDateString(
        undefined,
        {
          month:
            "long",

          year:
            "numeric"
        }
      );


  const firstDay =
    new Date(
      year,
      month,
      1
    );


  const firstWeekday =
    firstDay.getDay();


  const gridStart =
    new Date(
      year,
      month,
      1 - firstWeekday,
      12
    );


  const today =
    new Date();


  learningCalendar.innerHTML =
    "";


  for (
    let index = 0;
    index < 42;
    index++
  ) {

    const date =
      addDays(
        gridStart,
        index
      );


    const key =
      toDateKey(
        date
      );


    const dayActivity =
      state.days[
        key
      ];


    const count =
      Number(
        dayActivity?.count || 0
      );


    const cell =
      document.createElement(
        "div"
      );


    cell.className =
      "calendar-day";


    if (
      date.getMonth() !== month
    ) {

      cell.classList.add(
        "muted"
      );

    }


    if (
      sameDate(
        date,
        today
      )
    ) {

      cell.classList.add(
        "today"
      );

    }


    if (
      count > 0
    ) {

      cell.classList.add(
        "studied"
      );

    }


    const number =
      document.createElement(
        "span"
      );


    number.className =
      "calendar-day-number";


    number.textContent =
      date.getDate();


    cell.appendChild(
      number
    );


    if (
      count > 0
    ) {

      const activity =
        document.createElement(
          "div"
        );


      activity.className =
        "calendar-activity";


      const fire =
        document.createElement(
          "span"
        );


      fire.className =
        "calendar-fire";


      fire.textContent =
        "🔥";


      const text =
        document.createElement(
          "span"
        );


      text.textContent =
        `${count} ${
          count === 1
            ? "activity"
            : "activities"
        }`;


      activity.append(
        fire,
        text
      );


      cell.appendChild(
        activity
      );

    }


    learningCalendar
      .appendChild(
        cell
      );

  }

}


// ======================================================
// ACTIVITY BREAKDOWN
// ======================================================

function renderActivityBreakdown() {

  const totals =
    getActivityTotals();


  const activityTypes = [

    {
      key:
        "video",

      icon:
        "🎬",

      label:
        "Videos"
    },

    {
      key:
        "lesson",

      icon:
        "✅",

      label:
        "Lessons"
    },

    {
      key:
        "quiz",

      icon:
        "🧠",

      label:
        "Quizzes"
    },

    {
      key:
        "note",

      icon:
        "✍️",

      label:
        "Notes"
    },

    {
      key:
        "manual",

      icon:
        "⚡",

      label:
        "Study Sessions"
    }

  ];


  activityBreakdown.innerHTML =
    "";


  activityTypes.forEach(
    activity => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "activity-type";


      const icon =
        document.createElement(
          "div"
        );


      icon.className =
        "activity-type-icon";


      icon.textContent =
        activity.icon;


      const value =
        document.createElement(
          "strong"
        );


      value.textContent =
        totals[
          activity.key
        ];


      const label =
        document.createElement(
          "span"
        );


      label.textContent =
        activity.label;


      card.append(
        icon,
        value,
        label
      );


      activityBreakdown
        .appendChild(
          card
        );

    }
  );

}


// ======================================================
// RENDER PAGE
// ======================================================

function renderStreakPage() {

  if (!streakPage) {
    return;
  }


  renderStreakStats();

  renderStudyToday();

  renderWeeklyChart();

  renderCalendar();

  renderActivityBreakdown();

}


// ======================================================
// SIDEBAR
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


// ======================================================
// STREAK PAGE EVENTS
// ======================================================

function setupStreakPageEvents() {

  if (!streakPage) {
    return;
  }


  menuButton?.addEventListener(
    "click",
    openSidebar
  );


  mobileOverlay?.addEventListener(
    "click",
    closeSidebar
  );


  studyTodayButton
    ?.addEventListener(
      "click",
      () => {

        const recorded =
          recordManualStudyToday();


        if (
          recorded
        ) {

          showStreakToast(
            "🔥 Today's study activity has been recorded."
          );

        }


        renderStreakPage();

      }
    );


  previousMonthButton
    ?.addEventListener(
      "click",
      () => {

        calendarDate =
          new Date(
            calendarDate.getFullYear(),
            calendarDate.getMonth() - 1,
            1
          );


        renderCalendar();

      }
    );


  nextMonthButton
    ?.addEventListener(
      "click",
      () => {

        calendarDate =
          new Date(
            calendarDate.getFullYear(),
            calendarDate.getMonth() + 1,
            1
          );


        renderCalendar();

      }
    );


  todayMonthButton
    ?.addEventListener(
      "click",
      () => {

        calendarDate =
          new Date();


        calendarDate.setDate(
          1
        );


        renderCalendar();

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
    renderStreakPage
  );


  window.addEventListener(
    "eduspace-activity-recorded",
    renderStreakPage
  );


  window.addEventListener(
    "eduspace-theme-change",
    renderStreakStats
  );

}


// ======================================================
// INITIALIZE
// ======================================================

function initializeLearningStreak() {

  setupCourseActivityTracking();


  if (!streakPage) {

    return;

  }


  loadStudentInformation();

  setupStreakPageEvents();

  renderStreakPage();

}


// ======================================================
// START
// ======================================================

initializeLearningStreak();