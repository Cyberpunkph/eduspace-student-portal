// ======================================================
// EDUSPACE SHARED APPLICATION DATA
// ======================================================

(function () {

  // ====================================================
  // COURSES
  // ====================================================

  const courses = {

    "web-development": {

      id:
        "web-development",

      title:
        "Web Development",

      subtitle:
        "HTML, CSS & JavaScript",

      icon:
        "💻",

      category:
        "DEVELOPMENT",

      totalLessons:
        4,

      lessons: {

        "html-introduction":
          "Introduction to HTML",

        "css-fundamentals":
          "CSS Fundamentals",

        "flexbox-layout":
          "CSS Flexbox",

        "javascript-introduction":
          "JavaScript Basics"

      }

    },


    "mathematics": {

      id:
        "mathematics",

      title:
        "Mathematics",

      subtitle:
        "Algebra & Calculus",

      icon:
        "📐",

      category:
        "MATHEMATICS",

      totalLessons:
        3,

      lessons: {

        "algebra-basics":
          "Introduction to Algebra",

        "linear-equations":
          "Linear Equations",

        "calculus-introduction":
          "Introduction to Calculus"

      }

    },


    "ui-ux": {

      id:
        "ui-ux",

      title:
        "UI/UX Design",

      subtitle:
        "User Interface Design",

      icon:
        "🎨",

      category:
        "DESIGN",

      totalLessons:
        3,

      lessons: {

        "ui-ux-introduction":
          "Understanding UI & UX",

        "wireframing":
          "Wireframing",

        "color-typography":
          "Color & Typography"

      }

    }

  };


  // ====================================================
  // ASSIGNMENTS
  // ====================================================

  const assignments = [

    {

      id:
        "responsive-website-project",

      courseId:
        "web-development",

      title:
        "Responsive Website Project",

      shortDescription:
        "Create a responsive multi-section website using HTML and CSS.",

      description:
        "Build a complete responsive website that adapts properly to desktop, tablet, and mobile screen sizes. Your project should demonstrate semantic HTML, modern CSS layout techniques, and clean responsive design.",

      dueDate:
        "2026-08-18",

      dueTime:
        "23:59",

      points:
        100,

      type:
        "Project",

      requirements: [

        "Use semantic HTML elements.",

        "Create a responsive layout using Flexbox or CSS Grid.",

        "Include desktop, tablet, and mobile breakpoints.",

        "Use consistent typography, spacing, and visual hierarchy.",

        "Submit the complete project as a ZIP file."

      ],

      materials: [

        {

          title:
            "Responsive Design Guide",

          type:
            "PDF",

          file:
            "materials/responsive-design-guide.pdf"

        },

        {

          title:
            "Project Starter Files",

          type:
            "ZIP",

          file:
            "materials/responsive-project-starter.zip"

        }

      ]

    },


    {

      id:
        "calculus-problem-set",

      courseId:
        "mathematics",

      title:
        "Calculus Problem Set",

      shortDescription:
        "Solve the assigned introductory calculus exercises.",

      description:
        "Complete the calculus problem set covering limits, derivatives, and introductory applications. Show your complete solution process for each problem.",

      dueDate:
        "2026-08-22",

      dueTime:
        "23:59",

      points:
        80,

      type:
        "Problem Set",

      requirements: [

        "Answer all assigned problems.",

        "Show your complete solution for every question.",

        "Clearly label each problem number.",

        "Submit your answers as one PDF document."

      ],

      materials: [

        {

          title:
            "Calculus Problem Set",

          type:
            "PDF",

          file:
            "materials/calculus-problem-set.pdf"

        },

        {

          title:
            "Formula Reference",

          type:
            "PDF",

          file:
            "materials/calculus-formulas.pdf"

        }

      ]

    },


    {

      id:
        "mobile-app-wireframe",

      courseId:
        "ui-ux",

      title:
        "Mobile App Wireframe",

      shortDescription:
        "Create a low-fidelity mobile application wireframe.",

      description:
        "Design the primary user flow for a mobile application using low-fidelity wireframes. Focus on structure, navigation, usability, and content hierarchy rather than final visual styling.",

      dueDate:
        "2026-08-26",

      dueTime:
        "23:59",

      points:
        100,

      type:
        "Design Project",

      requirements: [

        "Create at least five mobile screens.",

        "Show the main navigation flow.",

        "Use consistent interface patterns.",

        "Include annotations where interactions are unclear.",

        "Export the final wireframes as PDF or images."

      ],

      materials: [

        {

          title:
            "Wireframing Guide",

          type:
            "PDF",

          file:
            "materials/wireframing-guide.pdf"

        },

        {

          title:
            "Mobile Screen Template",

          type:
            "PDF",

          file:
            "materials/mobile-wireframe-template.pdf"

        }

      ]

    },


    {

      id:
        "html-structure-exercise",

      courseId:
        "web-development",

      title:
        "HTML Structure Exercise",

      shortDescription:
        "Build a semantic HTML document from the provided layout.",

      description:
        "Create a semantic HTML page using appropriate structural elements including header, nav, main, section, article, aside, and footer.",

      dueDate:
        "2026-08-10",

      dueTime:
        "23:59",

      points:
        50,

      type:
        "Exercise",

      requirements: [

        "Use semantic HTML elements.",

        "Maintain proper heading hierarchy.",

        "Include descriptive alt text for images.",

        "Validate the final HTML structure."

      ],

      materials: [

        {

          title:
            "HTML Exercise Instructions",

          type:
            "PDF",

          file:
            "materials/html-exercise.pdf"

        }

      ],

      completed:
        true,

      grade:
        92,

      feedback:
        "Great structure and semantic HTML usage. Review heading hierarchy for an even stronger result."

    }

  ];


  // ====================================================
  // OTHER ACADEMIC SCHEDULE EVENTS
  //
  // Assignment deadlines DO NOT go here.
  // They are generated automatically from assignments.
  // ====================================================

  const academicEvents = [

    {

      id:
        "class-web-development-2026-08-15",

      title:
        "Web Development Lesson",

      date:
        "2026-08-15",

      time:
        "10:00",

      type:
        "class",

      courseId:
        "web-development",

      description:
        "Continue your Web Development lessons."

    },


    {

      id:
        "quiz-math-review-2026-08-20",

      title:
        "Mathematics Quiz Review",

      date:
        "2026-08-20",

      time:
        "14:00",

      type:
        "quiz",

      courseId:
        "mathematics",

      description:
        "Review algebra and linear equations before the quiz."

    }

  ];


  // ====================================================
  // GET COURSE
  // ====================================================

  function getCourse(
    courseId
  ) {

    return courses[
      courseId
    ] || null;

  }


  // ====================================================
  // GET COURSE TITLE
  // ====================================================

  function getCourseTitle(
    courseId
  ) {

    const course =
      getCourse(
        courseId
      );


    return course
      ? course.title
      : "Course";

  }


  // ====================================================
  // GET COURSE ICON
  // ====================================================

  function getCourseIcon(
    courseId
  ) {

    const course =
      getCourse(
        courseId
      );


    return course
      ? course.icon
      : "📚";

  }


  // ====================================================
  // GET ASSIGNMENT
  // ====================================================

  function getAssignment(
    assignmentId
  ) {

    return assignments.find(
      assignment =>
        assignment.id
        === assignmentId
    ) || null;

  }


  // ====================================================
  // ASSIGNMENTS BY COURSE
  // ====================================================

  function getAssignmentsByCourse(
    courseId
  ) {

    return assignments.filter(
      assignment =>
        assignment.courseId
        === courseId
    );

  }


  // ====================================================
  // ASSIGNMENT → CALENDAR EVENT
  // ====================================================

  function assignmentToScheduleEvent(
    assignment
  ) {

    const course =
      getCourse(
        assignment.courseId
      );


    return {

      id:
        `assignment-${assignment.id}`,

      sourceId:
        assignment.id,

      title:
        assignment.title,

      date:
        assignment.dueDate,

      time:
        assignment.dueTime,

      type:
        "assignment",

      courseId:
        assignment.courseId,

      meta:
        course
          ? course.title
          : "Course",

      description:
        assignment.shortDescription
        ||
        assignment.description,

      locked:
        true,

      action:
        `assignment:${assignment.id}`

    };

  }


  // ====================================================
  // GET ACADEMIC SCHEDULE EVENTS
  // ====================================================

  function getAcademicScheduleEvents() {

    const assignmentEvents =
      assignments
        .filter(
          assignment =>
            !assignment.completed
        )
        .map(
          assignmentToScheduleEvent
        );


    const otherEvents =
      academicEvents.map(
        event => {

          const course =
            getCourse(
              event.courseId
            );


          return {

            ...event,

            meta:
              course
                ? course.title
                : "EduSpace",

            locked:
              true

          };

        }
      );


    return [

      ...assignmentEvents,

      ...otherEvents

    ];

  }


  // ====================================================
  // PUBLIC DATA API
  // ====================================================

  window.EduSpaceData = {

    courses,

    assignments,

    academicEvents,

    getCourse,

    getCourseTitle,

    getCourseIcon,

    getAssignment,

    getAssignmentsByCourse,

    assignmentToScheduleEvent,

    getAcademicScheduleEvents

  };

})();