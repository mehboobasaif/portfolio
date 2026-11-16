# Mehbooba Saif | Developer Portfolio

A responsive portfolio built with HTML5, CSS3, Bootstrap 5 and JavaScript.

## Folder structure

```text
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/              <- put profile.jpg here
│   └── Mehbooba_Saif_Resume.pdf   <- put your resume here
└── README.md
```

## 1. Add your profile photo

1. Save a square-ish photo (at least 600x600 px) as `assets/images/profile.jpg`.
2. That's it. Until the file exists, the page shows your initials ("MS").
3. If you use a `.png`, change `profile.jpg` to `profile.png` in `index.html` (search for `profile.jpg`).

## 2. Add your resume

Copy your PDF into `assets/` and name it exactly `Mehbooba_Saif_Resume.pdf`.
Both "Download Resume" buttons (hero and Resume section) point to it.
Delete `assets/PLACE_YOUR_RESUME_HERE.txt` afterwards.

## 3. Replace the placeholder links

Open `index.html`, use Find and Replace (Ctrl+H in VS Code), and replace:

| Placeholder | Replace with |
|---|---|
| `YOUR_GITHUB_URL` | `https://github.com/your-username` |
| `YOUR_LINKEDIN_URL` | `https://www.linkedin.com/in/your-profile` |
| `YOUR_EMAIL` | your email address (also in `js/script.js`) |
| `YOUR_FAKE_CURRENCY_GITHUB_URL` / `_DEMO_URL` | links for the Fake Currency project |
| `YOUR_ATS_GITHUB_URL` / `_DEMO_URL` | links for the ATS Resume Analyzer |
| `YOUR_HKS_GITHUB_URL` / `_DEMO_URL` | links for the Haritha Karma Sena project |
| `YOUR_BLOOM_GITHUB_URL` / `_DEMO_URL` | links for Bloom and Petals |

If a project has no live demo, delete its "Live Demo" button so no link is broken.
Search the whole project for `YOUR_` before publishing to make sure none are left.

## 4. Run locally

Option A: double-click `index.html` to open it in your browser.

Option B (recommended): in VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

Option C: from the `portfolio` folder run `python -m http.server 8000`, then visit `http://localhost:8000`.

An internet connection is needed for Bootstrap, icons and fonts (loaded from CDNs).

## 5. Deploy on GitHub Pages

1. Create a new public repository on GitHub, for example `portfolio`.
2. In the `portfolio` folder run:
   ```bash
   git init
   git add .
   git commit -m "Add portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
3. On GitHub open **Settings > Pages**.
4. Under **Build and deployment**, set Source to **Deploy from a branch**, choose branch `main` and folder `/ (root)`, then Save.
5. After a minute or two your site is live at `https://YOUR_USERNAME.github.io/portfolio/`.

Tip: a repository named `YOUR_USERNAME.github.io` is served at `https://YOUR_USERNAME.github.io/` with no sub-path.

## Connecting the contact form later

Right now the form opens the visitor's email app (a `mailto:` link), so nothing is stored. To receive messages directly:

- **Formspree (easiest):** create a form at formspree.io, set `<form action="https://formspree.io/f/YOUR_ID" method="POST">` in `index.html`, add `name="name"`, `name="email"`, `name="message"` to the three fields, and remove the submit handler block in `js/script.js`.
- **Backend:** since you work with Django, you can later post the form to your own endpoint with `fetch()`.
