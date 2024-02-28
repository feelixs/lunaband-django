function allOpacity(val) {
    var $imgs = $('img')
    $imgs.css('opacity', 0.5);
}

function loadXML(url, index) {
    var $details = $('#details');
    $details.html('');

    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.status === 200) {
            let response = req.responseXML;
            let books = response.getElementsByTagName('book');
            let myBook = books[index];
            $details.append(`<h3>${myBook.getElementsByTagName('title')[0]}<\/h3>`)
        }
    };
    req.open('GET', url, true);
    req.send(null);
}

loadXML('http://trioluna.com/static/data/book-data.xml', 0);

var $don = $('#don-quixote-img');
$don.on('click', function() {
    loadXML('http://trioluna.com/static/data/book-data.xml', 0);
    allOpacity(0.5);
    $don.css('opacity', 1);
});