import type { AppProps } from "next/app";
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";
import { Provider } from '@/Context';

import "../styles/tailwind.css";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Toaster position="bottom-left" />
      <AnimatePresence>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </AnimatePresence>
    </>
  )
};

export default App;
