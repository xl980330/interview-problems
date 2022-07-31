<script lang="ts" setup>
import { reactive } from 'vue';
import { Org, ChangeOrgForm } from '@/util/type';
import useData from '@/store/index'
import { storeToRefs } from 'pinia';

let storeData = useData();
let { members, orgs } = storeToRefs(storeData);

interface Props {
  show: boolean
  title: string
  type: string
  row: Org | null
}
const props = defineProps<Props>();
const emits = defineEmits(['onCancel', 'onConfirm']);
const refShow = reactive(props);

const form = reactive<ChangeOrgForm>({
  parent: orgs.value.find(v => v.id === refShow.row?.parent)?.id || '',
  name: refShow.row?.name || '',
  members: refShow.row?.members || [],
})

const cancel = ():void => {
  emits('onCancel');
}

const confirm = ():void => {
  emits('onConfirm', form);
}

</script>

<template>
  <el-dialog v-model="refShow.show" :title="refShow.title" width="545px" @close="cancel">
    <main>
      <el-form :model="form" label-width="100px">
        <el-form-item label="父级：">
          <el-select v-model="form.parent" placeholder="请选择父级名称" clearable class="w-80">
            <el-option v-for="item of orgs" :key="item.id" :disabled="form.name === item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="名称：">
          <el-select v-model="form.name" placeholder="请选择名称" clearable class="w-80">
            <el-option v-for="item of orgs" :key="item.id" :disabled="form.parent === item.name" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="成员：">
          <el-select v-model="form.members" placeholder="请选择成员" class="w-80" multiple collapse-tags collapse-tags-tooltip>
            <el-option v-for="item of members" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </main>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
