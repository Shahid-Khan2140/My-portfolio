# Deployment Guide for Your Portfolio

Since your portfolio is a static website (HTML, CSS, JavaScript), you have several free and easy options to host it online.

## Option 1: Netlify Drop (Easiest & Fastest)

_Best for getting a link instantly without using Git._

1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Open your file explorer to `d:\Projects\other`.
3.  Drag and drop the entire `My portfolio` folder onto the specific area on the Netlify page.
4.  **Done!** Netlify will generate a live URL for you (e.g., `random-name-1234.netlify.app`).
5.  (Optional) Sign up/Log in to claim the site and change the site name to something like `shahid-khan-portfolio.netlify.app`.

## Option 2: GitHub Pages (Professional Standard)

_Best if you want to keep your code committed and have a professional `username.github.io` link._

1.  **Create a Repository:**
    - Log in to [GitHub](https://github.com/).
    - Create a new public repository (e.g., `portfolio`).
2.  **Push Your Code:**
    - Open your terminal in VS Code (`Ctrl+``).
    - Run these commands:
      ```bash
      git init
      git add .
      git commit -m "Initial commit"
      git branch -M main
      git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
      git push -u origin main
      ```
    - _(Replace `YOUR_USERNAME` with your actual GitHub username)_
3.  **Enable Pages:**
    - Go to your repository **Settings** > **Pages**.
    - Under **Source**, select `main` branch and `/ (root)` folder.
    - Click **Save**.
    - Your site will be live at `https://YOUR_USERNAME.github.io/portfolio/`.

## Option 3: Vercel

_Excellent performance and easy integration with GitHub._

1.  Go to [vercel.com](https://vercel.com) and sign up/login with GitHub.
2.  Click **"Add New..."** > **"Project"**.
3.  Import the GitHub repository you created in Option 2.
4.  Click **Deploy**.
5.  Vercel will give you a live URL and automatically update the site whenever you push changes to GitHub.

---

### Important Pre-Deployment Check

Before deploying, ensure all your assets are working correctly.

- Open `index.html` in your browser one last time.
- Check that all images (especially the new ones in `assets/`) are loading.
- Test the "Resume" button and social links.
