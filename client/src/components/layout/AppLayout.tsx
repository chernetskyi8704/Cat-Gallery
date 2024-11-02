import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
