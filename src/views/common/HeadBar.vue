<template>
  <div class="head-bar">
    <div class="test">
      这是在测试
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadBar"
}
</script>

<style lang="scss">

.head-bar {
  background: blue;
  width: 100%;
  height: 100px;
}
.test {
  font-size: var(--font-size-large-x);
  color: var(--color1);
  background: var(--bg1);
}
</style>