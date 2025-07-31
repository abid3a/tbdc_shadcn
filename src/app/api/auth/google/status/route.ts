import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if we have access token in cookies
    const accessToken = request.cookies.get('google_access_token');
    const refreshToken = request.cookies.get('google_refresh_token');

    const isConnected = !!(accessToken?.value || refreshToken?.value);

    console.log('Calendar connection status check:', {
      hasAccessToken: !!accessToken?.value,
      hasRefreshToken: !!refreshToken?.value,
      isConnected
    });

    return NextResponse.json({
      success: true,
      isConnected,
      hasAccessToken: !!accessToken?.value,
      hasRefreshToken: !!refreshToken?.value
    });
  } catch (error) {
    console.error('Error checking calendar connection status:', error);
    return NextResponse.json({
      success: false,
      isConnected: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 