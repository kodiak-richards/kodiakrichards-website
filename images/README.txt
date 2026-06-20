KODIAKRICHARDS.COM — IMAGE REFERENCE GUIDE
===========================================
All images go in this /images folder.
Use object-fit: cover — containers are already styled for it.
Film aesthetic: slightly warm, slightly muted, candid, natural light.
No stock photos. Coastal San Diego. Human moments.


HOME PAGE (index.html)
-----------------------

hero-beach.jpg
  Section:   Hero background (full-bleed, 100vh)
  Alt text:  "Warm sunset sky over the San Diego coast"
  Reference: site-brief.pdf page 13 — Kodiak at sunset beach with cacti
  Notes:     Warm pink/purple sky. Film grain. Should read well with
             a dark overlay on top. Landscape, ideally 2400×1600px min.
  Apply:     Add to .hero__bg as CSS: background-image: url(images/hero-beach.jpg)

kodiak-sunset-beach.jpg
  Section:   About section — photo left column
  Alt text:  "Kodiak Richards at sunset on the San Diego coast surrounded by coastal cacti"
  Reference: site-brief.pdf page 13 — THE key personal photo
  Notes:     Warm tones. Film grain. The defining image for the site palette.
             Portrait orientation, 4:5 ratio. Roughly 1000×1250px.
  Apply:     Replace <div class="about__img-fill"> with <img src="images/kodiak-sunset-beach.jpg" ...>

offer-one-on-one.jpg
  Section:   Offers grid — 1:1 Work card image
  Alt text:  "Kodiak Richards in a coaching conversation"
  Reference: Any candid personal photo — a quiet moment, reading, writing,
             outdoors. NOT posed. Film look.
  Notes:     Landscape 16:10 ratio. Warm tones preferred.
  Apply:     Replace placeholder <div> inside .offer-card__placeholder with <img>

offer-community.jpg
  Section:   Offers grid — Pocket of Humanity card image
  Alt text:  "People gathered in genuine connection"
  Reference: A photo of a group gathering — IRL event, dinner, outdoor.
             Or a single evocative nature/coastal shot that suggests community.
  Notes:     Landscape 16:10 ratio.
  Apply:     Replace placeholder <div> inside .offer-card__placeholder with <img>

og-home.jpg
  Section:   Open Graph / social share image
  Notes:     1200×630px. Can be the hero image cropped, or a composite.


1:1 WORK PAGE (one-on-one.html)
--------------------------------

og-one-on-one.jpg
  Section:   Open Graph / social share image
  Notes:     1200×630px.


COMMUNITY PAGE (community.html)
---------------------------------

hero-forest.jpg
  Section:   Hero background (full-bleed, 100vh)
  Alt text:  "Sunlight filtering through a coastal forest"
  Reference: site-brief.pdf pages 9–11 — forest, nature, earth tones,
             dappled light, deep greens and warm browns.
  Notes:     Should read well with dark overlay. Landscape 2400×1600px min.
  Apply:     Add to .hero__bg--forest as CSS: background-image: url(images/hero-forest.jpg)

og-community.jpg
  Section:   Open Graph / social share image
  Notes:     1200×630px.


FUTURE / POST-LAUNCH
---------------------

kodiak-portrait.jpg       — Tighter portrait for any secondary about contexts
kodiak-hiking.jpg         — Outdoor / nature shot for blog or resources page
kodiak-flowers.jpg        — Softer nature shot, warm tones
nature-coastline.jpg      — Wide coastal shot, San Diego shoreline
nature-trees.jpg          — Forest floor or tree canopy, warm dappled light
irl-event-01.jpg          — IRL San Diego gathering photo


PALETTE REFERENCE (match when color-grading photos)
-----------------------------------------------------
Background:   #FAF8F5  warm white
Accent:       #C4956A  warm sand / terra cotta
Dark ground:  #2E1E14  near-black brown
Hero sky:     dusty rose → warm coral → deep earth
Forest tones: muted sage → deep forest green → near black


HOW TO SWAP A PLACEHOLDER
--------------------------
1. Add your image to /images with the filename above.
2. Find the relevant placeholder <div> in the HTML.
3. For hero backgrounds: add to the CSS rule, e.g.
     .hero__bg { background-image: url(images/hero-beach.jpg); }
   (The gradient will still show as fallback if the image fails.)
4. For card/about images: replace the inner <div class="...placeholder...">
   with an <img> tag using the filename and alt text from this file.
5. The container already has object-fit: cover applied.
