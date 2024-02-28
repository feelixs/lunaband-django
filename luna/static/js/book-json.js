function allOpacity(val) {
    var $imgs = $('img')
    $imgs.css('opacity', 0.5);
}

function loadJSON(url) {
    let detailsElm = document.getElementById('details');

    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.status === 200) {
            detailsElm.innerHTML = req.responseText;
        }
    };
    req.open('GET', url, true);
    req.send(null);
}

loadJSON('http://trioluna.com/static/data/book-data.json')
