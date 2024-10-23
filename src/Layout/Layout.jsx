import { Outlet } from "react-router-dom";
import NavbarTop from "../Shared/Navbar/NavbarTop";
import MenuBar from "../Shared/Navbar/MenuBar";
import { useContext, useState } from "react";
import { OrderContext } from "../ContextAPIs/OrderProvider";
import useSmallScreen from "../Hooks/useSmallScreen";
import Copyright from "../Shared/Footer/Copyright";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const { open, setOpen, sidebarRef } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100"
      >
        {open ? (
          <X className="h-6 w-6 text-gray-600" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600" />
        )}
      </button>

      <div className="flex min-h-screen">
        {/* Overlay */}
        {isSmallScreen && open && (
          <div
            className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed lg:static top-0 z-40 h-full w-64 transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 bg-white shadow-lg`}
        >
          <div className="h-full overflow-y-auto">
            <MenuBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <NavbarTop />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-6">
              <div className="min-h-[calc(100vh-200px)]">
                <Outlet />
              </div>
              <Copyright />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;