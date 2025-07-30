# Design System

## Overview

The TBDC Web Application design system provides a comprehensive set of design tokens, components, and guidelines to ensure consistency across the application.

## Visual Identity

### Color Palette

#### Primary Colors
- **Primary Blue**: `#2563eb` - Trust and professionalism
- **Secondary Gray**: `#6b7280` - Neutral and balanced

#### Semantic Colors
- **Success**: `#10b981` - Positive actions and status
- **Warning**: `#f59e0b` - Caution and alerts
- **Error**: `#ef4444` - Errors and destructive actions

#### Background Colors
- **White**: `#ffffff` - Primary background
- **Light Gray**: `#f9fafb` - Secondary background
- **Dark Gray**: `#1f2937` - Text and dark elements

### Typography

#### Font Family
- **Primary**: Inter - Clean and modern
- **Fallback**: System fonts (San Francisco, Segoe UI, Roboto)

#### Font Sizes
- **Base**: 16px (1rem)
- **Small**: 14px (0.875rem)
- **Large**: 18px (1.125rem)
- **Heading 1**: 32px (2rem)
- **Heading 2**: 24px (1.5rem)
- **Heading 3**: 20px (1.25rem)
- **Heading 4**: 18px (1.125rem)

#### Line Heights
- **Body**: 1.5 (24px)
- **Headings**: 1.2
- **Compact**: 1.25

### Spacing System

#### Base Unit
- **4px** - Fundamental spacing unit

#### Spacing Scale
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)
- **3xl**: 64px (4rem)

#### Container Padding
- **Mobile**: 16px
- **Tablet**: 24px
- **Desktop**: 32px

### Shadows and Elevation

#### Shadow Levels
- **sm**: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- **md**: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- **lg**: `0 10px 15px -3px rgb(0 0 0 / 0.1)`
- **xl**: `0 20px 25px -5px rgb(0 0 0 / 0.1)`

### Border Radius

#### Radius Values
- **sm**: 4px
- **md**: 8px
- **lg**: 12px
- **xl**: 16px
- **full**: 9999px

## Component Architecture

### Component Categories

#### 1. Layout Components
- **Sidebar**: Navigation and menu structure
- **Header**: Top navigation and user controls
- **Main Layout**: Page structure and content area
- **Grid System**: Responsive layout framework

#### 2. Card Components
- **SessionCard**: Session information display
- **MeetingCard**: Meeting details and actions
- **ConnectionCard**: Contact and profile information
- **ReportCard**: Document and report preview

#### 3. Interactive Components
- **Buttons**: Primary, secondary, and tertiary actions
- **Forms**: Input fields, selects, and form controls
- **Modals**: Overlay dialogs and confirmations
- **Tabs**: Content organization and navigation

#### 4. Feedback Components
- **Alerts**: Success, warning, and error messages
- **Loading States**: Spinners and skeleton screens
- **Notifications**: Toast messages and banners
- **Progress Indicators**: Status and completion tracking

### Component States

#### Standard States
- **Default**: Normal appearance
- **Hover**: Mouse interaction feedback
- **Active**: Pressed or selected state
- **Disabled**: Inactive or unavailable state
- **Loading**: Processing or loading state
- **Error**: Error or invalid state

#### Interactive States
- **Focus**: Keyboard navigation focus
- **Selected**: Multi-select or radio button selection
- **Expanded**: Accordion or dropdown open state
- **Collapsed**: Accordion or dropdown closed state

## Responsive Breakpoints

### Mobile (320px - 768px)
- Single column layout
- Stacked navigation
- Touch-optimized interactions
- Simplified content display

### Tablet (768px - 1024px)
- Two-column layout
- Sidebar navigation
- Enhanced content display
- Touch and mouse interactions

### Desktop (1024px+)
- Multi-column layout
- Full sidebar navigation
- Rich content display
- Mouse-optimized interactions

## Design Tokens

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Typography */
  --font-family-primary: 'Inter', system-ui, sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

## Implementation Guidelines

### CSS Guidelines
- Use Tailwind CSS utility classes for consistent styling
- Leverage CSS custom properties for theming
- Follow mobile-first responsive design
- Optimize for performance with efficient selectors

### Component Guidelines
- Build reusable and composable components
- Include proper TypeScript prop validation
- Implement error boundaries and fallbacks
- Ensure accessibility compliance

### Naming Conventions
- **Components**: PascalCase (e.g., `SessionCard`)
- **Files**: kebab-case (e.g., `session-card.tsx`)
- **CSS Classes**: kebab-case (e.g., `session-card`)
- **Variables**: camelCase (e.g., `sessionData`)

## Quality Standards

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios

### Performance Requirements
- Fast loading times (< 3 seconds)
- Smooth animations (60fps)
- Optimized bundle size
- Efficient rendering

### Testing Requirements
- Visual regression testing
- Component unit testing
- Accessibility testing
- Cross-browser compatibility 