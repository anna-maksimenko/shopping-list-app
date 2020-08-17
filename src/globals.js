import { writable, readable } from 'svelte/store';

	const itemsList = [
		{ 
            id: 1, 
            name: 'potato', 
            enabled: false, 
            quantity: 1,
            measurement: 'liter'
        },
		{ 
            id: 2, 
            name: 'carrot', 
            enabled: true,
            quantity: 1,
            measurement: 'kilogram'
        },
		{ 
            id: 3, 
            name: 'onion', 
            enabled: false,
            quantity: 1,
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

export const productData = writable([]);
export const productMeasure = writable([]);