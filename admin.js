document.getElementById('news-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    // Send admin username and password with the request
    const authData = {
        username: 'admin',
        password: 'password'
    };

    fetch('/news', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Basic ' + btoa(authData.username + ":" + authData.password)
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('form-message').textContent = data.message;
    })
    .catch(error => {
        document.getElementById('form-message').textContent = 'Error: ' + error;
    });
});