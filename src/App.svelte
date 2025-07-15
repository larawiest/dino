<script lang="ts">
	import { hasContext } from "svelte"
  import html2canvas from 'html2canvas';

  let crab = $state(false)
  let tophat = $state(false)
  let tslogo = $state(false)
  let crown = $state(false)
  let skate = $state(false)
  let noe = $state(false)
  let pq = $state(false)
  let muetze = $state(false)
  let party = $state(false)
  let shirt = $state(false)

  let hat = $state("no_hat")
  let tat = $state("no_tat")

  let colors = $state(['#ff4601','#ffa61d','#fff81d','#1bdc01','#01c2ff'])
  let selected = $state('#01c2ff')
  let color = $state('blue')

  function hatchange() {
    tophat = false
    crown = false
    muetze = false
    party = false
    if (hat === "top_hat") {
      tophat = true
    }
    if (hat === "crown") {
      crown = true
    }
    if (hat === "muetze") {
      muetze = true
    }
    if (hat === "party") {
      party = true
    }
  }

  function tatchange() {
    tslogo = false
    pq = false
    shirt = false
    if (tat === "ts") {
      tslogo = true
    }
    if (tat === "pq") {
      pq = true
    }
    if (tat === "shirt") {
      shirt = true
    }
  }

  $effect(() => {
    if (selected === '#01c2ff') {
      color = "blue";
    } else if (selected === '#ff4601') {
      color = 'red';
    } else if (selected === '#ffa61d') {
      color = 'orange';
    } else if (selected === '#fff81d') {
      color = 'yellow';
    } else if (selected === '#1bdc01') {
      color = 'green';
    }
  })

  let containerRef: HTMLDivElement;

  async function downloadImage() {
    const canvas = await html2canvas(containerRef, {
      backgroundColor: null
    });

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "my_character.png";
    link.click();
  }

</script>


<div class="layout">
  <div bind:this={containerRef} class="bildcontainer">
    <img src="/img/deno_blanc.png" alt="dino" class="layer" />
    <!--hats-->
    {#if tophat}
      <img src="/img/top_hat/{color}.png" alt="tophat" class="layer" />
    {/if}

    {#if crown}
      <img src="/img/crown.png" alt="crown" class="layer" />
    {/if}

    {#if muetze}
      <img src="/img/muetze/{color}.png" alt="muetze" class="layer" />
    {/if}

    {#if party}
      <img src="/img/party/{color}.png" alt="party" class="layer" />
    {/if}

    {#if tslogo}
      <img src="/img/ts_logo_cut.png" alt="ts_logo" class="layer" />
    {/if}


    {#if skate}
      <img src="/img/skate.png" alt="skate" class="layer" />
    {/if}

    {#if noe}
      <img src="/img/noe.png" alt="noe" class="layer" />
    {/if}


    <!--Oberteil-->
    {#if pq}
      <img src="/img/pq_formel.png" alt="pq" class="layer" />
    {/if}

    {#if shirt}
      <img src="/img/tshirt.png" alt="shirt" class="layer" />
    {/if}

    {#if crab}
      <img src="/img/crab.png" alt="crab" class="layer" />
    {/if}

  </div>

  <div class="controls">
    <div class="checkboxes">
      <label>
        <input type="checkbox" bind:checked={crab} />
          crab
      </label>
      <label>
        <input type="checkbox" bind:checked={skate} />
          skateboard
      </label>
      <label>
        <input type="checkbox" bind:checked={noe} />
          nö-tatto
      </label>
    </div>

    <select bind:value={hat} onchange={hatchange}>
      <option value="no_hat">no hat</option>
      <option value="top_hat">top hat</option>
      <option value="crown">crown</option>
      <option value="muetze">mütze</option>
      <option value="party">party hat</option>
    </select>

    <div class="color">
	    {#each colors as color, i}
		    <button
			    style="background: {color}"
			    aria-label={color}
			    aria-current={selected === color}
			    onclick={() => selected = color}
		    ></button>
	    {/each}
    </div>

    <select bind:value={tat} onchange={tatchange}>
      <option value="no_tat">no tatto</option>
      <option value="ts">ts logo</option>
      <option value="pq">pq-Formel</option>
      <option value="shirt">rotes shirt</option>
    </select>
    
    <button onclick={downloadImage} class="download">
      download
    </button>

    </div>


</div>



<style>
  .layout {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 1rem;
  }

  .bildcontainer {
    position: relative;
    width: 400px;
    height: 400px;
    border: 2px solid #ccc;
    background: #f5f5f5;
    flex-shrink: 0;
  }

  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 200px;
    background: #fff;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  }

  .checkboxes {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  select {
    width: 150px;
    padding: 0.3rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }

  .color {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    max-width: 170px;
  }

  .color button {
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--color);
    border: 2px solid #4442;
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  .color button:hover {
    transform: scale(1.1);
    border-color: #000;
  }

  label {
    cursor: pointer;
    font-size: 1rem;
  }

  .download {
    position: relative;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    display: flex;
    gap: 2rem;
    width: 100px;
  }
</style>