(function () {
  var tabs = document.querySelectorAll('.tab');
  var views = document.querySelectorAll('.panel-view');
  var stackInitialized = false;

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      var id = t.getAttribute('data-tab');
      views.forEach(function (v) { v.hidden = (v.id !== id); });

      if (id === 'stack' && !stackInitialized && window.initGtmStackDiagram) {
        stackInitialized = true;
        window.initGtmStackDiagram();
      }
    });
  });
})();
