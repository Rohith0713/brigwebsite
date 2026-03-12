# Brig Radio 📻

> **Social discovery based on shared listening. Experience music together, in real-time.**

[![Live Site](https://img.shields.io/badge/Live-brigradio.jo3.org-blue?style=for-the-badge)](https://brigradio.jo3.org)
[![Android App](https://img.shields.io/badge/Download-Android_APK-green?style=for-the-badge&logo=android)](https://brigradio.jo3.org/BRIGRADIO.apk)

---

## ✨ Overview

Brig Radio is a premium social music discovery platform that bridges the gap between solitary listening and community experience. Built with a focus on high-fidelity interactions and smooth visual storytelling, it allows users to connect through the universal language of music.

### Core Features
- **Real-time Synchronization**: Listen to the same tracks simultaneously with friends.
- **Dynamic Discovery**: Uncover hidden gems through community-driven playlists.
- **Premium UI/UX**: A human-designed interface featuring glassmorphism, silk-smooth GSAP animations, and a responsive layout.
- **Cross-Platform Accessibility**: Available on the web and as a standalone Android application.

---

## 🚀 Tech Stack

### Frontend Architecture
- **Framework**: [React 19](https://react.dev/) with TypeScript
- **State Management**: React Hooks & Context API
- **Build Engine**: [Vite 7](https://vitejs.dev/)

### Design & Motion
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```bash
brig-site/
├── .git/                 # Version control history
├── app/                  # Comprehensive Frontend Application
│   ├── public/           # Static assets (including APK)
│   ├── src/              # Source code
│   │   ├── components/   # Atomic UI components
│   │   ├── sections/     # Modular page sections (Navbar, Hero, etc.)
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions (cn, etc.)
│   ├── tailwind.config.js # Design system tokens
│   └── vite.config.ts    # Build & Alias configuration
└── README.md             # This comprehensive guide
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v20 or higher
- **Package Manager**: npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd brig-site
   ```

2. **Navigate to the application folder**:
   ```bash
   cd app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

Start the development server with HMR:
```bash
npm run dev
```

### Production Build

Generate a highly optimized production bundle:
```bash
npm run build
```

---

## 📲 Android Application

The mobile version of Brig Radio provides a native experience for on-the-go listening.

1. **Download**: Click the [Download APK](https://brigradio.jo3.org/BRIGRADIO.apk) button on the site.
2. **Install**: Enable "Install from Unknown Sources" in your Android settings.
3. **Enjoy**: Log in and start listening.

---

## 🌐 Deployment

The project is currently deployed at [brigradio.jo3.org](https://brigradio.jo3.org) via GitHub Pages.

To deploy manual updates:
```bash
npm run deploy
```

---

## 🤝 Contributing

We welcome contributions that align with our "Human Designed" philosophy.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
*Created with ♥ by the Brig Radio Team • Human Designed • Premium Experience*
