import { ref, onMounted, onUnmounted } from "vue";

export function checkPosition() {
  const position = ref(0);
  const x = ref(0);
  const y = ref(0);

  function handleScroll() {
    position.value = window.scrollY;
  }
  function update(event) {
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
