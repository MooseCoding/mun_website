async function fetchNews(countryCode) {
    const apiKey = 'NEWSAPI_KEY'; // Replace with your NewsAPI key
    const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${apiKey}`;

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
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear existing news

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

// Event listener for country selection
document.getElementById('country_button').addEventListener('click', function() {
    const selectedCountry = this.value.toLowerCase(); // API might use lowercase country codes
    updateNews(selectedCountry);
});