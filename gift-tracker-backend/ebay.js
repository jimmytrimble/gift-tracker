const axios = require('axios');

const searchQuery = 'iphone';
const limit = 1;
const appId = 'StephenM-Birthday-SBX-3c42364b7-1b475f14'; // Your eBay App ID

const ebayApiEndpoint = `https://svcs.ebay.com/services/search/FindingService/v1`;
const requestParams = {
  'OPERATION-NAME': 'findItemsByKeywords',
  'SERVICE-VERSION': '1.0.0',
  'SECURITY-APPNAME': appId,
  'RESPONSE-DATA-FORMAT': 'JSON',
  'keywords': searchQuery,
  'paginationInput.entriesPerPage': limit
};

axios.get(ebayApiEndpoint, { params: requestParams })
  .then(response => {
    const items = response.data.findItemsByKeywordsResponse[0].searchResult[0].item;
    items.forEach(item => {
      console.log('Title:', item.title[0]);
      console.log('Price:', item.sellingStatus[0].currentPrice[0].__value__);
      console.log('Image URL:', item.galleryURL[0]);
      console.log('--------------------------------------------');
    });
  })
  .catch(error => {
    console.error('Error fetching data from eBay:', error);
  });
