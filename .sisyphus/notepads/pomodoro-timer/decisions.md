# Decisions

## Technology Stack
- **Framework**: Vite + React (JavaScript, not TypeScript)
- **Styling**: Vanilla CSS with CSS variables
- **Version Control**: Git initialized with master branch

## CSS Architecture
- Using CSS custom properties for theming
- Dark theme as default (no light mode planned)
- Color palette focused on tomato-red accent (#f44336) for Pomodoro theme
- Global reset with box-sizing: border-box

## File Organization
- Organized by feature type: components/, hooks/, utils/
- Keeping App.css empty initially (component-specific styles later)
- All global styles and theme variables in index.css
