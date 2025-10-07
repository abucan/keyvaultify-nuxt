// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    resendApiKey: process.env.RESEND_API_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    uploadThingToken: process.env.UPLOADTHING_TOKEN,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    stripePriceStarterMonthly: process.env.STRIPE_PRICE_STARTER_MONTHLY,
    stripePriceProMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
    stripePriceStarterYearly: process.env.STRIPE_PRICE_STARTER_YEARLY,
    stripePriceProYearly: process.env.STRIPE_PRICE_PRO_YEARLY,
    public: {
      apiUrl: process.env.APP_URL,
      nodeEnv: process.env.NODE_ENV,
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@prisma/nuxt',
    'shadcn-nuxt',
  ],
  fonts: {
    families: [
      {
        name: 'Bricolage Grotesque',
        provider: 'google',
        weights: ['400', '500', '600', '700'],
        subsets: ['latin'],
        display: 'swap',
      },
      {
        name: 'Spectral',
        provider: 'google',
        weights: ['400', '500', '600', '700'],
        subsets: ['latin'],
        display: 'swap',
      },
    ],
  },
});
