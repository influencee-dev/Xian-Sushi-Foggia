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
          ? "bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/20 py-2"
          : "bg-neutral-950/65 py-3 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:grid md:grid-cols-3">
          
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group focus:outline-none justify-self-start"
          >
            <div className={`flex items-center justify-center rounded-full bg-[#090909] border border-red-600/30 p-2 shadow-[0_0_12px_rgba(220,38,38,0.25)] transform group-hover:scale-105 transition-all duration-300 ${
              isScrolled ? "w-12 h-12 sm:w-14 sm:h-14" : "w-16 h-16 sm:w-20 sm:h-20"
            }`}>
              <img
                src="logo.png"
                alt={`${RESTAURANT_CONFIG.name} Logo`}
                className="w-full h-full object-contain"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 justify-self-center">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-sm tracking-wider font-medium uppercase transition-all duration-300 py-1 ${
                    isActive ? "text-white neon-text-white" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.9),0_0_2px_rgba(220,38,38,1)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4 justify-self-end">
            {/* Prenota Tavolo */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-sans font-semibold px-5 py-2.5 rounded-lg shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all text-xs tracking-wider uppercase"
            >
              <Calendar className="w-4 h-4" />
              Prenota Tavolo
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 text-white p-2.5 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-amber-500/30"
              aria-label="Apri Carrello"
            >
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-neutral-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Bar Actions */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-neutral-900 border border-neutral-800 text-white p-2.5 rounded-lg transition-all focus:outline-none"
              aria-label="Apri Carrello Mobile"
            >
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-neutral-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 p-2.5 rounded-lg hover:text-white transition-all focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-t border-neutral-900 absolute top-full left-0 w-full py-6 px-4 shadow-2xl animate-fade-in-down">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-sans text-base tracking-wider font-semibold uppercase py-2 border-b border-neutral-900/50 pb-2 ${
                    isActive ? "text-white neon-text-white pl-2 border-l-2 border-l-red-600" : "text-neutral-300 pl-0"
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
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-sans font-semibold py-3 rounded-lg text-sm tracking-wider uppercase shadow-lg shadow-amber-500/10"
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
