#!/usr/bin/env node
const https = require('https');
const querystring = require('querystring');

const {
  NAMECHEAP_API_USER,
  NAMECHEAP_API_KEY,
  NAMECHEAP_USERNAME,
  NAMECHEAP_CLIENT_IP,
  DOMAIN,
  TARGET_IP,
  CNAME_TARGET,
} = process.env;

if (!NAMECHEAP_API_USER || !NAMECHEAP_API_KEY || !NAMECHEAP_USERNAME || !NAMECHEAP_CLIENT_IP || !DOMAIN || !TARGET_IP || !CNAME_TARGET) {
  console.error('Missing required environment variables.');
  process.exit(1);
}

function buildParams(domain) {
  const parts = domain.split('.');
  const sld = parts.shift();
  const tld = parts.join('.');
  return {
    ApiUser: NAMECHEAP_API_USER,
    ApiKey: NAMECHEAP_API_KEY,
    UserName: NAMECHEAP_USERNAME,
    ClientIp: NAMECHEAP_CLIENT_IP,
    Command: 'namecheap.domains.dns.setHosts',
    SLD: sld,
    TLD: tld,
    HostName1: '@',
    RecordType1: 'A',
    Address1: TARGET_IP,
    TTL1: '300',
    HostName2: 'www',
    RecordType2: 'CNAME',
    Address2: CNAME_TARGET,
    TTL2: '300',
  };
}

function updateDomain(domain) {
  const params = buildParams(domain);
  const query = querystring.stringify(params);
  const options = {
    hostname: 'api.namecheap.com',
    path: '/xml.response?' + query,
    method: 'GET',
  };

  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`Updated DNS for ${domain}`);
      } else {
        console.error(`Failed to update ${domain}: ${res.statusCode}`);
        console.error(data);
      }
    });
  }).on('error', (err) => {
    console.error(`Error updating ${domain}:`, err);
  });
}

DOMAIN.split(',').map(d => d.trim()).filter(Boolean).forEach(updateDomain);
