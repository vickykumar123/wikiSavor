import {Outlet} from "react-router-dom";
import Header from "../Header";
import Hero from "../Hero";
import Footer from "../Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
