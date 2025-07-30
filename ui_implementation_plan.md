# TBDC Web App - UI Implementation Plan with shadcn/ui Components

## Overview
This document outlines the shadcn/ui component mapping for the Horizon Web App based on the design, functional, and technical documentation analysis.

## User Flow Integration

### Dashboard Flow Implementation
Based on the functional flow documentation, the Dashboard serves as the default landing page with role-specific content:

#### Common Dashboard Elements
- **Alert** (`alert`) - Announcement banner for upcoming events and urgent updates
- **Card** (`card`) - Preview cards for sessions, meetings, reports, and partner offers
- **Button** (`button`) - "View All" buttons for each section navigation
- **Badge** (`badge`) - Status indicators for upcoming items
- **Skeleton** (`skeleton`) - Loading states for dashboard cards

#### Role-Specific Dashboard Components
- **Founder Dashboard**: Session/meeting previews, mentor interactions, Surge preview, report notifications
- **Partner Dashboard**: Company assignments, meeting highlights, bi-weekly summaries, Surge mentor previews
- **Mentor Dashboard**: Company assignments, upcoming meetings, profile completion banners, Surge requests
- **Admin Dashboard**: User counts, cohort summaries, recent activity, management shortcuts

#### Dashboard Interactions
- **Sheet** (`sheet`) - PeekPanels for session/meeting/report details
- **Navigation** - "View All" buttons route to full module pages
- **Responsive Layout** - Stacked cards with expandable panels for mobile

### Sessions Flow Implementation
The Sessions page provides cohort-filtered session management with interactive cards:

#### Session List Components
- **Card** (`card`) - SessionCard components in scrollable list
- **Tabs** (`tabs`) - Filter tabs: All, Upcoming, Ongoing, Completed
- **Select** (`select`) - Session type and mentor filters
- **Input** (`input`) - Search bar for session titles
- **Badge** (`badge`) - Session type indicators

#### Session Interaction Flow
- **Sheet** (`sheet`) - PeekPanel for session details showing:
  - Title, type, date, time, duration
  - Location (virtual/physical)
  - Description and goals
  - Attendee list with clickable connections
  - "Join Session" button for virtual sessions
- **Button** (`button`) - Join session and navigation actions

#### Connection Integration
- **Avatar** (`avatar`) - Clickable attendee avatars
- **Sheet** (`sheet`) - Nested Connection PeekPanel for attendee details

### Meetings Flow Implementation
The Meetings page provides company-filtered meeting management:

#### Meeting List Components
- **Card** (`card`) - MeetingCard components in chronological order
- **Select** (`select`) - Meeting type and attendee filters
- **Input** (`input`) - Search bar for meeting titles
- **Badge** (`badge`) - Meeting type indicators (Investor, EIR, Customer, Internal)

#### Meeting Interaction Flow
- **Sheet** (`sheet`) - PeekPanel for meeting details showing:
  - Title, type, date, time, location
  - Meeting URL for virtual meetings
  - Description and status (Confirmed, Pending)
  - Attendee list with clickable connections
- **Button** (`button`) - Meeting actions and navigation

#### Attendee Integration
- **Avatar** (`avatar`) - Clickable attendee avatars/names
- **Sheet** (`sheet`) - Connection PeekPanel for attendee context

### Connections Flow Implementation
The Connections page provides cohort-filtered connection management:

#### Connection List Components
- **Card** (`card`) - ConnectionCard components in grid/list layout
- **Toggle Group** (`toggle-group`) - Role tag filters (Mentor, Customer, Investor, EIR)
- **Input** (`input`) - Search by name, organization, or role
- **Button** (`button`) - Favorite/heart actions
- **Badge** (`badge`) - Role tags and indicators

#### Connection Interaction Flow
- **Sheet** (`sheet`) - PeekPanel for connection details showing:
  - Full name, organization, type
  - Bio and profile photo
  - Tags and LinkedIn link
  - Associated sessions/meetings
- **Avatar** (`avatar`) - Connection profile pictures
- **Button** (`button`) - Favorite and contact actions

#### Related Content Navigation
- **Sheet** (`sheet`) - Nested Session/Meeting PeekPanels from connection details
- **Navigation** - Seamless flow between related content

