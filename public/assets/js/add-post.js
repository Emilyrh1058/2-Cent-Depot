const $addTopicBtn = document.querySelector('#add-topics');
const $postForm = document.querySelector('#post-form');
const $customTopicsList = document.querySelector('#custom-topics-list');

const handleAddTopic = event => {
  event.preventDefault();

  const topicValue = document.querySelector('#new-topic').value;

  if (!topicValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'topic';
  checkbox.value = topicValue;
  checkbox.id = topicValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = topicValue;
  label.htmlFor = topicValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customTopicsList.appendChild(divWrapper);

  topicValue.value = '';
};

const handlePostSubmit = event => {
  event.preventDefault();

  const postTitle = $postForm.querySelector('#post-title').value;
  const createdBy = $postForm.querySelector('#created-by').value;
  const topics = [...$postForm.querySelectorAll('[name=topic]:checked')].map(topic => {
    return topic.value;
  });

  if (!postTitle || !createdBy || !topics.length) {
    return;
  }

  const formData = { postTitle, createdBy, topics };

  fetch('/api/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      alert('Post created successfully!');
      console.log(postResponse);
    })
    .catch(err => {
      console.log(err);
      saveRecord(formData);
    });
};

$postForm.addEventListener('submit', handlePostSubmit);
$addTopicBtn.addEventListener('click', handleAddTopic);
