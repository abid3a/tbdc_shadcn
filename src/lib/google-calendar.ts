import { OAuth2Client } from 'google-auth-library';

export class GoogleCalendarService {
  private oauth2Client: OAuth2Client;
  private organizerEmail: string;
  private google: any;

  constructor() {
    // Initialize OAuth2 client with environment variables
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    
    // Get organizer email from environment variable, default to abid@tbdc.com
    this.organizerEmail = process.env.GOOGLE_CALENDAR_ORGANIZER_EMAIL || 'abid@tbdc.com';

    console.log('Initializing Google Calendar Service with OAuth2:', {
      clientId: clientId ? 'configured' : 'missing',
      clientSecret: clientSecret ? 'configured' : 'missing',
      redirectUri: redirectUri || 'missing',
      organizerEmail: this.organizerEmail
    });

    // Validate required environment variables
    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error('Google OAuth2 credentials not configured. Please check your environment variables: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI');
    }

    // Initialize OAuth2Client directly
    this.oauth2Client = new OAuth2Client(
      clientId,
      clientSecret,
      redirectUri
    );
  }

  // Initialize googleapis dynamically
  private async getGoogle() {
    if (!this.google) {
      try {
        // Try dynamic import first
        const googleapis = await import('googleapis');
        this.google = googleapis.google;
        console.log('✅ googleapis loaded via dynamic import');
      } catch (error) {
        console.error('Failed to import googleapis via dynamic import:', error);
        
        // Fallback to require
        try {
          this.google = require('googleapis');
          console.log('✅ googleapis loaded via require');
        } catch (requireError) {
          console.error('Failed to import googleapis via require:', requireError);
          throw new Error('Failed to load Google APIs. Please check googleapis package installation.');
        }
      }
      
      // Validate google object
      if (!this.google || !this.google.auth) {
        throw new Error('Google APIs not properly initialized. google.auth is undefined.');
      }
    }
    return this.google;
  }

  // Get authorization URL for OAuth2 flow
  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Exchange authorization code for tokens
  async getTokensFromCode(code: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);
      return tokens;
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw new Error('Failed to authenticate with Google Calendar');
    }
  }

  // Set tokens for authenticated requests
  setCredentials(tokens: any) {
    this.oauth2Client.setCredentials(tokens);
  }

  // Create calendar event with Google Meet
  async createEvent(eventData: {
    summary: string;
    description: string;
    startTime: string;
    endTime: string;
    attendees: string[];
    location?: string;
  }) {
    console.log('Creating calendar event with data:', {
      summary: eventData.summary,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      attendees: eventData.attendees,
      organizer: this.organizerEmail
    });

    const google = await this.getGoogle();
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    const event = {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: eventData.startTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: eventData.endTime,
        timeZone: 'UTC',
      },
      organizer: {
        email: this.organizerEmail,
        self: false
      },
      attendees: eventData.attendees.map(email => ({ email })),
      location: eventData.location,
      // Add Google Meet conference
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        sendUpdates: 'all',
        conferenceDataVersion: 1, // Enable Google Meet
      });

      console.log('Calendar event created successfully:', {
        eventId: response.data.id,
        htmlLink: response.data.htmlLink,
        meetLink: response.data.conferenceData?.entryPoints?.[0]?.uri,
        organizer: response.data.organizer?.email
      });

      return response.data;
    } catch (error) {
      console.error('Error creating calendar event:', {
        error: error,
        message: error instanceof Error ? error.message : 'Unknown error',
        eventData: {
          summary: eventData.summary,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          attendees: eventData.attendees
        }
      });
      
      // Provide specific error messages
      if (error instanceof Error) {
        if (error.message.includes('unauthorized') || error.message.includes('401')) {
          throw new Error('Calendar access denied. Please reconnect your Google Calendar.');
        } else if (error.message.includes('calendar')) {
          throw new Error('Calendar access error. Please check your calendar permissions.');
        }
      }
      
      throw error;
    }
  }

  // Get calendar events (for checking availability)
  async getEvents(timeMin: string, timeMax: string) {
    const google = await this.getGoogle();
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    try {
      const response = await calendar.events.list({
        calendarId: 'primary',
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }
} 