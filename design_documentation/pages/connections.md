# Connections Page

## Overview

The Connections page displays program-related people including mentors, customers, EIRs, investors, and other stakeholders. It provides a comprehensive network view with filtering, search, and detailed profile information.

## Page Purpose

- **Network Management**: View and manage professional connections
- **Role Discovery**: Find mentors, investors, and partners
- **Contact Information**: Access contact details and communication channels
- **Relationship Building**: Track interactions and favorites

## Layout Structure

### Header Section
```
┌─────────────────────────────────────────────────┐
│  Connections                    [Search Bar]    │
│  Manage your professional network               │
└─────────────────────────────────────────────────┘
```

### Filter Bar
```
┌─────────────────────────────────────────────────┐
│  [All] [Mentors] [Investors] [Customers] [EIRs] │
│  [Clear Filters]                                │
└─────────────────────────────────────────────────┘
```

### Content Area
```
┌─────────────────────────────────────────────────┐
│  [ConnectionCard] [ConnectionCard] [ConnectionCard] │
│  [ConnectionCard] [ConnectionCard] [ConnectionCard] │
│  [ConnectionCard] [ConnectionCard] [ConnectionCard] │
│                                                     │
│  [Pagination Controls]                              │
└─────────────────────────────────────────────────┘
```

## Core Features

### Connection Cards
- **Grid Layout**: Responsive grid of connection cards
- **Card Content**: Name, role, organization, avatar
- **Interactive Elements**: Heart/favorite button, click to open details
- **Visual Hierarchy**: Clear typography and spacing

### Filtering System
- **Tag-Based Filters**: Multi-select filter by connection type
- **Quick Filters**: Dropdown for common filter combinations
- **Role-Based Filtering**: Default view based on user role
- **Clear Filters**: Easy reset of all active filters

### Search Functionality
- **Search Bar**: Prominent search input in header
- **Search Scope**: Name, organization, role, tags
- **Real-Time Results**: Instant search with debouncing
- **Search History**: Recent searches for quick access

### Peek Panel Integration
- **Detailed View**: Full profile information in side panel
- **Contact Information**: Email, phone, LinkedIn, etc.
- **Bio and Background**: Professional summary and experience
- **Action Buttons**: Message, favorite, connect, etc.

## User Roles and Permissions

### Founders
- **Default View**: Connections matching their cohort
- **Access**: All connection types (mentors, investors, etc.)
- **Actions**: View profiles, send messages, mark favorites

### Mentors
- **Default View**: Their mentees and other mentors
- **Access**: Limited to program participants
- **Actions**: View mentee profiles, communicate

### Partners/Admins
- **Default View**: All connections across the program
- **Access**: Full network visibility
- **Actions**: Manage connections, view analytics

## Filtering Options

### Connection Types
- **Mentors**: Program mentors and advisors
- **Investors**: Angel investors and VCs
- **Customers**: Potential or current customers
- **EIRs**: Entrepreneurs in Residence
- **Partners**: Strategic partners and collaborators

### Additional Filters
- **Organization**: Filter by company or organization
- **Location**: Geographic filtering
- **Expertise**: Skills and domain expertise
- **Availability**: Active/available connections

## Search Capabilities

### Search Fields
- **Name**: First and last name search
- **Organization**: Company or organization name
- **Role**: Job title or position
- **Tags**: Skills, expertise, or interests
- **Bio**: Content within profile descriptions

### Search Behavior
- **Real-Time**: Results update as user types
- **Debouncing**: 300ms delay to prevent excessive API calls
- **Highlighting**: Search terms highlighted in results
- **No Results**: Helpful message with suggestions

## Responsive Design

### Mobile Layout
- **Single Column**: Stacked connection cards
- **Collapsible Filters**: Filter bar collapses to dropdown
- **Touch Optimized**: Larger touch targets
- **Swipe Actions**: Swipe to favorite or message

### Tablet Layout
- **Two Columns**: 2-column grid layout
- **Sidebar Filters**: Filter panel on left side
- **Peek Panel**: Full-width overlay panel

### Desktop Layout
- **Multi-Column**: 3-4 column grid layout
- **Persistent Filters**: Always visible filter bar
- **Side Peek Panel**: Right-side sliding panel

## Interaction Patterns

### Card Interactions
- **Click**: Opens peek panel with full details
- **Heart Click**: Toggle favorite status
- **Hover**: Subtle elevation and cursor pointer
- **Long Press**: Quick actions menu (mobile)

### Filter Interactions
- **Tag Click**: Toggle filter on/off
- **Multi-Select**: Hold Ctrl/Cmd for multiple selections
- **Clear All**: Reset all active filters
- **Save Filters**: Save custom filter combinations

### Search Interactions
- **Type**: Real-time search results
- **Enter**: Submit search query
- **Clear**: Clear search input
- **History**: Access recent searches

## Data Management

### Connection Data
- **Profile Information**: Name, role, organization, bio
- **Contact Details**: Email, phone, social media
- **Professional Info**: Experience, skills, interests
- **Program Data**: Cohort, participation history

### Favorites System
- **Local Storage**: Favorites stored locally
- **Sync**: Sync with server for cross-device access
- **Organization**: Group favorites by category
- **Export**: Export favorite connections

## Performance Considerations

### Loading States
- **Skeleton Cards**: Placeholder cards while loading
- **Infinite Scroll**: Load more connections as user scrolls
- **Lazy Loading**: Load images and details on demand
- **Caching**: Cache connection data for faster access

### Search Performance
- **Debouncing**: Prevent excessive search requests
- **Indexing**: Optimize search index for fast queries
- **Pagination**: Limit results per page
- **Caching**: Cache search results

## Accessibility Features

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through cards
- **Focus Management**: Clear focus indicators
- **Keyboard Shortcuts**: Quick access to filters and search

### Screen Reader Support
- **Semantic Structure**: Proper heading hierarchy
- **ARIA Labels**: Descriptive labels for interactive elements
- **Live Regions**: Announce search results and filter changes

### Visual Accessibility
- **Color Contrast**: High contrast for all text and elements
- **Touch Targets**: Minimum 44px for interactive elements
- **Motion**: Respect reduced motion preferences

## Implementation Examples

### Page Structure
```tsx
<ConnectionsPage>
  <PageHeader
    title="Connections"
    subtitle="Manage your professional network"
    searchBar={<SearchBar placeholder="Search connections..." />}
  />
  
  <FilterBar
    filters={connectionFilters}
    activeFilters={activeFilters}
    onFilterChange={handleFilterChange}
  />
  
  <ConnectionGrid
    connections={filteredConnections}
    onCardClick={handleCardClick}
    onFavoriteToggle={handleFavoriteToggle}
  />
  
  <PeekPanel
    isOpen={showPeekPanel}
    connection={selectedConnection}
    onClose={handleClosePeekPanel}
  />
</ConnectionsPage>
```

### Filter Component
```tsx
<FilterBar>
  {filterTypes.map(type => (
    <FilterTag
      key={type.id}
      label={type.label}
      isActive={activeFilters.includes(type.id)}
      onClick={() => toggleFilter(type.id)}
    />
  ))}
  <ClearFiltersButton onClick={clearAllFilters} />
</FilterBar>
```

### Connection Card
```tsx
<ConnectionCard
  connection={connection}
  isFavorite={favorites.includes(connection.id)}
  onClick={() => openPeekPanel(connection)}
  onFavoriteToggle={() => toggleFavorite(connection.id)}
/>
``` 