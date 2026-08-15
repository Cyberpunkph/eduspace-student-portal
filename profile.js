// ==========================================
// LOGIN PROTECTION
// ==========================================

if (
  localStorage.getItem(
    "studentLoggedIn"
  ) !== "true"
) {

  window.location.href =
    "index.html";

}


// ==========================================
// COURSE DATA
// ==========================================

const courses = {

  "web-development": {
    totalLessons: 4,

    lessonIds: [
      "html-introduction",
      "css-fundamentals",
      "flexbox-layout",
      "javascript-introduction"
    ]
  },

  "mathematics": {
    totalLessons: 3,

    lessonIds: [
      "algebra-basics",
      "linear-equations",
      "calculus-introduction"
    ]
  },

  "ui-ux": {
    totalLessons: 3,

    lessonIds: [
      "ui-ux-introduction",
      "wireframing",
      "color-typography"
    ]
  }

};


// ==========================================
// ELEMENTS
// ==========================================

const profileAvatar =
  document.getElementById(
    "profileAvatar"
  );


const heroStudentName =
  document.getElementById(
    "heroStudentName"
  );


const heroProgram =
  document.getElementById(
    "heroProgram"
  );


const heroEmail =
  document.getElementById(
    "heroEmail"
  );


const fullName =
  document.getElementById(
    "fullName"
  );


const email =
  document.getElementById(
    "email"
  );


const phone =
  document.getElementById(
    "phone"
  );


const birthDate =
  document.getElementById(
    "birthDate"
  );


const studentId =
  document.getElementById(
    "studentId"
  );


const program =
  document.getElementById(
    "program"
  );


const yearLevel =
  document.getElementById(
    "yearLevel"
  );


const school =
  document.getElementById(
    "school"
  );


const editProfileButton =
  document.getElementById(
    "editProfileButton"
  );


const editActions =
  document.getElementById(
    "editActions"
  );


const cancelButton =
  document.getElementById(
    "cancelButton"
  );


const saveButton =
  document.getElementById(
    "saveButton"
  );


const completionRing =
  document.getElementById(
    "completionRing"
  );


const completionValue =
  document.getElementById(
    "completionValue"
  );


const completionMessage =
  document.getElementById(
    "completionMessage"
  );


const lessonsCompleted =
  document.getElementById(
    "lessonsCompleted"
  );


const overallProgress =
  document.getElementById(
    "overallProgress"
  );


const quizAverage =
  document.getElementById(
    "quizAverage"
  );


const studentCardAvatar =
  document.getElementById(
    "studentCardAvatar"
  );


const studentCardName =
  document.getElementById(
    "studentCardName"
  );


const studentCardProgram =
  document.getElementById(
    "studentCardProgram"
  );


const studentCardId =
  document.getElementById(
    "studentCardId"
  );


const saveToast =
  document.getElementById(
    "saveToast"
  );


  // ======================================================
// PROFILE PHOTO DOM
// ======================================================

const profilePhotoInput =
  document.getElementById(
    "profilePhotoInput"
  );


const changePhotoButton =
  document.getElementById(
    "changePhotoButton"
  );


const removePhotoButton =
  document.getElementById(
    "removePhotoButton"
  );


const profilePhotoMessage =
  document.getElementById(
    "profilePhotoMessage"
  );


  // ======================================================
// PROFILE PHOTO MESSAGE
// ======================================================

let profilePhotoMessageTimer =
  null;


function showProfilePhotoMessage(
  message,
  type = "success"
) {

  if (!profilePhotoMessage) {
    return;
  }


  profilePhotoMessage.textContent =
    message;


  profilePhotoMessage.className =
    `profile-photo-message show ${type}`;


  clearTimeout(
    profilePhotoMessageTimer
  );


  profilePhotoMessageTimer =
    setTimeout(
      () => {

        profilePhotoMessage.className =
          "profile-photo-message";


        profilePhotoMessage.textContent =
          "";

      },
      3000
    );

}


// ======================================================
// UPDATE PHOTO CONTROLS
// ======================================================