### Surge Flow Implementation
The Surge page provides mentor discovery and booking functionality:

#### Surge Landing Page (External)
- **Card** (`card`) - Hero banner with Surge branding
- **Card** (`card`) - Mentor preview cards with images and tags
- **Button** (`button`) - Call-to-action buttons (Explore, Log In, Request Access)
- **Badge** (`badge`) - Expertise and industry tags

#### Mentor Discovery Interface
- **Card** (`card`) - MentorCard components in grid/list view
- **Input** (`input`) - Search by name, industry, or tags
- **Select** (`select`) - Expertise area, availability, and type filters
- **Button** (`button`) - Book Now and View Details actions
- **Badge** (`badge`) - Expertise and type indicators

#### Mentor Detail Flow
- **Sheet** (`sheet`) - PeekPanel for mentor details showing:
  - Bio, tags, LinkedIn, experience summary
  - Similar mentors carousel
  - Booking actions
- **Card** (`card`) - Similar mentors carousel
- **Button** (`button`) - Book Now and contact actions

#### Booking Flow Components
- **Dialog** (`dialog`) - Booking modal with:
  - Date/time selection
  - Objective/topic input
  - Confirmation flow
- **Calendar** (`calendar`) - Date picker for booking selection
- **Form** (`form`) - Booking form with validation
- **Input** (`input`) - Topic and objective fields
- **Textarea** (`textarea`) - Detailed description field

#### Bookings Management
- **Tabs** (`tabs`) - Upcoming, Past, Cancellations sub-tabs
- **Card** (`card`) - Booking cards with mentor info, date/time, meeting type
- **Button** (`button`) - Join Now, Cancel, Reschedule actions
- **Sheet** (`sheet`) - Booking detail view with calendar add option

#### Account & Wallet (Premium Features)
- **Card** (`card`) - Balance and transaction history
- **Table** (`table`) - Transaction history table
- **Button** (`button`) - Refund request actions

## Core Layout Components

### Main Application Shell
- **Sidebar** (`sidebar`) - Main navigation for all user roles
- **Navigation Menu** (`navigation-menu`) - Top navigation bar with global actions
- **Separator** (`separator`) - Visual dividers between sections
- **Scroll Area** (`scroll-area`) - For scrollable content areas

### Authentication & User Management
- **Form** (`form`) - Login/registration forms
- **Input** (`input`) - Text input fields
- **Label** (`label`) - Form field labels
- **Button** (`button`) - Primary/Secondary action buttons
- **Avatar** (`avatar`) - User profile pictures
- **Dropdown Menu** (`dropdown-menu`) - User profile menu
- **Card** (`card`) - Login form container
- **Alert** (`alert`) - Login error messages
- **Separator** (`separator`) - Visual dividers in login form

## Page-Specific Components

### Login Page
- **Card** (`card`) - Login form container with branding
- **Form** (`form`) - Login form with validation
- **Input** (`input`) - Email and password fields
- **Label** (`label`) - Form field labels
- **Button** (`button`) - Login and demo account buttons
- **Alert** (`alert`) - Error messages and demo account info
- **Separator** (`separator`) - Visual dividers between sections
- **Badge** (`badge`) - Demo account role indicators

### Dashboard Page
- **Card** (`card`) - Dashboard widgets and summary cards
- **Badge** (`badge`) - Status indicators and tags
- **Progress** (`progress`) - Progress bars for goals/tasks
- **Chart** (`chart`) - Data visualizations and analytics
- **Alert** (`alert`) - Announcement banner (replaces custom AnnouncementBanner)
- **Skeleton** (`skeleton`) - Loading states for dashboard cards

### Sessions Page
- **Card** (`card`) - SessionCard component
- **Tabs** (`tabs`) - Session type filtering
- **Input** (`input`) - Search functionality
- **Select** (`select`) - Mentor filter dropdown
- **Badge** (`badge`) - Session type indicators
- **Sheet** (`sheet`) - PeekPanel for session details (replaces custom PeekPanel)
- **Button** (`button`) - Action buttons on session cards

