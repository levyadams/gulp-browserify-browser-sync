//on DOM loaded
window.addEventListener('DOMContentLoaded', function () {
    //fetch the main content id
    var main = this.document.getElementById('main-content');
    //random number for showing off lazy images
    var counter = 10;
    //grab the picture element that holds all the data for the responsive image
    var picture = this.document.getElementById('picture');
    //for loop clones the element and appends it to main-content element.
    for (var i = 0; i < counter; i++) {
        var tmp = picture.cloneNode(true);
        main.append(tmp);
    }
});