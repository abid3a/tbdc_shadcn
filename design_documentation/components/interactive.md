# Interactive Components

## Overview

Interactive components provide the primary means for users to engage with the application. They include buttons, modals, tabs, and other elements that respond to user input and provide feedback.

## Buttons

### Description
Buttons are the primary interactive elements used for actions, navigation, and form submissions throughout the application.

### Button Types

#### Primary Button
- **Purpose**: Main actions, form submissions, primary CTAs
- **Style**: Gold background (`#f59e0b`), black text (`#000000`)
- **Usage**: "Save", "Submit", "Create", "Join"

#### Secondary Button
- **Purpose**: Secondary actions, alternative options
- **Style**: Green background (`#10b981`), white text (`#ffffff`)
- **Usage**: "Cancel", "Back", "Edit", "View"

#### Tertiary Button
- **Purpose**: Less prominent actions, links
- **Style**: Transparent background, colored text/border
- **Usage**: "Learn More", "View Details", "Skip"

#### Disabled Button
- **Purpose**: Inactive or unavailable actions
- **Style**: Grayed out appearance, reduced opacity
- **Usage**: When action is not available or form is invalid

### Button Sizes

#### Small
- **Height**: 32px
- **Padding**: 8px 16px
- **Font Size**: 14px
- **Usage**: Compact spaces, secondary actions

#### Medium (Default)
- **Height**: 40px
- **Padding**: 12px 20px
- **Font Size**: 16px
- **Usage**: Standard buttons, forms

#### Large
- **Height**: 48px
- **Padding**: 16px 24px
- **Font Size**: 16px
- **Usage**: Primary CTAs, important actions

### Button States

#### Default
- Normal appearance with standard styling

#### Hover
- Subtle elevation or color change
- Cursor pointer
- Visual feedback for interaction

#### Active/Pressed
- Depressed appearance
- Immediate visual feedback

#### Focus
- Clear focus indicator (outline or ring)
- Keyboard navigation support

#### Disabled
- Reduced opacity (0.5)
- Cursor not-allowed
- No hover effects

#### Loading
- Spinner or loading indicator
- Disabled interaction
- Text may be hidden or replaced

### Button Variants

#### Icon Button
- **Purpose**: Actions with icons only
- **Size**: Square (40px x 40px)
- **Usage**: Close, edit, delete, favorite

#### Text Button
- **Purpose**: Link-like appearance
- **Style**: No background, colored text
- **Usage**: "Cancel", "Skip", "Learn More"

#### Group Button
- **Purpose**: Related actions grouped together
- **Style**: Connected buttons with shared borders
- **Usage**: Filter options, view modes

## Modals

### Description
Modals are overlay dialogs that appear on top of the current page to display additional information or request user input.

### Modal Types

#### Confirmation Modal
- **Purpose**: Confirm destructive or important actions
- **Content**: Clear message, action buttons
- **Usage**: Delete confirmation, save changes

#### Form Modal
- **Purpose**: Collect user input
- **Content**: Form fields, validation, submit/cancel
- **Usage**: Create new items, edit existing data

#### Information Modal
- **Purpose**: Display detailed information
- **Content**: Rich content, images, links
- **Usage**: Help text, detailed views, instructions

#### Alert Modal
- **Purpose**: Display important messages
- **Content**: Warning/error messages, action buttons
- **Usage**: Error notifications, system alerts

### Modal Structure

