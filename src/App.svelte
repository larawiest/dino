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
  let design = $state(false)
  let crabhat = $state(false)
  let kit = $state(false)

  let hat = $state("no_hat")
  let tat = $state("no_tat")
  let shi = $state("no_shirt")

  let hats = $state(["no_hat", "top_hat", "crown", "muetze", "party"])
  let tats = $state(["no_tat", "ts", "pq"])
  let shis = $state(["no_shirt", "no_design", "design"])

  let colors = $state(['#ff4601','#ffa61d','#fff81d','#1bdc01','#01c2ff'])
  let colorsnormal = $state(['#ff4601','#ffa61d','#fff81d','#1bdc01','#01c2ff'])
  let colorsspink = $state(['#ec2a63','#ec149b','#ec14da','#c314ec','#9b3cec'])
  let selected = $state('#01c2ff')
  let selected2 = $state('#01c2ff')
  let color = $state('blue')
  let color2 = $state('blue')

  let version = $state('normal')
  let pink = $state(false)

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
    if (tat === "ts") {
      tslogo = true
    }
    if (tat === "pq") {
      pq = true
    }
  }

  function shirtchange() {
    design = false
    shirt = false
    if (shi === "no_design") {
      shirt = true
    }
    if (shi === "design") {
      design = true
    }
  }

  function versionchange() {
    if (version === 'normal') version = 'pink'
    if (version === 'pink') version = 'normal'
  }

  function random() {
    crab = Math.random() < 0.5
    crabhat = Math.random() < 0.5
    if (crabhat) crab = true
    skate = Math.random() < 0.5
    noe = Math.random() < 0.5
    kit = Math.random() < 0.5

    hat = hats[Math.floor(Math.random() * hats.length)]
    hatchange()
    tat = tats[Math.floor(Math.random() * tats.length)]
    tatchange()
    shi = shis[Math.floor(Math.random() * shis.length)]
    shirtchange()

    selected = colors[Math.floor(Math.random() * colors.length)]
    selected2 = colors[Math.floor(Math.random() * colors.length)]


  }

  $effect(() => {

    if (version === 'normal') {
      colors = colorsnormal
    }
    if (version === 'pink') {
      colors = colorsspink
    }

    if (selected === '#01c2ff' || selected === '#9b3cec') {
      color = "blue";
    } else if (selected === '#ff4601' || selected === '#ec2a63') {
      color = 'red';
    } else if (selected === '#ffa61d' || selected === '#ec149b') {
      color = 'orange';
    } else if (selected === '#fff81d' || selected === '#ec14da') {
      color = 'yellow';
    } else if (selected === '#1bdc01' || selected === '#c314ec') {
      color = 'green';
    }

    if (selected2 === '#01c2ff' || selected2 === '#9b3cec') {
      color2 = "blue";
    } else if (selected2 === '#ff4601' || selected2 === '#ec2a63') {
      color2 = 'red';
    } else if (selected2 === '#ffa61d' || selected2 === '#ec149b') {
      color2 = 'orange';
    } else if (selected2 === '#fff81d' || selected2 === '#ec14da') {
      color2 = 'yellow';
    } else if (selected2 === '#1bdc01' || selected2 === '#c314ec') {
      color2 = 'green';
    }

    if (crabhat === true) {
      crab = true
    }

    if (!crab) {
      crabhat = false
    }

    if (pink) {
      version = 'pink'
    } else {
      version = 'normal'
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
    <img src="/img/{version}/deno_blanc.png" alt="dino" class="layer" />
    <!--hats-->
    {#if tophat}
      <img src="/img/{version}/top_hat/{color}.png" alt="tophat" class="layer" />
    {/if}

    {#if crown}
      <img src="/img/{version}/crown.png" alt="crown" class="layer" />
    {/if}

    {#if muetze}
      <img src="/img/{version}/muetze/{color}.png" alt="muetze" class="layer" />
    {/if}

    {#if party}
      <img src="/img/{version}/party/{color}.png" alt="party" class="layer" />
    {/if}

    {#if tslogo}
      <img src="/img/{version}/ts_logo_cut.png" alt="ts_logo" class="layer" />
    {/if}


    {#if skate}
      <img src="/img/{version}/skate.png" alt="skate" class="layer" />
    {/if}

    {#if noe}
      <img src="/img/{version}/noe.png" alt="noe" class="layer" />
    {/if}

    {#if crabhat}
      <img src="/img/{version}/crabhat/{color}.png" alt="noe" class="layer" />
    {/if}


    <!--Oberteil-->
    {#if pq}
      <img src="/img/{version}/pq_formel.png" alt="pq" class="layer" />
    {/if}

    {#if shirt}
      <img src="/img/{version}/shirt/{color2}.png" alt="shirt" class="layer" />
    {/if}

    {#if design}
      <img src="/img/{version}/design/{color2}.png" alt="shirt" class="layer" />
    {/if}

    {#if crab}
      <img src="/img/{version}/crab.png" alt="crab" class="layer" />
    {/if}

    {#if kit}
      <img src="/img/{version}/kit.png" alt="kit" class="layer" />
    {/if}

  </div>

  <div class="controls">
    <div class="checkboxes">
      <label>
        <input type="checkbox" bind:checked={crab} />
          crab
      </label>
      <label>
        <input type="checkbox" bind:checked={crabhat} />
          crab hat
      </label>
      <label>
        <input type="checkbox" bind:checked={skate} />
          skateboard
      </label>
      <label>
        <input type="checkbox" bind:checked={noe} />
          nö-tattoo
      </label>
      <label>
        <input type="checkbox" bind:checked={kit} />
          KIT-pass
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

    <select bind:value={shi} onchange={shirtchange}>
      <option value="no_shirt">no shirt</option>
      <option value="no_design">normal</option>
      <option value="design">design</option>
    </select>

    <div class="color">
	    {#each colors as color, i}
		    <button
			    style="background: {color}"
			    aria-label={color}
			    aria-current={selected2 === color}
			    onclick={() => selected2 = color}
		    ></button>
	    {/each}
    </div>

    <select bind:value={tat} onchange={tatchange}>
      <option value="no_tat">no tattoo</option>
      <option value="ts">ts logo</option>
      <option value="pq">pq-Formel</option>
    </select>

    <div class:pink={pink}>
      <label class="switch">
        <input type="checkbox" bind:checked={pink} />
      </label>
      {version}
    </div>

    <button onclick={random}>
      random dino
    </button>

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