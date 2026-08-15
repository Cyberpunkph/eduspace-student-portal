// ======================================================
// EDUSPACE MESSAGES
// ======================================================


// ======================================================
// AUTH PROTECTION
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


// ======================================================
// STORAGE
// ======================================================

const MESSAGE_STORAGE_KEY =
  "eduspace-messages-v1";


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

const sidebarMessageCount =
  document.getElementById(
    "sidebarMessageCount"
  );

const messageApp =
  document.getElementById(
    "messageApp"
  );

const conversationSearch =
  document.getElementById(
    "conversationSearch"
  );

const conversationList =
  document.getElementById(
    "conversationList"
  );

const conversationEmpty =
  document.getElementById(
    "conversationEmpty"
  );

const conversationUnreadCount =
  document.getElementById(
    "conversationUnreadCount"
  );

const messageFilters =
  document.querySelectorAll(
    "[data-message-filter]"
  );

const chatEmpty =
  document.getElementById(
    "chatEmpty"
  );

const activeChat =
  document.getElementById(
    "activeChat"
  );

const chatBackButton =
  document.getElementById(
    "chatBackButton"
  );

const chatAvatar =
  document.getElementById(
    "chatAvatar"
  );

const chatName =
  document.getElementById(
    "chatName"
  );

const chatMeta =
  document.getElementById(
    "chatMeta"
  );

const chatMessages =
  document.getElementById(
    "chatMessages"
  );

const messageForm =
  document.getElementById(
    "messageForm"
  );

const messageInput =
  document.getElementById(
    "messageInput"
  );

const messageFile =
  document.getElementById(
    "messageFile"
  );

const attachButton =
  document.getElementById(
    "attachButton"
  );

const attachmentPreview =
  document.getElementById(
    "attachmentPreview"
  );

const attachmentName =
  document.getElementById(
    "attachmentName"
  );

const attachmentSize =
  document.getElementById(
    "attachmentSize"
  );

const removeAttachmentButton =
  document.getElementById(
    "removeAttachmentButton"
  );

const messageToast =
  document.getElementById(
    "messageToast"
  );


// ======================================================
// STATE
// ======================================================

let activeConversationId = null;

let currentFilter =
  "all";

let selectedFile =
  null;

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
    || "ST"
  );

}


function safeParse(
  value,
  fallback
) {

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


function generateId(prefix) {

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;

}


function getCourseTitle(
  courseId
) {

  if (!courseId) {
    return "EduSpace";
  }

  return window.EduSpaceData
    .getCourseTitle(
      courseId
    );

}


function formatFileSize(bytes) {

  if (
    typeof bytes !== "number" ||
    Number.isNaN(bytes)
  ) {

    return "";

  }

  if (bytes < 1024) {

    return `${bytes} B`;

  }

  if (
    bytes <
    1024 * 1024
  ) {

    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;

  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;

}


function formatConversationTime(
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

  const today =
    new Date();

  if (
    date.toDateString()
    ===
    today.toDateString()
  ) {

    return date.toLocaleTimeString(
      undefined,
      {
        hour: "numeric",
        minute: "2-digit"
      }
    );

  }

  return date.toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric"
    }
  );

}


function formatMessageTime(
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

  return date.toLocaleTimeString(
    undefined,
    {
      hour: "numeric",
      minute: "2-digit"
    }
  );

}