```
┌─────────────────────────────────┐
│  Header                         │
│  ┌─────────────────────────────┐ │
│  │  Title                      │ │
│  │  Close Button               │ │
│  └─────────────────────────────┘ │
│  ┌─────────────────────────────┐ │
│  │  Content Area               │ │
│  │                             │ │
│  │  [Modal content goes here]  │ │
│  │                             │ │
│  └─────────────────────────────┘ │
│  ┌─────────────────────────────┐ │
│  │  Footer                     │ │
│  │  [Action buttons]           │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Modal Behavior

#### Opening
- **Trigger**: Button click, link click, automatic
- **Animation**: Fade in with backdrop blur
- **Focus**: Trapped within modal content

#### Closing
- **Methods**: Close button, escape key, backdrop click
- **Animation**: Fade out with backdrop
- **Focus**: Returns to triggering element

#### Accessibility
- **Focus Management**: Trap focus within modal
- **Keyboard Navigation**: Tab through modal elements
- **Screen Reader**: Announce modal opening/closing
- **ARIA**: Proper roles and labels

## Tabs

### Description
Tabs organize content into logical sections, allowing users to switch between different views or categories of information.

### Tab Types

#### Standard Tabs
- **Purpose**: Organize related content sections
- **Style**: Underlined active state
- **Usage**: Page sections, content categories

#### Card Tabs
- **Purpose**: Visual content organization
- **Style**: Card-like appearance with active highlight
- **Usage**: Dashboard widgets, feature sections

#### Vertical Tabs
- **Purpose**: Sidebar navigation
- **Style**: Vertical list with active indicator
- **Usage**: Settings pages, configuration panels

### Tab Structure

```
┌─────────────────────────────────┐
│  [Tab 1] [Tab 2] [Tab 3]       │
├─────────────────────────────────┤
│                                 │
│  Content for Active Tab         │
│                                 │
│                                 │
└─────────────────────────────────┘
```

### Tab Behavior

#### Navigation
- **Click**: Switch to selected tab
- **Keyboard**: Arrow keys for navigation
- **Focus**: Clear focus indicator

#### Content Switching
- **Animation**: Smooth transition between content
- **Loading**: Skeleton or spinner for dynamic content
- **State**: Maintain tab selection across page loads

#### Responsive Behavior
- **Mobile**: Scrollable tab list
- **Tablet**: Standard horizontal layout
- **Desktop**: Full width with proper spacing

## Form Components

### Input Fields

#### Text Input
- **Purpose**: Single line text entry
- **States**: Default, focus, error, disabled
- **Validation**: Real-time or on blur

#### Textarea
- **Purpose**: Multi-line text entry
- **Resize**: Optional vertical resize
- **Character Count**: Optional limit indicator

#### Select Dropdown
- **Purpose**: Single choice from options
- **Search**: Optional search functionality
- **Multi-select**: Optional multiple selection

#### Checkbox/Radio
- **Purpose**: Binary or single choice
- **Grouping**: Logical grouping for related options
- **Accessibility**: Proper labels and descriptions

### Form Validation

#### Visual Feedback
- **Success**: Green border and checkmark
- **Error**: Red border and error message
- **Warning**: Yellow border and warning message

#### Error Messages
- **Position**: Below input field
- **Style**: Red text, clear and actionable
- **Timing**: On blur or submit

## Interactive Patterns

### Loading States
- **Spinner**: Circular loading indicator
- **Skeleton**: Placeholder content structure
- **Progress Bar**: Linear progress indicator
- **Button Loading**: Inline spinner with disabled state

### Feedback Patterns
- **Toast Notifications**: Temporary success/error messages
- **Inline Validation**: Real-time form validation
- **Confirmation**: Action confirmation dialogs
- **Undo**: Reversible action notifications

### Accessibility Features

#### Keyboard Navigation
- **Tab Order**: Logical tab sequence
- **Focus Indicators**: Clear focus styling
- **Keyboard Shortcuts**: Common shortcuts (Ctrl+S, Esc)

#### Screen Reader Support
- **ARIA Labels**: Descriptive labels for interactive elements
- **Live Regions**: Dynamic content announcements
- **Role Attributes**: Proper semantic roles

#### Visual Accessibility
- **Color Contrast**: WCAG AA compliant ratios
- **Touch Targets**: Minimum 44px for mobile
- **Motion**: Respects reduced motion preferences

## Implementation Examples

### Primary Button
```tsx
<Button variant="primary" size="medium">
  Create New Session
</Button>
```

### Confirmation Modal
```tsx
<Modal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  title="Delete Session"
>
  <p>Are you sure you want to delete this session?</p>
  <div className="flex gap-2 justify-end">
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleDelete}>
      Delete
    </Button>
  </div>
</Modal>
```

### Tab Navigation
```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
    <TabsTrigger value="history">History</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <OverviewContent />
  </TabsContent>
  <TabsContent value="details">
    <DetailsContent />
  </TabsContent>
  <TabsContent value="history">
    <HistoryContent />
  </TabsContent>
</Tabs>
``` 