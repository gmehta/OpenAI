(function () {
  var cyInstance = null;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          'font-size': 10,
          'font-family': 'system-ui, -apple-system, sans-serif',
          'text-valign': 'center',
          'text-halign': 'center',
          shape: 'roundrectangle',
          width: 'data(width)',
          height: 'data(height)',
          'border-width': 2,
          padding: 6
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
          'font-size': 9,
          'font-style': 'italic',
          'text-valign': 'top',
          'text-halign': 'left',
          'text-margin-y': 8,
          'text-margin-x': 10,
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
        style: { 'z-index': 10, 'text-outline-width': 0 }
      },
      {
        selector: 'node.hub',
        style: { 'font-size': 13, 'font-weight': 700, 'border-width': 3 }
      },
      {
        selector: 'node.platform',
        style: { 'font-size': 11, 'font-weight': 600 }
      },
      {
        selector: 'node.barrel',
        style: { shape: 'barrel' }
      },
      {
        selector: 'node.confirmed',
        style: nodeStyles.confirmed
      },
      {
        selector: 'node.likely',
        style: nodeStyles.likely
      },
      {
        selector: 'node.ai-native',
        style: nodeStyles['ai-native']
      },
      {
        selector: 'node.hub',
        style: nodeStyles.hub
      },
      {
        selector: 'node.platform',
        style: nodeStyles.platform
      },
      {
        selector: 'node.surface',
        style: nodeStyles.surface
      },
      {
        selector: 'node.unconfirmed',
        style: nodeStyles.unconfirmed
      },
      {
        selector: 'edge',
        style: {
          label: 'data(label)',
          'font-size': 8,
          'font-family': 'ui-monospace, monospace',
          'text-rotation': 'autorotate',
          'text-margin-y': -8,
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.8,
          width: 2,
          'line-color': '#1A7F64',
          'target-arrow-color': '#1A7F64',
          color: '#0B3D2E',
          'text-background-color': '#FBFBF9',
          'text-background-opacity': 0.85,
          'text-background-padding': 2,
          'z-index': 5
        }
      },
      {
        selector: 'edge.edge-confirmed',
        style: {
          'line-color': '#1A7F64',
          'target-arrow-color': '#1A7F64',
          color: '#0B3D2E',
          width: 2,
          'line-style': 'solid'
        }
      },
      {
        selector: 'edge.edge-confirmed-dashed',
        style: {
          'line-color': '#1A7F64',
          'target-arrow-color': '#1A7F64',
          color: '#0B3D2E',
          width: 2,
          'line-style': 'dashed'
        }
      },
      {
        selector: 'edge.edge-likely',
        style: {
          'line-color': '#C8911A',
          'target-arrow-color': '#C8911A',
          color: '#7A5E12',
          width: 2,
          'line-style': 'dashed'
        }
      },
      {
        selector: 'edge.edge-unconfirmed',
        style: {
          'line-color': '#9E9E9E',
          'target-arrow-color': '#9E9E9E',
          color: '#777777',
          width: 1,
          'line-style': 'dashed'
        }
      },
      {
        selector: '.dimmed',
        style: { opacity: 0.15 }
      },
      {
        selector: '.highlighted',
        style: { opacity: 1 }
      },
      {
        selector: 'node:active',
        style: { 'overlay-opacity': 0 }
      }
    ];
  }

  function applyDim(cy, focusNode) {
    if (!focusNode || focusNode.data('kind') === 'swimlane') return;
    var neighborhood = focusNode.closedNeighborhood();
    cy.elements().addClass('dimmed');
    neighborhood.removeClass('dimmed').addClass('highlighted');
  }

  function clearDim(cy) {
    cy.elements().removeClass('dimmed highlighted');
  }

  function bindControls(cy) {
    document.getElementById('stack-fit').addEventListener('click', function () {
      cy.fit(undefined, 40);
    });
    document.getElementById('stack-zoom-in').addEventListener('click', function () {
      cy.zoom({ level: cy.zoom() * 1.2, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
    });
    document.getElementById('stack-zoom-out').addEventListener('click', function () {
      cy.zoom({ level: cy.zoom() / 1.2, renderedPosition: { x: cy.width() / 2, y: cy.height() / 2 } });
    });
    document.getElementById('stack-reset').addEventListener('click', function () {
      cy.fit(undefined, 40);
      cy.center();
      clearDim(cy);
    });
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
      minZoom: 0.25,
      maxZoom: 2.5,
      wheelSensitivity: 0.2,
      boxSelectionEnabled: false
    });

    cyInstance.nodes('[shape = "barrel"]').addClass('barrel');
    cyInstance.nodes('.swimlane').ungrabify().unselectify();
    cyInstance.nodes('.swimlane').lock();
    cyInstance.fit(undefined, 36);

    if (!reducedMotion) {
      cyInstance.on('mouseover', 'node.system', function (evt) {
        applyDim(cyInstance, evt.target);
      });
      cyInstance.on('mouseout', 'node.system', function () {
        clearDim(cyInstance);
      });
    }

    bindControls(cyInstance);

    window.addEventListener('resize', function () {
      if (cyInstance) cyInstance.resize();
    });
  };
})();
