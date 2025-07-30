
# Data Schema

## Overview

This document defines the complete data model for the TBDC Web Application. The schema supports role-based access control, company isolation, and many-to-many relationships through junction tables.

## Core Entities

### Users Table

The central user management table that stores all user information and role assignments.

| Field        | Type      | Constraints | Description                                |
|--------------|-----------|-------------|--------------------------------------------|
| id           | text      | PRIMARY KEY | Unique user identifier (UUID)              |
| first_name   | text      | NOT NULL    | User's first name                          |
| last_name    | text      | NOT NULL    | User's last name                           |
| email        | text      | UNIQUE      | User's email (used for login)              |
| password     | text      | NOT NULL    | Hashed password (for mock login only)      |
| role         | text      | NOT NULL    | Role: founder, partner, mentor, admin      |
| company_name | text      | NULL        | Company the user is associated with        |
| company_uid  | text      | NULL        | UID for linking to meetings/reports        |
| cohort       | text      | NULL        | Cohort assignment (for founders)           |
| country      | text      | NULL        | User's country                             |
| profile_image| text      | NULL        | URL to profile image                       |
| created_at   | timestamp | DEFAULT NOW | User registration date                     |
| updated_at   | timestamp | DEFAULT NOW | Last update timestamp                      |

**Indexes:**
- `idx_users_email` on `email`
- `idx_users_role` on `role`
- `idx_users_company_uid` on `company_uid`
- `idx_users_cohort` on `cohort`

### Sessions Table

Stores information about program sessions, workshops, and events.

| Field        | Type      | Constraints | Description                              |
|--------------|-----------|-------------|------------------------------------------|
| id           | text      | PRIMARY KEY | Unique session ID (UUID)                 |
| name         | text      | NOT NULL    | Title of the session                     |
| date         | date      | NOT NULL    | Scheduled date                           |
| start_time   | time      | NOT NULL    | Session start time                       |
| end_time     | time      | NOT NULL    | Session end time                         |
| duration     | text      | NOT NULL    | Length of session (e.g., "1h", "90m")    |
| type         | text      | NOT NULL    | Workshop, Panel, Check-in, etc.          |
| location     | text      | NOT NULL    | Virtual or physical location name        |
| location_url | text      | NULL        | Link to join location or room map        |
| description  | text      | NULL        | Agenda or content overview               |
| cohort       | text      | NOT NULL    | Associated cohort                        |
| max_participants| integer | NULL        | Maximum number of participants           |
| status       | text      | DEFAULT 'scheduled' | scheduled, active, completed, cancelled |
| created_at   | timestamp | DEFAULT NOW | Creation timestamp                       |

**Indexes:**
- `idx_sessions_date` on `date`
- `idx_sessions_cohort` on `cohort`
- `idx_sessions_type` on `type`
- `idx_sessions_status` on `status`

### Meetings Table

Tracks all meetings between users, including 1:1s, customer calls, and investor meetings.

| Field        | Type      | Constraints | Description                              |
|--------------|-----------|-------------|------------------------------------------|
| id           | text      | PRIMARY KEY | Unique meeting ID (UUID)                 |
| title        | text      | NOT NULL    | Meeting name or focus                    |
| date         | date      | NOT NULL    | Meeting date                             |
| start_time   | time      | NOT NULL    | Meeting start time                       |
| end_time     | time      | NOT NULL    | Meeting end time                         |
| duration     | text      | NOT NULL    | Meeting length (e.g., "30m", "1h")       |
| type         | text      | NOT NULL    | 1:1, Customer, Investor, Internal        |
| status       | text      | DEFAULT 'pending' | Confirmed, Pending, Cancelled        |
| location     | text      | NULL        | Meeting location                         |
| location_url | text      | NULL        | Meeting room/map link                    |
| meeting_url  | text      | NULL        | Zoom/Google Meet link                    |
| description  | text      | NULL        | Summary or agenda                        |
| company_uid  | text      | NOT NULL    | Foreign key to identify the company      |
| notes        | text      | NULL        | Meeting notes or follow-up items         |
| created_at   | timestamp | DEFAULT NOW | Creation timestamp                       |
| updated_at   | timestamp | DEFAULT NOW | Last update timestamp                    |

