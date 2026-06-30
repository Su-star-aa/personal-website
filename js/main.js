/* ==========================================
   main.js — 个人网站交互
   功能: 主题切换 | 打字机 | 滚动动画 | 项目筛选
         回到顶部 | 双语切换 | 导航高亮 | 移动菜单
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== DOM 引用 =====
  const body = document.documentElement;
  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const menuBtn = document.getElementById('menuBtn');
  const themeToggle = document.getElementById('themeToggle');
  const langToggle = document.getElementById('langToggle');
  const backToTop = document.getElementById('backToTop');
  const typingText = document.getElementById('typingText');
  const projectFilters = document.getElementById('projectFilters');
  const projectCards = document.querySelectorAll('.project-card');

  // ===== 1. 主题切换 =====
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const next = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ===== 2. 语言切换 =====
  const savedLang = localStorage.getItem('lang') || 'zh';
  body.setAttribute('data-lang', savedLang);
  applyLanguage(savedLang);

  langToggle.addEventListener('click', () => {
    const next = body.getAttribute('data-lang') === 'zh' ? 'en' : 'zh';
    body.setAttribute('data-lang', next);
    localStorage.setItem('lang', next);
    applyLanguage(next);
    // 重新启动打字机以切换语言
    restartTypewriter(next);
  });

  // ===== 3. 打字机效果 =====
  const texts = {
    zh: ['成果见证努力', '每一行代码都是成长的脚印', 'Hello, World!'],
    en: ['Effort Makes Results', 'Every line of code is a step forward', '你好，世界！']
  };

  let typewriterTimer = null;
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let currentLang = savedLang;

  function type() {
    const textList = texts[currentLang];
    const currentText = textList[currentTextIndex];
    const speed = isDeleting ? 40 : 100;

    if (!isDeleting && currentCharIndex <= currentText.length) {
      typingText.textContent = currentText.slice(0, currentCharIndex);
      currentCharIndex++;
      if (currentCharIndex > currentText.length) {
        // 打完一个词，停顿后开始删除
        isDeleting = true;
        typewriterTimer = setTimeout(type, 2000);
        return;
      }
    } else if (isDeleting && currentCharIndex >= 0) {
      typingText.textContent = currentText.slice(0, currentCharIndex);
      currentCharIndex--;
      if (currentCharIndex < 0) {
        // 删除完毕，切换下一个词
        isDeleting = false;
        currentCharIndex = 0;
        currentTextIndex = (currentTextIndex + 1) % textList.length;
        typewriterTimer = setTimeout(type, 400);
        return;
      }
    }

    typewriterTimer = setTimeout(type, speed);
  }

  function restartTypewriter(lang) {
    clearTimeout(typewriterTimer);
    currentLang = lang;
    currentTextIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;
    typingText.textContent = '';
    type();
  }

  // 启动
  type();

  // ===== 4. 滚动淡入动画 (Intersection Observer) =====
  const fadeElements = document.querySelectorAll(
    '.skill-card, .project-card, .info-card, .contact-card'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // Section titles 淡入
  const sectionTitles = document.querySelectorAll('.section-title');
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  sectionTitles.forEach(el => {
    el.classList.add('fade-in');
    titleObserver.observe(el);
  });

  // ===== 5. 导航栏滚动阴影 + 当前区块高亮 =====
  const allSections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // 导航阴影
    if (scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // 回到顶部按钮
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // 当前区块高亮
    let currentSection = '';
    allSections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== 6. 回到顶部 =====
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== 7. 移动端菜单 =====
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // 点击导航项后关闭菜单
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // 点击页面其他地方关闭菜单
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });

  // ===== 8. 项目筛选 =====
  projectFilters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // 更新 active 状态
      projectFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const categories = card.getAttribute('data-category') || '';
          if (categories.split(' ').includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

  // ===== 9. 键盘导航: Escape 关闭菜单 =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinks.classList.remove('open');
    }
  });

});

// ===== 10. 多语言数据 =====
const i18nData = {
  zh: {
    name: '吴苏圆',
    title: '前端开发学习者',
    aboutTitle: '关于我',
    aboutP1: '你好！我是吴苏圆，一名前端开发学习者。目前正在学习 HTML、CSS、JavaScript 等前端基础技术，同时对 Python 和 Git 也有所了解。',
    aboutP2: '我相信每一行代码都是成长的脚印，成果见证努力。在编程的世界里，每一次调试、每一个 Bug 的修复、每一个新知识的掌握，都是向前迈出的一步。',
    education: '教育背景',
    location: '所在地',
    focus: '学习方向',
    focusValue: '前端开发 / Web 技术',
    skillsTitle: '技能',
    projectsTitle: '项目作品',
    filterAll: '全部',
    filterHTML: 'HTML/CSS',
    filterJS: 'JavaScript',
    filterPython: 'Python',
    project1Name: '敬请期待',
    project1Desc: '正在学习前端技术，第一个项目即将上线',
    project2Name: '个人网站',
    project2Desc: '你正在浏览的这个网站，纯 HTML/CSS/JS 实现',
    project3Name: 'Python 练习',
    project3Desc: 'Python 基础练习和小工具合集',
    contactTitle: '联系方式',
    contactIntro: '如果你对我的学习经历感兴趣，或者想一起交流技术，欢迎通过以下方式联系我。',
    footerTagline: '成果见证努力',
    navAbout: '关于',
    navSkills: '技能',
    navProjects: '项目',
    navContact: '联系'
  },
  en: {
    name: 'Suyuan Wu',
    title: 'Frontend Learner',
    aboutTitle: 'About Me',
    aboutP1: "Hello! I'm Suyuan Wu, a frontend development learner. I'm currently studying HTML, CSS, JavaScript, and also have some experience with Python and Git.",
    aboutP2: 'I believe every line of code is a footprint of growth — effort makes results. In the world of programming, every debugging session, every bug fix, and every new concept mastered is a step forward.',
    education: 'Education',
    location: 'Location',
    focus: 'Focus',
    focusValue: 'Frontend / Web Technologies',
    skillsTitle: 'Skills',
    projectsTitle: 'Projects',
    filterAll: 'All',
    filterHTML: 'HTML/CSS',
    filterJS: 'JavaScript',
    filterPython: 'Python',
    project1Name: 'Coming Soon',
    project1Desc: 'Learning frontend technologies — first project coming soon',
    project2Name: 'Personal Website',
    project2Desc: 'The website you are viewing — built with pure HTML/CSS/JS',
    project3Name: 'Python Practice',
    project3Desc: 'Collection of Python basics practice and small tools',
    contactTitle: 'Contact',
    contactIntro: "If you're interested in my learning journey or want to chat about tech, feel free to reach out.",
    footerTagline: 'Effort Makes Results',
    navAbout: 'About',
    navSkills: 'Skills',
    navProjects: 'Projects',
    navContact: 'Contact'
  }
};

function applyLanguage(lang) {
  const data = i18nData[lang] || i18nData.zh;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (data[key]) {
      el.textContent = data[key];
    }
  });
  // 更新导航
  document.querySelectorAll('[data-i18n-nav]').forEach(el => {
    const key = el.getAttribute('data-i18n-nav');
    if (data[`nav${key.charAt(0).toUpperCase() + key.slice(1)}`]) {
      el.textContent = data[`nav${key.charAt(0).toUpperCase() + key.slice(1)}`];
    }
  });
  // 更新页面标题
  document.title = lang === 'zh'
    ? '吴苏圆 — 前端开发学习者'
    : 'Suyuan Wu — Frontend Learner';
}
