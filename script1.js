document.getElementById('country').addEventListener('click', function() {

    console.log("uh oh");
    const selectedCountry = this.value.toLowerCase(); 
    updateNews(selectedCountry);
});

document.getElementById('log').addEventListener('click', function() {
    console.log('hi');
});

//Get News from API
async function fetchNews(countryCode) {
    const fs = require('fs');
const path = require('path');

// Read the secrets file
const secretsPath = path.join(__dirname, 'secrets');
const secrets = fs.readFileSync(secretsPath, 'utf-8');

const lines = secrets.split('\n');
let NEWSAPI_KEY = '';

lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key === 'NEWSAPI_KEY') {
        NEWSAPI_KEY = value.trim();
    }
});

    const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${NEWSAPI_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// Function to update news
async function updateNews(countryCode) {
    console.log("hi 2"); 
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = ''; 

    const articles = await fetchNews(countryCode);
    if (articles.length > 0) {
        articles.forEach(article => {
            const newsItem = document.createElement('p');
            newsItem.textContent = article.title;
            newsContainer.appendChild(newsItem);
        });
    } else {
        newsContainer.textContent = 'No news available for this country.';
    }
}

