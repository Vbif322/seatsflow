import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../storage/store";
import { ThemeProvider } from "@emotion/react";
import theme from "../theme";
import Layout from "@/components/Layout";
import { parseCookies } from "nookies";

function App({ Component, ...rest }: AppProps) {
  const {
    store,
    props: { session, ...props },
  } = wrapper.useWrappedStore(rest);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }) => {
      try {
        const { token } = parseCookies(ctx);
        if (!token && ctx.asPath !== "/login" && ctx.asPath !== "/register") {
          ctx.res.writeHead(302, {
            location: "/login",
          });
          ctx.res.end();
        }
      } catch (err) {
        console.log(err);
      }
      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        },
      };
    }
);

export default App;
