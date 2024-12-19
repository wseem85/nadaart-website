import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

import useScroolToTop from "../hooks/useScroolToTop";

export default function AppLayout() {
  useScroolToTop();

  return (
    <div style={{ backgroundColor: "var(--color-grey-0)" }}>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
