# User Flows Documentation

## Overview

This document provides comprehensive user flow documentation for all major interactions and workflows in the TBDC Web Application. Each flow is designed to be intuitive, efficient, and role-appropriate.

---

## 🏠 Dashboard Flow

### Access & Navigation
- **Entry Point**: Default landing page after user login
- **Navigation**: Accessible anytime from sidebar navigation by clicking "Dashboard"
- **Purpose**: Personalized overview of important program activity based on user role

### Common Dashboard Elements
- **Announcement Banner** (if active): Top of page, promoting upcoming events, sessions, or urgent updates
- **Upcoming Sessions Preview** (filtered by cohort)
- **Upcoming Meetings Preview** (filtered by company_uid)
- **Recent Reports or Notes** (if available)
- **Partner Offers or Perks** (if applicable)
- **"View All" buttons** for each section to go deeper

### Role-Specific Dashboard Views

#### Founder Dashboard
**Shows:**
- Next session and meeting with date/time
- Mentors they've interacted with
- Surge preview box
- Report availability notification

**Interactions:**
- Clickable cards for each preview open respective **PeekPanel**
- "View All" buttons route to full module pages

#### Partner Dashboard
**Shows:**
- List of companies assigned to them
- Meeting highlights from those companies
- Bi-weekly summary digest preview
- Surge mentor preview by country

**Interactions:**
- Clicking company or meeting opens deeper detail pages
- Access to company monitoring tools

#### Mentor Dashboard
**Shows:**
- Companies they're assigned to
- Their upcoming meetings
- Profile completion banner or settings shortcut
- Surge requests (if any)

**Interactions:**
- Quick access to profile management
- Direct navigation to assigned companies

#### Admin Dashboard
**Shows:**
- Administrative summary blocks:
  - # of active users by role
  - Cohort status summaries
  - Recent logins or bookings
- Buttons to access user management, report tools, and Surge approval queue

**Interactions:**
- Direct access to administrative tools
- System monitoring and management

### Dashboard Interactions
- **PeekPanels**: Clicking cards (session, meeting, report) opens side panels
- **Navigation**: "View All" routes user to full module pages
- **Responsive Design**: Mobile layout with stacked cards and expandable panels
- **Notification Center**: Bell icon shows notifications for upcoming events

---

## 📚 Sessions Flow

### Access & Navigation
- **Entry Point**: Sidebar navigation or dashboard "View All" button
- **Filtering**: Sessions automatically filtered by user role and cohort
- **Purpose**: View and interact with program sessions and workshops

### Session List View
**Display:**
- Sessions displayed as cards in scrollable list
- Chronological ordering with upcoming sessions prioritized

**Available Filters:**
- **Status**: All, Upcoming, Ongoing, Completed
- **Session Type**: Workshop, Panel, Networking, etc.
- **Mentors**: Filter by mentors involved in sessions
- **Search Bar**: Match on session title or description

### Session Card Interaction
**Clicking a session card opens a PeekPanel showing:**
- Session title, type, date, time, duration
- Location (virtual or physical)
- Description and learning objectives
- List of attendees or associated connections
- "Join Session" button (visible if virtual and upcoming)

### Session Detail Features
**Virtual Sessions:**
- Direct join functionality
- Meeting URL and access instructions
- Pre-session materials and resources

**Physical Sessions:**
- Location details and directions
- Attendance tracking
- Pre-session preparation materials

### Connection Integration
**In session detail panel:**
- Clickable connection names/images
- Opens Connection PeekPanel showing:
  - Name, role, organization
  - Bio, LinkedIn, profile picture
  - Related sessions/meetings (if applicable)

### Session Workflow
1. **Discovery**: Browse sessions → Apply filters → Find relevant sessions
2. **Details**: Click session → Review details → Check attendees
3. **Preparation**: Access materials → Review objectives → Prepare questions
4. **Participation**: Join session → Participate → Access follow-up materials

---

## 🤝 Meetings Flow

### Access & Navigation
- **Entry Point**: Sidebar navigation or dashboard "View All" button
- **Filtering**: Meetings automatically filtered by company_uid and user role
- **Purpose**: View and participate in scheduled meetings

