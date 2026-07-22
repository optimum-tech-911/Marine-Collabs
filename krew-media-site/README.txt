KREW MEDIA — Landing page (v1 test build)
==========================================

WHAT'S INSIDE
  index.html            → the whole site (HTML + CSS + JS in one file)
  assets/hero.mp4       → hero background video, 1080p (2.1 MB)
  assets/hero-720.mp4   → lighter video for mobile/slow connections (1.5 MB)
  assets/hero-poster.jpg→ still frame shown before/instead of the video
  assets/creators/*.png → the 12 creator profile photos

HOW TO TEST IT
  Option A — open locally
    Double-click index.html. It opens in your browser.
    (Some browsers block autoplay of a local video file — if the hero
     shows the still image instead of the moving video, that's just the
     local-file rule; it plays fine once hosted, see Option B.)

  Option B — put it online in 30 seconds (recommended, video always plays)
    Go to https://app.netlify.com/drop and drag this whole folder in.
    You get a live URL instantly. (Same idea works on Bolt or Vercel.)

WHAT CHANGED VS THE MOCKUP
  • Real video hero (Norway / Lofoten), darkened for legibility
  • Your 12 real creators, real photos, real numbers + category filter
  • Numbers count up as you scroll; verified vs estimated is labelled
  • No booking system — the CTAs go straight to:
      WhatsApp  → +33 6 05 51 86 10
      Phone     → +33 6 05 51 86 10
      Email     → adrien.cazanave@gmail.com
  • Sourced stats (Nielsen 88%, Edelman 60%, Reech 3/4, ARPP 587 M€)

TO EDIT LATER
  • Creator list: edit the CREATORS array near the bottom of index.html
  • Map pins / regions: edit the PINS array just below it
  • Colours & fonts: the :root block at the top of the <style> section
  • Contact number/email: search the file for "33605518610" and the email
