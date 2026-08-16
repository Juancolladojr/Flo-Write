import { TemplateItem } from '../types';

export const TEMPLATES: TemplateItem[] = [
  {
    id: 'blank',
    title: 'Blank Page',
    description: 'Start fresh with a clean blank canvas',
    icon: 'FileText',
    category: 'General',
    content: '<h1>Untitled Document</h1><p>Start typing or press <mark class="highlight-yellow"><strong>/</strong></mark> for quick slash commands...</p>'
  },
  {
    id: 'project-spec',
    title: 'Project Specification',
    description: 'Structure product roadmaps, requirements & milestones',
    icon: 'Rocket',
    category: 'Work',
    content: `
      <h1>🚀 Project Specification: Aurora Next</h1>
      <p><em>Owner: Product Team &bull; Status: <mark class="highlight-green"><strong>In Review</strong></mark> &bull; Target Launch: Q4</em></p>
      
      <div class="callout callout-info">
        <p><strong>💡 Executive Summary:</strong> Aurora Next introduces a modern web architecture focused on lightning-fast speed, collaborative editing, and intuitive user workflows.</p>
      </div>

      <h2>1. Core Objectives</h2>
      <ul data-type="taskList">
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div>Define user personas and core interaction journey</div></li>
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div>Complete design system and typography tokens</div></li>
        <li data-checked="false" data-type="taskItem"><label><input type="checkbox"></label><div>Implement rich text block parser and real-time state engine</div></li>
        <li data-checked="false" data-type="taskItem"><label><input type="checkbox"></label><div>Conduct end-to-end performance benchmarking</div></li>
      </ul>

      <h2>2. Deliverables & Schedule</h2>
      <table style="width: 100%;">
        <thead>
          <tr>
            <th><strong>Milestone</strong></th>
            <th><strong>Target Date</strong></th>
            <th><strong>Owner</strong></th>
            <th><strong>Status</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Architecture Design</td>
            <td>Oct 15</td>
            <td>Engineering</td>
            <td>✅ Completed</td>
          </tr>
          <tr>
            <td>Alpha Testing</td>
            <td>Nov 02</td>
            <td>QA & Product</td>
            <td>🔄 In Progress</td>
          </tr>
          <tr>
            <td>Public Beta Release</td>
            <td>Dec 01</td>
            <td>Full Team</td>
            <td>📅 Scheduled</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Technical Architecture</h2>
      <p>The client uses an extensible schema with modular document nodes:</p>
      <pre><code>// Document schema initialization
const editorConfig = {
  theme: "nord",
  autofocus: "end",
  history: { depth: 100 },
};</code></pre>

      <div class="callout callout-warning">
        <p><strong>⚠️ Risk Note:</strong> Ensure offline local persistence fallback handles edge-case storage quota limits gracefully.</p>
      </div>
    `
  },
  {
    id: 'meeting-notes',
    title: 'Meeting Minutes',
    description: 'Track attendees, discussion points, and action items',
    icon: 'Users',
    category: 'Work',
    content: `
      <h1>👥 Weekly Team Sync</h1>
      <p><strong>Date:</strong> August 15, 2026 &bull; <strong>Facilitator:</strong> Sarah Jenkins &bull; <strong>Duration:</strong> 45 mins</p>

      <h2>📋 Attendees</h2>
      <ul>
        <li><strong>Sarah Jenkins</strong> (Lead Design)</li>
        <li><strong>Alex Rivera</strong> (Principal Engineer)</li>
        <li><strong>Taylor Chen</strong> (Product Manager)</li>
        <li><strong>Morgan Lee</strong> (Operations)</li>
      </ul>

      <h2>💡 Key Discussion Points</h2>
      <ol>
        <li><strong>Sprint Velocity:</strong> Team surpassed targeted milestone delivery by 18% over the past 2 weeks.</li>
        <li><strong>Design Consistency:</strong> New typography hierarchy and color contrast guidelines are now standardized.</li>
        <li><strong>Customer Feedback:</strong> Users requested markdown shortcuts and one-click PDF exports.</li>
      </ol>

      <div class="callout callout-success">
        <p><strong>🎉 Milestone Reached:</strong> Successfully migrated all document stores with zero data loss or downtime.</p>
      </div>

      <h2>✅ Action Items</h2>
      <ul data-type="taskList">
        <li data-checked="false" data-type="taskItem"><label><input type="checkbox"></label><div><strong>Alex:</strong> Finalize table resizing and header row styling rules.</div></li>
        <li data-checked="false" data-type="taskItem"><label><input type="checkbox"></label><div><strong>Sarah:</strong> Review mobile toolbar layouts and touch target sizes.</div></li>
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div><strong>Taylor:</strong> Publish release notes to community forum.</div></li>
      </ul>
    `
  },
  {
    id: 'blog-post',
    title: 'Article / Blog Post',
    description: 'Engaging layout with pull quotes, headings, and takeaways',
    icon: 'Feather',
    category: 'Writing',
    content: `
      <h1>The Art of Focused Writing in the Modern Web Era</h1>
      <p><em>By Editorial Staff &bull; 5 min read &bull; Published Today</em></p>
      
      <p>In a world characterized by relentless notifications and endless distractions, the craft of deep, uninterrupted writing has become both a superpower and a sanctuary.</p>

      <blockquote>
        <p>"Simplicity is not the lack of clutter, that's a consequence of simplicity. Simplicity somehow essentially describes the purpose and place of an object."</p>
      </blockquote>

      <h2>Why Clean Typography Transforms Your Thinking</h2>
      <p>When typography breathes with balanced negative space, appropriate line-heights, and optical step ratios, the cognitive friction between human thought and the digital medium completely disappears.</p>

      <p>Key pillars of modern digital typography include:</p>
      <ul>
        <li><strong>Optical Hierarchy:</strong> Clear visual contrast between headings, sub-headings, and body prose.</li>
        <li><strong>Comfortable Measure:</strong> Line lengths kept between 65–75 characters for effortless scanning.</li>
        <li><strong>Harmonious Contrast:</strong> Subtle off-blacks and off-whites that prevent eye fatigue over long editing sessions.</li>
      </ul>

      <div class="callout callout-tip">
        <p><strong>✨ Pro Tip:</strong> Switch into <em>Zen Mode</em> (Full Screen) using the top navigation bar whenever you need a distraction-free writing environment.</p>
      </div>
    `
  },
  {
    id: 'formal-letter',
    title: 'Formal Letter / Proposal',
    description: 'Polished correspondence with professional margins',
    icon: 'Mail',
    category: 'General',
    content: `
      <p style="text-align: right;"><strong>August 15, 2026</strong></p>
      
      <p><strong>To:</strong> Selection Committee<br>Global Technology Innovation Fund<br>San Francisco, CA</p>
      
      <p><strong>Subject:</strong> Formal Grant Proposal &mdash; Open Web Document Architecture</p>
      
      <p>Dear Members of the Committee,</p>
      
      <p>I am pleased to submit our formal application for the 2026 Open Web Architecture Initiative. Over the past twelve months, our team has dedicated itself to architecting lightweight, resilient, client-first document tools that empower creators and teams across the world.</p>
      
      <p>Our solution focuses on three critical pillars:</p>
      <ol>
        <li><strong>Zero Data Lock-in:</strong> Instant exports to standard formats including Markdown, Clean HTML, and PDF.</li>
        <li><strong>Accessible Design:</strong> WCAG AA compliant typography, full keyboard navigation, and customizable themes.</li>
        <li><strong>Fast Local Persistence:</strong> Seamless offline auto-saving with instant recovery.</li>
      </ol>
      
      <p>We appreciate your time and review of our proposal, and we look forward to the opportunity to discuss this initiative further.</p>
      
      <p>Sincerely,</p>
      <p><strong>Alex Sterling</strong><br><em>Principal Director, Web Engineering Labs</em></p>
    `
  },
  {
    id: 'resume',
    title: 'Professional Resume / CV',
    description: 'Clean resume format with experience, skills & education',
    icon: 'Briefcase',
    category: 'Academic',
    content: `
      <h1 style="text-align: center; margin-bottom: 4px;">ALEXANDER STERLING</h1>
      <p style="text-align: center; color: #64748b;">San Francisco, CA &bull; alex.sterling@example.com &bull; github.com/alexsterling &bull; (555) 234-5678</p>
      
      <hr>

      <h2>Professional Summary</h2>
      <p>Accomplished Full-Stack Engineer and Product Architect with 8+ years of experience designing high-performance web applications, interactive document engines, and scalable cloud architectures.</p>

      <h2>Work Experience</h2>
      <p><strong>Senior Software Engineer</strong> &mdash; <em>Nexus Web Systems (2022 &ndash; Present)</em></p>
      <ul>
        <li>Architected real-time rich text editor utilized by over 450,000 monthly active users.</li>
        <li>Reduced client-side bundle size by 42% while improving page load speed to sub-100ms.</li>
        <li>Mentored team of 8 engineers in TypeScript best practices and web accessibility standards.</li>
      </ul>

      <p><strong>Frontend Developer</strong> &mdash; <em>Horizon Digital (2019 &ndash; 2022)</em></p>
      <ul>
        <li>Engineered reusable component design system adopted across 14 internal product suites.</li>
        <li>Led migration to modern reactive state pipelines resulting in 60% fewer client regressions.</li>
      </ul>

      <h2>Technical Skills</h2>
      <table style="width: 100%;">
        <tbody>
          <tr>
            <td><strong>Languages:</strong></td>
            <td>TypeScript, JavaScript (ESNext), HTML5, CSS3/Tailwind, Python, SQL</td>
          </tr>
          <tr>
            <td><strong>Frameworks & Tools:</strong></td>
            <td>React, Vite, Node.js, TipTap, ProseMirror, Git, Docker, Jest</td>
          </tr>
          <tr>
            <td><strong>Core Competencies:</strong></td>
            <td>Web Performance, Accessibility (a11y), UI/UX Architecture, RESTful APIs</td>
          </tr>
        </tbody>
      </table>

      <h2>Education</h2>
      <p><strong>B.S. in Computer Science</strong> &mdash; <em>University of California, Berkeley (2015 &ndash; 2019)</em></p>
    `
  },
  {
    id: 'screenplay-standard',
    title: 'Screenplay / Feature Script',
    description: 'Industry standard Hollywood screenplay format with scene sluglines, character cues & dialogue',
    icon: 'Film',
    category: 'Screenwriting',
    format: 'screenwriting',
    content: `
      <div class="screenplay-container font-mono-code">
        <h1 style="text-align: center; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.1em;">MIDNIGHT EXPRESS</h1>
        <p style="text-align: center; margin-bottom: 2rem;">Written by<br>Alex Sterling<br><em>Based on True Events</em></p>
        
        <hr>

        <p class="screenplay-slugline"><strong>FADE IN:</strong></p>

        <p class="screenplay-slugline"><strong>EXT. CHICAGO RAIL YARD - NIGHT</strong></p>

        <p class="screenplay-action">A heavy downpour hammers against rusted freight cars. Steam hisses from locomotive undercarriages, slicing through the amber glare of overhead floodlights.</p>

        <p class="screenplay-action">ELENA (30s), wearing a drenched trench coat and clutching a scuffed leather briefcase, dashes across the damp gravel between tracks 4 and 5.</p>

        <p class="screenplay-character"><strong>ELENA</strong></p>
        <p class="screenplay-parenthetical"><em>(checking watch, breathless)</em></p>
        <p class="screenplay-dialogue">He should have been at the signal box ten minutes ago.</p>

        <p class="screenplay-action">A silhouette steps out from behind a coal tender. It's MARCUS (40s), unbothered by the rain, hands buried in wool pockets.</p>

        <p class="screenplay-character"><strong>MARCUS</strong></p>
        <p class="screenplay-dialogue">Trains don't wait for good weather, Elena. Neither do the people looking for you.</p>

        <p class="screenplay-character"><strong>ELENA</strong></p>
        <p class="screenplay-parenthetical"><em>(stepping closer, voice trembling)</em></p>
        <p class="screenplay-dialogue">Do you have the manifests?</p>

        <p class="screenplay-character"><strong>MARCUS</strong></p>
        <p class="screenplay-dialogue">Better. I have the destination codes for the entire midnight convoy.</p>

        <p class="screenplay-action">A sudden locomotive horn blasts through the fog. Marcus hands her an encrypted silver keycard.</p>

        <p class="screenplay-transition"><strong>CUT TO:</strong></p>

        <p class="screenplay-slugline"><strong>INT. DISPATCH TOWER - CONTINUOUS</strong></p>

        <p class="screenplay-action">RADAR BLIPS pulse across green CRT monitors. The DISPATCHER freezes as a red override warning flashes across the main grid.</p>
      </div>
    `
  },
  {
    id: 'stage-play-standard',
    title: 'Stage Play / Theatrical Script',
    description: 'Classic stage play format with Act & Scene divisions, Dramatis Personae, stage directions & speeches',
    icon: 'Drama',
    category: 'Plays',
    format: 'play',
    content: `
      <div class="stageplay-container font-serif-merriweather">
        <h1 style="text-align: center; letter-spacing: 0.05em; margin-bottom: 4px;">THE GLASS CONSERVATORY</h1>
        <p style="text-align: center; font-style: italic; margin-bottom: 24px;">A Drama in Two Acts</p>

        <hr>

        <h2 style="text-align: center; text-transform: uppercase; font-size: 1.15rem; letter-spacing: 0.15em;">Dramatis Personae</h2>
        <table style="width: 100%; border: none;">
          <tbody>
            <tr>
              <td style="border: none; width: 30%;"><strong>ELEANOR VANE</strong></td>
              <td style="border: none;"><em>A matriarch of declining fortune, fifty-eight.</em></td>
            </tr>
            <tr>
              <td style="border: none;"><strong>JULIAN VANE</strong></td>
              <td style="border: none;"><em>Her youngest son, an aspiring botanist, twenty-four.</em></td>
            </tr>
            <tr>
              <td style="border: none;"><strong>CLARA MERCER</strong></td>
              <td style="border: none;"><em>A distant cousin and curator of rare flora, twenty-six.</em></td>
            </tr>
          </tbody>
        </table>

        <div class="callout callout-info" style="margin-top: 1.5rem;">
          <p><strong>SETTING:</strong> The winter greenhouse of an English estate on the Sussex coast. Autumn, 1912.</p>
        </div>

        <h2 style="text-align: center; margin-top: 2rem; letter-spacing: 0.1em;">ACT I</h2>
        <h3 style="text-align: center; text-transform: uppercase; font-size: 0.95rem; color: #8c8881; letter-spacing: 0.15em;">SCENE 1</h3>

        <p class="play-stage-direction"><em>[AT RISE: Late afternoon sunlight filters through frosted glass panes. JULIAN is seated on a wrought-iron bench, trimming an exotic orchid with miniature silver shears. ELEANOR enters from upstage left, carrying a sealed telegram.]</em></p>

        <p class="play-dialogue"><strong>ELEANOR.</strong> <em>[Stopping midway down the gravel path, looking at him with restrained anxiety.]</em> You haven't looked at the afternoon post, have you Julian?</p>

        <p class="play-dialogue"><strong>JULIAN.</strong> <em>[Without looking up from the flower.]</em> If it contains more condolences regarding Father's estate, I would rather devote my hours to living things that do not demand an accounting.</p>

        <p class="play-dialogue"><strong>ELEANOR.</strong> Living things do not pay the winter coal merchant, darling. <em>[She sets the telegram on the potting table between them.]</em> The solicitors have concluded their review.</p>

        <p class="play-stage-direction"><em>[Julian's shears hesitate mid-air. He slowly raises his eyes to meet his mother's steady gaze. From outside, the distant whistle of the coastal train echoes across the moors.]</em></p>

        <p class="play-dialogue"><strong>JULIAN.</strong> And the conservatory?</p>

        <p class="play-dialogue"><strong>ELEANOR.</strong> <em>[Softly.]</em> It depends entirely on what you choose to tell Clara this evening.</p>

        <p class="play-stage-direction"><em>[Enter CLARA from stage right, carrying a basket of dried lavender.]</em></p>

        <p class="play-dialogue"><strong>CLARA.</strong> Did someone mention my name? Or was it merely the wind rattling the eastern transoms?</p>

        <p class="play-stage-direction"><em>[BLACKOUT.]</em></p>
      </div>
    `
  },
  {
    id: 'songwriting-standard',
    title: 'Songwriting / Lyrics & Chords',
    description: 'Musician format with key, tempo/BPM, capo markers, section chips & chord notations above lyrics',
    icon: 'Music',
    category: 'Songwriting',
    format: 'songwriting',
    content: `
      <div class="songwriting-container">
        <h1 style="text-align: center; margin-bottom: 2px;">RIVERSTONE ROAD</h1>
        <p style="text-align: center; color: #8c8881; font-style: italic; margin-bottom: 1.5rem;">Words & Music by Alex Sterling &bull; Style: Indie Acoustic Folk</p>

        <table style="width: 100%; margin-bottom: 2rem;">
          <thead>
            <tr>
              <th><strong>Key</strong></th>
              <th><strong>Tempo / BPM</strong></th>
              <th><strong>Time Signature</strong></th>
              <th><strong>Capo</strong></th>
              <th><strong>Tuning</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>G Major (Em)</td>
              <td>120 BPM (Allegro)</td>
              <td>4/4 Time</td>
              <td>2nd Fret</td>
              <td>Standard (E A D G B E)</td>
            </tr>
          </tbody>
        </table>

        <div class="song-section-header">
          <span class="song-badge">VERSE 1</span>
        </div>
        <p class="song-chord-line"><code>[G]                [D/F#]             [Em7]</code></p>
        <p class="song-lyric-line">Morning frost is clinging to the fence line,</p>
        <p class="song-chord-line"><code>[Cadd9]            [G]                [D]</code></p>
        <p class="song-lyric-line">Watching sunrise spill across the cedar trees.</p>
        <p class="song-chord-line"><code>[G]                [D/F#]             [Em7]</code></p>
        <p class="song-lyric-line">Packed my boots and thirty miles of memories,</p>
        <p class="song-chord-line"><code>[Cadd9]            [D]                [G]</code></p>
        <p class="song-lyric-line">Left the front door key beneath the autumn leaves.</p>

        <div class="song-section-header" style="margin-top: 1.5rem;">
          <span class="song-badge song-badge-pre">PRE-CHORUS</span>
        </div>
        <p class="song-chord-line"><code>[Am7]                                 [C]</code></p>
        <p class="song-lyric-line">Every highway sings a song of somewhere new,</p>
        <p class="song-chord-line"><code>[Am7]                                 [D7sus4]     [D7]</code></p>
        <p class="song-lyric-line">Every crossroads asks me if the promise was true...</p>

        <div class="song-section-header" style="margin-top: 1.5rem;">
          <span class="song-badge song-badge-chorus">CHORUS</span>
        </div>
        <p class="song-chord-line"><code>[G]                [D]                [Em7]        [Cadd9]</code></p>
        <p class="song-lyric-line">So roll on, Riverstone Road, take me where the river bends,</p>
        <p class="song-chord-line"><code>[G]                [D]                [Cadd9]</code></p>
        <p class="song-lyric-line">Past the mountain shadows where the timber ends.</p>
        <p class="song-chord-line"><code>[G]                [D]                [Em7]        [Cadd9]</code></p>
        <p class="song-lyric-line">If tomorrow brings the rain, let it wash away the strain,</p>
        <p class="song-chord-line"><code>[Am7]              [D]                [G]</code></p>
        <p class="song-lyric-line">'Til the dust gives way to golden light again.</p>

        <div class="song-section-header" style="margin-top: 1.5rem;">
          <span class="song-badge song-badge-bridge">BRIDGE</span>
        </div>
        <p class="song-chord-line"><code>[Em]               [C]                [G]          [D/F#]</code></p>
        <p class="song-lyric-line">We spend our whole lives running toward what we think we lack,</p>
        <p class="song-chord-line"><code>[Em]               [C]                [D]</code></p>
        <p class="song-lyric-line">Only to discover peace in the tracks turning back.</p>

        <div class="song-section-header" style="margin-top: 1.5rem;">
          <span class="song-badge">OUTRO</span>
        </div>
        <p class="song-chord-line"><code>[G]       [D/F#]    [Em7]     [Cadd9]</code></p>
        <p class="song-lyric-line">Riverstone Road... carry me home...</p>
        <p class="song-chord-line"><code>[G]       [D]       [G]</code></p>
        <p class="song-lyric-line"><em>(Fade out with fingerpicked acoustic arpeggio)</em></p>
      </div>
    `
  },
  {
    id: 'poetry-standard',
    title: 'Poetry / Verses & Stanzas',
    description: 'Poetic formatting with stanza spacing, hanging indents, meter annotations, sonnets & free verse',
    icon: 'Feather',
    category: 'Poetry',
    format: 'poetry',
    content: `
      <div class="poetry-manuscript-container font-serif-playfair" style="max-width: 620px; margin: 0 auto;">
        <h1 style="text-align: center; font-size: 2.1rem; letter-spacing: 0.02em; margin-bottom: 6px;">ECHOES OF THE TIDE</h1>
        <p style="text-align: center; font-style: italic; color: #8c8881; margin-bottom: 2rem;">A Suite in Three Movements &bull; By Alex Sterling</p>

        <div class="callout callout-tip" style="text-align: center; border-left: none; border-top: 1px solid #e5e0d8; border-bottom: 1px solid #e5e0d8; background: transparent;">
          <p><em>"The sea has neither tongue nor speech, yet tells the stone its ancient tale."</em><br>&mdash; Epigraph</p>
        </div>

        <h2 style="text-align: center; font-size: 1.25rem; letter-spacing: 0.1em; margin-top: 2.5rem; text-transform: uppercase;">I. Sonnet of the Salt Mist</h2>
        <p style="text-align: center; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; color: #8c8881; margin-bottom: 1.5rem;">[ Form: Petrarchan Sonnet &bull; Meter: Iambic Pentameter ]</p>

        <div class="poetry-stanza" style="line-height: 2; margin-bottom: 1.5rem;">
          <p>The restless ocean climbs the jagged shore, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(A)</span><br>
          And spills white foam upon the granite grey; <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(B)</span><br>
          The gulls take flight into the fading day, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(B)</span><br>
          While sailors count the leagues of miles before. <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(A)</span></p>
        </div>

        <div class="poetry-stanza" style="line-height: 2; margin-bottom: 1.5rem;">
          <p>Beneath the surface where no light can pour, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(A)</span><br>
          The silent currents weave their timeless sway; <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(B)</span><br>
          They wash the sorrows of the world away, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(B)</span><br>
          And leave quiet footprints on the sandy floor. <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(A)</span></p>
        </div>

        <div class="poetry-stanza" style="line-height: 2; margin-bottom: 2.5rem;">
          <p>So let the wind unveil the ancient song, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(C)</span><br>
          That rings in seashells hidden by the reef; <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(D)</span><br>
          Where time is vast and human grief is brief, <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(D)</span><br>
          And wandering souls find where their thoughts belong. <span style="float: right; font-size: 0.75rem; color: #8c8881; font-family: monospace;">(C)</span></p>
        </div>

        <hr style="width: 40%; margin: 2rem auto;">

        <h2 style="text-align: center; font-size: 1.25rem; letter-spacing: 0.1em; margin-top: 2rem; text-transform: uppercase;">II. Driftwood & Starlight</h2>
        <p style="text-align: center; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; color: #8c8881; margin-bottom: 1.5rem;">[ Form: Free Verse with Variable Indentations ]</p>

        <div class="poetry-stanza" style="line-height: 2.2; margin-bottom: 1.5rem;">
          <p>Night arrives without permission,<br>
          <span style="padding-left: 2rem;">a velvet mantle thrown across the horizon.</span><br>
          The moon burns cold,<br>
          <span style="padding-left: 4rem;">a single silver coin dropped into dark water.</span></p>
        </div>

        <div class="poetry-stanza" style="line-height: 2.2;">
          <p>We write our names in wet sand,<br>
          <span style="padding-left: 2.5rem;">knowing the incoming tide</span><br>
          <span style="padding-left: 5rem;">is already on its way.</span></p>
        </div>
      </div>
    `
  }
];