### Meeting List View
**Display:**
- Meeting cards displayed chronologically
- Status indicators (Confirmed, Pending, Completed)

**Available Filters:**
- **Meeting Type**: Investor, EIR, Customer, Internal, Mentor
- **Attendees**: Filter by meeting participants
- **Status**: Upcoming, Past, All
- **Search Bar**: Match on meeting title or description

### Meeting Card Interaction
**Clicking a meeting card opens a PeekPanel showing:**
- Title, type, date, time, location
- Meeting URL (if virtual)
- Description and objectives
- Status (Confirmed, Pending, Completed)
- List of attendees with roles

### Meeting Detail Features
**Virtual Meetings:**
- Direct join functionality
- Meeting URL and access instructions
- Pre-meeting materials and agenda

**Physical Meetings:**
- Location details and directions
- Room information and setup
- Pre-meeting preparation materials

### Attendee Integration
**In meeting detail panel:**
- Clickable attendee avatars/names
- Opens Connection PeekPanel showing:
  - Attendee profile and background
  - Related meetings and sessions
  - Contact information and preferences

### Meeting Workflow
1. **Discovery**: Browse meetings → Apply filters → Find relevant meetings
2. **Details**: Click meeting → Review details → Check attendees
3. **Preparation**: Access materials → Review agenda → Prepare talking points
4. **Participation**: Join meeting → Participate → Access follow-up materials

---

## 👥 Connections Flow

### Access & Navigation
- **Entry Point**: Sidebar "Connections" tab
- **Filtering**: Founders see connections within their cohort only
- **Purpose**: Browse and connect with program participants

### Connection List View
**Display:**
- Connection cards in grid or list layout
- Profile pictures, names, and organizations
- Role tags and specializations

**Available Filters:**
- **Tags**: Mentor, Customer, Investor, EIR, Founder
- **Organization**: Filter by company or organization
- **Search Bar**: Search by name, organization, or role
- **Favorites**: Filter by favorited connections

### Connection Card Interaction
**Clicking a connection opens a PeekPanel showing:**
- Full name, organization, role type
- Bio and profile photo
- Tags and specializations
- LinkedIn link and contact information
- Sessions/Meetings they are associated with

### Connection Detail Features
**Profile Information:**
- Comprehensive bio and background
- Professional experience and expertise
- Contact preferences and availability

**Related Content:**
- Associated sessions and meetings
- Shared connections and networks
- Recent activities and updates

### Navigation Integration
**Inside connection panel:**
- Clicking related sessions opens Session PeekPanel
- Clicking related meetings opens Meeting PeekPanel
- Direct navigation to full module pages

### Connection Workflow
1. **Discovery**: Browse connections → Apply filters → Find relevant people
2. **Details**: Click connection → Review profile → Check related activities
3. **Engagement**: Connect via sessions/meetings → Build relationships → Access network

---

## 🚀 Surge Flow (Mentors & Bookings)

### Access & Navigation
- **Entry Point**: Sidebar "Surge" option
- **Behavior**: Opens new browser tab pointing to Surge landing page
- **Session Sync**: User remains logged in (session synced with main app)

### Surge Landing Page (New Tab)
**Standalone public-facing page with:**
- **Hero Banner**: Surge branding and positioning statement
- **Mentor Preview**: Featured mentors with images, industries, and sample tags
- **Call to Action Buttons**:
  - "Explore Surge Mentors"
  - "Log In to Book" (only shown if user session not detected)
  - "Request Access"

### Mentor Discovery (Inside Horizon Web App)
**After login, users access Surge mentor discovery interface:**
- Mentors shown in grid/list view
- Photo, Name, Role, Expertise Tags
- "Book Now" or "View Details" button

**Filtering and Sorting:**
- **Expertise Area**: GTM, Fundraising, Sales, Product, etc.
- **Availability**: Current availability and scheduling
- **Type**: Investor, Operator, Specialist, Industry Expert
- **Search Bar**: Search by name, industry, or tag
- **Sorting**: Recommended, Previously Booked, Popular, Price

