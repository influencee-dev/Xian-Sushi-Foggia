import { CartItem } from "../types";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  cartTotal: number;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  cartTotal,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-900 shadow-2xl flex flex-col h-full animate-slide-over">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-900 bg-neutral-950 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Il Tuo Carrello
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-850 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors"
              aria-label="Chiudi Carrello"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 space-y-5 bg-neutral-950">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-neutral-600" />
                </div>
                <h3 className="text-white font-semibold text-lg">Il carrello è vuoto</h3>
                <p className="text-neutral-500 text-xs mt-2 max-w-[200px] mx-auto">
                  Aggiungi le deliziose specialità di sushi Xian dal nostro menu d'asporto!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-neutral-900 border border-neutral-850/60 rounded-xl transition-all duration-200 hover:border-neutral-800"
                >
                  {/* Product Info & Controls */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-sans font-semibold text-white tracking-tight line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-neutral-500 hover:text-red-500 transition-colors p-1"
                          title="Rimuovi prodotto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                        {item.product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-900">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded disabled:opacity-30 transition-all"
                          aria-label="Riduci quantità"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs text-white font-mono font-bold px-1.5 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded transition-all"
                          aria-label="Aumenta quantità"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal Item Price */}
                      <span className="text-sm font-bold text-amber-500 font-mono">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer of Drawer (Subtotal & Proceed to checkout) */}
          {cart.length > 0 && (
            <div className="border-t border-neutral-900 px-6 py-6 bg-neutral-950 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-400 font-sans">Subtotale:</span>
                <span className="text-neutral-300 font-mono">€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-neutral-900 pt-4 text-base">
                <span className="text-white font-sans font-semibold">Totale Ordine:</span>
                <span className="text-xl font-bold text-amber-500 font-mono">
                  €{cartTotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 text-center">
                Spedizione o ritiro configurabili al passaggio successivo.
              </p>

              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-amber-500/15 hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5"
              >
                Procedi alla Cassa
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
