// services/twitter.js
const fetch = require('node-fetch');

class TwitterService {
  constructor() {
    this.API_BASE = 'https://toto.oz.xyz/api/metadata';
    this.headers = {
      'accept': 'application/json',
      'x-api-key': process.env.TOTO_API_KEY,
      'Content-Type': 'application/json'
    };
  }

  async makeRequest(endpoint, user) {
    try {
      const response = await fetch(`${this.API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          user,
          how: 'username'
        })
      });

      if (!response.ok) {
        throw new Error(`TOTO API Error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      throw error;
    }
  }

  async analyzeHandle(handle) {
    const [latestMetadata, pastUsernames] = await Promise.all([
      this.makeRequest('get_latest_metadata', handle),
      this.makeRequest('get_past_usernames', handle)
    ]);

    return {
      data: {
        metadata: latestMetadata,
        pastUsernames: pastUsernames
      }
    };
  }
}

module.exports = TwitterService;