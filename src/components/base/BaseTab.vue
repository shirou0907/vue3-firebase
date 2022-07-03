<template>
  {{ tabs }}
</template>
<script lang="ts" setup>
import { ref, PropType } from "vue";
import type { Ref } from "vue";

interface Tabs {
  title: string;
  id: number;
}

defineProps({
  tabs: Array as PropType<Tabs[]>,
});

const test: Ref<string> = ref("test");
</script>
<style scoped></style>
