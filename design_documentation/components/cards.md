# Card Components

## Overview

Card components are used throughout the application to display structured information in a consistent, scannable format. They provide a clean way to present data with clear visual hierarchy and interactive elements.

## SessionCard

### Description
Displays key session information including name, date, time, and type in a compact card format.

### Usage
- Sessions Page
- Dashboard (upcoming sessions)
- Session listings

### Props
```typescript
interface SessionCardProps {
  name: string;
  date: Date;
  duration: number; // in minutes
  type: 'workshop' | 'mentorship' | 'networking' | 'pitch';
  mentor?: string[];
  status?: 'upcoming' | 'ongoing' | 'completed';
  location?: string;
}
```

### States
- **Default**: Normal appearance
- **Hovered**: Subtle elevation and cursor pointer
- **Selected**: Opens peek panel with detailed information

### Actions
- **Click**: Opens session peek panel with full details
- **Hover**: Visual feedback with shadow elevation

### Design Specifications
- **Padding**: 16px (1rem)
- **Border Radius**: 8px
- **Shadow**: `shadow-sm` on default, `shadow-md` on hover
- **Background**: White
- **Border**: 1px solid `#e5e7eb`

## MeetingCard

### Description
Card displaying key meeting information such as title, date, time, attendees, and location.

### Usage
- Meetings Page
- Dashboard
- Meeting listings

### Props
```typescript
interface MeetingCardProps {
  title: string;
  date: Date;
  type: 'one-on-one' | 'group' | 'presentation' | 'review';
  attendees: string[];
  location?: string;
  duration?: number; // in minutes
  status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}
```

### States
- **Default**: Normal appearance
- **Hovered**: Subtle elevation and cursor pointer
- **Selected**: Opens peek panel with detailed information

### Actions
- **Click**: Opens meeting peek panel with full details
- **Hover**: Visual feedback with shadow elevation

### Design Specifications
- **Padding**: 16px (1rem)
- **Border Radius**: 8px
- **Shadow**: `shadow-sm` on default, `shadow-md` on hover
- **Background**: White
- **Border**: 1px solid `#e5e7eb`

## ConnectionCard

### Description
Displays contact and profile information for program-related people including mentors, customers, EIRs, and investors.

### Usage
- Connections Page
- Contact lists
- Network overview

### Props
```typescript
interface ConnectionCardProps {
  name: string;
  role: string;
  organization: string;
  type: 'mentor' | 'customer' | 'investor' | 'eir' | 'partner';
  avatar?: string;
  bio?: string;
  tags?: string[];
  isFavorite?: boolean;
  contactInfo?: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
}
```

### States
- **Default**: Normal appearance
- **Hovered**: Subtle elevation and cursor pointer
- **Selected**: Opens peek panel with detailed information
- **Favorited**: Heart icon filled with primary color

### Actions
- **Click**: Opens connection peek panel with full bio and links
- **Heart Click**: Toggle favorite status
- **Hover**: Visual feedback with shadow elevation

### Design Specifications
- **Padding**: 16px (1rem)
- **Border Radius**: 8px
- **Shadow**: `shadow-sm` on default, `shadow-md` on hover
- **Background**: White
- **Border**: 1px solid `#e5e7eb`

## Common Card Patterns

### Layout Structure
```
┌─────────────────────────────┐
│  Header (Title/Name)        │
│  ┌─────────────────────────┐ │
│  │  Avatar/Icon (optional) │ │
│  │  Primary Info           │ │
│  │  Secondary Info         │ │
│  └─────────────────────────┘ │
│  Footer (Actions/Meta)      │
└─────────────────────────────┘
```

### Typography Hierarchy
- **Title**: 18px, font-weight 600, color `#1f2937`
- **Subtitle**: 14px, font-weight 500, color `#6b7280`
- **Body**: 14px, font-weight 400, color `#374151`
- **Meta**: 12px, font-weight 400, color `#9ca3af`

### Interactive Elements
- **Hover State**: Subtle shadow elevation (`shadow-sm` → `shadow-md`)
- **Click Target**: Minimum 44px touch target
- **Focus State**: Clear focus indicator for keyboard navigation
- **Loading State**: Skeleton loader for content

### Responsive Behavior
- **Mobile**: Full width, stacked layout
- **Tablet**: 2-column grid
- **Desktop**: 3-4 column grid with consistent spacing

## Accessibility Features

### Keyboard Navigation
- All cards are focusable with `tabindex="0"`
- Enter key opens peek panel
- Escape key closes peek panel
- Clear focus indicators

### Screen Reader Support
- Semantic HTML structure with proper headings
- Descriptive alt text for avatars and icons
- ARIA labels for interactive elements
- Live regions for dynamic content updates

### Visual Accessibility
- High contrast color ratios
- Clear visual hierarchy
- Consistent spacing and alignment
- Touch-friendly interaction areas

## Implementation Examples

### Basic SessionCard
```tsx
<SessionCard
  name="Product Strategy Workshop"
  date={new Date('2024-01-15T10:00:00Z')}
  duration={90}
  type="workshop"
  mentor={["Sarah Johnson", "Mike Chen"]}
/>
```

### Interactive MeetingCard
```tsx
<MeetingCard
  title="Q1 Review Meeting"
  date={new Date('2024-01-20T14:00:00Z')}
  type="review"
  attendees={["John Doe", "Jane Smith", "Bob Wilson"]}
  location="Conference Room A"
  duration={60}
  status="scheduled"
/>
```

### Rich ConnectionCard
```tsx
<ConnectionCard
  name="Dr. Emily Rodriguez"
  role="Senior Product Manager"
  organization="TechCorp Inc."
  type="mentor"
  avatar="/avatars/emily-rodriguez.jpg"
  bio="Expert in product strategy and user experience design"
  tags={["Product", "UX", "Strategy"]}
  isFavorite={true}
  contactInfo={{
    email: "emily@techcorp.com",
    linkedin: "linkedin.com/in/emily-rodriguez"
  }}
/>
``` 