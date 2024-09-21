/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/8XA8GzreKD',
        permanent: true,
      },
      {
        source: '/x',
        destination: 'https://x.com/lapsehost',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/lapsehost',
        permanent: true,
      },
      {
        source: '/linkedin',
        destination: 'https://linkedin.com/company/lapsehost',
        permanent: true,
      },
      {
        source: '/opencollective',
        destination: 'https://opencollective.com/lapse',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
