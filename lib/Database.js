// npm install idb-keyval@6.2.1
import { get, set, del } from "idb-keyval";



/**
 * Retrieve data from IndexedDB by key
 * @param {string} key - Storage key
 * @returns {Promise<Array>} - Retrieved data or an empty array
 */
export const getDataFromIndexDB = async (key) => {
    try {
        const data = await get(key);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error retrieving data from IndexedDB:", error);
        return [];
    }
}



/**
 * Add new data to IndexedDB under the specified key
 * @param {string} key - Storage key
 * @param {Object} item - Item to add, should contain a unique `id` property
 * @returns {Promise<string>} - Success or error message
 */
export const addDataToIndexDB = async (key, item) => {
    try {
        const data = await getDataFromIndexDB(key);
        data.push(item);
        await set(key, data);
        return `Data saved successfully. New Id: ${item.id}`;
    } catch (error) {
        console.error("Error adding item to IndexedDB:", error);
        return "Failed to save data.";
    }
};



/**
 * Update an item in IndexedDB by its ID
 * @param {string} key - Storage key
 * @param {number} id - ID of the item to update
 * @param {Object} updatedItem - Updated item data
 * @returns {Promise<string>} - Success or error message
 */
export const updateDataToIndexDB = async (key, id, updatedItem) => {
    try {
        const data = await getDataFromIndexDB(key);
        const updatedData = data.map((item) => (parseInt(item.id) === parseInt(id) ? updatedItem : item));
        await set(key, updatedData);
        return `Data updated successfully. Updated Id: ${id}`;
    } catch (error) {
        console.error("Error updating data in IndexedDB:", error);
        return "Failed to update data.";
    }
};



/**
 * Delete an item from IndexedDB by its ID
 * @param {string} key - Storage key
 * @param {number} id - ID of the item to delete
 * @returns {Promise<string>} - Success or error message
 */
export const deleteDataFromIndexDB = async (key, id) => {
    try {
        const data = await getDataFromIndexDB(key);
        const initialLength = data.length;
        const updatedData = data.filter((item) => parseInt(item.id) !== parseInt(id));

        if (updatedData.length === initialLength) {
            return `Item with ID ${id} not found.`;
        }
        await set(key, updatedData);
        return `Data deleted successfully. Deleted Id: ${id}`;
    } catch (error) {
        console.error("Error deleting data from IndexedDB:", error);
        return "Failed to delete data.";
    }
};



/**
 * Delete all item from IndexedDB
 * @param {string} key - Storage key
 * @returns {Promise<string>} - Success or error message
 */
export const deleteKeyFromIndexDB = async (key) => {
    try {
        await del(key);
        return `Data deleted successfully.`;
    } catch (error) {
        console.error("Error deleting data from IndexedDB:", error);
        return "Failed to delete data.";
    }
};






/**
 * Sets new data to IndexedDB under the specified key; Usase at upload data
 * @param {string} key - Storage key
 * @param {Object} item - Item to add, should contain a unique `id` property
 * @returns {Promise<string>} - Success or error message
 */
export const setDataToIndexDB = async (key, item) => {
    try {
        await set(key, item);
        return `Data uploded successfully.`;
    } catch (error) {
        console.error("Error adding item to IndexedDB:", error);
        return "Failed to upload data.";
    }
};
