import { type AppType } from "next/dist/shared/lib/utils";
import { type AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"

import "~/styles/globals.css";

const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps },
}: AppProps) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
};

export default MyApp;
