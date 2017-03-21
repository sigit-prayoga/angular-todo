export const environment = {
  production: true,
  api: {
    host: 'http://localhost',
    port: 8383,
    baseUrl: '',
    getPath: function (endPoint: string) {
      return this.host + ':' + this.port + this.baseUrl + endPoint;
    }
  }
};
