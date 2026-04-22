import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const publicRoutes = ["/", "/signin", "/signup"];
    const isPublicRoute = publicRoutes.includes(router.pathname);
    const currentUser = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;

    if (!isPublicRoute && !currentUser) {
      router.push("/");
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}
