/* Section 1 — Analysis Framework, Section 2 — Business Analysis */
(function () {
  'use strict';
  const STAGES = [
    ['business', 'Business', 'What does it sell, to whom, how does it make money, and why does it win?'],
    ['income', 'Revenue & Growth', 'How big is it and how fast is demand growing?'],
    ['margins', 'Profitability', 'How much of each revenue dollar becomes profit?'],
    ['cashflow', 'Cash Flow', 'Does accounting profit turn into real cash?'],
    ['balance', 'Balance Sheet', 'Can it survive bad times? How much cash and debt?'],
    ['efficiency', 'Capital Efficiency', 'How much profit per dollar of capital? ROIC vs WACC.'],
    ['valuation', 'Valuation', 'What is the market charging? Multiples: P/E, EV/EBITDA, FCF yield.'],
    ['dcf', 'Intrinsic Value', 'What is it worth based on future cash? DCF, scenarios, range.'],
    ['thesis', 'Investment Thesis', 'Why is the market wrong, what’s the catalyst, what would prove me wrong?'],
  ];
  SAT.section({
    id: 'framework', num: 1, title: 'Analysis Framework',
    intro: 'The whole process exists to answer three questions. Click any stage to open it.',
    he: 'תהליך הניתוח: מהעסק → למספרים → לשווי → להחלטה.',
    top: `<div class="card"><h3>Learn by doing</h3><p>Follow a short lesson, trace numbers through statements, or analyze a fictional company.</p><div class="btns"><a class="btn" href="#learning">Start a learning path</a><a class="btn ghost" href="#company-case">Try the company case</a></div></div><div class="fw">
      <div class="fw-map">${STAGES.map((s, i) => `${i ? '<div class="fw-arrow">↓</div>' : ''}<a class="fw-step" href="#${s[0]}"><span class="fw-i">${i + 1}</span><span><b>${s[1].toUpperCase()}</b><span class="fw-d">${s[2]}</span></span></a>`).join('')}</div>
      <div class="fw-side">
        <div class="bigq"><span>Q1</span><div><b>Is this a good business?</b><p>Stages 1–6: moat, growth, margins, cash, balance sheet, ROIC.</p></div></div>
        <div class="bigq"><span>Q2</span><div><b>What is the business worth?</b><p>Stages 7–8: multiples and intrinsic value (DCF), as a range.</p></div></div>
        <div class="bigq"><span>Q3</span><div><b>Is the stock price attractive compared with that value?</b><p>Stage 9: upside vs downside, what the price implies, thesis &amp; invalidation.</p></div></div>
        <div class="callout warn"><b>Great company ≠ great investment.</b> Q1 and Q3 are different questions.</div>
        <div class="btns"><a class="btn" href="#quickref">Quick Reference</a><a class="btn ghost" href="#cheatsheet">Formula Cheat Sheet</a><a class="btn ghost" href="#statements">Statement Map</a><a class="btn ghost" href="#principles">Principles</a></div>
      </div></div>`,
  });

  SAT.section({
    id: 'business', num: 2, title: 'Business Analysis',
    intro: 'Understand the business before the numbers. These concepts come mainly from the 10-K (Item 1 “Business”, Item 1A “Risk Factors”, segment notes) and earnings calls.',
    he: 'קודם להבין את העסק — ורק אחר כך את המספרים.',
  });
  SAT.concepts('business', [
    { id: 'business-model', title: 'Business Model', short: 'How the company creates, delivers and captures value.', stmt: 'qual', key: 1,
      what: 'A description of <b>what</b> the company sells, <b>to whom</b>, <b>how</b> it delivers it, and <b>how it gets paid</b>. If you can’t explain it in two sentences, you don’t understand it yet.',
      example: [['Sells', 'Cloud accounting software'], ['To', 'Small businesses'], ['Paid by', 'Monthly subscription'], ['Wins because', 'Hard to switch once books are in it']],
      interp: 'The business model determines margins, capital needs, cyclicality and how durable revenue is.',
      better: ['na'], compare: ['Competitors’ models', 'How the model has changed over time'],
      watch: 'Management’s description can be marketing. Check it against where the revenue and profit actually come from (segment data).',
      where: '10-K Item 1 “Business”; investor presentations.', related: ['revenue-model', 'segments', 'moat'] },
    { id: 'revenue-model', title: 'Revenue Model', short: 'How the company charges: one-off, recurring, usage, transaction, advertising…', stmt: 'qual',
      what: 'The mechanism by which the company earns revenue: <b>one-time sales</b>, <b>recurring subscriptions</b>, <b>usage-based</b> fees, <b>transaction</b> take-rates, <b>advertising</b>, <b>licensing</b>, <b>hardware + services</b>.',
      interp: 'Recurring and contractual revenue is more predictable and usually valued at higher multiples than one-off or project revenue.',
      better: ['context', 'More recurring revenue is generally higher quality.'], compare: ['Peers’ revenue models', 'Share of recurring vs one-off revenue over time'],
      watch: '“Recurring” is sometimes stretched to cover repeat-but-uncontracted purchases.',
      where: '10-K revenue-recognition note; “Disaggregation of revenue”.', related: ['business-model', 'revenue-mix'] },
    { id: 'segments', title: 'Business Segments', short: 'The separate units management reports results for.', stmt: 'qual',
      what: 'The distinct parts of the company that management reports separately (by product line or geography), each with its own revenue and usually operating profit.',
      example: [['Segment A', 'Revenue $6B · Op. margin 40%'], ['Segment B', 'Revenue $4B · Op. margin 5%']],
      interp: 'Segments often have very different growth, margins and risk. A great segment can be hidden inside a mediocre consolidated number — or vice versa.',
      better: ['na'], compare: ['Each segment’s growth and margin trend', 'Pure-play competitors for each segment'],
      watch: 'Corporate costs are often not allocated to segments, so segment profits add up to more than total operating income.',
      where: '10-K “Segment information” note.', related: ['revenue-mix', 'business-model'] },
    { id: 'revenue-mix', title: 'Revenue Mix', short: 'Breakdown of revenue by product, customer, geography or type.', stmt: 'qual',
      what: 'How total revenue splits across products, segments, geographies, customer types, or recurring vs one-off.',
      example: [['Subscriptions', '70%'], ['Services', '20%'], ['Hardware', '10%']],
      interp: 'A shift in mix toward higher-margin products raises overall margins even if nothing else changes (“mix shift”).',
      better: ['context', 'Mix toward faster-growing, higher-margin revenue is usually positive.'], compare: ['Prior years (is mix shifting?)', 'Peers'],
      watch: 'Margin improvement from mix shift is not the same as improvement in each business.',
      where: '10-K revenue disaggregation and segment notes.', related: ['segments', 'gross-margin'] },
    { id: 'growth-drivers', title: 'Growth Drivers', short: 'What can increase revenue: volume, price, new products, new markets, M&A.', stmt: 'qual', key: 1,
      what: 'The specific levers that can grow revenue: <b>market expansion</b>, <b>price increases</b>, <b>customer growth</b>, <b>more spend per customer</b>, <b>new products</b>, <b>geographic expansion</b>, <b>acquisitions</b>.',
      he: 'צמיחה = יותר לקוחות × יותר רכישות ללקוח × מחיר גבוה יותר.',
      formula: 'Revenue = Customers × Revenue per Customer\n(or Units × Price)',
      interp: 'Good analysis names the <b>one or two drivers that matter most</b> and checks the evidence for each.',
      better: ['na'], compare: ['Market growth (TAM growth)', 'Peers’ growth', 'Organic vs acquired growth'],
      watch: 'Growth bought via acquisitions or driven by price alone can fade; organic volume growth is usually higher quality.',
      where: '10-K MD&A; earnings calls.', related: ['tam', 'revenue', 'market-share'] },
    { id: 'competitive-advantage', title: 'Competitive Advantage', short: 'Why customers choose this company over alternatives.', stmt: 'qual',
      what: 'Anything that lets a company win customers or earn better economics than competitors: better product, lower cost, brand, distribution, technology.',
      interp: 'A competitive advantage becomes a <b>moat</b> only when it is <b>durable</b> — hard for competitors to copy for many years.',
      better: ['na'], compare: ['Competitors’ margins and ROIC', 'Customer retention and pricing power'],
      watch: 'A temporary lead (a hot product) is not the same as a durable structural advantage.',
      where: '10-K Item 1 “Competition”.', related: ['moat', 'competition'] },
    { id: 'moat', title: 'Economic Moat', short: 'A durable structural advantage that protects profits from competitors.', stmt: 'qual', key: 1,
      what: 'A <b>durable</b> structural advantage that protects a company’s profits and returns on capital from competition over many years — like a moat protecting a castle.',
      he: 'חפיר כלכלי = יתרון מבני ועמיד שמקשה על מתחרים לגזול את הרווחים.',
      interp: 'The financial evidence of a moat is <b>high ROIC sustained for many years</b>, stable or rising margins, and pricing power.',
      better: ['higher', 'Wider and more durable is better.'], compare: ['ROIC history vs WACC', 'Competitors’ ROIC and margins'],
      watch: '<b>“No competition” is NOT automatically a moat.</b> The important question is: <b>WHY is competition difficult?</b> If high profits exist and nothing stops others from copying, competitors will come.',
      body: `<table class="t"><thead><tr><th>Source of moat</th><th style="text-align:left">What it means</th><th style="text-align:left">Typical examples</th></tr></thead><tbody>
        <tr><td class="lbl"><b>Network Effects</b></td><td class="lbl wrap">Each new user makes the product more valuable for others.</td><td class="lbl wrap">Marketplaces, payment networks, social platforms</td></tr>
        <tr><td class="lbl"><b>Switching Costs</b></td><td class="lbl wrap">Leaving is painful, risky or expensive.</td><td class="lbl wrap">ERP software, core banking, embedded workflows</td></tr>
        <tr><td class="lbl"><b>Economies of Scale</b></td><td class="lbl wrap">Unit costs fall with size; small rivals can’t match prices profitably.</td><td class="lbl wrap">Warehouse retail, cloud infrastructure, chips</td></tr>
        <tr><td class="lbl"><b>Brand</b></td><td class="lbl wrap">Customers pay more or choose by default because of trust/status.</td><td class="lbl wrap">Luxury goods, beverages, consumer tech</td></tr>
        <tr><td class="lbl"><b>Intellectual Property</b></td><td class="lbl wrap">Patents, trade secrets, proprietary technology.</td><td class="lbl wrap">Pharma, semiconductor design</td></tr>
        <tr><td class="lbl"><b>Cost Advantage</b></td><td class="lbl wrap">Structurally lower costs from process, location or resources.</td><td class="lbl wrap">Low-cost producers, unique mines</td></tr>
        <tr><td class="lbl"><b>Distribution</b></td><td class="lbl wrap">Owns the channel or shelf; reaches customers cheaper.</td><td class="lbl wrap">Consumer staples, app stores</td></tr>
        <tr><td class="lbl"><b>Vertical Integration</b></td><td class="lbl wrap">Controls key parts of the value chain → cost, speed, quality.</td><td class="lbl wrap">EVs, aerospace, fashion</td></tr>
        <tr><td class="lbl"><b>Regulatory Barriers</b></td><td class="lbl wrap">Licenses or laws limit who can compete.</td><td class="lbl wrap">Utilities, exchanges, defence, rating agencies</td></tr>
        <tr><td class="lbl"><b>Data Advantage</b></td><td class="lbl wrap">Proprietary data improves the product and compounds with usage.</td><td class="lbl wrap">Search, credit scoring, mapping</td></tr>
      </tbody></table>`,
      q: { tells: 'Whether today’s high returns are likely to last.', hl: 'Wider/more durable is better.', compare: 'ROIC history vs WACC, competitor returns.', fool: 'A temporary product lead, a booming cycle, or a monopoly that regulators may break up.' },
      where: 'Inferred: 10-K + financial history (ROIC, margins).', related: ['roic', 'competition', 'market-share'] },
    { id: 'market-share', title: 'Market Share', short: 'Company revenue ÷ total market revenue.', stmt: 'calc',
      what: 'The company’s portion of total sales in its market.',
      formula: 'Market Share = Company Revenue / Total Market Revenue',
      example: [['Company revenue', '$2B'], ['Market size', '$20B'], ['Market share', '10%', 'res']],
      interp: 'Rising share = winning against competitors. Leading share can bring scale advantages.',
      better: ['context', 'Rising share is usually good; very high share may invite regulation.'], compare: ['Share trend over years', 'Main competitors’ shares'],
      watch: 'Depends heavily on how you define “the market”. Share can be bought with unprofitable price cuts.',
      where: 'Industry reports, company presentations.', related: ['tam', 'competition'] },
    { id: 'tam', title: 'TAM', abbr: 'Total Addressable Market', short: 'Total annual revenue opportunity if the company had 100% share.', stmt: 'qual',
      what: 'The total annual revenue available for a product if the company captured the entire market. Related: <b>SAM</b> (serviceable) and <b>SOM</b> (realistically obtainable).',
      example: [['Potential customers', '5M businesses'], ['Annual price', '$1,000'], ['TAM', '$5B', 'res']],
      interp: 'TAM sets the ceiling on long-term growth. A small company in a big, growing TAM has a long runway.',
      better: ['higher', 'A larger, growing TAM gives a longer runway.'], compare: ['Current revenue (penetration = revenue / TAM)', 'TAM growth rate'],
      watch: 'Company-presented TAMs are often hugely inflated. Build your own bottom-up estimate.',
      where: 'Investor presentations, industry research.', related: ['growth-drivers', 'market-share'] },
    { id: 'competition', title: 'Competition', short: 'Who else serves these customers, and how intensely they fight.', stmt: 'qual',
      what: 'The other companies (and substitutes) competing for the same customers, and how they compete: price, product, distribution, brand.',
      interp: 'Intense competition pushes margins and returns down toward the cost of capital unless a moat protects the company.',
      better: ['lower', 'Less intense competition supports margins.'], compare: ['Competitors’ growth, margins, ROIC', 'Pricing trends'],
      watch: 'New entrants and substitutes from other industries are often missed.',
      where: '10-K Item 1 “Competition”; competitors’ filings.', related: ['moat', 'market-share'] },
    { id: 'customer-concentration', title: 'Customer Concentration', short: 'How dependent revenue is on a few large customers.', stmt: 'qual',
      what: 'The share of revenue coming from the largest customers. Companies must disclose customers above 10% of revenue.',
      example: [['Top customer', '35% of revenue'], ['Top 5 customers', '70% of revenue']],
      interp: 'High concentration gives big customers bargaining power and creates a cliff risk if one leaves.',
      better: ['lower'], compare: ['Prior years', 'Peers'],
      watch: 'Concentration can rise quietly as a big customer grows faster than others.',
      where: '10-K segment / concentration note, Risk Factors.', related: ['risk-factors'] },
    { id: 'cyclicality', title: 'Cyclicality', short: 'How much results swing with the economic or industry cycle.', stmt: 'qual',
      what: 'The tendency of revenue and profits to rise and fall with the economy or an industry cycle (commodities, autos, semiconductors, housing, airlines).',
      interp: 'For cyclicals, today’s earnings may be at a peak or trough — so valuation on current earnings can mislead.',
      better: ['lower', 'Less cyclical = more predictable.'], compare: ['Results across a full cycle (10+ years)', 'Mid-cycle margins'],
      watch: 'Cyclicals often look <b>cheapest (low P/E) at the peak</b> and most expensive at the bottom.',
      where: 'Multi-year financial history.', related: ['pe', 'risk-factors'] },
    { id: 'catalysts', title: 'Catalysts', short: 'Events that could make the market recognise the value.', stmt: 'qual',
      what: 'Specific, ideally dated, events that could change how the market sees the company: earnings, product launches, margin inflection, spin-offs, buybacks, regulatory decisions, index inclusion.',
      interp: 'Without a catalyst, an undervalued stock can stay undervalued for a long time (“value trap”).',
      better: ['na'], compare: ['Timeline of expected events'],
      watch: 'Catalysts that everyone already knows about are usually priced in.',
      where: 'Earnings calls, company guidance, news.', related: ['thesis-def'] },
    { id: 'risk-factors', title: 'Risk Factors', short: 'What could go wrong — competition, disruption, regulation, debt, dilution…', stmt: 'qual', key: 1,
      what: 'The main things that could hurt the business or the stock: <b>competition, technology disruption, regulation, debt, customer concentration, margin compression, dilution, cyclicality, execution risk</b>.',
      interp: 'The 10-K Risk Factors list is long and legalistic; your job is to pick the 3–5 that actually matter and how likely/severe they are.',
      better: ['na'], compare: ['Last year’s risk factors (new additions are a signal)'],
      watch: 'The risk that sinks a company is often not on the list — think about what could disrupt the model.',
      where: '10-K Item 1A “Risk Factors”.', related: ['invalidation', 'customer-concentration', 'debt'] },
  ]);
})();
