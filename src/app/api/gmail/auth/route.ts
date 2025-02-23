// app/api/gmail/auth/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Validate environment variables with detailed error messages
    const requiredEnvVars = [
      'CLIENT_ID',
      'CLIENT_SECRET',
      'REDIRECT_URL'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }

    console.log('Initializing OAuth2 client with configuration:', {
      clientId: process.env.CLIENT_ID?.substring(0, 8) + '...',
      redirectUrl: process.env.REDIRECT_URL
    });

    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URL
    );

    console.log('Generating authentication URL...');
    
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.readonly'],
      prompt: 'consent',
      include_granted_scopes: true // Important for incremental auth
    });

    console.log('Successfully generated auth URL:', authUrl.substring(0, 50) + '...');

    return NextResponse.json({ 
      url: authUrl 
    });

  } catch (error) {
    console.error('Authentication Endpoint Error:', error);
    
    // Detailed error response for development
    const errorMessage = error instanceof Error 
      ? `Authentication Failed: ${error.message}`
      : 'Unknown authentication error occurred';

    return NextResponse.json(
      { 
        error: errorMessage,
        documentation: 'https://developers.google.com/identity/protocols/oauth2/web-server',
        required_scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
        required_env_vars: requiredEnvVars
      },
      { 
        status: error instanceof Error && error.message.includes('Missing') ? 400 : 500 
      }
    );
  }
}