# Role-Based Functional Specifications

## Overview

This document provides detailed functional specifications for each user role in the TBDC Web Application, including accessible modules, capabilities, workflows, and notification preferences.

---

## 🏢 Founder Role

### Primary Focus
Program participation and company growth through sessions, meetings, connections, and reporting.

### Accessible Modules
- **Sessions** (view by cohort)
- **Meetings** (view only)
- **Connections** (People)
- **Reports**
- **Cohort Info**
- **Perks & News**
- **Surge**
- **Partner Offers**
- **Dashboard**

### Functional Capabilities

#### Data Access & Filtering
- View sessions automatically filtered by matching cohort value
- View meetings automatically filtered by matching company_uid
- View connections automatically filtered by matching cohort value
- Access cohort-specific information and activities

#### Session Management
- Filter sessions by:
  - Session type (e.g., workshop, panel)
  - Mentors involved in the session
  - Date range and status
- View session details including description, goals, and attendees
- Join virtual sessions directly from the platform

#### Meeting Management
- Filter meetings by:
  - Meeting type (e.g., 1:1, customer call, investor meeting)
  - Attendees involved in the meeting
  - Date and status
- View meeting details and join virtual meetings
- Access meeting notes and follow-ups

#### Network Building
- Browse people (connections) with tags: mentor, EIR, customer, investor
- View connection profiles and related sessions/meetings
- Build network within cohort and program ecosystem

#### Reporting & Analytics
- Read reports and download PDFs
- View progress tracking and analytics
- Access cohort performance insights

#### Platform Features
- Access perks, news, offers, and Surge mentors
- View personalized dashboard with real-time updates
- Manage profile and preferences

### Notifications
- **New or Updated Meeting**: Real-time alerts for meeting changes
- **Report Published**: Notifications when new reports are available
- **Surge Mentor Matched or Offered**: Mentor matching notifications
- **Partner Service Offers**: Special offers and opportunities
- **Events/Webinar**: Upcoming events and webinars

### Key Workflows
1. **Session Attendance**: View upcoming sessions → Join virtual session → Access materials
2. **Meeting Management**: Review meetings → Join calls → Access follow-up materials
3. **Network Building**: Browse connections → View profiles → Connect with mentors
4. **Progress Tracking**: Review reports → Track progress → Access analytics

---

## 🤝 Partner Role

### Primary Focus
Company engagement and support through monitoring, mentoring, and progress tracking.

### Accessible Modules
- **Companies** (select)
- **Meetings**
- **Reports**
- **Surge**
- **Partner Offers**
- **Dashboard**

### Functional Capabilities

#### Company Management
- Track engagement of select companies
- View company profiles and progress
- Monitor company performance metrics
- Access company-specific data and reports

#### Meeting Oversight
- View company meetings and attendance
- Access meeting notes and outcomes
- Monitor meeting effectiveness and follow-ups
- Track mentor interactions and feedback

#### Reporting & Analytics
- Access published reports and analytics
- View bi-weekly summary digests
- Monitor company progress and milestones
- Generate custom reports and insights

#### Surge Platform
- View Surge mentors filtered by partner's country
- Access mentor recommendations and matches
- Monitor mentor engagement and effectiveness
- Track Surge platform usage and outcomes

#### Dashboard & Updates
- Access partner offers and dashboard updates
- View company engagement summaries
- Monitor program effectiveness
- Access partner-specific tools and resources

### Notifications
- **Bi-weekly Auto Updates** on:
  - Customer Meetings: Summary of customer interactions
  - Mentor Hours: Mentor engagement and utilization
  - Investor Connections: Investment-related activities

### Key Workflows
1. **Company Monitoring**: Review assigned companies → Track progress → Generate insights
2. **Meeting Oversight**: Monitor meetings → Review outcomes → Track follow-ups
3. **Mentor Management**: Review mentor assignments → Monitor effectiveness → Optimize matches
4. **Progress Reporting**: Generate reports → Share insights → Track improvements

---

## 🎓 Mentor Role

### Primary Focus
Supporting founders and companies through meetings, guidance, and Surge platform participation.

