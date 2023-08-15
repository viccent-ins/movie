<template>
    <div >
        <div class="flex justify-end mb-5">
            <el-button type="primary" @click="dialog = !dialog">
                <font-awesome-icon icon="plus"/> &nbsp; Add</el-button>
        </div>
        <el-table :data="filterSearchPagination" style="width: 100%" v-loading="isLoading">
            <el-table-column label="image" >
                <template #default="prop">
                    <img :src="apiServer + prop.row.member_image" width="60" alt="loading...">
                </template>
            </el-table-column>
            <el-table-column label="Member Id" prop="displayMemberId" />
            <el-table-column label="Member Profit" prop="member_profit" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="dataPagination.Search" type="number" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button type="warning" size="small" @click="onEdit(scope.row)"
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
        <div class="mt-5 flex gap-5 justify-between items-center">
            <el-pagination
                v-model:current-page="dataPagination.CurrentPage"
                v-model:page-size="dataPagination.PageSize"
                :page-sizes="[10, 25, 50, 75, 100]"
                small="small"
                layout="sizes, prev, pager, next"
                :total="dataPagination.ActiveMembers.length"/>
            <div class="md:text-2xl text-lg">
                <!--                សរុប៖ &nbsp;<span class="danger">{{ dataPagination.Total }} B</span>-->
            </div>
        </div>
        <el-dialog
            v-model="dialog"
            title="Active Member"
            width="30%"
            :before-close="handleClose"
        >
            <el-form
                :label-position="'top'"
                label-width="100px"
                :model="activeForm"
                :rules="formRule"
                ref="ruleFormRef"
            >
                <el-form-item label="Active Member" prop="member_id">
                    <el-input v-model="activeForm.member_id"/>
                </el-form-item>
                <el-form-item label="Member Profit" prop="member_profit">
                    <el-input v-model="activeForm.member_profit"/>
                </el-form-item>
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
        <el-button type="primary" @click="onSubmit(ruleFormRef)" :loading="isLoading">
          Save
        </el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import useActiveMember from "../composables/home/useActiveMember";
const {
    filterSearchPagination,
    activeForm,
    isLoading,
    apiServer,
    onEdit,
    onDelete,
    dialog,
    handleClose,
    formRule,
    onSubmit,
    ruleFormRef,
    upload,
    handleChange,
    handleExceed,
    handleRemove,
    dataPagination,
} = useActiveMember();
</script>
