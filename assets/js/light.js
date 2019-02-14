function changeImage() {
    var image = document.getElementById('off');
    if (image.src.match("off")) {
        image.src = "assets/images/on.png";
    } else {
        image.src = "assets/images/off.png";
    }
}
setTimeout(changeImage,1500);

