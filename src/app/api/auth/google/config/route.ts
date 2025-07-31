import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    const organizerEmail = process.env.GOOGLE_CALENDAR_ORGANIZER_EMAIL;

    // Get the current host and protocol
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const currentUrl = `${protocol}://${host}`;

    console.log('OAuth Configuration Debug:', {
      clientId: clientId ? `${clientId.substring(0, 10)}...` : 'missing',
      clientSecret: clientSecret ? `${clientSecret.substring(0, 10)}...` : 'missing',
      redirectUri: redirectUri || 'missing',
      organizerEmail: organizerEmail || 'missing',
      currentHost: host,
      currentProtocol: protocol,
      currentUrl: currentUrl
    });

    return NextResponse.json({
      success: true,
      configuration: {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        hasRedirectUri: !!redirectUri,
        hasOrganizerEmail: !!organizerEmail,
        redirectUri: redirectUri,
        organizerEmail: organizerEmail,
        currentHost: host,
        currentProtocol: protocol,
        currentUrl: currentUrl
      },
      recommendations: {
        redirectUriShouldBe: `${currentUrl}/api/auth/google/callback`,
        isRedirectUriCorrect: redirectUri === `${currentUrl}/api/auth/google/callback`
      }
    });
  } catch (error) {
    console.error('Error in OAuth config debug:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 