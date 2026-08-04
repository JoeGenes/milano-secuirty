import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { app } from '../server.js';

test('quote submit handles missing description gracefully without validation error', async () => {
  const server = app.listen(0);
  await once(server, 'listening');

  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/api/quote/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerType: 'Commercial Business',
        region: 'Dodoma',
        premisesType: 'Office Complex',
        selectedServices: ['Manned Guarding'],
        urgency: 'Standard (Within 1 week)',
        name: 'Test Customer',
        phone: '+255700000000',
        email: 'test@example.com',
        description: '', // Optional on UI
        privacyConsent: true
      })
    });

    const body = await response.json();
    // It should succeed or fallback smoothly to mailto draft if SMTP is offline, without 400 validation error
    assert.notEqual(response.status, 400);
    assert.equal(body.success, true);
  } finally {
    server.close();
  }
});
