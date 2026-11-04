"use strict";

const fallbackProjects = [
  {
    id: 1,
    name: { en: "Wessyka", ar: "ويزي كا" },
    category: { en: "Brand experience", ar: "تجربة علامة تجارية" },
    description: {
      en: "A warm, expressive digital home for a brand with a story worth slowing down for.",
      ar: "واجهة رقمية دافئة ومعبرة لعلامة تجارية تستحق قصتها أن تُروى بهدوء.",
    },
    folder: "frameswessyka",
    frames: 40,
    startFrame: 1,
    url: "https://wessy-ka-nubian-guest-house-cultural-lounge.ai.studio/",
    featured: true,
  },
  {
    id: 2,
    name: { en: "Kato Wadi", ar: "كاتو وادي" },
    category: { en: "E-commerce", ar: "تجارة إلكترونية" },
    description: {
      en: "A playful storefront built to make discovering and choosing feel effortless.",
      ar: "متجر مرح يجعل استكشاف المنتجات واختيارها تجربة سهلة وممتعة.",
    },
    folder: "frameskato",
    frames: 40,
    startFrame: 12,
    url: "https://rfhywsfahmdsd-jpg.github.io/Kato-Waidi-Nubian-Lodge/",
  },
  {
    id: 3,
    name: { en: "Sala Real Estate", ar: "سالا العقارية" },
    category: { en: "Real estate", ar: "عقارات" },
    description: {
      en: "A refined property experience where considered typography meets intuitive search.",
      ar: "تجربة عقارية أنيقة تجمع بين الخطوط المدروسة والبحث السهل.",
    },
    folder: "framessala",
    frames: 40,
    startFrame: 10,
    url: "https://yosifahmedsaad-gif.github.io/sala-real-estate-portal/",
  },
  {
    id: 4,
    name: { en: "Koshary El Safwa", ar: "كشري الصفوة" },
    category: { en: "Food & hospitality", ar: "مطاعم وضيافة" },
    description: {
      en: "A bold, welcoming identity and online experience for an Egyptian classic.",
      ar: "هوية جريئة وتجربة رقمية مرحبة لطبق مصري أصيل.",
    },
    folder: "frameskoshary",
    frames: 40,
    startFrame: 1,
    url: "https://yosifahmedsaad-gif.github.io/koshary-alsafwa-live/",
    featured: true,
  },
  {
    id: 5,
    name: { en: "Wood-Fire Essence", ar: "وود فاير إيسنس" },
    category: { en: "E-commerce", ar: "تجارة إلكترونية" },
    description: {
      en: "An online storefront for Wood-Fire Essence.",
      ar: "متجر إلكتروني لعلامة وود فاير إيسنس.",
    },
    folder: "frameswoodfire",
    frames: 40,
    startFrame: 1,
    url: "https://2780459.playcode.site/",
  },
];
let projects = [...fallbackProjects];

