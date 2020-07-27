<script>
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Tailwindcss from './Tailwindcss.svelte';
	
	import List from './components/List.svelte';
	import ListItem from './components/ListItem.svelte';
	import NewItem from './components/NewItem.svelte';
	import { productData } from './globals.js';
	import { fetchAllProducts, addProduct, deleteProduct, updateProduct} from './helpers/faunaQuery.js';

	getProducts();

	async function getProducts() {
		$productData = await fetchAllProducts();
		console.log("productData");
		console.log($productData);
	}

	function removeListItem(event) {
		//Check if item exists in store
		if ($productData.some(productItem => event.detail === productItem.id)){
			$productData = $productData.filter(productItem => productItem.id !== event.detail);
			deleteProduct(event.detail); 
		}
		console.log(event);
		console.log("product-data");
		console.log($productData);
	}

	function addListItem(event) {
		const completeItem = Object.assign(event.detail, {enabled: false})
		$productData = [...$productData, completeItem];
		console.log(event.detail);
		addProduct(completeItem);
	}

	function updateListItem(event) {
		//Check if item exists in store
		if ($productData.some(productItem => event.detail.id === productItem.id)){
			$productData = $productData.map(productItem => {
				if (productItem.id == event.detail.id){
					return Object.assign(productItem, event.detail);
				} 
				return productItem;
			});
			updateProduct(event.detail); 
		}
		console.log(event);
		console.log("product-data");
		console.log($productData);
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
	<!-- {#await $productData}

	{:then data} -->
		<List>
			<div class="list__wrapper">
				{#each $productData.filter(productItem => productItem.enabled) as {id, name, enabled, quantity, measurement} (id)}
					<div class="list-item__outer-wrapper" in:fade out:fade animate:flip>
						<ListItem id={id} name={name} enabled={enabled} quantity={quantity} measurement={measurement} on:itemRemove={removeListItem} on:itemUpdate={updateListItem}/>
					</div>
				{/each}
				{#each $productData.filter(productItem => !productItem.enabled) as {id, name, enabled, quantity, measurement} (id)}
					<div class="list-item__outer-wrapper" in:fade out:fade animate:flip>
						<ListItem id={id} name={name} enabled={enabled} quantity={quantity} measurement={measurement} on:itemRemove={removeListItem} on:itemUpdate={updateListItem}/>
					</div>
				{/each}
			</div>
			<div class="line"></div>
			<div class="list__add-wrapper"><NewItem on:itemAdd={addListItem}/></div>
		</List>
	<!-- {/await} -->
</main>