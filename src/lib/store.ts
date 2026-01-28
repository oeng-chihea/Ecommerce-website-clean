import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ShippingAddress, Order } from './data';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  setCartItemQuantity: (product: Product, size: string | undefined, quantity: number) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // UI State
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Checkout
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, size, quantity = 1) => {
        const cart = get().cart;
        const existingItem = cart.find(
          (item) =>
            item.id === product.id &&
            item.selectedSize === size
        );

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id &&
              item.selectedSize === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity, selectedSize: size }],
          });
        }
        set({ isCartOpen: true });
      },
      setCartItemQuantity: (product, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(product.id, size);
          return;
        }
        const cart = get().cart;
        const existingItem = cart.find(
          (item) =>
            item.id === product.id &&
            item.selectedSize === size
        );

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id &&
              item.selectedSize === size
                ? { ...item, quantity }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity, selectedSize: size }],
          });
        }
        set({ isCartOpen: true });
      },
      removeFromCart: (productId, size) => {
        set({
          cart: get().cart.filter(
            (item) =>
              !(
                item.id === productId &&
                (size ? item.selectedSize === size : true)
              )
          ),
        });
      },
      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId &&
            item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ wishlist: [...get().wishlist, product] });
        }
      },
      removeFromWishlist: (productId) => {
        set({
          wishlist: get().wishlist.filter((item) => item.id !== productId),
        });
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId);
      },

      // Orders
      orders: [],
      addOrder: (order) => {
        set({ orders: [...get().orders, order] });
      },

      // UI State
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      // Checkout
      shippingAddress: null,
      setShippingAddress: (address) => set({ shippingAddress: address }),
    }),
    {
      name: 'weison-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
        shippingAddress: state.shippingAddress,
      }),
    }
  )
);
