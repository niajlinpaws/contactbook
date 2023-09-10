/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        destination:
          'https://encouraging-sneakers-mite.cyclic.cloud/admin/login',
        permanent: true,
        source: '/',
      },
    ];
  },
};

module.exports = nextConfig;
