# AI Image Prompts for foss.compare Assets

Use these prompts with "nanoBanana" or another image generator to create the branding assets for the site.

## 1. App Icon (Square Logo)
This will be used for the favicon, app launcher icon, and home screen icon.

**Prompt Idea 1 (Modern/Abstract):**
> A minimalist, high-contrast logo for a tech comparison website. The central element is a stylized scale or balance beam, simplified into geometric shapes. One side represents a lock (privacy/security), the other side represents a server rack (self-hosting). The style should be flat vector art, clean lines, vibrant blue and white color scheme on a dark background. Professional, trustworthy, software engineer aesthetic. --ar 1:1

**Prompt Idea 2 (Literal/Tech):**
> An isometric icon of a server rack transforming into a magnifying glass. The server rack is sleek, glowing blue LEDs. The magnifying glass lens shows binary code. High-tech, futuristic, clean 3D render style, white background, soft shadows. --ar 1:1

**Prompt Idea 3 (Simple Lettermark):**
> A bold, modern lettermark logo for "FC" (Foss Compare). The letters are constructed from circuit board traces and server nodes. Electric blue and cyan gradients. Minimalist, tech startup vibe. Vector illustration. --ar 1:1

**Instructions:**
1.  Generate the image.
2.  Pick the best one.
3.  Resize/Crop it to be a perfect square.
4.  Save as:
    *   `public/icon-192.png` (192x192 pixels)
    *   `public/icon-512.png` (512x512 pixels)
    *   `public/apple-touch-icon.png` (180x180 pixels)
    *   `public/favicon.ico` (Convert a 32x32 version to .ico format)

---

## 2. Social Sharing Image (Open Graph)
This is the large image people see when you share the link on Twitter/Discord/Slack.

**Prompt Idea:**
> A professional, wide banner image for a software comparison website called "foss.compare". The background is a subtle, dark abstract data visualization network, with nodes connecting in blue and purple. In the center, there is ample negative space for text. On the right side, a 3D illustration of various open-source software logos floating or being analyzed by a scanner. Cyberpunk but clean, corporate tech style. 1200x630 aspect ratio. --ar 1.91:1

**Instructions:**
1.  Generate the image.
2.  Open in an image editor.
3.  Add the text "foss.compare" in a large, bold font (like Inter or Roboto) in the center or left.
4.  Add the tagline "Find the perfect self-hosted solution" below it.
5.  Save as `public/og-image.png` (1200x630 pixels).
