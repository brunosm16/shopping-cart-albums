/**
Returns the index of a item with the same id passed as argument, 
if not found returns -1. 
 */
export const findExistingIdIndex = (id, list) =>
	list.findIndex((item) => item.id === id);

/**
 * Updates a current item in the list with updatedItem,
 * the current item to be updated is searched by id.
 */
export const updateListByItem = (updatedItem, list) =>
	list.map((item) => {
		let currItem = item;

		/* Item found */
		if (currItem.id === updatedItem.id) {
			currItem = updatedItem;
		}

		return currItem;
	});

export const removeItemById = (id, list) =>
	list.filter((item) => item.id !== id);

/**
 * Returns a item from the list with the same id passed as argument,
 * if not found returns undefined.
 */
export const findItemById = (id, list) => {
	const index = findExistingIdIndex(id, list);

	return index !== -1 ? list[index] : undefined;
};

export const validateName = (name) => name.trim().length >= 4;

export const validateEmail = (email) =>
	email.trim().length >= 6 && email.includes('@');

export const validateAddress = (address) => address.trim().length >= 8;

export const validatePostalCode = (postalCode) =>
	postalCode.trim().length >= 12;
