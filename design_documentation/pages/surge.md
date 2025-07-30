# Surge Page

## Overview

The Surge page is a specialized section of the TBDC application focused on the Surge program, providing mentorship booking, wallet management, and program-specific features for participants.

## Page Purpose

- **Mentorship Booking**: Schedule and manage mentorship sessions
- **Wallet Management**: Track and manage program credits/funds
- **Program Dashboard**: Surge-specific metrics and progress
- **Mentor Discovery**: Find and connect with available mentors

## Layout Structure

### Header Section
```
┌─────────────────────────────────────────────────┐
│  Surge Program                [Wallet Balance]  │
│  Mentorship and program management              │
└─────────────────────────────────────────────────┘
```

### Navigation Tabs
```
┌─────────────────────────────────────────────────┐
│  [Dashboard] [Bookings] [Mentors] [Wallet]     │
│  [History] [Settings]                          │
└─────────────────────────────────────────────────┘
```

### Content Area
```
┌─────────────────────────────────────────────────┐
│  [Program Stats] [Recent Bookings]              │
│  [Available Mentors] [Wallet Activity]          │
│  [Upcoming Sessions] [Quick Actions]            │
└─────────────────────────────────────────────────┘
```

## Core Features

### Surge Dashboard
- **Program Overview**: Surge-specific metrics and progress
- **Booking Summary**: Recent and upcoming mentorship sessions
- **Wallet Status**: Current balance and transaction history
- **Mentor Recommendations**: Suggested mentors based on interests

### Booking System
- **Mentor Selection**: Browse available mentors and their expertise
- **Session Scheduling**: Book mentorship sessions with available slots
- **Payment Processing**: Use wallet credits for session bookings
- **Booking Management**: View, modify, and cancel bookings

### Mentor Directory
- **Mentor Profiles**: Detailed mentor information and expertise
- **Availability Calendar**: View mentor availability and book slots
- **Rating System**: Mentor ratings and reviews from participants
- **Expertise Filtering**: Filter mentors by skills and experience

### Wallet Management
- **Balance Tracking**: Current wallet balance and credit history
- **Transaction History**: Detailed record of all transactions
- **Credit Purchase**: Buy additional credits if needed
- **Usage Analytics**: Track spending patterns and session costs

## User Roles and Permissions

### Surge Participants
- **View**: Available mentors and booking options
- **Book**: Schedule mentorship sessions
- **Manage**: Personal bookings and wallet
- **Rate**: Provide feedback on completed sessions

### Surge Mentors
- **Profile Management**: Update availability and expertise
- **Session Management**: View and manage booked sessions
- **Earnings Tracking**: Monitor session earnings and payments
- **Calendar Management**: Set availability and block times

### Surge Administrators
- **Program Management**: Oversee Surge program operations
- **Mentor Onboarding**: Approve and manage mentor applications
- **Financial Management**: Monitor wallet transactions and balances
- **Analytics**: Track program performance and participant engagement

## Booking Workflow

### Session Booking Process
1. **Mentor Selection**: Browse and filter available mentors
2. **Slot Selection**: Choose available time slot from mentor calendar
3. **Session Details**: Specify session topic and objectives
4. **Payment Confirmation**: Confirm wallet credit deduction
5. **Booking Confirmation**: Receive confirmation and calendar invite

### Session Management
- **Pre-Session**: Review session details and prepare questions
- **During Session**: Join video call or meeting platform
- **Post-Session**: Provide feedback and rate the session
- **Follow-up**: Access session notes and action items

## Wallet System

### Credit Management
- **Initial Credits**: Credits provided upon program enrollment
- **Session Costs**: Credit cost per mentorship session
- **Credit Purchase**: Option to buy additional credits
- **Credit Expiration**: Time limits on credit usage

### Transaction Types
- **Session Bookings**: Deduct credits for mentorship sessions
- **Credit Purchases**: Add credits to wallet
- **Refunds**: Credit returns for cancelled sessions
- **Adjustments**: Administrative credit adjustments

## Implementation Examples

### Surge Dashboard
```tsx
<SurgePage>
  <PageHeader
    title="Surge Program"
    subtitle="Mentorship and program management"
    walletBalance={<WalletBalance balance={walletBalance} />}
  />
  
  <TabNavigation
    tabs={surgeTabs}
    activeTab={activeTab}
    onTabChange={handleTabChange}
  />
  
  <SurgeContent
    activeTab={activeTab}
    data={surgeData}
    onAction={handleSurgeAction}
  />
</SurgePage>
```

### Booking Component
```tsx
<BookingSystem>
  <MentorGrid
    mentors={availableMentors}
    onMentorSelect={handleMentorSelect}
  />
  
  <BookingModal
    isOpen={showBookingModal}
    mentor={selectedMentor}
    availableSlots={availableSlots}
    onBookSession={handleBookSession}
    onClose={handleCloseBookingModal}
  />
</BookingSystem>
```

### Wallet Component
```tsx
<WalletManagement>
  <WalletBalance balance={walletBalance} />
  <TransactionHistory transactions={transactions} />
  <CreditPurchase onPurchase={handleCreditPurchase} />
</WalletManagement>
``` 