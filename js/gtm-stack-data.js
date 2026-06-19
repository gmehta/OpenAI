/* OpenAI GTM Stack v2 — graph data extracted from openai-gtm-stack-v2.drawio */
(function (root) {
  var S = 0.85;

  function center(x, y, w, h) {
    return { x: (x + w / 2) * S, y: (y + h / 2) * S };
  }

  function size(w, h) {
    return { width: w * S, height: h * S };
  }

  var swimlanes = [
    { id: 'p1', label: 'DEMAND · DATA · MARKETING', x: 40, y: 110, w: 1500, h: 120, tone: 'neutral' },
    { id: 'p2', label: 'INBOUND AI · ENRICHMENT · ROUTING', x: 40, y: 250, w: 1500, h: 120, tone: 'neutral' },
    { id: 'p3', label: 'CRM — SYSTEM OF RECORD', x: 40, y: 390, w: 1500, h: 110, tone: 'crm' },
    { id: 'p4', label: 'AI-NATIVE INTERNAL GTM LAYER  (what this role owns / builds)', x: 40, y: 520, w: 1500, h: 210, tone: 'ai' },
    { id: 'p5', label: 'ENGAGEMENT · CONVERSATION INTELLIGENCE', x: 40, y: 750, w: 1500, h: 120, tone: 'neutral' },
    { id: 'p6', label: 'QUOTE-TO-CASH · CONTRACTS · ANALYTICS', x: 40, y: 890, w: 1500, h: 130, tone: 'neutral' }
  ];

  var nodes = [
    { id: 'inbound_demand', category: 'confirmed', panel: 'p1', geom: [90, 145, 260, 70],
      label: 'Inbound Demand', sub: 'Web forms · ChatGPT Enterprise/Business signups' },
    { id: 'mktg', category: 'likely', panel: 'p1', geom: [450, 145, 260, 70],
      label: 'Marketing Automation', sub: 'HubSpot (reported)' },
    { id: 'zoominfo', category: 'likely', panel: 'p1', geom: [810, 145, 260, 70],
      label: 'ZoomInfo', sub: 'B2B data / GTM context graph' },
    { id: 'codex', category: 'surface', panel: 'p1', geom: [1170, 145, 260, 70],
      label: 'Codex for Work', sub: 'Surface · Sales plugin · ZoomInfo + Clay apps' },
    { id: 'inbound_ai', category: 'ai-native', panel: 'p2', geom: [90, 285, 260, 70],
      label: 'Inbound Sales Assistant', sub: 'internal "TailorAssist" · auto-responds, qualifies, hands off' },
    { id: 'clay', category: 'confirmed', panel: 'p2', geom: [450, 285, 260, 70],
      label: 'Clay', sub: 'Enrichment · account research (RevOps + Sales)' },
    { id: 'leandata', category: 'confirmed', panel: 'p2', geom: [810, 285, 260, 70],
      label: 'LeanData', sub: 'Lead-to-account routing (native to Salesforce)' },
    { id: 'salesforce', category: 'hub', panel: 'p3', geom: [540, 410, 500, 70],
      label: 'Salesforce', sub: 'Core CRM · System of Record · (Agentforce 360 ↔ ChatGPT)' },
    { id: 'kb', category: 'ai-native', panel: 'p4', geom: [100, 550, 240, 80], shape: 'barrel',
      label: 'Knowledge Base / Connectors', sub: 'Docs · policies · playbooks · customer stories' },
    { id: 'gtm_assistant', category: 'ai-native', panel: 'p4', geom: [450, 550, 260, 70],
      label: 'GTM Assistant', sub: 'Briefs · recaps · product Q&A · CRM writeback' },
    { id: 'docugpt', category: 'ai-native', panel: 'p4', geom: [810, 550, 260, 70],
      label: 'DocuGPT', sub: 'Contracts → searchable structured data' },
    { id: 'slack', category: 'surface', panel: 'p4', geom: [1170, 550, 260, 70],
      label: 'Slack', sub: 'Primary delivery surface' },
    { id: 'openai_core', category: 'platform', panel: 'p4', geom: [100, 650, 970, 55],
      label: 'OpenAI Models / API · AgentKit · internal Automation Platform · eval loops', sub: '' },
    { id: 'gong', category: 'likely', panel: 'p5', geom: [90, 785, 260, 70],
      label: 'Gong', sub: 'Conversation intelligence · call notes (inferred)' },
    { id: 'outreach', category: 'likely', panel: 'p5', geom: [450, 785, 280, 70],
      label: 'Outreach', sub: 'Sales engagement · MCP Server ↔ ChatGPT (Feb 2026); internal use unconfirmed' },
    { id: 'nue', category: 'confirmed', panel: 'p6', geom: [70, 925, 250, 75],
      label: 'Nue', sub: 'CPQ / lead-to-quote · Salesforce-native · subs + usage billing' },
    { id: 'stripe', category: 'likely', panel: 'p6', geom: [360, 925, 250, 75],
      label: 'Stripe', sub: 'Payments rails · Agentic Commerce Protocol' },
    { id: 'snowflake', category: 'likely', panel: 'p6', geom: [650, 925, 250, 75],
      label: 'Snowflake', sub: 'Data Cloud / warehouse ($200M partnership)' },
    { id: 'attribution', category: 'unconfirmed', panel: 'p6', geom: [940, 925, 250, 75],
      label: 'Attribution', sub: 'JD category (vendor unconfirmed)' },
    { id: 'ironclad', category: 'confirmed', panel: 'p6', geom: [1230, 925, 250, 75],
      label: 'Ironclad', sub: 'Contract Lifecycle Mgmt (CLM) · eSign · Salesforce-integrated' }
  ];

  var edges = [
    { id: 'e1', source: 'inbound_demand', target: 'inbound_ai', label: 'inbound leads', type: 'confirmed' },
    { id: 'e2', source: 'inbound_ai', target: 'salesforce', label: 'qualified handoff + writeback', type: 'confirmed' },
    { id: 'e3', source: 'clay', target: 'salesforce', label: 'enrichment', type: 'confirmed' },
    { id: 'e4', source: 'leandata', target: 'salesforce', label: 'lead-to-account routing', type: 'confirmed' },
    { id: 'e5', source: 'salesforce', target: 'gtm_assistant', label: 'account history + SFDC activity', type: 'confirmed' },
    { id: 'e6', source: 'kb', target: 'gtm_assistant', label: 'product Q&A grounding', type: 'confirmed' },
    { id: 'e7', source: 'kb', target: 'inbound_ai', label: 'connector grounding', type: 'confirmed' },
    { id: 'e8', source: 'gtm_assistant', target: 'slack', label: 'delivers in', type: 'confirmed' },
    { id: 'e9', source: 'openai_core', target: 'gtm_assistant', label: 'powers', type: 'confirmed' },
    { id: 'e10', source: 'openai_core', target: 'inbound_ai', label: 'powers', type: 'confirmed' },
    { id: 'e11', source: 'openai_core', target: 'docugpt', label: 'powers', type: 'confirmed' },
    { id: 'e12', source: 'zoominfo', target: 'codex', label: 'native B2B data app', type: 'confirmed' },
    { id: 'e13', source: 'gtm_assistant', target: 'salesforce', label: 'CRM updates (piloting)', type: 'confirmed-dashed' },
    { id: 'e_sfnue', source: 'salesforce', target: 'nue', label: 'lead-to-quote (CPQ)', type: 'confirmed' },
    { id: 'e_nuestripe', source: 'nue', target: 'stripe', label: 'billing → payments', type: 'confirmed' },
    { id: 'e14', source: 'mktg', target: 'salesforce', label: 'marketing / sales sync', type: 'likely' },
    { id: 'e15', source: 'zoominfo', target: 'clay', label: 'data source', type: 'likely' },
    { id: 'e16', source: 'gong', target: 'gtm_assistant', label: 'call notes', type: 'likely' },
    { id: 'e17', source: 'gong', target: 'snowflake', label: 'call data', type: 'likely' },
    { id: 'e18', source: 'salesforce', target: 'snowflake', label: 'data movement', type: 'likely' },
    { id: 'e19', source: 'mktg', target: 'snowflake', label: 'marketing data', type: 'likely' },
    { id: 'e20', source: 'stripe', target: 'snowflake', label: 'billing data', type: 'likely' },
    { id: 'e21', source: 'docugpt', target: 'snowflake', label: 'structured contract data', type: 'likely' },
    { id: 'e_ironsf', source: 'ironclad', target: 'salesforce', label: 'CLM native integration', type: 'likely' },
    { id: 'e_irondoc', source: 'ironclad', target: 'docugpt', label: 'signed contracts → extraction (inferred)', type: 'likely' },
    { id: 'e_outsf', source: 'outreach', target: 'salesforce', label: 'activity logging (via MCP)', type: 'likely' },
    { id: 'e25', source: 'snowflake', target: 'attribution', label: 'models', type: 'unconfirmed' }
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
    if (Math.abs(dy) <= 40 && Math.abs(dx) > 80) return { taxi: 'horizontal' };
    return { taxi: 'vertical' };
  }

  function buildElements() {
    var elements = [];

    swimlanes.forEach(function (lane) {
      var pos = center(lane.x, lane.y, lane.w, lane.h);
      var dim = size(lane.w, lane.h);
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

    edges.forEach(function (e, i) {
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
          spread: (i % 5) - 2
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