**Indexes:**
- `idx_meetings_date` on `date`
- `idx_meetings_company_uid` on `company_uid`
- `idx_meetings_type` on `type`
- `idx_meetings_status` on `status`

### Connections Table

Stores information about people in the network (mentors, investors, customers, etc.).

| Field         | Type      | Constraints | Description                              |
|---------------|-----------|-------------|------------------------------------------|
| id            | text      | PRIMARY KEY | Unique connection ID (UUID)              |
| first_name    | text      | NOT NULL    | First name                               |
| last_name     | text      | NOT NULL    | Last name                                |
| email         | text      | NULL        | Email address                            |
| phone         | text      | NULL        | Phone number                             |
| role          | text      | NOT NULL    | Job title or designation                 |
| type          | text      | NOT NULL    | Mentor, EIR, Customer, Investor, etc.    |
| organization  | text      | NULL        | Affiliated company or institution        |
| bio           | text      | NULL        | Short bio or description                 |
| profile_image | text      | NULL        | URL to profile image                     |
| company_uid   | text      | NULL        | Links to the company if applicable       |
| linkedin_url  | text      | NULL        | LinkedIn profile URL                     |
| twitter_url   | text      | NULL        | Twitter profile URL                      |
| website_url   | text      | NULL        | Personal or company website              |
| country       | text      | NULL        | Country of residence                     |
| expertise     | text[]    | NULL        | Array of expertise areas                 |
| availability  | text      | NULL        | Availability status                      |
| created_at    | timestamp | DEFAULT NOW | Creation timestamp                       |
| updated_at    | timestamp | DEFAULT NOW | Last update timestamp                    |

**Indexes:**
- `idx_connections_type` on `type`
- `idx_connections_company_uid` on `company_uid`
- `idx_connections_country` on `country`
- `idx_connections_expertise` on `expertise` (GIN index)

### Reports Table

Stores various types of reports and documents.

| Field      | Type      | Constraints | Description                               |
|------------|-----------|-------------|-------------------------------------------|
| id         | text      | PRIMARY KEY | Unique report ID (UUID)                   |
| title      | text      | NOT NULL    | Title of the report                       |
| type       | text      | NOT NULL    | Summary, Check-in, Financial, etc.        |
| date       | date      | NOT NULL    | Date of the report                        |
| pdf_url    | text      | NULL        | Link to download the report               |
| company_uid| text      | NOT NULL    | Foreign key to the company                |
| description| text      | NULL        | Report description or summary             |
| status     | text      | DEFAULT 'draft' | draft, published, archived            |
| created_by | text      | NOT NULL    | User ID who created the report            |
| created_at | timestamp | DEFAULT NOW | Creation timestamp                        |
| updated_at | timestamp | DEFAULT NOW | Last update timestamp                     |

**Indexes:**
- `idx_reports_date` on `date`
- `idx_reports_company_uid` on `company_uid`
- `idx_reports_type` on `type`
- `idx_reports_status` on `status`

## Junction Tables

### Session Connections Table

Enables many-to-many relationships between sessions and connections (e.g., mentors involved in multiple sessions).

| Field         | Type      | Constraints | Description                                  |
|---------------|-----------|-------------|----------------------------------------------|
| id            | text      | PRIMARY KEY | Unique junction record ID (UUID)            |
| session_id    | text      | NOT NULL    | References sessions.id                       |
| connection_id | text      | NOT NULL    | References connections.id                    |
| role          | text      | NULL        | Role in the session (speaker, moderator, etc.) |
| created_at    | timestamp | DEFAULT NOW | Creation timestamp                           |

**Indexes:**
- `idx_session_connections_session_id` on `session_id`
- `idx_session_connections_connection_id` on `connection_id`
- `idx_session_connections_unique` on `(session_id, connection_id)` (UNIQUE)

