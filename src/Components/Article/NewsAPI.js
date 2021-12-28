import { NEWS_API_KEY } from '../../Constants/Constants';

function handleErrors(response) {
    if (response.status !== "ok") {
        throw Error(response.statusText);
    }
    return response;
}

export const getClimateArticles = async () => {
    var json = [];
    await fetch(
        'https://newsapi.org/v2/everything?q=climate&apiKey=' + NEWS_API_KEY
    )
    .then(async (response) => { return handleErrors(await response.json()) })
    .then(result => json = result)
    .catch((error) => { throw Error(error) });
    return json;
};

export const getDisasterArticles = async () => {
    var json = [];
    await fetch(
        'https://newsapi.org/v2/everything?q=natural-disasters&apiKey=' + NEWS_API_KEY
    )
    .then(async (response) => { return handleErrors(await response.json()) })
    .then(result => json = result)
    .catch((error) => { throw Error(error) });
    return json;
};

export const getWaterArticles = async () => {
    var json = [];
    await fetch(
        'https://newsapi.org/v2/everything?q=ocean&language=en&apiKey=' + NEWS_API_KEY
    )
    .then(async (response) => { return handleErrors(await response.json()) })
    .then(result => json = result)
    .catch((error) => { throw Error(error) });
    return json;
};

export const getLandArticles = async () => {
    var json = [];
    await fetch(
        'https://newsapi.org/v2/everything?q=deforestation&language=en&apiKey=' + NEWS_API_KEY
    )
    .then(async (response) => { return handleErrors(await response.json()) })
    .then(result => json = result)
    .catch((error) => { throw Error(error) });
    return json;
};