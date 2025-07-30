# Feedback Components

## Overview

Feedback components provide users with information about the state of the application, their actions, and system responses. They include alerts, loading states, notifications, and progress indicators that help users understand what's happening and what they can do next.

## Alerts

### Description
Alerts are prominent messages that inform users about important information, warnings, errors, or successful actions.

### Alert Types

#### Success Alert
- **Purpose**: Confirm successful actions or positive outcomes
- **Style**: Green background with checkmark icon
- **Usage**: Form submissions, data saves, completed actions

#### Warning Alert
- **Purpose**: Caution users about potential issues
- **Style**: Yellow background with warning icon
- **Usage**: Data validation warnings, system notices

#### Error Alert
- **Purpose**: Inform users about errors or failed actions
- **Style**: Red background with error icon
- **Usage**: Form validation errors, system failures

#### Info Alert
- **Purpose**: Provide general information or tips
- **Style**: Blue background with info icon
- **Usage**: Help text, system announcements

### Alert Structure

```
┌─────────────────────────────────┐
│  [Icon]  Title                  │
│          Description text       │
│          [Action buttons]       │
└─────────────────────────────────┘
```

### Alert Behavior

#### Display
- **Timing**: Immediate or after action completion
- **Duration**: Persistent until dismissed or auto-dismiss
- **Position**: Top of content area or inline

#### Dismissal
- **Manual**: Close button or dismiss action
- **Auto**: Automatic dismissal after timeout
- **Scroll**: Dismiss on page scroll

#### Actions
- **Primary**: Main action button
- **Secondary**: Alternative action
- **Dismiss**: Close alert

## Loading States

### Description
Loading states provide visual feedback when content is being fetched, processed, or updated.

### Loading Types

#### Spinner
- **Purpose**: Indicate ongoing processes
- **Style**: Circular rotating animation
- **Usage**: Button actions, form submissions

#### Skeleton
- **Purpose**: Show content structure while loading
- **Style**: Animated placeholder blocks
- **Usage**: Page content, card content

#### Progress Bar
- **Purpose**: Show completion progress
- **Style**: Linear progress indicator
- **Usage**: File uploads, data processing

#### Button Loading
- **Purpose**: Indicate button action in progress
- **Style**: Inline spinner with disabled state
- **Usage**: Form submissions, API calls

### Loading Behavior

#### Timing
- **Immediate**: Show for actions under 200ms
- **Delayed**: Show after 200ms for longer processes
- **Minimum**: Display for at least 500ms

#### States
- **Loading**: Active animation
- **Success**: Checkmark or success state
- **Error**: Error state with retry option

## Notifications

### Description
Notifications are temporary messages that appear to inform users about events, updates, or actions.

### Notification Types

#### Toast Notifications
- **Purpose**: Brief, non-intrusive messages
- **Style**: Small overlay with auto-dismiss
- **Usage**: Success confirmations, quick updates

#### Banner Notifications
- **Purpose**: Important system-wide messages
- **Style**: Full-width banner at top/bottom
- **Usage**: System maintenance, critical updates

#### In-App Notifications
- **Purpose**: Contextual information within pages
- **Style**: Inline or floating notifications
- **Usage**: Feature announcements, tips

### Notification Structure

```
┌─────────────────────────────────┐
│  [Icon]  Message                │
│          [Action] [Dismiss]     │
└─────────────────────────────────┘
```

### Notification Behavior

#### Display
- **Position**: Top-right, bottom-right, or inline
- **Stacking**: Multiple notifications stack vertically
- **Animation**: Slide in/out with fade

#### Dismissal
- **Auto**: Automatic dismissal after 3-5 seconds
- **Manual**: Close button or click to dismiss
- **Action**: Click action button to dismiss

## Progress Indicators

### Description
Progress indicators show the completion status of ongoing processes or multi-step workflows.

### Progress Types

#### Linear Progress
- **Purpose**: Show completion percentage
- **Style**: Horizontal bar with percentage
- **Usage**: File uploads, data processing

