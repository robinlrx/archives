<template>
  <div class="cursor">
    <span class="cursor-circle"></span>
  </div>
</template>

<script>
export default {name: "Cross"}
</script>

<style>
.cursor {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 4;
  pointer-events: none;
  
}

.cursor-circle {
  height: 10px;
  width: 10px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: all 0.4s ease;
}
.cursor-circle-focus {
  height: 25px;
  width: 25px;
  transition: all 0.4s ease;
}
</style>