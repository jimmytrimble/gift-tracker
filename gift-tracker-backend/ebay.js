const axios = require('axios');

const oauthToken = `v^1.1#i^1#f^0#r^0#I^3#p^3#t^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`;

const query = 'necklace';
const limit = 10;
const ebayApiEndpoint = `https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=${limit}`;

// Make a GET request to the eBay API
axios.get(ebayApiEndpoint, {
  headers: {
    'Authorization': `Bearer ${oauthToken}`,
    'Content-Type': 'application/json',
    'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US' // Replace with the appropriate marketplace ID
  }
})
.then(response => {
  // Handle successful response
  const itemSummaries = response.data.itemSummaries;
  const extractedData = itemSummaries.map(item => ({
    title: item.title,
    imageUrl: item.image.imageUrl,
    price: '$' + item.price.value
  }));
  console.log(extractedData)
})
.catch(error => {
  // Handle error
  console.error('Error:', error);
});