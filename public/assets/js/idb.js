// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called '2cents_depot' and set it to version 1
const request = indexedDB.open('2cents_depot', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
  // save a reference to the database 
  const db = event.target.result;
  // create an object store (table) called `new_post`, set it to have an auto incrementing primary key of sorts 
  db.createObjectStore('new_post', { autoIncrement: true });
};

// upon a successful 
request.onsuccess = function(event) {
  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run uploadPost() function to send all local db data to api
  if (navigator.onLine) {
    uploadPost();
  }
};

request.onerror = function(event) {
  // log error here
  console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new post and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions 
  const transaction = db.transaction(['new_post'], 'readwrite');

  // access the object store for `new_post`
  const postObjectStore = transaction.objectStore('new_post');

  // add record to your store with add method
  postObjectStore.add(record);
}

function uploadPost() {
  // open a transaction on your db
  const transaction = db.transaction(['new_post'], 'readwrite');

  // access your object store
  const postObjectStore = transaction.objectStore('new_post');

  // get all records from store and set to a variable
  const getAll = postObjectStore.getAll();

  // upon a successful .getAll() execution, run this function
getAll.onsuccess = function() {
  // if there was data in indexedDb's store, let's send it to the api server
  if (getAll.result.length > 0) {
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(getAll.result),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(serverResponse => {
        if (serverResponse.message) {
          throw new Error(serverResponse);
        }
        // open one more transaction
        const transaction = db.transaction(['new_post'], 'readwrite');
        // access the new_post object store
        const postObjectStore = transaction.objectStore('new_post');
        // clear all items in your store
        postObjectStore.clear();

        alert('All saved posts has been submitted!');
      })
      .catch(err => {
        console.log(err);
      });
  }
};
}

// listen for app coming back online
window.addEventListener('online', uploadPost);