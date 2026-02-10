import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.WAKATIME_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'WakaTime API key not configured' }, { status: 500 });
    }

    const username = process.env.WAKATIME_USERNAME || 'current';

    // Get stats for last 7 days
    const statsResponse = await fetch(`https://wakatime.com/api/v1/users/@${username}/stats/last_7_days`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!statsResponse.ok) {
      const errorText = await statsResponse.text();
      console.error('WakaTime API error:', statsResponse.status, errorText);
      return NextResponse.json({ 
        error: `WakaTime API error: ${statsResponse.status}`,
        details: errorText 
      }, { status: statsResponse.status });
    }

    const stats = await statsResponse.json();

    // Get all time stats
    const allTimeResponse = await fetch(`https://wakatime.com/api/v1/users/@${username}/all_time_since_today`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    let allTimeData = null;
    if (allTimeResponse.ok) {
      const allTime = await allTimeResponse.json();
      allTimeData = allTime.data;
    }

    const data = stats.data;

    return NextResponse.json({
      dailyAverage: data.human_readable_daily_average || '0 hrs 0 mins',
      totalTime: data.human_readable_total || '0 hrs 0 mins',
      bestDay: data.best_day ? {
        date: data.best_day.date,
        text: data.best_day.text,
      } : null,
      languages: data.languages || [],
      editors: data.editors || [],
      categories: data.categories || [],
      range: data.range || {},
      allTime: allTimeData ? allTimeData.text : null,
    });

  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch WakaTime data' },
      { status: 500 }
    );
  }
}
