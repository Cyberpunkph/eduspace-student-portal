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

const EVENT_STORAGE_KEY =
  "eduspace-personal-schedule-events";


// ======================================================
// ELEMENTS
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


const calendarTitle =
  document.getElementById(
    "calendarTitle"
  );


const calendarGrid =
  document.getElementById(
    "calendarGrid"
  );


const previousButton =
  document.getElementById(
    "previousButton"
  );


const nextButton =
  document.getElementById(
    "nextButton"
  );


const todayButton =
  document.getElementById(
    "todayButton"
  );


const viewButtons =
  document.querySelectorAll(
    "[data-view]"
  );


const selectedDateTitle =
  document.getElementById(
    "selectedDateTitle"
  );


const selectedEventList =
  document.getElementById(
    "selectedEventList"
  );


const upcomingList =
  document.getElementById(
    "upcomingList"
  );


const upcomingEventCount =
  document.getElementById(
    "upcomingEventCount"
  );


const assignmentCount =
  document.getElementById(
    "assignmentCount"
  );


const quizCount =
  document.getElementById(
    "quizCount"
  );


const studyCount =
  document.getElementById(
    "studyCount"
  );


// ADD EVENT

const addEventButton =
  document.getElementById(
    "addEventButton"
  );


const eventModal =
  document.getElementById(
    "eventModal"
  );


const closeEventModal =
  document.getElementById(
    "closeEventModal"
  );


const cancelEventButton =
  document.getElementById(
    "cancelEventButton"
  );


const eventForm =
  document.getElementById(
    "eventForm"
  );


const eventTitle =
  document.getElementById(
    "eventTitle"
  );


const eventDate =
  document.getElementById(
    "eventDate"
  );


const eventTime =
  document.getElementById(
    "eventTime"
  );


const eventType =
  document.getElementById(
    "eventType"
  );


const eventDescription =
  document.getElementById(
    "eventDescription"
  );


// DETAILS

const eventDetailsModal =
  document.getElementById(
    "eventDetailsModal"
  );


const closeDetailsButton =
  document.getElementById(
    "closeDetailsButton"
  );


const closeDetailsDoneButton =
  document.getElementById(
    "closeDetailsDoneButton"
  );


const deleteEventButton =
  document.getElementById(
    "deleteEventButton"
  );


const detailTypeLabel =
  document.getElementById(
    "detailTypeLabel"
  );


const detailTitle =
  document.getElementById(
    "detailTitle"
  );


const detailDate =
  document.getElementById(
    "detailDate"
  );


const detailTime =
  document.getElementById(
    "detailTime"
  );


const detailMeta =
  document.getElementById(
    "detailMeta"
  );


const detailDescription =
  document.getElementById(
    "detailDescription"
  );


const scheduleToast =
  document.getElementById(
    "scheduleToast"
  );


// ======================================================
// STATE
// ======================================================

const today =
  new Date();


today.setHours(
  0,
  0,
  0,
  0
);


let selectedDate =
  new Date(
    today
  );


let currentDate =
  new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );


let currentView =
  "month";


let activeDetailEventId =
  null;


// ======================================================
// DATE HELPERS
// ======================================================

function dateKey(
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


  return `${year}-${month}-${day}`;

}


function parseLocalDate(
  value
) {

  const [
    year,
    month,
    day
  ] =
    value
      .split("-")
      .map(Number);


  return new Date(
    year,
    month - 1,
    day
  );

}


function isSameDay(
  first,
  second
) {

  return (
    first.getFullYear()
    === second.getFullYear()
    &&
    first.getMonth()
    === second.getMonth()
    &&
    first.getDate()
    === second.getDate()
  );

}


// ======================================================
// STUDENT
// ======================================================

