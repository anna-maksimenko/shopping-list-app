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

    function triggerHandler(event) {
        console.log(newItem);
        dispatch('itemAdd', Object.assign({}, event.detail));
	}
</script>

<ListItem name={newItem.name} quantity={newItem.quantity} measurement={newItem.measurement} addItemMode={true} on:triggerNewItem={triggerHandler}/>
