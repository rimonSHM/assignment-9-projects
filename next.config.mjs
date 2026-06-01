// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {

//    reactCompiler: true,
//      images: {
//     domains: ['www.google.com'],
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//         port: '',
//         pathname: '/**',
//       },

//       {
//         protocol: 'https',
//         hostname: 'media-cdn.tripadvisor.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com', // আগের কার্ডের ডিফল্ট ইমেজের জন্য এটিও দিয়ে রাখা ভালো
//       },
//       {
//         protocol: 'https',
//         hostname: 'static.vecteezy.com',
//       }
//     ],
//   },
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    domains: ['www.google.com'],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media-cdn.tripadvisor.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
    ],
  },
};

export default nextConfig;

