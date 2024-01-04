// next.config.js
module.exports = {
  darkMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },    
    ];
  },
};
