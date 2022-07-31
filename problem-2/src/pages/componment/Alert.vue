<script lang="ts" setup>
import { reactive } from 'vue';
import { Org, Members, SubmitForm } from '@/util/type';
import { ElMessage } from 'element-plus';
import useData from '@/store/index'
import { storeToRefs } from 'pinia';

let storeData = useData();
let { members, orgs } = storeToRefs(storeData);

interface Props {
  show?: boolean
  title: string
  type: string
  row: Org | null
}
const props = defineProps<Props>();
const emits = defineEmits(['onCancel', 'onConfirm']);


const refShow = reactive(props);

const form = reactive<SubmitForm>({
  parentId: orgs.value.find(v => v.id === refShow.row?.parent)?.id || '',
  name: refShow.row?.name || '',
  selectParentData: members.value.filter(v => refShow.row?.members?.find(z => v.id === z)) || [],
  representation: refShow.row?.representation || ''
})

const cancel = ():void => {
  emits('onCancel');
}

const confirm = ():void => {
  emits('onConfirm', form);
}


// 添加成员
const onAddItem = ():unknown => {
  if (form.selectParentData.some(v => !v.age && v.isEdit)) {
    ElMessage({
      message: '请先保存正在编辑列表项',
      type: 'warning',
    })

    return null;
  }


  form.selectParentData.push({
    age: undefined,
    name: '',
    status: "inactivated",
    id: '',
    isEdit: true
  });
}

// 删除成员
const deleteRow = (row: Members, index: number):void => {
  form.selectParentData.splice(index, 1);
  console.log(row, index, '删除');
}

// 保存成员
const saveRow = (row: Members, index: number):unknown => {
  if (ruleForm(row)) return null;
  form.selectParentData[index].isEdit = false;
  form.selectParentData[index].id = row.name;
  console.log(row, index, form, '保存');
}

// 编辑成员
const editRow = (row: Members, index: number):void => {
  form.selectParentData[index].isEdit = true;
  console.log(row, index, '删除');
}

// form验证
const ruleForm = (row: Members):unknown => {
  if (!row.name) {
    ElMessage({
      message: '请输入名称',
      type: 'warning',
    })

    return true;
  }

  if (!row.age) {
    ElMessage({
      message: '年龄最少大于0',
      type: 'warning',
    })

    return true;
  }

  if (row.status === 'inactivated') {
    ElMessage({
      message: '友情提示：您添加或修改的成员未激活',
      type: 'success',
    })
  }
}


</script>

<template>
  <el-dialog v-model="refShow.show" :title="refShow.title" width="70%" @close="cancel">
    <main>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="父级：">
          <el-select v-model="form.parentId" filterable allow-create default-first-option :reserve-keyword="false" placeholder="请选择父级名称" clearable class="w-50">
            <el-option v-for="item of orgs" :key="item.id" :disabled="refShow.row?.id === item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="名称：">
          <el-select v-model="form.name" placeholder="请选择名称" clearable filterable allow-create default-first-option :reserve-keyword="false" class="w-50">
            <el-option v-for="item of orgs" :key="item.id" :disabled="form.parentId === item.name" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="备注：" class="w-62">
          <el-input v-model="form.representation" placeholder="请输入备注" clearable></el-input>
        </el-form-item>
      </el-form>


      <el-table :data="form.selectParentData" max-height="250">
        <el-table-column prop="name" label="名称" align="center">
          <template #default="scope">
            <span v-show="!scope.row.isEdit">{{ scope.row.name }}</span>
            <el-input v-show="scope.row.isEdit" v-model="scope.row.name" placeholder="请输入名称" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
          <template #default="scope">
            <span v-show="!scope.row.isEdit">{{ scope.row.age }}</span>
            <el-input-number v-show="scope.row.isEdit" v-model="scope.row.age" :min="1" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否激活" align="center">
          <template #default="scope">
            <span v-show="!scope.row.isEdit">{{ scope.row.status === 'activated' ? '已激活' : '未激活' }}</span>
            <el-switch v-model="scope.row.status" v-show="scope.row.isEdit" active-value="activated" inactive-value="inactivated" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button @click="editRow(scope.row, scope.$index)" link type="primary" size="small">编辑</el-button>
            <el-button @click="saveRow(scope.row, scope.$index)" link type="success" size="small">保存</el-button>
            <el-button @click="deleteRow(scope.row, scope.$index)" link type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 100%" @click="onAddItem">添加</el-button>
    </main>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
