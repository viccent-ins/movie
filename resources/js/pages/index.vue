<template>
    <div >
        <div class="flex justify-end mb-5">
            <el-button type="primary" @click="dialog = !dialog">
                <font-awesome-icon icon="plus"/> &nbsp; Add</el-button>
        </div>
        <el-table :data="filterSearchPagination" style="width: 100%" v-loading="isLoading">
            <el-table-column label="image" >
                <template #default="prop">
                    <img :src="apiServer + prop.row.file" width="60" alt="loading...">
                </template>
            </el-table-column>
            <el-table-column label="level" prop="level" />
            <el-table-column label="amount" prop="amount" />
            <el-table-column label="percentage" prop="percentage" />
            <el-table-column label="return" prop="return" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="dataPagination.Search"  placeholder="Type to search" />
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
                :total="dataPagination.QuestCorridors.length"/>
            <div class="md:text-2xl text-lg">
<!--                សរុប៖ &nbsp;<span class="danger">{{ dataPagination.Total }} B</span>-->
            </div>
        </div>
        <el-dialog
            v-model="dialog"
            title="Tips"
            width="30%"
            :before-close="handleClose"
        >
            <el-form
                :label-position="'top'"
                label-width="100px"
                :model="questForm"
                :rules="formRule"
                ref="ruleFormRef"
            >
                <el-form-item :label="$t('Level')" prop="level">
                    <el-input v-model="questForm.level"/>
                </el-form-item>
                <el-form-item :label="$t('amount')" prop="amount">
                    <el-input v-model="questForm.amount"/>
                </el-form-item>
                <el-form-item :label="$t('Percentage')" prop="percentage">
                    <el-input v-model="questForm.percentage"/>
                </el-form-item>
                <el-form-item :label="$t('Return')" prop="return">
                    <el-input v-model="questForm.return"/>
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
                <el-button type="primary" :loading="isLoading" @click="onSubmit(ruleFormRef)">
                  Save
                </el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import useHome from "../composables/home/useHome";
const {
    isLoading,
    apiServer,
    onEdit,
    onDelete,
    dialog,
    handleClose,
    questForm,
    formRule,
    onSubmit,
    ruleFormRef,
    upload,
    handleChange,
    handleExceed,
    handleRemove,
    filterSearchPagination,
    dataPagination,
} = useHome();
</script>
