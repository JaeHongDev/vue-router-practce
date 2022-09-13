<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
    <div>{{ $route.params.id }}</div>
    <div>{{ userData }}</div>
    <div>
      <button @click="click">1234</button>
    </div>
  </div>

</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router/composables';
import Vue, { ref, watch } from 'vue';

export default Vue.extend({
  name: 'CUser',
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const userData = ref();
    let i = 1;
    watch(() => route.params.id, async (newId) => {
      userData.value = 1234;
    });
    const click = () => {
      i += 1;
      router.push(`/users/${i}`);
    };
    return {
      userData,
      click,
    };
  },
});
</script>

<style scoped>

</style>