function createInitials(
  name
) {

  if (
    !name
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
// DEFAULT EVENTS
// ======================================================

function getDefaultEvents() {

  return [

    {
      id:
        "assignment-responsive",

      title:
        "Responsive Website Project",

      date:
        "2026-08-18",

      time:
        "23:59",

      type:
        "assignment",

      meta:
        "Web Development",

      description:
        "Complete and submit the responsive website project.",

      locked:
        true
    },


    {
      id:
        "assignment-calculus",

      title:
        "Calculus Problem Set",

      date:
        "2026-08-22",

      time:
        "23:59",

      type:
        "assignment",

      meta:
        "Mathematics",

      description:
        "Complete the assigned calculus exercises.",

      locked:
        true
    },


    {
      id:
        "assignment-wireframe",

      title:
        "Mobile App Wireframe",

      date:
        "2026-08-26",

      time:
        "23:59",

      type:
        "assignment",

      meta:
        "UI/UX Design",

      description:
        "Create the first wireframe for your mobile application.",

      locked:
        true
    },


    {
      id:
        "class-web-development",

      title:
        "Web Development Lesson",

      date:
        "2026-08-15",

      time:
        "10:00",

      type:
        "class",

      meta:
        "Web Development",

      description:
        "Continue your Web Development lessons.",

      locked:
        true
    },


    {
      id:
        "quiz-math-review",

      title:
        "Mathematics Quiz Review",

      date:
        "2026-08-20",

      time:
        "14:00",

      type:
        "quiz",

      meta:
        "Mathematics",

      description:
        "Review algebra and linear equations before the quiz.",

      locked:
        true
    }

  ];

}


// ======================================================
// EVENT STORAGE
// ======================================================

function initializeEvents() {

  if (
    localStorage.getItem(
      EVENT_STORAGE_KEY
    ) === null
  ) {

    localStorage.setItem(

      EVENT_STORAGE_KEY,

      JSON.stringify(
        getDefaultEvents()
      )

    );

  }

}


function getEvents() {

  const raw =
    localStorage.getItem(
      EVENT_STORAGE_KEY
    );


  if (
    !raw
  ) {

    return [];

  }


  try {

    const parsed =
      JSON.parse(
        raw
      );


    return Array.isArray(
      parsed
    )
      ? parsed
      : [];

  }

  catch {

    return [];

  }

}


function saveEvents(
  events
) {

  localStorage.setItem(

    EVENT_STORAGE_KEY,

    JSON.stringify(
      events
    )

  );

}


// ======================================================
// EVENT HELPERS
// ======================================================

function getEventsForDate(
  date
) {

  const key =
    dateKey(
      date
    );


  return getEvents()
    .filter(
      event =>
        event.date === key
    )
    .sort(
      (
        first,
        second
      ) =>
        first.time.localeCompare(
          second.time
        )
    );

}


function getEventIcon(
  type
) {

  switch (
    type
  ) {

    case "assignment":
      return "📝";

    case "quiz":
      return "🧠";

    case "class":
      return "🎓";

    case "study":
      return "📚";

    default:
      return "📅";

  }

}


function getTypeLabel(
  type
) {

  switch (
    type
  ) {

    case "assignment":
      return "ASSIGNMENT";

    case "quiz":
      return "QUIZ";

    case "class":
      return "CLASS";

    case "study":
      return "STUDY SESSION";

    default:
      return "EVENT";

  }

}


function formatTime(
  time
) {

  if (
    !time
  ) {

    return "All day";

  }


  const [
    hour,
    minute
  ] =
    time
      .split(":")
      .map(Number);


  const date =
    new Date();


  date.setHours(
    hour,
    minute,
    0,
    0
  );


  return date.toLocaleTimeString(
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
// MONTH VIEW
// ======================================================

function renderMonth() {

  calendarGrid.classList.remove(
    "week-view"
  );


  calendarGrid.innerHTML =
    "";


  calendarTitle.textContent =
    currentDate.toLocaleDateString(
      undefined,
      {
        month:
          "long",

        year:
          "numeric"
      }
    );


  const year =
    currentDate.getFullYear();


  const month =
    currentDate.getMonth();


  const firstDay =
    new Date(
      year,
      month,
      1
    );


  const startDate =
    new Date(
      firstDay
    );


  startDate.setDate(
    firstDay.getDate()
    -
    firstDay.getDay()
  );


  for (
    let index = 0;
    index < 42;
    index++
  ) {

    const date =
      new Date(
        startDate
      );


    date.setDate(
      startDate.getDate()
      +
      index
    );


    createCalendarDay(
      date,
      month,
      false
    );

  }

}


// ======================================================
// WEEK VIEW
// ======================================================

function getStartOfWeek(
  date
) {

  const result =
    new Date(
      date
    );


  result.setDate(
    result.getDate()
    -
    result.getDay()
  );


  return result;

}


function renderWeek() {

  calendarGrid.classList.add(
    "week-view"
  );


  calendarGrid.innerHTML =
    "";


  const start =
    getStartOfWeek(
      selectedDate
    );


  const end =
    new Date(
      start
    );


  end.setDate(
    start.getDate()
    +
    6
  );


  calendarTitle.textContent =
    `${start.toLocaleDateString(
      undefined,
      {
        month:
          "short",

        day:
          "numeric"
      }
    )} – ${end.toLocaleDateString(
      undefined,
      {
        month:
          "short",

        day:
          "numeric",

        year:
          "numeric"
      }
    )}`;


  for (
    let index = 0;
    index < 7;
    index++
  ) {

    const date =
      new Date(
        start
      );


    date.setDate(
      start.getDate()
      +
      index
    );


    createCalendarDay(
      date,
      date.getMonth(),
      true
    );

  }

}


// ======================================================
// CREATE CALENDAR DAY
// ======================================================

function createCalendarDay(
  date,
  activeMonth,
  weekMode
) {

  const day =
    document.createElement(
      "div"
    );


  day.className =
    "calendar-day";


  if (
    !weekMode
    &&
    date.getMonth()
    !== activeMonth
  ) {

    day.classList.add(
      "outside-month"
    );

  }


  if (
    isSameDay(
      date,
      today
    )
  ) {

    day.classList.add(
      "today"
    );

  }


  if (
    isSameDay(
      date,
      selectedDate
    )
  ) {

    day.classList.add(
      "selected"
    );

  }


  const number =
    document.createElement(
      "div"
    );


  number.className =
    "day-number";


  number.textContent =
    date.getDate();


  day.appendChild(
    number
  );


  const events =
    getEventsForDate(
      date
    );


  const maxEvents =
    weekMode
      ? events.length
      : 3;


  events
    .slice(
      0,
      maxEvents
    )
    .forEach(
      event => {

        const eventElement =
          document.createElement(
            "div"
          );


        eventElement.className =
          `calendar-event ${event.type}`;


        eventElement.textContent =
          weekMode
            ? `${formatTime(event.time)} • ${event.title}`
            : event.title;


        eventElement.addEventListener(
          "click",
          clickEvent => {

            clickEvent.stopPropagation();

            openEventDetails(
              event.id
            );

          }
        );


        day.appendChild(
          eventElement
        );

      }
    );


  if (
    !weekMode
    &&
    events.length > 3
  ) {

    const more =
      document.createElement(
        "div"
      );


    more.className =
      "more-events";


    more.textContent =
      `+${events.length - 3} more`;


    day.appendChild(
      more
    );

  }


  day.addEventListener(
    "click",
    () => {

      selectedDate =
        new Date(
          date
        );


      if (
        currentView === "month"
        &&
        date.getMonth()
        !== currentDate.getMonth()
      ) {

        currentDate =
          new Date(
            date.getFullYear(),
            date.getMonth(),
            1
          );

      }


      renderCalendar();

      renderSelectedDay();

    }
  );


  calendarGrid.appendChild(
    day
  );

}


// ======================================================
// RENDER CALENDAR
// ======================================================

function renderCalendar() {

  if (
    currentView === "week"
  ) {

    renderWeek();

  }

  else {

    renderMonth();

  }

}


// ======================================================
// SIDE EVENT ELEMENT
// ======================================================

function createSideEvent(
  event,
  includeDate = false
) {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";


  button.className =
    "side-event";


  let meta =
    formatTime(
      event.time
    );


  if (
    includeDate
  ) {

    const eventDate =
      parseLocalDate(
        event.date
      );


    meta =
      `${eventDate.toLocaleDateString(
        undefined,
        {
          month:
            "short",

          day:
            "numeric"
        }
      )} • ${meta}`;

  }


  button.innerHTML =
    `

      <div
        class="
          side-event-icon
          ${event.type}
        "
      >
        ${getEventIcon(event.type)}
      </div>


      <div class="side-event-info">

        <strong>
          ${event.title}
        </strong>

        <span>
          ${meta}
        </span>

        <span>
          ${event.meta || getTypeLabel(event.type)}
        </span>

      </div>

    `;


  button.addEventListener(
    "click",
    () => {

      openEventDetails(
        event.id
      );

    }
  );


  return button;

}


// ======================================================
// SELECTED DAY
// ======================================================

function renderSelectedDay() {

  selectedDateTitle.textContent =
    selectedDate.toLocaleDateString(
      undefined,
      {
        month:
          "long",

        day:
          "numeric"
      }
    );


  const events =
    getEventsForDate(
      selectedDate
    );


  selectedEventList.innerHTML =
    "";


  if (
    events.length === 0
  ) {

    selectedEventList.innerHTML =
      `
        <div class="empty-events">
          Nothing scheduled for this day.
          Add a personal study event if you want.
        </div>
      `;


    return;

  }


  events.forEach(
    event => {

      selectedEventList.appendChild(
        createSideEvent(
          event
        )
      );

    }
  );

}


// ======================================================
// UPCOMING
// ======================================================

function getUpcomingEvents() {

  const todayKey =
    dateKey(
      today
    );


  return getEvents()
    .filter(
      event =>
        event.date >= todayKey
    )
    .sort(
      (
        first,
        second
      ) => {

        const firstKey =
          `${first.date} ${first.time}`;


        const secondKey =
          `${second.date} ${second.time}`;


        return firstKey.localeCompare(
          secondKey
        );

      }
    );

}


function renderUpcoming() {

  const events =
    getUpcomingEvents();


  upcomingList.innerHTML =
    "";


  if (
    events.length === 0
  ) {

    upcomingList.innerHTML =
      `
        <div class="empty-events">
          No upcoming events.
        </div>
      `;


    return;

  }


  events
    .slice(
      0,
      5
    )
    .forEach(
      event => {

        upcomingList.appendChild(
          createSideEvent(
            event,
            true
          )
        );

      }
    );

}


// ======================================================
// STATS
// ======================================================

function updateStatistics() {

  const upcoming =
    getUpcomingEvents();


  upcomingEventCount.textContent =
    upcoming.length;


  assignmentCount.textContent =
    upcoming.filter(
      event =>
        event.type ===
        "assignment"
    ).length;


  quizCount.textContent =
    upcoming.filter(
      event =>
        event.type ===
        "quiz"
    ).length;


  studyCount.textContent =
    upcoming.filter(
      event =>
        event.type ===
        "study"
    ).length;

}


// ======================================================
// MONTH/WEEK NAVIGATION
// ======================================================

previousButton.addEventListener(
  "click",
  () => {

    if (
      currentView === "month"
    ) {

      currentDate.setMonth(
        currentDate.getMonth()
        -
        1
      );

    }

    else {

      selectedDate.setDate(
        selectedDate.getDate()
        -
        7
      );

    }


    renderCalendar();

  }
);


nextButton.addEventListener(
  "click",
  () => {

    if (
      currentView === "month"
    ) {

      currentDate.setMonth(
        currentDate.getMonth()
        +
        1
      );

    }

    else {

      selectedDate.setDate(
        selectedDate.getDate()
        +
        7
      );

    }


    renderCalendar();

  }
);


todayButton.addEventListener(
  "click",
  () => {

    selectedDate =
      new Date(
        today
      );


    currentDate =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );


    renderEverything();

  }
);


// ======================================================
// VIEW SWITCH
// ======================================================

viewButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        currentView =
          button.dataset.view;


        viewButtons.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        renderCalendar();

      }
    );

  }
);


