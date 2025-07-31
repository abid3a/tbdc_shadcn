import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/google-calendar';

export async function GET(request: NextRequest) {
  try {
    console.log('Starting Google OAuth flow...');
    
    // Check environment variables first
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    console.log('Environment variables check:', {
      clientId: clientId ? 'present' : 'missing',
      clientSecret: clientSecret ? 'present' : 'missing',
      redirectUri: redirectUri || 'missing'
    });

    if (!clientId || !clientSecret || !redirectUri) {
      console.error('Missing required environment variables');
      return NextResponse.json({
        error: 'Google Calendar not configured',
        details: 'Missing environment variables. Please check GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI',
        missing: {
          clientId: !clientId,
          clientSecret: !clientSecret,
          redirectUri: !redirectUri
        }
      }, { status: 500 });
    }

    const calendarService = new GoogleCalendarService();
    const authUrl = calendarService.getAuthUrl();
    
    console.log('Generated OAuth URL:', authUrl);
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error in Google OAuth route:', error);
    
    let errorMessage = 'Failed to generate authorization URL';
    let details = 'Unknown error occurred';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      details = error.stack || 'No additional details available';
    }
    
    return NextResponse.json({
      error: errorMessage,
      details: details,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 