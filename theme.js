// ======================================================
// EDUSPACE GLOBAL THEME SYSTEM
// ======================================================

(function () {

  const STORAGE_KEY =
    "eduspace-theme";


  const allowedThemes = [
    "light",
    "dark",
    "system"
  ];


  // ====================================================
  // GET SAVED PREFERENCE
  // ====================================================

  function getPreference() {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (
      allowedThemes.includes(
        saved
      )
    ) {

      return saved;

    }


    return "system";

  }


  // ====================================================
  // GET SYSTEM THEME
  // ====================================================

  function getSystemTheme() {

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";

  }


  // ====================================================
  // RESOLVE REAL THEME
  // ====================================================

  function resolveTheme(
    preference
  ) {

    if (
      preference === "system"
    ) {

      return getSystemTheme();

    }


    return preference;

  }


  // ====================================================
  // APPLY THEME
  // ====================================================

  function applyTheme(
    preference
  ) {

    const safePreference =
      allowedThemes.includes(
        preference
      )
        ? preference
        : "system";


    const resolvedTheme =
      resolveTheme(
        safePreference
      );


    document.documentElement
      .setAttribute(
        "data-theme",
        resolvedTheme
      );


    document.documentElement
      .setAttribute(
        "data-theme-preference",
        safePreference
      );


    document.documentElement
      .style.colorScheme =
        resolvedTheme;


    return resolvedTheme;

  }


  // ====================================================
  // SAVE THEME
  // ====================================================

  function setPreference(
    preference
  ) {

    if (
      !allowedThemes.includes(
        preference
      )
    ) {

      return;

    }


    localStorage.setItem(
      STORAGE_KEY,
      preference
    );


    applyTheme(
      preference
    );


    window.dispatchEvent(
      new CustomEvent(
        "eduspace-theme-change",
        {
          detail: {
            preference,
            resolved:
              resolveTheme(
                preference
              )
          }
        }
      )
    );

  }


  // ====================================================
  // WATCH SYSTEM THEME
  // ====================================================

  const systemTheme =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    );


  systemTheme.addEventListener(
    "change",
    () => {

      const preference =
        getPreference();


      if (
        preference === "system"
      ) {

        applyTheme(
          "system"
        );


        window.dispatchEvent(
          new CustomEvent(
            "eduspace-theme-change",
            {
              detail: {
                preference:
                  "system",

                resolved:
                  getSystemTheme()
              }
            }
          )
        );

      }

    }
  );


  // ====================================================
  // PUBLIC API
  // ====================================================

  window.EduSpaceTheme = {

    getPreference,

    getSystemTheme,

    resolveTheme,

    applyTheme,

    setPreference

  };


  // ====================================================
  // APPLY IMMEDIATELY
  // ====================================================

  applyTheme(
    getPreference()
  );

})();