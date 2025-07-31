import { NextRequest, NextResponse } from 'next/server';
import { GoogleCalendarService } from '@/lib/google-calendar';

// Helper function to get the base URL for redirects
function getBaseUrl() {
  return process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:3000';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    console.log('OAuth callback received:', {
      hasCode: !!code,
      hasError: !!error,
      hasState: !!state,
      error: error,
      url: request.url
    });

    if (error) {
      console.error('OAuth error received:', error);
      return NextResponse.redirect(`${getBaseUrl()}/surge/dashboard?error=auth_failed&details=${encodeURIComponent(error)}`);
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(`${getBaseUrl()}/surge/dashboard?error=no_code`);
    }

    console.log('Received authorization code, exchanging for tokens...');

    const calendarService = new GoogleCalendarService();
    const tokens = await calendarService.getTokensFromCode(code);

    console.log('Successfully obtained tokens:', {
      accessToken: tokens.access_token ? 'present' : 'missing',
      refreshToken: tokens.refresh_token ? 'present' : 'missing',
      tokenType: tokens.token_type,
      expiresIn: tokens.expires_in
    });

    // Store tokens in session or database (for demo, we'll use a simple approach)
    // In production, you'd want to store these securely in a database
    const response = NextResponse.redirect(`${getBaseUrl()}/surge/dashboard?success=calendar_connected`);
    
    // Set tokens in cookies (for demo purposes - in production use secure session storage)
    if (tokens.access_token) {
      response.cookies.set('google_access_token', tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600 // 1 hour
      });
    }
    
    if (tokens.refresh_token) {
      response.cookies.set('google_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 3600 // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Error in OAuth callback:', {
      error: error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.redirect(`${getBaseUrl()}/surge/dashboard?error=token_exchange_failed&details=${encodeURIComponent(errorMessage)}`);
  }
} 