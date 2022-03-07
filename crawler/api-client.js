const axios = require('axios');

class ApiClient {
  constructor() {
    const client = axios.create({
      baseURL: process.env.CB_API_BASE_URL || 'http://localhost:8080',
    });

    client.interceptors.response.use((resp) => {
      return resp.data;
    });

    this.client = client;
  }

  async upsertGlobalStat(data) {
    return await this.client.post('global-stats', data);
  }

  async upsertKeyValue(key, value) {
    return await this.client.post('key-value', {
      key,
      value,
    });
  }

  async findAllGlobalStat() {
    return await this.client.get('global-stats');
  }

  async findKeyValue(key) {
    return await this.client.get(`key-value/${key}`);
  }
}

module.exports = ApiClient;
