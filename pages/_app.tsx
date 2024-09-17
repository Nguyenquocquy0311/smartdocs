import Auth from "@/context/AuthContext";
import { DocumentProvider } from "@/context/DocumentContext";
import { MenuProvider } from "@/context/MenuSidebarContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth.Provider>
      <DocumentProvider>
        <MenuProvider>
          <Component {...pageProps} />
        </MenuProvider>
      </DocumentProvider>
    </Auth.Provider>
);
}
