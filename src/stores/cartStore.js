import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1, variant = null) => {
                const items = get().items;
                const existingItem = items.find(
                    item => item.product.id === product.id && 
                    (!variant || item.variant?.id === variant?.id)
                );

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item === existingItem
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { product, quantity, variant }] });
                }
            },
            removeItem: (productId, variantId = null) => {
                set({
                    items: get().items.filter(
                        item => item.product.id !== productId || 
                        (variantId && item.variant?.id !== variantId)
                    ),
                });
            },
            updateQuantity: (productId, quantity, variantId = null) => {
                set({
                    items: get().items.map(item =>
                        (item.product.id === productId && 
                        (!variantId || item.variant?.id === variantId))
                            ? { ...item, quantity }
                            : item
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

export default useCartStore;