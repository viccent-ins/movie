<template>
    <div class="leading-normal tracking-normal" id="main-body">
        <div class="flex flex-wrap">
            <SideBar />
            <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" :class="toggleBar ? 'overlay' : ''" id="main-content" >
                <NavBar />
                <div class="p-6 bg-gray-100" @click="onCloseToggle">
                    <router-view />
                </div>
                <FooterBar />
            </div>
        </div>
    </div>
    <slot/>
</template>

<script setup lang="ts">
import NavBar from "./NavBar.vue";
import FooterBar from "./FooterBar.vue";
import SideBar from "./SideBar.vue";

import { useStores } from '../store/store';
import { storeToRefs } from "pinia";
const stores = useStores();
const { toggleBar } = storeToRefs(stores);
const onCloseToggle = () => {
    if(toggleBar.value) toggleBar.value = false
}
</script>
