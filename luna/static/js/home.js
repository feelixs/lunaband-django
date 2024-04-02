var homeTextFields = []
var homeDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    homeTextFields.push(new XMLDualLangTextField(`/static/data/xml/home.xml`, 0, $('#div1-text')));
    homeTextFields.push(new XMLDualLangTextField(`/static/data/xml/home.xml`, 1, $('#div2-text')));
    homeTextFields.push(new XMLDualLangTextField(`/static/data/xml/home.xml`, 2, $('#patreon-text')));
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
    // the default patreon button (precoded into the html) links to trioluna's patreon page
    // this function loads a new button which links directly to the patreon "subscribe" flow (we need a patreon API client to create this button)
    let client_id = "Lc5QkYNGyZbK-o385xIL_izwf7L9YeDX_7cZmSq5aNBg_W8xS0X2PxDuUu_Cv228";
    let redirect_uri = "&redirect_uri=https://trioluna.com/gracias";
    let v2Params = "&scope=identity%20identity[email]";
    let url = `https://www.patreon.com/oauth2/become-patron?response_type=code$&min_cents=500&client_id=${client_id}${redirect_uri}${v2Params}`
    $('#patreon-button').html(`<a id="patreon-subscribe-btn" class="patreon-subscribe-button" data-patreon-widget-type="become-patron-button" href="${url}" rel="noreferrer">Become a Patron</a>`)
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
