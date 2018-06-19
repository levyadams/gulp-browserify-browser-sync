// Set things up.
window.addEventListener("load", function (event) {
  createObserver();
}, false);
function createObserver() {
  var options = {
    root: null,
    rootMargin: "0px",
    threshold: .01
  };
  const images = document.querySelectorAll('#lazy-img');
  const observer = new IntersectionObserver(handleIntersect, options);
  images.forEach(image => {
    observer.observe(image);
  });

}

function handleIntersect(entries, observer) {

  // Loop through the entries
  entries.forEach(entry => {
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {
      // Stop watching and load the image
      let image = entry.target;
      let url = image.getAttribute('data-src');
      image.setAttribute('src',url);
      observer.unobserve(entry.target);
    }
  });
}
