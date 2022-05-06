<template>
  <div class="focus">
    <img src="images/vignette.png" />
  </div>
</template>

<script>
export default { name: 'Focus' }
</script>

<style>
.focus {
  position: absolute;
  z-index: 5;
  top: 0;
  width: 100vw;
  height: 100vh;
  margin: 0 !important;
  padding: 0 !important;
  transition: 0.55s opacity ease-out;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
}
</style>