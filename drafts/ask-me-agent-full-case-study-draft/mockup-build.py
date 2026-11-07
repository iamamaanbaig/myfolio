import re, os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open('/home/user/myfolio/case-studies/fee-management/index.html').read()
head_end = src.index('<div class="hero-shot">')
foot_start = src.index('    <!-- Site footer')
top = src[:head_end]
top = top.replace('<head>', '<head><base href="file:///home/user/myfolio/case-studies/fee-management/">', 1)
top = top.replace('</head>', f'<link rel="stylesheet" href="file://{HERE}/am.css">\n</head>', 1)
top = re.sub(r'<title>.*?</title>', '<title>Ask Me Agent: case study (mockup)</title>', top)
# Ask Me Agent's square current instead of fee management's
top = top.replace(' aria-label="Case study 4: Cut fee management effort by 40 minutes" aria-current="true"', ' aria-label="Case study 4: Cut fee management effort by 40 minutes"')
top = top.replace('aria-label="Case study 1, coming soon: Ask Me Agent"', 'aria-label="Case study 1: Ask Me Agent" aria-current="true"')

def ph(label, cls=''):
    return f'<figure class="am-ph{cls}"><div class="am-phone"><div class="am-screen"><span>Image</span></div><img class="am-frame" src="../../assets/devices/iphone-15-pro.webp" alt="" width="603" height="1190"></div><figcaption>{label}</figcaption></figure>'

def row(n, label, title, ask, body, phones, extra=''):
    return f'''
      <article class="am-row">
        <div class="am-copy">
          <p class="am-step"><span>{n}</span>{label}</p>
          <h3>{title}</h3>
          <p class="am-q">{ask}</p>
          <p class="am-body">{body}</p>{extra}
        </div>
        <div class="am-shots n{len(phones)}">{''.join(phones)}</div>
      </article>'''