const grid = document.querySelector("#project-grid");
const workCount = document.querySelector("#work-count");
const adminOverlay = document.querySelector("#admin-overlay");
const detailOverlay = document.querySelector("#detail-overlay");
const studioOverlay = document.querySelector("#studio-overlay");
const loginForm = document.querySelector("#login-form");
const projectForm = document.querySelector("#project-form");
const studioForm = document.querySelector("#studio-form");
const adminTitle = document.querySelector("#admin-title");
const adminIntro = document.querySelector("#admin-intro");
const languageToggle = document.querySelector("#language-toggle");
const detailNextButton = document.querySelector("#detail-next");
const loginError = document.querySelector("#login-error");
const loginSuccess = document.querySelector("#login-success");
const projectError = document.querySelector("#project-error");
const dashboardError = document.querySelector("#dashboard-error");
const accountError = document.querySelector("#account-error");
const accountSuccess = document.querySelector("#account-success");
const projectList = document.querySelector("#admin-project-list");
const adminDashboard = document.querySelector("#admin-dashboard");
const accountForm = document.querySelector("#account-form");
const frameBucket = "project-frames";
let adminUnlocked = false;
let editingProjectId = null;
let lastFocusedElement = null;
let currentLanguage = "en";
let activeProject = null;
let supabaseClient = null;
const frameSequenceCache = new Map();
const frameSequenceLoads = new Map();
const sequenceStates = new WeakMap();
const sequenceVisuals = new Set();
const translations = {
  en: {
    homeLabel: "Yousef, home",
    navLabel: "Main navigation",
    navWork: "Work",
    navAbout: "About",
    navContact: "Contact",
    availability: "Available for select work",
    switchLanguage: "Switch to Arabic",
    languageName: "العربية",
    metaDescription: "Yousef is an independent web developer creating distinctive digital experiences.",
    heroEyebrow: "Independent web developer · Egypt",
    heroTitle: "The Portfolio and Web Developer",
    heroName: "Yousef",
    heroDescription:
      "I’m Yousef — a web developer creating distinctive digital experiences with clarity, character, and care.",
    heroExplore: "Explore my work",
    heroTalk: "Let’s talk",
    heroMeta: "DESIGN · DEVELOPMENT · DETAIL",
    heroScroll: "SCROLL TO DISCOVER ↓",
    workKicker: "A few things I’ve made",
    workTitle: "Selected work",
    projectPlaceholder: "YOUR NEXT PROJECT",
    canvasUnavailable: "Preview canvas is unavailable for {name}.",
    projectCount: "{count} PROJECTS",
    projectCardLabel: "Project preview: {name}",
    projectPreviewLabel: "{name} project preview",
    previewInstructions: "Drag the logo to explore; use arrow keys when focused.",
    sequenceLabel: "{name} frame sequence",
    loadingFrames: "Loading frames…",
    previewUnavailable: "Preview unavailable. Please try again later.",
    projectButtonLabel: "View details for {name}",
    dragProject: "Drag the logo to explore",
    aboutKicker: "A little about me",
    aboutTitle: "Built with purpose.",
    aboutLead: "Good websites do more than look good.",
    aboutDescription:
      " They tell your story, make the next step obvious, and feel effortless on every screen. I bring design sensibility and thoughtful development together to make that happen.",
    servicesLabel: "Services",
    serviceDesign: "Web design",
    serviceDevelopment: "Frontend development",
    serviceResponsive: "Responsive experiences",
    serviceDirection: "Creative direction",
    contactKicker: "Have something in mind?",
    contactTitle: "Let’s make it matter.",
    contactDescription: "Tell me a little about what you’re building.",
    contactAction: "Start a conversation",
    footerNote: "© Yousef. Made with intention.",
    adminAccess: "Studio access",
    adminLogin: "Admin login",
    closeDialog: "Close dialog",
    privateWorkspace: "Private workspace",
    adminIntro: "Enter your admin email and we’ll send you a secure sign-in link.",
    dashboardIntro: "Manage published projects and your studio account.",
    adminEntryRequired: "Welcome, {name}. A secure sign-in link is required to open the private control room.",
    adminEmail: "Admin email",
    sendSignInLink: "Email me a secure sign-in link",
    signInLinkSent: "A secure sign-in link was sent to {email}. Open it in this browser to continue.",
    signInLinkFailed: "Could not send a sign-in link: {message}",
    signOut: "Sign out",
    projectsHeading: "Projects",
    newProject: "New project +",
    nameEnglish: "Name (English)",
    nameArabic: "Name (Arabic)",
    categoryEnglish: "Category (English)",
    categoryArabic: "Category (Arabic)",
    descriptionEnglish: "Description (English)",
    descriptionArabic: "Description (Arabic)",
    imageLabel: "Cover image URL (optional)",
    projectLinkLabel: "Project link (optional)",
    frameFilesLabel: "Animation frames (optional, sorted by filename)",
    frameFilesNote: "Use numbered image names such as 001.jpg. New frames replace the existing sequence.",
    featuredProject: "Feature this project",
    saveProject: "Save project",
    cancel: "Cancel",
    editProject: "Edit",
    deleteProject: "Delete",
    noProjects: "No projects have been added yet.",
    accountSettings: "Account settings",
    currentEmail: "Signed in as {email}",
    newEmail: "New email (optional)",
    newPassword: "New password (optional, at least 8 characters)",
    updateAccount: "Update account",
    deleteConfirm: "Delete {name}? This cannot be undone.",
    cloudConfigMissing: "Cloud storage is not configured yet. Add the Supabase project URL and public anon key to supabase-config.js.",
    cloudNotConfiguredNotice: "Showing bundled preview projects. Cloud publishing has not been configured yet.",
    supabaseUnavailable: "Supabase could not be loaded. Check your internet connection and reload the page.",
    projectLoadFailed: "Could not load projects from cloud: {message}",
    projectSaveFailed: "Could not save this project: {message}",
    projectDeleteFailed: "Could not delete this project: {message}",
    signInFailed: "Could not sign in: {message}",
    notAdmin: "This account is not authorized to manage the portfolio.",
    framesCleanupFailed: "Project was updated, but old animation files could not be removed: {message}",
    projectDeletedFramesCleanupFailed: "Project was deleted, but its animation files could not be removed: {message}",
    accountUpdateFailed: "Could not update account: {message}",
    accountUpdated: "Account updated. Check your email if a confirmation is required.",
    accountFieldsRequired: "Enter a new email, a new password, or both.",
    frameUploadFailed: "Could not upload animation frames: {message}",
    frameFileTooLarge: "Each animation frame must be 10 MB or smaller.",
    frameLimitExceeded: "Choose no more than 120 frames.",
    invalidFrameType: "Frames must be JPG, PNG, or WebP images.",
    invalidWebUrl: "Project and cover image links must use http or https.",
    visitProject: "Visit project",
    nextProject: "Next project",
    studioTitle: "Let’s build something together.",
    studioIntro: "Share a few details and I’ll get back to you.",
    yourName: "Your name",
    yourEmail: "Your email",
    sendEntry: "Send Entry",
    studioEntryNote:
      "Submitting opens the secure control room. You must sign in to manage projects.",
  },
  ar: {
    homeLabel: "يوسف، الصفحة الرئيسية",
    navLabel: "التنقل الرئيسي",
    navWork: "الأعمال",
    navAbout: "نبذة عني",
    navContact: "تواصل",
    availability: "متاح لمشاريع مختارة",
    switchLanguage: "التبديل إلى الإنجليزية",
    languageName: "English",
    metaDescription: "يوسف مطور ويب مستقل يصمم تجارب رقمية مميزة.",
    heroEyebrow: "مطور ويب مستقل · مصر",
    heroTitle: "معرض أعمال ومطور ويب",
    heroName: "يوسف",
    heroDescription:
      "أنا يوسف، مطور ويب أصمم تجارب رقمية مميزة تجمع بين الوضوح والطابع الخاص والاهتمام بالتفاصيل.",
    heroExplore: "استكشف أعمالي",
    heroTalk: "لنتحدث",
    heroMeta: "تصميم · تطوير · تفاصيل",
    heroScroll: "مرر لاكتشاف المزيد ↓",
    workKicker: "بعض الأعمال التي أنجزتها",
    workTitle: "أعمال مختارة",
    projectPlaceholder: "مشروعك القادم",
    canvasUnavailable: "لوحة المعاينة غير متاحة لمشروع {name}.",
    projectCount: "{count} مشاريع",
    projectCardLabel: "معاينة مشروع: {name}",
    projectPreviewLabel: "معاينة مشروع {name}",
    previewInstructions: "اسحب الشعار لاستكشاف المشروع أو استخدم الأسهم عند تحديده.",
    sequenceLabel: "تتابع إطارات {name}",
    loadingFrames: "جارٍ تحميل الإطارات…",
    previewUnavailable: "تعذرت المعاينة. حاول مرة أخرى لاحقًا.",
    projectButtonLabel: "عرض تفاصيل {name}",
    dragProject: "اسحب الشعار لاستكشاف المشروع",
    aboutKicker: "نبذة بسيطة عني",
    aboutTitle: "أبني بهدف واضح.",
    aboutLead: "المواقع الجيدة لا تكتفي بالمظهر الجميل.",
    aboutDescription:
      " إنها تحكي قصتك، وتوضح الخطوة التالية، وتعمل بسهولة على كل شاشة. أجمع بين حس التصميم والتطوير المدروس لتحقيق ذلك.",
    servicesLabel: "الخدمات",
    serviceDesign: "تصميم المواقع",
    serviceDevelopment: "تطوير الواجهات",
    serviceResponsive: "تجارب متوافقة مع الشاشات",
    serviceDirection: "التوجيه الإبداعي",
    contactKicker: "هل لديك فكرة؟",
    contactTitle: "لنجعلها تجربة مميزة.",
    contactDescription: "أخبرني قليلًا عمّا تخطط لبنائه.",
    contactAction: "ابدأ محادثة",
    footerNote: "© يوسف. صُنع باهتمام.",
    adminAccess: "إدارة الاستوديو",
    adminLogin: "دخول الإدارة",
    closeDialog: "إغلاق النافذة",
    privateWorkspace: "مساحة خاصة",
    adminIntro: "أدخل بريد الإدارة وسنرسل إليك رابط دخول آمنًا.",
    dashboardIntro: "أدر المشاريع المنشورة وحساب الاستوديو.",
    adminEntryRequired: "أهلًا {name}. يلزم رابط دخول آمن لفتح غرفة التحكم الخاصة.",
    adminEmail: "البريد الإلكتروني للإدارة",
    sendSignInLink: "أرسل رابط دخول آمن إلى بريدي",
    signInLinkSent: "أُرسل رابط دخول آمن إلى {email}. افتحه في هذا المتصفح للمتابعة.",
    signInLinkFailed: "تعذر إرسال رابط الدخول: {message}",
    signOut: "تسجيل الخروج",
    projectsHeading: "المشاريع",
    newProject: "مشروع جديد +",
    nameEnglish: "الاسم (إنجليزي)",
    nameArabic: "الاسم (عربي)",
    categoryEnglish: "التصنيف (إنجليزي)",
    categoryArabic: "التصنيف (عربي)",
    descriptionEnglish: "الوصف (إنجليزي)",
    descriptionArabic: "الوصف (عربي)",
    imageLabel: "رابط صورة الغلاف (اختياري)",
    projectLinkLabel: "رابط المشروع (اختياري)",
    frameFilesLabel: "إطارات الحركة (اختياري، تُرتب حسب اسم الملف)",
    frameFilesNote: "استخدم أسماء مرقمة مثل 001.jpg. الإطارات الجديدة تستبدل التتابع الحالي.",
    featuredProject: "إبراز هذا المشروع",
    saveProject: "حفظ المشروع",
    cancel: "إلغاء",
    editProject: "تعديل",
    deleteProject: "حذف",
    noProjects: "لم تتم إضافة مشاريع بعد.",
    accountSettings: "إعدادات الحساب",
    currentEmail: "تم تسجيل الدخول باسم {email}",
    newEmail: "البريد الإلكتروني الجديد (اختياري)",
    newPassword: "كلمة المرور الجديدة (اختياري، 8 أحرف على الأقل)",
    updateAccount: "تحديث الحساب",
    deleteConfirm: "حذف {name}؟ لا يمكن التراجع عن ذلك.",
    cloudConfigMissing: "التخزين السحابي غير مُعد بعد. أضف رابط مشروع Supabase ومفتاح anon العام إلى supabase-config.js.",
    cloudNotConfiguredNotice: "تُعرض المشاريع التجريبية المضمّنة. لم يتم إعداد النشر السحابي بعد.",
    supabaseUnavailable: "تعذر تحميل Supabase. تحقق من اتصال الإنترنت ثم أعد تحميل الصفحة.",
    projectLoadFailed: "تعذر تحميل المشاريع من السحابة: {message}",
    projectSaveFailed: "تعذر حفظ المشروع: {message}",
    projectDeleteFailed: "تعذر حذف المشروع: {message}",
    signInFailed: "تعذر تسجيل الدخول: {message}",
    notAdmin: "هذا الحساب غير مصرح له بإدارة معرض الأعمال.",
    framesCleanupFailed: "تم تحديث المشروع، لكن تعذر حذف ملفات الحركة القديمة: {message}",
    projectDeletedFramesCleanupFailed: "تم حذف المشروع، لكن تعذر حذف ملفات الحركة من التخزين: {message}",
    accountUpdateFailed: "تعذر تحديث الحساب: {message}",
    accountUpdated: "تم تحديث الحساب. تحقق من بريدك إذا كان التأكيد مطلوبًا.",
    accountFieldsRequired: "أدخل بريدًا إلكترونيًا جديدًا أو كلمة مرور جديدة أو كليهما.",
    frameUploadFailed: "تعذر رفع إطارات الحركة: {message}",
    frameFileTooLarge: "يجب ألا يتجاوز حجم كل إطار 10 ميجابايت.",
    frameLimitExceeded: "اختر 120 إطارًا على الأكثر.",
    invalidFrameType: "يجب أن تكون الإطارات صور JPG أو PNG أو WebP.",
    invalidWebUrl: "يجب أن يبدأ رابط المشروع وصورة الغلاف بـ http أو https.",
    visitProject: "زيارة المشروع",
    nextProject: "المشروع التالي",
    studioTitle: "لنبنِ شيئًا مميزًا معًا.",
    studioIntro: "أرسل بعض التفاصيل وسأعود إليك.",
    yourName: "اسمك",
    yourEmail: "بريدك الإلكتروني",
    sendEntry: "دخول الاستوديو",
    studioEntryNote:
      "سينقلك الإرسال إلى غرفة التحكم الآمنة. يلزم تسجيل الدخول لإدارة المشاريع.",
  },
};

