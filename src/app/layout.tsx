import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/lib/theme-provider';

export const metadata: Metadata = {
  title: 'Artify - Transform Your Photos',
  description: 'Upload your photos and transform them into various artistic styles using AI.',
  icons: {
    icon: [
      {
        url: '/artify.svg',
        href: '/artify.svg',
      }
    ],
    apple: {
      url: '/artify.svg',
      href: '/artify.svg',
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
        <link rel="icon" href="/artify.svg" type="image/svg+xml" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider defaultTheme="system">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
