import type { AppProps } from "next/app";
import { AnimatePresence } from 'framer-motion';
import { Toaster } from "react-hot-toast";
import { Provider } from '@/Context';

// import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/tailwind.css";
import "../styles/globals.css";
// import useAuthentication from "@/lib/hooks/useAuthentication";

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Toaster position="top-center" />
      <AnimatePresence>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </AnimatePresence>
    </>
  )
};

export default App;