body = f'''<div class="hero-shot am-hero-shot">
        <div class="am-hero-comp">
          {ph('Product details', ' back l')}
          {ph('Ask me: the answer', ' front')}
          {ph('Better matches', ' back r')}
        </div>
      </div>
      <div class="hero-body">
        <h1>Ask Me Agent.</h1>
        <p class="lede">A smart food app: scan a food product and it tells you, in plain words, whether it’s right for you and your family, and answers anything else you want to ask about it.</p>
      </div>
      <dl class="facts">
        <div><dt>Product</dt><dd>Smart food app, iOS</dd></div>
        <div><dt>Focus</dt><dd>AI agent, personalization, nutrition</dd></div>
      </dl>
    </section>

    <!-- The problem -->
    <section class="panel problem" id="problem" aria-labelledby="problem-title" data-stop>
      <header class="sec-head">
        <span class="ghost" aria-hidden="true">Problem</span>
        <h2 class="sec-title" id="problem-title">The problem</h2>
      </header>
      <div class="am-problem">
        <div>
          <p class="lede">A food label lists nutrients, but it doesn’t say <strong>whether the product is right for you</strong>. Shoppers had to read, decode and judge every pack themselves, for themselves and for everyone they shop for.</p>
          <p class="am-brief">The brief: a mobile app that scans a food product and gives its nutrition detail <strong>in a way that actually helps</strong>.</p>
        </div>
        <blockquote class="am-question"><span>The question</span>How will a user identify the right product, one that fits their nutrition goals?</blockquote>
      </div>
    </section>

    <!-- Ask me: the core of the case study -->
    <section class="panel am-ask-sec" id="ask-me" aria-labelledby="ask-title" data-stop>
      <header class="sec-head">
        <span class="ghost" aria-hidden="true">Ask me</span>
        <h2 class="sec-title" id="ask-title">Ask &amp; learn</h2>
      </header>
      <p class="lede am-lede">Don’t just access information, learn from it. <strong>Ask me</strong> lets a shopper ask anything about the product in their hand, by voice or text, and answers for them and their family.</p>
      <div class="am-ask">
        <div class="am-ask-main">{ph('Ask me: listening to the question')}</div>
        <ol class="am-points">
          <li><h3>Ask in your own words</h3><p>Type a question or speak into the microphone, right from the product page. No search terms, no menus.</p></li>
          <li><h3>Answers about you, not the average</h3><p>Answers draw on the goals and people set up at the start: not “high in calcium”, but “15% more calcium than average, good for Raju’s growth”.</p></li>
          <li><h3>Learn more than the label</h3><p>Every answer can go deeper, with a follow-up question or a short read, so shoppers understand the benefit and trust the choice.</p></li>
        </ol>
        <div class="am-ask-side">{ph('The answer, personalized')}{ph('Learn: a short read')}</div>
      </div>
    </section>

    <!-- What Ask me knows: the features that give it context -->
    <section class="panel am-flow" id="knows-you" aria-labelledby="knows-title" data-stop>
      <header class="sec-head">
        <span class="ghost" aria-hidden="true">Knows you</span>
        <h2 class="sec-title" id="knows-title">How it knows you</h2>
      </header>
      <p class="lede am-lede">Ask me can answer for you because the whole app is built around <strong>who you shop for</strong>. Four features give it that context, from the first screen to the shelf.</p>
      {row('01', 'Set goals', 'Who are you shopping for?', 'Start with people, not products.', 'Set a budget and choose the people and groups you shop for, so every product you scan is checked against their profiles.', [ph('Goals: budget and people'), ph('Scan a product in store')])}
      {row('02', 'Product fit', 'Does the product fit?', 'A plain yes or no, for everyone you shop for.', 'The app evaluates the product against your health needs and your family’s, and says plainly whether it fits. The price badge looks more or less appealing as the price and offers fit those needs.', [ph('Product fit: a good fit'), ph('Product fit: not a fit')])}
      {row('03', 'Personalization', 'How does it benefit me?', 'Benefits, explained in terms of the people they help.', 'The app doesn’t stop at telling whether a product is right; it explains each benefit in terms of the person it helps, at every level of the app.', [ph('Personalization badges')], extra='''
          <div class="am-trio">
            <div class="no"><b>Not this</b><p><span>Calcium</span><span>300 mg · 15%</span></p></div>
            <div class="no"><b>Not even this</b><p>Calcium: good for health</p></div>
            <div class="yes"><b>This</b><p>15% more calcium than average, good for Raju’s growth needs</p></div>
          </div>''')}
      {row('04', 'Suggest', 'Is there something better?', 'Tailored for you. Value for money. Don’t settle for good, go for better.', 'If a better option exists, Better matches shows similar products that fit your needs more, through value metrics, so you make the right choice and get value for money.', [ph('Better matches')])}
    </section>

    <!-- Compare -->
    <section class="panel am-compare" id="compare" aria-labelledby="compare-title" data-stop>
      <header class="sec-head">
        <span class="ghost" aria-hidden="true">Compare</span>
        <h2 class="sec-title" id="compare-title">Compare</h2>
      </header>
      <p class="lede am-lede">When two products both fit, how does a shopper know <strong>which one is better for them</strong>?</p>
      <div class="am-sel">
        <h3 class="am-sub">Selection: three ways to pick what to compare</h3>
        <ol>
          <li><span>1</span><p><b>Scan</b> the product in your hand and compare it with the one you’re holding.</p></li>
          <li><span>2</span><p><b>Pick from suggestions</b> that fit your needs better.</p></li>
          <li><span>3</span><p><b>Bring back</b> a product you put back on the shelf.</p></li>
        </ol>
        <div class="am-shots n2">{ph('Compare: choosing products')}{ph('Compare: products selected')}</div>
      </div>
      <div class="am-anat">
        <div class="am-anat-l"><h3 class="am-sub">Comparison</h3><p>Shoppers compare only products that fit their needs, to find the one that fits them best. The screen answers one question: which is more beneficial for me?</p></div>
        <div class="am-anat-c">{ph('Comparison')}</div>
        <ul class="am-anat-r">
          <li><b>Benefit to you</b>How much each product helps your needs: the combined value of all its benefits.</li>
          <li><b>Product benefits</b>Every benefit each product offers, side by side.</li>
          <li><b>Value of each benefit</b>How much each benefit is worth, so the difference is clear.</li>
        </ul>
      </div>
    </section>

    <!-- Outcome: no numbers yet; the principles the design stands on -->
    <section class="panel impact" id="outcome" aria-labelledby="outcome-title" data-stop>
      <header class="sec-head">
        <span class="ghost" aria-hidden="true">Outcome</span>
        <h2 class="sec-title" id="outcome-title">Outcome</h2>
      </header>
      <p class="impact-lead">Shoppers stop decoding labels: <strong>a product becomes an answer about them</strong>.</p>
      <div class="outcomes three">
        <article class="outcome"><span class="tick" aria-hidden="true"></span><h3>Answers, not data</h3><p>Ask me turns nutrition facts into a plain answer to the shopper’s own question.</p></article>
        <article class="outcome"><span class="tick" aria-hidden="true"></span><h3>About you, not the average</h3><p>Every fit, benefit and answer is for the people the shopper buys for.</p></article>
        <article class="outcome"><span class="tick" aria-hidden="true"></span><h3>Better, not just good</h3><p>Suggestions and comparison point to the product that fits best, and gives value for money.</p></article>
      </div>
    </section>

'''
foot = src[foot_start:]
foot = foot.replace('<a class="op-card" href="../creating-automation/">', '<a class="op-card" href="./">').replace('<div class="shot op-auto"><img src="../../Creatingautomationcasestudyimages/Group%201321317990.webp"', '<div class="shot op-auto"><img src="../../Feemanagementcasestudyimages/Heroleft.webp"').replace('<h3>Reduced support calls</h3>', '<h3>Cut fee management effort by 40 minutes</h3>').replace('<p>By making it easy to create a new automation.</p>', '<p>By reducing the fee templates a single classroom needed from an average of 9 to 1.</p>')
nav = '''<nav class="index" aria-label="Case study sections">
    <a href="#overview"><span>01</span> Overview</a>
    <a href="#problem"><span>02</span> Problem</a>
    <a href="#ask-me"><span>03</span> Ask me</a>
    <a href="#knows-you"><span>04</span> How it knows you</a>
    <a href="#compare"><span>05</span> Compare</a>
    <a href="#outcome"><span>06</span> Outcome</a>
  </nav>'''
foot = re.sub(r'<nav class="index".*?</nav>', nav, foot, flags=re.S)
open(os.path.join(HERE, 'mock.html'), 'w').write(top + body + foot)
print('ok')