function t(key, values = {}) {
  const message = translations[currentLanguage][key] || translations.en[key] || key;
  return message.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const config = window.PORTFOLIO_SUPABASE_CONFIG;
  if (!config?.url || !config?.anonKey) {
    throw new Error(t("cloudConfigMissing"));
  }
  if (!window.supabase?.createClient) {
    throw new Error(t("supabaseUnavailable"));
  }

  supabaseClient = window.supabase.createClient(config.url, config.anonKey);
  return supabaseClient;
}

function mapCloudProject(row) {
  return {
    id: row.id,
    name: { en: row.name_en, ar: row.name_ar },
    category: { en: row.category_en, ar: row.category_ar },
    description: { en: row.description_en, ar: row.description_ar },
    url: row.url || "",
    image: row.image_url || "",
    folder: row.frame_folder || "",
    frameUrls: row.frame_urls || [],
    frames: row.total_frames || 0,
    startFrame: row.start_frame || 1,
    featured: row.featured,
    sortOrder: row.sort_order,
  };
}

async function loadCloudProjects() {
  const config = window.PORTFOLIO_SUPABASE_CONFIG;
  const notice = document.querySelector("#site-status");
  if (!config?.url || !config?.anonKey) {
    notice.dataset.message = "cloudNotConfiguredNotice";
    notice.textContent = t(notice.dataset.message);
    notice.hidden = false;
    return;
  }

  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    projects = data.map(mapCloudProject);
    renderProjects();
    delete notice.dataset.message;
    delete notice.dataset.messageValue;
    notice.hidden = true;
  } catch (error) {
    console.error("Could not load projects from Supabase:", error);
    notice.dataset.message = "projectLoadFailed";
    notice.dataset.messageValue = error.message || String(error);
    notice.textContent = t("projectLoadFailed", {
      message: error.message || String(error),
    });
    notice.hidden = false;
  }
}

function flipProjectCard(project, card) {
  const visual = card.querySelector(".project-visual[data-frames]");
  const state = visual && sequenceStates.get(visual);
  if (state && Date.now() - (state.lastDraggedAt || 0) < 500) return;
  if (card.classList.contains("is-flipping")) return;

  card.classList.add("is-flipping");
  window.setTimeout(() => {
    card.classList.remove("is-flipping");
    openProjectDetails(project);
  }, 240);
}