// ======================================================
// ADD EVENT MODAL
// ======================================================

function openAddEventModal() {

  eventDate.value =
    dateKey(
      selectedDate
    );


  eventTime.value =
    "18:00";


  eventModal.classList.add(
    "show"
  );


  eventModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";


  setTimeout(
    () => {

      eventTitle.focus();

    },
    100
  );

}


function closeAddEventModal() {

  eventModal.classList.remove(
    "show"
  );


  eventModal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


addEventButton.addEventListener(
  "click",
  openAddEventModal
);


closeEventModal.addEventListener(
  "click",
  closeAddEventModal
);


cancelEventButton.addEventListener(
  "click",
  closeAddEventModal
);


eventModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      eventModal
    ) {

      closeAddEventModal();

    }

  }
);


// ======================================================
// SAVE NEW EVENT
// ======================================================

eventForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const title =
      eventTitle.value.trim();


    if (
      !title
    ) {

      return;

    }


    const events =
      getEvents();


    const newEvent = {

      id:
        `custom-${Date.now()}`,

      title,

      date:
        eventDate.value,

      time:
        eventTime.value,

      type:
        eventType.value,

      meta:
        "Personal Schedule",

      description:
        eventDescription.value.trim(),

      locked:
        false

    };


    events.push(
      newEvent
    );


    saveEvents(
      events
    );


    selectedDate =
      parseLocalDate(
        newEvent.date
      );


    currentDate =
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );


    eventForm.reset();


    closeAddEventModal();


    renderEverything();


    showToast(
      "Event added to your schedule."
    );

  }
);


