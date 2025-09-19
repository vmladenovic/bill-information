import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import {DocumentHeadTags, DocumentHeadTagsProps, documentGetInitialProps} from "@mui/material-nextjs/v14-pagesRouter";
import cache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';

const createEmotionCache = () => {
  return cache({ key: 'css', prepend: true });
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    const emotionCache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(emotionCache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) =>
          function EnhanceApp(props) {
            return <App emotionCache={emotionCache} {...props} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      emotionStyleTags,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{(this.props as any).emotionStyleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
