import { RestaurantConfig, Product, FAQItem } from "./types";

export const RESTAURANT_CONFIG: RestaurantConfig = {
  name: "XIAN SUSHI",
  city: "Foggia",
  address: "Via Manfredonia 37, 71121 Foggia FG",
  phone: "+393778297346",
  phoneDisplay: "377 829 7346",
  landline: "+390881778389",
  landlineDisplay: "0881 778389",
  whatsapp: "+393778297346",
  whatsappDisplay: "377 829 7346",
  email: "info@xiansushifoggia.it",
  coordinates: {
    lat: 41.4721,
    lng: 15.5684,
  },
  // High-quality maps embed centered in Foggia (Via Manfredonia 37)
  mapsEmbedUrl: "https://maps.google.com/maps?q=Via%20Manfredonia%2037,%20Foggia&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapsExternalUrl: "https://maps.google.com/?q=Xian+Sushi+Foggia+Via+Manfredonia+37+Foggia",
  hours: {
    closedDay: "Martedì a pranzo chiuso",
    openDays: "Tutti i giorni escluso il martedì a pranzo",
    lunchTime: "12:30 - 15:00",
    dinnerTime: "19:30 - 24:00",
    daily: [
      { day: "Lunedì", shifts: ["12:30 - 15:00", "19:30 - 24:00"] },
      { day: "Martedì", shifts: ["Solo sera: 19:30 - 24:00"] },
      { day: "Mercoledì", shifts: ["12:30 - 15:00", "19:30 - 24:00"] },
      { day: "Giovedì", shifts: ["12:30 - 15:00", "19:30 - 24:00"] },
      { day: "Venerdì", shifts: ["12:30 - 15:00", "19:30 - 24:00"] },
      { day: "Sabato", shifts: ["12:30 - 15:00", "19:30 - 24:00"] },
      { day: "Domenica", shifts: ["12:30 - 15:00", "19:30 - 24:00"] },
    ],
  },
  cuisine: "Sushi, Cucina giapponese, Asian Fusion",
  priceRange: "€€",
  areaServed: [
    "Foggia",
    "San Severo",
    "Lucera",
    "Manfredonia",
    "Cerignola",
    "Orta Nova",
    "San Giovanni Rotondo",
    "Troia",
  ],
  prices: [
    {
      id: "pranzo",
      title: "Menu Pranzo",
      price: 17.90,
      kidsPrice: "€ 8,90",
      description: "Formula All You Can Eat a pranzo (12:30 - 15:00, tutti i giorni escluso martedì).",
      note: "Bevande, dolci e coperto esclusi.",
      image: "antipasto.png",
      timeSlot: "12:30 - 15:00",
    },
    {
      id: "cena",
      title: "Menu Cena",
      price: 24.90,
      kidsPrice: "€ 11,90",
      description: "Formula All You Can Eat a cena (19:30 - 24:00, tutte le sere).",
      note: "Bevande, dolci e coperto esclusi.",
      image: "sashimi.png",
      timeSlot: "19:30 - 24:00",
    },
  ],
  instagramUrl: "https://www.instagram.com/xiansushi_foggia/",
  facebookUrl: "https://www.facebook.com/sushixian888/",
};

export const CATEGORIES = [
  "Antipasti",
  "Primi Piatti",
  "Secondi Piatti",
  "Sashimi & Sushi Misto",
  "Nigiri (2 pz)",
  "Hosomaki (6 pz)",
  "Uramaki (8 pz)",
  "Carpacci, Tataki e Speciali",
  "Futomaki (4 pz)",
  "Gunkan (2 pz)",
  "Temaki (1 pz)",
  "Onigiri",
  "Dolci",
  "Bibite"
];

export const CATEGORY_NOTES: Record<string, string> = {
  "Primi Piatti": "Tutti i primi piatti contengono vino, sale e cipollotti",
};

