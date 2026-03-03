import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*\/api\/public\/table\/.*\/menu$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'menu-cache',
        networkTimeoutSeconds: 3,
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 }
      }
    }
  ]
});

const nextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] }
};

export default withPWA(nextConfig);
