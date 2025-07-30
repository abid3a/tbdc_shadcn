
# Testing Strategy

## Overview

This document outlines the comprehensive testing strategy for the TBDC Web Application, covering unit tests, integration tests, and end-to-end testing approaches.

## Testing Framework

### Primary Tools
- **Test Runner**: Vitest (faster alternative to Jest)
- **Component Testing**: React Testing Library
- **E2E Testing**: Playwright
- **Mocking**: Vitest built-in mocking
- **Coverage**: Vitest coverage reporting

### Additional Tools
- **MSW (Mock Service Worker)**: API mocking
- **Testing Library Jest DOM**: Custom matchers
- **User Event**: User interaction simulation
- **Accessibility Testing**: jest-axe

## Test Structure

### Directory Organization
```
src/
├── __tests__/              # Test utilities and setup
├── components/
│   ├── __tests__/         # Component-specific tests
│   │   ├── SessionCard.test.tsx
│   │   ├── MeetingCard.test.tsx
│   │   └── ConnectionCard.test.tsx
│   └── ui/
│       └── __tests__/     # UI component tests
├── hooks/
│   └── __tests__/         # Custom hook tests
├── contexts/
│   └── __tests__/         # Context tests
├── lib/
│   └── __tests__/         # Utility function tests
└── app/
    └── __tests__/         # Page and route tests
```

### Test File Naming Convention
- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.ts`
- Utility tests: `utilityName.test.ts`
- Page tests: `pageName.test.tsx`

## Component Testing

### Basic Component Test Structure

```tsx
// SessionCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SessionCard } from '@/components/SessionCard';
import { mockSession } from '@/__tests__/mocks/session';

describe('SessionCard', () => {
  const defaultProps = {
    session: mockSession,
    onCardClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders session information correctly', () => {
    render(<SessionCard {...defaultProps} />);
    
    expect(screen.getByText(mockSession.name)).toBeInTheDocument();
    expect(screen.getByText(mockSession.type)).toBeInTheDocument();
    expect(screen.getByText(mockSession.duration)).toBeInTheDocument();
  });

  it('calls onCardClick when card is clicked', async () => {
    const user = userEvent.setup();
    render(<SessionCard {...defaultProps} />);
    
    const card = screen.getByRole('button');
    await user.click(card);
    
    expect(defaultProps.onCardClick).toHaveBeenCalledWith(mockSession.id);
  });

  it('displays correct status badge', () => {
    render(<SessionCard {...defaultProps} />);
    
    const statusBadge = screen.getByText(mockSession.status);
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('handles missing optional data gracefully', () => {
    const sessionWithoutDescription = { ...mockSession, description: undefined };
    render(<SessionCard session={sessionWithoutDescription} onCardClick={jest.fn()} />);
    
    expect(screen.getByText('No description available')).toBeInTheDocument();
  });
});
```

### Testing with Context Providers

```tsx
// MeetingCard.test.tsx
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '@/contexts/auth-context';
import { MeetingCard } from '@/components/MeetingCard';

const renderWithAuth = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('MeetingCard', () => {
  it('renders with user context', () => {
    renderWithAuth(<MeetingCard meeting={mockMeeting} />);
    
    expect(screen.getByText(mockMeeting.title)).toBeInTheDocument();
  });
});
```

### Testing Form Components

```tsx
// LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '@/components/auth/LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('submits form with correct data', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
```

## Hook Testing

### Custom Hook Test Example

```tsx
// useData.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useData } from '@/hooks/use-data';
import { mockSessions } from '@/__tests__/mocks/sessions';

// Mock the data fetching function
jest.mock('@/data', () => ({
  getSessions: jest.fn(),
}));

import { getSessions } from '@/data';

describe('useData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns sessions data', async () => {
    (getSessions as jest.Mock).mockResolvedValue(mockSessions);
    
    const { result } = renderHook(() => useData('sessions'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockSessions);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch errors gracefully', async () => {
    const error = new Error('Failed to fetch');
    (getSessions as jest.Mock).mockRejectedValue(error);
    
    const { result } = renderHook(() => useData('sessions'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe(error);
    expect(result.current.data).toBe(null);
  });
});
```

## Mock Data

### Mock Data Structure

```tsx
// __tests__/mocks/session.ts
export const mockSession = {
  id: 's-001',
  name: 'Introduction to North America',
  date: '2024-01-15',
  start_time: '10:00',
  end_time: '11:00',
  duration: '1h',
  type: 'Workshop',
  location: 'Virtual',
  location_url: 'https://zoom.us/j/123456',
  description: 'Learn about the North American market',
  cohort: 'Cohort 2024',
  max_participants: 50,
  status: 'scheduled',
  created_at: '2024-01-01T00:00:00Z',
};

export const mockSessions = [
  mockSession,
  {
    ...mockSession,
    id: 's-002',
    name: 'Investor Relations',
    type: 'Panel',
  },
];
```

### API Mocking with MSW

```tsx
// __tests__/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/sessions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockSessions)
    );
  }),

  rest.post('/api/sessions', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ id: 's-new', ...req.body })
    );
  }),

  rest.get('/api/sessions/:id', (req, res, ctx) => {
    const { id } = req.params;
    const session = mockSessions.find(s => s.id === id);
    
    if (!session) {
      return res(ctx.status(404));
    }
    
    return res(ctx.json(session));
  }),
];
```

## Integration Testing

### Page Component Tests

```tsx
// SessionsPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SessionsPage } from '@/app/sessions/page';
import { mockSessions } from '@/__tests__/mocks/sessions';

