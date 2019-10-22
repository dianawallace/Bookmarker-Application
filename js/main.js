// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    // Test if Bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        // Add to Array
        bookmarks.push(bookmark);
        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url){
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}


// Fetch bookmarks
function fetchBookmarks(){
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="card bg-light text-dark card-body mt-3">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-outline-secondary" target="_blank" href="'+url+'">Visit</a> ' +
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger href="#">Delete</a> ' +
                                      '</h3>'+
                                      '</div>';

    }
}

// Validate Form
function validateForm(){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
}