<template>
  <div id="blocker">
    <div id="instructions">
      <p style="font-size: 36px">Click to play</p>
      <p>
        Move: WASD<br />
        Jump: SPACE<br />
        Look: MOUSE
      </p>
    </div>
  </div>
</template>

<script>
export default {name: "GUI"}
</script>

<style>
#blocker {
  position: absolute;
  opacity:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

#instructions {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
</style>