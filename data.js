/* ===== EDIT THIS FILE to update your portfolio. No other file needs changing. ===== */
window.SITE = {
  /* Full URLs. Leave "" to hide. Example: github: "https://github.com/yourname" */
  links: { github: "", linkedin: "", email: "" },   /* email: plain address, e.g. "you@gmail.com" */

  /* After adding a PDF to assets/documents/, set e.g. "assets/documents/M_Shankarnath_Resume.pdf" */
  resumeUrl: "assets/documents/M_Shankarnath_Professional_Resume.pdf",

  /* Form service URL (e.g. Formspree: "https://formspree.io/f/xxxxxxx"). Empty = form is not connected. */
  contactEndpoint: "",

  /* Replace by putting your photo in assets/images and changing this path. */
  profilePhoto: "assets/images/profile-placeholder.svg",

  skills: [
    { title: "Programming and Query Languages", items: [{ name: "Python" }, { name: "Java" }, { name: "C" }, { name: "SQL" }] },
    { title: "Web Development", items: [{ name: "HTML" }, { name: "Website development" }, { name: "Website design" }] },
    { title: "Development Tools", items: [{ name: "Visual Studio Code" }, { name: "GitHub" }] },
    /* Add confirmed skills here. Use { name: "Pandas", learning: true } for skills you are still learning. */
    { title: "Data Science and Analytics", items: [], empty: "Skills will be added here as I confirm them." }
  ],

  /* Optional education fields. Shown only when filled. */
  education: { cgpa: "", coursework: [], achievements: [], projects: [] },

  /* Add a project by copying the template below into this list. Empty fields are hidden automatically.
  {
    id: "my-project",              // unique, lowercase, no spaces
    title: "Project name", summary: "One or two sentences.",
    status: "Completed",           // or "In progress"
    tags: ["Python", "SQL"], thumbnail: "assets/images/my-project.png",
    github: "https://github.com/...", demo: "https://...",
    overview: "", problem: "", solution: "",
    features: ["..."], technologies: ["..."], process: "",
    screenshots: [{ src: "assets/images/shot1.png", caption: "Dashboard" }],
    lessons: ""
  }
  */
  projects: [],

  /* Certificate template: { title, issuer, date, image, verifyUrl, viewUrl } */
  certificates: []
};