function projectText(project, field) {
  const value = project[field];
  if (value && typeof value === "object") {
    return value[currentLanguage] || value.en || "";
  }
  return value || "";
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.title =
    currentLanguage === "ar" ? "يوسف | مطور ويب" : "Yousef | Web Developer";
  document.querySelector("#meta-description").content = t("metaDescription");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAria));
  });
  document.querySelector("#language-toggle-label").textContent = t("languageName");
  languageToggle.setAttribute("aria-label", t("switchLanguage"));
  renderProjects();
  if (adminUnlocked) {
    adminTitle.textContent = t("projectsHeading");
    adminIntro.textContent = t("dashboardIntro");
    renderAdminProjects();
  }
  document.querySelectorAll("[data-message]").forEach((element) => {
    if (!element.hidden) {
      element.textContent = t(element.dataset.message, {
        message: element.dataset.messageValue || "",
      });
    }
  });
  if (activeProject) updateProjectDetails(activeProject);
}
const sequenceResizeObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target }) => {
    const state = sequenceStates.get(target);
    if (state) resizeSequenceCanvas(state);
  });
});
const sequenceViewportObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const state = sequenceStates.get(entry.target);
            if (!state || state.loadStarted) return;
            state.loadStarted = true;
            loadSequence(state);
          });
        },
        { rootMargin: "160px" },
      )
    : null;

function frameUrl(project, frame) {
  if (project.frameUrls?.[frame - 1]) return project.frameUrls[frame - 1];
  return `./public/${encodeURIComponent(project.folder)}/ezgif-frame-${String(frame).padStart(3, "0")}.jpg`;
}

function preloadFrameSequence(project, totalFrames) {
  const cacheKey = project.frameUrls?.[0] || project.folder;
  const cached = frameSequenceCache.get(cacheKey);
  if (cached) return Promise.resolve(cached);

  const pending = frameSequenceLoads.get(cacheKey);
  if (pending) return pending;

  const frameLoads = Array.from({ length: totalFrames }, (_, index) => {
    const frame = index + 1;
    const image = new Image();
    image.decoding = "async";

    const loaded = new Promise((resolve) => {
      image.onload = () => {
        if (typeof image.decode === "function") {
          image.decode().then(
            () => resolve(image),
            () => resolve(null),
          );
        } else {
          resolve(image);
        }
      };
      image.onerror = () => resolve(null);
    });

    image.src = frameUrl(project, frame);
    return loaded.then((result) => ({ frame, image: result }));
  });

  const loading = Promise.all(frameLoads).then((results) => {
    const frames = results.map((result) => result.image);
    const failures = results.filter((result) => !result.image);

    if (failures.length > 0) {
      const missing = failures.map((result) => frameUrl(project, result.frame));
      console.error(
        `Unable to load ${failures.length} frame(s) for project ${project.id || project.folder}:`,
        missing,
      );
    }

    if (frames.every((image) => !image)) {
      throw new Error(`No frames loaded for project "${project.id || project.folder}".`);
    }

    const sequence = { frames, totalFrames };
    frameSequenceCache.set(cacheKey, sequence);
    return sequence;
  });

  frameSequenceLoads.set(cacheKey, loading);
  loading.catch((error) => {
    frameSequenceLoads.delete(cacheKey);
    console.error(error);
  });
  return loading;
}

function resizeSequenceCanvas(state) {
  const bounds = state.visual.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(bounds.width * pixelRatio));
  const height = Math.max(1, Math.round(bounds.height * pixelRatio));

  if (state.canvas.width === width && state.canvas.height === height) return;
  state.canvas.width = width;
  state.canvas.height = height;
  state.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  state.width = bounds.width;
  state.height = bounds.height;
  if (state.sequence) drawSequenceFrame(state);
}

function getLoadedFrame(sequence, frameIndex) {
  if (sequence.frames[frameIndex]) return sequence.frames[frameIndex];

  for (let distance = 1; distance < sequence.frames.length; distance += 1) {
    const before = sequence.frames[frameIndex - distance];
    const after = sequence.frames[frameIndex + distance];
    if (before) return before;
    if (after) return after;
  }

  return null;
}

