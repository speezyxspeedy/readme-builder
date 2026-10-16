/**
 * ProfileCraft — GitHub Profile README Builder
 * Pure Vanilla JavaScript (Modular, Clean, Production-Ready)
 */

(function () {
  'use strict';



  const STORAGE_KEY = 'profilecraft_draft_v1';
  const THEME_KEY = 'profilecraft_theme_pref';

  // Curated Preset Metadata for Shields.io Badges
  const BADGE_PRESETS = {
    // Languages
    'JavaScript': { color: 'F7DF1E', logo: 'javascript', logoColor: 'black' },
    'TypeScript': { color: '3178C6', logo: 'typescript', logoColor: 'white' },
    'Python': { color: '3776AB', logo: 'python', logoColor: 'white' },
    'Rust': { color: '000000', logo: 'rust', logoColor: 'white' },
    'Go': { color: '00ADD8', logo: 'go', logoColor: 'white' },
    'C++': { color: '00599C', logo: 'cplusplus', logoColor: 'white' },
    'Java': { color: 'ED8B00', logo: 'openjdk', logoColor: 'white' },
    'C#': { color: '239120', logo: 'c-sharp', logoColor: 'white' },
    'PHP': { color: '777BB4', logo: 'php', logoColor: 'white' },
    'Ruby': { color: 'CC342D', logo: 'ruby', logoColor: 'white' },
    'Swift': { color: 'F05138', logo: 'swift', logoColor: 'white' },
    'Kotlin': { color: '7F52FF', logo: 'kotlin', logoColor: 'white' },
    'HTML5': { color: 'E34F26', logo: 'html5', logoColor: 'white' },
    'CSS3': { color: '1572B6', logo: 'css3', logoColor: 'white' },
    'SQL': { color: 'CC292B', logo: 'sqlite', logoColor: 'white' },

    // Frameworks & Libraries
    'React': { color: '20232A', logo: 'react', logoColor: '61DAFB' },
    'Next.js': { color: '000000', logo: 'nextdotjs', logoColor: 'white' },
    'Vue.js': { color: '4FC08D', logo: 'vuedotjs', logoColor: 'white' },
    'Node.js': { color: '339933', logo: 'nodedotjs', logoColor: 'white' },
    'Express': { color: '000000', logo: 'express', logoColor: 'white' },
    'TailwindCSS': { color: '06B6D4', logo: 'tailwindcss', logoColor: 'white' },
    'GraphQL': { color: 'E10098', logo: 'graphql', logoColor: 'white' },
    'Angular': { color: 'DD0031', logo: 'angular', logoColor: 'white' },
    'Svelte': { color: 'FF3E00', logo: 'svelte', logoColor: 'white' },
    'Django': { color: '092E20', logo: 'django', logoColor: 'white' },
    'Flask': { color: '000000', logo: 'flask', logoColor: 'white' },
    'FastAPI': { color: '009688', logo: 'fastapi', logoColor: 'white' },
    'Spring Boot': { color: '6DB33F', logo: 'springboot', logoColor: 'white' },

    // Databases & Cloud
    'PostgreSQL': { color: '4169E1', logo: 'postgresql', logoColor: 'white' },
    'MongoDB': { color: '47A248', logo: 'mongodb', logoColor: 'white' },
    'Redis': { color: 'DC382D', logo: 'redis', logoColor: 'white' },
    'Docker': { color: '2496ED', logo: 'docker', logoColor: 'white' },
    'AWS': { color: '232F3E', logo: 'amazonaws', logoColor: 'FF9900' },
    'Kubernetes': { color: '326CE5', logo: 'kubernetes', logoColor: 'white' },
    'Firebase': { color: 'FFCA28', logo: 'firebase', logoColor: 'black' },
    'Supabase': { color: '3ECF8E', logo: 'supabase', logoColor: 'white' },
    'MySQL': { color: '4479A1', logo: 'mysql', logoColor: 'white' },

    // Tools
    'Git': { color: 'F05032', logo: 'git', logoColor: 'white' },
    'Linux': { color: 'FCC624', logo: 'linux', logoColor: 'black' },
    'GitHub Actions': { color: '2088FF', logo: 'githubactions', logoColor: 'white' },
    'Figma': { color: 'F24E1E', logo: 'figma', logoColor: 'white' },
    'Postman': { color: 'FF6C37', logo: 'postman', logoColor: 'white' },
    'Jest': { color: 'C21325', logo: 'jest', logoColor: 'white' },
    'Vite': { color: '646CFF', logo: 'vite', logoColor: 'white' }
  };

  // Sample Profile Data for Quick Onboarding
  const SAMPLE_PROFILE = {
    fullName: 'Alex Morgan',
    username: 'alexmorgan-dev',
    headline: 'Senior Full Stack Engineer & Open Source Advocate',
    location: 'San Francisco, CA (Remote)',
    company: 'HyperScale Labs',
    bio: 'Architecting resilient cloud-native microservices and developer tooling with TypeScript, Rust, and Go. Passionate about performant web standards, distributed consensus, and open source ecosystems.',

    workingOn: 'NovaDB — An in-memory distributed key-value store with Raft consensus',
    learning: 'WebAssembly, eBPF system instrumentation, and WebGPU shaders',
    collaborating: 'High-throughput CLI developer tooling and asynchronous Rust libraries',
    askMe: 'Distributed Systems, TypeScript architecture, Web Performance, and Docker',
    funFact: 'I roast specialty single-origin Ethiopian coffee and run 50k ultramarathons.',

    skillsFormat: 'badges', // 'badges' | 'list'
    skills: {
      languages: [
        { name: 'TypeScript', color: '3178C6', logo: 'typescript' },
        { name: 'JavaScript', color: 'F7DF1E', logo: 'javascript' },
        { name: 'Rust', color: '000000', logo: 'rust' },
        { name: 'Go', color: '00ADD8', logo: 'go' },
        { name: 'Python', color: '3776AB', logo: 'python' }
      ],
      frameworks: [
        { name: 'React', color: '20232A', logo: 'react' },
        { name: 'Next.js', color: '000000', logo: 'nextdotjs' },
        { name: 'Node.js', color: '339933', logo: 'nodedotjs' },
        { name: 'TailwindCSS', color: '06B6D4', logo: 'tailwindcss' },
        { name: 'GraphQL', color: 'E10098', logo: 'graphql' }
      ],
      databases: [
        { name: 'PostgreSQL', color: '4169E1', logo: 'postgresql' },
        { name: 'Redis', color: 'DC382D', logo: 'redis' },
        { name: 'Docker', color: '2496ED', logo: 'docker' },
        { name: 'AWS', color: '232F3E', logo: 'amazonaws' },
        { name: 'Kubernetes', color: '326CE5', logo: 'kubernetes' }
      ],
      tools: [
        { name: 'Git', color: 'F05032', logo: 'git' },
        { name: 'Linux', color: 'FCC624', logo: 'linux' },
        { name: 'GitHub Actions', color: '2088FF', logo: 'githubactions' },
        { name: 'Postman', color: 'FF6C37', logo: 'postman' }
      ]
    },

    projects: [
      {
        id: 'proj_1',
        title: 'NovaDB — High-Throughput Key-Value Engine',
        description: 'An embedded LSM-tree key-value storage engine in Rust with WAL durability and snapshotting.',
        tech: ['Rust', 'Tokio', 'Raft'],
        repoUrl: 'https://github.com/alexmorgan-dev/novadb',
        liveUrl: 'https://novadb.dev'
      },
      {
        id: 'proj_2',
        title: 'PulseKit — Real-time Web Observability',
        description: 'Lightweight client-side telemetry and Core Web Vitals streaming dashboard with zero dependencies.',
        tech: ['TypeScript', 'Next.js', 'ClickHouse'],
        repoUrl: 'https://github.com/alexmorgan-dev/pulsekit',
        liveUrl: 'https://pulsekit.dev'
      },
      {
        id: 'proj_3',
        title: 'Fastpack CLI',
        description: 'A blazing-fast multi-threaded asset bundling utility built on top of esbuild and SWC.',
        tech: ['Go', 'Cobra', 'esbuild'],
        repoUrl: 'https://github.com/alexmorgan-dev/fastpack',
        liveUrl: ''
      }
    ],

    education: 'B.S. in Computer Science — University of California, Berkeley (2018-2022)',
    achievements: '- Winner, HackMIT 2021 (Grand Prize Best Developer Tool)\n- Top 2% Contributor to Kubernetes SIG-Node working group\n- Speaker at RustConf 2023 on Zero-Cost Concurrent Primitives',

    socials: {
      email: 'alex.morgan.dev@gmail.com',
      portfolio: 'https://alexmorgan.dev',
      linkedin: 'alex-morgan-dev',
      twitter: 'alexmorgan_dev',
      devto: 'alexmorgan',
      youtube: '@AlexMorganTech'
    },

    widgets: {
      stats: true,
      langs: true,
      streak: true,
      trophy: false,
      theme: 'tokyonight'
    },

    closingMessage: '⭐️ If you find any of my open source projects helpful, please consider leaving a star on GitHub!',
    profileCraftBadge: true
  };

  // Central Application State
  const state = {
    profile: JSON.parse(JSON.stringify(SAMPLE_PROFILE)),
    template: 'professional', // 'professional' | 'minimal' | 'opensource' | 'student'
    previewMode: 'rendered', // 'rendered' | 'raw'
    theme: 'dark'
  };

  // Debounce helper
  let debounceTimer = null;
  function debounce(fn, delay = 200) {
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // =========================================================================
  // DOM ELEMENT REFERENCES
  // =========================================================================

  const DOM = {
    // Nav & Theme
    html: document.documentElement,
    navTemplateSelect: document.getElementById('nav-template-select'),
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    btnLoadSample: document.getElementById('btn-load-sample'),
    btnResetDraft: document.getElementById('btn-reset-draft'),
    btnJsonModal: document.getElementById('btn-json-modal'),
    btnGuideModal: document.getElementById('btn-guide-modal'),
    btnPrivacyModal: document.getElementById('btn-privacy-modal'),
    btnShortcutsModal: document.getElementById('btn-shortcuts-modal'),
    saveStatusText: document.querySelector('#save-status .status-text'),
    saveStatusEl: document.getElementById('save-status'),

    // Mobile tabs
    mobileTabEditor: document.getElementById('mobile-tab-editor'),
    mobileTabPreview: document.getElementById('mobile-tab-preview'),
    editorPanel: document.getElementById('editor-panel'),
    previewPanel: document.getElementById('preview-panel'),

    // GitHub Fetch
    fetchGithubInput: document.getElementById('fetch-github-user'),
    btnFetchGithub: document.getElementById('btn-fetch-github'),
    fetchSpinner: document.getElementById('fetch-spinner'),
    fetchBtnLabel: document.getElementById('fetch-btn-label'),
    githubAlert: document.getElementById('github-api-alert'),

    // Form Fields - Basic
    fieldFullName: document.getElementById('field-fullname'),
    fieldUsername: document.getElementById('field-github-username'),
    fieldHeadline: document.getElementById('field-headline'),
    fieldLocation: document.getElementById('field-location'),
    fieldCompany: document.getElementById('field-company'),
    fieldBio: document.getElementById('field-bio'),

    // Form Fields - Learning
    fieldWorkingOn: document.getElementById('field-working-on'),
    fieldLearning: document.getElementById('field-learning'),
    fieldCollaborating: document.getElementById('field-collaborating'),
    fieldAskMe: document.getElementById('field-ask-me'),
    fieldFunFact: document.getElementById('field-fun-fact'),

    // Skills
    skillsFormatRadios: document.querySelectorAll('input[name="skills_format"]'),
    skillsTotalBadge: document.getElementById('skills-total-badge'),
    catContainers: {
      languages: document.getElementById('tags-languages'),
      frameworks: document.getElementById('tags-frameworks'),
      databases: document.getElementById('tags-databases'),
      tools: document.getElementById('tags-tools')
    },
    catInputs: {
      languages: document.getElementById('input-cat-languages'),
      frameworks: document.getElementById('input-cat-frameworks'),
      databases: document.getElementById('input-cat-databases'),
      tools: document.getElementById('input-cat-tools')
    },

    // Projects
    projectsTotalBadge: document.getElementById('projects-total-badge'),
    projectsListContainer: document.getElementById('projects-list-container'),
    btnAddProject: document.getElementById('btn-add-project'),

    // Education & Achievements
    fieldEducation: document.getElementById('field-education'),
    fieldAchievements: document.getElementById('field-achievements'),

    // Socials
    fieldSocialEmail: document.getElementById('field-social-email'),
    fieldSocialPortfolio: document.getElementById('field-social-portfolio'),
    fieldSocialLinkedin: document.getElementById('field-social-linkedin'),
    fieldSocialTwitter: document.getElementById('field-social-twitter'),
    fieldSocialDevto: document.getElementById('field-social-devto'),
    fieldSocialYoutube: document.getElementById('field-social-youtube'),

    // Widgets
    widgetStats: document.getElementById('widget-stats'),
    widgetLangs: document.getElementById('widget-langs'),
    widgetStreak: document.getElementById('widget-streak'),
    widgetTrophy: document.getElementById('widget-trophy'),
    widgetThemeSelect: document.getElementById('widget-theme-select'),

    // Closing
    fieldClosing: document.getElementById('field-closing'),
    fieldProfilecraftBadge: document.getElementById('field-profilecraft-badge'),

    // Preview
    tabModeRendered: document.getElementById('tab-mode-rendered'),
    tabModeRaw: document.getElementById('tab-mode-raw'),
    renderedContainer: document.getElementById('rendered-preview-container'),
    rawContainer: document.getElementById('raw-preview-container'),
    rawCode: document.getElementById('raw-markdown-code'),
    statChars: document.getElementById('stat-chars'),
    statWords: document.getElementById('stat-words'),
    statLines: document.getElementById('stat-lines'),
    btnCopyMarkdown: document.getElementById('btn-copy-markdown'),
    btnCopyLabel: document.getElementById('btn-copy-label'),
    btnDownloadMd: document.getElementById('btn-download-md'),
    btnCopyRawInline: document.getElementById('btn-copy-raw-inline'),

    // Modals
    modalGuide: document.getElementById('modal-guide'),
    modalJson: document.getElementById('modal-json'),
    modalReset: document.getElementById('modal-reset'),
    modalPrivacy: document.getElementById('modal-privacy'),
    modalShortcuts: document.getElementById('modal-shortcuts'),
    btnDownloadJson: document.getElementById('btn-download-json'),
    jsonFileInput: document.getElementById('json-file-input'),
    jsonImportStatus: document.getElementById('json-import-status'),
    btnConfirmReset: document.getElementById('btn-confirm-reset'),
    btnGuideCopyAll: document.getElementById('btn-guide-copy-all'),
    btnCopyGitCmd: document.getElementById('btn-copy-git-cmd'),
    userHandlePlaceholders: document.querySelectorAll('.user-handle-placeholder'),

    // Toast
    toastContainer: document.getElementById('toast-container'),
    btnCollapseAll: document.getElementById('btn-collapse-all')
  };

  // =========================================================================
  // TOAST NOTIFICATIONS & MODALS
  // =========================================================================

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 3100);
  }

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = 'flex';
    // Accessibility: set focus to modal
    modalEl.setAttribute('aria-hidden', 'false');
    const firstFocusable = modalEl.querySelector('button, input, select, textarea');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.style.display = 'none';
    modalEl.setAttribute('aria-hidden', 'true');
  }

  // =========================================================================
  // MARKDOWN SANITIZER & PARSER (GitHub Compatible & Safe)
  // =========================================================================

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeUrl(url) {
    if (!url) return '#';
    const trimmed = String(url).trim();
    // Allow safe protocols
    if (/^(https?:|mailto:|#|\/)/i.test(trimmed)) {
      return trimmed;
    }
    return '#';
  }

  /**
   * Safe custom Markdown renderer for the Live Preview.
   * Parses standard Markdown elements, tables, badges, blockquotes, code blocks.
   * Guaranteed safe: raw HTML is escaped upfront.
   */
  function renderMarkdownToHtml(markdown) {
    if (!markdown || typeof markdown !== 'string') return '';

    // First, split into lines for block-level parsing
    const lines = markdown.split(/\r?\n/);
    const htmlLines = [];
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockContent = [];
    let inList = false;
    let listType = 'ul'; // 'ul' | 'ol'
    let inTable = false;
    let tableRows = [];

    function closeList() {
      if (inList) {
        htmlLines.push(`</${listType}>`);
        inList = false;
      }
    }

    function closeTable() {
      if (inTable && tableRows.length > 0) {
        let tableHtml = '<table>';
        // First row is header if followed by separator
        const headerRow = tableRows[0];
        tableHtml += '<thead><tr>';
        headerRow.forEach(cell => {
          tableHtml += `<th>${parseInlineMarkdown(cell)}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';

        for (let i = 1; i < tableRows.length; i++) {
          tableHtml += '<tr>';
          tableRows[i].forEach(cell => {
            tableHtml += `<td>${parseInlineMarkdown(cell)}</td>`;
          });
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table>';
        htmlLines.push(tableHtml);
        inTable = false;
        tableRows = [];
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code Block Boundary
      if (line.startsWith('```')) {
        closeList();
        closeTable();
        if (inCodeBlock) {
          // Close code block
          const safeCode = escapeHtml(codeBlockContent.join('\n'));
          htmlLines.push(`<pre><code class="language-${codeBlockLang}">${safeCode}</code></pre>`);
          codeBlockContent = [];
          inCodeBlock = false;
        } else {
          // Start code block
          inCodeBlock = true;
          codeBlockLang = line.replace('```', '').trim();
          codeBlockContent = [];
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // Blank line
      if (line.trim() === '') {
        closeList();
        closeTable();
        continue;
      }

      // Markdown Table Row (| col1 | col2 |)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        closeList();
        const rawCells = line.trim().split('|').slice(1, -1);
        const isSeparator = rawCells.every(c => /^[\s\-:]+$/.test(c.trim()));

        if (isSeparator) {
          // Ignore table divider row (|---|---|)
          continue;
        }

        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        tableRows.push(rawCells.map(c => c.trim()));
        continue;
      } else {
        closeTable();
      }

      // Headings
      const h4Match = line.match(/^####\s+(.*)$/);
      if (h4Match) {
        closeList();
        htmlLines.push(`<h4>${parseInlineMarkdown(h4Match[1])}</h4>`);
        continue;
      }
      const h3Match = line.match(/^###\s+(.*)$/);
      if (h3Match) {
        closeList();
        htmlLines.push(`<h3>${parseInlineMarkdown(h3Match[1])}</h3>`);
        continue;
      }
      const h2Match = line.match(/^##\s+(.*)$/);
      if (h2Match) {
        closeList();
        htmlLines.push(`<h2>${parseInlineMarkdown(h2Match[1])}</h2>`);
        continue;
      }
      const h1Match = line.match(/^#\s+(.*)$/);
      if (h1Match) {
        closeList();
        htmlLines.push(`<h1>${parseInlineMarkdown(h1Match[1])}</h1>`);
        continue;
      }

      // Horizontal Rule
      if (/^(\*\*\*|---|___)$/.test(line.trim())) {
        closeList();
        htmlLines.push('<hr>');
        continue;
      }

      // Blockquote
      if (line.startsWith('>')) {
        closeList();
        const quoteText = line.replace(/^>\s?/, '');
        htmlLines.push(`<blockquote><p>${parseInlineMarkdown(quoteText)}</p></blockquote>`);
        continue;
      }

      // Unordered List (- or *)
      const ulMatch = line.match(/^[-*]\s+(.*)$/);
      if (ulMatch) {
        if (!inList || listType !== 'ul') {
          closeList();
          inList = true;
          listType = 'ul';
          htmlLines.push('<ul>');
        }
        htmlLines.push(`<li>${parseInlineMarkdown(ulMatch[1])}</li>`);
        continue;
      }

      // Ordered List (1. 2.)
      const olMatch = line.match(/^\d+\.\s+(.*)$/);
      if (olMatch) {
        if (!inList || listType !== 'ol') {
          closeList();
          inList = true;
          listType = 'ol';
          htmlLines.push('<ol>');
        }
        htmlLines.push(`<li>${parseInlineMarkdown(olMatch[1])}</li>`);
        continue;
      }

      // Normal Paragraph / Text Line
      closeList();
      htmlLines.push(`<p>${parseInlineMarkdown(line)}</p>`);
    }

    closeList();
    closeTable();

    return htmlLines.join('\n');
  }

  /**
   * Inline Markdown parser: bold, italic, inline code, badges, images, links.
   */
  function parseInlineMarkdown(text) {
    if (!text) return '';

    // First safely escape raw characters
    let out = escapeHtml(text);

    // Inline Code: `code`
    out = out.replace(/`([^`]+)`/g, (match, p1) => `<code>${p1}</code>`);

    // Images / Badges: ![alt](url)
    out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
      const safeUrl = sanitizeUrl(url);
      return `<img src="${safeUrl}" alt="${alt}" loading="lazy">`;
    });

    // Links: [text](url)
    out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const safeUrl = sanitizeUrl(url);
      return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    });

    // Bold + Italic: ***text***
    out = out.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');

    // Bold: **text**
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic: *text* or _text_
    out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    out = out.replace(/_([^_]+)_/g, '<em>$1</em>');

    return out;
  }

  // =========================================================================
  // TEMPLATE GENERATORS (4 DISTINCT STYLES)
  // =========================================================================

  /**
   * Helper to format skill items into either Shields.io Badges or text list
   */
  function generateSkillMarkup(categorySkills, format = 'badges') {
    if (!categorySkills || categorySkills.length === 0) return '';

    if (format === 'list') {
      return categorySkills.map(s => `\`${s.name}\``).join(' • ');
    }

    // Shields.io Badges
    return categorySkills.map(skill => {
      const preset = BADGE_PRESETS[skill.name] || {};
      const color = skill.color || preset.color || '6366F1';
      const logo = skill.logo || preset.logo || '';
      const logoParam = logo ? `&logo=${encodeURIComponent(logo)}` : '';
      const logoColorParam = preset.logoColor ? `&logoColor=${encodeURIComponent(preset.logoColor)}` : '&logoColor=white';
      const cleanName = encodeURIComponent(skill.name.replace(/-/g, '--'));

      return `![${skill.name}](https://img.shields.io/badge/${cleanName}-${color}?style=for-the-badge${logoParam}${logoColorParam})`;
    }).join(' ');
  }

  /**
   * Helper to generate Social Media Badges
   */
  function generateSocialsMarkdown(socials) {
    if (!socials) return '';
    const badges = [];

    if (socials.portfolio) {
      badges.push(`[![Portfolio](https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=google-chrome&logoColor=white)](${socials.portfolio})`);
    }
    if (socials.linkedin) {
      const link = socials.linkedin.startsWith('http') ? socials.linkedin : `https://linkedin.com/in/${socials.linkedin}`;
      badges.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](${link})`);
    }
    if (socials.twitter) {
      const handle = socials.twitter.replace('@', '');
      badges.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/${handle})`);
    }
    if (socials.devto) {
      const link = socials.devto.startsWith('http') ? socials.devto : `https://dev.to/${socials.devto}`;
      badges.push(`[![Dev.to](https://img.shields.io/badge/Dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white)](${link})`);
    }
    if (socials.youtube) {
      const handle = socials.youtube.startsWith('http') ? socials.youtube : `https://youtube.com/${socials.youtube}`;
      badges.push(`[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](${handle})`);
    }
    if (socials.email) {
      badges.push(`[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${socials.email})`);
    }

    return badges.join(' ');
  }

  /**
   * Helper to generate GitHub Stats widgets
   */
  function generateWidgetMarkdown(username, widgets) {
    if (!username || !widgets) return '';
    const theme = widgets.theme || 'tokyonight';
    const lines = [];

    if (widgets.stats || widgets.langs) {
      lines.push('### 📊 GitHub Activity');
      lines.push('');
      if (widgets.stats) {
        lines.push(`![${username}'s GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&count_private=true&hide_border=true)`);
      }
      if (widgets.langs) {
        lines.push(`![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}&hide_border=true)`);
      }
      lines.push('');
    }

    if (widgets.streak) {
      lines.push(`![GitHub Streak](https://streak-stats.demolab.com/?user=${username}&theme=${theme}&hide_border=true)`);
      lines.push('');
    }

    if (widgets.trophy) {
      lines.push(`[![trophy](https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&no-frame=true)](https://github.com/ryo-ma/github-profile-trophy)`);
      lines.push('');
    }

    return lines.join('\n');
  }

  // 1. TEMPLATE: PROFESSIONAL PORTFOLIO
  function renderProfessionalTemplate(p) {
    const md = [];

    // Header Greeting
    md.push(`# Hi there, I'm ${p.fullName || 'Developer'} 👋`);
    if (p.headline) {
      md.push(`### \`${p.headline}\``);
    }
    md.push('');

    // Quick Social Links
    const socialsMd = generateSocialsMarkdown(p.socials);
    if (socialsMd) {
      md.push(socialsMd);
      md.push('');
    }

    // Bio & Location
    if (p.bio) {
      md.push(p.bio);
      md.push('');
    }

    const metaItems = [];
    if (p.location) metaItems.push(`📍 Based in **${p.location}**`);
    if (p.company) metaItems.push(`💼 Currently at **${p.company}**`);
    if (metaItems.length > 0) {
      md.push(metaItems.join(' • '));
      md.push('');
    }

    md.push('---');
    md.push('');

    // Status & Collaboration
    const goals = [];
    if (p.workingOn) goals.push(`- 🔭 Currently working on **${p.workingOn}**`);
    if (p.learning) goals.push(`- 🌱 Currently learning **${p.learning}**`);
    if (p.collaborating) goals.push(`- 👯 Looking to collaborate on **${p.collaborating}**`);
    if (p.askMe) goals.push(`- 💬 Ask me about **${p.askMe}**`);
    if (p.funFact) goals.push(`- ⚡ Fun fact: ${p.funFact}`);

    if (goals.length > 0) {
      md.push('### 🚀 About My Work');
      md.push('');
      goals.forEach(g => md.push(g));
      md.push('');
    }

    // Skills & Technologies
    const hasSkills = p.skills && Object.values(p.skills).some(arr => arr && arr.length > 0);
    if (hasSkills) {
      md.push('### 🛠️ Tech Stack & Skills');
      md.push('');

      if (p.skills.languages && p.skills.languages.length > 0) {
        md.push('**Languages:**');
        md.push(generateSkillMarkup(p.skills.languages, p.skillsFormat));
        md.push('');
      }
      if (p.skills.frameworks && p.skills.frameworks.length > 0) {
        md.push('**Frameworks & Libraries:**');
        md.push(generateSkillMarkup(p.skills.frameworks, p.skillsFormat));
        md.push('');
      }
      if (p.skills.databases && p.skills.databases.length > 0) {
        md.push('**Databases & Cloud Infrastructure:**');
        md.push(generateSkillMarkup(p.skills.databases, p.skillsFormat));
        md.push('');
      }
      if (p.skills.tools && p.skills.tools.length > 0) {
        md.push('**Tools & Environments:**');
        md.push(generateSkillMarkup(p.skills.tools, p.skillsFormat));
        md.push('');
      }
    }

    // Featured Projects Table
    if (p.projects && p.projects.length > 0) {
      md.push('### 🌟 Featured Projects');
      md.push('');
      md.push('| Project | Description | Stack | Links |');
      md.push('|:---|:---|:---|:---|');

      p.projects.forEach(proj => {
        const title = proj.title ? `**${proj.title}**` : 'Untitled Project';
        const desc = proj.description || 'No description provided';
        const techStr = (proj.tech && proj.tech.length > 0) ? proj.tech.map(t => `\`${t}\``).join(' ') : '—';

        const links = [];
        if (proj.repoUrl) links.push(`[GitHub](${proj.repoUrl})`);
        if (proj.liveUrl) links.push(`[Demo](${proj.liveUrl})`);
        const linksStr = links.length > 0 ? links.join(' • ') : '—';

        md.push(`| ${title} | ${desc} | ${techStr} | ${linksStr} |`);
      });
      md.push('');
    }

    // Achievements & Education
    if (p.education || p.achievements) {
      md.push('### 🏆 Background & Milestones');
      md.push('');
      if (p.education) {
        md.push(`- 🎓 **Education:** ${p.education}`);
      }
      if (p.achievements) {
        const achLines = p.achievements.split('\n').filter(l => l.trim() !== '');
        achLines.forEach(l => {
          const clean = l.replace(/^[-*]\s*/, '');
          md.push(`- 🎖️ ${clean}`);
        });
      }
      md.push('');
    }

    // Widgets
    const widgetsMd = generateWidgetMarkdown(p.username, p.widgets);
    if (widgetsMd) {
      md.push(widgetsMd);
    }

    // Closing Note
    if (p.closingMessage) {
      md.push('---');
      md.push('');
      md.push(`> ${p.closingMessage}`);
      md.push('');
    }

    if (p.profileCraftBadge) {
      md.push('<sub>Crafted with [ProfileCraft](https://github.com/alexmorgan-dev) • GitHub Profile README Builder</sub>');
    }

    return md.join('\n');
  }

  // 2. TEMPLATE: MINIMAL DEVELOPER
  function renderMinimalTemplate(p) {
    const md = [];

    md.push(`# ${p.fullName || p.username || 'Developer'}`);
    if (p.headline) {
      md.push(`${p.headline}`);
      md.push('');
    }

    if (p.bio) {
      md.push(p.bio);
      md.push('');
    }

    // Contact
    const contacts = [];
    if (p.socials.email) contacts.push(`[Email](mailto:${p.socials.email})`);
    if (p.socials.portfolio) contacts.push(`[Website](${p.socials.portfolio})`);
    if (p.username) contacts.push(`[GitHub](https://github.com/${p.username})`);
    if (p.socials.linkedin) {
      const link = p.socials.linkedin.startsWith('http') ? p.socials.linkedin : `https://linkedin.com/in/${p.socials.linkedin}`;
      contacts.push(`[LinkedIn](${link})`);
    }
    if (contacts.length > 0) {
      md.push(contacts.join(' / '));
      md.push('');
    }

    md.push('---');
    md.push('');

    // Focus & Stack
    md.push('## Focus');
    md.push('');
    if (p.workingOn) md.push(`- **Building:** ${p.workingOn}`);
    if (p.learning) md.push(`- **Exploring:** ${p.learning}`);
    if (p.collaborating) md.push(`- **Collaboration:** ${p.collaborating}`);
    md.push('');

    // Tech Stack list
    const hasSkills = p.skills && Object.values(p.skills).some(arr => arr && arr.length > 0);
    if (hasSkills) {
      md.push('## Tech Stack');
      md.push('');
      if (p.skills.languages && p.skills.languages.length > 0) {
        md.push(`- **Languages:** ${p.skills.languages.map(s => s.name).join(', ')}`);
      }
      if (p.skills.frameworks && p.skills.frameworks.length > 0) {
        md.push(`- **Frameworks:** ${p.skills.frameworks.map(s => s.name).join(', ')}`);
      }
      if (p.skills.databases && p.skills.databases.length > 0) {
        md.push(`- **Storage & Cloud:** ${p.skills.databases.map(s => s.name).join(', ')}`);
      }
      if (p.skills.tools && p.skills.tools.length > 0) {
        md.push(`- **Tooling:** ${p.skills.tools.map(s => s.name).join(', ')}`);
      }
      md.push('');
    }

    // Selected Projects
    if (p.projects && p.projects.length > 0) {
      md.push('## Selected Projects');
      md.push('');
      p.projects.forEach(proj => {
        const link = proj.repoUrl ? ` - [View Code](${proj.repoUrl})` : '';
        md.push(`- **${proj.title}**${link}: ${proj.description || ''}`);
      });
      md.push('');
    }

    if (p.closingMessage) {
      md.push(`*${p.closingMessage}*`);
      md.push('');
    }

    return md.join('\n');
  }

  // 3. TEMPLATE: OPEN SOURCE CONTRIBUTOR
  function renderOpenSourceTemplate(p) {
    const md = [];

    md.push(`# 🌐 Open Source Portfolio: ${p.fullName || p.username || 'Contributor'}`);
    md.push(`> ${p.headline || 'Open Source Contributor & Systems Hacker'}`);
    md.push('');

    // Badges Banner
    const socialsMd = generateSocialsMarkdown(p.socials);
    if (socialsMd) {
      md.push(socialsMd);
      md.push('');
    }

    if (p.bio) {
      md.push(p.bio);
      md.push('');
    }

    md.push('## 🤝 How to Collaborate');
    md.push('');
    if (p.workingOn) md.push(`- 🏗️ **Core Maintainer:** ${p.workingOn}`);
    if (p.collaborating) md.push(`- 💡 **Open for PRs & Discussions:** ${p.collaborating}`);
    if (p.learning) md.push(`- 🔬 **Research & Experiments:** ${p.learning}`);
    if (p.askMe) md.push(`- 💬 **Code Review & Mentorship:** ${p.askMe}`);
    md.push('');

    // Open Source Repos
    if (p.projects && p.projects.length > 0) {
      md.push('## 📦 Open Source Repositories & Tools');
      md.push('');
      p.projects.forEach(proj => {
        md.push(`### 🔗 [${proj.title}](${proj.repoUrl || '#'})`);
        md.push(proj.description || '');
        if (proj.tech && proj.tech.length > 0) {
          md.push(`**Built with:** ${proj.tech.map(t => `\`${t}\``).join(', ')}`);
        }
        if (proj.liveUrl) {
          md.push(`[🌐 Documentation & Live Demo](${proj.liveUrl})`);
        }
        md.push('');
      });
    }

    // Skills Badges
    const hasSkills = p.skills && Object.values(p.skills).some(arr => arr && arr.length > 0);
    if (hasSkills) {
      md.push('## ⚡ Languages & OSS Tooling');
      md.push('');
      const allSkills = [
        ...(p.skills.languages || []),
        ...(p.skills.frameworks || []),
        ...(p.skills.databases || []),
        ...(p.skills.tools || [])
      ];
      md.push(generateSkillMarkup(allSkills, p.skillsFormat));
      md.push('');
    }

    // Widgets
    const widgetsMd = generateWidgetMarkdown(p.username, p.widgets);
    if (widgetsMd) {
      md.push(widgetsMd);
    }

    if (p.closingMessage) {
      md.push(`### 💬 Note to Contributors`);
      md.push(`> ${p.closingMessage}`);
      md.push('');
    }

    return md.join('\n');
  }

  // 4. TEMPLATE: STUDENT DEVELOPER
  function renderStudentTemplate(p) {
    const md = [];

    md.push(`# Hi, I'm ${p.fullName || 'Student Developer'} 🎓`);
    if (p.headline) {
      md.push(`**${p.headline}**`);
    }
    md.push('');

    // Bio
    if (p.bio) {
      md.push(p.bio);
      md.push('');
    }

    // Education First
    md.push('## 🏫 Education & Coursework');
    md.push('');
    if (p.education) {
      md.push(`- **Degree:** ${p.education}`);
    } else {
      md.push(`- **Degree:** Computer Science / Software Engineering Student`);
    }
    if (p.location) {
      md.push(`- **Campus/Location:** ${p.location}`);
    }
    md.push('');

    // Learning Journey
    md.push('## 📚 What I\'m Learning Right Now');
    md.push('');
    if (p.learning) md.push(`- 📖 **Current Focus:** ${p.learning}`);
    if (p.workingOn) md.push(`- 💻 **Class / Capstone Project:** ${p.workingOn}`);
    if (p.collaborating) md.push(`- 👥 **Looking to Partner for Hackathons:** ${p.collaborating}`);
    if (p.funFact) md.push(`- 🎮 **Beyond Tech:** ${p.funFact}`);
    md.push('');

    // Skills
    const hasSkills = p.skills && Object.values(p.skills).some(arr => arr && arr.length > 0);
    if (hasSkills) {
      md.push('## 🛠️ Technologies I Work With');
      md.push('');
      if (p.skills.languages && p.skills.languages.length > 0) {
        md.push('**Languages:**');
        md.push(generateSkillMarkup(p.skills.languages, p.skillsFormat));
        md.push('');
      }
      if (p.skills.frameworks && p.skills.frameworks.length > 0) {
        md.push('**Frameworks & Libraries:**');
        md.push(generateSkillMarkup(p.skills.frameworks, p.skillsFormat));
        md.push('');
      }
      if (p.skills.databases && p.skills.databases.length > 0) {
        md.push('**Databases & DevOps:**');
        md.push(generateSkillMarkup(p.skills.databases, p.skillsFormat));
        md.push('');
      }
    }

    // Projects / Hackathons
    if (p.projects && p.projects.length > 0) {
      md.push('## 🚀 Academic & Hackathon Projects');
      md.push('');
      p.projects.forEach(proj => {
        md.push(`### 🎯 ${proj.title}`);
        md.push(proj.description || '');
        if (proj.tech && proj.tech.length > 0) {
          md.push(`*Built with:* ${proj.tech.join(', ')}`);
        }
        if (proj.repoUrl) {
          md.push(`[GitHub Repository](${proj.repoUrl})`);
        }
        md.push('');
      });
    }

    // Achievements
    if (p.achievements) {
      md.push('## 🏆 Awards & Extracurriculars');
      md.push('');
      const achLines = p.achievements.split('\n').filter(l => l.trim() !== '');
      achLines.forEach(l => {
        const clean = l.replace(/^[-*]\s*/, '');
        md.push(`- ${clean}`);
      });
      md.push('');
    }

    // Socials
    const socialsMd = generateSocialsMarkdown(p.socials);
    if (socialsMd) {
      md.push('## 📫 Connect With Me');
      md.push('');
      md.push(socialsMd);
      md.push('');
    }

    if (p.closingMessage) {
      md.push(`> ${p.closingMessage}`);
      md.push('');
    }

    return md.join('\n');
  }

  /**
   * Main Markdown Generation Switcher
   */
  function generateMarkdown(profileData, templateName) {
    switch (templateName) {
      case 'minimal':
        return renderMinimalTemplate(profileData);
      case 'opensource':
        return renderOpenSourceTemplate(profileData);
      case 'student':
        return renderStudentTemplate(profileData);
      case 'professional':
      default:
        return renderProfessionalTemplate(profileData);
    }
  }

  // =========================================================================
  // LIVE PREVIEW UPDATER
  // =========================================================================

  function updatePreview() {
    const rawMarkdown = generateMarkdown(state.profile, state.template);

    // Update Raw View
    DOM.rawCode.textContent = rawMarkdown;

    // Update Rendered View
    const renderedHtml = renderMarkdownToHtml(rawMarkdown);
    DOM.renderedContainer.innerHTML = renderedHtml;

    // Update Stats
    const charCount = rawMarkdown.length;
    const words = rawMarkdown.trim() ? rawMarkdown.trim().split(/\s+/).length : 0;
    const lines = rawMarkdown.split('\n').length;

    DOM.statChars.textContent = `${charCount.toLocaleString()} chars`;
    DOM.statWords.textContent = `${words.toLocaleString()} words`;
    DOM.statLines.textContent = `${lines} lines`;

    // Update modal placeholders
    DOM.userHandlePlaceholders.forEach(el => {
      el.textContent = state.profile.username || 'your-username';
    });

    // Auto-save to LocalStorage
    saveDraftLocally();
  }

  const debouncedUpdatePreview = debounce(updatePreview, 150);

  // =========================================================================
  // LOCALSTORAGE MANAGEMENT
  // =========================================================================

  function saveDraftLocally() {
    try {
      const payload = {
        profile: state.profile,
        template: state.template,
        theme: state.theme,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      DOM.saveStatusText.textContent = `Draft saved locally (${timeStr})`;
      DOM.saveStatusEl.classList.remove('unsaved');
    } catch (err) {
      console.warn('LocalStorage save error:', err);
      DOM.saveStatusText.textContent = 'Storage unavailable';
    }
  }

  function loadDraftLocally() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.profile) {
          state.profile = parsed.profile;
        }
        if (parsed.template) {
          state.template = parsed.template;
        }
        return true;
      }
    } catch (err) {
      console.warn('Failed to parse draft from LocalStorage:', err);
    }
    return false;
  }

  function clearDraft() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) { }

    state.profile = {
      fullName: '',
      username: '',
      headline: '',
      location: '',
      company: '',
      bio: '',
      workingOn: '',
      learning: '',
      collaborating: '',
      askMe: '',
      funFact: '',
      skillsFormat: 'badges',
      skills: {
        languages: [],
        frameworks: [],
        databases: [],
        tools: []
      },
      projects: [],
      education: '',
      achievements: '',
      socials: {
        email: '',
        portfolio: '',
        linkedin: '',
        twitter: '',
        devto: '',
        youtube: ''
      },
      widgets: {
        stats: true,
        langs: true,
        streak: false,
        trophy: false,
        theme: 'tokyonight'
      },
      closingMessage: '',
      profileCraftBadge: true
    };

    populateFormFields();
    updatePreview();
    showToast('Profile draft has been cleared.', 'info');
  }

  // =========================================================================
  // FORM POPULATION & BINDINGS
  // =========================================================================

  function populateFormFields() {
    const p = state.profile;

    DOM.fieldFullName.value = p.fullName || '';
    DOM.fieldUsername.value = p.username || '';
    DOM.fieldHeadline.value = p.headline || '';
    DOM.fieldLocation.value = p.location || '';
    DOM.fieldCompany.value = p.company || '';
    DOM.fieldBio.value = p.bio || '';

    DOM.fieldWorkingOn.value = p.workingOn || '';
    DOM.fieldLearning.value = p.learning || '';
    DOM.fieldCollaborating.value = p.collaborating || '';
    DOM.fieldAskMe.value = p.askMe || '';
    DOM.fieldFunFact.value = p.funFact || '';

    DOM.fieldEducation.value = p.education || '';
    DOM.fieldAchievements.value = p.achievements || '';

    DOM.fieldSocialEmail.value = p.socials?.email || '';
    DOM.fieldSocialPortfolio.value = p.socials?.portfolio || '';
    DOM.fieldSocialLinkedin.value = p.socials?.linkedin || '';
    DOM.fieldSocialTwitter.value = p.socials?.twitter || '';
    DOM.fieldSocialDevto.value = p.socials?.devto || '';
    DOM.fieldSocialYoutube.value = p.socials?.youtube || '';

    DOM.widgetStats.checked = !!p.widgets?.stats;
    DOM.widgetLangs.checked = !!p.widgets?.langs;
    DOM.widgetStreak.checked = !!p.widgets?.streak;
    DOM.widgetTrophy.checked = !!p.widgets?.trophy;
    DOM.widgetThemeSelect.value = p.widgets?.theme || 'tokyonight';

    DOM.fieldClosing.value = p.closingMessage || '';
    DOM.fieldProfilecraftBadge.checked = p.profileCraftBadge !== false;

    // Skills format radio
    DOM.skillsFormatRadios.forEach(radio => {
      radio.checked = radio.value === p.skillsFormat;
    });

    // Nav Template Selector
    DOM.navTemplateSelect.value = state.template;

    // Render Skills tags and Projects
    renderAllSkillTags();
    renderProjectList();
  }

  function readFormInputsToState() {
    const p = state.profile;

    p.fullName = DOM.fieldFullName.value.trim();
    p.username = DOM.fieldUsername.value.trim();
    p.headline = DOM.fieldHeadline.value.trim();
    p.location = DOM.fieldLocation.value.trim();
    p.company = DOM.fieldCompany.value.trim();
    p.bio = DOM.fieldBio.value.trim();

    p.workingOn = DOM.fieldWorkingOn.value.trim();
    p.learning = DOM.fieldLearning.value.trim();
    p.collaborating = DOM.fieldCollaborating.value.trim();
    p.askMe = DOM.fieldAskMe.value.trim();
    p.funFact = DOM.fieldFunFact.value.trim();

    p.education = DOM.fieldEducation.value.trim();
    p.achievements = DOM.fieldAchievements.value.trim();

    p.socials = {
      email: DOM.fieldSocialEmail.value.trim(),
      portfolio: DOM.fieldSocialPortfolio.value.trim(),
      linkedin: DOM.fieldSocialLinkedin.value.trim(),
      twitter: DOM.fieldSocialTwitter.value.trim(),
      devto: DOM.fieldSocialDevto.value.trim(),
      youtube: DOM.fieldSocialYoutube.value.trim()
    };

    p.widgets = {
      stats: DOM.widgetStats.checked,
      langs: DOM.widgetLangs.checked,
      streak: DOM.widgetStreak.checked,
      trophy: DOM.widgetTrophy.checked,
      theme: DOM.widgetThemeSelect.value
    };

    p.closingMessage = DOM.fieldClosing.value.trim();
    p.profileCraftBadge = DOM.fieldProfilecraftBadge.checked;

    DOM.skillsFormatRadios.forEach(r => {
      if (r.checked) p.skillsFormat = r.value;
    });

    state.template = DOM.navTemplateSelect.value;
  }

  // =========================================================================
  // SKILLS INTERACTION
  // =========================================================================

  function renderAllSkillTags() {
    let totalCount = 0;
    const cats = ['languages', 'frameworks', 'databases', 'tools'];

    cats.forEach(cat => {
      const container = DOM.catContainers[cat];
      if (!container) return;
      container.innerHTML = '';

      const skillsList = state.profile.skills[cat] || [];
      totalCount += skillsList.length;

      skillsList.forEach((skill, idx) => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.innerHTML = `
          <span>${escapeHtml(skill.name)}</span>
          <button type="button" class="skill-tag-remove" data-cat="${cat}" data-idx="${idx}" aria-label="Remove skill">&times;</button>
        `;
        container.appendChild(tag);
      });
    });

    DOM.skillsTotalBadge.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
  }

  function addSkill(category, name) {
    if (!name || !name.trim()) return;
    const trimmed = name.trim();

    if (!state.profile.skills[category]) {
      state.profile.skills[category] = [];
    }

    // Check if duplicate in category
    const exists = state.profile.skills[category].some(s => s.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      showToast(`"${trimmed}" is already in ${category}.`, 'info');
      return;
    }

    const preset = BADGE_PRESETS[trimmed] || {};
    state.profile.skills[category].push({
      name: trimmed,
      color: preset.color || '6366F1',
      logo: preset.logo || ''
    });

    renderAllSkillTags();
    debouncedUpdatePreview();
  }

  function removeSkill(category, index) {
    if (state.profile.skills[category]) {
      state.profile.skills[category].splice(index, 1);
      renderAllSkillTags();
      debouncedUpdatePreview();
    }
  }

  // =========================================================================
  // PROJECTS INTERACTION
  // =========================================================================

  function renderProjectList() {
    const list = state.profile.projects || [];
    DOM.projectsListContainer.innerHTML = '';
    DOM.projectsTotalBadge.textContent = `${list.length} project${list.length === 1 ? '' : 's'}`;

    if (list.length === 0) {
      DOM.projectsListContainer.innerHTML = `
        <div style="text-align: center; padding: 24px 16px; color: var(--text-muted); font-size: 0.8rem; border: 1px dashed var(--border-strong); border-radius: var(--radius-md);">
          No projects added yet. Click <strong>Add Project</strong> to showcase your work!
        </div>
      `;
      return;
    }

    list.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.id = proj.id;

      card.innerHTML = `
        <div class="project-card-header">
          <span class="project-order-badge">
            <span>#${idx + 1}</span>
            <span style="color: var(--text-secondary); font-weight: 500;">${escapeHtml(proj.title || 'Untitled Project')}</span>
          </span>
          <div class="project-card-actions">
            <button type="button" class="btn-icon-control btn-move-up" data-idx="${idx}" ${idx === 0 ? 'disabled' : ''} title="Move Up">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>
            <button type="button" class="btn-icon-control btn-move-down" data-idx="${idx}" ${idx === list.length - 1 ? 'disabled' : ''} title="Move Down">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <button type="button" class="btn-icon-control delete btn-delete-project" data-idx="${idx}" title="Delete Project">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Project Title</label>
            <input type="text" class="form-control proj-input-title" data-idx="${idx}" value="${escapeHtml(proj.title || '')}" placeholder="Project Name">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Technologies (comma-separated)</label>
            <input type="text" class="form-control proj-input-tech" data-idx="${idx}" value="${escapeHtml((proj.tech || []).join(', '))}" placeholder="e.g. React, TypeScript, Rust">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <input type="text" class="form-control proj-input-desc" data-idx="${idx}" value="${escapeHtml(proj.description || '')}" placeholder="Brief overview of what this project does and why it matters">
        </div>

        <div class="form-row">
          <div class="form-group col-6">
            <label class="form-label">Repository URL</label>
            <input type="url" class="form-control proj-input-repo" data-idx="${idx}" value="${escapeHtml(proj.repoUrl || '')}" placeholder="https://github.com/username/project">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Live Demo / Website (Optional)</label>
            <input type="url" class="form-control proj-input-live" data-idx="${idx}" value="${escapeHtml(proj.liveUrl || '')}" placeholder="https://demo.example.com">
          </div>
        </div>
      `;

      DOM.projectsListContainer.appendChild(card);
    });
  }

  function addNewProject() {
    const newId = 'proj_' + Date.now();
    state.profile.projects.push({
      id: newId,
      title: 'New Featured Project',
      description: 'Describe what problem this solves and key architectural decisions.',
      tech: ['TypeScript'],
      repoUrl: state.profile.username ? `https://github.com/${state.profile.username}/new-project` : '',
      liveUrl: ''
    });

    renderProjectList();
    debouncedUpdatePreview();
    showToast('New project card added!', 'info');
  }

  function moveProject(fromIdx, toIdx) {
    const list = state.profile.projects;
    if (toIdx < 0 || toIdx >= list.length) return;
    const item = list.splice(fromIdx, 1)[0];
    list.splice(toIdx, 0, item);
    renderProjectList();
    debouncedUpdatePreview();
  }

  function deleteProject(index) {
    state.profile.projects.splice(index, 1);
    renderProjectList();
    debouncedUpdatePreview();
    showToast('Project removed.', 'info');
  }

  // =========================================================================
  // GITHUB REST API INTEGRATION
  // =========================================================================

  async function fetchGitHubProfile() {
    const username = DOM.fetchGithubInput.value.trim() || DOM.fieldUsername.value.trim();
    if (!username) {
      showApiAlert('Please enter a GitHub username to fetch.', 'warning');
      DOM.fetchGithubInput.focus();
      return;
    }

    // Set Loading UI
    DOM.fetchSpinner.style.display = 'inline-block';
    DOM.fetchBtnLabel.textContent = 'Fetching...';
    DOM.btnFetchGithub.disabled = true;
    hideApiAlert();

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);

      if (response.status === 404) {
        showApiAlert(`GitHub user "${username}" was not found. Please verify the username.`, 'error');
        return;
      }

      if (response.status === 403) {
        showApiAlert('GitHub public API rate limit reached (60 req/hr). Please edit fields manually or try again later.', 'warning');
        return;
      }

      if (!response.ok) {
        showApiAlert(`GitHub API returned status ${response.status}. Manual editing is fully available.`, 'error');
        return;
      }

      const data = await response.json();

      // Honest data mapping
      state.profile.username = data.login || username;
      if (data.name) state.profile.fullName = data.name;
      if (data.bio) state.profile.bio = data.bio;
      if (data.location) state.profile.location = data.location;
      if (data.company) state.profile.company = data.company;
      if (data.blog) {
        const blogUrl = data.blog.startsWith('http') ? data.blog : `https://${data.blog}`;
        state.profile.socials.portfolio = blogUrl;
      }
      if (data.twitter_username) {
        state.profile.socials.twitter = data.twitter_username;
      }

      // Sync form fields and live preview
      populateFormFields();
      updatePreview();

      showApiAlert(`Successfully imported public profile for ${data.login} (${data.public_repos} public repos)!`, 'success');
      showToast(`Imported details for @${data.login}!`, 'success');

    } catch (err) {
      console.error('GitHub fetch error:', err);
      showApiAlert('Network error while connecting to GitHub API. Please check your connection.', 'error');
    } finally {
      DOM.fetchSpinner.style.display = 'none';
      DOM.fetchBtnLabel.textContent = 'Fetch Profile';
      DOM.btnFetchGithub.disabled = false;
    }
  }

  function showApiAlert(message, type = 'info') {
    DOM.githubAlert.style.display = 'flex';
    DOM.githubAlert.className = `api-alert ${type}`;
    DOM.githubAlert.querySelector('.alert-message').textContent = message;
  }

  function hideApiAlert() {
    DOM.githubAlert.style.display = 'none';
  }

  // =========================================================================
  // EXPORT & DOWNLOAD TOOLS
  // =========================================================================

  function copyMarkdownToClipboard() {
    const rawMarkdown = generateMarkdown(state.profile, state.template);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(rawMarkdown).then(() => {
        handleCopySuccess();
      }).catch(err => {
        fallbackCopy(rawMarkdown);
      });
    } else {
      fallbackCopy(rawMarkdown);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      handleCopySuccess();
    } catch (e) {
      showToast('Could not copy to clipboard. Please select raw text.', 'error');
    }
    document.body.removeChild(textarea);
  }

  function handleCopySuccess() {
    DOM.btnCopyLabel.textContent = 'Copied!';
    showToast('README Markdown copied to clipboard!', 'success');
    setTimeout(() => {
      DOM.btnCopyLabel.textContent = 'Copy Markdown';
    }, 2000);
  }

  function downloadReadmeFile() {
    const rawMarkdown = generateMarkdown(state.profile, state.template);
    const blob = new Blob([rawMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('README.md downloaded successfully!', 'success');
  }

  function exportJsonBackup() {
    const payload = {
      app: 'ProfileCraft',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      template: state.template,
      profile: state.profile
    };
    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profilecraft-backup-${state.profile.username || 'developer'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Profile data exported as JSON!', 'success');
  }

  function importJsonFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);

        // Validation check
        if (!parsed.profile && !parsed.fullName && !parsed.username) {
          DOM.jsonImportStatus.style.display = 'block';
          DOM.jsonImportStatus.className = 'api-alert error';
          DOM.jsonImportStatus.textContent = 'Invalid JSON: Not a recognized ProfileCraft backup file.';
          return;
        }

        const newProfile = parsed.profile || parsed;
        state.profile = Object.assign(JSON.parse(JSON.stringify(SAMPLE_PROFILE)), newProfile);
        if (parsed.template) {
          state.template = parsed.template;
        }

        populateFormFields();
        updatePreview();
        closeModal(DOM.modalJson);
        showToast('JSON profile imported successfully!', 'success');

      } catch (err) {
        DOM.jsonImportStatus.style.display = 'block';
        DOM.jsonImportStatus.className = 'api-alert error';
        DOM.jsonImportStatus.textContent = 'Failed to parse JSON file: ' + err.message;
      }
    };

    reader.readAsText(file);
  }

  // =========================================================================
  // THEME SWITCHER
  // =========================================================================

  function setTheme(theme) {
    state.theme = theme;
    DOM.html.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) { }
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme} theme.`, 'info');
  }

  function initTheme() {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
        return;
      }
    } catch (e) { }

    // Default to dark
    setTheme('dark');
  }

  // =========================================================================
  // SETUP GUIDE ACTIONS
  // =========================================================================

  function copyGitCommands() {
    const user = state.profile.username || '<username>';
    const cmd = `# Initialize and push your profile README:
