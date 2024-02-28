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
            let newTitle = $('<h3></h3>').html(`<b>Title: </b>${myBook.getElementsByTagName('title')[0]}`);
            let p1 = $('<p></p>').html(`<b>Author: </b>${myBook.getElementsByTagName('author')[0]}`);
            let p2 = $('<p></p>').html(`<b>Sold: </b>${myBook.getElementsByTagName('sold')[0]}`);
            let p3 = $('<p></p>').html(myBook.getElementsByTagName('description')[0]);
            $details.append(newTitle).append(p1).append(p2).append(p3);
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