function updateProfilePhotoControls() {

  if (!removePhotoButton) {
    return;
  }


  const hasPhoto =
    Boolean(
      localStorage.getItem(
        "eduspace-profile-photo-v1"
      )
    );


  removePhotoButton.disabled =
    !hasPhoto;


  changePhotoButton.textContent =
    hasPhoto
      ? "📷 Change Photo"
      : "📷 Upload Photo";


  if (
    window.EduSpaceAvatar
  ) {

    window.EduSpaceAvatar
      .refresh();

  }

}


// ======================================================
// LOAD IMAGE FILE
// ======================================================

function loadImageFromFile(
  file
) {

  return new Promise(
    (
      resolve,
      reject
    ) => {


      const reader =
        new FileReader();


      reader.onload =
        () => {


          const image =
            new Image();


          image.onload =
            () => {

              resolve(
                image
              );

            };


          image.onerror =
            () => {

              reject(
                new Error(
                  "Unable to read this image."
                )
              );

            };


          image.src =
            reader.result;

        };


      reader.onerror =
        () => {

          reject(
            new Error(
              "Unable to read this file."
            )
          );

        };


      reader.readAsDataURL(
        file
      );

    }
  );

}


// ======================================================
// CREATE SMALL PROFILE PHOTO
// ======================================================

async function createProfilePhoto(
  file
) {

  const image =
    await loadImageFromFile(
      file
    );


  const sourceWidth =
    image.naturalWidth;


  const sourceHeight =
    image.naturalHeight;


  if (
    !sourceWidth ||
    !sourceHeight
  ) {

    throw new Error(
      "The selected image is invalid."
    );

  }


  // CENTER SQUARE CROP

  const cropSize =
    Math.min(
      sourceWidth,
      sourceHeight
    );


  const sourceX =
    (
      sourceWidth -
      cropSize
    )
    / 2;


  const sourceY =
    (
      sourceHeight -
      cropSize
    )
    / 2;


  // SMALL VERSION FOR LOCALSTORAGE

  const outputSize =
    320;


  const canvas =
    document.createElement(
      "canvas"
    );


  canvas.width =
    outputSize;


  canvas.height =
    outputSize;


  const context =
    canvas.getContext(
      "2d"
    );


  if (!context) {

    throw new Error(
      "Your browser could not process this image."
    );

  }


  // WHITE BACKGROUND FOR TRANSPARENT PNG

  context.fillStyle =
    "#ffffff";


  context.fillRect(
    0,
    0,
    outputSize,
    outputSize
  );


  context.drawImage(

    image,

    sourceX,
    sourceY,

    cropSize,
    cropSize,

    0,
    0,

    outputSize,
    outputSize

  );


  return canvas.toDataURL(
    "image/jpeg",
    0.82
  );

}


// ======================================================
// HANDLE PROFILE PHOTO
// ======================================================

async function handleProfilePhoto(
  file
) {

  if (!file) {
    return;
  }


  const allowedTypes = [

    "image/jpeg",

    "image/png",

    "image/webp"

  ];


  if (
    !allowedTypes.includes(
      file.type
    )
  ) {

    showProfilePhotoMessage(
      "Please choose a JPG, PNG or WebP image.",
      "error"
    );


    return;

  }


  const maximumSize =
    8 * 1024 * 1024;


  if (
    file.size >
    maximumSize
  ) {

    showProfilePhotoMessage(
      "The image is too large. Maximum size is 8 MB.",
      "error"
    );


    return;

  }


  changePhotoButton.disabled =
    true;


  changePhotoButton.textContent =
    "Processing...";


  try {

    const dataURL =
      await createProfilePhoto(
        file
      );


    let saved =
      false;


    if (
      window.EduSpaceAvatar
    ) {

      saved =
        window.EduSpaceAvatar
          .savePhoto(
            dataURL
          );

    }

    else {

      try {

        localStorage.setItem(
          "eduspace-profile-photo-v1",
          dataURL
        );


        saved =
          true;

      }

      catch {

        saved =
          false;

      }

    }


    if (!saved) {

      throw new Error(
        "The photo could not be saved."
      );

    }


    updateProfilePhotoControls();


    showProfilePhotoMessage(
      "Profile photo updated successfully.",
      "success"
    );

  }

  catch (error) {

    console.error(
      error
    );


    showProfilePhotoMessage(
      error.message
      ||
      "Unable to update profile photo.",
      "error"
    );

  }

  finally {

    changePhotoButton.disabled =
      false;


    updateProfilePhotoControls();


    profilePhotoInput.value =
      "";

  }

}