function drawImageCover(context, image, width, height, opacity) {
  if (!image || opacity <= 0) return;

  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.globalAlpha = opacity;
  context.drawImage(
    image,
    (width - drawWidth) / 2,
    (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

function loadSequence(state) {
  preloadFrameSequence(
    state.project,
    Number(state.visual.dataset.frames),
  )
    .then((sequence) => {
      state.sequence = sequence;
      state.visual.classList.add("is-ready");
      state.currentProgress = state.homeProgress;
      state.targetProgress = state.homeProgress;
      state.visual.querySelector(".sequence-status").textContent =
        t("previewInstructions");
      drawSequenceFrame(state);
    })
    .catch((error) => {
      state.errorMessage = error.message;
      const message = t("previewUnavailable", { message: error.message });
      state.visual.querySelector(".sequence-status").textContent = message;
      state.visual.classList.add("has-error");
    });
}

function drawSequenceFrame(state) {
  if (!state.sequence) return;

  const { totalFrames } = state.sequence;
  const framePosition = state.currentProgress * (totalFrames - 1);
  const firstFrameIndex = Math.floor(framePosition);
  const secondFrameIndex = Math.min(totalFrames - 1, firstFrameIndex + 1);
  const blend = framePosition - firstFrameIndex;
  const firstFrame = getLoadedFrame(state.sequence, firstFrameIndex);
  const secondFrame = getLoadedFrame(state.sequence, secondFrameIndex);

  if (state.width && state.height) {
    state.context.clearRect(0, 0, state.width, state.height);
    drawImageCover(
      state.context,
      firstFrame,
      state.width,
      state.height,
      secondFrameIndex === firstFrameIndex ? 1 : 1 - blend,
    );
    if (secondFrameIndex !== firstFrameIndex) {
      drawImageCover(state.context, secondFrame, state.width, state.height, blend);
    }
    state.context.globalAlpha = 1;
  }

  state.visual.dataset.currentFrame = String(Math.round(framePosition) + 1);
}

function requestSequenceFrame(state) {
  if (state.animationFrame || !state.sequence) return;

  const animate = (time) => {
    state.animationFrame = 0;
    const elapsed = state.lastAnimationTime
      ? Math.min(time - state.lastAnimationTime, 100)
      : 16.67;
    state.lastAnimationTime = time;
    const difference = state.targetProgress - state.currentProgress;
    const halfFrame = 0.5 / (state.sequence.totalFrames - 1);
    if (Math.abs(difference) < halfFrame) {
      state.currentProgress = state.targetProgress;
    } else {
      state.currentProgress += difference * (1 - Math.exp(-elapsed / 100));
    }

    state.visual.style.setProperty(
      "--scroll-tilt",
      `${(0.5 - state.currentProgress) * 8}deg`,
    );
    drawSequenceFrame(state);

    if (state.currentProgress !== state.targetProgress) {
      state.animationFrame = window.requestAnimationFrame(animate);
    } else {
      state.lastAnimationTime = 0;
    }
  };

  state.animationFrame = window.requestAnimationFrame(animate);
}

function setSequenceTarget(state, progress, idleDelay = 0, inputMode = "idle") {
  state.targetProgress = Math.min(1, Math.max(0, progress));
  state.inputMode = inputMode;
  requestSequenceFrame(state);

  window.clearTimeout(state.idleTimer);
  if (idleDelay > 0) {
    state.idleTimer = window.setTimeout(() => {
      state.targetProgress = state.homeProgress;
      state.inputMode = "idle";
      resetPointerTilt(state.visual);
      requestSequenceFrame(state);
    }, idleDelay);
  }
}

function registerSequence(visual) {
  const canvas = visual.querySelector("canvas");
  const context = canvas.getContext("2d", { alpha: true });
  const state = {
    visual,
    canvas,
    context,
    project: {
      id: visual.dataset.projectId,
      folder: visual.dataset.folder,
      frameUrls: JSON.parse(visual.dataset.frameUrls || "[]"),
    },
    homeProgress:
      (Number(visual.dataset.startFrame || 1) - 1) /
      Math.max(1, Number(visual.dataset.frames) - 1),
    sequence: null,
    currentProgress: 0,
    targetProgress: 0,
    animationFrame: 0,
    idleTimer: 0,
    pointerX: null,
    pointerY: null,
    lastAnimationTime: 0,
    width: 0,
    height: 0,
  };

  if (!context) {
    const message = t("canvasUnavailable", {
      name: visual.getAttribute("aria-label"),
    });
    visual.querySelector(".sequence-status").textContent = message;
    console.error(message);
    return;
  }

  sequenceStates.set(visual, state);
  sequenceVisuals.add(visual);
  sequenceResizeObserver.observe(visual);
  resizeSequenceCanvas(state);
  if (sequenceViewportObserver) {
    sequenceViewportObserver.observe(visual);
  } else {
    state.loadStarted = true;
    loadSequence(state);
  }
}

function createVisual(project) {
  const visual = document.createElement("div");
  visual.className = "project-visual";
  visual.setAttribute(
    "aria-label",
    t("projectPreviewLabel", { name: projectText(project, "name") }),
  );
  visual.setAttribute("role", "group");
  visual.setAttribute("tabindex", "0");
  visual.setAttribute("aria-keyshortcuts", "ArrowRight ArrowLeft ArrowUp ArrowDown Home End");

  if ((project.folder || project.frameUrls?.length) && project.frames > 0) {
    visual.dataset.folder = project.folder || "";
    visual.dataset.projectId = String(project.id);
    visual.dataset.frameUrls = JSON.stringify(project.frameUrls || []);
    visual.dataset.frames = String(project.frames);
    visual.dataset.startFrame = String(project.startFrame || 1);
    visual.dataset.currentFrame = String(project.startFrame || 1);
    const canvas = document.createElement("canvas");
    canvas.className = "sequence-canvas";
    canvas.setAttribute("aria-hidden", "true");
    const status = document.createElement("span");
    status.className = "sequence-status visually-hidden";
    status.setAttribute("role", "status");
    status.textContent = t("loadingFrames");
    visual.append(canvas, status);
    registerSequence(visual);
  } else if (project.image) {
    visual.style.setProperty("--project-image", `url("${project.image}")`);
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "visual-placeholder";
    placeholder.textContent = t("projectPlaceholder");
    visual.append(placeholder);
  }

  const mark = document.createElement("span");
  mark.className = "visual-mark";
  mark.textContent = projectText(project, "name");

  const hint = document.createElement("span");
  hint.className = "visual-hint";
  hint.textContent = t("dragProject");

  visual.append(mark);
  visual.append(hint);
  return visual;
}

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = `project-card${project.featured ? " featured" : ""}`;
  card.style.animationDelay = `${index * 70}ms`;
  card.tabIndex = 0;
  card.setAttribute(
    "aria-label",
    t("projectCardLabel", { name: projectText(project, "name") }),
  );
  card.append(createVisual(project));

  const info = document.createElement("div");
  info.className = "project-info";

  const heading = document.createElement("div");
  const category = document.createElement("span");
  category.className = "project-category";
  category.textContent = projectText(project, "category");

  const name = document.createElement("h3");
  name.textContent = projectText(project, "name");
  heading.append(category, name);

  const openButton = document.createElement("button");
  openButton.className = "project-open";
  openButton.type = "button";
  openButton.setAttribute(
    "aria-label",
    t("projectButtonLabel", { name: projectText(project, "name") }),
  );
  openButton.textContent = "↗";
  openButton.addEventListener("click", () => flipProjectCard(project, card));
  card.addEventListener("click", (event) => {
    if (event.target.closest("button, a")) return;
    flipProjectCard(project, card);
  });
  card.addEventListener("keydown", (event) => {
    if (event.target !== card || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    flipProjectCard(project, card);
  });

  info.append(heading, openButton);
  card.append(info);
  return card;
}

function renderProjects() {
  grid.querySelectorAll(".project-visual[data-frames]").forEach((visual) => {
    const state = sequenceStates.get(visual);
    if (state?.animationFrame) window.cancelAnimationFrame(state.animationFrame);
    if (state) window.clearTimeout(state.idleTimer);
    sequenceViewportObserver?.unobserve(visual);
    sequenceResizeObserver.unobserve(visual);
    sequenceVisuals.delete(visual);
  });
  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    fragment.append(createProjectCard(project, index));
  });
  grid.replaceChildren(fragment);
  workCount.dataset.count = String(projects.length);
  workCount.textContent = t("projectCount", {
    count: String(projects.length).padStart(2, "0"),
  });
  if (adminUnlocked) renderAdminProjects();
}

function findVisual(target) {
  return target instanceof Element
    ? target.closest(".project-visual[data-frames]")
    : null;
}

function resetPointerTilt(visual) {
  visual.dataset.pointerActive = "false";
  visual.style.removeProperty("--pointer-tilt-x");
  visual.style.removeProperty("--pointer-tilt-y");
  visual.style.removeProperty("--logo-x");
  visual.style.removeProperty("--logo-y");
  visual.style.removeProperty("--logo-rotate");
  const card = visual.closest(".project-card");
  if (card) {
    card.style.removeProperty("--pointer-tilt-x");
    card.style.removeProperty("--pointer-tilt-y");
  }
}

document.addEventListener("pointerdown", (event) => {
  const visual = findVisual(event.target);
  const state = visual && sequenceStates.get(visual);
  if (!state) return;
  state.dragOrigin = { x: event.clientX, y: event.clientY };
  visual.setPointerCapture(event.pointerId);
});

document.addEventListener("pointerup", (event) => {
  const visual = findVisual(event.target);
  const state = visual && sequenceStates.get(visual);
  if (!state || !state.dragOrigin) return;
  const distance = Math.hypot(
    event.clientX - state.dragOrigin.x,
    event.clientY - state.dragOrigin.y,
  );
  if (distance > 8) state.lastDraggedAt = Date.now();
  state.dragOrigin = null;
  if (visual.hasPointerCapture(event.pointerId)) {
    visual.releasePointerCapture(event.pointerId);
  }
});

document.addEventListener("pointercancel", (event) => {
  const visual = findVisual(event.target);
  const state = visual && sequenceStates.get(visual);
  if (!state) return;
  state.dragOrigin = null;
  resetPointerTilt(visual);
  setSequenceTarget(state, state.homeProgress, 0, "idle");
});

document.addEventListener("pointermove", (event) => {
  const visual = findVisual(event.target);
  const state = visual && sequenceStates.get(visual);
  if (!state) return;

  const bounds = visual.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
  const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
  if (
    state.pointerX !== null &&
    state.pointerY !== null &&
    Math.abs(state.pointerX - event.clientX) < 0.5 &&
    Math.abs(state.pointerY - event.clientY) < 0.5
  ) {
    return;
  }

  state.pointerX = event.clientX;
  state.pointerY = event.clientY;
  if (
    state.dragOrigin &&
    Math.hypot(
      event.clientX - state.dragOrigin.x,
      event.clientY - state.dragOrigin.y,
    ) > 8
  ) {
  }
  visual.dataset.pointerActive = "true";
  visual.style.setProperty("--pointer-tilt-x", `${(0.5 - y) * 10}deg`);
  visual.style.setProperty("--pointer-tilt-y", `${(x - 0.5) * 12}deg`);
  visual.style.setProperty("--logo-x", `${(x - 0.5) * 28}px`);
  visual.style.setProperty("--logo-y", `${(y - 0.5) * 22}px`);
  visual.style.setProperty("--logo-rotate", `${(x - 0.5) * 10}deg`);
  const card = visual.closest(".project-card");
  if (card) {
    card.style.setProperty("--pointer-tilt-x", `${(0.5 - y) * 8}deg`);
    card.style.setProperty("--pointer-tilt-y", `${(x - 0.5) * 10}deg`);
  }
  const progress =
    state.homeProgress + (x - 0.5) * 0.8 + (0.5 - y) * 0.45;
  setSequenceTarget(state, progress, 1100, "pointer");
});

document.addEventListener("pointerout", (event) => {
  const visual = findVisual(event.target);
  if (
    !visual ||
    (event.relatedTarget instanceof Node && visual.contains(event.relatedTarget))
  ) {
    return;
  }

  const state = sequenceStates.get(visual);
  if (!state) return;
  if (
    state.dragOrigin ||
    Date.now() - (state.lastDraggedAt || 0) < 80
  ) {
    return;
  }
  state.pointerX = null;
  state.pointerY = null;
  resetPointerTilt(visual);
  if (!state.dragOrigin) {
    setSequenceTarget(state, state.homeProgress, 0, "idle");
  }
});

document.addEventListener("keydown", (event) => {
  const visual = findVisual(event.target);
  const state = visual && sequenceStates.get(visual);
  if (!state || !state.sequence) return;

  let target = state.targetProgress;
  const step = 1 / (state.sequence.totalFrames - 1);
  if (event.key === "ArrowRight" || event.key === "ArrowUp") {
    target = Math.min(1, target + step);
  } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
    target = Math.max(0, target - step);
  } else if (event.key === "Home") {
    target = state.homeProgress;
  } else if (event.key === "End") {
    target = 1;
  } else {
    return;
  }

  event.preventDefault();
  setSequenceTarget(state, target, 900, "keyboard");
});

