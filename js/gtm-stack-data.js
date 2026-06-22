/* OpenAI GTM Stack v2 — graph data extracted from openai-gtm-stack-v2.drawio */
(function (root) {
  var S = 0.76;
  var COL_W = 210;
  var COL_GAP = 118;
  var COL_X0 = 90;
  var NODE_H = 64;
  var ROW_GAP = 72;
  var LANE_PAD = 54;
  var BTM_W = 192;

  function colX(index) {
    return COL_X0 + index * (COL_W + COL_GAP);
  }

  function center(x, y, w, h) {
    return { x: (x + w / 2) * S, y: (y + h / 2) * S };
  }

  var swimlanes = [
    { id: 'p1', label: 'DEMAND · DATA · MARKETING', x: 40, y: 85, w: 1620, h: 148, tone: 'neutral' },
    { id: 'p2', label: 'INBOUND AI · ENRICHMENT · ROUTING', x: 40, y: 305, w: 1620, h: 148, tone: 'neutral' },
    { id: 'p3', label: 'CRM — SYSTEM OF RECORD', x: 40, y: 525, w: 1620, h: 138, tone: 'crm' },
    { id: 'p4', label: 'AI-NATIVE INTERNAL GTM LAYER  (what this role owns / builds)', x: 40, y: 735, w: 1620, h: 268, tone: 'ai' },
    { id: 'p5', label: 'ENGAGEMENT · CONVERSATION INTELLIGENCE', x: 40, y: 1075, w: 1620, h: 148, tone: 'neutral' },
    { id: 'p6', label: 'QUOTE-TO-CASH · CONTRACTS · ANALYTICS', x: 40, y: 1295, w: 1620, h: 158, tone: 'neutral' }
  ];

  function laneNodeY(laneIndex) {
    return swimlanes[laneIndex].y + LANE_PAD;
  }

  var nodes = [
    { id: 'inbound_demand', category: 'confirmed', panel: 'p1',
      geom: [colX(0), laneNodeY(0), COL_W, NODE_H],
      label: 'Inbound Demand', sub: 'Web forms · ChatGPT Enterprise/Business signups' },
    { id: 'mktg', category: 'likely', panel: 'p1',
      geom: [colX(1), laneNodeY(0), COL_W, NODE_H],
      label: 'Marketing Automation', sub: 'HubSpot (reported)' },
    { id: 'zoominfo', category: 'likely', panel: 'p1',
      geom: [colX(2), laneNodeY(0), COL_W, NODE_H],
      label: 'ZoomInfo', sub: 'B2B data / GTM context graph' },
    { id: 'codex', category: 'surface', panel: 'p1',
      geom: [colX(3), laneNodeY(0), COL_W, NODE_H],
      label: 'Codex for Work', sub: 'Surface · Sales plugin · ZoomInfo + Clay apps' },
    { id: 'inbound_ai', category: 'ai-native', panel: 'p2',
      geom: [colX(0), laneNodeY(1), COL_W, NODE_H],
      label: 'Inbound Sales Assistant', sub: 'internal "TailorAssist" · auto-responds, qualifies, hands off' },
    { id: 'clay', category: 'confirmed', panel: 'p2',
      geom: [colX(1), laneNodeY(1), COL_W, NODE_H],
      label: 'Clay', sub: 'Enrichment · account research (RevOps + Sales)' },
    { id: 'leandata', category: 'confirmed', panel: 'p2',
      geom: [colX(2), laneNodeY(1), COL_W, NODE_H],
      label: 'LeanData', sub: 'Lead-to-account routing (native to Salesforce)' },
    { id: 'salesforce', category: 'hub', panel: 'p3',
      geom: [colX(1) - 36, laneNodeY(2), COL_W * 2 + COL_GAP + 72, NODE_H + 6],
      label: 'Salesforce', sub: 'Core CRM · System of Record · (Agentforce 360 ↔ ChatGPT)' },
    { id: 'kb', category: 'ai-native', panel: 'p4',
      geom: [colX(0), laneNodeY(3), COL_W, NODE_H + 6], shape: 'barrel',
      label: 'Knowledge Base / Connectors', sub: 'Docs · policies · playbooks · customer stories' },
    { id: 'gtm_assistant', category: 'ai-native', panel: 'p4',
      geom: [colX(1), laneNodeY(3), COL_W, NODE_H],
      label: 'GTM Assistant', sub: 'Briefs · recaps · product Q&A · CRM writeback' },
    { id: 'docugpt', category: 'ai-native', panel: 'p4',
      geom: [colX(2), laneNodeY(3), COL_W, NODE_H],
      label: 'DocuGPT', sub: 'Contracts → searchable structured data' },
    { id: 'slack', category: 'surface', panel: 'p4',
      geom: [colX(3), laneNodeY(3), COL_W, NODE_H],
      label: 'Slack', sub: 'Primary delivery surface' },
    { id: 'openai_core', category: 'platform', panel: 'p4',
      geom: [colX(0), laneNodeY(3) + NODE_H + 44, COL_W * 3 + COL_GAP * 2, 52],
      label: 'OpenAI Models / API · AgentKit · internal Automation Platform · eval loops', sub: '' },
    { id: 'gong', category: 'likely', panel: 'p5',
      geom: [colX(0), laneNodeY(4), COL_W, NODE_H],
      label: 'Gong', sub: 'Conversation intelligence · call notes (inferred)' },
    { id: 'outreach', category: 'likely', panel: 'p5',
      geom: [colX(1), laneNodeY(4), COL_W + 16, NODE_H],
      label: 'Outreach', sub: 'Sales engagement · MCP Server ↔ ChatGPT (Feb 2026); internal use unconfirmed' },
    { id: 'nue', category: 'confirmed', panel: 'p6',
      geom: [colX(0), laneNodeY(5), BTM_W, NODE_H + 4],
      label: 'Nue', sub: 'CPQ / lead-to-quote · Salesforce-native · subs + usage billing' },
    { id: 'stripe', category: 'likely', panel: 'p6',
      geom: [colX(1), laneNodeY(5), BTM_W, NODE_H + 4],
      label: 'Stripe', sub: 'Payments rails · Agentic Commerce Protocol' },
    { id: 'snowflake', category: 'likely', panel: 'p6',
      geom: [colX(2), laneNodeY(5), BTM_W, NODE_H + 4],
      label: 'Snowflake', sub: 'Data Cloud / warehouse ($200M partnership)' },
    { id: 'attribution', category: 'unconfirmed', panel: 'p6',
      geom: [colX(3), laneNodeY(5), BTM_W, NODE_H + 4],
      label: 'Attribution', sub: 'JD category (vendor unconfirmed)' },
    { id: 'ironclad', category: 'confirmed', panel: 'p6',
      geom: [colX(4), laneNodeY(5), BTM_W, NODE_H + 4],
      label: 'Ironclad', sub: 'Contract Lifecycle Mgmt (CLM) · eSign · Salesforce-integrated' }
  ];

  /* labelMy / labelMx nudge edge labels; turn spreads taxi routing */
  var edges = [
    { id: 'e1', source: 'inbound_demand', target: 'inbound_ai', label: 'inbound leads', type: 'confirmed',
      labelMy: -14, labelMx: -48, turn: 30 },
    { id: 'e2', source: 'inbound_ai', target: 'salesforce', label: 'qualified handoff + writeback', type: 'confirmed',
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
      labelMy: -10, labelMx: -38, turn: 22 },
    { id: 'e10', source: 'openai_core', target: 'inbound_ai', label: 'powers', type: 'confirmed',
      labelMy: -10, labelMx: -68, turn: 30 },
    { id: 'e11', source: 'openai_core', target: 'docugpt', label: 'powers', type: 'confirmed',
      labelMy: -10, labelMx: 36, turn: 22 },
    { id: 'e12', source: 'zoominfo', target: 'codex', label: 'native B2B data app', type: 'confirmed',
      labelMy: -16, labelMx: 0, turn: 20 },
    { id: 'e13', source: 'gtm_assistant', target: 'salesforce', label: 'CRM updates (piloting)', type: 'confirmed-dashed',
      labelMy: -14, labelMx: 64, turn: 42 },
    { id: 'e_sfnue', source: 'salesforce', target: 'nue', label: 'lead-to-quote (CPQ)', type: 'confirmed',
      labelMy: 16, labelMx: -52, turn: 36 },
    { id: 'e_nuestripe', source: 'nue', target: 'stripe', label: 'billing → payments', type: 'confirmed',
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
      labelMy: -16, labelMx: 0, turn: 18 }
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
    if (Math.abs(dy) <= 60 && Math.abs(dx) > 100) return { taxi: 'horizontal' };
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
