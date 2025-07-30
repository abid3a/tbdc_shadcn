# Layout Components

## Overview

Layout components provide the structural foundation for the application, organizing content and navigation in a consistent and accessible manner. They include the sidebar, peek panels, navigation elements, and main layout containers.

## Sidebar

### Description
The sidebar serves as the primary navigation hub, providing role-based menu items and quick access to key application features.

### Structure

```
┌─────────────────────────────┐
│  Logo/Brand                 │
├─────────────────────────────┤
│  Navigation Menu            │
│  ┌─────────────────────────┐ │
│  │  Dashboard              │ │
│  │  Sessions               │ │
│  │  Meetings               │ │
│  │  Connections            │ │
│  │  Reports                │ │
│  └─────────────────────────┘ │
├─────────────────────────────┤
│  User Profile               │
│  ┌─────────────────────────┐ │
│  │  Avatar                 │ │
│  │  Name                   │ │
│  │  Role                   │ │
│  └─────────────────────────┘ │
└─────────────────────────────┘
```

### Navigation Items

#### Core Navigation
- **Dashboard**: Overview and key metrics
- **Sessions**: Session management and scheduling
- **Meetings**: Meeting coordination and history
- **Connections**: Contact and network management
- **Reports**: Analytics and reporting tools

#### Role-Based Items
- **Founders**: Company management, pitch materials
- **Mentors**: Session scheduling, mentee management
- **Partners**: Program oversight, analytics
- **Admins**: User management, system configuration

### Behavior

#### Collapsible
- **Toggle**: Hamburger menu or collapse button
- **Animation**: Smooth slide transition
- **State**: Remembers user preference
- **Mobile**: Auto-collapse on small screens

#### Active States
- **Current Page**: Highlighted with primary color
- **Hover**: Subtle background color change
- **Focus**: Clear focus indicator for keyboard

#### Responsive Behavior
- **Desktop**: Always visible, full width
- **Tablet**: Collapsible, overlay on mobile
- **Mobile**: Overlay mode, backdrop blur

## PeekPanel

### Description
Side drawer component for viewing detailed information about sessions, meetings, or connections without navigating away from the current page.

### Variants

#### Session Peek
- **Content**: Session details, agenda, participants
- **Actions**: Join, reschedule, cancel
- **Metadata**: Date, time, duration, location

#### Meeting Peek
- **Content**: Meeting details, attendees, notes
- **Actions**: Join, edit, delete
- **Metadata**: Date, time, attendees, location

#### Connection Peek
- **Content**: Profile, bio, contact information
- **Actions**: Message, favorite, connect
- **Metadata**: Role, organization, tags

### Structure

```
┌─────────────────────────────┐
│  Header                     │
│  ┌─────────────────────────┐ │
│  │  Title                  │ │
│  │  Close Button           │ │
│  └─────────────────────────┘ │
├─────────────────────────────┤
│  Content Area               │
│  ┌─────────────────────────┐ │
│  │  [Scrollable content]   │ │
│  │                         │ │
│  │                         │ │
│  │                         │ │
│  └─────────────────────────┘ │
├─────────────────────────────┤
│  Footer (Actions)           │
│  ┌─────────────────────────┐ │
│  │  [Action buttons]       │ │
│  └─────────────────────────┘ │
└─────────────────────────────┘
```

### Behavior

#### Opening
- **Trigger**: Card click, button click
- **Animation**: Slide in from right
- **Focus**: Trapped within panel content
- **Backdrop**: Optional overlay

#### Closing
- **Methods**: Close button, escape key, outside click
- **Animation**: Slide out to right
- **Focus**: Returns to triggering element

#### Content Management
- **Scrolling**: Internal scroll for long content
- **Loading**: Skeleton or spinner for dynamic content
- **Error**: Error state with retry option

## Main Layout

### Description
The main layout component provides the overall page structure, combining the sidebar, header, and content area.

### Structure

