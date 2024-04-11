
  async function fetchImages(query = '') {
    try {
      let url = 'https://randomfox.ca/floof/';
      
      if (query) {
        url += `?${query}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      displayImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }
  
  function displayImages(images) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; 
  
    const image = images;
  
    const imgElement = document.createElement('img');
    imgElement.src = image.image; 
    imgElement.alt = 'Random fox image'; 
  
    
  
    const commentsList = document.createElement('ul');
  
    const imageDiv = document.createElement('div');
    imageDiv.appendChild(imgElement);
    imageDiv.appendChild(likeButton);
    imageDiv.appendChild(commentInput);
    imageDiv.appendChild(commentButton);
    imageDiv.appendChild(commentsList);
  
    imageContainer.appendChild(imageDiv);
  }


  const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.addEventListener('click', likeImage); 
  
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment';
    commentInput.classList.add = 'comment'
    console.log(commentInput.value)
  
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
     commentButton.addEventListener('click', (e) => { 
        e.preventDefault()
        addComment(commentInput.value)
        fetchComments()
    })

  
  async function likeImage() {
    try {
      console.log('Liked the image');
    } catch (error) {
      console.error('Error liking image:', error);
    }
  }
  
  async function addComment(comment) {
    try {
      const response = await fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      console.log('Added a comment to the image');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

//   function showComments(){
//     let commentInpt = document.querySelector('input')
//     commentInptValue = commentInpt.value
//     console.log(commentInptValue)

//   }
//   showComments()
function fetchComments(){
    fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(comments => {
        displayComments(comments);
        console.log(comments)
    })
    .catch(error => {
        console.log("error getting comments")
    })
}
  
  document.getElementById('search-input').addEventListener('keypress', async function(event) {
    if (event.key === 'Enter') {
      const searchQuery = document.getElementById('search-input').value;
      await fetchImages(searchQuery);
    }
  });
  
  window.onload = fetchImages(); G
  