git init
git add README.md
git commit -m "feat: initial profile readme"
git branch -M main
git remote add origin https://github.com/${user}/${user}.git
git push -u origin main`;

    navigator.clipboard.writeText(cmd).then(() => {
      showToast('Terminal commands copied!', 'success');
    });
  }

  function copySetupGuideFull() {
    const user = state.profile.username || 'username';
    const guideText = `GitHub Profile README Setup Guide:
1. Go to https://github.com/new
2. Create a repository with your EXACT username: "${user}"
3. Make sure the repository is marked as "Public"
4. Add your generated README.md file and commit it to main
5. Visit your GitHub profile page (https://github.com/${user}) to see your live README!`;

    navigator.clipboard.writeText(guideText).then(() => {
      showToast('Setup Guide copied to clipboard!', 'success');
    });
  }

  // =========================================================================
  // EVENT LISTENERS INITIALIZATION
  // =========================================================================

  function initEventListeners() {
    // Live update on input in editor form fields
    DOM.editorPanel.addEventListener('input', (e) => {
      readFormInputsToState();
      DOM.saveStatusEl.classList.add('unsaved');
      DOM.saveStatusText.textContent = 'Unsaved changes...';
      debouncedUpdatePreview();
    });

    // Template selector
    DOM.navTemplateSelect.addEventListener('change', () => {
      state.template = DOM.navTemplateSelect.value;
      updatePreview();
      showToast(`Template: ${DOM.navTemplateSelect.options[DOM.navTemplateSelect.selectedIndex].text}`, 'info');
    });

    // Theme toggle
    DOM.btnThemeToggle.addEventListener('click', toggleTheme);

    // Load sample profile
    DOM.btnLoadSample.addEventListener('click', () => {
      state.profile = JSON.parse(JSON.stringify(SAMPLE_PROFILE));
      populateFormFields();
      updatePreview();
      showToast('Loaded sample developer profile!', 'success');
    });

    // Reset draft button
    DOM.btnResetDraft.addEventListener('click', () => {
      openModal(DOM.modalReset);
    });

    DOM.btnConfirmReset.addEventListener('click', () => {
      closeModal(DOM.modalReset);
      clearDraft();
    });

    // GitHub Fetch
    DOM.btnFetchGithub.addEventListener('click', fetchGitHubProfile);
    DOM.fetchGithubInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        fetchGitHubProfile();
      }
    });

    DOM.githubAlert.querySelector('.alert-close').addEventListener('click', hideApiAlert);

    // Toggle all sections
    let allOpen = true;
    DOM.btnCollapseAll.addEventListener('click', () => {
      allOpen = !allOpen;
      document.querySelectorAll('.editor-section').forEach(sec => {
        sec.open = allOpen;
      });
    });

    // Preset chip clicks (Skills)
    document.querySelectorAll('.chip-preset').forEach(chip => {
      chip.addEventListener('click', () => {
        const cat = chip.dataset.cat;
        const name = chip.dataset.name;
        addSkill(cat, name);
      });
    });

    // Skill add buttons & input enter keys
    document.querySelectorAll('.btn-add-cat-skill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.target;
        const input = DOM.catInputs[cat];
        if (input && input.value.trim()) {
          addSkill(cat, input.value);
          input.value = '';
          input.focus();
        }
      });
    });

    Object.keys(DOM.catInputs).forEach(cat => {
      const input = DOM.catInputs[cat];
      if (input) {
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (input.value.trim()) {
              addSkill(cat, input.value);
              input.value = '';
            }
          }
        });
      }
    });

    // Skill tag deletion event delegation
    Object.keys(DOM.catContainers).forEach(cat => {
      const container = DOM.catContainers[cat];
      if (container) {
        container.addEventListener('click', (e) => {
          const btn = e.target.closest('.skill-tag-remove');
          if (btn) {
            const idx = parseInt(btn.dataset.idx, 10);
            removeSkill(cat, idx);
          }
        });
      }
    });

    // Projects: Add, Reorder, Delete, Inputs Delegation
    DOM.btnAddProject.addEventListener('click', addNewProject);

    DOM.projectsListContainer.addEventListener('click', (e) => {
      const btnUp = e.target.closest('.btn-move-up');
      if (btnUp) {
        const idx = parseInt(btnUp.dataset.idx, 10);
        moveProject(idx, idx - 1);
        return;
      }

      const btnDown = e.target.closest('.btn-move-down');
      if (btnDown) {
        const idx = parseInt(btnDown.dataset.idx, 10);
        moveProject(idx, idx + 1);
        return;
      }

      const btnDel = e.target.closest('.btn-delete-project');
      if (btnDel) {
        const idx = parseInt(btnDel.dataset.idx, 10);
        deleteProject(idx);
        return;
      }
    });

    DOM.projectsListContainer.addEventListener('input', (e) => {
      const target = e.target;
      const idx = parseInt(target.dataset.idx, 10);
      if (isNaN(idx) || !state.profile.projects[idx]) return;

      const proj = state.profile.projects[idx];

      if (target.classList.contains('proj-input-title')) {
        proj.title = target.value;
      } else if (target.classList.contains('proj-input-desc')) {
        proj.description = target.value;
      } else if (target.classList.contains('proj-input-tech')) {
        proj.tech = target.value.split(',').map(s => s.trim()).filter(Boolean);
      } else if (target.classList.contains('proj-input-repo')) {
        proj.repoUrl = target.value.trim();
      } else if (target.classList.contains('proj-input-live')) {
        proj.liveUrl = target.value.trim();
      }

      DOM.saveStatusEl.classList.add('unsaved');
      debouncedUpdatePreview();
    });

    // Preview Mode Switch (Rendered vs Raw)
    DOM.tabModeRendered.addEventListener('click', () => {
      DOM.tabModeRendered.classList.add('active');
      DOM.tabModeRendered.setAttribute('aria-selected', 'true');
      DOM.tabModeRaw.classList.remove('active');
      DOM.tabModeRaw.setAttribute('aria-selected', 'false');
      DOM.renderedContainer.style.display = 'block';
      DOM.rawContainer.style.display = 'none';
      state.previewMode = 'rendered';
    });

    DOM.tabModeRaw.addEventListener('click', () => {
      DOM.tabModeRaw.classList.add('active');
      DOM.tabModeRaw.setAttribute('aria-selected', 'true');
      DOM.tabModeRendered.classList.remove('active');
      DOM.tabModeRendered.setAttribute('aria-selected', 'false');
      DOM.renderedContainer.style.display = 'none';
      DOM.rawContainer.style.display = 'block';
      state.previewMode = 'raw';
    });

    // Export Buttons
    DOM.btnCopyMarkdown.addEventListener('click', copyMarkdownToClipboard);
    DOM.btnCopyRawInline.addEventListener('click', copyMarkdownToClipboard);
    DOM.btnDownloadMd.addEventListener('click', downloadReadmeFile);

    // JSON Sync Modal & Actions
    DOM.btnJsonModal.addEventListener('click', () => openModal(DOM.modalJson));
    DOM.btnDownloadJson.addEventListener('click', exportJsonBackup);
    DOM.jsonFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importJsonFile(e.target.files[0]);
      }
    });

    // Setup Guide Modal
    DOM.btnGuideModal.addEventListener('click', () => openModal(DOM.modalGuide));
    DOM.btnCopyGitCmd.addEventListener('click', copyGitCommands);
    DOM.btnGuideCopyAll.addEventListener('click', copySetupGuideFull);

    // Privacy & Shortcuts Modals
    DOM.btnPrivacyModal.addEventListener('click', () => openModal(DOM.modalPrivacy));
    DOM.btnShortcutsModal.addEventListener('click', () => openModal(DOM.modalShortcuts));

    // Modal close buttons (data-close-modal attribute)
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.dataset.closeModal;
        closeModal(document.getElementById(modalId));
      });
    });

    // Backdrop click to close modals
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape closes open modals
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop').forEach(m => closeModal(m));
      }

      // Ctrl / Cmd + S -> Download README.md
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        downloadReadmeFile();
      }

      // Alt + T -> Toggle Theme
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Mobile Navigation Switcher (Editor vs Preview tabs)
    DOM.mobileTabEditor.addEventListener('click', () => {
      DOM.mobileTabEditor.classList.add('active');
      DOM.mobileTabEditor.setAttribute('aria-selected', 'true');
      DOM.mobileTabPreview.classList.remove('active');
      DOM.mobileTabPreview.setAttribute('aria-selected', 'false');

      DOM.editorPanel.classList.add('active-mobile');
      DOM.previewPanel.classList.remove('active-mobile');
    });

    DOM.mobileTabPreview.addEventListener('click', () => {
      DOM.mobileTabPreview.classList.add('active');
      DOM.mobileTabPreview.setAttribute('aria-selected', 'true');
      DOM.mobileTabEditor.classList.remove('active');
      DOM.mobileTabEditor.setAttribute('aria-selected', 'false');

      DOM.previewPanel.classList.add('active-mobile');
      DOM.editorPanel.classList.remove('active-mobile');
    });
  }

  // =========================================================================
  // BOOTSTRAP APPLICATION
  // =========================================================================

  function init() {
    initTheme();

    // Check if draft exists in LocalStorage, otherwise use sample
    const restored = loadDraftLocally();
    populateFormFields();
    updatePreview();

    initEventListeners();

    if (restored) {
      showToast('Welcome back! Draft restored from local storage.', 'info');
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
