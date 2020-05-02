import fetch from 'cross-fetch';

const endpoints = {
    GET_REQUESTS: '/api/requests',
    GET_LISTS: '/api/lists'
};


function fetchFromServer(url, method = 'GET') {
    // TODO use method?
    // handle response
    return fetch(url);
}

export function getRequests(filter = '') {
    const url = endpoints.GET_REQUESTS + `?filter=${filter}`;
    // return fetchFromServer(url);
    return new Promise((a, b) => { return a(); })
        .then(() => [1,2,3]);
}



// API endpoint faking

async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime));
}
