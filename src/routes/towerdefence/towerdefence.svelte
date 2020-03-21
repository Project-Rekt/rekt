<script>
  import { onMount } from "svelte";
  import World from "./classes/world.js";
  let canvas, uFPS, rFPS;

  onMount(() => {
    let game = new World(canvas);
    game.createDemoWorld()
    game.start();
    console.log(game)
    console.log("START")
  });
</script>

<style>
  * {
    color: cyan;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
  }

  
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
  }

  .ui {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>

<canvas
  width={window.innerWidth}
  height={window.innerHeight}
  bind:this={canvas} />
<div class="ui"/>