```
┌─────────────────────────────────────────────────┐
│  Header                                        │
│  ┌─────────────────────────────────────────────┐ │
│  │  Page Title | Breadcrumbs | User Actions   │ │
│  └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│  Sidebar  │  Main Content Area                 │
│  ┌──────┐ │  ┌─────────────────────────────────┐ │
│  │ Nav  │ │  │  Page Content                   │ │
│  │ Menu │ │  │                                 │ │
│  │      │ │  │  [Cards, Tables, Forms, etc.]   │ │
│  │      │ │  │                                 │ │
│  └──────┘ │  └─────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Header Section

#### Page Title
- **Style**: Large, bold typography
- **Breadcrumbs**: Navigation context
- **Actions**: Page-specific buttons and controls

#### User Actions
- **Profile**: User avatar and dropdown
- **Notifications**: Notification bell and count
- **Settings**: Quick access to user preferences

### Content Area

#### Responsive Grid
- **Mobile**: Single column, full width
- **Tablet**: Two columns with sidebar
- **Desktop**: Multi-column with full sidebar

#### Content Types
- **Cards**: Information cards in grid layout
- **Tables**: Data tables with pagination
- **Forms**: Input forms and controls
- **Charts**: Data visualization components

## Navigation Elements

### Breadcrumbs

#### Purpose
Provide navigation context and allow users to navigate back through the page hierarchy.

#### Structure
```
Home > Dashboard > Sessions > Session Details
```

#### Behavior
- **Clickable**: Each level is clickable
- **Current**: Last item shows current page
- **Responsive**: Collapse on mobile with ellipsis

### Pagination

#### Purpose
Navigate through large datasets or content lists.

#### Components
- **Previous/Next**: Arrow buttons
- **Page Numbers**: Direct page navigation
- **Page Size**: Items per page selector
- **Total Count**: Total items indicator

#### Behavior
- **Current Page**: Highlighted with primary color
- **Disabled States**: Previous/next when at limits
- **Loading**: Disabled during data loading

### Search and Filters

#### Search Bar
- **Placement**: Header or content area
- **Behavior**: Real-time search with debouncing
- **Results**: Dropdown or full page results

#### Filter Controls
- **Types**: Dropdown, checkboxes, date pickers
- **Layout**: Horizontal or vertical arrangement
- **State**: Clear all filters option

## Responsive Design

### Breakpoint Strategy

#### Mobile (320px - 768px)
- **Sidebar**: Overlay mode, hamburger menu
- **Content**: Single column, full width
- **Navigation**: Bottom navigation or drawer
- **Touch**: Optimized touch targets

#### Tablet (768px - 1024px)
- **Sidebar**: Collapsible, partial width
- **Content**: Two-column layout
- **Navigation**: Standard sidebar navigation
- **Interaction**: Touch and mouse optimized

#### Desktop (1024px+)
- **Sidebar**: Always visible, full width
- **Content**: Multi-column layout
- **Navigation**: Full sidebar with all features
- **Interaction**: Mouse optimized

### Layout Adaptations

#### Sidebar Behavior
- **Desktop**: Fixed position, always visible
- **Tablet**: Collapsible with overlay option
- **Mobile**: Overlay only, backdrop blur

#### Content Flow
- **Desktop**: Side-by-side with sidebar
- **Tablet**: Below header, beside collapsed sidebar
- **Mobile**: Full width, below header

## Accessibility Features

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through layout
- **Focus Management**: Clear focus indicators
- **Skip Links**: Skip to main content
- **Keyboard Shortcuts**: Common navigation shortcuts

### Screen Reader Support
- **Landmarks**: Proper ARIA landmarks
- **Labels**: Descriptive labels for navigation
- **Announcements**: Dynamic content changes
- **Structure**: Semantic HTML structure

### Visual Accessibility
- **Contrast**: High contrast color schemes
- **Spacing**: Adequate spacing for touch targets
- **Typography**: Readable font sizes and weights
- **Motion**: Respects reduced motion preferences

## Implementation Examples

### Main Layout Structure
```tsx
<MainLayout>
  <Sidebar />
  <div className="flex-1 flex flex-col">
    <Header />
    <main className="flex-1 p-6">
      <PageContent />
    </main>
  </div>
</MainLayout>
```

### PeekPanel Usage
```tsx
<PeekPanel
  isOpen={showSessionPeek}
  onClose={() => setShowSessionPeek(false)}
  title="Session Details"
>
  <SessionDetails session={selectedSession} />
  <div className="flex gap-2 justify-end mt-4">
    <Button variant="secondary" onClick={() => setShowSessionPeek(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleJoinSession}>
      Join Session
    </Button>
  </div>
</PeekPanel>
```

### Responsive Sidebar
```tsx
<Sidebar
  isCollapsed={isSidebarCollapsed}
  onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
  className="lg:translate-x-0 lg:static lg:inset-0 z-50"
>
  <NavigationMenu items={navigationItems} />
</Sidebar>
``` 