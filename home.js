// Home: one scroll per section on wide windows (as on the case studies); the header's Home, Work squares and
// Contact follow the section in view, and the case-study panel waiting below stays dark until it is current
(() => {
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const stops = $$('.snap');
  const desktop = () => matchMedia('(min-width: 900px)').matches;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const head = () => document.querySelector('.site-head').offsetHeight;
  const top = i => Math.max(0, Math.min(stops[i].offsetTop - head(), document.documentElement.scrollHeight - innerHeight));

  let animating = false;
  const glide = to => {
    const from = scrollY;
    if (Math.abs(to - from) < 2) return;
    if (still) { scrollTo(0, to); return; }
    animating = true;
    let start = null;
    const T = 850;
    const step = now => {
      if (start === null) start = now;
      const k = Math.min(1, (now - start) / T);
      const e = k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
      scrollTo(0, from + (to - from) * e);
      if (k < 1) requestAnimationFrame(step); else animating = false;
    };
    requestAnimationFrame(step);
  };
  const current = () => {
    let c = 0;
    stops.forEach((s, i) => { if (top(i) <= scrollY + 4) c = i; });
    return c;
  };
  const go = i => glide(top(Math.max(0, Math.min(stops.length - 1, i))));

  /* A wheel gesture, read as one step. A trackpad sends a stream of small events (the swipe, then its
     inertia, which can run on for seconds) that never goes quiet; a mouse sends one large event per notch.
     The deltas of a gesture add up until they reach a threshold, which moves one step; the rest of the
     gesture is ignored. Inertia only slows down and never turns round, so once it has started slowing, a
     clear rise above its slowest point, or a delta in the other direction, is the finger swiping again, even
     while the inertia is still running. Speeds are per millisecond, so events the browser merges or splits
     between frames don't read as a rise. */
  const wheelStep = (() => {
    let last = 0, prevSpeed = 0, acc = 0, fired = 0, firedAt = 0, low = 0, slowing = false, rearmed = false;
    return (e, busy) => {
      const now = performance.now();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1; // lines / pages to px
      const dx = e.deltaX * unit, dy = e.deltaY * unit;
      const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
      const a = Math.abs(d);
      if (!a) return 0;
      const gap = now - last;
      last = now;
      if (gap > 160) { acc = 0; fired = 0; rearmed = false; prevSpeed = 0; }
      const speed = a / Math.min(50, Math.max(8, gap)); // px per ms
      const before = prevSpeed;
      prevSpeed = speed;
      if (fired) {
        if (!slowing) { if (speed < before * .95) { slowing = true; low = speed; } } // still the same swipe
        else low = Math.min(low, speed);
        const fresh = Math.sign(d) !== fired || (slowing && a >= 4 && speed > low * 1.5);
        if (busy || now - firedAt < 200 || !fresh) return 0;
        fired = 0; acc = 0; rearmed = true;
      } else if (rearmed && speed < before * .6) acc = 0; // slowing again: that was inertia, not a new swipe
      if (acc && Math.sign(d) !== Math.sign(acc)) acc = 0;
      acc += d;
      if (busy || Math.abs(acc) < 20) return 0;
      fired = Math.sign(d); firedAt = now; slowing = false; acc = 0; rearmed = false;
      return fired;
    };
  })();
  addEventListener('wheel', e => {
    if (!desktop() || e.ctrlKey) return;
    if (e.target.closest && e.target.closest('.menu-open .wm-list')) return; // the open menu's list scrolls itself
    e.preventDefault();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // sideways swipes don't move the page
    const dir = wheelStep(e, animating);
    if (dir) go(current() + dir);
  }, { passive: false });
  addEventListener('keydown', e => {
    if (!desktop() || e.target.closest('textarea, input')) return;
    const k = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 }[e.key];
    if (k) { e.preventDefault(); if (!animating) go(current() + (e.shiftKey && e.key === ' ' ? -1 : k)); }
    if (e.key === 'Home') { e.preventDefault(); go(0); }
    if (e.key === 'End') { e.preventDefault(); go(stops.length - 1); }
  });
  $$('[data-to]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const i = +a.dataset.to;
    if (desktop()) go(i); else stops[i].scrollIntoView({ behavior: still ? 'auto' : 'smooth' });
    history.replaceState(null, '', a.getAttribute('href'));
  }));

  // the header: Home, Work (and its square) or Contact, whichever section holds the middle of the view
  const nav = { home: $$('.site-nav > a')[0], work: $$('.nav-work > a')[0], contact: $$('.site-nav > a')[1] };
  const sqs = $$('.site-nav .sq');
  const next = document.getElementById('next-bar'), nextGo = next.querySelector('a');
  const track = () => {
    let c = 0;
    stops.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * .4) c = i; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) c = stops.length - 1;
    nav.home.setAttribute('aria-current', c === 0);
    nav.work.setAttribute('aria-current', c > 0 && c < stops.length - 1);
    nav.contact.setAttribute('aria-current', c === stops.length - 1);
    sqs.forEach((q, i) => q.setAttribute('aria-current', i + 1 === c));
    stops.forEach((s, i) => s.classList.toggle('is-current', i === c));
    // the one Next bar: on while a case study is current, pointing at the section after it
    const work = c > 0 && c < stops.length - 1;
    next.classList.toggle('on', work);
    if (work && +nextGo.dataset.to !== c + 1) {
      nextGo.dataset.to = c + 1;
      nextGo.setAttribute('href', '#' + stops[c + 1].id);
      nextGo.lastElementChild.textContent = c + 1 === stops.length - 1 ? 'Contact' : 'Next case study';
    }
    document.documentElement.classList.toggle('at-hero', scrollY < 8); // the header stays clear over the hero
  };
  addEventListener('scroll', track, { passive: true }); track();
  // a resized window keeps the section it was on
  let rz;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (desktop() && !animating) scrollTo(0, top(current())); }, 150); });

  // the cursor over a case study
  if (!matchMedia('(hover: hover)').matches) return;
  const cur = document.createElement('div');
  cur.className = 'cs-cursor'; cur.setAttribute('aria-hidden', 'true');
  cur.innerHTML = '<svg viewBox="0 0 16 16"><defs><linearGradient id="cur-grad" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#6BABFF"/><stop offset="1" stop-color="#0051FF"/></linearGradient></defs>' +
    '<path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="url(#cur-grad)" stroke-width="2" stroke-linecap="square"/></svg><span>View case study</span>';
  document.body.append(cur);
  const label = cur.querySelector('span');
  const OWN = '.term, .cs-ctrl'; // where the pointer is theirs, not the pill's (devices keep the pill, prototypes too)
  addEventListener('pointermove', e => { cur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; }, { passive: true });
  $$('.s-work').forEach(s => {
    s.addEventListener('pointerenter', e => {
      cur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; // no pointermove yet (page just loaded): not at the corner
      const soon = s.classList.contains('soon');
      cur.classList.toggle('soon', soon); label.textContent = soon ? 'Case study coming soon' : 'View case study';
      cur.classList.toggle('on', !e.target.ownerDocument.elementFromPoint(e.clientX, e.clientY)?.closest(OWN)); // straight onto a button: no pill
    });
    s.addEventListener('pointerleave', () => cur.classList.remove('on'));
  });
  // over a term's tooltip, the Play prototype button or a playing prototype, the pointer is theirs: no pill
  addEventListener('pointerover', e => {
    if (e.target.closest('.s-work')) cur.classList.toggle('on', !e.target.closest(OWN));
  }, { passive: true });
})();


