/* Verna — extrait à ajouter dans les pages de commande, le jour où le lien du gardien remplace celui de Google.
 * Ne change rien de visible pour le client. Il prépare, pour chaque commande :
 *   - empreinte : une « signature » de l'appareil (modèle d'écran, navigateur, langue, fuseau, carte graphique…)
 *   - vid       : un identifiant gardé dans le navigateur (localStorage)
 *   - t_page    : le temps passé sur la page avant la commande (secondes)
 *   - fbclid / utm_* : la source (publicité Meta ou non, campagne, annonce)
 * Utilisation : const infos = window.vernaGardien(); puis ajouter ces champs au paquet envoyé au gardien.
 * Et dans le formulaire, la case piège (invisible) :
 *   <input name="site_web" tabindex="-1" autocomplete="off" aria-hidden="true"
 *          style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
 */
(function () {
  // début de la visite : gardé pour l'onglet, pour qu'un rechargement de la page ne remette pas le compteur à zéro
  var debut = Date.now();
  try {
    var memo = parseInt(sessionStorage.getItem('verna_debut') || '', 10);
    if (memo && memo <= debut && debut - memo < 6 * 3600 * 1000) debut = memo;
    else sessionStorage.setItem('verna_debut', String(debut));
  } catch (e) {}
  var info = { vid: '', empreinte: '' };

  try {
    info.vid = localStorage.getItem('verna_vid') || '';
    if (!info.vid) {
      info.vid = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
        : (Date.now().toString(36) + '-' + Math.random().toString(36).slice(2));
      localStorage.setItem('verna_vid', info.vid);
    }
  } catch (e) {}

  function hexa(buf) {
    return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }
  function hashSimple(s) { // repli si crypto.subtle manque : deux FNV-1a 32 bits
    var h1 = 0x811c9dc5, h2 = 0x01000193 ^ 0x5bd1e995;
    for (var i = 0; i < s.length; i++) {
      h1 ^= s.charCodeAt(i); h1 = Math.imul(h1, 0x01000193);
      h2 ^= s.charCodeAt(s.length - 1 - i); h2 = Math.imul(h2, 0x01000193);
    }
    return ('0000000' + (h1 >>> 0).toString(16)).slice(-8) + ('0000000' + (h2 >>> 0).toString(16)).slice(-8);
  }

  try {
    var n = navigator, parts = [
      n.userAgent || '', n.platform || '', (n.languages || [n.language]).join(','),
      screen.width + 'x' + screen.height + 'x' + screen.colorDepth, String(window.devicePixelRatio || 1),
      (Intl.DateTimeFormat().resolvedOptions().timeZone || ''), String(n.hardwareConcurrency || ''),
      String(n.deviceMemory || ''), String(n.maxTouchPoints || 0)
    ];
    try {
      var c = document.createElement('canvas'); c.width = 220; c.height = 40;
      var x = c.getContext('2d'); x.textBaseline = 'top'; x.font = '16px Arial';
      x.fillStyle = '#f60'; x.fillRect(0, 0, 110, 22); x.fillStyle = '#069'; x.fillText('Verna ✓ 2026 كونسول', 2, 2);
      parts.push(c.toDataURL());
    } catch (e) {}
    try {
      var g = document.createElement('canvas').getContext('webgl');
      var dbg = g && g.getExtension('WEBGL_debug_renderer_info');
      if (dbg) parts.push(g.getParameter(dbg.UNMASKED_VENDOR_WEBGL) + '|' + g.getParameter(dbg.UNMASKED_RENDERER_WEBGL));
    } catch (e) {}
    var s = parts.join('||');
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
        .then(function (h) { info.empreinte = hexa(h); })
        .catch(function () { info.empreinte = hashSimple(s); });
    } else {
      info.empreinte = hashSimple(s);
    }
  } catch (e) {}

  // garder la source même si le client recharge la page sans les paramètres de la pub
  var p = new URLSearchParams(location.search);
  try { if (p.get('fbclid') || p.get('utm_source')) sessionStorage.setItem('verna_src', location.search); } catch (e) {}

  window.vernaGardien = function () {
    var q = p;
    try {
      var mem = sessionStorage.getItem('verna_src');
      if (mem && !p.get('fbclid') && !p.get('utm_source')) q = new URLSearchParams(mem);
    } catch (e) {}
    return {
      empreinte: info.empreinte, vid: info.vid,
      t_page: Math.round((Date.now() - debut) / 100) / 10,
      fbclid: q.get('fbclid') || '', utm_source: q.get('utm_source') || '',
      utm_campaign: q.get('utm_campaign') || '', utm_content: q.get('utm_content') || '',
      referer: document.referrer || '',
      // cookies de Meta (_fbp = ce navigateur, _fbc = clic sur la pub) : le gardien les renvoie à Meta au « confirmé »
      fbp: cookie('_fbp'), fbc: cookie('_fbc')
    };
  };

  function cookie(nom) {
    try {
      var m = document.cookie.match(new RegExp('(?:^|; )' + nom + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]).slice(0, 300) : '';
    } catch (e) { return ''; }
  }
})();
