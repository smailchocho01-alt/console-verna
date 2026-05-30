# Console Verna — Project Brief for Claude Code
> Document de référence complet — à lire entièrement avant de commencer

---

## 1. Contexte du projet

### Le business
- **Store:** pourvotremaison.youcan.store
- **Produit:** Console Verna + Miroir — meuble d'entrée en bois massif
- **Prix:** 11 500 DA
- **Variantes:** Chêne Naturel (clair) / Noyer (foncé)
- **Marché:** Algérie — 58 wilayas
- **Contact client:** WhatsApp +213562637101

### La situation actuelle
- Page produit existante sur YouCan : totalement vide — aucun texte de vente, aucun social proof, aucun CTA fort
- 3 à 5 commandes/jour générées sans vrai système
- CPA actuel : ~2 000 DA — bon signal, le produit convertit
- Trafic source : Facebook/Instagram Ads (audience froide + légèrement tiède)
- Budget pub actuel : 3 000–6 000 DA/jour, scalable selon résultats

### L'objectif
Construire une **landing page indépendante** (fichier HTML autonome, hors YouCan) qui :
1. Convertit mieux que la page actuelle
2. Capture les commandes dans un **Google Sheet** automatiquement
3. Ouvre WhatsApp avec un message pré-rempli après soumission

---

## 2. Ce que Claude Code doit construire

### Livrable principal
Un **fichier HTML unique** — pas de framework, pas de build tool, pas de dépendances externes sauf Google Fonts. Fonctionne en ouvrant le fichier dans un navigateur ou en le déployant sur n'importe quel hébergeur statique (GitHub Pages, Netlify, etc.).

### Livrable secondaire
Un **Google Apps Script** prêt à copier-coller dans Google Sheets pour recevoir les commandes.

---

## 3. Architecture de la page (ordre exact)

### Section 1 — HERO
- Background : `#1a1410` (noir chaud)
- Ligne d'accroche dorée fine en haut : `linear-gradient(90deg, transparent, #c9a96e, transparent)`
- Badge : `✦ Nouveau — Collection Bois Massif`
- H1 : **"Console Verna"**
- Sous-titre : *"Transformez votre entrée en 24h"*
- Typo : Cormorant Garamond (serif) pour le H1, DM Sans pour le reste
- Pas de bouton ici — laisser le visiteur scroller naturellement

**Logique psychologique :** Le visiteur vient d'une pub froide. Pas de CTA immédiat — on vend le rêve d'abord.

---

### Section 2 — GALERIE PHOTOS (7 images réelles)

**URLs des images à utiliser (toutes les 7) :**
```
Image 1 (principale): https://cdn.youcan.shop/stores/0de7b01f2b5a9b634a61117ecd412c03/products/T28gRQtoiX8lLeFdqePviTrB5qrhHuD2dAgTOT8Y.png
Image 2: https://cdn.youcan.shop/stores/0de7b01f2b5a9b634a61117ecd412c03/products/xw8qEaMoSg0yeNi2FtjgwpazHiJpIMjObm9Hhhh1.jpg
Image 3: https://cdn.youcan.shop/stores/0de7b01f2b5a9b634a61117ecd412c03/products/fDwj81SEGh3H8Kbj6ji70GhW9ekhRmGwYaPLbH3Y.jpg
Image 4: https://cdn.youcan.shop/stores/0de7b01f2b5a9b634a61117ecd412c03/products/JdJuBDxoD98tKt0Zf09WPaZAGbV1xVWjLNTFrP3N.jpg
Image 5: https://cdn.youcan.shop/stores/0de7b01f2b5a9b634a61117ecd412c03/products/zFIrwDDZqm9aE7t7YHrkFfCl87qHMHcyoGXCAl0J.jpg
Image 6: https://cdn.youcan.shop/stores/0de7b01f2b5a9b634a61117ecd412c03/products/pRxZrIw8epmO1j5z57Dil5nh0vV2Hj05jyBPWxqT.png
Image 7: https://cdn.youcan.shop/stores/0de7b01f2b5a9b634a61117ecd412c03/products/hDj9jd9XwX1Y9wRwXEfkNxB8bCvYMQpiC6RhebAI.png
```

**Layout galerie :**
- Image principale grande à gauche (cliquable)
- 6 thumbnails à droite en grille 2×3
- Cliquer sur un thumbnail → remplace l'image principale (JS pur)
- Transition douce : `opacity 0.2s ease`
- Pas de lightbox — garder simple

---

### Section 3 — SÉLECTEUR DE FINITION

**Deux options :**
| | Chêne Naturel | Noyer |
|---|---|---|
| Couleur swatch | `radial-gradient(#d4a96a, #a07040)` | `radial-gradient(#7a4e2a, #4a2e10)` |
| Sous-titre | "Clair & chaleureux" | "Foncé & raffiné" |
| Prix affiché | **11 500 DA** | **13 500 DA** |
| Prix barré | ~~14 000 DA~~ | ~~16 000 DA~~ |
| Badge | –18% | –16% |