// ======================================================
// EVENT DETAILS
// ======================================================

function openEventDetails(
  eventId
) {

  const event =
    getEvents().find(
      item =>
        item.id === eventId
    );


  if (
    !event
  ) {

    return;

  }


  activeDetailEventId =
    event.id;


  detailTypeLabel.textContent =
    getTypeLabel(
      event.type
    );


  detailTitle.textContent =
    event.title;


  const eventDate =
    parseLocalDate(
      event.date
    );


  detailDate.textContent =
    eventDate.toLocaleDateString(
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


  detailTime.textContent =
    formatTime(
      event.time
    );


  detailMeta.textContent =
    event.meta
    || getTypeLabel(
      event.type
    );


  detailDescription.textContent =
    event.description
    || "No additional notes.";


  deleteEventButton.style.display =
    event.locked
      ? "none"
      : "block";


  eventDetailsModal.classList.add(
    "show"
  );


  eventDetailsModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeEventDetails() {

  eventDetailsModal.classList.remove(
    "show"
  );


  eventDetailsModal.setAttribute(
    "aria-hidden",
    "true"
  );


  activeDetailEventId =
    null;


  document.body.style.overflow =
    "";

}


closeDetailsButton.addEventListener(
  "click",
  closeEventDetails
);


closeDetailsDoneButton.addEventListener(
  "click",
  closeEventDetails
);


eventDetailsModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      eventDetailsModal
    ) {

      closeEventDetails();

    }

  }
);


