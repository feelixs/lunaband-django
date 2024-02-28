function allOpacity(val) {
    var $imgs = $('img')
    $imgs.css('opacity', 0.5);
}

console.log("h")

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

var $don = $('#don-quixote-img');
$don.on('click', function() {
    loadHTML('https://trioluna.com/static/data/cervantes-data.html');
    allOpacity(0.5);
    $don.css('opacity', 1);
});

var $tale = $('#two-cities-img');
$tale.on('click', function() {
    loadHTML('https://trioluna.com/static/data/dickens-data.html');
    allOpacity(0.5);
    $tale.css('opacity', 1);
});

