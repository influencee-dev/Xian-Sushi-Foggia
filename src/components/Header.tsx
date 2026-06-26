import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Calendar } from "lucide-react";
import { RESTAURANT_CONFIG } from "../data";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  cartCount,
  onOpenCart,
  onOpenBooking,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener to add background opacity / blurring to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "takeaway", label: "Take Away & Delivery" },
    { id: "philosophy", label: "Filosofia" },
    { id: "contacts", label: "Contatti" },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/85 py-2"
          : "bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/40 py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className={`flex items-center justify-center rounded-full bg-[#090909] border border-red-600/30 p-2 shadow-[0_0_12px_rgba(220,38,38,0.25)] transform group-hover:scale-105 transition-all duration-300 ${
                isScrolled ? "w-12 h-12 sm:w-14 sm:h-14" : "w-14 h-14 md:w-16 md:h-16"
              }`}>
                <img
                  src="logo.png"
                  alt={`${RESTAURANT_CONFIG.name} Logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation - Perfectly centered physically via flex-1 containers */}
          <nav className="flex items-center gap-4 lg:gap-6 xl:gap-8 justify-center flex-shrink-0 px-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-xs lg:text-sm tracking-wider font-bold uppercase transition-all duration-300 py-1 whitespace-nowrap ${
                    isActive ? "text-neutral-200 font-extrabold" : "text-neutral-400 hover:text-red-600"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-full shadow-[0_0_4px_rgba(220,38,38,0.5)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Shopping Cart Button */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={onOpenCart}
              className="relative bg-neutral-900 border border-neutral-800 hover:border-red-600/50 hover:bg-neutral-850 text-red-600 p-2 lg:p-2.5 rounded-xl transition-all focus:outline-none"
              aria-label="Apri Carrello"
            >
              <ShoppingBag className="w-4 h-4 lg:w-5 lg:h-5 text-red-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-neutral-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Header Layout */}
        <div className="flex md:hidden items-center justify-between gap-4 w-full">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group focus:outline-none flex-shrink-0"
          >
            <div className={`flex items-center justify-center rounded-full bg-[#090909] border border-red-600/30 p-2 shadow-[0_0_12px_rgba(220,38,38,0.25)] transform group-hover:scale-105 transition-all duration-300 ${
              isScrolled ? "w-11 h-11" : "w-13 h-13"
            }`}>
              <img
                src="logo.png"
                alt={`${RESTAURANT_CONFIG.name} Logo`}
                className="w-full h-full object-contain"
              />
            </div>
          </button>

          {/* Mobile Actions: Cart & Burger */}
          <div className="flex items-center gap-3">
            {/* Mobile Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-neutral-900 border border-neutral-800 text-red-600 p-2.5 rounded-xl transition-all focus:outline-none"
              aria-label="Apri Carrello Mobile"
            >
              <ShoppingBag className="w-5 h-5 text-red-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-neutral-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 p-2.5 rounded-xl hover:text-red-600 transition-all focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800 absolute top-full left-0 w-full py-6 px-4 shadow-2xl animate-fade-in-down">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-sans text-base tracking-wider font-semibold uppercase py-2 border-b border-neutral-800 pb-2 ${
                    isActive ? "text-red-600 pl-2 border-l-2 border-l-red-600 font-bold" : "text-neutral-300 pl-0"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-sans font-bold py-3 rounded-xl text-sm tracking-wider uppercase shadow-lg shadow-red-600/10"
              >
                <Calendar className="w-5 h-5" />
                Prenota Tavolo
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