### Meeting Connections Table

Enables many-to-many relationships between meetings and connections (e.g., multiple attendees per meeting).

| Field         | Type      | Constraints | Description                                  |
|---------------|-----------|-------------|----------------------------------------------|
| id            | text      | PRIMARY KEY | Unique junction record ID (UUID)            |
| meeting_id    | text      | NOT NULL    | References meetings.id                       |
| connection_id | text      | NOT NULL    | References connections.id                    |
| role          | text      | NULL        | Role in the meeting (attendee, organizer, etc.) |
| status        | text      | DEFAULT 'invited' | invited, confirmed, declined, attended |
| created_at    | timestamp | DEFAULT NOW | Creation timestamp                           |

**Indexes:**
- `idx_meeting_connections_meeting_id` on `meeting_id`
- `idx_meeting_connections_connection_id` on `connection_id`
- `idx_meeting_connections_unique` on `(meeting_id, connection_id)` (UNIQUE)

## Data Relationships

### Entity Relationship Diagram

```
Users (1) ──── (N) Meetings
Users (1) ──── (N) Reports
Users (1) ──── (N) Notes

Sessions (N) ──── (N) Connections (via session_connections)
Meetings (N) ──── (N) Connections (via meeting_connections)

Companies (1) ──── (N) Users
Companies (1) ──── (N) Meetings
Companies (1) ──── (N) Reports
Companies (1) ──── (N) Notes
```

### Key Relationships

1. **User-Company**: Users belong to companies (founders, partners)
2. **User-Cohort**: Founders are assigned to cohorts
3. **Session-Cohort**: Sessions are associated with specific cohorts
4. **Meeting-Company**: Meetings are associated with specific companies
5. **Connection-Session**: Many-to-many via junction table
6. **Connection-Meeting**: Many-to-many via junction table

## Data Access Patterns

### Role-Based Filtering

- **Founders**: Filter by `company_uid` and `cohort`
- **Mentors**: Filter by assigned companies
- **Partners**: Filter by assigned companies
- **Admins**: Access to all data

### Common Queries

```sql
-- Get sessions for a specific cohort
SELECT * FROM sessions WHERE cohort = $1;

-- Get meetings for a specific company
SELECT * FROM meetings WHERE company_uid = $1;

-- Get connections for a session
SELECT c.* FROM connections c
JOIN session_connections sc ON c.id = sc.connection_id
WHERE sc.session_id = $1;

-- Get meetings with attendees
SELECT m.*, c.first_name, c.last_name FROM meetings m
JOIN meeting_connections mc ON m.id = mc.meeting_id
JOIN connections c ON mc.connection_id = c.id
WHERE m.company_uid = $1;
```

## Data Validation Rules

### Business Rules

1. **User Roles**: Must be one of: founder, partner, mentor, admin
2. **Session Types**: Must be one of: workshop, panel, check-in, webinar
3. **Meeting Types**: Must be one of: 1:1, customer, investor, internal
4. **Connection Types**: Must be one of: mentor, EIR, customer, investor, partner
5. **Report Types**: Must be one of: summary, check-in, financial, milestone

### Constraints

1. **Email Uniqueness**: User emails must be unique
2. **Company Isolation**: Users can only access their own company data
3. **Cohort Filtering**: Sessions are filtered by user's cohort
4. **Date Validation**: Meeting/session dates cannot be in the past
5. **Status Transitions**: Status changes follow defined workflows

## Migration Strategy

### From Mock Data

1. **Data Export**: Export current mock JSON data
2. **Schema Creation**: Create database tables with proper constraints
3. **Data Import**: Import data with validation
4. **Application Update**: Update application to use database queries
5. **Testing**: Verify data integrity and access patterns

### Future Enhancements

1. **Audit Logging**: Track all data changes
2. **Soft Deletes**: Implement soft delete for data retention
3. **Data Archiving**: Archive old data for performance
4. **Backup Strategy**: Regular database backups
5. **Data Analytics**: Implement analytics and reporting
