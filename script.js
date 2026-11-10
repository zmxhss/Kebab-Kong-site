// zakładki menu
document.querySelectorAll('.tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab').forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.panel').forEach(function (p) { p.classList.remove('active'); });
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// status otwarcia: codziennie 11:00–21:00
(function () {
  var now = new Date();
  var h = now.getHours() + now.getMinutes() / 60;
  var open = h >= 11 && h < 21;
  document.querySelectorAll('.status').forEach(function (el) {
    el.querySelector('span').textContent = open ? 'Otwarte do 21:00' : 'Zamknięte · otwieramy o 11:00';
    if (!open) el.classList.add('closed');
  });
  var d = now.getDay();
  var li = document.querySelector('.hours li[data-d="' + d + '"]');
  if (li) li.classList.add('today');
})();

// animacje przy przewijaniu + paski ocen
(function () {
  var items = document.querySelectorAll('.reveal');
  function show(el) {
    el.classList.add('in');
    el.querySelectorAll('.fill').forEach(function (f) { f.style.width = f.dataset.w + '%'; });
  }
  if (!('IntersectionObserver' in window)) { items.forEach(show); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { io.observe(el); });
})();
