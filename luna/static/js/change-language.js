// we need to set this here to have its scope be everywhere, we'll change it later
// - each webpage has its own associated script, which will set the currentlang in document.ready
var currentLang = "en";


function toggleLanguage() {
    /*
       Swaps between Spanish and English, and update the page's text to the new lang
    */
    let oldLang = $('html').attr('lang'); // get the current language (the actual currentLang var might be out of date)
    if (oldLang === 'en') {
        currentLang = 'es';
    } else if (oldLang === 'es') {
        currentLang = 'en';
    }

    console.log(`Language changed from ${oldLang} to ${currentLang}`)

    /* TODO: will implement in the future
    // save the user's current language on the server (cookie)
    let setLangXHR = new XMLHttpRequest();
    setLangXHR.onload = function () {
        if (setLangXHR.status === 200) {
            console.log(`Cached '${currentLang}' as the user's current language`)
        } else {
            console.log(`Error caching '${currentLang}' as the user's current language`)
        }
    }
    setLangXHR.open('POST', `https://trioluna.com/api/set-language?language=${currentLang}`, true);
    setLangXHR.send(null);
    */

    document.documentElement.lang = currentLang; // update the page's lang attribute
    loadContentInLang(currentLang);
}

function applyNavLanguageChange(newLang) {
    /*
        Applies language change between english and spanish for the navigation bar's text
    */
    // manually update the nav's text fields
    var $homeNav = $('#home-nav');
    var $biosNav = $('#bios-nav');
    var $mediaNav = $('#media-nav');
    var $patreonNav = $('#patreon-nav');

    $homeNav.html(newLang === 'es' ? 'Inicio' : 'Home');
    $biosNav.html(newLang === 'es' ? 'Sobre' : 'About');
    $mediaNav.html(newLang === 'es' ? 'Medios' : 'Media');
    $patreonNav.html(newLang === 'es' ? 'Contacto' : 'Contact');
}

function HTMLDualLangTextField(baseDir, element) {
    /*
        A text field which can be converted between english and spanish.
        The files of the text in both languages must be fetched from the server prior to displaying any text.
    */
    this.baseDir = baseDir; // the name of the file - used as {path-to-baseDir}/{language}
    this.element = element; // the element whose inner html should be set to this.getText()
    this.getText = function(lang) {
        var xhr = new XMLHttpRequest();
        var thisObj = this; // store this as we'll need this scope inside the onload function
        xhr.onload = function () {
            if (xhr.status === 200) {
                $(thisObj.element).html(this.responseText); // if successful, set the innerhtml to the file contents
            } else {
                throw new Error(`${thisObj.xmlFile} - error fetching file`);
            }
        }
        xhr.open('GET', `https://trioluna.com${this.baseDir}/${lang}.html`, true);
        xhr.send(null);
    }
    return this
}

function XMLDualLangTextField(xmlFile, index, element, prependText='') {
    /*
        A text field which can be converted between english and spanish.
        The files of the text in both languages must be fetched from the server prior to displaying any text.
    */
    this.xmlFile = xmlFile; // path to the server's xml file containing all the fields' languages
    this.index = index;
    this.element = element; // the element whose inner html should be set to this.getText()

    this.getText = function(lang) {
        var xhr = new XMLHttpRequest();
        var thisObj = this; // store this as we'll need this scope inside the onload function
        xhr.onload = function() {
            if (xhr.status === 200) {
                var xmlContents = xhr.responseXML;
                let thisField = xmlContents.getElementsByTagName('field')[thisObj.index];
                $(thisObj.element).html(`${prependText}${thisField.getElementsByTagName(lang)[0].textContent}`); // if successful, set the innerhtml to the file contents
            } else {
                throw new Error(`${thisObj.xmlFile} - error fetching file`);
            }
        }
        xhr.open('GET', this.xmlFile, true);
        xhr.send(null);
    }
    return this
}

function DualLangImage(enPath, esPath, element) {
    this.enPath = enPath;
    this.esPath = esPath;
    this.element = element;
    this.getImg = function(lang) {
        // should display the opposite language of the current one
        // (the one that the button will change the webpage to if clicked)
        $(this.element).fadeOut('fast', () => {
            // update this image's src to display the correct language
            $(this.element).attr('src', lang === 'es' ? this.enPath : this.esPath).fadeIn('fast');
        });

    }
    return this
}
