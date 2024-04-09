const axios = require('axios');

// Set up your eBay API credentials
const appId = 'YOUR_APP_ID';

// Define the eBay API endpoint and parameters
const apiUrl = 'https://api.ebay.com/buy/browse/v1/item_summary/search';
const params = {
  q: 'basketball', // Search query
  limit: 10, // Number of items to fetch
};

// Set up request headers with eBay API credentials
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${appId}`,
};

// Make a GET request to eBay API
axios.get(apiUrl, { params, headers })
  .then(response => {
    // Handle API response
    console.log(response.data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching data from eBay API:', error);
  });

//   {
//     "itemSummaries": [
//       {
//         "itemId": "123456789",
//         "title": "Nike Basketball",
//         "price": {
//           "value": "49.99",
//           "currency": "USD"
//         },
//         "condition": "New",
//         "seller": {
//           "username": "example_seller",
//           "feedbackScore": 1000
//         },
//     }
// ]
// }


//https://www.amazon.com/s?k=basketball&crid=2GPEW865G88NX&sprefix=basketba%2Caps%2C543&ref=nb_sb_noss_2