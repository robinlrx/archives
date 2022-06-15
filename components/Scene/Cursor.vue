<template>
  <div class="cursor">
    <span class="cursor-circle"></span>
  </div>
</template>

<script>
export default { name: "Cross" }
</script>

<style>
.cursor {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 3;
  pointer-events: none;
  transition: opacity 0.5s ease;
  opacity: 0;
}

.cursor-circle {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  transition: all 0.4s ease;
  background-color: #ffffff;
  border: 1px solid #000000b5;


}

.cursor-circle-focus {
  height: 25px;
  width: 25px;
  background-color: transparent;
  border: 3px solid white;
  transition: all 0.4s ease;
}
</style>