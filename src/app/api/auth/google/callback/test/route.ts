import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Log all query parameters
    const allParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      allParams[key] = value;
    });

    console.log('Callback test - All parameters received:', allParams);
    console.log('Callback test - Full URL:', request.url);

    return NextResponse.json({
      success: true,
      message: 'Callback test endpoint working',
      receivedParams: allParams,
      url: request.url,
      hasCode: searchParams.has('code'),
      hasError: searchParams.has('error'),
      hasState: searchParams.has('state')
    });
  } catch (error) {
    console.error('Error in callback test:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 