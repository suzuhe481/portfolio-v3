"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import { MenuButton } from "./MenuButton/MenuButton";

// Link items in navbar
const menuItems = [
  { label: "Home", href: "#home" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Determines whether menu is toggled open/closed
  const [menuHeight, setMenuHeight] = useState(0);

  const [showMenu, setShowMenu] = useState(false); // Determines whether menu should be display block/hidden

  // Determines whether to show the navbar based on scroll direction
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculates the full height of the mobile navbar items
  useEffect(() => {
    if (!menuRef.current) return;

    const scrollHeight = menuRef.current.scrollHeight;

    if (menuOpen) {
      setShowMenu(true);
      setMenuHeight(scrollHeight);
    } else {
      setMenuHeight(0);

      // Wait for the animation to finish before setting menu to hidden
      timeoutRef.current = setTimeout(() => {
        setShowMenu(false);
      }, 300);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [menuOpen]);

  // Close the navbar on window resize to larger width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Used to hide/show navbar when scrolling down/up
  useEffect(() => {
    const controlNavbar = () => {
      // Compare last scroll position with current scroll position.
      // Scrolling down
      if (window.scrollY > lastScrollY) {
        setShow(false);
        setMenuOpen(false); // Hides navmenu if open
      }
      // Scrolling up
      else {
        setShow(true);
      }
      // Store current scroll position
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 w-full z-50 shadow text-white transition-trasform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative">
        {/* Background behind the translucent navbar */}
        <div className="absolute inset-0 bg-[#000000bd] z-[-1]" />

        <nav className="w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 animate-all">
            <div className="flex items-center justify-between py-6">
              {/* Logo */}
              <div className="text-xl font-bold">Logo</div>

              {/* Menu Items */}
              <ul
                ref={menuRef}
                className={clsx(
                  "font-plagiata italic",
                  `transition-[height] ease-in-out overflow-hidden duration-300`,
                  "md:transition-none md:overflow-visible md:h-auto",
                  "flex-col w-full bg-[#333] absolute left-0 top-full z-40",
                  "md:relative md:flex md:flex-row md:items-center md:space-x-2 md:bg-transparent md:w-auto",
                  menuOpen || showMenu ? "block" : "hidden"
                )}
                style={{
                  height: menuOpen ? `${menuHeight}px` : 0,
                }}
              >
                {menuItems.map((item) => (
                  <li
                    key={item.label}
                    className="p-4 md:py-0 border-b-2 border-[#444444] md:border-0 text-xl md:text-xl"
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Hamburger menu: Small screens only */}
              <MenuButton
                menuOpen={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