function formatDateLabel(
  dateString
) {

  const date =
    new Date(
      dateString
    );

  const today =
    new Date();

  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  if (
    date.toDateString()
    ===
    today.toDateString()
  ) {

    return "Today";

  }

  if (
    date.toDateString()
    ===
    yesterday.toDateString()
  ) {

    return "Yesterday";

  }

  return date.toLocaleDateString(
    undefined,
    {
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );

}


// ======================================================
// STUDENT
// ======================================================

function loadStudent() {

  const studentName =
    localStorage.getItem(
      "studentName"
    )
    || "Student";

  if (topStudentName) {

    topStudentName.textContent =
      studentName;

  }

  if (topAvatar) {

    topAvatar.textContent =
      createInitials(
        studentName
      );

  }

}


// ======================================================
// DEFAULT CONVERSATIONS
// ======================================================

function createDefaultMessageState() {

  const now =
    Date.now();

  return {

    version: 1,

    conversations: [

      {

        id:
          "conversation-web-development",

        participant:
          "Ms. Andrea Reyes",

        role:
          "Web Development Instructor",

        courseId:
          "web-development",

        initials:
          "AR",

        unread:
          1,

        messages: [

          {

            id:
              "web-message-1",

            sender:
              "teacher",

            text:
              "Hi! Welcome to Web Development. Feel free to message me whenever you have questions about HTML, CSS, or JavaScript.",

            createdAt:
              new Date(
                now -
                2 * 24 * 60 * 60 * 1000
              ).toISOString()

          },

          {

            id:
              "web-message-2",

            sender:
              "student",

            text:
              "Thank you! I'm currently working through the CSS lessons.",

            createdAt:
              new Date(
                now -
                26 * 60 * 60 * 1000
              ).toISOString()

          },

          {

            id:
              "web-message-3",

            sender:
              "teacher",

            text:
              "Great. Pay special attention to Flexbox because you'll use it in the Responsive Website Project.",

            createdAt:
              new Date(
                now -
                3 * 60 * 60 * 1000
              ).toISOString()

          }

        ]

      },


      {

        id:
          "conversation-mathematics",

        participant:
          "Dr. Marco Santos",

        role:
          "Mathematics Instructor",

        courseId:
          "mathematics",

        initials:
          "MS",

        unread:
          0,

        messages: [

          {

            id:
              "math-message-1",

            sender:
              "teacher",

            text:
              "Remember to show your complete solution process in the Calculus Problem Set.",

            createdAt:
              new Date(
                now -
                20 * 60 * 60 * 1000
              ).toISOString()

          }

        ]

      },


      {

        id:
          "conversation-ui-ux",

        participant:
          "Ms. Claire Lim",

        role:
          "UI/UX Design Instructor",

        courseId:
          "ui-ux",

        initials:
          "CL",

        unread:
          2,

        messages: [

          {

            id:
              "design-message-1",

            sender:
              "teacher",

            text:
              "For your Mobile App Wireframe, focus on the user flow before adding visual details.",

            createdAt:
              new Date(
                now -
                7 * 60 * 60 * 1000
              ).toISOString()

          },

          {

            id:
              "design-message-2",

            sender:
              "teacher",

            text:
              "Five clear screens with consistent navigation will be enough for the first version.",

            createdAt:
              new Date(
                now -
                6.5 * 60 * 60 * 1000
              ).toISOString()

          }

        ]

      },


      {

        id:
          "conversation-support",

        participant:
          "EduSpace Support",

        role:
          "Student Support",

        courseId:
          null,

        initials:
          "ES",

        unread:
          0,

        messages: [

          {

            id:
              "support-message-1",

            sender:
              "teacher",

            text:
              "Welcome to EduSpace. Contact Student Support here if you experience account or portal issues.",

            createdAt:
              new Date(
                now -
                5 * 24 * 60 * 60 * 1000
              ).toISOString()

          }

        ]

      }

    ]

  };

}


// ======================================================
// LOAD STATE
// ======================================================

function getMessageState() {

  const raw =
    localStorage.getItem(
      MESSAGE_STORAGE_KEY
    );

  const parsed =
    safeParse(
      raw,
      null
    );

  if (
    parsed &&
    Array.isArray(
      parsed.conversations
    )
  ) {

    return parsed;

  }

  const defaults =
    createDefaultMessageState();

  saveMessageState(
    defaults
  );

  return defaults;

}


// ======================================================
// SAVE STATE
// ======================================================

function saveMessageState(
  state
) {

  localStorage.setItem(
    MESSAGE_STORAGE_KEY,
    JSON.stringify(
      state
    )
  );

}


// ======================================================
// FIND CONVERSATION
// ======================================================

function getConversation(
  conversationId
) {

  const state =
    getMessageState();

  return (
    state.conversations.find(
      conversation =>
        conversation.id ===
        conversationId
    )
    || null
  );

}


// ======================================================
// LAST MESSAGE
// ======================================================

function getLastMessage(
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
// TOTAL UNREAD
// ======================================================

function getTotalUnread() {

  const state =
    getMessageState();

  return state.conversations
    .reduce(
      (
        total,
        conversation
      ) =>
        total +
        Number(
          conversation.unread || 0
        ),
      0
    );

}


// ======================================================
// UPDATE UNREAD UI
// ======================================================

function updateUnreadUI() {

  const unread =
    getTotalUnread();


  if (
    conversationUnreadCount
  ) {

    conversationUnreadCount
      .textContent =
        `${unread} ${
          unread === 1
            ? "unread"
            : "unread"
        }`;

  }


  if (
    sidebarMessageCount
  ) {

    sidebarMessageCount.textContent =
      unread > 9
        ? "9+"
        : unread;

    sidebarMessageCount
      .classList.toggle(
        "show",
        unread > 0
      );

  }

}


// ======================================================
// RENDER CONVERSATIONS
// ======================================================

function renderConversations() {

  const state =
    getMessageState();

  const query =
    conversationSearch
      ? conversationSearch.value
          .trim()
          .toLowerCase()
      : "";


  let conversations =
    [...state.conversations];


  conversations.sort(
    (
      first,
      second
    ) => {

      const firstLast =
        getLastMessage(
          first
        );

      const secondLast =
        getLastMessage(
          second
        );

      const firstTime =
        firstLast
          ? new Date(
              firstLast.createdAt
            ).getTime()
          : 0;

      const secondTime =
        secondLast
          ? new Date(
              secondLast.createdAt
            ).getTime()
          : 0;

      return (
        secondTime -
        firstTime
      );

    }
  );


  conversations =
    conversations.filter(
      conversation => {

        if (
          currentFilter ===
          "unread"
          &&
          Number(
            conversation.unread || 0
          ) <= 0
        ) {

          return false;

        }


        const searchable =
          [
            conversation.participant,
            conversation.role,
            getCourseTitle(
              conversation.courseId
            ),
            getLastMessage(
              conversation
            )?.text
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


        return searchable.includes(
          query
        );

      }
    );


  conversationList.innerHTML =
    "";


  conversationEmpty
    .classList.toggle(
      "show",
      conversations.length === 0
    );


  conversations.forEach(
    conversation => {


      const lastMessage =
        getLastMessage(
          conversation
        );


      const item =
        document.createElement(
          "button"
        );

      item.type =
        "button";

      item.className =
        "conversation-item";


      if (
        activeConversationId ===
        conversation.id
      ) {

        item.classList.add(
          "active"
        );

      }


      const avatar =
        document.createElement(
          "div"
        );

      avatar.className =
        "conversation-avatar";

      avatar.textContent =
        conversation.initials
        ||
        createInitials(
          conversation.participant
        );


      const main =
        document.createElement(
          "div"
        );

      main.className =
        "conversation-main";


      const top =
        document.createElement(
          "div"
        );

      top.className =
        "conversation-top";


      const name =
        document.createElement(
          "strong"
        );

      name.textContent =
        conversation.participant;


      const time =
        document.createElement(
          "span"
        );

      time.className =
        "conversation-time";

      time.textContent =
        lastMessage
          ? formatConversationTime(
              lastMessage.createdAt
            )
          : "";


      top.append(
        name,
        time
      );


      const course =
        document.createElement(
          "span"
        );

      course.className =
        "conversation-course";

      course.textContent =
        conversation.courseId
          ? getCourseTitle(
              conversation.courseId
            )
          : conversation.role;


      const bottom =
        document.createElement(
          "div"
        );

      bottom.className =
        "conversation-bottom";


      const preview =
        document.createElement(
          "span"
        );

      preview.className =
        "conversation-preview";

      preview.textContent =
        lastMessage
          ? `${
              lastMessage.sender ===
              "student"
                ? "You: "
                : ""
            }${lastMessage.text || (
              lastMessage.attachment
                ? "Attachment"
                : ""
            )}`
          : "No messages yet";


      bottom.appendChild(
        preview
      );


      if (
        Number(
          conversation.unread || 0
        ) > 0
      ) {

        const badge =
          document.createElement(
            "span"
          );

        badge.className =
          "unread-badge";

        badge.textContent =
          conversation.unread > 9
            ? "9+"
            : conversation.unread;

        bottom.appendChild(
          badge
        );

      }


      main.append(
        top,
        course,
        bottom
      );


      item.append(
        avatar,
        main
      );


      item.addEventListener(
        "click",
        () => {

          openConversation(
            conversation.id
          );

        }
      );


      conversationList
        .appendChild(
          item
        );

    }
  );


  updateUnreadUI();

}


// ======================================================
// MARK CONVERSATION READ
// ======================================================

function markConversationRead(
  conversationId
) {

  const state =
    getMessageState();


  const conversation =
    state.conversations.find(
      item =>
        item.id ===
        conversationId
    );


  if (!conversation) {
    return;
  }


  if (
    Number(
      conversation.unread || 0
    ) === 0
  ) {

    return;

  }


  conversation.unread =
    0;


  saveMessageState(
    state
  );

}


// ======================================================
// OPEN CONVERSATION
// ======================================================

function openConversation(
  conversationId
) {

  const conversation =
    getConversation(
      conversationId
    );


  if (!conversation) {
    return;
  }


  activeConversationId =
    conversationId;


  markConversationRead(
    conversationId
  );


  chatEmpty.classList.add(
    "hidden"
  );

  activeChat.classList.add(
    "show"
  );


  chatAvatar.textContent =
    conversation.initials
    ||
    createInitials(
      conversation.participant
    );


  chatName.textContent =
    conversation.participant;


  chatMeta.textContent =
    conversation.courseId
      ? `${
          getCourseTitle(
            conversation.courseId
          )
        } • ${conversation.role}`
      : conversation.role;


  renderMessages();

  renderConversations();


  if (
    window.innerWidth <= 900
  ) {

    messageApp.classList.add(
      "mobile-chat-open"
    );

  }


  setTimeout(
    () => {

      messageInput.focus();

    },
    100
  );

}


// ======================================================
// RENDER MESSAGES
// ======================================================

function renderMessages() {

  if (!activeConversationId) {
    return;
  }


  const conversation =
    getConversation(
      activeConversationId
    );


  if (!conversation) {
    return;
  }


  chatMessages.innerHTML =
    "";


  let lastDateLabel =
    null;


  conversation.messages.forEach(
    message => {


      const dateLabel =
        formatDateLabel(
          message.createdAt
        );


      if (
        dateLabel !==
        lastDateLabel
      ) {

        const date =
          document.createElement(
            "div"
          );

        date.className =
          "message-date";

        date.textContent =
          dateLabel;

        chatMessages.appendChild(
          date
        );

        lastDateLabel =
          dateLabel;

      }


      const row =
        document.createElement(
          "div"
        );

      row.className =
        "message-row";


      if (
        message.sender ===
        "student"
      ) {

        row.classList.add(
          "student"
        );

      }


      if (
        message.sender !==
        "student"
      ) {

        const avatar =
          document.createElement(
            "div"
          );

        avatar.className =
          "message-mini-avatar";

        avatar.textContent =
          conversation.initials
          ||
          createInitials(
            conversation.participant
          );

        row.appendChild(
          avatar
        );

      }


      const wrapper =
        document.createElement(
          "div"
        );

      wrapper.className =
        "message-bubble-wrapper";


      const bubble =
        document.createElement(
          "div"
        );

      bubble.className =
        "message-bubble";


      if (
        message.text
      ) {

        const text =
          document.createElement(
            "div"
          );

        text.textContent =
          message.text;

        bubble.appendChild(
          text
        );

      }


      if (
        message.attachment
      ) {

        const attachment =
          document.createElement(
            "div"
          );

        attachment.className =
          "message-attachment";


        const icon =
          document.createElement(
            "span"
          );

        icon.className =
          "message-attachment-icon";

        icon.textContent =
          "📎";


        const info =
          document.createElement(
            "div"
          );

        info.className =
          "message-attachment-info";


        const name =
          document.createElement(
            "strong"
          );

        name.textContent =
          message.attachment.name;


        const size =
          document.createElement(
            "span"
          );

        size.textContent =
          formatFileSize(
            message.attachment.size
          );


        info.append(
          name,
          size
        );


        attachment.append(
          icon,
          info
        );


        bubble.appendChild(
          attachment
        );

      }


      const time =
        document.createElement(
          "span"
        );

      time.className =
        "message-time";

      time.textContent =
        formatMessageTime(
          message.createdAt
        );


      wrapper.append(
        bubble,
        time
      );


      row.appendChild(
        wrapper
      );


      chatMessages.appendChild(
        row
      );

    }
  );


  requestAnimationFrame(
    () => {

      chatMessages.scrollTop =
        chatMessages.scrollHeight;

    }
  );

}


// ======================================================
// SEND MESSAGE
// ======================================================

function sendMessage() {

  if (!activeConversationId) {
    return;
  }


  const text =
    messageInput.value
      .trim();


  if (
    !text &&
    !selectedFile
  ) {

    return;

  }


  const state =
    getMessageState();


  const conversation =
    state.conversations.find(
      item =>
        item.id ===
        activeConversationId
    );


  if (!conversation) {
    return;
  }


  const message = {

    id:
      generateId(
        "message"
      ),

    sender:
      "student",

    text,

    createdAt:
      new Date()
        .toISOString()

  };


  if (
    selectedFile
  ) {

    message.attachment = {

      name:
        selectedFile.name,

      size:
        selectedFile.size,

      type:
        selectedFile.type

    };

  }


  conversation.messages.push(
    message
  );


  conversation.unread =
    0;


  saveMessageState(
    state
  );


  messageInput.value =
    "";

  autoResizeTextarea();

  clearSelectedFile();

  renderMessages();

  renderConversations();

}


// ======================================================
// ATTACHMENT
// ======================================================

function selectAttachment(
  file
) {

  if (!file) {
    return;
  }


  const maxSize =
    10 *
    1024 *
    1024;


  if (
    file.size >
    maxSize
  ) {

    showToast(
      "File must be 10 MB or smaller."
    );

    messageFile.value =
      "";

    return;

  }


  selectedFile =
    file;


  attachmentName.textContent =
    file.name;

  attachmentSize.textContent =
    formatFileSize(
      file.size
    );


  attachmentPreview
    .classList.add(
      "show"
    );

}


// ======================================================
// CLEAR ATTACHMENT
// ======================================================

function clearSelectedFile() {

  selectedFile =
    null;

  messageFile.value =
    "";

  attachmentPreview
    .classList.remove(
      "show"
    );

}


// ======================================================
// TEXTAREA
// ======================================================

function autoResizeTextarea() {

  messageInput.style.height =
    "auto";

  messageInput.style.height =
    `${Math.min(
      messageInput.scrollHeight,
      130
    )}px`;

}


// ======================================================
// FILTER
// ======================================================

function setMessageFilter(
  filter
) {

  currentFilter =
    filter;


  messageFilters.forEach(
    button => {

      button.classList.toggle(
        "active",
        button.dataset.messageFilter
        === filter
      );

    }
  );


  renderConversations();

}


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


// ======================================================
// MOBILE CHAT
// ======================================================

function closeMobileChat() {

  messageApp.classList.remove(
    "mobile-chat-open"
  );

}


// ======================================================
// TOAST
// ======================================================

function showToast(message) {

  messageToast.textContent =
    message;

  messageToast.classList.add(
    "show"
  );

  clearTimeout(
    toastTimer
  );

  toastTimer =
    setTimeout(
      () => {

        messageToast
          .classList.remove(
            "show"
          );

      },
      2200
    );

}


// ======================================================
// EVENTS
// ======================================================

function setupEvents() {


  // SEARCH

  conversationSearch
    .addEventListener(
      "input",
      renderConversations
    );


  // FILTERS

  messageFilters.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          setMessageFilter(
            button.dataset.messageFilter
          );

        }
      );

    }
  );


  // SEND

  messageForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      sendMessage();

    }
  );


  // ENTER TO SEND

  messageInput.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        sendMessage();

      }

    }
  );


  messageInput.addEventListener(
    "input",
    autoResizeTextarea
  );


  // ATTACHMENT

  attachButton.addEventListener(
    "click",
    () => {

      messageFile.click();

    }
  );


  messageFile.addEventListener(
    "change",
    () => {

      selectAttachment(
        messageFile.files[0]
      );

    }
  );


  removeAttachmentButton
    .addEventListener(
      "click",
      clearSelectedFile
    );


  // MOBILE CHAT BACK

  chatBackButton
    .addEventListener(
      "click",
      closeMobileChat
    );


  // MOBILE NAV

  menuButton.addEventListener(
    "click",
    openSidebar
  );


  mobileOverlay.addEventListener(
    "click",
    closeSidebar
  );


  // ESCAPE

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !==
        "Escape"
      ) {
        return;
      }

      closeSidebar();

      closeMobileChat();

    }
  );


  // RESIZE

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 900
      ) {

        closeSidebar();

        messageApp
          .classList.remove(
            "mobile-chat-open"
          );

      }

    }
  );

}


// ======================================================
// OPEN FROM URL
// ======================================================

function openConversationFromURL() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const conversationId =
    params.get(
      "conversation"
    );


  if (!conversationId) {
    return;
  }


  if (
    getConversation(
      conversationId
    )
  ) {

    openConversation(
      conversationId
    );

  }

}


// ======================================================
// INITIALIZE
// ======================================================

function initializeMessages() {

  loadStudent();

  getMessageState();

  setupEvents();

  renderConversations();

  openConversationFromURL();

}


// ======================================================
// START
// ======================================================

initializeMessages();