import React from 'react';
import './globals.css';

export const metadata = {
  title: 'RideMarket - Buy and Sell Vehicles',
  description: 'The premier marketplace for buying and selling cars and motorcycles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}