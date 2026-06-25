import { useState, useEffect, useRef } from "react";
import { RESTAURANT_CONFIG, PRODUCTS, CATEGORIES, CATEGORY_IMAGES } from "./data";
import { CartItem, OrderType, Product } from "./types";
import { 
  Calendar, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle, 
  Flame, 
  Smile, 
  ArrowRight, 
  PhoneCall, 
  Compass, 
  Heart,
  ChevronRight,
  Info,
  Minus,
  Plus,
  Instagram,
  Facebook
} from "lucide-react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingForm from "./components/BookingForm";
import CheckoutForm from "./components/CheckoutForm";
import CartDrawer from "./components/CartDrawer";
import FAQ from "./components/FAQ";
import LegalModals, { LegalDocType } from "./components/LegalModals";

// Assets
import heroContactsImg from "./assets/images/hero_contacts_1782375543235.jpg";
import heroHomeImg from "./assets/images/hero_home_1782375586446.jpg";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0] || "Antipasti");

  // Keep track of quantity additions per product in Takeaway page
  const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>({});

  // Local Storage synchronizer for the cart to persist items across page flips
  useEffect(() => {
    const savedCart = localStorage.getItem("xian_sushi_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Errore caricamento carrello", e);
      }
    }
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("xian_sushi_cart", JSON.stringify(updatedCart));
  };

  // SEO: Dynamically update Document Title and Meta Description
  useEffect(() => {
    let title = "";
    let description = "";

    switch (currentPage) {
      case "home":
        title = "Sushi premium a Foggia | Xian Sushi - All You Can Eat & Area Bimbi";
        description = "Ristorante sushi premium a Foggia con formula All You Can Eat, area bimbi con gonfiabili, menu pranzo e cena, prenotazione tavoli e atmosfera elegante.";
        break;
      case "takeaway":
        title = "Sushi Take Away e Delivery a Foggia | Ordina Online | Xian Sushi";
        description = "Ordina sushi take away e delivery a Foggia. Scegli i tuoi piatti preferiti, aggiungili al carrello e prenota il ritiro in sede o la consegna a domicilio.";
        break;
      case "contacts":
        title = "Contatti Xian Sushi Foggia | Orari, Indirizzo e Prenotazioni";
        description = "Contatta il ristorante Xian Sushi a Foggia. Prenota il tuo tavolo, richiedi informazioni, scopri gli orari e raggiungici comodamente da Foggia e comuni limitrofi.";
        break;
      default:
        title = "Xian Sushi Foggia";
        description = "Ristorante sushi premium a Foggia.";
    }

    document.title = title;
    
    // Reset window scroll position on page change
    window.scrollTo({ top: 0, behavior: "instant" as any });
    
    // Attempt to update meta description tag
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [currentPage]);

  // Dynamic active category state listener on scrolling down Takeaway page
  useEffect(() => {
    if (currentPage !== "takeaway") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // offset to detect active section comfortably
      
      for (const category of CATEGORIES) {
        const id = `section-${category.replace(/\s+/g, "-").toLowerCase()}`;
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setSelectedCategory(category);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  // Smoothly center the active category button in the horizontal scrolling menu when selectedCategory changes
  useEffect(() => {
    if (currentPage !== "takeaway" || !selectedCategory) return;
    
    const activeBtn = document.getElementById(
      `category-btn-${selectedCategory.replace(/\s+/g, "-").toLowerCase()}`
    );
    const container = categoryContainerRef.current;
    
    if (activeBtn && container) {
      const containerWidth = container.clientWidth;
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.clientWidth;
      
      const targetScrollLeft = btnOffsetLeft - (containerWidth / 2) + (btnWidth / 2);
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    }
  }, [selectedCategory, currentPage]);

  // Cart operations
  const handleAddToCart = (product: Product, customQty?: number) => {
    const qtyToAdd = customQty || productQuantities[product.id] || 1;
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    let updatedCart: CartItem[] = [];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += qtyToAdd;
    } else {
      updatedCart = [...cart, { product, quantity: qtyToAdd }];
    }

    saveCartToStorage(updatedCart);
    
    // Reset page quantities state for this product
    setProductQuantities({ ...productQuantities, [product.id]: 1 });

    // Premium visual hint
    const toast = document.createElement("div");
    toast.className = "fixed bottom-5 left-5 z-[120] bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold font-sans px-4 py-3 rounded-xl shadow-2xl text-xs uppercase tracking-wider flex items-center gap-2 animate-fade-in";
    toast.innerHTML = `<span class="bg-neutral-950 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">+</span> ${product.name} aggiunto al carrello!`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-500");
      setTimeout(() => toast.remove(), 500);
    }, 2500);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCartToStorage(updatedCart);
  };

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCartToStorage(updatedCart);
  };

  const handleClearCart = () => {
    saveCartToStorage([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Takeaway page local quantity selectors
  const incrementProductQty = (productId: string) => {
    const current = productQuantities[productId] || 1;
    setProductQuantities({ ...productQuantities, [productId]: current + 1 });
  };

  const decrementProductQty = (productId: string) => {
    const current = productQuantities[productId] || 1;
    if (current > 1) {
      setProductQuantities({ ...productQuantities, [productId]: current - 1 });
    }
  };

  const scrollToSection = (category: string) => {
    setSelectedCategory(category);
    const id = `section-${category.replace(/\s+/g, "-").toLowerCase()}`;
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 160; // offset for sticky header and sticky categories bar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Structured SEO Data injection for crawlers and AI search agents
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": `${RESTAURANT_CONFIG.whatsappDisplay}/#restaurant`,
        "name": RESTAURANT_CONFIG.name,
        "image": "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=1200&q=80",
        "priceRange": RESTAURANT_CONFIG.priceRange,
        "servesCuisine": RESTAURANT_CONFIG.cuisine,
        "telephone": RESTAURANT_CONFIG.phone,
        "email": RESTAURANT_CONFIG.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": RESTAURANT_CONFIG.address.split(",")[0],
          "addressLocality": RESTAURANT_CONFIG.city,
          "addressRegion": "FG",
          "postalCode": "71121",
          "addressCountry": "IT"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": RESTAURANT_CONFIG.coordinates.lat,
          "longitude": RESTAURANT_CONFIG.coordinates.lng
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "12:00",
            "closes": "14:30"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "19:00",
            "closes": "23:30"
          }
        ],
        "areaServed": RESTAURANT_CONFIG.areaServed.map(city => ({
          "@type": "AdministrativeArea",
          "name": city
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Dove mangiare sushi all you can eat a Foggia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Il ristorante Xian Sushi si trova a Foggia in Via Manfredonia 37, offrendo una formula all you can eat a pranzo e a cena con ingredienti freschi, preparazioni tradizionali ed espresse, in una location premium."
            }
          },
          {
            "@type": "Question",
            "name": "Il ristorante ha un’area bimbi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sì, Xian Sushi dispone di un'esclusiva area bimbi attrezzata con gonfiabili e giochi sicuri, studiata per far divertire i più piccoli e consentire ai genitori di godersi la cena in pieno relax."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-400 font-sans selection:bg-amber-500/20 selection:text-white flex flex-col">
      {/* JSON-LD Script tag for SEO bots */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </script>

      {/* Header component present on all pages */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-[88px]">
        
        {/* ========================================================= */}
        {/* PAGE 1: HOME */}
        {/* ========================================================= */}
        {currentPage === "home" && (
          <div className="animate-fade-in relative">
            
            {/* HERO SECTION - Fixed at the back, remains still while scrolling */}
            <section 
              className="fixed top-[88px] left-0 w-full h-[calc(100vh-88px)] flex items-center justify-center text-center px-4 py-20 bg-neutral-950 overflow-hidden z-0"
              style={{
                backgroundImage: `linear-gradient(rgba(3, 3, 3, 0.7), rgba(3, 3, 3, 0.7)), url('${heroHomeImg}')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              {/* Gold light leak effect in bottom left */}
              <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative max-w-4xl mx-auto space-y-8">
                {/* Elegant White Neon Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-950/85 border border-white/25 rounded-full neon-glow-white-sm mb-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,1)]" />
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-white font-medium uppercase">
                    ESPERIENZA SUSHI PREMIUM
                  </span>
                </div>

                {/* Real logo image */}
                <div className="mx-auto flex flex-col items-center justify-center max-w-[280px] sm:max-w-[340px] md:max-w-[400px] mb-6">
                  <img
                    src="logo.png"
                    alt={`${RESTAURANT_CONFIG.name} Logo`}
                    className="w-full h-auto object-contain animate-fade-in"
                  />
                </div>

                {/* 3 Call-To-Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 btn-gold-p text-xs uppercase tracking-widest rounded-xl font-bold font-sans flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Prenota un Tavolo
                  </button>

                  <button
                    onClick={() => {
                      setCurrentPage("takeaway");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-neutral-900 hover:bg-neutral-850 text-white font-bold text-xs uppercase tracking-widest rounded-xl border border-neutral-800 hover:border-amber-500/50 transition-all font-sans flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                    Ordina Take Away
                  </button>

                  <a
                    href="#menu-ayce"
                    className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-neutral-900/50 text-neutral-300 hover:text-white font-medium text-xs uppercase tracking-widest rounded-xl border border-neutral-800 transition-all font-sans flex items-center justify-center gap-2"
                  >
                    Scopri i Menu
                  </a>
                </div>
              </div>

              {/* Bounce icon hinting to scroll down */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 opacity-60">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Scopri</span>
                <div className="w-5 h-8 border-2 border-neutral-700 rounded-full flex justify-center p-1">
                  <div className="w-1 h-2 bg-amber-500 rounded-full animate-bounce" />
                </div>
              </div>
            </section>

            {/* SCROLLING CONTENT WRAPPER - Slides up and covers the hero section */}
            <div className="relative z-20 mt-[calc(100vh-88px)] bg-neutral-950 shadow-[0_-20px_50px_rgba(0,0,0,0.9)]">
              {/* Elegant white neon fluo transition line */}
              <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
              
              {/* SEZIONE FILOSOFIA */}
              <section className="py-24 bg-neutral-950 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-20">
                  <span className="text-amber-500 font-mono tracking-widest text-xs uppercase block mb-3">
                    L'ECCELLENZA DEL DETTAGLIO
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans text-white tracking-tight">
                    La nostra idea di sushi <span className="text-amber-500">.</span>
                  </h2>
                  <div className="h-1 w-12 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  <p className="text-neutral-300 mt-6 text-base sm:text-lg leading-relaxed font-sans font-light">
                    “Un’esperienza pensata per chi ama il sushi, la cucina orientale e il piacere di una cena curata in ogni dettaglio. Ogni piatto nasce dall’equilibrio tra qualità degli ingredienti, freschezza, presentazione e servizio. Un format premium, accogliente e contemporaneo, dove il gusto incontra il relax.”
                  </p>
                </div>

                {/* Three Elegant Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-8 hover:border-amber-500/30 hover:bg-neutral-900 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Flame className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-sans font-bold text-white mb-3">
                      Qualità Selezionata
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      Ingredienti scelti con cura, preparazioni espresse e attenzione costante alla freschezza del pesce abbattuto.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-8 hover:border-amber-500/30 hover:bg-neutral-900 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-sans font-bold text-white mb-3">
                      Esperienza All You Can Eat
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      Una formula completa, pensata per vivere il sushi con assoluta libertà, gusto illimitato e grande varietà.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-8 hover:border-amber-500/30 hover:bg-neutral-900 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-sans font-bold text-white mb-3">
                      Atmosfera Premium
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      Un ambiente curato nei dettagli, rilassante ed elegante, ideale per coppie, cene di famiglia e gruppi d'amici.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* SEZIONE MENU ALL YOU CAN EAT */}
            <section id="menu-ayce" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
              {/* Visual red/black circular pattern for background decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-amber-500 font-mono tracking-widest text-xs uppercase block mb-3">
                    LE NOSTRE FORMULE
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans text-white tracking-tight">
                    Menu All You Can Eat <span className="text-amber-500">.</span>
                  </h2>
                  <div className="h-1 w-12 bg-amber-500 mx-auto mt-4 rounded-full"></div>
                  <p className="text-neutral-400 mt-5 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    Scegli il momento migliore per vivere la tua esperienza sushi a Foggia. A pranzo o a cena, in settimana o nei giorni festivi, il nostro menu è pensato per offrire qualità, freschezza e libertà.
                  </p>
                </div>

                {/* Four Price Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
                  {RESTAURANT_CONFIG.prices.map((card) => {
                    const isLunch = card.id.includes("pranzo");
                    const isWeekend = card.id.includes("weekend");
                    const kidsPrice = isLunch ? "€ 10,00" : "€ 15,00";
                    return (
                      <div
                        key={card.id}
                        className="bg-neutral-900/90 border border-neutral-850 rounded-3xl p-6 sm:p-8 hover:border-white/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                      >
                        {/* Gold subtle light leak on hover */}
                        <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-amber-500/0 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/5 transition-colors duration-500" />
                        
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center h-full">
                          {/* Content Column */}
                          <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
                            <div className="space-y-1">
                              <span className="text-neutral-500 font-mono tracking-widest text-[9px] uppercase block font-bold">
                                ALL YOU CAN EAT
                              </span>
                              <h3 className="text-xl sm:text-2xl font-display text-white tracking-tight">
                                MENU <span className="text-amber-500 font-extrabold">{isLunch ? "PRANZO" : "CENA"}</span>
                              </h3>
                              <p className="text-[10px] text-amber-500/80 font-mono uppercase tracking-widest font-bold">
                                {isWeekend ? "WEEKEND & FESTIVI" : "IN SETTIMANA"}
                              </p>
                            </div>

                            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                              Il menù All You Can Eat {isLunch ? "a pranzo" : "a cena"} è disponibile al prezzo di:
                            </p>

                            <div className="space-y-1">
                              <div className="text-white text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
                                € {card.price.toFixed(2).replace(".", ",")}
                              </div>
                              <p className="text-[10px] text-neutral-500 font-sans">
                                {isWeekend ? "Valido nei weekend e festivi" : "Valido nei giorni feriali"}
                              </p>
                            </div>

                            <div className="space-y-1 text-xs text-neutral-400 border-t border-neutral-800/80 pt-4 font-sans">
                              <p>
                                Bambini con altezza inferiore a 120 cm: <span className="text-white font-semibold">{kidsPrice}</span>
                              </p>
                              <p>
                                Bambini da 120 cm in su: <span className="text-white font-semibold">prezzo intero</span>
                              </p>
                            </div>

                            <p className="text-[10px] text-neutral-500 font-sans italic">
                              Bevande, dolci, caffè e liquori esclusi.
                            </p>

                            <div className="pt-2">
                              <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black text-[11px] uppercase font-extrabold tracking-wider rounded-full transition-all duration-300 shadow-md"
                              >
                                Prenota un tavolo
                              </button>
                            </div>
                          </div>

                          {/* Image Column */}
                          {card.image && (
                            <div className="sm:col-span-5 flex items-center justify-center relative w-full h-full min-h-[160px] sm:min-h-0">
                              {/* Ambient golden aura behind plate */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-all duration-500" />
                              
                              <div className="w-full aspect-[4/3] flex items-center justify-center select-none pointer-events-none overflow-visible">
                                <img
                                  src={card.image}
                                  alt={card.title}
                                  referrerPolicy="no-referrer"
                                  className="max-w-full max-h-full w-auto h-auto object-contain transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                                  style={{ 
                                    mixBlendMode: 'screen',
                                    filter: 'brightness(0.9) contrast(1.35)',
                                    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)',
                                    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 70%)'
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing Bottom CTA */}
                <div className="text-center">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="px-8 py-4 btn-gold-p text-xs uppercase tracking-widest rounded-xl font-bold font-sans"
                  >
                    Prenota ora il tuo tavolo
                  </button>
                </div>

              </div>
            </section>

            {/* SEZIONE AREA BIMBI CON GONFIABILI */}
            <section className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Side: Description Text */}
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-amber-500 font-mono tracking-widest text-xs uppercase block mb-1">
                      KID-FRIENDLY & FAMILY RELAX
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans text-white tracking-tight">
                      Area bimbi con gonfiabili <span className="text-amber-500">.</span>
                    </h2>
                    <div className="h-0.5 w-12 bg-amber-500 mt-3 rounded-full"></div>
                    
                    <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans font-light">
                      Da noi il sushi è anche un momento di relax per tutta la famiglia. Mentre gli adulti si godono la cena, i bambini possono divertirsi in un’area dedicata con gonfiabili, pensata per rendere l’esperienza più serena, comoda e piacevole.
                    </p>

                    <div className="space-y-3.5 pt-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-amber-500/10 text-amber-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/20">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm text-neutral-400">
                          <strong>Tranquillità per i Genitori</strong>: Mangia in pace sapendo che i tuoi figli sono vicini e si stanno svagando.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-amber-500/10 text-amber-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/20">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm text-neutral-400">
                          <strong>Divertimento in Sicurezza</strong>: Strutture gonfiabili morbide ideali e a norma di sicurezza per i più piccoli.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-amber-500/10 text-amber-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/20">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm text-neutral-400">
                          <strong>Ristorante Ideale per Famiglie</strong>: Perfetto per organizzare pranzi domenicali e cene rilassate in famiglia a Foggia.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setIsBookingModalOpen(true)}
                        className="px-8 py-4 btn-gold-o text-xs uppercase tracking-widest rounded-xl font-bold font-sans"
                      >
                        Prenota una cena in famiglia
                      </button>
                    </div>
                  </div>

                  {/* Right Side: Elegant visual representations */}
                  <div className="lg:col-span-5 relative">
                    <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-3xl opacity-10 blur-xl" />
                    
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/80">
                      <img
                        src="playland.png"
                        alt="Area Bimbi con Gonfiabili Xian Sushi Foggia"
                        className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {/* Premium card badge overlay */}
                      <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 p-4 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
                          <Smile className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white uppercase font-sans">Spazio bimbi attrezzato</p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">Disponibile gratuitamente per i clienti del locale.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* SEZIONE PRENOTAZIONE TAVOLO (IN-LINE RES) */}
            <section id="prenota" className="py-24 bg-neutral-950 border-t border-neutral-900 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <BookingForm isModal={false} />
              </div>
            </section>

            {/* SEZIONE FAQ (SEO, AEO, VOICE ACCESSIBLE) */}
            <FAQ />

            </div> {/* Close SCROLLING CONTENT WRAPPER */}
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 2: TAKE AWAY & DELIVERY */}
        {/* ========================================================= */}
        {currentPage === "takeaway" && (
          <div className="animate-fade-in bg-neutral-950 pb-24">
            
            {/* Lower Page Hero */}
            <section className="bg-neutral-950 py-12 border-b border-neutral-900 text-center">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-amber-500 font-mono tracking-widest text-xs uppercase block mb-2">
                  ORDINA ONLINE CON WHATSAPP
                </span>
                <h1 className="text-3xl sm:text-5xl font-sans text-white tracking-tight">
                  Take Away & Delivery <span className="text-amber-500">.</span>
                </h1>
                <div className="h-0.5 w-12 bg-amber-500 mx-auto mt-3 rounded-full"></div>
                <p className="text-neutral-400 mt-4 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
                  Ordina il tuo sushi preferito a Foggia. Scegli i piatti, aggiungili al carrello e scegli tra consegna a domicilio o ritiro in sede.
                </p>
              </div>
            </section>

            {/* STICKY HORIZONTAL CATEGORY SELECTOR FOR BOTH DESKTOP AND MOBILE */}
            <div className="sticky top-[72px] lg:top-[80px] z-30 bg-neutral-950/95 backdrop-blur-md py-4 border-b border-neutral-900/80 mb-8 select-none w-full">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                  ref={categoryContainerRef}
                  className="flex overflow-x-auto gap-2.5 pb-1 no-scrollbar scrollbar-none scroll-smooth"
                >
                  {CATEGORIES.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        id={`category-btn-${category.replace(/\s+/g, "-").toLowerCase()}`}
                        onClick={() => scrollToSection(category)}
                        className={`whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all border flex-shrink-0 flex items-center gap-1.5 ${
                          isActive
                            ? "bg-neutral-950 text-white border-white neon-border-white"
                            : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-850"
                        }`}
                      >
                        {category}
                        {isActive && (
                          <span className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
              
              {/* SEQUENTIAL MENU SECTIONS LAYOUT */}
              <div className="space-y-16 mt-8">
                {CATEGORIES.map((category) => {
                  const categoryProducts = PRODUCTS.filter((p) => p.category === category);
                  if (categoryProducts.length === 0) return null;
                  const categoryImage = CATEGORY_IMAGES[category] || "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=800&q=80";
                  const sectionId = `section-${category.replace(/\s+/g, "-").toLowerCase()}`;

                  return (
                    <section
                      key={category}
                      id={sectionId}
                      className="scroll-mt-44 pb-12 border-b border-neutral-900/60 last:border-0 last:pb-0"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Left Side: Section Image / Info Card (Sticky on Desktop) */}
                        <div className="lg:col-span-4 lg:sticky lg:top-[160px] z-10">
                          <div className="relative rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-900/40 p-6 flex flex-col justify-between min-h-[160px] lg:min-h-[340px] group shadow-xl">
                            {/* Gold ambient light leak */}
                            <div className="absolute -right-24 -bottom-24 w-52 h-52 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-700" />
                            
                            <div className="relative z-10 space-y-2">
                              <span className="text-amber-500 font-mono tracking-widest text-[10px] uppercase block font-bold">
                                SEZIONE MENU
                              </span>
                              <h2 className="text-2xl sm:text-3xl font-sans text-white font-extrabold tracking-tight">
                                {category}
                              </h2>
                              <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">
                                {categoryProducts.length} Specialità
                              </p>
                            </div>

                            {/* Clean product category image */}
                            <div className="absolute right-4 bottom-4 lg:static lg:mx-auto lg:mt-8 w-24 h-24 lg:w-44 lg:h-44 transition-all duration-500 flex items-center justify-center select-none pointer-events-none">
                              <img
                                src={categoryImage}
                                alt={category}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right Side: Selectable Product Cards Grid */}
                        <div className="lg:col-span-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categoryProducts.map((product) => {
                              const localQty = productQuantities[product.id] || 1;
                              return (
                                <div
                                  key={product.id}
                                  className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-5 hover:border-amber-500/20 hover:shadow-[0_12px_24px_rgba(245,158,11,0.02)] transition-all duration-300 flex flex-col justify-between h-full group"
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-start justify-between gap-4">
                                      <h3 className="text-sm sm:text-base font-sans font-bold text-white tracking-tight group-hover:text-amber-500 transition-colors duration-200">
                                        {product.name}
                                      </h3>
                                      <span className="text-xs sm:text-sm font-bold text-amber-500 font-mono whitespace-nowrap bg-neutral-950 border border-neutral-850 px-2.5 py-1 rounded-lg">
                                        €{product.price.toFixed(2)}
                                      </span>
                                    </div>
                                    {product.description && (
                                      <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                                        {product.description}
                                      </p>
                                    )}
                                    {product.popular && (
                                      <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-amber-500 font-bold bg-amber-500/5 border border-amber-500/15 px-2 py-0.5 rounded-md mt-1">
                                        <Sparkles className="w-2.5 h-2.5" /> Popolare
                                      </span>
                                    )}
                                  </div>

                                  {/* Quantity and Cart Controls */}
                                  <div className="flex items-center justify-between gap-3 border-t border-neutral-900/60 pt-4 mt-4">
                                    <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-850 rounded-lg p-0.5">
                                      <button
                                        onClick={() => decrementProductQty(product.id)}
                                        className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded disabled:opacity-30 transition-all"
                                        disabled={localQty <= 1}
                                        aria-label="Decrementa quantità"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="text-xs text-white font-mono font-bold px-1.5 min-w-[16px] text-center">
                                        {localQty}
                                      </span>
                                      <button
                                        onClick={() => incrementProductQty(product.id)}
                                        className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-all"
                                        aria-label="Incrementa quantità"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>

                                    <button
                                      onClick={() => handleAddToCart(product, localQty)}
                                      className="flex-1 py-1.5 bg-neutral-950 hover:bg-amber-500/10 text-amber-500 border border-neutral-850 hover:border-amber-500/30 text-xs font-sans uppercase font-bold tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5"
                                    >
                                      <ShoppingBag className="w-3.5 h-3.5" />
                                      Ordina
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 3: CONTATTI */}
        {/* ========================================================= */}
        {currentPage === "contacts" && (
          <div className="animate-fade-in relative min-h-[calc(100vh-88px)] bg-neutral-950 flex flex-col justify-between">
            
            {/* Background wrapper */}
            <section 
              className="w-full flex-grow flex items-center justify-center px-4 py-12 sm:py-16 md:py-20 bg-neutral-950 relative"
              style={{
                backgroundImage: `linear-gradient(rgba(3, 3, 3, 0.85), rgba(3, 3, 3, 0.85)), url('${heroContactsImg}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
              }}
            >
              <div className="max-w-6xl w-full px-4 sm:px-6 relative z-10 mx-auto my-auto">
                
                {/* Elegant central floating information box (Grande Rettangolo Nero) */}
                <div className="bg-neutral-950/95 backdrop-blur-md border border-neutral-800 p-6 sm:p-10 rounded-2xl shadow-2xl space-y-8">
                  
                  {/* Header Title inside card */}
                  <div className="text-center pb-6 border-b border-neutral-900 flex flex-col items-center justify-center gap-2">
                    <span className="text-amber-500 font-mono tracking-widest text-[10px] uppercase block">
                      ORARI, CONTATTI E SEDE
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-sans text-white tracking-tight">
                      {RESTAURANT_CONFIG.name} <span className="text-amber-500">.</span>
                    </h1>
                  </div>

                  {/* Two-Column Responsive Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-sm">
                    
                    {/* LEFT COLUMN: Opening Hours, Address, Contacts (col-span-5) */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      {/* Sede */}
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" /> Sede Principale
                        </p>
                        <p className="text-white font-semibold text-base">{RESTAURANT_CONFIG.address}</p>
                        <p className="text-neutral-500 text-xs mt-1">Nel cuore di Foggia</p>
                      </div>

                      {/* Orari di Apertura */}
                      <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold mb-2 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500" /> Giorni e Orari
                        </p>
                        <div className="space-y-2 text-neutral-300 text-xs bg-neutral-900/40 p-4 rounded-xl border border-neutral-900/60">
                          {RESTAURANT_CONFIG.hours.daily?.map((d) => (
                            <div key={d.day} className="flex justify-between items-start py-1 border-b border-neutral-900/20 last:border-0 last:pb-0">
                              <span className="font-semibold text-neutral-400">{d.day}</span>
                              <div className="text-right text-neutral-100 font-mono text-[11px] font-medium tracking-wide space-y-0.5">
                                {d.shifts.map((shift, idx) => (
                                  <p key={idx}>{shift}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recapiti Diretti */}
                      <div className="space-y-3 pt-1">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                          Contatti Diretti
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <a
                            href={`tel:${RESTAURANT_CONFIG.phone}`}
                            className="p-3.5 bg-neutral-900/50 hover:bg-neutral-900 rounded-xl border border-neutral-900 hover:border-amber-500/30 transition-all group"
                          >
                            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">Telefono</span>
                            <span className="text-white font-medium text-sm group-hover:text-amber-500 transition-colors">{RESTAURANT_CONFIG.phoneDisplay}</span>
                          </a>
                          <a
                            href={`https://wa.me/${RESTAURANT_CONFIG.whatsapp.replace("+", "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3.5 bg-neutral-900/50 hover:bg-neutral-900 rounded-xl border border-neutral-900 hover:border-emerald-500/30 transition-all group"
                          >
                            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">WhatsApp</span>
                            <span className="text-emerald-400 font-medium text-sm group-hover:text-emerald-300 transition-colors">Scrivici Ora</span>
                          </a>
                        </div>
                      </div>

                      {/* Social Network */}
                      <div className="space-y-3 pt-1">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                          Seguici sui Social
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {RESTAURANT_CONFIG.instagramUrl && (
                            <a
                              href={RESTAURANT_CONFIG.instagramUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-3 bg-neutral-900/50 hover:bg-neutral-900 rounded-xl border border-neutral-900 hover:border-pink-500/30 transition-all group flex items-center gap-3"
                            >
                              <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500 group-hover:bg-pink-500/20 transition-all">
                                <Instagram className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">Instagram</span>
                                <span className="text-white font-medium text-xs sm:text-sm group-hover:text-pink-500 transition-colors">@sushi_xian2</span>
                              </div>
                            </a>
                          )}
                          {RESTAURANT_CONFIG.facebookUrl && (
                            <a
                              href={RESTAURANT_CONFIG.facebookUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-3 bg-neutral-900/50 hover:bg-neutral-900 rounded-xl border border-neutral-900 hover:border-blue-500/30 transition-all group flex items-center gap-3"
                            >
                              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:bg-blue-500/20 transition-all">
                                <Facebook className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500 block">Facebook</span>
                                <span className="text-white font-medium text-xs sm:text-sm group-hover:text-blue-500 transition-colors">Xian Sushi</span>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* RIGHT COLUMN: Where We Are, Local SEO & Google Maps (col-span-7) */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Local SEO / Dove siamo info */}
                      <div className="space-y-3">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">Come Raggiungerci</p>
                        <h2 className="text-xl sm:text-2xl font-sans text-white tracking-tight">
                          Dove Siamo <span className="text-amber-500">.</span>
                        </h2>
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                          Ci trovi in una posizione strategica a Foggia, facilmente raggiungibile e dotata di comode aree di sosta. Accogliamo ogni giorno appassionati di sushi ed eccellenza asiatica anche dai comuni limitrofi:
                        </p>
                        
                        {/* Area served pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {RESTAURANT_CONFIG.areaServed.map((municipality) => (
                            <span
                              key={municipality}
                              className="px-2.5 py-1 bg-neutral-900 border border-neutral-850 rounded-lg text-[10px] font-sans text-neutral-400 hover:border-amber-500/20 hover:text-white transition-all cursor-default"
                            >
                              • {municipality}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Embedded Google Maps Frame */}
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/80 h-[280px] sm:h-[320px] bg-neutral-900">
                        <iframe
                          src={RESTAURANT_CONFIG.mapsEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%)" }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Google Maps Xian Sushi Foggia"
                        />
                      </div>

                    </div>

                  </div>



                </div>

              </div>
            </section>

          </div>
        )}

      </main>

      {/* Footer component on all pages */}
      <Footer 
        onPageChange={setCurrentPage} 
        onOpenBooking={() => setIsBookingModalOpen(true)} 
        onOpenLegal={(doc) => setActiveLegalDoc(doc)}
      />

      {/* Cart drawer overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Floating Sticky Cart Summary Pill for Mobile (Visible when on Takeaway and cart has items) */}
      {currentPage === "takeaway" && cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-[60] lg:hidden animate-bounce">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold font-sans text-xs tracking-wider uppercase px-5 py-3.5 rounded-full shadow-2xl"
          >
            <ShoppingBag className="w-4 h-4" />
            Carrello ({cartCount}) • €{cartTotal.toFixed(2)}
          </button>
        </div>
      )}

      {/* Booking Form Modal Overlay */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-xl w-full">
            <BookingForm isModal={true} onCloseModal={() => setIsBookingModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Checkout Form Modal Overlay */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-sm animate-fade-in">
          <div className="max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-thin rounded-2xl">
            <CheckoutForm
              cart={cart}
              cartTotal={cartTotal}
              onClose={() => setIsCheckoutOpen(false)}
              onClearCart={handleClearCart}
            />
          </div>
        </div>
      )}

      {/* Legal Modals Page Overlays */}
      <LegalModals
        activeDoc={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />

    </div>
  );
}
