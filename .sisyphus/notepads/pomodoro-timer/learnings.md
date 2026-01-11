# Learnings

## Project Initialization

### Vite Template Selection
- **Issue**: Initial attempt used wrong template flag, resulting in TypeScript instead of React
- **Solution**: The correct command is `npx -y create-vite@latest pomodoro-timer --template react --no-interactive`
- **Key Templates**:
  - `react` - JavaScript React (what we need)
  - `react-ts` - TypeScript React
  - Use `--template` flag (not `-- --template`)
  - Use `--no-interactive` to skip prompts

### Dark Theme CSS Variables
Successfully set up base theme variables:
```css
--color-bg-primary: #1a1a2e;
--color-bg-secondary: #16213e;
--color-text-primary: #eaeaea;
--color-text-secondary: #a0a0a0;
--color-accent: #f44336;
--color-accent-light: #ff7961;
--color-break: #4caf50;
```

### Project Structure
- Created empty directories: `src/components/`, `src/hooks/`, `src/utils/`
- Cleared default `App.css` to empty file
- Created minimal `App.jsx` with just a heading placeholder
- Modified `index.css` to include theme variables and basic reset

### Development Server
- `npm run dev` successfully starts on `http://localhost:5173/` (or next available port)
- Vite v7.3.1 is being used
