<script>
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Tailwindcss from './Tailwindcss.svelte';

	import List from './components/List.svelte';
	import ListItem from './components/ListItem.svelte';
	import NewItem from './components/NewItem.svelte';
	import { productData } from './globals.js';

	function removeListItem(event) {
		$productData = $productData.filter(t => t.id !== event.detail); 
	}

	function addListItem(event) {
		$productData = [...$productData, Object.assign(event.detail, {id: $productData[$productData.length-1].id + 1, enabled: false})];
	}

</script> 

<Tailwindcss />

<main>
	<List >
		{#each $productData.filter(productItem => productItem.enabled) as {name, id, enabled, quantity, measurement} (id)}
			<div class="list-wrapper" in:fade out:fade animate:flip>
				<ListItem text={name} id={id} bind:enabled={enabled} bind:quantity={quantity} bind:measure={measurement} on:itemRemove={removeListItem}/>
			</div>
		{/each}
		{#each $productData.filter(productItem => !productItem.enabled) as {name, id, enabled, quantity, measurement} (id)}
			<div class="list-wrapper" in:fade out:fade animate:flip>
				<ListItem text={name} id={id} bind:enabled={enabled} bind:quantity={quantity} bind:measure={measurement} on:itemRemove={removeListItem}/>
			</div>
		{/each}
		<NewItem on:itemAdd={addListItem}/>
	</List>
	
</main>

<style>
	.list-wrapper{
		@apply top-0;
	}
</style>