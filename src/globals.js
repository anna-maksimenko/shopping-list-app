import { writable } from 'svelte/store';
	const itemsList = [
		{ id: 1, name: 'potato', enabled: false},
		{ id: 2, name: 'carrot', enabled: true},
		{ id: 3, name: 'onion', enabled: false}
	];

export const productData = writable(itemsList);