// ======================================================
// REMOVE PROFILE PHOTO
// ======================================================

function removeProfilePhoto() {

  if (
    window.EduSpaceAvatar
  ) {

    window.EduSpaceAvatar
      .removePhoto();

  }

  else {

    localStorage.removeItem(
      "eduspace-profile-photo-v1"
    );

  }


  updateProfilePhotoControls();


  showProfilePhotoMessage(
    "Profile photo removed.",
    "success"
  );

}


// ======================================================
// PROFILE PHOTO EVENTS
// ======================================================

function initializeProfile() {

  loadProfile();

  setupEvents();

  setupProfilePhoto();

  updateProfileCompletion();

}


// ==========================================
// INPUTS
// ==========================================

const editableFields = [

  fullName,

  email,

  phone,

  birthDate,

  studentId,

  program,

  yearLevel,

  school

];


// ==========================================
// DEFAULT PROFILE
// ==========================================

const defaultProfile = {

  phone: "",

  birthDate: "",

  studentId:
    "2026-00124",

  program:
    "Computer Science",

  yearLevel:
    "Year 2",

  school:
    "EduSpace Academy"

};


// ==========================================
// LOAD PROFILE DATA
// ==========================================

function getProfileData() {

  const savedProfile =
    localStorage.getItem(
      "studentProfile"
    );


  let profile = {};


  if (savedProfile) {

    try {

      profile =
        JSON.parse(
          savedProfile
        );

    } catch {

      profile = {};

    }

  }


  return {

    fullName:
      localStorage.getItem(
        "studentName"
      ) || "Student",

    email:
      localStorage.getItem(
        "studentEmail"
      ) || "student@email.com",

    phone:
      profile.phone
      || defaultProfile.phone,

    birthDate:
      profile.birthDate
      || defaultProfile.birthDate,

    studentId:
      profile.studentId
      || defaultProfile.studentId,

    program:
      profile.program
      || defaultProfile.program,

    yearLevel:
      profile.yearLevel
      || defaultProfile.yearLevel,

    school:
      profile.school
      || defaultProfile.school

  };

}


// ==========================================
// CREATE INITIALS
// ==========================================

function createInitials(name) {

  return name
    .split(" ")
    .filter(Boolean)
    .map(
      word =>
        word.charAt(0)
    )
    .join("")
    .substring(0, 2)
    .toUpperCase();

}


// ==========================================
// DISPLAY PROFILE
// ==========================================

function displayProfile() {

  const profile =
    getProfileData();


  fullName.value =
    profile.fullName;


  email.value =
    profile.email;


  phone.value =
    profile.phone;


  birthDate.value =
    profile.birthDate;


  studentId.value =
    profile.studentId;


  program.value =
    profile.program;


  yearLevel.value =
    profile.yearLevel;


  school.value =
    profile.school;


  heroStudentName.textContent =
    profile.fullName;


  heroEmail.textContent =
    profile.email;


  heroProgram.textContent =
    `${profile.program} • ${profile.yearLevel}`;


  const initials =
    createInitials(
      profile.fullName
    );


  profileAvatar.textContent =
    initials;


  studentCardAvatar.textContent =
    initials;


  studentCardName.textContent =
    profile.fullName;


  studentCardProgram.textContent =
    profile.program;


  studentCardId.textContent =
    profile.studentId;


  updateProfileCompletion();

}


// ==========================================
// EDIT MODE
// ==========================================

function setEditMode(enabled) {

  editableFields.forEach(
    field => {

      field.disabled =
        !enabled;

    }
  );


  editActions.classList.toggle(
    "show",
    enabled
  );


  editProfileButton.style.display =
    enabled
      ? "none"
      : "block";

}


editProfileButton.addEventListener(
  "click",
  () => {

    setEditMode(true);

    fullName.focus();

  }
);


cancelButton.addEventListener(
  "click",
  () => {

    displayProfile();

    setEditMode(false);

  }
);


// ==========================================
// SAVE PROFILE
// ==========================================

