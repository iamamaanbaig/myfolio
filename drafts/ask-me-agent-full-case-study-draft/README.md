# Ask ME Agent full case study draft

The full design for the Ask Me Agent case study, as approved in mockup on
2026-11-07, kept as a draft. Not part of the site: nothing links here.

The built page (`case-studies/ask-me-agent/`) leaves out two sections for now,
**How it knows you** and **Compare**; their design and copy are kept below so
they can be added later.

Source: the Ask Me Agent content board (12 frames: problem statement, "How
will user identify the right product that fits their nutrition goals?", Set
Goals, Product Fit, Personalization, Suggest, Ask & Learn, "How will the user
compare products?", Selection experience, Comparison).

Files:
- `AskMe-mockup-1-overview-problem-askme.png`, `AskMe-mockup-2-how-it-knows-you.png`,
  `AskMe-mockup-3-compare-outcome.png`: the mockup at 1440 wide.
- `mockup.css`: the mockup's styles (`.am-*`), on top of `case-study.css`.
- `mockup-build.py`: the script that built the mockup page from the fee
  management page's shell (it ran from a scratch folder with a `file://` base;
  read it for the markup, don't run it as is).

Image holders are empty phone frames, each captioned with the screen it will
hold.

---

## 01 Overview
- Three phones on the hero band (empty): Product details, Ask me: the answer
  (front), Better matches.
- **Ask Me Agent.**
- A smart food app: scan a food product and it tells you, in plain words,
  whether it's right for you and your family, and answers anything else you
  want to ask about it. (Never "grocery app"; no mention of retail stores.)
- Facts: Product: Smart food app, iOS · Focus: AI agent, personalization,
  nutrition. (Team, client and results unknown: not invented.)

## 02 Problem
- A food label lists nutrients, but it doesn't say **whether the product is
  right for you**. Shoppers had to read, decode and judge every pack
  themselves, for themselves and for everyone they shop for.
- The brief: a mobile app that scans a food product and gives its nutrition
  detail **in a way that actually helps**.
- The question (gradient rule beside it): How will a user identify the right
  product, one that fits their nutrition goals?

## 03 Ask & learn (the core; placed straight after the problem)
- Don't just access information, learn from it. **Ask me** lets a shopper ask
  anything about the product in their hand, by voice or text, and answers for
  them and their family.
- Holders: Ask me: listening to the question (large) · The answer,
  personalized · Learn: a short read.
- 1 Ask in your own words: type a question or speak into the microphone,
  right from the product page. No search terms, no menus.
- 2 Answers about you, not the average: answers draw on the goals and people
  set up at the start: not "high in calcium", but "15% more calcium than
  average, good for Raju's growth".
- 3 Learn more than the label: every answer can go deeper, with a follow-up
  question or a short read, so shoppers understand the benefit and trust the
  choice.

## 04 How it knows you (NOT BUILT YET)
Lede: Ask me can answer for you because the whole app is built around **who
you shop for**. Four features give it that context, from the first screen to
the shelf. One row per feature: step chip, title, question in blue, body,
holders on the right two thirds.
- 01 Set goals: "Who are you shopping for?" / Start with people, not
  products. / Set a budget and choose the people and groups you shop for, so
  every product you scan is checked against their profiles. Holders: Goals:
  budget and people · Scan a product in store.
- 02 Product fit: "Does the product fit?" / A plain yes or no, for everyone
  you shop for. / The app evaluates the product against your health needs and
  your family's, and says plainly whether it fits. The price badge looks more
  or less appealing as the price and offers fit those needs. Holders: Product
  fit: a good fit · Product fit: not a fit.
- 03 Personalization: "How does it benefit me?" / Benefits, explained in
  terms of the people they help. / The app doesn't stop at telling whether a
  product is right; it explains each benefit in terms of the person it helps,
  at every level of the app. Cards: ✕ Not this: "Calcium 300 mg · 15%" · ✕
  Not even this: "Calcium: good for health" · ✓ This: "15% more calcium than
  average, good for Raju's growth needs". Holder: Personalization badges.
- 04 Suggest: "Is there something better?" / Tailored for you. Value for
  money. Don't settle for good, go for better. / If a better option exists,
  Better matches shows similar products that fit your needs more, through
  value metrics, so you make the right choice and get value for money.
  Holder: Better matches.

## 05 Compare (NOT BUILT YET)
Lede: When two products both fit, how does a shopper know **which one is
better for them**?
- Selection: three ways to pick what to compare. 1 **Scan** the product in
  your hand and compare it with the one you're holding. 2 **Pick from
  suggestions** that fit your needs better. 3 **Bring back** a product you put
  back on the shelf. Holders: Compare: choosing products · Compare: products
  selected.
- Comparison: Shoppers compare only products that fit their needs, to find the
  one that fits them best. The screen answers one question: which is more
  beneficial for me? Holder: Comparison (centre), with labels on the right:
  **Benefit to you** (how much each product helps your needs: the combined
  value of all its benefits) · **Product benefits** (every benefit each
  product offers, side by side) · **Value of each benefit** (how much each
  benefit is worth, so the difference is clear).

## 06 Outcome
- Shoppers stop decoding labels: **a product becomes an answer about them**.
- Answers, not data: Ask me turns nutrition facts into a plain answer to the
  shopper's own question.
- About you, not the average: every fit, benefit and answer is for the people
  the shopper buys for.
- Better, not just good: suggestions and comparison point to the product that
  fits best, and gives value for money. (Reword while Compare is left out.)