**Comportement JS :**
- Sélection par défaut : Chêne Naturel
- Cliquer sur une option → met à jour le prix en bas de page ET pré-remplit le champ couleur dans le formulaire
- La couleur sélectionnée doit apparaître dans le message WhatsApp automatiquement

---

### Section 4 — VALUE PROPS (grille 2×2)

| Icône | Titre | Sous-titre |
|---|---|---|
| 🪵 | Bois massif | Qualité certifiée, durable |
| 🔧 | Installation | Service inclus disponible |
| 🚚 | 58 wilayas | Livraison partout en Algérie |
| 🛡️ | Garantie 1 an | SAV réactif |

Style : cards avec `background: #f7f4ef`, `border-radius: 10px`, icône dans un carré doré `rgba(201,169,110,0.15)`

---

### Section 5 — SOCIAL PROOF

**Header :**
- Note globale : **4.9 / 5**
- Étoiles dorées : ★★★★★
- Compteur : "8 avis vérifiés"

**4 avis à afficher :**

| Avatar | Nom | Ville | Texte |
|---|---|---|---|
| SA | Samira A. | Alger | "Exactement ce que je cherchais. Le bois est vraiment de qualité, pas du tout ce qu'on trouve en grande surface. Livrée en 48h à Alger, impeccable." |
| KM | Karim M. | Oran | "L'entrée de la maison a changé du tout au tout. Finition Noyer vraiment élégante. Ma femme adore." |
| NB | Nadia B. | Constantine | "Rapport qualité/prix imbattable. J'ai comparé avec 3 autres boutiques — cette console est dans une autre catégorie." |
| RA | Rachid A. | Annaba | "Livraison rapide, emballage sérieux, produit conforme aux photos. Je recommande sans hésiter." |

Style avatar : cercle `background: rgba(201,169,110,0.2)`, initiales en doré `#c9a96e`

---

### Section 6 — URGENCE STOCK

```
🔥  [████░░░░░░░░░░░░]  Plus que 15 pièces en stock
```

- Barre de progression : 23% remplie (couleur `#c9a96e`)
- Texte : "Plus que **15 pièces** en stock"
- Background card : `#f7f4ef`

---

### Section 7 — FORMULAIRE DE COMMANDE

**C'est le cœur du système.** Remplace le bouton WhatsApp direct.

**Champs :**
```
Votre prénom *        [input text]
Numéro de téléphone * [input tel]
Wilaya *              [select — liste des 58 wilayas]
Finition *            [auto-rempli selon sélection section 3, modifiable]
```

**Bouton submit :**
```
Commander maintenant — Livraison sous 24h  →
```
Style : `background: #1a1410`, `color: #f5ede0`, pleine largeur, 17px padding

**Bouton secondaire :**
```
💬 Poser une question via WhatsApp
```
→ ouvre `https://api.whatsapp.com/send?phone=213562637101`

---

### Section 8 — TRUST BAR (bas de page)

```
• Paiement sécurisé    • Retour 7 jours    • Produit authentique
```

Points dorés `#c9a96e`, texte `#aaa`, `font-size: 11px`

---

## 4. Système de commande — Google Sheets

### Comment ça fonctionne

```
[Visiteur remplit le formulaire]
         ↓
[JS envoie les données au Google Apps Script via fetch POST]
         ↓
[Apps Script écrit une ligne dans Google Sheets]
         ↓
[La page ouvre WhatsApp avec message pré-rempli]
         ↓
[Le propriétaire voit la commande sur WhatsApp ET dans Sheets]
```

### Structure du Google Sheet (colonnes exactes)

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Prénom | Téléphone | Wilaya | Finition | Source | Statut |
| 2026-05-23 14:32 | Karim | 0661234567 | Oran | Noyer | Facebook Ad | Nouveau |

- Colonne G "Statut" : valeur par défaut = "Nouveau" — à changer manuellement en "Confirmé" / "Livré" / "Annulé"

### Message WhatsApp pré-rempli (encodé URL)

```
Bonjour, je souhaite commander la Console Verna.

📋 Détails de ma commande :
- Finition : [COULEUR SÉLECTIONNÉE]
- Wilaya : [WILAYA SAISIE]
- Nom : [PRÉNOM SAISI]
- Téléphone : [TÉLÉPHONE SAISI]

Merci de confirmer la disponibilité.
```

URL format :
```
https://api.whatsapp.com/send?phone=213562637101&text=[MESSAGE ENCODÉ]
```

### Google Apps Script à fournir

Claude Code doit fournir le script complet prêt à copier dans Google Apps Script, avec :
- Réception du POST request
- Écriture dans le Sheet actif
- Retour d'un JSON `{success: true}`
- Gestion CORS pour permettre les appels depuis le HTML

---

## 5. Design System

### Couleurs
```css
--dark:      #1a1410   /* fond hero, bouton principal */
--gold:      #c9a96e   /* accent, étoiles, bordures actives */
--gold-light: rgba(201,169,110,0.15) /* fond icônes, hover */
--bg:        #faf8f5   /* fond page */
--bg-card:   #f7f4ef   /* fond cards */
--border:    #e8e3db   /* séparateurs */
--text:      #1a1410   /* texte principal */
--text-muted:#888      /* texte secondaire */
--cream:     #f5ede0   /* texte sur fond sombre */
```

