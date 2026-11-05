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
  (`#home`), one section per case study (`#work`: GIFA, Fee management,
  Creating Automation, Ask Me Agent, Business Reporting Agent, then Stamp; the
  last three have no case-study page yet) and the contact page as the
  last section (`#contact`). Its styles are in `home.css`, on top of
  `styles.css`, the shared `case-studies/case-study.css` and
  `contact/contact.css`; its script is `home.js` (the form uses
  `contact/contact.js`).
  Wide windows: one scroll (wheel flick, arrow keys, Page Up/Down, Home/End)
  glides to the next section (the case studies' 850ms glide). The hero fills
  the window (no peek at the first case study); each case study fills the window under the header, down to the "Next
  case study" bar (no peek): one bar for all the case studies, fixed at the
  window's foot while one is in view, leading to the next section (Stamp's to
  Contact); wide windows only. Contact fills the window. Phones scroll freely.
  Header: fixed; HOME, WORK with one square per case study (Stamp included;
  the case-study squares' style, the current one blue), CONTACT; the section in
  view is lit. On phones the squares are hidden.
  Hero: on `--panel` (#0C0B0E, the glow image's base) with the column glow
  (`assets/hero-glow.webp`) along the bottom; "UX & Product Designer" in Inter's text cut (opsz 14,
  open tracking; the tagline too), sized so "UX & Product" ends on the frame's
  middle line; "I make complicated software
  feel obvious." in grey sentence case; the signature (`assets/home-bg2.webp`,
  a lossless WebP of the uploaded `homebackgroundimage2.png`; the PNG
  itself was removed as unused) large on the right (95% of the
  window wide, at most 1.4 window heights), its crossbar starting a quarter of
  its width left of the middle line, its top at the window's top, running off the right and up through the header,
  which stays clear while the hero is in view (the hero reaches up under it);
  the frame lines (the header's rule and the right frame line) run behind it,
  and the crossbar runs past the frame to the window's edge; "↓ Selected case studies" at the bottom left. On load the title,
  statement and label rise in and the signature fades in last, once its image
  has arrived (index.html preloads it and the glow, and holds the fade until
  then; the case-study screens below the first load lazily).
  Case-study sections: one system for all six, on the plain `--panel` (the glow
  belongs to the hero alone), on the frame's thirds (the background's grid
  lines). In the first third the copy, the same in every section: the headline
  (weight 500, `--t-work`), its cap top on the top padding line, and one
  description (`--text-body`; GIFA keeps its term tooltip) with its baseline on
  the bottom line. No eyebrow and no arrow: a link is the whole section (the
  cursor's "View case study" pill says it); a case study still to come
  (`.soon`: Ask Me Agent, Business Reporting Agent, Stamp) is not a link and has
  only a "Case study soon" chip above its headline. Headlines are the case
  study's outcome, except the agents', which are their names as given: "Ask Me
  Agent." and "Business Reporting Agent". In the other two thirds the device:
  the supplied frames (`DeviceMockups/`, served as WebP from `assets/devices/`),
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
  the description beside a laptop): "Play prototype · Figma", or while it plays
  a green dot, "Live prototype · Pause". The prototype plays in the screen
  (embed.figma.com) over the screenshot and appears once loaded; a phone plays
  it as soon as the page opens, a laptop when asked; paused, it stays paused.
  Ask Me Agent: the Portfolio file's prototype from frame 1455-1330, its
  opening screen (`assets/ask-me-agent/screen-poster.webp`) under it; Business
  Reporting Agent: from frame 1451-916, a light screen under it until it has
  an opening screen. The cursor over a case study is a dark pill, the arrow in
  the brand gradient and "View case study" (`.cs-cursor`), stepping aside over
  the term, the control and a playing prototype; over a case study to come, a
  light grey pill "Case study coming soon".
  Phones: the headline and description, then the device (the phone with its
  control under it; no close-ups).
  WORK menu (pointer screens): hovering WORK or its squares drops a dark list
  of the six case studies under WORK (no border; title, description, arrow or
  "Soon"); the page behind blurs and darkens and the glow and signature go out.
  Menu type: titles 24px at 1440 (medium), descriptions 16px in the secondary
  grey, both scaling with --u. The item under the pointer turns light and a
  preview opens beside it: a fixed-height light panel centred on the item
  (kept within the list), holding the case study's main screen alone, standing on the panel's
  bottom edge (no gap below), so the
  two read as one light shape. Items open the case-study pages. Only WORK, the list and the open
  preview count as the menu: the pointer anywhere else (beside the list, below
  the preview) closes it after a short grace (250ms); so do Esc and a scroll. A click on WORK or a square closes it at
  once, and it stays shut until the pointer leaves them.
- Site header on every page: the name, led by a pill of the face
  (`assets/avatar-1x/2x/3x.webp`, one per screen density, sharpened: the uploaded `A_img.png` from the hair's top to the
  collar, 3:2, its blue backdrop carried out at the sides; 1.6em tall, fully
  rounded; styles `.logo-face` in case-study.css); every page's favicon is a
  circle of the same face, `assets/favicon-64.png`, with
  `assets/apple-touch-icon.png`. Then Home, Work with one square per
  case study, and Contact close beside it on the left. On the home page the
  section in view is lit; on a case study, Work and that case study's square.
  Work goes to the home page's case studies (`#work`), a square to its section,
  Contact to the home page's contact section (`#contact`).
  Phones: the name, and on the right a "Menu" button (its list, in the shared
  `site-menu.js`, doesn't have Ask Me Agent yet, so the case-study pages stay
  as they are) in its own cell behind a
  frame line (`site-menu.js`, loaded on every page; styles `.mm-*` in
  case-study.css). It opens a panel from the right over a dimmed page: Close
  in Menu's place, then Home, Work with the four case studies (a light
  thumbnail of the main screen standing on its bottom edge, title and a
  two-line description; Stamp dimmed with "Soon", not a link), Contact. The
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
- Contact: the home page's last section (`#contact`), with
  `contact/contact.css` and `contact/contact.js`. `contact/index.html` only
  forwards to it, so old links keep working.
- Images: case-study screenshots are WebP (quality 88); the home page's images
  carry their width and height. Sharing: every page has Open Graph tags, the
  image `assets/og-image.jpg` (the hero as a 1200×630 card).
- Cache tags: every style sheet and script is loaded with one site-wide tag
  (`?v=r24`); bump it on every release.
- "Global Incentive Fee Awards case study":
  `case-studies/global-incentive-fee-awards/index.html`. A case study page,
  not the home page. Its images live in `GIFAcasestudyimages/`.
