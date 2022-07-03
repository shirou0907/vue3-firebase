<template>
  <div>{{ test }}</div>
  {{props}}
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";

interface Props {
  title: string;
  id: number;
}

const props = defineProps<Props>();

const test: Ref<string> = ref("test");
</script>
<style scoped></style>
