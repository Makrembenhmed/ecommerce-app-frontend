import { CartContextProvider } from "@/lib/CartContext";
import Header from "@/components/header";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer";

const popp = Poppins({ subsets: ["latin"], weight: '400' });

export default function App({ Component,  pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <CartContextProvider>

      <main className={` ${popp.className} min-h-screen max-w-screen-2xl mx-auto px-4 bg-background text-accent`}>
        <Header />
        <Component {...pageProps} />;
        <Footer/>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </main>
      

    </CartContextProvider>
    </SessionProvider>
  )
}