### Meetings Page
- **Card** (`card`) - MeetingCard component
- **Input** (`input`) - Search bar
- **Select** (`select`) - Meeting type and attendee filters
- **Badge** (`badge`) - Meeting type indicators
- **Sheet** (`sheet`) - PeekPanel for meeting details
- **Calendar** (`calendar`) - Meeting scheduling interface
- **Button** (`button`) - Meeting action buttons

### Connections Page
- **Card** (`card`) - ConnectionCard component
- **Input** (`input`) - Search functionality
- **Badge** (`badge`) - Role tags (Mentor, Customer, Investor, EIR)
- **Toggle Group** (`toggle-group`) - Multi-select role filters
- **Sheet** (`sheet`) - PeekPanel for connection details
- **Avatar** (`avatar`) - Connection profile pictures
- **Button** (`button`) - Favorite/heart actions

### Surge Page
- **Card** (`card`) - MentorCard component
- **Input** (`input`) - Search functionality
- **Select** (`select`) - Expertise and location filters
- **Badge** (`badge`) - Expertise tags
- **Dialog** (`dialog`) - Mentor booking modal (replaces custom Modal)
- **Avatar** (`avatar`) - Mentor profile pictures
- **Button** (`button`) - Booking and contact actions

### Admin Dashboard
- **Table** (`table`) - User management and data tables
- **Tabs** (`tabs`) - Module switching (Users, Surge, Reports)
- **Input** (`input`) - Search and filter inputs
- **Select** (`select`) - Role and status filters
- **Button** (`button`) - Export/Import actions
- **Dialog** (`dialog`) - Create/Edit forms
- **Alert Dialog** (`alert-dialog`) - Confirmation dialogs for deletions
- **Badge** (`badge`) - Status indicators
- **Card** (`card`) - Admin dashboard widgets

## Interactive Components

### Forms & Inputs
- **Form** (`form`) - All form implementations
- **Input** (`input`) - Text inputs
- **Textarea** (`textarea`) - Multi-line text inputs
- **Select** (`select`) - Dropdown selections
- **Checkbox** (`checkbox`) - Multi-select options
- **Radio Group** (`radio-group`) - Single-select options
- **Switch** (`switch`) - Toggle controls
- **Slider** (`slider`) - Range inputs
- **Input OTP** (`input-otp`) - Verification codes

### Navigation & Menus
- **Breadcrumb** (`breadcrumb`) - Page navigation
- **Dropdown Menu** (`dropdown-menu`) - Context menus
- **Context Menu** (`context-menu`) - Right-click menus
- **Menubar** (`menubar`) - Application menu bar
- **Command** (`command`) - Command palette/search

### Feedback & Notifications
- **Alert** (`alert`) - Status messages and announcements
- **Sonner** (`sonner`) - Toast notifications
- **Progress** (`progress`) - Loading indicators
- **Skeleton** (`skeleton`) - Loading placeholders
- **Tooltip** (`tooltip`) - Hover information

### Data Display
- **Table** (`table`) - Data tables with sorting/pagination
- **Pagination** (`pagination`) - Page navigation for lists
- **Accordion** (`accordion`) - Collapsible content sections
- **Collapsible** (`collapsible`) - Expandable content
- **Hover Card** (`hover-card`) - Quick preview cards
- **Popover** (`popover`) - Contextual information

### Overlays & Modals
- **Dialog** (`dialog`) - Modal dialogs
- **Sheet** (`sheet`) - Side panels and peek panels
- **Drawer** (`drawer`) - Full-screen overlays
- **Alert Dialog** (`alert-dialog`) - Confirmation dialogs

## Component Mapping Summary

### Replacing Custom Components
- **AnnouncementBanner** → `alert` component
- **PeekPanel** → `sheet` component  
- **Modal** → `dialog` component
- **MeetingCard** → `card` component with custom content
- **SessionCard** → `card` component with custom content
- **ConnectionCard** → `card` component with custom content
- **Buttons** → `button` component with variants
- **LoginForm** → `form` + `card` + `input` components

### Layout Structure
- **Sidebar Navigation** → `sidebar` component
- **Top Navigation** → `navigation-menu` component
- **Page Headers** → `card` with header styling
- **Content Areas** → `scroll-area` component
- **Section Dividers** → `separator` component

