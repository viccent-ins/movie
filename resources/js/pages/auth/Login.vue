<template>
    <div class="container mx-auto p-5 mt-40">
        <div class="flex justify-center">
<!--            <img class="shadow-xl rounded-full" src="../../public/images/logo.png" width="100" alt="">-->
        </div>
        <div class="flex justify-center">
          <div class="shadow-lg rounded-xl w-full md:w-[600px]">
        <el-form
            ref="ruleFormRef"
            :model="loginRequest"
            label-position="top"
            :rules="loginRule"
            status-icon
            :disabled="isProcessing"
            class="p-10"
        >
            <el-form-item label="Phone" prop="phone">
                <el-input v-model="loginRequest.phone" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="loginRequest.password" type="password" autocomplete="off" @keyup.enter="onLogin(ruleFormRef)"/>
            </el-form-item>
            <el-button type='primary' class="w-full" @click="onLogin(ruleFormRef)" :loading="isProcessing"
            >Login</el-button
            >
        </el-form>
    </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useLogin from "../../composables/auth/useLogin";
const {
    loginRule,
    onLogin,
    ruleFormRef,
    loginRequest,
    isProcessing,
} = useLogin();
</script>

<style scoped>

</style>
