// The Function that the dashboard uses to create new posts.



async function newFormHandler(event) {
    event.preventDefault();

    const description = document.querySelector('input[name="post-desc"]').value;
    const image = document.querySelector('input[name="post-image"]').value;
    const location = document.querySelector('input[name="post-location"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            description,
            image,
            location
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

    
}

document.querySelector('#upload-button').addEventListener('submit', newFormHandler);