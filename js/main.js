/* Social Clau · JavaScript sense dependències */

// Marca que hi ha JS abans de pintar (menú plegat i animacions de revelat)
document.documentElement.classList.add('js');

/*
 * Correu de contacte ofuscat contra robots: adreça invertida i en base64.
 * Per canviar-lo, executeu a la consola del navegador:
 *   btoa('nova@adreca.cat'.split('').reverse().join(''))
 * i enganxeu el resultat aquí.
 */
var CORREU_CODIFICAT = 'dGFjLnVhbGNsYWljb3NAb2ZuaQ==';

function obtenirCorreu() {
  return atob(CORREU_CODIFICAT).split('').reverse().join('');
}

document.addEventListener('DOMContentLoaded', function () {
  var capcalera = document.getElementById('capcalera');
  var botoMenu = document.querySelector('.menu-boto');
  var menu = document.getElementById('menu');

  // Menú mòbil
  function tancaMenu() {
    menu.classList.remove('es-obert');
    botoMenu.setAttribute('aria-expanded', 'false');
  }
  botoMenu.addEventListener('click', function () {
    var obert = menu.classList.toggle('es-obert');
    botoMenu.setAttribute('aria-expanded', String(obert));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) tancaMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('es-obert')) {
      tancaMenu();
      botoMenu.focus();
    }
  });

  // Ombra de la capçalera en fer scroll
  function actualitzaCapcalera() {
    capcalera.classList.toggle('es-desplacat', window.scrollY > 10);
  }
  window.addEventListener('scroll', actualitzaCapcalera, { passive: true });
  actualitzaCapcalera();

  // Revelat d'elements en entrar a la pantalla
  var revelables = document.querySelectorAll('.revela');
  if ('IntersectionObserver' in window) {
    var observador = new IntersectionObserver(function (entrades) {
      entrades.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('es-visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revelables.forEach(function (el) { observador.observe(el); });
  } else {
    revelables.forEach(function (el) { el.classList.add('es-visible'); });
  }

  // Enllaços de correu: es construeixen només al navegador
  var correu = obtenirCorreu();
  document.querySelectorAll('.js-correu').forEach(function (enllac) {
    var href = 'mailto:' + correu;
    if (enllac.dataset.assumpte) href += '?subject=' + encodeURIComponent(enllac.dataset.assumpte);
    enllac.href = href;
    if (enllac.classList.contains('js-correu-text')) enllac.textContent = correu;
  });

  // Any actual al peu
  document.querySelectorAll('.js-any').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