// Figma prototypes: a section with a Figma link (data-figma) gets the prototype control, a small dark pill (under a
// phone, under the description beside a laptop) with three states: "Play" (not loaded, or paused), "Loading…" with a
// round spinner (asked for, not yet arrived), "Pause" (playing). The prototype plays in the device's screen, over its
// screenshot, appearing once it has loaded; a phone starts loading it as soon as the page opens, a laptop when asked.
// Paused, it stays paused
(() => {
  const embed = link => {
    try {
      const u = new URL(link);
      if (u.hostname !== 'embed.figma.com') { u.hostname = 'embed.figma.com'; u.searchParams.set('embed-host', 'share'); }
      if (!u.searchParams.has('hide-ui')) u.searchParams.set('hide-ui', '1');
      if (!u.searchParams.has('scaling')) u.searchParams.set('scaling', 'scale-down-width');
      return u.href;
    } catch { return null; }
  };
  const ICON = {
    idle: '<svg viewBox="0 0 10 10"><path d="M2 .8l7.2 4.2L2 9.2z"/></svg>',
    loading: '<svg class="spin" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7.5"/></svg>',
    playing: '<svg viewBox="0 0 10 10"><path d="M2 1h2.2v8H2zM5.8 1H8v8H5.8z"/></svg>',
  };
  const TEXT = { idle: 'Play', loading: 'Loading…', playing: 'Pause' };
  document.querySelectorAll('.s-work[data-figma], .s-work[data-video]').forEach(sec => {
    const clip = (sec.dataset.video || '').trim();
    const link = (sec.dataset.figma || '').trim(), src = clip || (link && embed(link));
    if (!src) return;
    const what = clip ? 'video' : 'Figma prototype';
    const device = sec.querySelector('.device'), screen = device.querySelector('.screen');
    const title = sec.querySelector('h2').textContent.trim();
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'cs-proto';
    btn.innerHTML = '<b aria-hidden="true"></b><span></span>';
    const [icon, label] = [btn.querySelector('b'), btn.querySelector('span')];
    // beside it, a round Restart: the prototype from its first screen again
    const again = document.createElement('button');
    again.type = 'button'; again.className = 'cs-restart'; again.title = 'Restart';
    again.setAttribute('aria-label', 'Restart the ' + what + ': ' + title);
    again.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.6 7.5A6 6 0 1 1 4 11.2"/><path d="M4.2 3.6v4.2h4.2"/></svg>';
    const ctrl = document.createElement('div');
    ctrl.className = 'cs-ctrl';
    ctrl.append(btn, again);
    (sec.querySelector('.cs-mid') || sec.querySelector('.cs-left')).append(ctrl);
    let frame = null;
    const set = state => {
      btn.dataset.state = state;
      again.hidden = state === 'loading'; // nothing to restart until it has arrived
      icon.innerHTML = ICON[state];
      label.textContent = TEXT[state];
      device.classList.toggle('playing', state !== 'idle');
      btn.setAttribute('aria-pressed', state !== 'idle');
      btn.setAttribute('aria-label', { idle: 'Play', loading: 'Loading, press to cancel:', playing: 'Pause' }[state] + ' the ' + what + ': ' + title);
    };
    if (clip) {
      // a video: muted, looping, over its poster (its own first frame). It plays as the page opens (not with reduced
      // motion: then it waits for Play); paused, it stays paused, and it rests while its section is out of view
      const v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
      const poster = screen.querySelector('.poster');
      if (poster) v.poster = poster.currentSrc || poster.src;
      v.src = src;
      screen.append(v);
      let want = !matchMedia('(prefers-reduced-motion: reduce)').matches, seen = !('IntersectionObserver' in window);
      const go = () => {
        if (want && !seen) set('playing'); // on, resting out of view
        if (want && seen) { if (v.paused) { if (v.readyState < 3) set('loading'); v.play().catch(e => { if (e.name === 'NotAllowedError') { want = false; set('idle'); } }); } } // an interrupted play is not a refusal
        else if (!v.paused) v.pause();
        if (!want) set('idle');
      };
      v.addEventListener('playing', () => set('playing'));
      v.addEventListener('waiting', () => { if (want) set('loading'); });
      btn.addEventListener('click', () => { want = !want; go(); });
      again.addEventListener('click', () => { v.currentTime = 0; want = true; go(); });
      if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { seen = e.isIntersecting; go(); }).observe(device);
      set('idle');
      go();
      return;
    }
    const start = () => {
      frame = document.createElement('iframe');
      frame.loading = 'eager'; frame.src = src; frame.title = 'Figma prototype: ' + title; frame.allowFullscreen = true;
      const f = frame;
      f.addEventListener('load', () => { if (frame !== f) return; f.classList.add('ready'); set('playing'); }, { once: true });
      screen.append(frame);
      set('loading');
    };
    const stop = () => { frame.replaceWith(); frame = null; set('idle'); };
    btn.addEventListener('click', () => frame ? stop() : start());
    again.addEventListener('click', () => { if (frame) frame.replaceWith(); frame = null; start(); });
    set('idle');
    if (device.matches('.phone')) start(); // as the page opens, not when its section comes into view
  });
})();

// Ask Me Agent's close-ups: the chat's panel and the note share one width, set by the height the note leaves
// (home.css, --cw); the CSS guesses the note's height, this gives it the real one, as it wraps
(() => {
  if (!('ResizeObserver' in window)) return;
  document.querySelectorAll('.cs-feat').forEach(feat => {
    const note = feat.querySelector('.feat-note');
    const set = () => feat.style.setProperty('--note', note.offsetHeight + 'px');
    new ResizeObserver(set).observe(note);
    set();
  });
})();
