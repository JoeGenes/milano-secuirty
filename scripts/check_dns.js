import dns from 'dns/promises';

(async () => {
  const domain = 'milanosecurity.co.tz';
  console.log('Checking DNS records for:', domain);
  try {
    const mx = await dns.resolveMx(domain);
    console.log('MX Records:', mx);
  } catch (err) {
    console.error('MX Lookup Error:', err.message);
  }

  try {
    const a = await dns.resolve4(domain);
    console.log('A Records (milanosecurity.co.tz):', a);
  } catch (err) {
    console.error('A Record Error:', err.message);
  }

  try {
    const mailA = await dns.resolve4('mail.' + domain);
    console.log('A Records (mail.milanosecurity.co.tz):', mailA);
  } catch (err) {
    console.error('mail.milanosecurity.co.tz Error:', err.message);
  }
})();
