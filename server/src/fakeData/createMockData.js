// Import faker library for generating mock data
const { faker } = require('@faker-js/faker');

// Configuration for mock data
const NUM_FOLDERS = 10; // Number of folders to generate
const MAX_NOTES_PER_FOLDER = 5; // Maximum number of notes per folder

// Generate unique ID
const generateId = () => faker.datatype.uuid();

// Create mock folders
const generateFolders = () => {
    return Array.from({ length: NUM_FOLDERS }, () => {
        const folderId = generateId();
        return {
            id: folderId,
            name: faker.commerce.department(),
            createdAt: faker.date.past().toISOString(),
            updatedAt: faker.date.recent().toISOString(),
            notes: [] // Will populate notes later
        };
    });
};


// Generate mock data
const folders = generateFolders();


// Log mock data for verification
console.log('Folders:', JSON.stringify(folders, null, 2));


// Export mock data (Optional for testing with a database)
module.exports = { folders};
