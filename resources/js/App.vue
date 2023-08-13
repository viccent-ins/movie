<template>
    <div>
        <AppLayout/>
    </div>
</template>
<script setup lang="ts">
import AppLayout from "./layouts/AppLayout.vue";
</script>

<style>


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
