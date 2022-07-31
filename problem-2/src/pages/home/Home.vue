<script lang="ts" setup>
import useData from '@/store/index'
import { ElMessage, ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
import { ref } from "vue";
import { Org, AlertForm, SubmitForm, ChangeOrgForm } from '@/util/type';
import XAlert from '@/pages/componment/Alert.vue';
import XChangeOrg from '@/pages/componment/ChangeOrg.vue';
import { noRepeat } from '@/util/tool';

let storeData = useData();
let { members, orgs } = storeToRefs(storeData);

console.log("%cmembers", "color: red", members.value);
console.log("%corgs", "color: red;", orgs.value);

let lock = false;

let alertData = ref<AlertForm>({
  show: false,
  orgShow: false,
  type: 'add',
  title: '添加',
  row: null,
  index: null
});

// 新增机构
const addOrg = ():void => {
  alertData.value = {
    show: true,
    orgShow: false,
    title: '添加机构',
    type: 'add',
    row: null,
    index: null
  }
}

// 机构变更
const changeOrg = (row: Org, index: number):void => {
  alertData.value = {
    show: false,
    orgShow: true,
    title: '机构变更',
    type: 'change',
    row,
    index,
  }
}

// 编辑机构
const editOrg = (row: Org, index: number):void => {
  alertData.value = {
    show: true,
    orgShow: false,
    type: 'edit',
    title: '编辑机构',
    row,
    index,
  }
}

// 删除机构
const removeOrg = (index: number):void => {
  orgs.value.splice(index, 1);
}

// 提交 新增或修改机构功能
const confirm = (form: SubmitForm):unknown => {
  if (lock) {
    ElMessage({
      message: '请勿重复点击',
      type: 'warning',
    })
    return
  }

  lock = true;
  if (!form.name) {
    ElMessage({
      message: '请输入机构名称',
      type: 'warning',
    })
    return null;
  }

  const obj = {
    members: form.selectParentData.map(v => v.name),
    id: form.name,
    name: form.name,
    parent: form.parentId,
    representation: form.representation,
    type: 'organization'
  }

  if (!orgs.value.some(v => form.parentId === v.id)) {
    orgs.value.push({
      members: form.selectParentData.map(v => v.name),
      id: form.parentId,
      name: form.parentId,
      parent: null,
      representation: form.representation,
      type: 'organization'
    });
  }

  if (alertData.value.index !== null) {
    orgs.value[alertData.value.index!] = obj;
  } else {
    orgs.value.push(obj);
  }

  members.value = noRepeat(members.value.concat(form.selectParentData), 'id');
  
  setTimeout(() => {
    lock = false;
    alertData.value.show = false;
    ElNotification({
      title: '成功',
      message: '保存信息成功',
      type: 'success',
    })
  }, 200);
}

// 机构修改提交
const confirmOrg = (form: ChangeOrgForm):void => {
  console.log(form);
  try {
    // 先找对应父机构和子机构都相同的
    const findIdx = orgs.value.findIndex(v => v.id === form.name && (v.parent === null ? '' : v.parent) === form.parent);

    // 去掉数组里面相同的
    orgs.value.forEach(v => {
      v.members = v.members?.filter(x => !form.members.some(y => x === y))
    });

    if (findIdx !== -1) {
      // 如果为空则置为空
      if (form.members.length) {
        orgs.value[findIdx].members = form.members;
      } else {
        orgs.value[findIdx].members = [];
      }
    } else {
      orgs.value.push({
        ...form,
        id: form.name,
        representation: "",
        type: "organization"
      })
    }


    alertData.value.orgShow = false;
    ElNotification({
      title: '成功',
      message: '机构变更成功',
      type: 'success',
    })
  } catch (err) {
    console.log(err);
  }
}

</script>

<template>
  <el-main>
    <el-button @click="addOrg" type="primary">新增机构</el-button>

    <el-scrollbar class="mt-2">
      <el-table :data="orgs">
        <el-table-column prop="parent" label="父级" align="center" width="120">
          <template #default="scope">
            <span>{{ scope.row.parent ? scope.row.parent : '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="名称" align="center" width="120" />
        <el-table-column prop="members" label="成员" align="center" />
        <el-table-column prop="representation" label="备注" align="center" width="180" />
        <el-table-column fixed="right" label="操作" width="240" align="center">
          <template #default="scope">
            <el-button type="primary" @click="editOrg(scope.row, scope.$index)">编辑</el-button>
            <el-button type="info" @click="changeOrg(scope.row, scope.$index)">机构变更</el-button>
            <el-button type="danger" @click="removeOrg(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    
    <XAlert v-if="alertData.show" :show="alertData.show" :type="alertData.type" :title="alertData.title" :row="alertData.row" @on-cancel="alertData.show = false" @on-confirm="confirm"></XAlert>
    <XChangeOrg v-if="alertData.orgShow" :show="alertData.orgShow" :type="alertData.type" :title="alertData.title" :row="alertData.row" @on-cancel="alertData.orgShow = false" @on-confirm="confirmOrg"></XChangeOrg>
  </el-main>
</template>
