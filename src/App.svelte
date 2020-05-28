<script>
	import List from './components/List.svelte';
	import ListItem from './components/ListItem.svelte';
	import Tailwindcss from './Tailwindcss.svelte';


	const itemsList = [
		{ id: 1, name: 'potato' },
		{ id: 2, name: 'carrot' },
		{ id: 3, name: 'onion' }
	];
</script> 

<Tailwindcss />

<main>
	<List>
	<!-- Here should be list component -->
	{#each itemsList as {name, id}}
	<!-- Here should be list item component -->
		<ListItem text={name} id={id} />
	{/each}
	<!-- End of list component -->
	</List>
	
</main>

<style>

</style>