function openOverlay(overlay) {
  lastFocusedElement = document.activeElement;
  overlay.hidden = false;
  document.body.classList.add("modal-open");
  const firstInput = overlay.querySelector("input, button");
  if (firstInput) firstInput.focus();
}

function renderAdminProjects() {
  if (!adminUnlocked) return;
  projectList.replaceChildren();

  if (projects.length === 0) {
    const empty = document.createElement("p");
    empty.className = "security-note";
    empty.textContent = t("noProjects");
    projectList.append(empty);
    return;
  }

  projects.forEach((project) => {
    const row = document.createElement("div");
    row.className = "admin-project-row";

    const details = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = projectText(project, "name");
    const category = document.createElement("span");
    category.textContent = projectText(project, "category");
    details.append(name, category);

    const actions = document.createElement("div");
    actions.className = "admin-project-actions";
    const edit = document.createElement("button");
    edit.className = "button button-secondary";
    edit.type = "button";
    edit.textContent = t("editProject");
    edit.addEventListener("click", () => openProjectEditor(project));
    const remove = document.createElement("button");
    remove.className = "button button-danger";
    remove.type = "button";
    remove.textContent = t("deleteProject");
    remove.addEventListener("click", () => deleteProject(project));
    actions.append(edit, remove);
    row.append(details, actions);
    projectList.append(row);
  });
}

function openProjectEditor(project = null) {
  editingProjectId = project?.id || null;
  projectForm.reset();
  projectError.hidden = true;
  projectForm.querySelector("#project-form-title").textContent = t(
    project ? "editProject" : "newProject",
  );
  projectForm.querySelector('[name="nameEn"]').value = project?.name?.en || "";
  projectForm.querySelector('[name="nameAr"]').value = project?.name?.ar || "";
  projectForm.querySelector('[name="categoryEn"]').value =
    project?.category?.en || "";
  projectForm.querySelector('[name="categoryAr"]').value =
    project?.category?.ar || "";
  projectForm.querySelector('[name="descriptionEn"]').value =
    project?.description?.en || "";
  projectForm.querySelector('[name="descriptionAr"]').value =
    project?.description?.ar || "";
  projectForm.querySelector('[name="url"]').value = project?.url || "";
  projectForm.querySelector('[name="image"]').value = project?.image || "";
  projectForm.querySelector('[name="featured"]').checked =
    Boolean(project?.featured);
  projectForm.hidden = false;
  projectForm.querySelector('[name="nameEn"]').focus();
}

function getStoragePath(publicUrl) {
  const marker = `/storage/v1/object/public/${frameBucket}/`;
  const pathname = new URL(publicUrl).pathname;
  const markerIndex = pathname.indexOf(marker);
  return markerIndex < 0
    ? null
    : decodeURIComponent(pathname.slice(markerIndex + marker.length));
}

async function removeProjectFrames(frameUrls) {
  const paths = frameUrls.map(getStoragePath).filter(Boolean);
  if (paths.length === 0) return;
  const { error } = await getSupabaseClient()
    .storage.from(frameBucket)
    .remove(paths);
  if (error) throw error;
}

