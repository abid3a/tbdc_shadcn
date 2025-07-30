
# System Architecture

## Overview

The TBDC Web Application is a modern, role-based platform built with Next.js 14, TypeScript, and shadcn/ui components. The application serves multiple user roles (founders, mentors, partners, and admins) with personalized experiences and data access patterns.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui v4
- **State Management**: React Context API
- **Routing**: Next.js file-based routing

### Backend (Current MVP)
- **Data Source**: Static mock JSON files
- **Location**: `/src/data/mock/`
- **Authentication**: Mock role-based system

### Backend (Planned)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage

### Development Tools
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier
- **Deployment**: Vercel

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (authenticated)/   # Protected routes
│   │   ├── admin/         # Admin-specific pages
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── meetings/      # Meeting management
│   │   ├── sessions/      # Session management
│   │   ├── connections/   # Connection management
│   │   └── surge/         # Surge mentor platform
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   └── layout/           # Layout components
├── contexts/             # React Context providers
├── data/                 # Data layer
│   ├── mock/            # Mock JSON data
│   └── types/           # TypeScript type definitions
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── types/               # Global type definitions
```

## Data Flow Architecture

### Authentication Flow
1. User logs in with role-based credentials
2. Auth context stores user role and permissions
3. Route protection based on role requirements
4. Data filtering based on user's company_uid and cohort

### Data Access Pattern
1. **Role-based filtering**: All data queries filter by user role
2. **Company isolation**: Founder data filtered by company_uid
3. **Cohort grouping**: Session data filtered by cohort
4. **Mock data layer**: Services fetch from JSON files
5. **Future migration**: Direct Supabase queries

### Component Architecture
- **Layout Components**: Sidebar, Header, Main Layout
- **Card Components**: SessionCard, MeetingCard, ConnectionCard
- **Panel Components**: PeekPanel, SidePanel
- **Form Components**: Login, Filters, Search
- **Navigation**: Tabs, Breadcrumbs, Pagination

## Security Model

### Role-Based Access Control (RBAC)
- **Founder**: Access to own company data, sessions, meetings
- **Mentor**: Access to assigned companies and meetings
- **Partner**: Access to assigned companies and reports
- **Admin**: Full system access and management capabilities

### Data Isolation
- Company data isolated by company_uid
- Cohort data filtered by user's cohort
- Role-specific module access
- Route-level protection

## Performance Considerations

### Frontend Optimization
- Next.js App Router for optimal routing
- Component lazy loading
- Image optimization with Next.js Image
- Tailwind CSS for minimal bundle size

### Data Loading
- Static mock data for fast initial loads
- Client-side filtering and search
- Pagination for large datasets
- Optimistic UI updates

## Future Integration Plan

### Phase 1: Supabase Migration
- Replace mock data with Supabase queries
- Implement Supabase Auth
- Add Row-Level Security (RLS)
- Real-time data synchronization

### Phase 2: Advanced Features
- File upload and storage
- Email notifications
- Calendar integration
- Advanced reporting

### Phase 3: External Integrations
- CRM system integration
- Calendar booking systems
- Payment processing
- Analytics and monitoring

## Deployment Architecture

### Development
- Local development with Next.js dev server
- Hot reloading and fast refresh
- Mock data for development

### Production
- Vercel deployment
- Environment-based configuration
- CDN for static assets
- Automatic deployments from main branch

## Development Workflow

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks

### Testing Strategy
- Unit tests for components
- Integration tests for user flows
- E2E tests for critical paths
- Accessibility testing
