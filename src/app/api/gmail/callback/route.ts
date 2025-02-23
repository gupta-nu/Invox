import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Auth Endpoint Hit');
    
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.readonly'],
      prompt: 'consent',
      include_granted_scopes: true
    });

    console.log('Generated Auth URL:', authUrl);
    return NextResponse.json({ url: authUrl });

  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.json(
      { error: 'Authentication configuration error' },
      { status: 500 }
    );
  }
}