saveButton.addEventListener(
  "click",
  () => {

    const updatedName =
      fullName.value.trim();


    const updatedEmail =
      email.value.trim();


    if (!updatedName) {

      alert(
        "Please enter your full name."
      );

      return;

    }


    if (!updatedEmail) {

      alert(
        "Please enter your email."
      );

      return;

    }


    localStorage.setItem(
      "studentName",
      updatedName
    );


    localStorage.setItem(
      "studentEmail",
      updatedEmail
    );


    const profileData = {

      phone:
        phone.value.trim(),

      birthDate:
        birthDate.value,

      studentId:
        studentId.value.trim(),

      program:
        program.value.trim(),

      yearLevel:
        yearLevel.value,

      school:
        school.value.trim()

    };


    localStorage.setItem(
      "studentProfile",
      JSON.stringify(
        profileData
      )
    );


    displayProfile();

    setEditMode(false);

    showSaveToast();

  }
);


// ==========================================
// PROFILE COMPLETION
// ==========================================

function updateProfileCompletion() {

  const profile =
    getProfileData();


  const values = [

    profile.fullName,

    profile.email,

    profile.phone,

    profile.birthDate,

    profile.studentId,

    profile.program,

    profile.yearLevel,

    profile.school

  ];


  const completed =
    values.filter(
      value =>
        value
        &&
        value.trim() !== ""
    ).length;


  const percentage =
    Math.round(
      (
        completed
        /
        values.length
      )
      * 100
    );


  completionValue.textContent =
    `${percentage}%`;


  const degrees =
    percentage * 3.6;


  completionRing.style.background =
    `conic-gradient(
      #6874db 0deg ${degrees}deg,
      #eceef5 ${degrees}deg 360deg
    )`;


  if (percentage === 100) {

    completionMessage.textContent =
      "Your profile is complete.";

  }

  else {

    completionMessage.textContent =
      "Add your missing information to complete your profile.";

  }

}


// ==========================================
// COMPLETED LESSONS
// ==========================================

function getCompletedLessons() {

  let total = 0;


  Object.keys(
    courses
  ).forEach(
    courseId => {

      const stored =
        localStorage.getItem(
          `completed-${courseId}`
        );


      if (!stored) {

        return;

      }


      try {

        const parsed =
          JSON.parse(
            stored
          );


        if (
          Array.isArray(parsed)
        ) {

          total +=
            parsed.length;

        }

      } catch {

        // Ignore invalid data.

      }

    }
  );


  return total;

}


// ==========================================
// TOTAL LESSONS
// ==========================================

function getTotalLessons() {

  return Object.values(
    courses
  ).reduce(
    (
      total,
      course
    ) => {

      return (
        total
        +
        course.totalLessons
      );

    },
    0
  );

}


// ==========================================
// QUIZ AVERAGE
// ==========================================

function getQuizAverage() {

  const scores = [];


  Object.entries(
    courses
  ).forEach(
    (
      [
        courseId,
        course
      ]
    ) => {


      course.lessonIds.forEach(
        lessonId => {

          const score =
            localStorage.getItem(
              `quiz-${courseId}-${lessonId}`
            );


          if (
            score !== null
          ) {

            const number =
              Number(score);


            if (
              !Number.isNaN(
                number
              )
            ) {

              scores.push(
                number
              );

            }

          }

        }
      );

    }
  );


  if (
    scores.length === 0
  ) {

    return 0;

  }


  const total =
    scores.reduce(
      (
        sum,
        score
      ) =>
        sum + score,
      0
    );


  return Math.round(
    total
    /
    scores.length
  );

}


// ==========================================
// ACADEMIC SUMMARY
// ==========================================

function updateAcademicSummary() {

  const completed =
    getCompletedLessons();


  const total =
    getTotalLessons();


  const progress =
    total === 0
      ? 0
      : Math.round(
          (
            completed
            /
            total
          )
          * 100
        );


  lessonsCompleted.textContent =
    completed;


  overallProgress.textContent =
    `${progress}%`;


  quizAverage.textContent =
    `${getQuizAverage()}%`;

}


// ==========================================
// SAVE TOAST
// ==========================================

function showSaveToast() {

  saveToast.classList.add(
    "show"
  );


  setTimeout(
    () => {

      saveToast.classList.remove(
        "show"
      );

    },
    2200
  );

}


// ==========================================
// INITIALIZE
// ==========================================

displayProfile();

updateAcademicSummary();

setEditMode(false);