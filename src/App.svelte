<script lang="ts">
	import { hasContext } from "svelte"

  let crab = false
  let tophat = false
  let tslogo = false
  let crown = false
  let skate = false
  let noe = false

  let hat = "no_hat"

  function hatchange() {
    tophat = false
    crown = false
    if (hat === "top_hat") {
      tophat = true
    }
    if (hat === "crown") {
      crown = true
    }
  }

</script>

<div class="image-container">
  <img src="/src/img/deno_blanc.png" alt="dino" class="layer" />
  {#if crab}
    <img src="/src/img/crab.png" alt="crab" class="layer" />
  {/if}
  {#if tophat}
    <img src="/src/img/top_hat.png" alt="tophat" class="layer" />
  {/if}
  {#if tslogo}
    <img src="/src/img/ts_logo_cut.png" alt="ts_logo" class="layer" />
  {/if}
  {#if crown}
    <img src="/src/img/crown.png" alt="crown" class="layer" />
  {/if}
  {#if skate}
    <img src="/src/img/skate.png" alt="skate" class="layer" />
  {/if}
  {#if noe}
    <img src="/src/img/noe.png" alt="noe" class="layer" />
  {/if}
</div>

<div class="controls">

  <div class="checkboxes">
    <label>
      <input type="checkbox" bind:checked={crab} />
        crab
    </label>
    <label>
      <input type="checkbox" bind:checked={tslogo} />
        tslogo
    </label>
    <label>
      <input type="checkbox" bind:checked={skate} />
        skateboard
    </label>
    <label>
      <input type="checkbox" bind:checked={noe} />
        nö-tattoe
    </label>

  </div>

  <select bind:value={hat} on:change={hatchange}>
    <option value="no_hat">no hat</option>
    <option value="top_hat">top hat</option>
    <option value="crown">crown</option>
  </select>

</div>

<style>
  .image-container {
    position: relative;
    width: 700px;
    height: 700px;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  .checkboxes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 1rem;
    cursor: pointer;
  }

  .controls {
    display: inline-block;
    margin-left: 2rem;
    vertical-align: top;
  }

  .checkboxes {
    margin-bottom: 1rem;
  }

  select {
    width: 150px;
  }
</style>