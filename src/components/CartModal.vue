<script setup>
import { useCart } from '@/store/cartStore.js';

const emit = defineEmits(['close']);
const { cartItems, totalPrice, removeFromCart } = useCart();
</script>

<template>
  <div class="cart-overlay">
    <div class="cart-modal">
      <div class="cart-header">
        <span @click="$emit('close')" class="back-btn">← Go Back</span>
        <h2>My Cart</h2>
      </div>

      <div v-if="cartItems.length === 0" class="empty">
        <p>Your cart is empty.</p>
      </div>

      <table v-else class="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price ($)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.price.toFixed(2) }}</td>
            <td><button @click="removeFromCart(item.id)" class="btn btn-red">Remove</button></td>
          </tr>
        </tbody>
      </table>

      <div class="cart-total">
        <p><strong>Total:</strong> ${{ totalPrice.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.cart-modal {
  background: #fff;
  width: 90%;
  height: 90%;
  max-width: 900px;
  border-radius: 10px;
  padding: 20px;
  .cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .back-btn {
      cursor: pointer;
      color: #007bff;
    }
  }
  .cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
  }
  .cart-total {
    margin-top: 20px;
    text-align: right;
    font-size: 18px;
  }
  .empty {
    text-align: center;
    margin-top: 40px;
  }
}
</style>
