import { ref, type Ref, onMounted, onUnmounted } from "vue";

export function checkPosition() {
  const position: Ref<number> = ref(0);
  const x: Ref<number> = ref(0);
  const y: Ref<number> = ref(0);

  function handleScroll() {
    position.value = window.scrollY;
  }
  function update(event: any) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  onMounted(() => window.addEventListener("scroll", handleScroll));
  onUnmounted(() => window.removeEventListener("scroll", handleScroll));

  return { position, x, y };
}
