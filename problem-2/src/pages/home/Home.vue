<script lang="ts" setup>
import { ref, onMounted } from "vue";

const main = ref('');
const dd = ref('');
let transfrom = ref(0);
let countData: Array<number> = [];
for (let i = 1; i < 200; i++) {
  countData.push(i);
}

let sliceData: any = ref([]);
let start: number = 0;
let end: number = 0;
let viewDataNumber: number = 10;
let itemHeight: number = 41;

onMounted(() => {
  itemHeight = 41;
  viewDataNumber = Math.ceil(main.value.clientHeight / itemHeight);
  start = 0;
  end = start + viewDataNumber;
  sliceData.value = countData.slice(start, end);
})

const scrollDl = () => {
  const scrollTop: number = Math.floor(main.value.scrollTop / itemHeight);
  transfrom.value = scrollTop * itemHeight;
  start = scrollTop;
  end = start + viewDataNumber;
  sliceData.value = countData.slice(start, end);
}

// let a = ref(1);
// const b: string = "string";
// function add() {
//   a.value++;
// }
</script>

<template>
  <main class="main" ref="main" :style="`height: ${ viewDataNumber * itemHeight }px; overflow: auto`" @scroll="scrollDl">
    <dl class="dl" :style="`height: ${ countData.length * itemHeight }px; transform: translateY(${ transfrom }px)`">
      <dd v-for="(item, index) of sliceData" :key="index" class="dd" p="y-2 x-4" border="1px solid sky-600">{{ item }}</dd>
    </dl>
  </main>
  <!-- <el-button plain type="primary" @click="add">按钮</el-button>
  <main flex="~ row nowrap" p="y-2 x-4">
    <section flex="~ 1" h-200 bg-blue-200>{{ a }}</section>
    <section flex="~ 1" h-200 bg-gray-200>{{ b }}</section>
    <section flex="1" bg-red-100></section>
  </main> -->
</template>