async function uploadProjectFrames(files, projectId) {
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  const sortedFiles = [...files].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }),
  );
  if (sortedFiles.length > 120) {
    throw new Error(t("frameLimitExceeded"));
  }
  if (sortedFiles.some((file) => !allowedTypes.has(file.type))) {
    throw new Error(t("invalidFrameType"));
  }
  if (sortedFiles.some((file) => file.size > 10 * 1024 * 1024)) {
    throw new Error(t("frameFileTooLarge"));
  }

  const uploadedPaths = [];
  const urls = [];
  try {
    for (const [index, file] of sortedFiles.entries()) {
      const extension = file.type === "image/jpeg"
        ? "jpg"
        : file.type.slice("image/".length);
      const path = `${projectId}/${String(index + 1).padStart(3, "0")}.${extension}`;
      const { error } = await getSupabaseClient()
        .storage.from(frameBucket)
        .upload(path, file, { upsert: true, contentType: file.type });
      if (error) throw error;

      uploadedPaths.push(path);
      const { data } = getSupabaseClient()
        .storage.from(frameBucket)
        .getPublicUrl(path);
      urls.push(`${data.publicUrl}?v=${Date.now()}`);
    }
  } catch (error) {
    if (uploadedPaths.length > 0) {
      const { error: cleanupError } = await getSupabaseClient()
        .storage.from(frameBucket)
        .remove(uploadedPaths);
      if (cleanupError) console.error("Could not clean up incomplete frame upload:", cleanupError);
    }
    throw error;
  }
  return { urls, paths: uploadedPaths };
}

async function enterAdminDashboard(user) {
  const client = getSupabaseClient();
  const { data: isAdmin, error: authorizationError } = await client.rpc(
    "is_portfolio_admin",
  );
  if (authorizationError) throw authorizationError;
  if (!isAdmin) {
    await client.auth.signOut();
    throw new Error(t("notAdmin"));
  }

  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;

  adminUnlocked = true;
  loginError.hidden = true;
  loginForm.hidden = true;
  adminDashboard.hidden = false;
  adminTitle.textContent = t("projectsHeading");
  adminIntro.textContent = t("dashboardIntro");
  projects = data.map(mapCloudProject);
  renderProjects();
  document.querySelector("#admin-current-email").textContent =
    t("currentEmail", { email: user.email || "" });
}

async function deleteProject(project) {
  if (!window.confirm(t("deleteConfirm", { name: projectText(project, "name") }))) {
    return;
  }

  dashboardError.hidden = true;
  const { error } = await getSupabaseClient()
    .from("projects")
    .delete()
    .eq("id", project.id);
  if (error) {
    dashboardError.textContent = t("projectDeleteFailed", {
      message: error.message,
    });
    dashboardError.hidden = false;
    return;
  }

  projects = projects.filter((item) => item.id !== project.id);
  renderProjects();
  try {
    await removeProjectFrames(project.frameUrls || []);
  } catch (cleanupError) {
    console.error("Project was deleted but its stored frames could not be removed:", cleanupError);
    dashboardError.textContent = t("projectDeletedFramesCleanupFailed", {
      message: cleanupError.message,
    });
    dashboardError.hidden = false;
  }
}

async function saveProject(event) {
  event.preventDefault();
  if (!adminUnlocked) return;

  const submitButton = projectForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  projectError.hidden = true;
  dashboardError.hidden = true;
  const values = new FormData(projectForm);
  const previous = projects.find((project) => project.id === editingProjectId);
  const id = editingProjectId || crypto.randomUUID();
  const files = values.getAll("frameFiles").filter((file) => file instanceof File && file.size);
  const url = String(values.get("url") || "").trim();
  const image = String(values.get("image") || "").trim();
  const isWebUrl = (value) => {
    if (!value) return true;
    try {
      return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
      return false;
    }
  };
  if (!isWebUrl(url) || !isWebUrl(image)) {
    projectError.textContent = t("invalidWebUrl");
    projectError.hidden = false;
    return;
  }
  let uploadedPaths = [];
  let projectSaved = false;

  try {
    let frameUrls = previous?.frameUrls || [];
    if (files.length > 0) {
      const upload = await uploadProjectFrames(files, id);
      frameUrls = upload.urls;
      uploadedPaths = upload.paths;
    }

    const frameFolder = files.length > 0 ? null : previous?.folder || null;
    const totalFrames = files.length > 0
      ? frameUrls.length
      : previous?.frames || 0;
    const payload = {
      id,
      name_en: String(values.get("nameEn") || "").trim(),
      name_ar: String(values.get("nameAr") || "").trim(),
      category_en: String(values.get("categoryEn") || "").trim(),
      category_ar: String(values.get("categoryAr") || "").trim(),
      description_en: String(values.get("descriptionEn") || "").trim(),
      description_ar: String(values.get("descriptionAr") || "").trim(),
      url: url || null,
      image_url: image || null,
      frame_folder: frameFolder,
      frame_urls: frameUrls,
      total_frames: totalFrames,
      start_frame: Math.min(previous?.startFrame || 1, Math.max(totalFrames, 1)),
      featured: values.get("featured") === "on",
      sort_order: previous?.sortOrder ?? projects.length + 1,
      updated_at: new Date().toISOString(),
    };
    const { error } = await getSupabaseClient()
      .from("projects")
      .upsert(payload);
    if (error) throw error;
    projectSaved = true;

    if (files.length > 0 && previous?.frameUrls?.length) {
      try {
        await removeProjectFrames(previous.frameUrls);
      } catch (cleanupError) {
        console.error("Project was saved but old frames could not be removed:", cleanupError);
        dashboardError.textContent = t("framesCleanupFailed", {
          message: cleanupError.message,
        });
        dashboardError.hidden = false;
      }
    }

    projectForm.reset();
    projectForm.hidden = true;
    editingProjectId = null;
    const { data, error: reloadError } = await getSupabaseClient()
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (reloadError) {
      dashboardError.textContent = t("projectLoadFailed", {
        message: reloadError.message,
      });
      dashboardError.hidden = false;
      return;
    }
    projects = data.map(mapCloudProject);
    renderProjects();
  } catch (error) {
    if (!projectSaved && uploadedPaths.length > 0) {
      const { error: cleanupError } = await getSupabaseClient()
        .storage.from(frameBucket)
        .remove(uploadedPaths);
      if (cleanupError) console.error("Could not clean up unsaved frame uploads:", cleanupError);
    }
    projectError.textContent = t(
      projectSaved ? "projectLoadFailed" : files.length > 0 && !uploadedPaths.length
        ? "frameUploadFailed"
        : "projectSaveFailed",
      { message: error.message || String(error) },
    );
    projectError.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
}

function closeOverlay(overlay) {
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  if (adminOverlay.hidden && detailOverlay.hidden && studioOverlay.hidden) {
    document.body.classList.remove("modal-open");
  }
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

document.querySelector("#open-admin").addEventListener("click", async () => {
  loginError.hidden = true;
  loginSuccess.hidden = true;
  loginForm.hidden = false;
  adminDashboard.hidden = true;
  adminIntro.textContent = t("adminIntro");
  openOverlay(adminOverlay);

  try {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    if (data.session) await enterAdminDashboard(data.session.user);
  } catch (error) {
    loginError.textContent = error.message || String(error);
    loginError.hidden = false;
  }
});

document.querySelector("#open-studio").addEventListener("click", () => {
  openOverlay(studioOverlay);
});

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  applyLanguage();
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    closeOverlay(document.getElementById(button.dataset.close));
  });
});