// ======================================================
// DELETE CUSTOM EVENT
// ======================================================

deleteEventButton.addEventListener(
  "click",
  () => {

    if (
      !activeDetailEventId
    ) {

      return;

    }


    const events =
      getEvents();


    const event =
      events.find(
        item =>
          item.id ===
          activeDetailEventId
      );


    if (
      !event
      ||
      event.locked
    ) {

      return;

    }


    const updated =
      events.filter(
        item =>
          item.id !==
          activeDetailEventId
      );


    saveEvents(
      updated
    );


    closeEventDetails();


    renderEverything();


    showToast(
      "Event removed from your schedule."
    );

  }
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
// ESCAPE
// ======================================================

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeSidebar();

      closeAddEventModal();

      closeEventDetails();

    }

  }
);


// ======================================================
// TOAST
// ======================================================

let toastTimer =
  null;


function showToast(
  message
) {

  scheduleToast.textContent =
    message;


  scheduleToast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        scheduleToast.classList.remove(
          "show"
        );

      },
      2200
    );

}


// ======================================================
// RENDER EVERYTHING
// ======================================================

function renderEverything() {

  renderCalendar();

  renderSelectedDay();

  renderUpcoming();

  updateStatistics();

}


// ======================================================
// INITIALIZE
// ======================================================

function initializeSchedule() {

  loadStudent();

  initializeEvents();

  renderEverything();

}


initializeSchedule();


// ======================================================
// RETURN TO TAB
// ======================================================

window.addEventListener(
  "pageshow",
  renderEverything
);


document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.visibilityState ===
      "visible"
    ) {

      renderEverything();

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