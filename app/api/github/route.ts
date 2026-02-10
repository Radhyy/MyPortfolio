import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME || 'radhiyyaalea';

    if (!token) {
      return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
    }

    // GraphQL query for contribution calendar
    const query = `
      query($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      return NextResponse.json({ error: 'GitHub API error' }, { status: 500 });
    }

    const contributionData = data.data.user.contributionsCollection.contributionCalendar;

    // Calculate stats
    const totalContributions = contributionData.totalContributions;
    
    // Get last 7 days for weekly stats
    const allDays = contributionData.weeks.flatMap((week: any) => week.contributionDays);
    const last7Days = allDays.slice(-7);
    const thisWeekContributions = last7Days.reduce((sum: number, day: any) => sum + day.contributionCount, 0);
    
    // Calculate average (total / 365 days)
    const averagePerDay = (totalContributions / 365).toFixed(1);

    // Format contribution matrix for heatmap (last 52 weeks)
    const weeks = contributionData.weeks.slice(-52).map((week: any) => 
      week.contributionDays.map((day: any) => ({
        count: day.contributionCount,
        date: day.date,
      }))
    );

    return NextResponse.json({
      totalContributions,
      thisWeek: thisWeekContributions,
      average: parseFloat(averagePerDay),
      weeks,
    });

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
