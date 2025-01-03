import { MenuIcon, User2 } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-50 sm:backdrop-blur md:backdrop-blur-none">
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-3xl mx-auto md:backdrop-blur">
          <div>
            <User2 />
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm">
              <a href="#" className=" text-amber-400 transition">
                Features
              </a>
              <a href="#" className=" text-amber-400 transition">
                Developers
              </a>
              <a href="#" className=" text-amber-400 transition">
                Pricing
              </a>
              <a href="#" className=" text-amber-400 transition">
                Change Log
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            {/* <Button>Join waitlist</Button> */}
            <MenuIcon className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
