import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='fr'>
        <Head />
        <body>
          <Main />   
          <NextScript />
          <script async src="https://cdn.snipcart.com/themes/v3.0.26/default/snipcart.js"></script>
          <div id="snipcart" data-api-key={process.env.SNIPCART_PUBLIC_API_KEY} data-config-modal-style="side" hidden></div>
        </body>
      </Html>
    )
  }
};

export default MyDocument;