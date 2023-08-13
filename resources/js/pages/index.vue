<template>
    <div >
     <p>Home page</p>
     <p>1sdfsdfsdf</p>
     <p>1sdfsdfsdf</p>
     <p>1sdfsdfsdf</p>
     <p>1sdfsdfsdf</p>
     <p>1sdfsdfsdf</p>
     <p>1sdfsdfsdf</p>
     <p>1sdfsdfsdf</p>
    </div>
</template>
<script setup lang="ts">
import {useStores} from "../store/store";
import {storeToRefs} from "pinia";
const stores = useStores();
const { auth } = storeToRefs(stores);
</script>
