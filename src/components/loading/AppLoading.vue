<template>
  <div class="app-loading">
    <img src="@/assets/img/app.gif" alt="" />
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.app-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 9999;
}

.app-loading img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
