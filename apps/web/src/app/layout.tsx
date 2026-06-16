import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/providers/QueryProvider';
import { UiProviders } from '@/providers/UiProviders';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AccessShield India — Digital Accessibility Compliance',
    template: '%s | AccessShield India',
  },
  description:
    'AI-powered WCAG 2.2 AA compliance platform for Indian organisations. Scan, remediate, and certify your digital assets.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        <QueryProvider>
          <UiProviders>{children}</UiProviders>
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
