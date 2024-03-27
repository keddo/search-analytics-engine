const baseUrl = 'http://127.0.0.1:3000';

document.addEventListener('DOMContentLoaded', () => {
    articles()
    const searchBox = document.getElementById('search-box');
    searchBox.addEventListener('input', function (event) {
        const keyword = event.target.value.trim();
        filterArticles(keyword);
    });
});


const articles = async () => {
    const articleList = document.getElementById('article-list')
    const res = await fetch(`${baseUrl}/api/articles`)
    const data = await res.json()
    cacheDataWithExpiration('articles', JSON.stringify(data), 100)
    let content = '';
    data.forEach(article => (content += `<article class="article">
            <h1 class="title">${article.title}</h1>
            <div class="body">
                <p>${article.content}</p>
            </div>
            <div class="author">Written by: ${article.author}</div>
        </article>`))
    articleList.innerHTML += content;
}



// Handle in browser caching

function cacheDataWithExpiration(key, value, expirationTimeInSeconds) {
    const expirationTimestamp = Date.now() + expirationTimeInSeconds * 1000;
    const dataWithExpiration = { value, expirationTimestamp };
    localStorage.setItem(key, JSON.stringify(dataWithExpiration));
}

function getExpiringData(key) {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
        const { value, expirationTimestamp } = JSON.parse(storedValue);
        if (Date.now() < expirationTimestamp) {
            return value;
        }
        // Cache has expired
        localStorage.removeItem(key);
    }
    return null;
}


// Function to filter articles based on search keyword
function filterArticles(keyword) {
    const articleList = document.getElementById('article-list');
    // Retrieve articles from local storage
    let articles = getExpiringData('articles') || [];
    if (articles) {
        try {
            articles = JSON.parse(articles);

            // Check if articles is an array
            if (Array.isArray(articles)) {
                // Filter articles based on the search keyword
                const filteredArticles = articles.filter(article =>
                    article.title.toLowerCase().includes(keyword.toLowerCase()) ||
                    article.content.toLowerCase().includes(keyword.toLowerCase()) ||
                    article.author.toLowerCase().includes(keyword.toLowerCase())
                );

                // Update the content of the article list
                articleList.innerHTML = '';

                if (filteredArticles.length > 0) {
                    filteredArticles.forEach(article => {
                        articleList.innerHTML += `
                                <div class="article">
                                    <h3>${article.title}</h3>
                                    <p>${article.content}</p>
                                    <p><em>Written by: ${article.author}</em></p>
                                </div>
                            `;
                    });
                } else {
                    articleList.innerHTML = '<p>No articles found.</p>';
                }
            } else {
                console.error('Articles data is not in the expected format (not an array).');
            }
        } catch (error) {
            console.error('Error parsing articles data:', error);
        }
    } else {
        console.error('No articles found in local storage.');
    }
}