export const CATEGORY_IMAGES: Record<string, string> = {
  "Antipasti": "antipasto.png",
  "Primi Piatti": "primo.png",
  "Secondi Piatti": "secondo.png",
  "Sashimi & Sushi Misto": "sashimi.png",
  "Nigiri (2 pz)": "nigiri.png",
  "Hosomaki (6 pz)": "hosomaki.png",
  "Uramaki (8 pz)": "uramaki.png",
  "Carpacci, Tataki e Speciali": "sashimi.png",
  "Futomaki (4 pz)": "futomaki.png",
  "Gunkan (2 pz)": "gunkan.png",
  "Temaki (1 pz)": "temaki.png",
  "Onigiri": "onigiri.png",
  "Dolci": "dolce.png",
  "Bibite": "bevanda.png"
};

export const PRODUCTS: Product[] = [
  // ==========================================
  // ANTIPASTI
  // ==========================================
  { id: "ant-1", name: "1. Involtini primavera", price: 2.50, category: "Antipasti" },
  { id: "ant-1h", name: "1H. Gua bao", price: 3.00, category: "Antipasti" },
  { id: "ant-2", name: "2. Pane cinese", price: 3.00, category: "Antipasti" },
  { id: "ant-2h", name: "2H. Pane fritto", price: 3.00, category: "Antipasti" },
  { id: "ant-3", name: "3. Involtini vietnamiti", price: 3.00, category: "Antipasti" },
  { id: "ant-3h", name: "3H. Involtini salmone", price: 3.50, category: "Antipasti" },
  { id: "ant-4", name: "4. Ravioli di carne", price: 3.50, category: "Antipasti" },
  { id: "ant-4h", name: "4H. Ravioli alla griglia", price: 3.50, category: "Antipasti" },
  { id: "ant-5", name: "5. Shao mai", price: 4.00, category: "Antipasti" },
  { id: "ant-5h", name: "5H. *Goma wakame", price: 4.00, category: "Antipasti" },
  { id: "ant-6", name: "6. *Edamame", price: 3.50, category: "Antipasti" },
  { id: "ant-7", name: "7. Insalata mista", price: 3.00, category: "Antipasti" },
  { id: "ant-8", name: "8. Insalata di mango", price: 6.00, category: "Antipasti" },
  { id: "ant-9", name: "9. Insalata con gamberi", price: 4.00, category: "Antipasti" },
  { id: "ant-10", name: "10. Zuppa di miso", price: 3.00, category: "Antipasti" },
  { id: "ant-11", name: "11. Zuppa con frutti di mare", price: 3.00, category: "Antipasti" },
  { id: "ant-11h", name: "11H. Zuppa agropiccante", price: 3.00, category: "Antipasti" },
  { id: "ant-12", name: "12. Takoyaki", price: 4.00, category: "Antipasti" },
  { id: "ant-13", name: "13. Nuvole di drago", price: 2.50, category: "Antipasti" },
  { id: "ant-14", name: "14. Pane dolce vapore", price: 3.00, category: "Antipasti" },

  // ==========================================
  // PRIMI PIATTI (tutti contengono vino, sale e cipollotti)
  // ==========================================
  { id: "pri-12h", name: "12H. Riso bianco", price: 1.50, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-12", name: "12. Riso alla cantonese", price: 4.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-13", name: "13. Riso al curry", price: 4.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-15", name: "15. Riso con verdure", price: 4.50, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-20", name: "20. Spaghetti di riso con gamberi", price: 5.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-21", name: "21. Spaghetti di soia con verdure", price: 4.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-22", name: "22. Spaghetti di soia con frutti di mare", price: 5.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-25", name: "25. Spaghetti saltati con carne", price: 5.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-26", name: "26. Ramen", price: 6.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-29", name: "29. Udon con frutti di mare", price: 8.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-30", name: "30. Yaki soba", price: 6.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-31", name: "31. Noodles saltati con carne", price: 6.50, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-35", name: "35. Riso venere saltato", price: 5.50, category: "Primi Piatti", description: "Vino, sale e cipollotti" },
  { id: "pri-35h", name: "35H. Gnocchi di riso saltato", price: 5.00, category: "Primi Piatti", description: "Vino, sale e cipollotti" },

  // ==========================================
  // SECONDI PIATTI
  // ==========================================
  { id: "sec-36", name: "36. *Patatine fritte", price: 3.00, category: "Secondi Piatti" },
  { id: "sec-37", name: "37. *Calamari fritti", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-39", name: "39. Gamberi fritti", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-40", name: "40. Pollo fritto", price: 4.50, category: "Secondi Piatti" },
  { id: "sec-42", name: "42. Frittura mista di verdure", price: 4.00, category: "Secondi Piatti" },
  { id: "sec-43", name: "43. Tempura di *gamberi", price: 7.50, category: "Secondi Piatti" },
  { id: "sec-44", name: "44. *Spiedini di gamberi alla griglia", price: 7.00, category: "Secondi Piatti" },
  { id: "sec-45", name: "45. *Gamberoni alla griglia", price: 10.00, category: "Secondi Piatti" },
  { id: "sec-46", name: "46. Salmone alla griglia", price: 10.00, category: "Secondi Piatti" },
  { id: "sec-47", name: "47. Spiedini di seppie alla griglia", price: 6.00, category: "Secondi Piatti" },
  { id: "sec-48", name: "48. Spiedini di pollo alla griglia", price: 6.00, category: "Secondi Piatti" },
  { id: "sec-51", name: "51. Pollo alla griglia", price: 6.00, category: "Secondi Piatti" },
  { id: "sec-52", name: "52. Pollo con le mandorle", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-53", name: "53. Vitello piccante", price: 7.00, category: "Secondi Piatti" },
  { id: "sec-54", name: "54. Gamberi al limone", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-55", name: "55. Pollo al curry", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-56", name: "56. Pollo con funghi e bambù", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-57", name: "57. Pollo piccante", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-58", name: "58. Pollo al limone", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-59", name: "59. Maiale con funghi e bambù", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-60", name: "60. Maiale piccante", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-61", name: "61. Cotoletta di maiale", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-62", name: "62. *Frutti di mare saltati", price: 7.00, category: "Secondi Piatti" },
  { id: "sec-63", name: "63. Verdure miste di stagione saltate", price: 4.00, category: "Secondi Piatti" },
  { id: "sec-65", name: "65. Pollo agrodolce", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-67", name: "67. Maiale agrodolce", price: 5.50, category: "Secondi Piatti" },
  { id: "sec-70", name: "70. *Anatra alla pechinese", price: 7.00, category: "Secondi Piatti" },
  { id: "sec-71", name: "71. *Anatra all'arancia", price: 7.00, category: "Secondi Piatti" },
  { id: "sec-72", name: "72. Gamberi al sale e pepe", price: 7.00, category: "Secondi Piatti" },

  // ==========================================
  // SASHIMI & SUSHI MISTO
  // ==========================================
  { id: "sas-a1", name: "A1. Sushi misto", price: 12.00, category: "Sashimi & Sushi Misto" },
  { id: "sas-a21", name: "A21. Sashimi misto", price: 10.00, category: "Sashimi & Sushi Misto" },
  { id: "sas-a22", name: "A22. Sashimi salmone", price: 10.00, category: "Sashimi & Sushi Misto" },

  // ==========================================
  // NIGIRI (2 pz)
  // ==========================================
  { id: "nig-a5", name: "A5. Salmone", price: 3.00, category: "Nigiri (2 pz)" },
  { id: "nig-a6", name: "A6. Branzino", price: 3.00, category: "Nigiri (2 pz)" },
  { id: "nig-a7", name: "A7. Tonno", price: 3.50, category: "Nigiri (2 pz)" },
  { id: "nig-a8", name: "A8. Gambero", price: 3.00, category: "Nigiri (2 pz)" },
  { id: "nig-a9", name: "A9. *Polpa di granchio", price: 3.00, category: "Nigiri (2 pz)" },
  { id: "nig-a10", name: "A10. Beef", price: 3.50, category: "Nigiri (2 pz)" },
  { id: "nig-a12", name: "A12. Anguilla", price: 4.00, category: "Nigiri (2 pz)" },
  { id: "nig-a13", name: "A13. *Polpo", price: 3.00, category: "Nigiri (2 pz)" },
  { id: "nig-a14", name: "A14. Salmone scottato", price: 3.50, category: "Nigiri (2 pz)" },
  { id: "nig-a15", name: "A15. Branzino scottato", price: 3.50, category: "Nigiri (2 pz)" },
  { id: "nig-a16", name: "A16. Black salmon", price: 3.00, category: "Nigiri (2 pz)" },
  { id: "nig-a16h", name: "A16H. Amaebi", price: 4.50, category: "Nigiri (2 pz)" },

  // ==========================================
  // HOSOMAKI (6 pz)
  // ==========================================
  { id: "hos-a29", name: "A29. Kani", price: 3.00, category: "Hosomaki (6 pz)" },
  { id: "hos-a30", name: "A30. Takuan", price: 3.00, category: "Hosomaki (6 pz)" },
  { id: "hos-a31", name: "A31. Kappa", price: 3.00, category: "Hosomaki (6 pz)" },
  { id: "hos-a32", name: "A32. Shake", price: 3.50, category: "Hosomaki (6 pz)" },
  { id: "hos-a33", name: "A33. Tekka", price: 3.50, category: "Hosomaki (6 pz)" },
  { id: "hos-a34", name: "A34. *California", price: 3.00, category: "Hosomaki (6 pz)" },
  { id: "hos-a35", name: "A35. Ebi gamberi", price: 3.50, category: "Hosomaki (6 pz)" },
  { id: "hos-a36", name: "A36. Ebi tempura", price: 3.50, category: "Hosomaki (6 pz)" },
  { id: "hos-a37", name: "A37. Avocado", price: 4.00, category: "Hosomaki (6 pz)" },
  { id: "hos-a38", name: "A38. *Granchio fritto", price: 3.50, category: "Hosomaki (6 pz)" },
  { id: "hos-a39", name: "A39. Spicy salmon", price: 3.50, category: "Hosomaki (6 pz)" },
  { id: "hos-a40", name: "A40. Spicy tuna", price: 4.50, category: "Hosomaki (6 pz)" },

  // ==========================================
  // URAMAKI (8 pz)
  // ==========================================
  { id: "ura-a41", name: "A41. Shake", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a42", name: "A42. Maguro", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a43", name: "A43. California", price: 8.00, category: "Uramaki (8 pz)" },
  { id: "ura-a44", name: "A44. Ebi tempura", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a45", name: "A45. Tiger roll", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a46", name: "A46. Rainbow", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a48", name: "A48. Miura maki", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a49", name: "A49. Spicy salmon", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a50", name: "A50. Spicy tuna", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a51", name: "A51. Miura tuna", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a52", name: "A52. Vegetariano", price: 7.00, category: "Uramaki (8 pz)" },
  { id: "ura-a53", name: "A53. Philadelphia ebi", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a54", name: "A54. Summer roll", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a55", name: "A55. Philadelphia", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a57", name: "A57. Vegetariano 2", price: 8.00, category: "Uramaki (8 pz)" },
  { id: "ura-a58", name: "A58. Beef roll", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a59", name: "A59. Hilo roll (4 pz)", price: 6.00, category: "Uramaki (8 pz)" },
  { id: "ura-a60", name: "A60. Black ebi", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a61", name: "A61. Chicken roll", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a62", name: "A62. Old California", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a63", name: "A63. Vegetariano 3", price: 7.00, category: "Uramaki (8 pz)" },
  { id: "ura-a70", name: "A70. Maki fritto", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a71", name: "A71. Sake fritto", price: 9.00, category: "Uramaki (8 pz)" },
  { id: "ura-a72", name: "A72. Black shake", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a73", name: "A73. Mango ebiten", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a74", name: "A74. Black maki", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a79", name: "A79. Maki fragola", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a80", name: "A80. Maki mango", price: 10.00, category: "Uramaki (8 pz)" },
  { id: "ura-a106", name: "A106. Hot roll", price: 10.00, category: "Uramaki (8 pz)" },

  // ==========================================
  // CARPACCI, TATAKI E SPECIALI
  // ==========================================
  { id: "spe-a23", name: "A23. Carpaccio misto", price: 8.00, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a24", name: "A24. Carpaccio salmone", price: 8.00, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a25", name: "A25. Barca piccola", price: 28.00, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a64", name: "A64. Shake tataki", price: 8.00, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a61", name: "A61. Chirashi misto", price: 10.00, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a67", name: "A67. Tonno tataki", price: 9.00, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a68", name: "A68. Salmone tartare", price: 9.00, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a102", name: "A102. Flower salmon", price: 3.50, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a103", name: "A103. Flower beef", price: 3.50, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a104", name: "A104. Involtini crudi", price: 3.00, category: "Carpacci, Tataki e Speciali" },
  { id: "spe-a105", name: "A105. Tacos kani", price: 4.50, category: "Carpacci, Tataki e Speciali" },

  // ==========================================
  // FUTOMAKI (4 pz)
  // ==========================================
  { id: "fut-a75", name: "A75. California", price: 5.00, category: "Futomaki (4 pz)" },
  { id: "fut-a76", name: "A76. Shake", price: 5.00, category: "Futomaki (4 pz)" },
  { id: "fut-a77", name: "A77. Maguro", price: 5.00, category: "Futomaki (4 pz)" },
  { id: "fut-a78", name: "A78. Ebiten", price: 6.00, category: "Futomaki (4 pz)" },

  // ==========================================
  // GUNKAN (2 pz)
  // ==========================================
  { id: "gun-a92", name: "A92. Salmone fuori", price: 4.00, category: "Gunkan (2 pz)" },
  { id: "gun-a93", name: "A93. Shuka wakame", price: 4.00, category: "Gunkan (2 pz)" },
  { id: "gun-a94", name: "A94. Joe", price: 4.50, category: "Gunkan (2 pz)" },
  { id: "gun-a95", name: "A95. Spicy tuna", price: 5.00, category: "Gunkan (2 pz)" },
  { id: "gun-a96", name: "A96. Spicy salmon", price: 4.50, category: "Gunkan (2 pz)" },
  { id: "gun-a97", name: "A97. Tobiko", price: 4.50, category: "Gunkan (2 pz)" },
  { id: "gun-a98", name: "A98. Ikura", price: 5.00, category: "Gunkan (2 pz)" },
  { id: "gun-a99", name: "A99. Kani", price: 4.50, category: "Gunkan (2 pz)" },
  { id: "gun-a100", name: "A100. Joe scottato", price: 4.50, category: "Gunkan (2 pz)" },
  { id: "gun-a101", name: "A101. Cetrioli", price: 4.00, category: "Gunkan (2 pz)" },

  // ==========================================
  // TEMAKI (1 pz)
  // ==========================================
  { id: "tem-a81", name: "A81. *California", price: 3.50, category: "Temaki (1 pz)" },
  { id: "tem-a82", name: "A82. Shake", price: 3.50, category: "Temaki (1 pz)" },
  { id: "tem-a83", name: "A83. Maguro", price: 4.00, category: "Temaki (1 pz)" },
  { id: "tem-a84", name: "A84. Spicy salmon", price: 3.50, category: "Temaki (1 pz)" },
  { id: "tem-a85", name: "A85. Spicy tuna", price: 4.50, category: "Temaki (1 pz)" },
  { id: "tem-a86", name: "A86. Miura", price: 4.00, category: "Temaki (1 pz)" },
  { id: "tem-a87", name: "A87. Ebiten", price: 4.00, category: "Temaki (1 pz)" },
  { id: "tem-a89", name: "A89. Ebi", price: 4.00, category: "Temaki (1 pz)" },
  { id: "tem-a90", name: "A90. Vegetariano", price: 3.00, category: "Temaki (1 pz)" },

  // ==========================================
  // ONIGIRI
  // ==========================================
  { id: "oni-a16", name: "A16. Kani", price: 3.00, category: "Onigiri" },
  { id: "oni-a17", name: "A17. Shake", price: 3.00, category: "Onigiri" },
  { id: "oni-a18", name: "A18. Maguro", price: 3.00, category: "Onigiri" },
  { id: "oni-a19", name: "A19. Miura", price: 3.00, category: "Onigiri" },
  { id: "oni-a20", name: "A20. Miura tuna", price: 3.00, category: "Onigiri" },

  // ==========================================
  // DOLCI
  // ==========================================
  { id: "dol-1", name: "Dorayaki (2 pz)", price: 5.00, category: "Dolci" },
  { id: "dol-2", name: "Black biscuit", price: 5.50, category: "Dolci" },
  { id: "dol-3", name: "Cocco nocciola", price: 5.00, category: "Dolci" },
  { id: "dol-4", name: "Torta style Dubai", price: 5.50, category: "Dolci" },
  { id: "dol-5", name: "Profiterol di Romano", price: 6.00, category: "Dolci" },
  { id: "dol-6", name: "Delizia gelato Rocher", price: 5.50, category: "Dolci" },
  { id: "dol-7", name: "Tartufo vegano", price: 5.50, category: "Dolci" },
  { id: "dol-8", name: "Rocher cubano", price: 5.50, category: "Dolci" },
  { id: "dol-9", name: "Tartufo bianco", price: 5.00, category: "Dolci" },
  { id: "dol-10", name: "Tartufo cocco nocciola", price: 5.50, category: "Dolci" },
  { id: "dol-11", name: "Flute limoncello", price: 5.50, category: "Dolci" },
  { id: "dol-12", name: "Coppa tre cioccolati", price: 6.00, category: "Dolci" },
  { id: "dol-13", name: "Coppa crema al pistacchio", price: 5.50, category: "Dolci" },
  { id: "dol-14", name: "Limone ripieno", price: 5.50, category: "Dolci" },
  { id: "dol-15", name: "Mandarino ripieno", price: 5.50, category: "Dolci" },
  { id: "dol-16", name: "Cocco ripieno", price: 5.50, category: "Dolci" },
  { id: "dol-17", name: "Crema catalana in coccio", price: 6.00, category: "Dolci" },
  { id: "dol-18", name: "Mochi ice cream (3 pz)", price: 6.00, category: "Dolci" },
  { id: "dol-19", name: "Principessa", price: 5.00, category: "Dolci" },
  { id: "dol-20", name: "Cip Ciok", price: 5.00, category: "Dolci" },
  { id: "dol-21", name: "Pirata", price: 5.00, category: "Dolci" },
  { id: "dol-22", name: "Rabbit", price: 5.00, category: "Dolci" },
  { id: "dol-23", name: "Pandan", price: 5.00, category: "Dolci" },
  { id: "dol-24", name: "Gelato Peppa Pig", price: 5.50, category: "Dolci" },

  // ==========================================
  // BIBITE
  // ==========================================
  { id: "bib-1", name: "Acqua naturale 75 cl", price: 2.80, category: "Bibite" },
  { id: "bib-2", name: "Acqua frizzante 75 cl", price: 2.80, category: "Bibite" },
  { id: "bib-3", name: "Peroni 66 cl", price: 3.50, category: "Bibite" },
  { id: "bib-4", name: "Peroni 33 cl", price: 2.50, category: "Bibite" },
  { id: "bib-5", name: "Heineken 66 cl", price: 4.00, category: "Bibite" },
  { id: "bib-6", name: "Birra cinese Tsingtao", price: 4.00, category: "Bibite" },
  { id: "bib-7", name: "Birra giapponese Asahi", price: 4.50, category: "Bibite" },
  { id: "bib-8", name: "Coca Cola 33 cl", price: 2.50, category: "Bibite" },
  { id: "bib-9", name: "Cola Zero", price: 2.50, category: "Bibite" },
  { id: "bib-10", name: "Fanta", price: 2.50, category: "Bibite" },
  { id: "bib-11", name: "Thè al limone / pesca", price: 2.50, category: "Bibite" },
  { id: "bib-12", name: "Thè verde giapponese", price: 4.00, category: "Bibite" },
  { id: "bib-13", name: "Thè gelsomino", price: 4.00, category: "Bibite" },
  { id: "bib-14", name: "Amari", price: 3.00, category: "Bibite" },
  { id: "bib-15", name: "Distillati", price: 3.00, category: "Bibite" },
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Dove mangiare sushi all you can eat a Foggia?",
    answer: "Il nostro ristorante Xian Sushi si trova a Foggia, in Via Manfredonia 37. Proponiamo un'autentica formula sushi all you can eat a pranzo e a cena, con ingredienti freschissimi di alta qualità, preparazioni espresse e un ambiente premium ideale per trascorrere momenti in coppia, famiglia o con amici.",
  },
  {
    id: "faq-2",
    question: "Il ristorante ha un’area bimbi?",
    answer: "Sì, Xian Sushi dispone di un'esclusiva area bimbi attrezzata con gonfiabili e giochi sicuri, posizionata in uno spazio visibile ma insonorizzato. Questa soluzione è stata studiata per permettere ai genitori di gustare la propria cena sushi premium in assoluta serenità mentre i più piccoli si divertono in sicurezza.",
  },
  {
    id: "faq-3",
    question: "Quali sono i vostri orari di apertura?",
    answer: "Siamo aperti tutti i giorni (escluso il martedì a pranzo). Pranzo: 12:30 - 15:00. Sera: 19:30 - 24:00. Il martedì siamo aperti solo a cena dalle 19:30 alle 24:00.",
  },
  {
    id: "faq-4",
    question: "È possibile ordinare sushi da asporto o a domicilio?",
    answer: "Certamente! Dalla sezione 'Take Away & Delivery' del nostro sito web puoi consultare tutto il nostro nuovo menù, aggiungere le tue specialità preferite al carrello e completare la richiesta sia per il ritiro in sede che per la consegna a domicilio a Foggia e comuni limitrofi.",
  },
  {
    id: "faq-5",
    question: "Come posso contattarvi o prenotare un tavolo?",
    answer: "Puoi prenotare in pochi secondi direttamente dal nostro sito web oppure contattarci telefonicamente al Cellulare 377 829 7346, al Telefono Fisso 0881 778389 o via WhatsApp al 377 829 7346.",
  },
  {
    id: "faq-6",
    question: "Quali sono i prezzi del menu all you can eat?",
    answer: "La formula All You Can Eat costa €17,90 a pranzo e €24,90 a cena per gli adulti. Per i bambini (con altezza inferiore a 120 cm) il costo è di €8,90 a pranzo e €11,90 a cena (bambini da 120 cm in su prezzo intero). Il martedì a pranzo siamo chiusi. Bevande, dolci e coperto sono esclusi.",
  },
  {
    id: "faq-7",
    question: "Il ristorante è adatto alle famiglie?",
    answer: "Assolutamente sì. Xian Sushi è il ristorante di sushi ideale per famiglie a Foggia. Grazie ai nostri tavoli spaziosi, ad un'atmosfera elegante e accogliente, e soprattutto all'area bimbi con gonfiabili e giochi, garantiamo divertimento per i bambini e relax totale per i genitori.",
  },
  {
    id: "faq-8",
    question: "Come posso raggiungere il ristorante?",
    answer: "Il ristorante è situato a Foggia in Via Manfredonia 37, zona facilmente raggiungibile e con ampio parcheggio. Nella pagina Contatti troverai la mappa interattiva per avviare la navigazione assistita con Google Maps direttamente dal tuo smartphone.",
  },
];
