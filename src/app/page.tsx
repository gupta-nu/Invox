"use client";

import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
interface Email {
  subject: string;
  from: string;
  date: string;
  pdfCount: number;
}

export default function HomePage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle Google OAuth flow
  const handleAuth = async () => {
    setLoading(true);
    try {
      // Step 1: Get authorization URL from backend
      const authResponse = await fetch('/api/gmail/auth');
      if (!authResponse.ok) throw new Error('Auth endpoint failed');
      
      const { url } = await authResponse.json();
      
      // Step 2: Redirect to Google's OAuth page
      window.location.href = url;
    } catch (error) {
      console.error('Auth failed:', error);
      alert('Failed to start authentication');
      setLoading(false);
    }
  };

  // Handle callback after Google redirects back
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        setLoading(true);
        try {
          // Step 3: Exchange code for access token
          const callbackResponse = await fetch(`/api/gmail/callback?code=${code}`);
          if (!callbackResponse.ok) throw new Error('Callback failed');
          
          const { emails } = await callbackResponse.json();
          setEmails(emails);
          
          // Cleanup URL after successful auth
          window.history.replaceState({}, document.title, "/");
        } catch (error) {
          console.error('Failed to fetch emails:', error);
          alert('Failed to load emails');
        }
        setLoading(false);
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Email Ingestor</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Button 
          color="primary"
          onPress={handleAuth} // Changed from onClick to onPress
          isDisabled={loading}
          className="w-full mb-4"
        >
          {loading ? 'Connecting...' : 'Connect Gmail Account'}
        </Button>

        {emails.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold mb-3">Latest Emails</h2>
            <div className="space-y-2">
            {emails.map((email, index) => (
  <div key={index} className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
    <p className="font-medium text-gray-800">
      {email.subject}
      <span className="ml-2 text-blue-600 text-sm">
        ({email.pdfCount} PDF{email.pdfCount > 1 ? 's' : ''})
      </span>
    </p>
    <p className="text-sm text-gray-600 mt-1">
      From: {email.from}
    </p>
    <p className="text-xs text-gray-500 mt-1">
      Received: {new Date(email.date).toLocaleString()}
    </p>
  </div>
))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}