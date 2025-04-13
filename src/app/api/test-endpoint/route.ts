import { NextResponse } from 'next/server';

export async function GET() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4bf0965d0bmsh88dc19b57d192b3p12dc91jsn68a0d9b13f57',
      'X-RapidAPI-Host': 'riddle-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch('https://riddle-api.p.rapidapi.com/api/riddles/random', options);
    const result = await response.json();
    
    return NextResponse.json({
      status: response.status,
      data: result,
      raw: result
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch',
      details: (error as Error).message
    }, { status: 500 });
  }
}
