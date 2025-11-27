# The Little Yogi Dashboard

A pixel-perfect React.js frontend recreation of "The Little Yogi" educational platform dashboard, built with React and TailwindCSS.

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## 📸 Required Images

To complete the pixel-perfect recreation, please provide the following images. Place them in the `public/images/` directory:

### Hero Section
- **`chariot.png`** - Krishna & Arjuna in chariot illustration (approximately 500x300px)
  - Should show Krishna (blue-skinned, crown with peacock feather) and Arjuna (mustachioed, crown) in a golden chariot pulled by white horses on clouds

### Course Card (Little Yogi)
- **`krishna.png`** - Young Krishna illustration (approximately 96x128px)
  - Young, smiling Krishna with garland
- **`arjuna.png`** - Young Arjuna illustration (approximately 112x128px)
  - Young boy (Arjuna) with dark hair, serene expression, sitting cross-legged, reading a book
- **`scroll.png`** (optional) - Scroll texture/background if you want to overlay it

### Teacher Note Card
- **`teacher.png`** - Ms. Guru avatar (approximately 64x64px, circular)
  - Cartoon illustration of a meditating sage with white beard and hair

### Decorative Elements (Optional)
- **`lotus.png`** - Lotus flower decorative element
- **`cloud.png`** - Cloud decorative element

## 🖼️ Image Integration

Once you have the images, update the following components:

1. **HeroSection.jsx** - Replace the placeholder div with:
   ```jsx
   <img src="/images/chariot.png" alt="Krishna and Arjuna" className="w-full h-full object-contain" />
   ```

2. **CourseCard.jsx** - Replace the placeholder divs with:
   ```jsx
   <img src="/images/krishna.png" alt="Young Krishna" className="w-24 h-32 object-contain" />
   <img src="/images/arjuna.png" alt="Young Arjuna" className="w-28 h-32 object-contain" />
   ```

3. **TeacherNoteCard.jsx** - Replace the placeholder div with:
   ```jsx
   <img src="/images/teacher.png" alt="Ms. Guru" className="w-16 h-16 rounded-full object-cover" />
   ```

## 🎨 Design Features

- **Hero Section**: Sky gradient background (light blue → orange → pink) with decorative clouds and lotus flowers
- **Countdown Timer**: Live countdown with Om symbol
- **Glossy Buttons**: 3D glossy effect with hover animations
- **Scroll Texture**: Parchment-like texture for the course card
- **Progress Bar**: Animated progress bar with milestone icons (star, chariot, temple)
- **Card Shadows**: Soft, subtle shadows for depth
- **Responsive Design**: Works on desktop and tablet devices

## 📁 Project Structure

```
├── public/
│   └── images/          # Place your images here
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── HeroSection.jsx
│   │   ├── CourseCard.jsx
│   │   ├── ProgressCard.jsx
│   │   ├── TeacherNoteCard.jsx
│   │   ├── AssignmentCard.jsx
│   │   ├── QuizCard.jsx
│   │   └── SystemCheckCard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎯 Components

- **Dashboard**: Main container that assembles all sections
- **HeroSection**: Top banner with gradient, countdown, and CTA button
- **CourseCard**: "Little Yogi" course introduction card with scroll texture
- **ProgressCard**: Student progress tracking with animated progress bar
- **TeacherNoteCard**: Teacher message card with avatar
- **AssignmentCard**: Assignment upload card
- **QuizCard**: Quiz start card
- **SystemCheckCard**: System status check card

## 🛠️ Technologies

- React 18
- TailwindCSS 3
- Vite
- PostCSS
- Autoprefixer

## 📝 Notes

- All colors, gradients, shadows, and spacing are designed to match the original screenshot exactly
- Custom CSS utilities are used for effects that Tailwind cannot replicate (glossy buttons, scroll texture, etc.)
- The layout is responsive and will adapt to tablet and desktop screens
- Placeholder divs are included for all illustrations - replace them with actual images once provided

# StudentLogin-Ui
