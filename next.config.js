/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        destination: 'https://prime-chess-397807.el.r.appspot.com/admin/login',
        permanent: true,
        source: '/',
      },
    ];
  },
};

module.exports = nextConfig;
