import { ref, computed } from 'vue';

const cartItems = ref([]);

export function useCart() {
  const addToCart = (product) => {
    if (!cartItems.value.find(item => item.id === product.id)) {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
  };

  const totalItems = computed(() => cartItems.value.length);

  const totalPrice = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    totalItems,
    totalPrice
  };
}
