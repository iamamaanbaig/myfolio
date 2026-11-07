// WORK's menu, on every page (pointer screens): hovering WORK or its squares drops a dark list of the case studies
// under the header, from the HOME label to the frame's right line, list and preview 50-50; the item under the pointer
// turns light and its main screen opens beside it. A case study with a page opens it; one still to come takes you to
// its section on the home page. Opens on WORK, its squares or the menu; Esc, a wheel outside the list, or leaving
// closes it. Styles in case-studies/case-study.css (.wm-*); the list below is the one source of its content
(() => {
  if (!matchMedia('(hover: hover)').matches) return;
  if (!document.querySelector('.site-head .nav-work')) return;
  const base = new URL('.', document.currentScript.src).href; // the site's root: this script sits there
  const cases = [
    { id: 'ask-me-agent', page: null, title: 'Ask Me Agent',
      desc: 'AI that personalizes its answers to your family’s nutrition goals.',
      img: 'assets/ask-me-agent/menu.webp', w: 473, h: 932, tall: true },
    { id: 'business-reporting-agent', page: null, title: 'Business Reporting Agent',
      desc: 'An agent that analyses your business data to tell you how your business is performing.',
      img: 'assets/business-reporting-agent/menu.webp', w: 473, h: 932, tall: true },
    { id: 'gifa', page: 'case-studies/global-incentive-fee-awards/', title: 'Saved millions of dollars in taxes',
      desc: 'By improving stakeholder visibility and coordination across a complex, multi&#8209;stakeholder process.',
      img: 'GIFAcasestudyimages/GIFAherocenter.webp', w: 1733, h: 1092 },
    { id: 'fee-management', page: 'case-studies/fee-management/', title: 'Cut fee management effort by 40 minutes',
      desc: 'By reducing the fee templates a single classroom needed from an average of 9&nbsp;to&nbsp;1.',
      img: 'Feemanagementcasestudyimages/Heroleft.webp', w: 1505, h: 970 },
    { id: 'creating-automation', page: 'case-studies/creating-automation/', title: 'Reduced support calls',
      desc: 'By making it easy to create a new automation.',
      img: 'Creatingautomationcasestudyimages/Group%201321317990.webp', w: 1793, h: 1152 },
    { id: 'stamp', page: null, title: 'Reduced the compliance review effort with AI',
      desc: 'By designing an AI feature that does all the review work and suggests a final action.',
      img: 'Stampcasestudyimages/Hero%20Image%20Left.webp', w: 1575, h: 988 },
  ];
  const ARROW = '<span class="wm-arrow" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4.5 11.5l7-7M5.5 4.5h6v6"/></svg></span>';
  // the menu's markup, under the header; the shade behind it, over the page
  const build = () => {
    const m = document.createElement('div');
    m.className = 'work-menu'; m.id = 'work-menu'; m.setAttribute('aria-label', 'Case studies');
    m.innerHTML = '<div class="wm-list">' + cases.map((c, i) => c.page
      ? `<a class="wm-item" href="${base + c.page}" data-i="${i}"><span class="wm-title">${c.title}</span>${ARROW}<span class="wm-desc">${c.desc}</span></a>`
      : `<div class="wm-item soon" data-i="${i}"><span class="wm-title">${c.title}</span><span class="wm-arrow wm-soon">Soon</span><span class="wm-desc">${c.desc}</span></div>`).join('') +
      '</div><div class="wm-preview" aria-hidden="true">' + cases.map(c =>
      `<img class="wm-shot${c.tall ? ' tall' : ''}" width="${c.w}" height="${c.h}" src="${base + c.img}" alt="" loading="lazy" decoding="async">`).join('') + '</div>';
    document.querySelector('.site-head').append(m);
    const scrim = document.createElement('div'); scrim.className = 'wm-scrim'; scrim.setAttribute('aria-hidden', 'true');
    // the shade sits in the header's own layer (on the case-study pages the header lives inside <main>, its own
    // stacking context), just under the header, so it covers the page but not the menu
    const head = document.querySelector('.site-head');
    (head.closest('main') || document.body).append(scrim);
    const link = document.querySelector('.nav-work > a');
    link.setAttribute('aria-haspopup', 'true'); link.setAttribute('aria-expanded', 'false'); link.setAttribute('aria-controls', 'work-menu');
    return m;
  };
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement, head = document.querySelector('.site-head');
  const trigger = document.querySelector('.nav-work'), link = trigger.querySelector('a');
  const menu = build(), items = $$('.wm-item', menu), comps = $$('.wm-shot', menu), list = menu.querySelector('.wm-list'), pv = menu.querySelector('.wm-preview');
  // the menu starts under HOME (its text on the HOME label) and runs to the frame's right line, list and preview 50-50;
  // --wm-lh is the list's height, which a mobile screen's preview takes
  const home = head.querySelector('.site-nav > a');
  const place = () => {
    const pad = parseFloat(getComputedStyle(items[0]).paddingLeft) || 0;
    head.style.setProperty('--wm-x', (home.getBoundingClientRect().left - head.getBoundingClientRect().left - pad) + 'px');
    head.style.setProperty('--wm-lh', list.offsetHeight + 'px');
    root.style.setProperty('--wm-y', Math.max(0, head.getBoundingClientRect().bottom) + 'px');
  };
  addEventListener('resize', () => { if (root.classList.contains('menu-open')) place(); });
  let t;
  let quiet = false; // set while Esc hands focus back to WORK, so that focus doesn't reopen the menu
  let clicked = false; // set by a click on WORK or a square: the menu stays shut until the pointer leaves them
  const open = () => { if (quiet || clicked) return; leaving = false; clearTimeout(t); place(); root.classList.add('menu-open'); link.setAttribute('aria-expanded', 'true'); };
  let leaving = false;
  const close = () => { if (leaving) return; leaving = true; clearTimeout(t); t = setTimeout(() => shut(), 250); }; // grace: the preview may still be sliding open
  const show = i => {
    items.forEach((m, k) => m.classList.toggle('on', k === i));
    comps.forEach((c, k) => c.classList.toggle('on', k === i));
    if (i < 0) return;
    // the preview's height follows the screen: landscape for a desktop one, the list's height for a mobile one
    root.classList.toggle('pv-tall', comps[i].classList.contains('tall'));
    head.style.setProperty('--pv-h', (comps[i].classList.contains('tall') ? list.offsetHeight : pv.offsetWidth * .72) + 'px'); // glides between the two
    root.classList.add('previewing');
  };
  [trigger, menu].forEach(el => { el.addEventListener('pointerenter', open); el.addEventListener('pointerleave', close); });
  trigger.addEventListener('click', () => { shut(); clicked = true; });
  trigger.addEventListener('pointerleave', () => { clicked = false; });
  // a backstop for the leave events: the pointer anywhere but WORK, the list or the open preview starts the close;
  // coming back cancels it
  addEventListener('pointermove', e => {
    if (!root.classList.contains('menu-open') || e.pointerType !== 'mouse') return;
    const inside = trigger.contains(e.target) || menu.contains(e.target);
    if (inside) { if (leaving) open(); } else close();
  }, { passive: true });
  link.addEventListener('focus', open);
  link.addEventListener('blur', e => { clicked = false; if (!menu.contains(e.relatedTarget)) close(); });
  menu.addEventListener('focusout', e => { if (!menu.contains(e.relatedTarget) && e.relatedTarget !== link) close(); });
  items.forEach((m, i) => { m.addEventListener('pointerenter', () => show(i)); m.addEventListener('focus', () => { open(); show(i); }); });
  const shut = () => { leaving = false; clearTimeout(t); root.classList.remove('menu-open', 'previewing', 'pv-tall'); link.setAttribute('aria-expanded', 'false'); show(-1); };
  // a case study still to come has no page: its item closes the menu and takes the visitor to its section on this page
  // (through the header square for that section, which glides there)
  items.forEach((m, i) => {
    if (!m.classList.contains('soon')) return;
    m.setAttribute('role', 'link'); m.tabIndex = 0;
    // through the header's square for that section: on the home page it glides there, elsewhere it opens the home page there
    const goTo = () => { const sq = head.querySelectorAll('.site-nav .sq')[i]; if (sq) sq.click(); shut(); clicked = false; }; // the menu opens again on the next hover
    m.addEventListener('click', goTo);
    m.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(); } });
  });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !root.classList.contains('menu-open')) return;
    shut(); quiet = true; link.focus(); quiet = false;
  });
  addEventListener('wheel', e => { if (root.classList.contains('menu-open') && !list.contains(e.target)) shut(); }, { passive: true });
})();
