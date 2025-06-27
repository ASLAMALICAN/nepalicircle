import React from 'react';

export default function NewCanada() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">New in Canada</h1>
      <p className="text-gray-600 mb-6">
        Welcome to Canada! Here’s a quick checklist to help you get started with your new life. Follow these steps for a smoother settlement process.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🛬 Things to Do When You Arrive</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>✅ Apply for SIN (Social Insurance Number)</li>
          <li>🏦 Open a Canadian bank account</li>
          <li>📱 Get a local SIM card with a data plan</li>
          <li>💳 Apply for a health card (e.g., MSP in BC, OHIP in Ontario)</li>
          <li>🚌 Learn about public transit (e.g., Compass Card, Presto Card)</li>
          <li>📈 Start building your credit history</li>
          <li>🏠 Look for permanent housing options</li>
          <li>👥 Register for newcomer orientation or settlement programs</li>
        </ul>
      </div>

      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">💡 Tips for a Smooth Start</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Join local community groups (online and offline)</li>
          <li>Visit a local Service Canada office if you're unsure about anything</li>
          <li>Download important apps like Google Maps, Transit, and your bank’s app</li>
          <li>Attend job fairs or networking events</li>
          <li>Don't hesitate to ask for help — Canadians are friendly!</li>
        </ul>
      </div>

      <p className="mt-8 text-gray-600 text-sm">
        Need help with any of these? You can request support from the dashboard services like <strong>Housing Assistance</strong>, <strong>Job Connection</strong>, and more.
      </p>
    </div>
  );
}

