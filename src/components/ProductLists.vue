<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useCart } from '@/store/cartStore.js';

const { addToCart, cartItems } = useCart();

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const searchQuery = ref(''); // for search box
const selectedCategory = ref('all'); // for category dropdown
const categories = ref([]); // to populate dropdown dynamically

onMounted(async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    products.value = response.data;

    // dynamically get categories
    const uniqueCategories = [...new Set(products.value.map(p => p.category))];
    categories.value = ['all', ...uniqueCategories];
  } catch (err) {
    error.value = 'Failed to load products';
  } finally {
    loading.value = false;
  }
});

// computed filtered products
const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'all' || p.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// check if product is already in cart
function isAdded(productId) {
  return cartItems.value.some(item => item.id === productId);
}
</script>

<template>
  <div class="products-container">
    <h1>Product Listing</h1>
    <div class="product-filters">
      <input id="search" name="search" type="text" v-model="searchQuery" placeholder="Search products..." />
      <select id="category" name="category"  v-model="selectedCategory" v-if="categories.length">
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
    <!-- Product List -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <span class="tag">{{ product.category }}</span>
        <img :src="product.image" :alt="product.title" />
        <div class="item-info">
          <h2>{{ product.title }}</h2>
          <p><strong>Price:</strong> ${{ product.price }}</p>
        </div>
        <div class="cart-cta">
          <button
            class="btn btn-green"
            :disabled="isAdded(product.id)"
            @click="addToCart(product)"
          >
            {{ isAdded(product.id) ? 'Added' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products-container {
  padding: 40px 20px;
  .product-filters {
    margin: 25px 0;
    display: flex;
    gap: 20px;
    input, select {
      padding: 8px;
      width: 100%;
      max-width: 300px;
      outline: none;
      border: 1px solid var(--text-color);
      background: transparent;
      color: var(--text-color);
      text-transform: capitalize;
      &::placeholder {
        color: var(--text-color);
      }
    }
  }
  .product-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    .product-card {
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--gray-dark);
      padding: 20px;
      cursor: pointer;
      transition: all 0.5s ease;
      &:hover {
        box-shadow: 0px 0px 15px 0px var(--shadow-color);
      }
      .tag {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        text-transform: capitalize;
        background-color: var(--secondary-color);
        color: var(--text-color);
      }
      img {
        width: 100%;
        height: 300px;
        object-fit: contain;
      }
      h2 {
        font-size: 21px;
        font-weight: 600;
        margin: 15px 0;
      }
      .item-info {
        margin-bottom: 8px;
      }
      .cart-cta {
        text-align: center;
        margin-top: auto;
        .btn {
          color: var(--black);
        }
      }
    }
  }
}
</style>