<template>
    <div class="sticky top-0 z-40">
        <div class="w-full h-20 px-6 bg-gray-100 border-b flex items-center justify-between">

            <!-- left navbar -->
            <div class="flex">
                <!-- mobile hamburger -->
                <div class="inline-block lg:hidden flex items-center mr-4">
                    <button class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger" @click="toggleSidebar()">
                        <svg class="h-5 w-5" v-bind:style="{ fill: 'black' }" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>

                <!-- Breadcrumb -->
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
                </el-breadcrumb>

            </div>

            <!-- right navbar -->
            <div class="flex items-center relative">
             <el-button type="danger" @click="onLogout">
                 <font-awesome-icon icon="arrow-right-from-bracket" size="xl"></font-awesome-icon>
                 <span>Logout</span>
             </el-button>
            </div>

        </div>

    </div>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import {ref} from 'vue';
import {useStores} from '../store/store';
import api from "../libraries/api";
import EnumApiErrorCode from "../models/enums/enumApiErrorCode";
import notificationHelper from "../libraries/elementUiHelpers/notificationHelper";
import EnumMessageType from "../models/enums/enumMessageType";
import {useRouter} from "vue-router";

const router = useRouter();
    const stores = useStores();
    const dropDownOpen = ref('');
    const toggleSidebar = async () => {
        await stores.toggleSideBar();
    };
const onLogout = async () => {
    const response = await api.logout();
    if (response.ErrorCode === EnumApiErrorCode.Success) {
        notificationHelper.notification(('Logout Success'), EnumMessageType.Success);
        localStorage.removeItem('store');
        window.location.href = '/';
    } else {
        notificationHelper.notification(('Something went wrong'), EnumMessageType.Warning);
    }
};

</script>
