import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/google-calendar';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      mentorEmail,
      userEmail,
      startTime,
      endTime,
      topic
    } = body;

    console.log('Creating booking with data:', { mentorEmail, userEmail, startTime, endTime, topic });

    // Validate required fields
    if (!mentorEmail || !userEmail || !startTime || !endTime || !topic) {
      console.error('Missing required fields:', { mentorEmail, userEmail, startTime, endTime, topic });
      return NextResponse.json(
        { error: 'Missing required fields: mentorEmail, userEmail, startTime, endTime, topic' },
        { status: 400 }
      );
    }

    // Get OAuth2 tokens from cookies
    const accessToken = request.cookies.get('google_access_token')?.value;
    const refreshToken = request.cookies.get('google_refresh_token')?.value;

    if (!accessToken) {
      console.error('No Google Calendar access token found');
      return NextResponse.json(
        { error: 'Google Calendar not connected. Please connect your calendar first.' },
        { status: 401 }
      );
    }

    const calendarService = new GoogleCalendarService();
    
    // Set the access token for this request
    calendarService.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    const event = await calendarService.createEvent({
      summary: `Mentor Session: ${topic}`,
      description: `Mentor session with ${mentorEmail}.\n\nTopic: ${topic}\n\nThis meeting will be conducted via Google Meet.`,
      startTime,
      endTime,
      attendees: [mentorEmail, userEmail], // Only include mentor and user emails
      location: 'Virtual Meeting via Google Meet'
    });

    console.log('Booking created successfully:', { eventId: event.id, eventLink: event.htmlLink });

    return NextResponse.json({
      success: true,
      eventId: event.id,
      eventLink: event.htmlLink,
      meetLink: event.conferenceData?.entryPoints?.[0]?.uri || null
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 