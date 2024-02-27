
var btn = document.getElementById('ajaxbtn');

btn.addEventListener(('click'), makereq, false);


function makereq() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('main-contents').innerHTML = xhr.responseText;
        }
    };

    xhr.open('GET', 'https://trioluna.com/static/data/data.html', true);
    xhr.send(null);
}
