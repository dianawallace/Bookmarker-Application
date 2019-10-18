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
    if(localStorage.getItem('bookmarks') === null) {
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

    // Prevent form from submitting
    e.preventDefault();
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    console.log(bookmarks);

}