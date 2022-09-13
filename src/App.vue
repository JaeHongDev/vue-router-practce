<template>
  <div id="app">
    <nav v-if="isAuth">
      <router-link to="/auth/logout">로그아웃</router-link> |
      <router-link to="/xid_c/admin/manage">1234</router-link>
    </nav>
    <nav v-else>
      <router-link to="/auth">로그인</router-link>
    </nav>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue, { ref, watch } from 'vue';
import { useAuth } from '@/router';
import { useRoute } from 'vue-router/composables';

export default Vue.extend({
  name: 'App',
  setup: () => {
    const auth = ref(useAuth());
    const route = useRoute();

    watch(() => route.path, () => {
      auth.value = useAuth();
    });
    const login = () => {
      window.localStorage.setItem('login', 'ok');
    };
    return { isAuth: auth, login };
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
