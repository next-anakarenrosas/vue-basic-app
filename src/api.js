const url = 'https://api.coincap.io/v2';

function getAssets() {
    return fetch(`${url}/assets?limit=20`)
        .then(res => res.json())
        .then(res => res.data)
}

function getAsset(coinId) {
    return fetch(`${url}/assets/${coinId}`)
        .then(res => res.json())
        .then(res => res.data)
}

function getAssetHistory(coinId) {
    const now = new Date();
    const end = now.getTime();
    now.setDate(now.getDate() - 1);
    const start = now.getTime();
    return fetch(`${url}/assets/${coinId}/history?interval=h1&start=${start}&end=${end}`)
        .then(res => res.json())
        .then(res => res.data)
}

function getMarkets(coinId){
    return fetch(`${url}/assets/${coinId}/markets?limit=5`)
    .then(res => res.json())
    .then(res => res.data)
}

function getExchanges(coinId){
    return fetch(`${url}/exchanges/${coinId}`)
    .then(res => res.json())
    .then(res => res.data)
}

export default {
    getAssets,
    getAsset,
    getAssetHistory,
    getMarkets,
    getExchanges
}