### Accessible Modules
- **Companies** (select)
- **Meetings**
- **Profile Page**
- **Surge**
- **Partner Offers**

### Functional Capabilities

#### Company Support
- View profiles of assigned companies
- Access company information and progress
- Review company needs and challenges
- Track company development and milestones

#### Meeting Participation
- Attend/view assigned meetings
- Access meeting materials and context
- Provide feedback and guidance
- Track meeting outcomes and follow-ups

#### Profile Management
- Manage their profile information
- Update availability and expertise
- Set preferences and specializations
- Control visibility and contact information

#### Surge Platform
- Discover Surge mentor opportunities
- Manage Surge bookings and availability
- Set pricing and package options
- Track Surge platform performance

#### Partner Engagement
- Browse partner offers and opportunities
- Access partner resources and tools
- Engage with partner programs
- Track partner interactions

### Notifications
- **Mentor Match Confirmations**: Notifications for new mentor assignments
- **Company-related Alerts**: Updates about assigned companies
- **Meeting Reminders**: Upcoming meeting notifications
- **Surge Booking Requests**: New booking notifications

### Key Workflows
1. **Company Support**: Review assigned companies → Attend meetings → Provide guidance
2. **Profile Management**: Update profile → Set availability → Manage preferences
3. **Surge Bookings**: Receive requests → Manage calendar → Conduct sessions
4. **Meeting Participation**: Review meetings → Prepare materials → Conduct sessions

---

## ⚙️ Admin Role

### Primary Focus
System management and oversight through user administration, content management, and system configuration.

### Accessible Modules
- **All User Modules** (Sessions, Meetings, Connections, Companies, Reports, Surge)
- **Admin Tools**:
  - Manage Users
  - Partner / Mentor / Company Views
  - Manage Data
  - Manage Surge
  - Manage News, Perks & Partners
  - Manage Notifications

### Functional Capabilities

#### User Management
- Create, edit, and delete user accounts
- Assign roles and permissions
- Manage user access and restrictions
- Monitor user activity and engagement

#### Content Management
- Create/Edit/Delete sessions and meetings
- Manage program content and materials
- Update announcements and notifications
- Control dashboard visibility and content

#### Data Management
- Assign mentors to companies
- Manage company assignments and relationships
- Export reports, notes, and meeting logs
- Maintain data integrity and consistency

#### Surge Platform Management
- Manage Surge mentor gallery and packages
- Approve mentor applications and profiles
- Monitor Surge platform usage and performance
- Manage Surge pricing and availability

#### System Configuration
- Configure system settings and preferences
- Manage notification systems and delivery
- Control feature access and permissions
- Monitor system performance and health

#### Reporting & Analytics
- Generate comprehensive system reports
- Monitor user engagement and activity
- Track program effectiveness and outcomes
- Analyze data trends and insights

### Notifications
- **System Alerts**: Critical system notifications and alerts
- **User Management**: User-related notifications and updates
- **Content Updates**: Content management notifications
- **Performance Alerts**: System performance and health alerts

### Key Workflows
1. **User Administration**: Manage users → Assign roles → Monitor activity
2. **Content Management**: Create content → Manage materials → Update announcements
3. **Data Management**: Maintain data → Generate reports → Ensure integrity
4. **System Monitoring**: Monitor performance → Configure settings → Manage access

---

## Common Features Across All Roles

### Authentication & Security
- Secure role-based login and authentication
- Session management and timeout handling
- Data encryption and security measures
- Audit logging and activity tracking

### User Interface
- Responsive design for all device types
- Consistent navigation and layout
- Accessibility compliance (WCAG 2.1 AA)
- Intuitive user experience

### Data Management
- Real-time data synchronization
- Automatic data filtering by role and permissions
- Search and filtering capabilities
- Export and download functionality

### Notification System
- In-app notifications
- Email notifications for important updates
- Real-time alerts and reminders
- Customizable notification preferences

### Performance Requirements
- Page load times < 3 seconds
- Search results < 1 second
- Data filtering < 500ms
- Form submission < 2 seconds

### Mobile Support
- Full mobile responsiveness
- Touch-optimized interface
- Mobile-specific features and interactions
- Offline capability for key features 