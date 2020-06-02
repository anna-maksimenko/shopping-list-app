<script>
	import List from './components/List.svelte';
	import ListItem from './components/ListItem.svelte';
	import Tailwindcss from './Tailwindcss.svelte';
	import { productData } from './globals.js';
</script> 

<Tailwindcss />

<main>
	<List>
	<!-- Here should be list component -->
	{#each $productData as {name, id, enabled}}
	<!-- Here should be list item component -->
		<ListItem text={name} id={id} bind:enabled={enabled}/>
	{/each}
	<!-- End of list component -->
	</List>
	
</main>

<style>

</style>