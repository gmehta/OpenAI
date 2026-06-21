(function () {
  var cyInstance = null;
  var focusActive = false;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var connHint = 'All connections are shown by default — click a system to emphasize its flows.';

  var nodeStyles = {
    confirmed: { 'background-color': '#E6F4EE', 'border-color': '#1A7F64', color: '#0B3D2E' },
    likely: { 'background-color': '#FBF1D8', 'border-color': '#C8911A', color: '#5C4708' },
    'ai-native': { 'background-color': '#0E5C46', 'border-color': '#0A4233', color: '#FFFFFF' },
    hub: { 'background-color': '#1A7F64', 'border-color': '#0A4233', color: '#FFFFFF' },
    platform: { 'background-color': '#10261F', 'border-color': '#0A4233', color: '#FFFFFF' },
    surface: { 'background-color': '#ECE7F6', 'border-color': '#5E35B1', color: '#311B92' },
    unconfirmed: { 'background-color': '#F2F2F2', 'border-color': '#9E9E9E', color: '#555555',
      'border-style': 'dashed' }
  };

  function baseStyle() {
    return [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          'text-wrap': 'wrap',
          'text-max-width': 'data(width)',
          'font-size': 11,
          'font-family': 'system-ui, -apple-system, sans-serif',
          'text-valign': 'center',
          'text-halign': 'center',
          shape: 'roundrectangle',
          width: 'data(width)',
          height: 'data(height)',
          'border-width': 2,
          padding: 8,
          'z-index': 200
        }
      },
      {
        selector: 'node.swimlane',
        style: {
          shape: 'rectangle',
          'background-color': '#FAFAFA',
          'border-color': '#E5E5E5',
          'border-width': 1,
          color: '#B0B0B0',
          'font-size': 10,
          'font-style': 'italic',
          'text-valign': 'top',
          'text-halign': 'left',
          'text-margin-y': 10,
          'text-margin-x': 12,
          'z-index': 0
        }
      },
      {
        selector: 'node.swimlane[tone = "crm"]',
        style: { 'background-color': '#F4FBF8', 'border-color': '#CDE8DE', color: '#8FB8AC' }
      },
      {
        selector: 'node.swimlane[tone = "ai"]',
        style: { 'background-color': '#F1F8F5', 'border-color': '#CDE8DE', color: '#6FAE9C' }
      },
      {
        selector: 'node.system',
        style: {
          'z-index': 600,
          'text-outline-width': 0,
          'background-opacity': 1
        }
      },
      {
        selector: 'node.hub',
        style: { 'font-size': 14, 'font-weight': 700, 'border-width': 3 }
      },
      {
        selector: 'node.platform',
        style: { 'font-size': 12, 'font-weight': 600 }
      },
      {
        selector: 'node.barrel',
        style: { shape: 'barrel' }
      },
      { selector: 'node.confirmed', style: nodeStyles.confirmed },
      { selector: 'node.likely', style: nodeStyles.likely },
      { selector: 'node.ai-native', style: nodeStyles['ai-native'] },
      { selector: 'node.hub', style: nodeStyles.hub },
      { selector: 'node.platform', style: nodeStyles.platform },
      { selector: 'node.surface', style: nodeStyles.surface },
      { selector: 'node.unconfirmed', style: nodeStyles.unconfirmed },
      {
        selector: 'node.selected',
        style: {
          'border-width': 4,
          'overlay-color': '#0E5C46',
          'overlay-opacity': 0.12,
          'overlay-padding': 6
        }
      },
      {
        selector: 'edge',
        style: {
          label: 'data(label)',
          'font-size': 10,
          'font-weight': 600,
          'font-family': 'ui-monospace, monospace',
          'text-rotation': 'autorotate',
          'text-margin-y': -10,
          'curve-style': 'taxi',
          'taxi-direction': 'data(taxi)',
          'taxi-turn': 28,
          'taxi-turn-min-distance': 10,
          'taxi-radius': 8,
          'source-endpoint': 'outside-to-node',
          'target-endpoint': 'outside-to-node',
          'source-distance-from-node': 4,
          'target-distance-from-node': 4,
          'target-arrow-shape': 'triangle',
          'arrow-scale': 1.35,
          width: 4,
          'line-cap': 'round',
          'line-color': '#1A7F64',
          'target-arrow-color': '#1A7F64',
          color: '#0B3D2E',
          'text-background-color': '#FFFFFF',
          'text-background-opacity': 1,
          'text-background-padding': 4,
          'text-background-shape': 'roundrectangle',
          'text-border-width': 1,
          'text-border-color': '#D8DEDA',
          'text-border-opacity': 1,
          'z-index': 400,
          'underlay-padding': 4,
          'underlay-opacity': 0.85,
          'underlay-color': '#FFFFFF'
        }
      },
      {
        selector: 'edge.edge-confirmed',
        style: {
          'line-color': '#1A7F64',
          'target-arrow-color': '#1A7F64',
          color: '#0B3D2E',
          width: 4,
          'line-style': 'solid'
        }
      },
      {
        selector: 'edge.edge-confirmed-dashed',
        style: {
          'line-color': '#13855F',
          'target-arrow-color': '#13855F',
          color: '#0B3D2E',
          width: 3.5,
          'line-style': 'dashed',
          'line-dash-pattern': [8, 5]
        }
      },
      {
        selector: 'edge.edge-likely',
        style: {
          'line-color': '#C8911A',
          'target-arrow-color': '#C8911A',
          color: '#7A5E12',
          width: 3,
          'line-style': 'dashed',
          'line-dash-pattern': [8, 5]
        }
      },
      {
        selector: 'edge.edge-unconfirmed',
        style: {
          'line-color': '#757575',
          'target-arrow-color': '#757575',
          color: '#555555',
          width: 2.5,
          'line-style': 'dashed',
          'line-dash-pattern': [4, 4]
        }
      },
      {
        selector: 'edge.highlighted',
        style: {
          width: 6,
          'arrow-scale': 1.6,
          'z-index': 900,
          'font-size': 11,
          'text-background-color': '#FFF8E1'
        }
      },
      {
        selector: 'edge.edge-hovered',
        style: {
          width: 5,
          'z-index': 700,
          'text-background-color': '#F4FBF8'
        }
      },
      {
        selector: 'edge.dimmed',
        style: { opacity: 0.45, width: 2 }
      },
      {
        selector: 'node.dimmed',
        style: { opacity: 0.55 }
      },
      {
        selector: 'node.highlighted',
        style: { opacity: 1 }
      },
      {
        selector: 'node:active',
        style: { 'overlay-opacity': 0 }
      }
    ];
  }

  function clearFocus(cy) {
    focusActive = false;
    cy.elements().removeClass('dimmed highlighted selected edge-hovered');
    cy.edges().removeClass('highlighted edge-hovered');
  }

  function focusEdge(cy, edge) {
    clearFocus(cy);
    focusActive = true;
    var hood = edge.connectedNodes().union(edge);
    cy.elements().addClass('dimmed');
    hood.removeClass('dimmed').addClass('highlighted');
    edge.addClass('highlighted');
  }

  function focusNode(cy, node) {
    if (node.data('kind') === 'swimlane') return;
    clearFocus(cy);
    focusActive = true;
    node.addClass('selected');
    var hood = node.closedNeighborhood();
    cy.elements().addClass('dimmed');
    hood.removeClass('dimmed').addClass('highlighted');
    updateConnectionPanel(node);
  }

  function updateConnectionPanel(node) {
    var panel = document.getElementById('stack-connections-body');
    if (!panel || !node) return;
    var name = node.data('label').split('\n')[0];
    var incoming = node.incomers('edge');
    var outgoing = node.outgoers('edge');
    var html = '<p class="conn-focus">Connections for <b>' + name + '</b></p>';
    if (outgoing.length) {
      html += '<p class="conn-dir">Outgoing →</p><ul class="conn-list">';
      outgoing.forEach(function (e) {
        html += connItem(e, 'out');
      });
      html += '</ul>';
    }
    if (incoming.length) {
      html += '<p class="conn-dir">Incoming ←</p><ul class="conn-list">';
      incoming.forEach(function (e) {
        html += connItem(e, 'in');
      });
      html += '</ul>';
    }
    if (!incoming.length && !outgoing.length) {
      html += '<p class="conn-empty">No mapped connections.</p>';
    }
    panel.innerHTML = html;
    panel.querySelectorAll('[data-edge-id]').forEach(function (el) {
      el.addEventListener('click', function () {
        var edge = cyInstance.getElementById(el.getAttribute('data-edge-id'));
        if (edge.nonempty()) focusEdge(cyInstance, edge);
      });
    });
  }

  function connItem(edge, dir) {
    var type = edge.data('edgeType');
    var other = dir === 'out' ? edge.data('targetName') : edge.data('sourceName');
    var arrow = dir === 'out' ? '→' : '←';
    return '<li class="conn-item ' + type + '" data-edge-id="' + edge.id() + '">' +
      '<span class="conn-arrow">' + arrow + '</span> ' +
      '<span class="conn-peer">' + other + '</span>' +
      '<span class="conn-label">' + edge.data('label') + '</span></li>';
  }

  function buildConnectionIndex() {
    var list = document.getElementById('stack-connections-index');
    if (!list || !window.GTM_STACK) return;
    var html = '';
    GTM_STACK.edges.forEach(function (e) {
      html += '<li class="conn-item ' + e.type + '" data-edge-id="' + e.id + '">' +
        '<span class="conn-peer">' + GTM_STACK.nodeNameById[e.source] + '</span>' +
        '<span class="conn-arrow">→</span>' +
        '<span class="conn-peer">' + GTM_STACK.nodeNameById[e.target] + '</span>' +
        '<span class="conn-label">' + e.label + '</span></li>';
    });
    list.innerHTML = html;
    list.querySelectorAll('[data-edge-id]').forEach(function (el) {
      el.addEventListener('click', function () {
        if (!cyInstance) return;
        var edge = cyInstance.getElementById(el.getAttribute('data-edge-id'));
        if (edge.nonempty()) {
          focusEdge(cyInstance, edge);
          cyInstance.animate({ center: { eles: edge } }, { duration: reducedMotion ? 0 : 200 });
        }
      });
    });
  }

  function spreadHubEdges(cy) {
    var bySource = {};
    cy.edges().forEach(function (edge) {
      var src = edge.source().id();
      bySource[src] = bySource[src] || [];
      bySource[src].push(edge);
    });
    Object.keys(bySource).forEach(function (srcId) {
      var group = bySource[srcId];
      if (group.length < 2) return;
      group.forEach(function (edge, i) {
        var spread = (i - (group.length - 1) / 2) * 18;
        edge.style('taxi-turn', 24 + Math.abs(spread));
      });
    });
  }

  function bindFullscreen(cy) {
    var stage = document.getElementById('stack-diagram-stage');
    var btn = document.getElementById('stack-fullscreen');
    if (!stage || !btn) return;

    function isFullscreen() {
      return document.fullscreenElement === stage ||
        document.webkitFullscreenElement === stage;
    }

    function afterResize() {
      requestAnimationFrame(function () {
        cy.resize();
        cy.fit(undefined, 56);
      });
    }

    function setPressed(on) {
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? 'Exit fullscreen' : 'Fullscreen';
    }

    function enterFullscreen() {
      var req = stage.requestFullscreen || stage.webkitRequestFullscreen;
      if (!req) {
        btn.hidden = true;
        return;
      }
      Promise.resolve(req.call(stage)).catch(function () {
        setPressed(false);
      });
    }

    function exitFullscreen() {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document);
    }

    btn.addEventListener('click', function () {
      if (isFullscreen()) exitFullscreen();
      else enterFullscreen();
    });

    document.addEventListener('fullscreenchange', function () {
      setPressed(isFullscreen());
      afterResize();
    });
    document.addEventListener('webkitfullscreenchange', function () {
      setPressed(isFullscreen());
      afterResize();
    });
  }

  function bindControls(cy) {
    document.getElementById('stack-fit').addEventListener('click', function () {
      cy.fit(undefined, 48);
    });
    document.getElementById('stack-zoom-in').addEventListener('click', function () {
      cy.zoom({ level: cy.zoom() * 1.2, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
    });
    document.getElementById('stack-zoom-out').addEventListener('click', function () {
      cy.zoom({ level: cy.zoom() / 1.2, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
    });
    document.getElementById('stack-reset').addEventListener('click', function () {
      clearFocus(cy);
      cy.fit(undefined, 48);
      document.getElementById('stack-connections-body').innerHTML =
        '<p class="conn-hint">' + connHint + '</p>';
    });

    var filter = document.getElementById('stack-conn-filter');
    if (filter) {
      filter.addEventListener('input', function () {
        var q = filter.value.toLowerCase();
        document.querySelectorAll('#stack-connections-index .conn-item').forEach(function (el) {
          el.hidden = q && el.textContent.toLowerCase().indexOf(q) === -1;
        });
      });
    }
  }

  function initialViewport(cy, container) {
    var padding = 48;
    var bb = cy.elements().boundingBox();
    var zoomW = (container.clientWidth - padding * 2) / bb.w;
    var zoomH = (container.clientHeight - padding * 2) / bb.h;
    var zoom = Math.min(zoomW, zoomH);
    zoom = Math.max(zoom, 0.55);
    cy.zoom(zoom);
    cy.center();
  }

  window.initGtmStackDiagram = function () {
    if (cyInstance || typeof cytoscape === 'undefined' || !window.GTM_STACK) return;

    var container = document.getElementById('gtm-stack-cy');
    var elements = GTM_STACK.buildElements();

    cyInstance = cytoscape({
      container: container,
      elements: elements,
      style: baseStyle(),
      layout: { name: 'preset' },
      minZoom: 0.35,
      maxZoom: 3,
      wheelSensitivity: 0.25,
      boxSelectionEnabled: false
    });

    cyInstance.nodes('[shape = "barrel"]').addClass('barrel');
    cyInstance.nodes('.swimlane').ungrabify().unselectify().lock();
    spreadHubEdges(cyInstance);
    initialViewport(cyInstance, container);
    buildConnectionIndex();

    cyInstance.on('tap', 'node.system', function (evt) {
      focusNode(cyInstance, evt.target);
    });

    cyInstance.on('tap', 'edge', function (evt) {
      focusEdge(cyInstance, evt.target);
    });

    cyInstance.on('tap', function (evt) {
      if (evt.target === cyInstance) {
        clearFocus(cyInstance);
        document.getElementById('stack-connections-body').innerHTML =
          '<p class="conn-hint">' + connHint + '</p>';
      }
    });

    if (!reducedMotion) {
      cyInstance.on('mouseover', 'edge', function (evt) {
        if (!focusActive) evt.target.addClass('edge-hovered');
      });
      cyInstance.on('mouseout', 'edge', function (evt) {
        evt.target.removeClass('edge-hovered');
      });
    }

    bindControls(cyInstance);
    bindFullscreen(cyInstance);

    requestAnimationFrame(function () {
      cyInstance.resize();
      initialViewport(cyInstance, container);
    });

    window.addEventListener('resize', function () {
      if (cyInstance) cyInstance.resize();
    });
  };
})();
