var homeTextFields = []
var homeDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    homeTextFields.push(new XMLDualLangTextField(`/static/data/xml/home.xml`, 0, $('#div1-text'), '&ensp;&ensp;&ensp;&ensp;'));
    homeTextFields.push(new XMLDualLangTextField(`/static/data/xml/home.xml`, 1, $('#div2-text'), '&ensp;&ensp;&ensp;&ensp;'));
    homeTextFields.push(new HTMLDualLangTextField(`/static/data/html/footer`, $('#footer-text')));
    homeTextFields.push(new HTMLDualLangTextField( `/static/data/html/copyright`, $('#copyright')));
    homeDualImages.push(new DualLangImage('https://trioluna.com/static/images/buttons/globe-white-en.webp',
        'https://trioluna.com/static/images/buttons/globe-white-es.webp', $('#change-language-img')))

    // load the current langague from the document's 'lang' attribute, which was set by the server (django)
    var currentLang = $('html').attr('lang');
    console.log(`Loading the user's current language as ${currentLang}`);
    loadPatreonButton();
    loadContentInLang(currentLang);
});

function loadPatreonButton() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            let client_id = xhr.responseText;
            let redirect_uri = "&redirect_uri=https://trioluna.com/gracias";
            let v2Params = "&scope=identity%20identity[email]";
            let url = `https://www.patreon.com/oauth2/become-patron?response_type=code$&min_cents=500&client_id=${client_id}${redirect_uri}${v2Params}`
            $('#patreon-button').html(`<a className="patreon-button link-button" data-patreon-widget-type="become-patron-button" href="${url}" rel="noreferrer" target="_blank">Become a Patron</a>`)
        }
    }
    xhr.open('GET', "https://trioluna.com/api/get/patreon-client/", true);
    xhr.send(null);
}

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */
    document.title = newlang === 'es' ? 'Luna | Inicio' : 'Luna | Home';
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    applyMainLanguageChange(language);
    applyNavLanguageChange(language);

    for (let i = 0; i < homeTextFields.length; i++) {
        homeTextFields[i].getText(language);
    }
    for (let i = 0; i < homeDualImages.length; i++) {
        homeDualImages[i].getImg(language);
    }
}
