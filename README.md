# 💖 A Special Birthday Surprise for Santhoshi 🌸

> A romantic, premium, interactive 20th birthday digital surprise website crafted for **Santhoshi** turning 20 on **November 24, 2026**.

---

## ✨ Features & Highlights

1. **Page One — Live Birthday Countdown & Secret Access**
   - Precise live countdown to **November 24, 2026, at midnight in Indian Standard Time (IST)** with days, hours, minutes, and seconds.
   - Animated blush pink background, drifting rose petals, floating hearts, and glowing cards.
   - **Secret Code Gate**: Both before and **after the countdown completes**, the website asks for the secret passcode: **`042406`**.
   - When the countdown finishes, it shows: *"The wait is over! Enter your secret code to unlock your birthday surprise 💌"*.
   - Clicking *"Enter Passcode to Unlock Celebration 💌"* prompts for the code **`042406`**.
   - Only when **`042406`** is entered does it celebrate with confetti, unlock the birthday experience, and navigate to the surprise pages!
   - (You can also unlock it early anytime using the code `042406`).

2. **Page Two — Birthday Wishes & Interactive Celebration**
   - Headings: *"Happy 20th Birthday, Santhoshi! 🎂"*
   - Interactive birthday cake with candles that can actually be blown out with a tap/click!
   - Floating balloons, sparkling animations, personalized 20th milestone greetings.
   - Smooth navigation button: *"Let's Begin Our Beautiful Memories →"*.

3. **Page Three — The Memory Lane, Video Surprise & Heartfelt Love Letter**
   - Responsive photo gallery organized into 4 curated sections:
     - *Beautiful Moments ✨*
     - *Crazy Memories 🤪*
     - *Unforgettable Days 💖*
     - *Little Things That Matter 🌷*
   - Soft pink glowing borders, hover zoom animations, and full-screen Lightbox view with captions.
   - **Video Surprise Popup (on the same page)**:
     - Button: *"There's Something Special for You 🎥"*
     - Plays `/videos/birthday_surprise.mp4` with play/pause, volume, and fullscreen controls.
     - Automatically pauses when closed!
   - **Heartfelt Love Letter (on the same page)**:
     - Interactive pink envelope with wax seal stamp.
     - Unfolds with 3D flap animation.
     - Types out the exact heartfelt birthday letter with a typewriter animation.

4. **Atmospheric & Delightful Touches**
   - **Background Music Toggle**: Visible mute/unmute button with equalizer bars (starts paused per policy). Plays `/audio/romantic_bgm.mp3` with automatic Web Audio synthesizer fallback so soothing romantic music always plays!
   - **Floating Heart Cursor Trail**: Subtle glowing hearts drift following the mouse on desktop.
   - **Click Heart Bursts**: Interactive gentle heart bursts when clicking.
   - **Back-to-Top**: Smooth scroll button.
   - **Responsive Design**: Flawlessly optimized for mobile phones, tablets, and desktop displays.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start the Vite development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌐 Deploy to Netlify (Ready in 60 Seconds!)

### Option A: Drag & Drop Deploy (Easiest)
1. Run `npm run build` in this folder.
2. Log into [app.netlify.com](https://app.netlify.com/).
3. Drag and drop the generated `dist` folder into the Netlify "Sites" dropzone.
4. Your website is instantly live!

### Option B: Deploy via GitHub / Git Repository
1. Push this folder to a GitHub repository.
2. In Netlify, click **"Add new site"** -> **"Import an existing project"**.
3. Select your repository.
4. Netlify will automatically detect:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**! The included `netlify.toml` automatically configures routing.

---

## 📸 How to Customize Images, Video & Message

### 1. Replacing Photos
- Drop Santhoshi's photos into `public/images/` named `moment1.jpg` through `moment12.jpg` (or any name you like).
- To change captions or add more photos, edit `src/data/memories.js`.

### 2. Replacing the Surprise Video
- Replace `public/videos/birthday_surprise.mp4` with your own MP4 video.

### 3. Personalizing the Love Letter
- Open `src/data/birthdayMessage.js` and modify the paragraphs, date, or sign-off.

---

## 🔑 Secret Passcode

- **Passcode:** `042406` (also accepts `0424` as fallback)
- Tested and verified for instant access.
