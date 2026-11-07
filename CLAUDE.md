# Folio — working agreement

## Role
Act as an expert UX/UI designer, product designer, interaction designer,
graphic designer, motion designer and art director — not just a developer.

## Design references
Reference images supplied for this site are rough, not pixel-perfect.
Do not copy them literally. Fix spacing, alignment, proportion and colour
as needed, keeping the intent of the reference.

## Workflow
1. Design first: present the refined design (rendered mockup) and note
   what was changed from the reference and why.
2. Develop only after the design is approved.

## Fixed decisions (change only when told)
- Background `#121315`, stroke `#202123`.
- Fixed background: 6-column vertical grid lines, 2.75vw side gutters.
- Font: Inter, everywhere. PP Mondwest survives only as the shape of the
  contact page's "@" mark (an SVG path); its font files are no longer in the
  repository.
- Structure: `index.html` (home: hero → one section per case study → contact),
  `case-studies/<slug>/index.html` per case study, shared `styles.css`.

## Pages
- Home page: `index.html`, Home, Work and Contact on one page: the hero
  (`#home`), one section per case study (`#work`: Ask Me Agent, Business
  Reporting Agent, GIFA, Fee management, Creating Automation, then Stamp; the
  agents and Stamp have no case-study page yet) and the contact page as the
  last section (`#contact`). Its styles are in `home.css`, on top of
  `styles.css`, the shared `case-studies/case-study.css` and
  `contact/contact.css`; its script is `home.js` (the form uses
  `contact/contact.js`).
  Wide windows: one scroll (wheel flick, arrow keys, Page Up/Down, Home/End)
  glides to the next section (the case studies' 850ms glide). The hero takes
  the window's top 70%, the first case study's phone peeking up below it; each case study fills the window under the header, down to the "Next
  case study" bar (no peek): one bar for all the case studies, fixed at the
  window's foot while one is in view, leading to the next section (Stamp's to
  Contact); wide windows only. Contact fills the window. Phones scroll freely.
  Header: fixed; HOME, WORK with one square per case study (Stamp included;
  the case-study squares' style, the current one blue), CONTACT; the section in
  view is lit. On phones the squares are hidden.
  Hero (design-2): on `--panel`, no signature and no glow image. "UX & Product
  Designer" in Inter's text cut (opsz 14, open tracking), sized so "UX &
  Product" ends on the frame's middle line; under it "I make complicated software feel obvious." in grey
  sentence case (`.tagline`, one line on wide windows), then the focus areas as labels
  (`.focus`: outlined pills, "AI & Agentic Experiences", "Cloud Networking",
  "Cybersecurity", in `--text-body`; they wrap on phones); "↓ Selected work" centred just above the peeking phone (28px
  above its top, wide windows; it fades out once
  the case study is in view). Wide windows: the
  hero takes the window's top 70% (`--peek: 30vh`), so the first case study's
  own phone (Ask Me Agent) peeks up below it: one continuous phone, not a copy.
  While the hero is in view (`.at-hero`) only that phone shows; the section's
  copy, close-ups and prototype control fade in as the page moves on, and its
  top rule is hidden. The mesh gradient (three soft deep-blue pools, left, a
  weaker one centre, right) is drawn by that section, reaching up into the
  hero, centred on the window's foot as the page opens;
  it shows while the hero is in view; on every case study (through Stamp) the
  mesh is a large soft glow across the upper middle of the section, behind the
  copy and device, as in the reference; Contact has none. Phones: no peek; the
  hero ends with "Selected work" over the mesh. On load the title, focus line
  and label rise in, the peeking phone rises last.
  Case-study sections: one system for all six, on the plain `--panel` (the glow
  belongs to the hero alone), on the frame's thirds (the background's grid
  lines). In the first third the copy, the same in every section: the headline
  (weight 500, `--t-work`), its cap top on the top padding line, and one
  description (`--text-body`; GIFA keeps its term tooltip) with its baseline on
  the bottom line. No eyebrow and no arrow: a link is the whole section (the
  cursor's "View case study" pill says it); a case study still to come
  (`.soon`: Ask Me Agent, Business Reporting Agent, Stamp) is not a link and has
  only a "Coming soon" chip above its headline. Headlines are the case
  study's outcome, except the agents', which are their names as given: "Ask Me
  Agent." and "Business Reporting Agent". In the other two thirds the device:
  the supplied frames (WebP in `assets/devices/`; the uploaded PNGs were removed),
  their screens see-through, the screenshot placed behind the frame by the
  frame's own pixel measurements. `.lap` (GIFA, Fee management, Creating
  Automation, Stamp), as marked on the reference: the laptop's lid (x 193–1690
  of the image) spans the device area exactly, from the one-third line to the
  frame's right line, its base on the Next bar (its top never above the top
  padding line, so there is air under the header; on wide, short windows it
  is then smaller, still flush with the right line, starting past the
  one-third line), reaching a little back into
  the copy column (the description kept clear of it) and leaking out past the
  frame's border on the right, cut only by the window's edge (the header's
  band covers the side margins, so a laptop passing under it doesn't show).
  `.ph` (Ask Me Agent, Business Reporting Agent): the phone from the top line,
  its prototype control under it on the bottom line; Ask Me Agent has its
  close-ups beside it (`.cs-right .cs-feat`: the chat from the section's top
  edge, its third card a little past the frame; the personalization note on
  the bottom line; the chat's panel and the note share one width, which
  home.js sets from the note's measured height; windows under 760px tall drop
  the note's caption); a phone alone (`.solo`) centres in the other two
  thirds. Laptop screens are 1.54:1 (the Fee management, Creating Automation
  and Stamp screens are cut from their opening images); phone screens
  1179 × 2556.
  Prototypes: a Figma share link in `data-figma` adds the prototype control
  (`.cs-proto`), the same small dark pill on every device (under a phone; under
  the description beside a laptop), its round icon telling the state: "Play"
  (a triangle; not loaded, or paused), "Loading…" (a turning blue ring), "Pause"
  (two bars; playing); beside it a round Restart (a circling arrow) that plays
  the prototype from its first screen again (hidden while loading). The prototype plays in the screen
  (embed.figma.com) over the screenshot and appears once loaded; a phone plays
  it as soon as the page opens, a laptop when asked; paused, it stays paused.
  A phone can hold a video instead (`data-video`), with one button and no
  Restart: "Pause" while it plays, "Play" when paused, "Replay" (the circling
  arrow) once it has played through (its end, or stopped within its last
  moment: Safari can stop short without saying so); muted, it plays once as the page opens
  (with reduced motion, when asked) and rests while out of view, over a poster
  of its own first frame. Between the phone and the button, its progress
  (`.cs-seek`): a 2px track the screen's width, fully rounded, the played part
  in the brand gradient run along it (#6BABFF to #0051FF), no handle; press
  or drag to move through the video (paused while held, then as it was), or
  the arrow keys (5s), Home and End. The agents play their screen recordings this
  way, not Figma prototypes: `assets/ask-me-agent/demo.mp4` and
  `assets/business-reporting-agent/demo.mp4` (the uploads cropped to the
  phone's screen, 500 × 1080, H.264, no sound), posters `video-poster.webp`
  beside them. The cursor over a case study is a dark pill, the arrow in
  the brand gradient and "View case study" (`.cs-cursor`), stepping aside only over
  the term and the prototype control (it stays over the devices, a playing
  prototype too: on wide pointer screens the prototype is watched, not
  driven); over a case study to come, a
  light grey pill "Case study coming soon".
  Phones: the headline and description, then the device (the phone with its
  control under it; no close-ups). Spacing says whose device it is: 24px from
  the copy to its device, 64px of air under the device, then the rule and 48px
  down to the next headline (a laptop no longer stands on the rule).
  WORK menu (pointer screens; on every page, built by the shared `work-menu.js`
  from its one list of the case studies, styles `.wm-*` in case-study.css): hovering WORK or its squares drops a dark list
  of the six case studies (no border; title, full description, arrow or
  "Soon") under the header, from the HOME label (its text on HOME) to the
  frame's right line, split 50-50: the list on the left half, the preview on
  the right; the page behind blurs and darkens. Type: titles 20px at 1440
  (medium), descriptions 14px in the secondary grey, both scaling with --u;
  all six fit; a window too short for the list scrolls it inside the menu (a
  wheel over the list scrolls it and neither closes the menu nor moves the
  page). The item under the pointer turns light and the preview opens beside
  it, from the top, its height following the screen it shows: a desktop
  screen in a landscape panel (its width × .72), a mobile screen (the agents'
  menu images, `assets/ask-me-agent/menu.webp`,
  `assets/business-reporting-agent/menu.webp`) the list's full height (the height glides
  between the two); the screen stands on the panel's bottom edge. Items open the case-study pages;
  a case study to come ("Soon") closes the menu and glides to its section.
  Only WORK, the list and the open preview count as the menu: the pointer
  anywhere else closes it after a short grace (250ms); so do Esc and a wheel
  outside the list. A click on WORK or a square closes it at once, and it
  stays shut until the pointer leaves them.
- Site header on every page (the case-study pages carry the same six squares,
  in the home page's order): the name, led by a pill of the face
  (`assets/avatar-1x/2x/3x.webp`, one per screen density, sharpened: the uploaded face photo (since removed) from the hair's top to the
  collar, 3:2, its blue backdrop carried out at the sides; 1.6em tall, fully
  rounded; styles `.logo-face` in case-study.css); every page's favicon is a
  circle of the same face, `assets/favicon-64.png`, with
  `assets/apple-touch-icon.png`. Then Home, Work with one square per
  case study, and Contact close beside it on the left. On the home page the
  section in view is lit; on a case study, Work and that case study's square.
  Work goes to the home page's case studies (`#work`), a square to its section,
  Contact to the home page's contact section (`#contact`).
  Phones: the name, and on the right a "Menu" button in its own cell behind a
  frame line (`site-menu.js`, loaded on every page; styles `.mm-*` in
  case-study.css). It opens a panel from the right over a dimmed page: Close
  in Menu's place, then Home, Work with the six case studies in the home
  page's order (a light thumbnail of the main screen standing on its bottom
  edge, the agents' phones by their height; title and a two-line
  description; the ones to come dimmed with "Soon", leading to their section
  on the home page), Contact. The
  page you're on is lit with a blue square; on a case study its row's thumbnail
  is outlined. On the home page Home, Work and Contact scroll to their
  sections. Esc or the shade closes it; Tab stays inside. Desktop keeps its
  links; its styles live in the shared `case-studies/case-study.css`. On case studies it opens the first
  screen, then floats: hidden while scrolling down, shown when scrolling up,
  when the pointer reaches the top edge, or on keyboard focus (`case-study.js`).
- Case-study section index: a bar of section numbers on desktop; on phones one
  "Index" button (bottom right, a list icon, so it isn't mistaken for Menu) that opens the sections in a panel from the
  right, the current one marked, Close at the bottom (`.ix-*`, case-study.js).
- Case-study body copy (descriptions) uses `--text-body` (#B8B9BC), a step
  lighter than `--text-2`. On phones, small controls (header name and links,
  footer links, screen-switch squares) have tap areas of at least 44px, and the
  footer links use the small label style.
- Case-study footers: "Other projects" shows the other two case studies, each
  a link with its opening screen (the same shot as on the home page), title,
  description and arrow.
- Contact: the home page's last section (`#contact`), its heading "Have something
  complicated? Let's talk" (after the hero's statement), with
  `contact/contact.css` and `contact/contact.js`. `contact/index.html` only
  forwards to it, so old links keep working.
- Images: case-study screenshots are WebP (quality 88); the home page's images
  carry their width and height. Sharing: every page has Open Graph tags, the
  image `assets/og-image.jpg` (the earlier hero, with the signature, as a 1200×630
  card; not yet redone for design-2).
- Cache tags: every style sheet and script is loaded with one site-wide tag
  (`?v=r52`); bump it on every release.
- "Global Incentive Fee Awards case study":
  `case-studies/global-incentive-fee-awards/index.html`. A case study page,
  not the home page. Its images live in `GIFAcasestudyimages/`.
