<template>
    <div >
        <div class="flex justify-end mb-5">
            <el-button type="primary" @click="dialog = !dialog">
                <font-awesome-icon icon="plus"/> &nbsp; Add</el-button>
        </div>
        <el-table :data="filterSearchPagination" style="width: 100%" v-loading="isLoading">
            <el-table-column label="image" >
                <template #default="prop">
                    <img :src="apiServer + prop.row.cooperate_file" width="60" alt="loading...">
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #header>
                    <!--                    <el-input v-model="search" size="small" placeholder="Type to search" />-->
                </template>
                <template #default="scope">
                    <el-button size="small" @click="onEdit(scope.row)"
                    >Edit</el-button
                    >
                    <el-button
                        size="small"
                        type="danger"
                        @click="onDelete(scope.row.id)"
                    >Delete</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            v-model="dialog"
            title="Tips"
            width="30%"
            :before-close="handleClose"
        >
            <el-form
                :label-position="'top'"
                label-width="100px"
                :model="cooperateForm"
                :rules="formRule"
                ref="ruleFormRef"
            >
                <el-form-item>
                    <el-upload
                        ref="upload"
                        action="#"
                        :auto-upload="false"
                        :on-exceed="handleExceed"
                        :on-remove="handleRemove"
                        :on-change="handleChange"
                        list-type="picture-card"
                        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                        :limit="1"
                    >
                        <el-icon><font-awesome-icon icon="plus" /></el-icon>
                    </el-upload>
                </el-form-item>

            </el-form>

            <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onSubmit(ruleFormRef)">
          Save
        </el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import useCooperatedFilm from "../composables/home/useCooperatedFilm";
const {
    filterSearchPagination,
    isLoading,
    apiServer,
    onEdit,
    onDelete,
    dialog,
    handleClose,
    cooperateForm,
    formRule,
    onSubmit,
    ruleFormRef,
    upload,
    handleChange,
    handleExceed,
    handleRemove,
} = useCooperatedFilm();
</script>
