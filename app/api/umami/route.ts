import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.UMAMI_API_KEY;
    const websiteId = process.env.UMAMI_WEBSITE_ID;

    if (!apiKey || !websiteId) {
      return NextResponse.json({ error: 'Umami credentials not configured' }, { status: 500 });
    }

    // Get stats for last 30 days
    const endAt = Date.now();
    const startAt = endAt - (30 * 24 * 60 * 60 * 1000); // 30 days ago

    const statsUrl = `https://api.umami.is/v1/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`;
    
    console.log('Fetching Umami stats from:', statsUrl);
    
    const response = await fetch(statsUrl, {
      headers: {
        'x-umami-api-key': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Umami API error:', response.status, errorText);
      return NextResponse.json({ 
        error: `Umami API error: ${response.status}`,
        details: errorText 
      }, { status: response.status });
    }

    const data = await response.json();
    console.log('Umami response:', data);

    // Get visitor countries
    const countriesUrl = `https://api.umami.is/v1/websites/${websiteId}/metrics?startAt=${startAt}&endAt=${endAt}&type=country`;
    
    let countries: Array<{ country: string; visitors: number }> = [];
    try {
      const countriesResponse = await fetch(countriesUrl, {
        headers: {
          'x-umami-api-key': apiKey,
          'Accept': 'application/json',
        },
      });
      
      if (countriesResponse.ok) {
        const countriesData = await countriesResponse.json();
        console.log('Umami countries:', countriesData);
        if (Array.isArray(countriesData)) {
          countries = countriesData.map((item: any) => ({
            country: item.x || item.country,
            visitors: item.y || item.value || 0,
          }));
        }
      }
    } catch (err) {
      console.error('Error fetching Umami countries:', err);
    }

    // Get metrics (daily pageviews over last 7 days)
    const metricsUrl = `https://api.umami.is/v1/websites/${websiteId}/metrics?startAt=${endAt - (7 * 24 * 60 * 60 * 1000)}&endAt=${endAt}&type=url&unit=day`;
    
    let chartData: Array<{ date: string; pageviews: number; visits: number }> = [];
    try {
      const metricsResponse = await fetch(metricsUrl, {
        headers: {
          'x-umami-api-key': apiKey,
          'Accept': 'application/json',
        },
      });
      
      if (metricsResponse.ok) {
        const metrics = await metricsResponse.json();
        console.log('Umami metrics:', metrics);
        
        // Try to parse actual metrics data
        if (Array.isArray(metrics) && metrics.length > 0) {
          // Map metrics data to chart format
          chartData = metrics.slice(0, 7).map((item: any, index: number) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - index));
            return {
              date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              pageviews: item.y || item.pageviews || 0,
              visits: item.visits || Math.floor((item.y || 0) * 0.7) || 0,
            };
          });
        }
        
        // If no valid data, generate empty data for last 7 days
        if (chartData.length === 0) {
          const now = new Date();
          chartData = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(now);
            date.setDate(date.getDate() - (6 - i));
            return {
              date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              pageviews: 0,
              visits: 0,
            };
          });
        }
      }
    } catch (err) {
      console.error('Error fetching Umami metrics:', err);
    }

    return NextResponse.json({
      pageViews: data.pageviews || data.pageviews?.value || 0,
      visitors: data.visitors || data.uniques?.value || data.visitors?.value || 0,
      visits: data.visits || data.visits?.value || 0,
      bounces: data.bounces || data.bounces?.value || 0,
      totalTime: data.totaltime || data.totaltime?.value || 0,
      chartData,
      countries,
    });

  } catch (error: any) {
    console.error('Error fetching Umami data:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch Umami data', message: error.message },
      { status: 500 }
    );
  }
}
