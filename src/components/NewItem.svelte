<script>
    import { createEventDispatcher } from 'svelte';

    import { productMeasure } from '../globals.js';
    import ListItem from './ListItem.svelte';

    let newItem = {
        name: '',
        quantity: 0,
        measurement: $productMeasure[0].name
    }

    const dispatch = createEventDispatcher();

    function triggerHandler() {
        dispatch('itemAdd', Object.assign({}, newItem));
        newItem = {
            name: '',
            quantity: 0,
            measurement: $productMeasure[0].name
        }
	}
</script>

<ListItem bind:text={newItem.name} bind:quantity={newItem.quantity} bind:measure={newItem.measurement} editable={true} on:triggerNewItem={triggerHandler}/>