[adminOverlay, detailOverlay, studioOverlay].forEach((overlay) => {
  overlay.addEventListener("pointerdown", (event) => {
    if (event.target === overlay) closeOverlay(overlay);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOverlay(adminOverlay);
    closeOverlay(detailOverlay);
    closeOverlay(studioOverlay);
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = new FormData(loginForm);
  const email = String(values.get("email") || "").trim();

  loginError.hidden = true;
  loginSuccess.hidden = true;
  const submitButton = loginForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  try {
    const { error } = await getSupabaseClient().auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.href.split("#")[0],
        shouldCreateUser: false,
      },
    });
    if (error) throw error;
    loginSuccess.textContent = t("signInLinkSent", { email });
    loginSuccess.hidden = false;
  } catch (error) {
    loginError.textContent = t("signInLinkFailed", {
      message: error.message || String(error),
    });
    loginError.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
});

projectForm.addEventListener("submit", saveProject);

document.querySelector("#new-project").addEventListener("click", () => {
  openProjectEditor();
});

document.querySelector("#cancel-project").addEventListener("click", () => {
  projectForm.reset();
  projectForm.hidden = true;
  projectError.hidden = true;
  editingProjectId = null;
});

document.querySelector("#admin-signout").addEventListener("click", async () => {
  dashboardError.hidden = true;
  const { error } = await getSupabaseClient().auth.signOut();
  if (error) {
    dashboardError.textContent = t("signInFailed", { message: error.message });
    dashboardError.hidden = false;
    return;
  }

  adminUnlocked = false;
  adminDashboard.hidden = true;
  loginForm.hidden = false;
  adminTitle.textContent = t("adminAccess");
  adminIntro.textContent = t("adminIntro");
  projectForm.hidden = true;
  accountForm.reset();
  loginForm.reset();
});

accountForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  accountError.hidden = true;
  accountSuccess.hidden = true;
  const values = new FormData(accountForm);
  const email = String(values.get("email") || "").trim();
  const password = String(values.get("password") || "");
  const updates = {};
  if (email) updates.email = email;
  if (password) updates.password = password;

  if (Object.keys(updates).length === 0) {
    accountError.textContent = t("accountFieldsRequired");
    accountError.hidden = false;
    return;
  }

  const submitButton = accountForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  try {
    const { data, error } = await getSupabaseClient().auth.updateUser(updates);
    if (error) throw error;
    document.querySelector("#admin-current-email").textContent = t(
      "currentEmail",
      { email: data.user.email || "" },
    );
    accountSuccess.textContent = t("accountUpdated");
    accountSuccess.hidden = false;
    accountForm.reset();
  } catch (error) {
    accountError.textContent = t("accountUpdateFailed", {
      message: error.message || String(error),
    });
    accountError.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
});

function openProjectDetails(project) {
  activeProject = project;
  updateProjectDetails(project);
  openOverlay(detailOverlay);
}

function updateProjectDetails(project) {
  const visual = document.querySelector("#detail-visual");
  visual.querySelectorAll(".project-visual[data-frames]").forEach((preview) => {
    const state = sequenceStates.get(preview);
    if (state?.animationFrame) window.cancelAnimationFrame(state.animationFrame);
    if (state) window.clearTimeout(state.idleTimer);
    sequenceViewportObserver?.unobserve(preview);
    sequenceResizeObserver.unobserve(preview);
    sequenceVisuals.delete(preview);
  });
  visual.replaceChildren(createVisual(project));
  document.querySelector("#detail-category").textContent = projectText(
    project,
    "category",
  );
  document.querySelector("#detail-title").textContent = projectText(
    project,
    "name",
  );
  document.querySelector("#detail-description").textContent =
    projectText(project, "description");

  const link = document.querySelector("#detail-link");
  if (project.url) {
    link.href = project.url;
    link.hidden = false;
  } else {
    link.hidden = true;
    link.removeAttribute("href");
  }

}

detailNextButton.addEventListener("click", () => {
  if (!activeProject || projects.length < 2) return;
  const index = projects.indexOf(activeProject);
  activeProject = projects[(index + 1) % projects.length];
  updateProjectDetails(activeProject);
});

studioForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const values = new FormData(studioForm);
  const name = String(values.get("name") || "").trim();
  const email = String(values.get("email") || "").trim();
  const loginEmail = loginForm.querySelector('[name="email"]');
  loginEmail.value = email;
  loginError.hidden = true;
  loginSuccess.hidden = true;
  loginForm.hidden = false;
  adminDashboard.hidden = true;
  adminIntro.textContent = t("adminEntryRequired", { name });
  closeOverlay(studioOverlay);
  openOverlay(adminOverlay);

  try {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    if (data.session?.user.email?.toLowerCase() === email.toLowerCase()) {
      await enterAdminDashboard(data.session.user);
      return;
    }

    if (data.session) {
      const { error: signOutError } = await client.auth.signOut();
      if (signOutError) throw signOutError;
    }

    const { error: linkError } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.href.split("#")[0],
        shouldCreateUser: false,
      },
    });
    if (linkError) throw linkError;
    loginSuccess.textContent = t("signInLinkSent", { email });
    loginSuccess.hidden = false;
  } catch (error) {
    loginError.textContent = error.message || String(error);
    loginError.hidden = false;
  }
});

async function restoreAdminSession() {
  const config = window.PORTFOLIO_SUPABASE_CONFIG;
  if (!config?.url || !config.anonKey || !window.supabase?.createClient) return;

  try {
    const { data, error } = await getSupabaseClient().auth.getSession();
    if (error) throw error;
    if (!data.session) return;

    loginForm.hidden = true;
    adminDashboard.hidden = true;
    loginError.hidden = true;
    openOverlay(adminOverlay);
    await enterAdminDashboard(data.session.user);
  } catch (error) {
    loginForm.hidden = false;
    adminDashboard.hidden = true;
    loginError.textContent = error.message || String(error);
    loginError.hidden = false;
    openOverlay(adminOverlay);
  }
}

applyLanguage();
loadCloudProjects();
restoreAdminSession();