#### Circular Progress
- **Purpose**: Indicate ongoing processes
- **Style**: Circular progress ring
- **Usage**: Loading states, indeterminate progress

#### Step Progress
- **Purpose**: Show multi-step workflow progress
- **Style**: Connected steps with current indicator
- **Usage**: Onboarding, form wizards

### Progress States

#### Determinate
- **Style**: Shows specific percentage
- **Usage**: Known completion time
- **Animation**: Smooth progress updates

#### Indeterminate
- **Style**: Animated without specific percentage
- **Usage**: Unknown completion time
- **Animation**: Continuous loading animation

## Form Feedback

### Description
Form feedback provides real-time validation and error information to users during data entry.

### Feedback Types

#### Input Validation
- **Real-time**: Validate as user types
- **On-blur**: Validate when field loses focus
- **On-submit**: Validate on form submission

#### Error Messages
- **Position**: Below input field
- **Style**: Red text with error icon
- **Content**: Clear, actionable error description

#### Success Indicators
- **Style**: Green checkmark or border
- **Usage**: Valid input confirmation
- **Timing**: Show after successful validation

### Validation States

#### Default
- **Style**: Normal input appearance
- **Message**: No validation message

#### Valid
- **Style**: Green border or checkmark
- **Message**: Success message (optional)

#### Invalid
- **Style**: Red border with error icon
- **Message**: Error message with guidance

#### Loading
- **Style**: Loading spinner or skeleton
- **Message**: "Validating..." or similar

## Status Indicators

### Description
Status indicators show the current state of items, processes, or system components.

### Status Types

#### Badge Status
- **Purpose**: Show item status or count
- **Style**: Small colored badge
- **Usage**: Notification counts, item states

#### Icon Status
- **Purpose**: Indicate item state with icon
- **Style**: Icon with color coding
- **Usage**: Online/offline, active/inactive

#### Text Status
- **Purpose**: Show detailed status information
- **Style**: Text with color coding
- **Usage**: Process states, item status

### Status Colors

#### Success/Active
- **Color**: Green (`#10b981`)
- **Usage**: Completed, active, online

#### Warning/Pending
- **Color**: Yellow (`#f59e0b`)
- **Usage**: Pending, in progress, caution

#### Error/Inactive
- **Color**: Red (`#ef4444`)
- **Usage**: Error, inactive, offline

#### Info/Neutral
- **Color**: Blue (`#3b82f6`)
- **Usage**: Information, neutral state

## Accessibility Features

### Screen Reader Support
- **Announcements**: Live regions for dynamic content
- **Descriptions**: Clear descriptions of feedback states
- **Labels**: Proper ARIA labels for interactive elements

### Visual Accessibility
- **Color**: Not relying solely on color for information
- **Contrast**: High contrast ratios for all states
- **Motion**: Respecting reduced motion preferences

### Keyboard Navigation
- **Focus**: Proper focus management for dismissible elements
- **Shortcuts**: Keyboard shortcuts for common actions
- **Escape**: Escape key to dismiss modals and alerts

## Implementation Examples

### Success Alert
```tsx
<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your session has been successfully created.
  </AlertDescription>
</Alert>
```

### Loading Button
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Creating...
    </>
  ) : (
    'Create Session'
  )}
</Button>
```

### Toast Notification
```tsx
<Toast>
  <ToastTitle>Session Updated</ToastTitle>
  <ToastDescription>
    Your session details have been saved successfully.
  </ToastDescription>
</Toast>
```

### Progress Bar
```tsx
<Progress value={uploadProgress} className="w-full" />
<div className="text-sm text-muted-foreground">
  {uploadProgress}% complete
</div>
```

### Form Validation
```tsx
<div className="space-y-2">
  <Input
    type="email"
    placeholder="Enter your email"
    className={cn(
      "border",
      errors.email ? "border-red-500" : "border-gray-300"
    )}
  />
  {errors.email && (
    <p className="text-sm text-red-500 flex items-center gap-1">
      <AlertCircle className="h-4 w-4" />
      {errors.email.message}
    </p>
  )}
</div>
``` 