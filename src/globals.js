import { writable, readable } from 'svelte/store';
	const itemsList = [
		{ 
            id: 1, 
            name: 'potato', 
            enabled: false, 
            measurement: 'liter'
        },
		{ 
            id: 2, 
            name: 'carrot', 
            enabled: true,
            measurement: 'kilogram'
        },
		{ 
            id: 3, 
            name: 'onion', 
            enabled: false,
            measurement: 'kilogram'
        }
    ];
    const itemsMeasure = [
        {
            name: 'kilogram'
        },
        {
            name: 'liter'
        },
        {
            name: 'piece'
        }
    ];

export const productData = writable(itemsList);
export const productMeasure = readable(itemsMeasure);