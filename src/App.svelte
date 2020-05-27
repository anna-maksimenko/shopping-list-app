<script>
	import ListItem from './components/ListItem.svelte';


	const itemsList = [
		{ id: 1, name: 'potato' },
		{ id: 2, name: 'carrot' },
		{ id: 3, name: 'onion' }
	];
</script>

<main>
	<!-- Here should be list component -->
	{#each itemsList as {name, id}}
	<!-- Here should be list item component -->
		<ListItem text={name} id={id} />
	{/each}
	<!-- End of list component -->
	
</main>

<style>

</style>