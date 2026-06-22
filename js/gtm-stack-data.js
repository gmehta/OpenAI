/* OpenAI GTM Stack v4 — graph data from openai-gtm-stack-v4.drawio */
(function (root) {
  var S = 0.76;

  function center(x, y, w, h) {
    return { x: (x + w / 2) * S, y: (y + h / 2) * S };
  }

  function g(x, y, w, h) {
    return [x, y, w, h];
  }

  var swimlanes = [
    { id: 'p0', label: 'GTM CHANNELS · ROUTES TO MARKET', x: 40, y: 110, w: 1500, h: 150, tone: 'channel' },
    { id: 'p1', label: 'DEMAND · DATA · MARKETING', x: 40, y: 280, w: 1500, h: 120, tone: 'neutral' },
    { id: 'p2', label: 'INBOUND AI · ENRICHMENT · ROUTING', x: 40, y: 420, w: 1500, h: 120, tone: 'neutral' },
    { id: 'p3', label: 'CRM — SYSTEM OF RECORD', x: 40, y: 560, w: 1500, h: 110, tone: 'crm' },
    { id: 'p4', label: 'AI-NATIVE INTERNAL GTM LAYER  (what this role owns / builds · reported / directional)', x: 40, y: 690, w: 1500, h: 210, tone: 'ai' },
    { id: 'p5', label: 'ENGAGEMENT · CONVERSATION INTELLIGENCE', x: 40, y: 920, w: 1500, h: 120, tone: 'neutral' },
    { id: 'p6', label: 'QUOTE-TO-CASH · CONTRACTS · ANALYTICS', x: 40, y: 1060, w: 1500, h: 130, tone: 'neutral' }
  ];

  var nodes = [
    /* GTM channels */
    { id: 'ch_plg', category: 'confirmed', geom: g(70, 150, 190, 85),
      label: 'Self-serve / PLG', sub: 'ChatGPT · API self-serve signups' },
    { id: 'ch_direct', category: 'confirmed', geom: g(278, 150, 190, 85),
      label: 'Direct enterprise sales', sub: 'AEs · Connect with Sales handoff' },
    { id: 'ch_partner', category: 'confirmed', geom: g(486, 150, 190, 85),
      label: 'Partner Network (NEW)', sub: 'SIs · consultancies · resellers · co-sell' },
    { id: 'ch_cloud', category: 'likely', geom: g(694, 150, 190, 85),
      label: 'Cloud marketplaces', sub: 'Azure · Oracle · Snowflake co-sell' },
    { id: 'ch_prod', category: 'likely', geom: g(902, 150, 190, 85),
      label: 'Product partnerships', sub: 'Salesforce · Stripe · ZoomInfo (embed)' },
    { id: 'ch_apps', category: 'confirmed', geom: g(1110, 150, 190, 85),
      label: 'App ecosystem', sub: 'ChatGPT Apps (Apps SDK) · GPT Store · Codex plugins' },
    { id: 'ch_oem', category: 'likely', geom: g(1318, 150, 190, 85),
      label: 'Embedded / OEM', sub: 'Apple Intelligence · in-app models' },

    /* Demand / marketing */
    { id: 'inbound_demand', category: 'confirmed', geom: g(90, 315, 260, 70),
      label: 'Inbound Demand', sub: 'Web forms · ChatGPT Enterprise/Business signups' },
    { id: 'mktg', category: 'likely', geom: g(450, 315, 260, 70),
      label: 'Marketing Automation', sub: 'HubSpot (reported)' },
    { id: 'zoominfo', category: 'likely', geom: g(810, 315, 260, 70),
      label: 'ZoomInfo', sub: 'B2B data / GTM context graph' },
    { id: 'codex', category: 'surface', geom: g(1170, 315, 260, 70),
      label: 'Codex for Work', sub: 'Surface · sales plugin · ZoomInfo + Clay apps (reported)' },

    /* Inbound AI */
    { id: 'inbound_ai', category: 'ai-native', geom: g(90, 455, 260, 70),
      label: 'Inbound Sales Assistant', sub: 'internal assistant (codename "TailorAssist", reported) · auto-responds, qualifies, hands off' },
    { id: 'clay', category: 'confirmed', geom: g(450, 455, 260, 70),
      label: 'Clay', sub: 'Enrichment · account research (public OpenAI case study)' },
    { id: 'leandata', category: 'confirmed', geom: g(810, 455, 260, 70),
      label: 'LeanData', sub: 'Lead-to-account routing (native to Salesforce)' },

    /* CRM */
    { id: 'salesforce', category: 'hub', geom: g(540, 580, 500, 70),
      label: 'Salesforce', sub: 'Core CRM · System of Record · (Agentforce 360 ↔ ChatGPT)' },
    { id: 'ch_gap', category: 'unconfirmed', geom: g(1080, 585, 400, 70),
      label: 'Partner & marketplace routing', sub: 'deal registration · co-sell · channel attribution — GAP (no confirmed system)' },

    /* AI-native layer */
    { id: 'kb', category: 'ai-native', geom: g(100, 720, 240, 80), shape: 'barrel',
      label: 'Knowledge Base / Connectors', sub: 'Docs · policies · playbooks · customer stories' },
    { id: 'gtm_assistant', category: 'ai-native', geom: g(450, 720, 260, 70),
      label: 'GTM Assistant', sub: 'Briefs · recaps · product Q&A · CRM writeback (reported)' },
    { id: 'docugpt', category: 'ai-native', geom: g(810, 720, 260, 70),
      label: 'DocuGPT', sub: 'Contracts → searchable structured data (reported)' },
    { id: 'slack', category: 'surface', geom: g(1170, 720, 260, 70),
      label: 'Slack', sub: 'Primary delivery surface' },
    { id: 'openai_core', category: 'platform', geom: g(100, 820, 970, 55),
      label: 'OpenAI Models / API · AgentKit (Agent Builder · Connectors · ChatKit) · Responses API · Agents SDK · Evals · MCP · internal Automation Platform', sub: '' },
    { id: 'symphony', category: 'ai-native', geom: g(1090, 818, 390, 62),
      label: 'Orchestration layer', sub: 'agent control-plane: task board → agents · human review (reported / interview-sourced; not a verified public artifact)' },

    /* Engagement */
    { id: 'gong', category: 'likely', geom: g(90, 955, 260, 70),
      label: 'Gong', sub: 'Conversation intelligence · call notes (inferred)' },
    { id: 'outreach', category: 'likely', geom: g(450, 955, 280, 70),
      label: 'Outreach', sub: 'Sales engagement · MCP Server ↔ ChatGPT (Feb 2026); internal use unconfirmed' },

    /* Quote-to-cash — drawio positions (no overlap) */
    { id: 'nue', category: 'likely', geom: g(70, 1095, 250, 75),
      label: 'Nue', sub: 'CPQ / lead-to-quote · Salesforce-native (reported)' },
    { id: 'stripe', category: 'likely', geom: g(360, 1095, 250, 75),
      label: 'Stripe', sub: 'Payments rails · Agentic Commerce Protocol' },
    { id: 'snowflake', category: 'likely', geom: g(650, 1095, 250, 75),
      label: 'Snowflake', sub: 'Data Cloud / warehouse ($200M partnership)' },
    { id: 'attribution', category: 'unconfirmed', geom: g(940, 1095, 250, 75),
      label: 'Attribution', sub: 'JD category (vendor unconfirmed)' },
    { id: 'ironclad', category: 'likely', geom: g(1230, 1095, 250, 75),
      label: 'Ironclad', sub: 'Contract Lifecycle Mgmt (CLM) · eSign · Salesforce-integrated (reported)' }
  ];

  var edges = [
    /* Channel routes */
    { id: 'e_plg', source: 'ch_plg', target: 'inbound_demand', label: 'self-serve signup → conversion', type: 'confirmed',
      labelMy: -14, labelMx: -42, turn: 28 },
    { id: 'e_dir', source: 'ch_direct', target: 'salesforce', label: 'AE-owned', type: 'confirmed',
      labelMy: -12, labelMx: -55, turn: 48 },
    { id: 'e_par', source: 'ch_partner', target: 'ch_gap', label: 'deal registration', type: 'likely',
      labelMy: -14, labelMx: -20, turn: 24 },
    { id: 'e_cloud', source: 'ch_cloud', target: 'ch_gap', label: 'marketplace co-sell', type: 'likely',
      labelMy: -14, labelMx: 8, turn: 22 },
    { id: 'e_prod', source: 'ch_prod', target: 'salesforce', label: 'co-sell + embed', type: 'likely',
      labelMy: -16, labelMx: -35, turn: 44 },
    { id: 'e_apps', source: 'ch_apps', target: 'stripe', label: 'Instant Checkout', type: 'confirmed',
      labelMy: -14, labelMx: 30, turn: 38 },
    { id: 'e_oem', source: 'ch_oem', target: 'ch_gap', label: 'usage attribution', type: 'likely',
      labelMy: -14, labelMx: 35, turn: 26 },
    { id: 'e_gap1', source: 'ch_gap', target: 'salesforce', label: 'route (no system)', type: 'unconfirmed',
      labelMy: -14, labelMx: -45, turn: 20 },
    { id: 'e_gap2', source: 'ch_gap', target: 'attribution', label: 'credit-split (no system)', type: 'unconfirmed',
      labelMy: 14, labelMx: 40, turn: 36 },

    /* Core stack */
    { id: 'e1', source: 'inbound_demand', target: 'inbound_ai', label: 'inbound leads', type: 'confirmed',
      labelMy: -14, labelMx: -48, turn: 30 },
    { id: 'e2', source: 'inbound_ai', target: 'salesforce', label: 'qualified handoff + writeback', type: 'confirmed-dashed',
      labelMy: -16, labelMx: -62, turn: 44 },
    { id: 'e3', source: 'clay', target: 'salesforce', label: 'enrichment', type: 'confirmed',
      labelMy: -16, labelMx: -8, turn: 34 },
    { id: 'e4', source: 'leandata', target: 'salesforce', label: 'lead-to-account routing', type: 'confirmed',
      labelMy: -16, labelMx: 52, turn: 28 },
    { id: 'e5', source: 'salesforce', target: 'gtm_assistant', label: 'account history + SFDC activity', type: 'confirmed',
      labelMy: 14, labelMx: -58, turn: 38 },
    { id: 'e6', source: 'kb', target: 'gtm_assistant', label: 'product Q&A grounding', type: 'confirmed',
      labelMy: -14, labelMx: 8, turn: 26 },
    { id: 'e7', source: 'kb', target: 'inbound_ai', label: 'connector grounding', type: 'confirmed',
      labelMy: -12, labelMx: -42, turn: 36 },
    { id: 'e8', source: 'gtm_assistant', target: 'slack', label: 'delivers in', type: 'confirmed',
      labelMy: -16, labelMx: 10, turn: 24 },
    { id: 'e9', source: 'openai_core', target: 'gtm_assistant', label: 'powers', type: 'confirmed',
      labelMy: -10, labelMx: -28, turn: 22 },
    { id: 'e10', source: 'openai_core', target: 'inbound_ai', label: 'powers', type: 'confirmed',
      labelMy: -10, labelMx: -68, turn: 30 },
    { id: 'e11', source: 'openai_core', target: 'docugpt', label: 'powers', type: 'confirmed',
      labelMy: -10, labelMx: 36, turn: 22 },
    { id: 'e12', source: 'zoominfo', target: 'codex', label: 'native B2B data app (reported)', type: 'likely',
      labelMy: -16, labelMx: 0, turn: 20 },
    { id: 'e13', source: 'gtm_assistant', target: 'salesforce', label: 'CRM updates (piloting)', type: 'confirmed-dashed',
      labelMy: -14, labelMx: 64, turn: 42 },
    { id: 'e_sfnue', source: 'salesforce', target: 'nue', label: 'lead-to-quote (CPQ)', type: 'likely',
      labelMy: 16, labelMx: -52, turn: 36 },
    { id: 'e_nuestripe', source: 'nue', target: 'stripe', label: 'billing → payments', type: 'likely',
      labelMy: -16, labelMx: 0, turn: 18 },
    { id: 'e14', source: 'mktg', target: 'salesforce', label: 'marketing / sales sync', type: 'likely',
      labelMy: -18, labelMx: -78, turn: 52 },
    { id: 'e15', source: 'zoominfo', target: 'clay', label: 'data source', type: 'likely',
      labelMy: 16, labelMx: 0, turn: 20 },
    { id: 'e16', source: 'gong', target: 'gtm_assistant', label: 'call notes', type: 'likely',
      labelMy: -14, labelMx: -44, turn: 34 },
    { id: 'e17', source: 'gong', target: 'snowflake', label: 'call data', type: 'likely',
      labelMy: -14, labelMx: -36, turn: 40 },
    { id: 'e18', source: 'salesforce', target: 'snowflake', label: 'data movement', type: 'likely',
      labelMy: 16, labelMx: 48, turn: 38 },
    { id: 'e19', source: 'mktg', target: 'snowflake', label: 'marketing data', type: 'likely',
      labelMy: -12, labelMx: -32, turn: 48 },
    { id: 'e20', source: 'stripe', target: 'snowflake', label: 'billing data', type: 'likely',
      labelMy: -16, labelMx: 8, turn: 22 },
    { id: 'e21', source: 'docugpt', target: 'snowflake', label: 'structured contract data', type: 'likely',
      labelMy: -12, labelMx: 42, turn: 44 },
    { id: 'e_ironsf', source: 'ironclad', target: 'salesforce', label: 'CLM native integration', type: 'likely',
      labelMy: -16, labelMx: 58, turn: 46 },
    { id: 'e_irondoc', source: 'ironclad', target: 'docugpt', label: 'signed contracts → extraction (inferred)', type: 'likely',
      labelMy: -14, labelMx: 24, turn: 32 },
    { id: 'e_outsf', source: 'outreach', target: 'salesforce', label: 'activity logging (via MCP)', type: 'likely',
      labelMy: -14, labelMx: 38, turn: 40 },
    { id: 'e25', source: 'snowflake', target: 'attribution', label: 'models', type: 'unconfirmed',
      labelMy: -16, labelMx: 0, turn: 18 },

    /* Orchestration layer (reported) */
    { id: 'e_sym_core', source: 'openai_core', target: 'symphony', label: 'runs on (reported)', type: 'likely',
      labelMy: -12, labelMx: 12, turn: 16 },
    { id: 'e_sym_gtm', source: 'symphony', target: 'gtm_assistant', label: 'orchestrates (reported)', type: 'likely',
      labelMy: -14, labelMx: -38, turn: 24 },
    { id: 'e_sym_doc', source: 'symphony', target: 'docugpt', label: 'orchestrates (reported)', type: 'likely',
      labelMy: -14, labelMx: 0, turn: 20 },
    { id: 'e_sym_inb', source: 'symphony', target: 'inbound_ai', label: 'orchestrates (reported)', type: 'confirmed-dashed',
      labelMy: -14, labelMx: -55, turn: 32 }
  ];

  var orgNote = 'The GTM Systems team, led by Keith Jones (Head of GTM Systems), owns Salesforce + integrations + the agent layer, treating Sales / RevOps as its internal end-users. Reportedly consolidated under a single Finance budget line for headcount / cost alignment (per interview — not independently verified).';

  function nodeLabel(n) {
    if (!n.sub) return n.label;
    return n.label + '\n' + n.sub;
  }

  var nodeNameById = {};
  nodes.forEach(function (n) { nodeNameById[n.id] = n.label; });

  function edgeEndpoints(sourceId, targetId) {
    var src = nodes.find(function (n) { return n.id === sourceId; });
    var tgt = nodes.find(function (n) { return n.id === targetId; });
    if (!src || !tgt) return { taxi: 'vertical' };
    var sx = src.geom[0] + src.geom[2] / 2;
    var sy = src.geom[1] + src.geom[3] / 2;
    var tx = tgt.geom[0] + tgt.geom[2] / 2;
    var ty = tgt.geom[1] + tgt.geom[3] / 2;
    var dx = tx - sx;
    var dy = ty - sy;
    if (Math.abs(dy) <= 55 && Math.abs(dx) > 90) return { taxi: 'horizontal' };
    return { taxi: 'vertical' };
  }

  function buildElements() {
    var elements = [];

    swimlanes.forEach(function (lane) {
      var pos = center(lane.x, lane.y, lane.w, lane.h);
      elements.push({
        group: 'nodes',
        data: {
          id: lane.id,
          label: lane.label,
          kind: 'swimlane',
          tone: lane.tone,
          width: lane.w * S,
          height: lane.h * S
        },
        position: pos,
        classes: 'swimlane'
      });
    });

    nodes.forEach(function (n) {
      var pos = center(n.geom[0], n.geom[1], n.geom[2], n.geom[3]);
      elements.push({
        group: 'nodes',
        data: {
          id: n.id,
          label: nodeLabel(n),
          category: n.category,
          kind: 'system',
          width: n.geom[2] * S,
          height: n.geom[3] * S,
          shape: n.shape || 'roundrectangle'
        },
        position: pos,
        classes: 'system ' + n.category
      });
    });

    edges.forEach(function (e) {
      var routing = edgeEndpoints(e.source, e.target);
      elements.push({
        group: 'edges',
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          edgeType: e.type,
          sourceName: nodeNameById[e.source],
          targetName: nodeNameById[e.target],
          taxi: routing.taxi,
          labelMy: e.labelMy != null ? e.labelMy : -12,
          labelMx: e.labelMx != null ? e.labelMx : 0,
          taxiTurn: e.turn != null ? e.turn : 32
        },
        classes: 'edge-' + e.type
      });
    });

    return elements;
  }

  root.GTM_STACK = {
    scale: S,
    swimlanes: swimlanes,
    nodes: nodes,
    edges: edges,
    orgNote: orgNote,
    nodeNameById: nodeNameById,
    buildElements: buildElements
  };
})(typeof window !== 'undefined' ? window : globalThis);
