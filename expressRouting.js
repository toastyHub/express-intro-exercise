// Import the express library
const express = require('express');

// Create an instance of the express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Function to convert a comma-separated string of numbers into an array of integers
let makeIntArray = function(nums) {
    // Split the input string on commas and create an array of substrings
    const numStrings = nums.split(',');
    const numsArray = [];
    // Loop through each substring and parse it as an integer
    for (let i = 0; i < numStrings.length; i++) {
        const numString = numStrings[i].trim();
        // Check if the substring is empty or not a number (NaN)
        if (numString === "" || isNaN(parseInt(numString, 10))) {
            // If the substring is empty or not a number, return an empty array
            return [];
        }
        // Parse the trimmed substring as an integer and add it to the numsArray
        const parsedNum = parseInt(numString, 10);
        numsArray.push(parsedNum);
    }
    // Return the array of integers
    return numsArray;
};

// Function to calculate the mean of an array of numbers
function getMean(arr) {
    // Sum up all the elements and divide by the number of elements to get the mean
    return arr.reduce((sum, el) => sum + el, 0) / arr.length;
};

// Function to calculate the median of an array of numbers
function getMedian(arr) {
    // Sort the array in ascending order
    const nums = arr.sort((a, b) => a - b);
    const middle = Math.floor(nums.length / 2);
    // If the array has an even number of elements, return the average of the two middle elements
    // Otherwise, return the middle element
    return nums.length % 2 === 0 ? (nums[middle] + nums[middle - 1]) / 2 : nums[middle];
};

// Function to calculate the mode (most frequent element) of an array of numbers
function getMode(arr) {
    // Sort the array in ascending order
    const nums = arr.sort((a, b) => a - b);
    // Create a frequency map to count occurrences of each number
    const freqMap = {};
    for (const num of nums) {
        if (freqMap.hasOwnProperty(num)) {
            freqMap[num] = freqMap[num] + 1;
        } else {
            freqMap[num] = 1;
        }
    }
    // Find the number with the highest frequency (mode)
    let maxFreq = 0;
    let mode = null;
    for (const key in freqMap) {
        if (freqMap[key] > maxFreq) {
            maxFreq = freqMap[key];
            mode = Number(key);
        }
    }
    // Return the mode
    return mode;
}

// Define routes for calculating mean, median, and mode ///////////////////////////////////////////////////////////////////////////////
app.get('/mean', function (req, res) {
    // Extract the 'nums' query parameter and convert it to an array of integers
    let nums = makeIntArray(req.query.nums);
    // Check if the array is empty (invalid input)
    if (nums.length === 0) {
        // Return a 400 Bad Request status code with an error message
        return res.status(400).json({ error: 'Invalid input. The query string should contain numeric values separated by commas.' });
    }
    // Calculate the mean of the array and send the result in the response
    let mean = getMean(nums);
    res.json({ response: { operation: 'mean', value: `${mean}` } });
});

app.get('/median', function (req, res) {
    // Extract the 'nums' query parameter and convert it to an array of integers
    let nums = makeIntArray(req.query.nums);
    // Check if the array is empty (invalid input)
    if (nums.length === 0) {
        // Return a 400 Bad Request status code with an error message
        return res.status(400).json({ error: 'Invalid input. The query string should contain numeric values separated by commas.' });
    }
    // Calculate the median of the array and send the result in the response
    let median = getMedian(nums);
    res.json({ response: { operation: 'median', value: `${median}` } });
});

app.get('/mode', function (req, res) {
    // Extract the 'nums' query parameter and convert it to an array of integers
    let nums = makeIntArray(req.query.nums);
    // Check if the array is empty (invalid input)
    if (nums.length === 0) {
        // Return a 400 Bad Request status code with an error message
        return res.status(400).json({ error: 'Invalid input. The query string should contain numeric values separated by commas.' });
    }
    // Calculate the mode of the array and send the result in the response
    let mode = getMode(nums);
    res.json({ response: { operation: 'mode', value: `${mode}` } });
});

/////////////////////////////////////////////////////////////////////////////////////

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
});
