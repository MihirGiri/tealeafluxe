import { Outlet, useLocation } from "@tanstack/react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";
import Chatbot from "./Chatbot";

export default function Layout() {
  const location = useLocation();
  const hideHeaderFooter = 
    ["/login", "/signup"].includes(location.pathname) || 
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideHeaderFooter && <Navbar />}
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      {!hideHeaderFooter && <Footer />}
      {!hideHeaderFooter && <Chatbot />}
    </div>
  );
}