### Typographie
```
Google Fonts :
- Cormorant Garamond 400/500/600 + italic → titres H1, prix
- DM Sans 300/400/500 → tout le reste
```

### Espacements
- Max-width page : `480px` (mobile-first, centré)
- Padding sections : `1.4rem`
- Gap cards : `8–10px`
- Border-radius cards : `10px`
- Border-radius boutons : `10px`
- Séparateurs : `0.5px solid #e8e3db`

### Animations
- Image principale swap : `opacity 0.2s ease`
- Bouton hover : `background légèrement plus clair`
- Color option active : `border: 1.5px solid #c9a96e`

---

## 6. Liste des 58 wilayas (pour le select)

```
Adrar, Chlef, Laghouat, Oum El Bouaghi, Batna, Béjaïa, Biskra, Béchar,
Blida, Bouira, Tamanrasset, Tébessa, Tlemcen, Tiaret, Tizi Ouzou, Alger,
Djelfa, Jijel, Sétif, Saïda, Skikda, Sidi Bel Abbès, Annaba, Guelma,
Constantine, Médéa, Mostaganem, M'Sila, Mascara, Ouargla, Oran, El Bayadh,
Illizi, Bordj Bou Arréridj, Boumerdès, El Tarf, Tindouf, Tissemsilt,
El Oued, Khenchela, Souk Ahras, Tipaza, Mila, Aïn Defla, Naâma,
Aïn Témouchent, Ghardaïa, Relizane, Timimoun, Bordj Badji Mokhtar,
Ouled Djellal, Béni Abbès, In Salah, In Guezzam, Touggourt, Djanet,
El M'Ghair, El Meniaa
```

---

## 7. Instructions techniques pour Claude Code

### Ce que tu dois produire

**Fichier 1 : `index.html`**
- HTML/CSS/JS dans un seul fichier
- Aucun framework (pas de React, Vue, etc.)
- Google Fonts via CDN uniquement
- Toutes les images chargées depuis les URLs CDN YouCan
- Le formulaire envoie via `fetch()` POST vers l'URL du Apps Script
- L'URL du Apps Script doit être dans une variable facilement modifiable en haut du fichier :
  ```javascript
  const APPS_SCRIPT_URL = "REMPLACER_PAR_URL_APPS_SCRIPT";
  ```

**Fichier 2 : `apps_script.gs`**
- Code Google Apps Script complet
- Instructions commentées ligne par ligne
- Prêt à déployer comme "Web App" (Execute as: Me, Access: Anyone)

### Comportement du formulaire

```javascript
// Ordre des opérations au submit :
1. Valider que tous les champs sont remplis
2. Désactiver le bouton (éviter double-soumission)
3. Afficher "Envoi en cours..."
4. POST vers Apps Script avec les données en JSON
5. Si succès → construire message WhatsApp → ouvrir wa.me
6. Si erreur → afficher message d'erreur, réactiver le bouton
```

### Gestion d'erreur fetch

```javascript
// Si Apps Script inaccessible :
// → ne pas bloquer la commande
// → ouvrir WhatsApp quand même avec les données du formulaire
// → afficher un message discret "Commande enregistrée"
```

**Raison :** En Algérie, les connexions peuvent être instables. La commande WhatsApp doit toujours aboutir même si le Sheets échoue.

---

## 8. Ce qu'on NE fait PAS dans cette phase

- Pas de paiement en ligne
- Pas de système de compte client
- Pas d'intégration YouCan API
- Pas de base de données
- Pas de backend serveur
- Pas d'analytics (Facebook Pixel, GA) — à ajouter en phase 2
- Pas de version desktop élaborée — mobile-first suffit pour cette audience

---

## 9. Questions à discuter avec le client avant de coder

Ces points sont intentionnellement laissés ouverts pour discussion avec Claude Code :

1. **Hébergement :** Où sera déployé le fichier HTML ? (GitHub Pages / Netlify / serveur existant ?)
2. **Domaine :** URL personnalisée ou sous-domaine gratuit ?
3. **Facebook Pixel :** Faut-il l'ajouter maintenant ou en phase 2 ?
4. **Upsell Diffuseur :** Inclure dans le formulaire comme option (+2 500 DA) ou page séparée ?
5. **Langue formulaire :** Français uniquement ou ajouter l'arabe ?

---

## 10. Résumé en une phrase

> Construire une landing page HTML autonome, mobile-first, au design premium bois/doré, avec galerie interactive, sélecteur de variante, formulaire de commande connecté à Google Sheets, et ouverture automatique de WhatsApp avec message pré-rempli — pour vendre la Console Verna à 11 500 DA à une audience froide venant de Facebook Ads en Algérie.

---

*Brief préparé par Claude (Anthropic) — Mai 2026*
*Basé sur 4 sessions de travail : analyse produit, stratégie de vente, creative ads, et architecture technique*
