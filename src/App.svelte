<script>
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Tailwindcss from './Tailwindcss.svelte';

	import List from './components/List.svelte';
	import ListItem from './components/ListItem.svelte';
	import NewItem from './components/NewItem.svelte';
	import { productData } from './globals.js';

	function removeListItem(event) {
		$productData = $productData.filter(productItem => productItem.id !== event.detail); 
	}

	function addListItem(event) {
		$productData = [...$productData, Object.assign(event.detail, {id: $productData[$productData.length-1].id + 1, enabled: false})];
	}

</script> 

<style type="text/scss">
	@import './src/styles/vars.scss';
    :global(body){
		position: relative;
        background-color: $mainColor;
	}
	.list{
		&__wrapper{
			@apply pb-4;
		}
		&__add-wrapper{
			@apply pt-4;
		}
	}
	.line{
		height: 3px;
		background: $mainColor;
		box-shadow: inset 1px 1px 2px #54535a, inset -1px -1px 2px #72717a;
	}
</style>

<Tailwindcss />

<main>
	<List>
		<div class="list__wrapper">
			{#each $productData.filter(productItem => productItem.enabled) as {name, id, enabled, quantity, measurement} (id)}
				<div class="list-item__outer-wrapper" in:fade out:fade animate:flip>
					<ListItem text={name} id={id} bind:enabled={enabled} bind:quantity={quantity} bind:measure={measurement} on:itemRemove={removeListItem}/>
				</div>
			{/each}
			{#each $productData.filter(productItem => !productItem.enabled) as {name, id, enabled, quantity, measurement} (id)}
				<div class="list-item__outer-wrapper" in:fade out:fade animate:flip>
					<ListItem text={name} id={id} bind:enabled={enabled} bind:quantity={quantity} bind:measure={measurement} on:itemRemove={removeListItem}/>
				</div>
			{/each}
		</div>
		<div class="line"></div>
		<div class="list__add-wrapper"><NewItem on:itemAdd={addListItem}/></div>
	</List>
</main>