import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('=== Google OAuth Debug Start ===');
    
    // Step 1: Check environment variables
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    console.log('Step 1 - Environment Variables:', {
      clientId: clientId ? `${clientId.substring(0, 10)}...` : 'missing',
      clientSecret: clientSecret ? `${clientSecret.substring(0, 10)}...` : 'missing',
      redirectUri: redirectUri || 'missing'
    });

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.json({
        step: 'Environment Variables',
        error: 'Missing required environment variables',
        missing: {
          clientId: !clientId,
          clientSecret: !clientSecret,
          redirectUri: !redirectUri
        }
      }, { status: 400 });
    }

    // Step 2: Test googleapis import
    console.log('Step 2 - Testing googleapis import...');
    let google;
    try {
      // Try dynamic import first
      const googleapis = await import('googleapis');
      google = googleapis.google;
      console.log('✅ googleapis imported successfully via dynamic import');
      
      // Additional check to ensure google.auth exists
      if (!google.auth) {
        throw new Error('google.auth is undefined');
      }
      console.log('✅ google.auth is available');
    } catch (error) {
      console.error('❌ Failed to import googleapis via dynamic import:', error);
      
      // Fallback to require
      try {
        google = require('googleapis');
        console.log('✅ googleapis imported successfully via require');
        
        if (!google.auth) {
          throw new Error('google.auth is undefined');
        }
        console.log('✅ google.auth is available');
      } catch (requireError) {
        console.error('❌ Failed to import googleapis via require:', requireError);
        return NextResponse.json({
          step: 'Google APIs Import',
          error: 'Failed to import googleapis',
          details: `Dynamic import: ${error instanceof Error ? error.message : 'Unknown error'}, Require: ${requireError instanceof Error ? requireError.message : 'Unknown error'}`
        }, { status: 500 });
      }
    }

    // Step 3: Test OAuth2Client import
    console.log('Step 3 - Testing OAuth2Client import...');
    let OAuth2Client;
    try {
      OAuth2Client = require('google-auth-library').OAuth2Client;
      console.log('✅ OAuth2Client imported successfully');
    } catch (error) {
      console.error('❌ Failed to import OAuth2Client:', error);
      return NextResponse.json({
        step: 'OAuth2Client Import',
        error: 'Failed to import OAuth2Client',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    // Step 4: Test OAuth2Client initialization
    console.log('Step 4 - Testing OAuth2Client initialization...');
    let oauth2Client;
    try {
      const { OAuth2Client } = require('google-auth-library');
      oauth2Client = new OAuth2Client(
        clientId,
        clientSecret,
        redirectUri
      );
      console.log('✅ OAuth2Client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize OAuth2Client:', error);
      return NextResponse.json({
        step: 'OAuth2Client Initialization',
        error: 'Failed to initialize OAuth2Client',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    // Step 5: Test auth URL generation
    console.log('Step 5 - Testing auth URL generation...');
    let authUrl;
    try {
      const scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ];

      authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        prompt: 'consent'
      });
      console.log('✅ Auth URL generated successfully');
    } catch (error) {
      console.error('❌ Failed to generate auth URL:', error);
      return NextResponse.json({
        step: 'Auth URL Generation',
        error: 'Failed to generate auth URL',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    console.log('=== Google OAuth Debug Complete ===');

    return NextResponse.json({
      success: true,
      message: 'All OAuth2 tests passed',
      authUrl: authUrl,
      steps: [
        '✅ Environment variables loaded',
        '✅ googleapis imported',
        '✅ OAuth2Client imported',
        '✅ OAuth2Client initialized',
        '✅ Auth URL generated'
      ]
    });

  } catch (error) {
    console.error('=== Google OAuth Debug Error ===', error);
    return NextResponse.json({
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 