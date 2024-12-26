import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <InitColorSchemeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
