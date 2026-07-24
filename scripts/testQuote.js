(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/quote/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerType: 'Commercial Business',
        region: 'Dodoma',
        premisesType: 'Office Complex',
        selectedServices: ['Manned Guarding'],
        urgency: 'Standard (Within 1 week)',
        name: 'Test Company',
        phone: '+255700000000',
        email: 'test@example.com',
        description: 'Short test quote',
        privacyConsent: true
      })
    });
    const data = await res.json();
    console.log('STATUS', res.status);
    console.log('BODY', data);
  } catch (err) {
    console.error('ERROR', err);
  }
})();
