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
</style>

<canvas
  width={window.innerWidth}
  height={window.innerHeight}
  bind:this={canvas} />

