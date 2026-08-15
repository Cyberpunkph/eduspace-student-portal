// ======================================================
// EDUSPACE SHARED PROFILE PHOTO
// ======================================================

(() => {

  const PROFILE_PHOTO_KEY =
    "eduspace-profile-photo-v1";


  // ====================================================
  // INITIALS
  // ====================================================

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


  // ====================================================
  // GET STUDENT NAME
  // ====================================================

  function getStudentName() {

    return (
      localStorage.getItem(
        "studentName"
      )
      ||
      "Student"
    );

  }


  // ====================================================
  // GET PHOTO
  // ====================================================

  function getPhoto() {

    return (
      localStorage.getItem(
        PROFILE_PHOTO_KEY
      )
      ||
      ""
    );

  }


  // ====================================================
  // FIND AVATARS
  // ====================================================

  function getAvatarElements() {

    const selectors = [

      "[data-student-avatar]",

      "#topAvatar",

      "#dropdownAvatar",

      "#studentAvatar",

      "#profileAvatar",

      "#profilePhotoPreview",

      ".student-avatar"

    ];


    return Array.from(
      document.querySelectorAll(
        selectors.join(",")
      )
    )
      .filter(
        (
          element,
          index,
          array
        ) =>
          array.indexOf(
            element
          ) === index
      );

  }


  // ====================================================
  // APPLY AVATAR
  // ====================================================

  function applyAvatarToElement(
    element,
    photo,
    initials
  ) {

    if (!element) {
      return;
    }


    if (photo) {

      element.textContent =
        "";


      element.style.backgroundImage =
        `url("${photo}")`;


      element.style.backgroundSize =
        "cover";


      element.style.backgroundPosition =
        "center";


      element.style.backgroundRepeat =
        "no-repeat";


      element.classList.add(
        "has-profile-photo"
      );


      element.setAttribute(
        "aria-label",
        "Student profile photo"
      );


      return;

    }


    element.style.removeProperty(
      "background-image"
    );


    element.style.removeProperty(
      "background-size"
    );


    element.style.removeProperty(
      "background-position"
    );


    element.style.removeProperty(
      "background-repeat"
    );


    element.classList.remove(
      "has-profile-photo"
    );


    element.textContent =
      initials;


    element.setAttribute(
      "aria-label",
      `${getStudentName()} avatar`
    );

  }


  // ====================================================
  // REFRESH ALL
  // ====================================================

  function refresh() {

    const photo =
      getPhoto();


    const initials =
      createInitials(
        getStudentName()
      );


    getAvatarElements()
      .forEach(
        element => {

          applyAvatarToElement(
            element,
            photo,
            initials
          );

        }
      );

  }


  // ====================================================
  // SAVE PHOTO
  // ====================================================

  function savePhoto(
    dataURL
  ) {

    if (
      typeof dataURL !== "string"
      ||
      !dataURL.startsWith(
        "data:image/"
      )
    ) {

      return false;

    }


    try {

      localStorage.setItem(
        PROFILE_PHOTO_KEY,
        dataURL
      );

    }

    catch (error) {

      console.error(
        "Unable to save profile photo:",
        error
      );


      return false;

    }


    refresh();


    window.dispatchEvent(
      new CustomEvent(
        "eduspace-avatar-change",
        {
          detail: {
            hasPhoto:
              true
          }
        }
      )
    );


    return true;

  }


  // ====================================================
  // REMOVE PHOTO
  // ====================================================

  function removePhoto() {

    localStorage.removeItem(
      PROFILE_PHOTO_KEY
    );


    refresh();


    window.dispatchEvent(
      new CustomEvent(
        "eduspace-avatar-change",
        {
          detail: {
            hasPhoto:
              false
          }
        }
      )
    );

  }


  // ====================================================
  // CHECK PHOTO
  // ====================================================

  function hasPhoto() {

    return Boolean(
      getPhoto()
    );

  }


  // ====================================================
  // PUBLIC API
  // ====================================================

  window.EduSpaceAvatar = {

    PROFILE_PHOTO_KEY,

    createInitials,

    getPhoto,

    savePhoto,

    removePhoto,

    hasPhoto,

    refresh

  };


  // ====================================================
  // INITIAL APPLY
  // ====================================================

  refresh();


  // ====================================================
  // RETURNING TO PAGE
  // ====================================================

  window.addEventListener(
    "pageshow",
    refresh
  );


  // ====================================================
  // TAB RETURNS
  // ====================================================

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.visibilityState ===
        "visible"
      ) {

        refresh();

      }

    }
  );


  // ====================================================
  // ANOTHER TAB CHANGED PHOTO
  // ====================================================

  window.addEventListener(
    "storage",
    event => {

      if (
        event.key ===
          PROFILE_PHOTO_KEY
        ||
        event.key ===
          "studentName"
      ) {

        refresh();

      }

    }
  );


})();