// Mock the data hook
jest.mock('@/hooks/use-data', () => ({
  useData: jest.fn(),
}));

import { useData } from '@/hooks/use-data';

describe('SessionsPage', () => {
  const mockUseData = useData as jest.Mock;

  beforeEach(() => {
    mockUseData.mockReturnValue({
      data: mockSessions,
      loading: false,
      error: null,
    });
  });

  it('renders sessions list', () => {
    render(<SessionsPage />);
    
    expect(screen.getByText('Sessions')).toBeInTheDocument();
    expect(screen.getByText('Introduction to North America')).toBeInTheDocument();
    expect(screen.getByText('Investor Relations')).toBeInTheDocument();
  });

  it('filters sessions by type', async () => {
    const user = userEvent.setup();
    render(<SessionsPage />);
    
    const filterSelect = screen.getByLabelText(/filter by type/i);
    await user.selectOptions(filterSelect, 'Workshop');
    
    expect(screen.getByText('Introduction to North America')).toBeInTheDocument();
    expect(screen.queryByText('Investor Relations')).not.toBeInTheDocument();
  });

  it('shows loading state', () => {
    mockUseData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    
    render(<SessionsPage />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseData.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Failed to load sessions'),
    });
    
    render(<SessionsPage />);
    
    expect(screen.getByText(/error loading sessions/i)).toBeInTheDocument();
  });
});
```

## Accessibility Testing

### Component Accessibility Tests

```tsx
// SessionCard.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SessionCard } from '@/components/SessionCard';

expect.extend(toHaveNoViolations);

describe('SessionCard Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <SessionCard session={mockSession} onCardClick={jest.fn()} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper ARIA labels', () => {
    render(<SessionCard session={mockSession} onCardClick={jest.fn()} />);
    
    expect(screen.getByRole('button')).toHaveAttribute('aria-label');
    expect(screen.getByRole('button')).toHaveAttribute('aria-describedby');
  });
});
```

## Test Configuration

### Vitest Configuration

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/__tests__/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Test Setup File

```ts
// src/__tests__/setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

## Testing Best Practices

### General Guidelines

1. **Test Behavior, Not Implementation**
   - Focus on what the component does, not how it does it
   - Test user interactions and outcomes
   - Avoid testing internal implementation details

2. **Use Descriptive Test Names**
   - Test names should describe the scenario and expected outcome
   - Use the pattern: "should [expected behavior] when [condition]"

3. **Keep Tests Simple and Focused**
   - Each test should verify one specific behavior
   - Avoid complex test setups
   - Use helper functions for common operations

4. **Mock External Dependencies**
   - Mock API calls, timers, and external services
   - Use MSW for API mocking
   - Mock browser APIs when needed

5. **Test Error States**
   - Test loading states
   - Test error handling
   - Test edge cases and boundary conditions

### Component Testing Guidelines

1. **Test User Interactions**
   - Click events, form submissions, keyboard navigation
   - Use `userEvent` for realistic user interactions
   - Test accessibility features

2. **Test Props and State**
   - Test with different prop combinations
   - Test state changes and updates
   - Test conditional rendering

3. **Test Integration**
   - Test component integration with contexts
   - Test component communication
   - Test data flow between components

## Coverage Goals

### Target Coverage Metrics

- **Statements**: 90%
- **Branches**: 85%
- **Functions**: 90%
- **Lines**: 90%

### Coverage Exclusions

- Configuration files
- Type definitions
- Test files
- Build artifacts
- Third-party libraries

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run coverage
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Debugging Tests

### Common Issues and Solutions

1. **Async Testing Issues**
   - Use `waitFor` for async operations
   - Properly mock async functions
   - Handle loading states

2. **Component Rendering Issues**
   - Check for missing providers
   - Verify mock data structure
   - Ensure proper cleanup

3. **Test Isolation Issues**
   - Clear mocks between tests
   - Reset state in `beforeEach`
   - Use unique test data

### Debugging Tools

- **Vitest UI**: Interactive test runner
- **React Testing Library Debug**: `screen.debug()`
- **Jest Debugger**: VS Code debugging
- **Coverage Reports**: HTML coverage reports
