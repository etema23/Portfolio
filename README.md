# Portfolio Website

A personal portfolio website for a Computer Science major, featuring a matcha and nature-inspired theme with smooth animations and interactive components.

## Features

- **Intro** — Hero section with introduction and scroll indicator
- **About Me** — Profile section with photo and photo gallery slider
- **What I Do** — Services/offerings overview
- **Projects** — Grid of project cards with images, descriptions, and tech tags
- **Skills** — Technical skills displayed as colorful badges
- **Leadership & Involvement** — Animated timeline of experiences
- **Resume** — Click-to-reveal email contact for resume requests
- **Book of the Month** — Year and month selector for book recommendations
- **Matcha Game** — Interactive matcha-making simulation (hot/cold, add ingredients)
- **Footer** — Contact info with auto-updating year

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid, animations)
- Vanilla JavaScript

## Project Structure

```
Portfolio Web/
├── index.html      # Main HTML structure
├── styles.css      # All styling
├── script.js       # Interactivity and game logic
├── Photos/         # Image assets (profile, projects, gallery)
├── PHOTO_INSTRUCTIONS.md  # Guide for adding photos
└── README.md       # This file
```

## Running Locally

1. **Clone or download** the project folder.
2. **Option A — Live Server (recommended):**
   - Open the folder in VS Code
   - Install the "Live Server" extension if needed
   - Right-click `index.html` → "Open with Live Server"

3. **Option B — Open directly:**
   - Double-click `index.html` to open in your browser
   - Note: Some browsers may restrict loading local images; Live Server avoids this.

## Customization

### Photos
- **Profile photo:** Update the `src` in the About Me section (`Photos/image1.jpg` by default).
- **Project images:** Place images in the `Photos/` folder and update each project card's `img src` in `index.html`.
- **Photo gallery:** Edit the `photoData` array in `script.js` with your image paths and captions.

See `PHOTO_INSTRUCTIONS.md` for detailed photo setup.

### Content
- **Personal info:** Edit the intro text, about section, and footer in `index.html`.
- **Projects:** Add or edit project cards in the projects grid.
- **Timeline:** Add leadership/experience items using the template comments in the leadership section.
- **Books:** Update the `booksByYear` object in `script.js` for the Book of the Month section.
- **Resume email:** Update the `mailto` link in the resume section.

## Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Connect the repo to [Vercel](https://vercel.com).
3. Vercel will auto-deploy on every push.

To push updates:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## License

Free to use and customize for your own portfolio.
