import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import './mobile.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/lib/theme-provider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Artify - Transform Your Photos',
  description: 'Upload your photos and transform them into various artistic styles using AI.',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        href: '/favicon.svg',
      }
    ],
    apple: {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  },
};

function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          const theme = localStorage.getItem('theme') || 'system';
          
          if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.classList.add(systemTheme);
          } else {
            document.documentElement.classList.add(theme);
          }
        `,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider defaultTheme="system">
          {children}
          <Toaster />
        </ThemeProvider>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-G0FF8MW8RD" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G0FF8MW8RD');
          `}
        </Script>
      </body>
    </html>
  );
}
