import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('=== Google APIs Test Start ===');
    
    const results: any[] = [];
    
    // Test 1: Direct require
    try {
      console.log('Test 1: Direct require...');
      const googleapis = require('googleapis');
      results.push({
        method: 'Direct require',
        success: true,
        hasGoogle: !!googleapis,
        hasGoogleAuth: !!(googleapis && googleapis.auth),
        googleType: typeof googleapis,
        authType: typeof googleapis?.auth
      });
      console.log('✅ Direct require successful');
    } catch (error) {
      results.push({
        method: 'Direct require',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log('❌ Direct require failed:', error);
    }
    
    // Test 2: Destructured require
    try {
      console.log('Test 2: Destructured require...');
      const { google } = require('googleapis');
      results.push({
        method: 'Destructured require',
        success: true,
        hasGoogle: !!google,
        hasGoogleAuth: !!(google && google.auth),
        googleType: typeof google,
        authType: typeof google?.auth
      });
      console.log('✅ Destructured require successful');
    } catch (error) {
      results.push({
        method: 'Destructured require',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log('❌ Destructured require failed:', error);
    }
    
    // Test 3: Dynamic import
    try {
      console.log('Test 3: Dynamic import...');
      const googleapis = await import('googleapis');
      results.push({
        method: 'Dynamic import',
        success: true,
        hasGoogle: !!googleapis,
        hasGoogle: !!googleapis.google,
        hasGoogleAuth: !!(googleapis.google && googleapis.google.auth),
        googleType: typeof googleapis,
        googleGoogleType: typeof googleapis.google,
        authType: typeof googleapis.google?.auth
      });
      console.log('✅ Dynamic import successful');
    } catch (error) {
      results.push({
        method: 'Dynamic import',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log('❌ Dynamic import failed:', error);
    }
    
    // Test 4: Destructured dynamic import
    try {
      console.log('Test 4: Destructured dynamic import...');
      const { google } = await import('googleapis');
      results.push({
        method: 'Destructured dynamic import',
        success: true,
        hasGoogle: !!google,
        hasGoogleAuth: !!(google && google.auth),
        googleType: typeof google,
        authType: typeof google?.auth
      });
      console.log('✅ Destructured dynamic import successful');
    } catch (error) {
      results.push({
        method: 'Destructured dynamic import',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.log('❌ Destructured dynamic import failed:', error);
    }
    
    console.log('=== Google APIs Test Complete ===');
    
    return NextResponse.json({
      success: true,
      results: results,
      summary: {
        totalTests: results.length,
        successfulTests: results.filter(r => r.success).length,
        failedTests: results.filter(r => !r.success).length
      }
    });
    
  } catch (error) {
    console.error('=== Google APIs Test Error ===', error);
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
} 