### Mentor Detail View
**Clicking a mentor opens detailed view with:**
- Comprehensive bio and background
- Expertise tags and specializations
- LinkedIn and professional links
- Experience summary and achievements
- Similar mentors carousel
- "Book Now" button

### Booking Flow
**"Book Now" opens Booking Modal:**
1. **Date/Time Selection**: Choose available time slots
2. **Objective/Topic**: Add meeting objective or discussion topics
3. **Confirmation**: Review details and confirm booking
4. **Success**: Confirmation message with calendar and reschedule options

### Bookings Management
**Surge tab includes sub-tabs:**
- **Upcoming Bookings**: Future scheduled sessions
- **Past Bookings**: Completed sessions with notes
- **Cancellations**: Cancelled or rescheduled sessions

**Booking Card Information:**
- Mentor image, name, and topic
- Date/time and meeting type
- "Join Now" button (if virtual and upcoming)
- "Cancel" button (if within allowable time)

### Booking Detail View
**Shows comprehensive booking information:**
- Complete booking details and context
- Calendar add option for external calendars
- Mentor recap and preparation materials
- Cancel/Reschedule button (if applicable)
- Meeting notes and follow-up actions

### Account & Wallet (Premium Features)
**Optional wallet functionality:**
- View balance and transaction history
- Payment methods and billing information
- Refund requests and processing
- Subscription management

### Session Synchronization
**Cross-tab behavior:**
- Sessions synced across tabs using shared auth strategy
- Logout in Surge tab logs user out of both Surge and main Horizon app
- Seamless navigation between platforms

### Surge Workflow
1. **Discovery**: Browse mentors → Apply filters → Find relevant expertise
2. **Details**: Click mentor → Review profile → Check availability
3. **Booking**: Select time → Add objectives → Confirm booking
4. **Participation**: Join session → Conduct meeting → Access follow-up
5. **Management**: Track bookings → Manage calendar → Review sessions

---

## Common Interaction Patterns

### PeekPanels
- **Purpose**: Quick data preview without navigation
- **Behavior**: Slide in from side with detailed information
- **Navigation**: Click outside to close or use close button
- **Content**: Role-appropriate information and actions

### Side Panels
- **Purpose**: Detailed information display
- **Behavior**: Expandable panels with comprehensive data
- **Navigation**: Scrollable content with action buttons
- **Content**: Full module information and management tools

### Modal Dialogs
- **Purpose**: Form interactions and confirmations
- **Behavior**: Overlay dialogs with focused interactions
- **Navigation**: Close with escape key or close button
- **Content**: Forms, confirmations, and detailed actions

### Search and Filter
- **Purpose**: Finding specific information quickly
- **Behavior**: Real-time search with filter combinations
- **Navigation**: Clear filters and search terms
- **Content**: Role-appropriate search results

### Mobile Responsiveness
- **Layout**: Stacked cards with expandable sections
- **Navigation**: Touch-optimized interactions
- **Performance**: Optimized for mobile networks
- **Accessibility**: Full mobile accessibility support

---

## Error Handling and Edge Cases

### Loading States
- **Skeleton Loading**: Placeholder content while data loads
- **Progress Indicators**: Clear loading progress for long operations
- **Error States**: Helpful error messages with recovery options
- **Empty States**: Guidance when no data is available

### Network Issues
- **Offline Support**: Basic functionality when offline
- **Retry Mechanisms**: Automatic retry for failed requests
- **Cache Management**: Intelligent caching for better performance
- **Sync Indicators**: Clear indication of data synchronization status

### Permission Errors
- **Access Denied**: Clear messaging for permission issues
- **Role Restrictions**: Helpful guidance on required permissions
- **Upgrade Paths**: Clear paths to gain required access
- **Support Contact**: Easy access to support for permission issues

### Data Validation
- **Input Validation**: Real-time validation with helpful messages
- **Format Requirements**: Clear format requirements and examples
- **Required Fields**: Clear indication of required information
- **Error Recovery**: Easy ways to fix validation errors 