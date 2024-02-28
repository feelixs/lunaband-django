console.log('hello');

var $imgs = $('img').css('opacity', '0.5');


function loadHTML(url) {
    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.status === 200) {
            $('#details').html(req.responseText);
        }
    };
    req.open('GET', url, true);
    req.send(null);
}