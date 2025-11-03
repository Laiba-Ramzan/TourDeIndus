import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "./Container";
import { Menu, X } from "lucide-react";
import logo from "../assets/image2.png"; 

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Destinations", slug: "/destinations", active: true },
    { name: "Resorts", slug: "/resorts", active: true },
    { name: "Packages", slug: "/packages", active: true },
    { name: "About Us", slug: "/about-us", active: true },
    { name: "Contact", slug: "/contact", active: true },
  ];

  return (
    <>
      <div className="bg-[#3B2F2F] text-cream fixed w-full top-0 left-0 z-50 shadow-md">
        <Container>
          <nav className="flex justify-between items-center py-4 px-3">
            
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Logo"
                className="w-12 h-12 rounded-full border border-cream hover:scale-105 transition-transform duration-300 shadow-md"
              />
              <span className="text-xl font-bold text-[#D4A373] tracking-wide">
                Tour de Indus
              </span>
            </Link>

            <ul className="hidden md:flex items-center space-x-8 mx-auto">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className={`relative text-sm font-medium transition duration-200 
                          hover:text-[#D4A373] ${
                            location.pathname === item.slug
                              ? "text-[#D4A373]"
                              : "text-[#F5F5DC]"
                          }`}
                      >
                        {item.name}
                        {location.pathname === item.slug && (
                          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#D4A373] rounded"></span>
                        )}
                      </button>
                    </li>
                  )
              )}
            </ul>

            <button
              className="md:hidden text-[#F5F5DC]"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={28} />
            </button>
          </nav>
        </Container>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#3B2F2F] shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-50`}
      >
        {/* === Header inside sidebar === */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#5C4033]">
          <span className="text-[#D4A373] text-lg font-extrabold">Menu</span>
          <button className="text-[#F5F5DC]" onClick={() => setIsOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <ul className="flex flex-col px-6 py-4 space-y-4">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left text-base font-medium transition duration-200 ${
                      location.pathname === item.slug
                        ? "text-[#D4A373]"
                        : "text-[#F5F5DC]"
                    } hover:text-[#D4A373]`}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
}

export default Header;
