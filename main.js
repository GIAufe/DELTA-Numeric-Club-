// Fetch the latest news from the backend
fetch('/news')
    .then(response => response.json())
    .then(data => {
        const newsList = document.getElementById('news-list');
        data.news.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('news-article');
            
            const title = document.createElement('h3');
            title.textContent = article.title;
            
            const content = document.createElement('p');
            content.textContent = article.content;
            
            const date = document.createElement('small');
            date.textContent = new Date(article.date).toLocaleDateString();
            
            articleDiv.appendChild(title);
            articleDiv.appendChild(content);
            articleDiv.appendChild(date);
            newsList.appendChild(articleDiv);
        });
    })
    .catch(error => console.log('Error fetching news:', error));