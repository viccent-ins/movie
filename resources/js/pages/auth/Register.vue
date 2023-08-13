<template>
    <div class="container mx-auto p-5 mt-40">
        <div class="flex justify-center">
            <img class="shadow rounded-full w-20 md:w-28" src="../../public/images/logo.png" alt="">
        </div>
        <div class="flex justify-center">
            <div class="shadow-lg rounded-xl w-full md:w-[600px]">
                <el-form
                    ref="ruleFormRef"
                    :model="registerRequest"
                    label-position="top"
                    :rules="registerRule"
                    status-icon
                    :disabled="isProcessing"
                    class="p-10"
                >
                    <el-form-item label="Name" prop="name">
                        <el-input v-model="registerRequest.name" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Email" prop="Email">
                        <el-input v-model="registerRequest.email" type="email" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input v-model="registerRequest.password" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="Password Confirmation" prop="password_confirmation">
                        <el-input
                            v-model="registerRequest.password_confirmation"
                            type="password"
                            autocomplete="off"
                        />
                    </el-form-item>
                    <el-form-item class="float-right">
                        <el-button type="primary" @click="onRegister(ruleFormRef)" :loading="isProcessing"
                        >Submit</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const {
    registerRule,
    onRegister,
    ruleFormRef,
    registerRequest,
    isProcessing,
} = useRegister();
</script>

<style scoped>

</style>
