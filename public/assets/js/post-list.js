const $postList = document.querySelector('#post-list');

const getPostList = () => {
  fetch('/api/posts')
    .then(response => response.json())
    .then(postListArr => {
      postListArr.forEach(printPost);
    })
    .catch(err => {
      console.log(err)
    });
};

const printPost = ({ _id, postTitle, topics, commentCount, createdBy, createdAt }) => {
  const postCard = `
    <div class="col-12 col-lg-6 flex-row">
      <div class="card w-100 flex-column">
        <h3 class="card-header">${postTitle}</h3>
        <div class="card-body flex-column col-auto">
          <h4 class="text-dark">By ${createdBy}</h4>
          <p>On ${createdAt}</p>
          <p>${commentCount} Comments</p>
          <h5 class="text-dark">Topics</h5>
          <ul>
            ${topics
              .map(topic => {
                return `<li>${topic}</li>`;
              })
              .join('')}
          </ul>
          <a class="btn display-block w-100 mt-auto" href="/post?id=${_id}">See the discussion.</a>
        </div>
      </div>
    </div>
  `;

  $postList.innerHTML += postCard;
};

getPostList();