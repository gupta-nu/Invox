// Full implementation with form fields
'use client';
import { useState, useEffect } from 'react';

interface EmailConfig {
  id?: number;
  emailAddress: string;
  connectionType: string;
  username?: string;
  password?: string;
  token?: string;
  host?: string;
  port?: number;
  tls?: boolean;
}

export default function EmailConfigPage() {
  const [configs, setConfigs] = useState<EmailConfig[]>([]);
  const [currentConfig, setCurrentConfig] = useState<EmailConfig>({
    emailAddress: '',
    connectionType: 'IMAP',
    tls: true
  });

  useEffect(() => {
    fetch('/api/email-ingestion')
      .then(res => res.json())
      .then(data => setConfigs(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentConfig.id ? 'PUT' : 'POST';
    const response = await fetch('/api/email-ingestion', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentConfig),
    });

    if (response.ok) {
      const updatedConfigs = await fetch('/api/email-ingestion').then(res => res.json());
      setConfigs(updatedConfigs);
      setCurrentConfig({ emailAddress: '', connectionType: 'IMAP', tls: true });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Email Configuration</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label>Email Address</label>
            <input
              type="email"
              required
              className="w-full p-2 border rounded text-black"
              value={currentConfig.emailAddress}
              onChange={e => setCurrentConfig({...currentConfig, emailAddress: e.target.value})}
            />
          </div>

          <div>
            <label>Connection Type</label>
            <select
              className="w-full p-2 border rounded text-black"
              value={currentConfig.connectionType}
              onChange={e => setCurrentConfig({...currentConfig, connectionType: e.target.value})}
            >
              <option value="IMAP">IMAP</option>
              <option value="GMAIL_API">Gmail API</option>
            </select>
          </div>

          <div>
            <label>Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-black"
              value={currentConfig.username || ''}
              onChange={e => setCurrentConfig({...currentConfig, username: e.target.value})}
            />
          </div>

          <div>
            <label>Password/Token</label>
            <input
              type="password"
              className="w-full p-2 border rounded text-black"
              value={currentConfig.password || ''}
              onChange={e => setCurrentConfig({...currentConfig, password: e.target.value})}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {currentConfig.id ? 'Update' : 'Add'} Configuration
        </button>
      </form>

      <div className="mb-8">
        <h2 className="text-xl mb-4">Configured Accounts</h2>
        <div className="space-y-2">
          {configs.map(config => (
            <div key={config.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <span className="font-medium">{config.emailAddress}</span>
                <span className="text-sm ml-2">({config.connectionType})</span>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setCurrentConfig(config)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await fetch(`/api/email-ingestion?id=${config.id}`, { method: 'DELETE' });
                    setConfigs(configs.filter(c => c.id !== config.id));
                  }}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={async () => {
          await fetch('/api/email-ingestion/check-emails', { method: 'POST' });
          alert('Email check completed');
        }}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Check Emails Now
      </button>
    </div>
  );
}