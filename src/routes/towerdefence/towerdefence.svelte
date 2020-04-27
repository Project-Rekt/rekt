<script>
  import { onMount } from "svelte";
  import World from "./classes/world.js";
  let canvas, uFPS, rFPS, fCanvas;

  onMount(() => {
    let game = new World(canvas, fCanvas);
    game.createDemoWorld()
    game.start();
    console.log("START")
  });
</script>

<style>
  * {
    color: cyan;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 100;
  }

  
  .back {
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
  }

  .fore {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
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
  class="back"
  width={window.innerWidth}
  height={window.innerHeight}
  bind:this={canvas} />
  <canvas
  class="fore"
  width={window.innerWidth}
  height={window.innerHeight}
  bind:this={fCanvas} />
<div class="ui"/>

