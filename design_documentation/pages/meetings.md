# Meetings Page

## Overview

The Meetings page provides a comprehensive view of all scheduled meetings, including one-on-one sessions, group meetings, presentations, and reviews. Users can view, schedule, and manage their meeting calendar.

## Page Purpose

- **Meeting Management**: View and organize scheduled meetings
- **Calendar Integration**: Sync with external calendar systems
- **Meeting Coordination**: Schedule and manage meeting logistics
- **Documentation**: Access meeting notes and follow-ups

## Layout Structure

### Header Section
```
┌─────────────────────────────────────────────────┐
│  Meetings                      [Search Bar]     │
│  Manage your meeting schedule                   │
└─────────────────────────────────────────────────┘
```

### Filter and View Bar
```
┌─────────────────────────────────────────────────┐
│  [All] [Today] [This Week] [Upcoming]          │
│  [Type Filter] [Attendee Filter] [Date Range]  │
└─────────────────────────────────────────────────┘
```

### Content Area
```
┌─────────────────────────────────────────────────┐
│  [MeetingCard] [MeetingCard] [MeetingCard]     │
│  [MeetingCard] [MeetingCard] [MeetingCard]     │
│  [MeetingCard] [MeetingCard] [MeetingCard]     │
│                                                 │
│  [Pagination Controls]                          │
└─────────────────────────────────────────────────┘
```

## Core Features

### Meeting Cards
- **Grid Layout**: Responsive grid of meeting cards
- **Card Content**: Title, date, time, attendees, location
- **Status Indicators**: Scheduled, in progress, completed
- **Interactive Elements**: Join button, click for details

### View Options
- **All Meetings**: Complete meeting history
- **Today**: Today's scheduled meetings
- **This Week**: Weekly meeting overview
- **Upcoming**: Future meetings and events

### Filtering System
- **Meeting Type**: One-on-one, group, presentation, review
- **Attendee Filter**: Filter by specific participants
- **Date Range**: Custom date range selection
- **Status Filter**: Scheduled, completed, cancelled

## Meeting Types

### One-on-One Meetings
- **Format**: Individual meetings
- **Duration**: 30-60 minutes
- **Participants**: 2 people
- **Purpose**: Mentorship, feedback, planning

### Group Meetings
- **Format**: Team or cohort meetings
- **Duration**: 60-120 minutes
- **Participants**: 3-20 people
- **Purpose**: Team coordination, group discussions

### Presentations
- **Format**: Presentation and Q&A
- **Duration**: 45-90 minutes
- **Participants**: 5-50 people
- **Purpose**: Pitch presentations, demos, updates

### Reviews
- **Format**: Assessment and feedback
- **Duration**: 30-60 minutes
- **Participants**: 2-10 people
- **Purpose**: Progress reviews, evaluations

## User Roles and Permissions

### Founders
- **View**: Their scheduled meetings
- **Schedule**: Request new meetings
- **Join**: Access meeting links and materials
- **Notes**: View and edit meeting notes

### Mentors
- **View**: Meetings they're attending or leading
- **Schedule**: Create and manage meetings
- **Materials**: Upload meeting materials
- **Follow-up**: Send follow-up notes

### Partners/Admins
- **View**: All meetings across the program
- **Manage**: Meeting scheduling and coordination
- **Analytics**: Meeting attendance and metrics
- **Calendar**: Program-wide calendar management

## Meeting States

### Scheduled Meetings
- **Status**: Confirmed and scheduled
- **Actions**: Join, Reschedule, Cancel
- **Information**: Date, time, location, attendees

### In Progress Meetings
- **Status**: Currently happening
- **Actions**: Join (if late), View Materials
- **Information**: Live status, participant count

### Completed Meetings
- **Status**: Finished with available materials
- **Actions**: View Recording, Access Notes, Follow-up
- **Information**: Attendance, notes, action items

## Implementation Examples

### Page Structure
```tsx
<MeetingsPage>
  <PageHeader
    title="Meetings"
    subtitle="Manage your meeting schedule"
    searchBar={<SearchBar placeholder="Search meetings..." />}
  />
  
  <ViewNavigation
    views={meetingViews}
    activeView={activeView}
    onViewChange={handleViewChange}
  />
  
  <FilterBar
    filters={meetingFilters}
    activeFilters={activeFilters}
    onFilterChange={handleFilterChange}
  />
  
  <MeetingGrid
    meetings={filteredMeetings}
    onCardClick={handleCardClick}
    onJoinMeeting={handleJoinMeeting}
  />
  
  <PeekPanel
    isOpen={showPeekPanel}
    meeting={selectedMeeting}
    onClose={handleClosePeekPanel}
  />
</MeetingsPage>
```

### Meeting Card
```tsx
<MeetingCard
  meeting={meeting}
  isAttending={attendingMeetings.includes(meeting.id)}
  onCardClick={() => openPeekPanel(meeting)}
  onJoinClick={() => joinMeeting(meeting.id)}
/>
``` 