### Data Management
- **Tables** → `table` component with built-in sorting
- **Forms** → `form` component with validation
- **Filters** → `select`, `checkbox`, `toggle-group` components
- **Search** → `input` component with search styling
- **Pagination** → `pagination` component

### User Experience
- **Loading States** → `skeleton` component
- **Notifications** → `sonner` component
- **Tooltips** → `tooltip` component
- **Hover Effects** → `hover-card` component
- **Context Menus** → `context-menu` component

## Implementation Notes

### Role-Based UI
- Use `badge` components for role indicators
- Implement conditional rendering based on user roles
- Use `alert` components for role-specific announcements

### Responsive Design
- All shadcn/ui components are mobile-responsive by default
- Use `sheet` for mobile navigation instead of sidebar
- Implement responsive grid layouts with Tailwind CSS

### Accessibility
- All shadcn/ui components include proper ARIA attributes
- Use `label` components for form accessibility
- Implement keyboard navigation with `command` component

### Performance
- Use `skeleton` components for loading states
- Implement lazy loading for large data sets
- Use `scroll-area` for virtualized lists when needed

## Demo Accounts Configuration

### Demo Account Structure
Each demo account should have predefined data and access levels:

#### **Demo Founder Account**
- **Email**: `demo.founder@tbdc.com`
- **Password**: `demo123`
- **Access**: Sessions, Meetings, Connections, Reports, Cohort Info, Perks & News, Surge, Partner Offers, Dashboard
- **Demo Data**: Sample sessions, meetings, connections filtered by cohort

#### **Demo Partner Account**
- **Email**: `demo.partner@tbdc.com`
- **Password**: `demo123`
- **Access**: Meetings, Companies, Reports, Surge, Partner Offers, Dashboard
- **Demo Data**: Sample meetings, company information, partner-specific content

#### **Demo Mentor Account**
- **Email**: `demo.mentor@tbdc.com`
- **Password**: `demo123`
- **Access**: Meetings, Companies, Surge, Partner Offers, Profile Page
- **Demo Data**: Sample meetings, company assignments, mentor-specific content

#### **Demo Admin Account**
- **Email**: `demo.admin@tbdc.com`
- **Password**: `demo123`
- **Access**: All modules with full management capabilities
- **Demo Data**: Complete dataset for testing all features

### Login Page Features
- **Form Validation**: Email format and required field validation
- **Demo Account Buttons**: Quick access buttons for each role
- **Error Handling**: Clear error messages for invalid credentials
- **Remember Me**: Optional checkbox for session persistence
- **Forgot Password**: Link for password recovery (future feature)
- **Role-Based Redirect**: Automatic navigation to appropriate dashboard

### Authentication Flow
1. **Initial Access**: All routes redirect to login if not authenticated
2. **Demo Login**: One-click login with predefined credentials
3. **Role Detection**: System identifies user role and sets permissions
4. **Dashboard Redirect**: Users are taken to their role-specific dashboard
5. **Session Management**: Authentication state persists across page refreshes

## Flow-Specific Implementation Guidelines

### Navigation Flow Patterns
- **Dashboard → Module Pages**: Use "View All" buttons for seamless navigation
- **Card → PeekPanel**: Implement consistent sheet-based detail views
- **PeekPanel → Nested PeekPanel**: Support for connection details from session/meeting contexts
- **Search & Filter**: Maintain filter state across navigation

### Mobile-First Responsive Patterns
- **Sidebar → Sheet**: Convert sidebar to sheet on mobile devices
- **Grid → Stack**: Convert card grids to stacked layouts on small screens
- **PeekPanel → Full Page**: Use full-page modals for complex interactions on mobile
- **Touch-Friendly**: Ensure all interactive elements meet touch target requirements

### Cross-Module Integration
- **Session → Connection**: Seamless navigation from session attendees to connection details
- **Meeting → Connection**: Attendee details accessible from meeting contexts
- **Connection → Sessions/Meetings**: Related content navigation from connection profiles
- **Surge → Main App**: Session synchronization between Surge and main application

This implementation plan provides a comprehensive mapping of the TBDC web app requirements to shadcn/ui components, ensuring consistency, accessibility, and modern UI patterns throughout the application while incorporating detailed user flow specifications from the functional documentation. 