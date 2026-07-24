import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFallbackMailto } from '../server.js';

test('buildFallbackMailto creates a usable mailto link', () => {
  const link = buildFallbackMailto('careers@example.com', 'Security Officer', {
    fullName: 'Jane Doe',
    phone: '+255700000000',
    email: 'jane@example.com',
    region: 'Dar es Salaam',
    education: 'Bachelor Degree',
    experience: '2 years',
    coverMessage: 'Interested in the role',
    companyName: 'Milano Security'
  });

  assert.match(link, /^mailto:careers@example.com/);
  assert.match(link, /subject=/);
  assert.match(link, /Jane Doe/);
});
