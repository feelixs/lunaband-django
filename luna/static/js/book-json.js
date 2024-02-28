var $don = $('#don-quixote-img');
var $tale = $('#two-cities-img');
var $lord = $('#lotr-img');

$don.on('click', function() {
    loadJSON('http://trioluna.com/static/data/book-data.json', 0);
    allOpacity(0.5);
    $don.css('opacity', 1);
});

$don.on('click', function() {
    loadJSON('http://trioluna.com/static/data/book-data.json', 1);
    allOpacity(0.5);
    $tale.css('opacity', 1);
});

$don.on('click', function() {
    loadJSON('http://trioluna.com/static/data/book-data.json', 2);
    allOpacity(0.5);
    $lord.css('opacity', 1);
});


function allOpacity(val) {
    var $imgs = $('img')
    $imgs.css('opacity', 0.5);
}

function loadJSON(url, index) {
    var $details = $('#details');
    $details.html('');

    var req = new XMLHttpRequest();
    req.onload = function() {
        if (req.status === 200) {
            let jsonData = JSON.parse(req.responseText);
            let myBook = jsonData.books[index];
            let newTitle = $('<h3></h3>').html(`<b>Title: </b>${myBook.title}`);
            let p1 = $('<p></p>').html(`<b>Author: </b>${myBook.author}`);
            let p2 = $('<p></p>').html(`<b>Sold: </b>${myBook.sold} million`);
            let p3 = $('<p></p>').html(myBook.description);
            $details.append(newTitle).append(p1).append(p2).append(p3);
        }
    };
    req.open('GET', url, true);
    req.send(null);
}
