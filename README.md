# 🍅 Pomodoro Timer

**English** | [中文](docs/README.zh-CN.md)

A modern Pomodoro timer application built with React and Vite, designed to boost your productivity through a clean interface and practical features.

## ✨ Features

- **Efficient Timer**: Strictly follows the Pomodoro Technique (25 min work / 5 min break).
- **Dynamic Background Effects**:
  - Focus Mode (Work): Background turns to an energetic tomato red (`#FF6347`).
  - Break Mode: Background transitions to a relaxing lawn green (`#4CAF50`).
- **Smart Theme Management**: Supports light mode, dark mode, and system preference detection.
- **Activity Heatmap**: Displays your Pomodoro completion history over the past 12 weeks, similar to GitHub's contribution graph, helping you track your productivity.
- **Persistent Storage**: Your history and theme preferences are automatically saved to the browser's `localStorage`.
- **Audio Notifications**: Plays a crisp notification sound via the Web Audio API when each phase completes.
- **Cross-Platform Responsive**: Responsive design that looks great on both mobile and desktop devices.

## 📸 Screenshots

![screenshot.png](./assets/screenshot.png)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pomodoro-timer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (no external CSS frameworks)
- **State Management**: React Hooks (useState, useEffect, useCallback, useRef)
- **Data Storage**: LocalStorage API
- **Audio**: Web Audio API

## 📂 Project Structure

```text
src/
├── App.jsx              # Main application component
├── App.css              # Application-level styles
├── index.css            # Global variables, theme tokens, and base styles
├── main.jsx             # Entry point
├── components/
│   ├── Timer.jsx        # Timer display and control component
│   ├── Timer.css
│   ├── HeatMap.jsx      # Activity heatmap component
│   └── HeatMap.css
├── hooks/
│   ├── useTimer.js      # Core timer logic (countdown, mode switching)
│   ├── usePomodoro.js   # History tracking and persistence
│   ├── useTheme.js      # Theme switching logic (light/dark/system)
│   └── useRunningBackground.js  # Dynamic background effects during running state
└── utils/
    └── sound.js         # Web Audio API notification sounds
```

## 📄 License

This project is licensed under the [MIT](LICENSE) License.
