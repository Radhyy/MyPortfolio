import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.MONKEYTYPE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Monkeytype API key not configured' }, { status: 500 });
    }

    // Get typing test results
    const resultsResponse = await fetch('https://api.monkeytype.com/results', {
      headers: {
        'Authorization': `ApeKey ${apiKey}`,
      },
    });

    if (!resultsResponse.ok) {
      const errorText = await resultsResponse.text();
      console.error('Monkeytype API error:', resultsResponse.status, errorText);
      
      // Return empty data on any client error (400-499) instead of propagating error
      if (resultsResponse.status >= 400 && resultsResponse.status < 500) {
        return NextResponse.json({
          totalTests: 0,
          bestWpm: 0,
          avgWpm: 0,
          bestAccuracy: 0,
          avgAccuracy: 0,
          recentTests: [],
          rateLimited: true,
          errorCode: resultsResponse.status,
        });
      }
      
      return NextResponse.json({ 
        error: `Monkeytype API error: ${resultsResponse.status}`,
        details: errorText 
      }, { status: resultsResponse.status });
    }

    const data = await resultsResponse.json();
    const results = data.data || [];

    // Calculate stats from results
    const totalTests = results.length;
    const bestWpm = Math.max(...results.map((r: any) => r.wpm || 0));
    const avgWpm = totalTests > 0 
      ? (results.reduce((sum: number, r: any) => sum + (r.wpm || 0), 0) / totalTests)
      : 0;
    const bestAccuracy = Math.max(...results.map((r: any) => r.acc || 0));
    const avgAccuracy = totalTests > 0
      ? (results.reduce((sum: number, r: any) => sum + (r.acc || 0), 0) / totalTests)
      : 0;

    return NextResponse.json({
      totalTests,
      bestWpm,
      avgWpm,
      bestAccuracy,
      avgAccuracy,
      recentTests: results.slice(0, 5).map((r: any) => ({
        wpm: r.wpm,
        accuracy: r.acc,
        mode: r.mode,
        duration: r.mode2,
        timestamp: r.timestamp,
      })),
    });

  } catch (error) {
    console.error('Error fetching Monkeytype data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Monkeytype data' },
      { status: 500 }
    );
  }
}
