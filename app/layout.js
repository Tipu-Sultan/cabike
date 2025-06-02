import React from 'react';
import './globals.css';
import ClientProvider from './ClientProvider';

export const metadata = {
  title: 'RideMarket - Buy and Sell Vehicles',
  description: 'The premier marketplace for buying and selling cars and motorcycles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}