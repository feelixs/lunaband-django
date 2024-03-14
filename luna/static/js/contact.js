var cntTextFields = []
var cntDualImages = []

$(document).ready(function () {
    /*
        Load this page's content in the default language when the page loads.
    */
    $('#send_email_form').on('submit', send_email);

    cntTextFields.push(new XMLDualLangTextField(`/static/data/xml/contact.xml`, 0, $('#contact-desc')));
    cntTextFields.push(new HTMLDualLangTextField(`/static/data/html/footer`, $('#footer-text')));
    cntTextFields.push(new HTMLDualLangTextField( `/static/data/html/copyright`, $('#copyright')));
    cntDualImages.push(new DualLangImage('https://trioluna.com/static/images/buttons/globe-white-en.webp',
        'https://trioluna.com/static/images/buttons/globe-white-es.webp', $('#change-language-img')))

    // load the current langague from the document's 'lang' attribute, which was set by the server (django)
    var currentLang = $('html').attr('lang');
    console.log(`Loading the user's current language as ${currentLang}`);
    loadContentInLang(currentLang);
})

function applyMainLanguageChange(newlang) {
    /*
        Applies language change to the page's main text, this will be overriden for each page
    */
    var $contactTitle = $('#page-title');
    var $emailTitle = $('#contact-email-header');
    var $msgTitle = $('#contact-msg-header');

    // update page title, nav text, and various titles across the page
    document.title = newlang === 'es' ? 'Luna | Contacto' : 'Luna | Contact';
    $contactTitle.html(newlang === 'es' ? 'Contacto' : 'Contact Us');
    $emailTitle.html(newlang === 'es' ? 'Tu correo electrónico:' : 'Your Email:');
    $msgTitle.html(newlang === 'es' ? 'Tu Mensaje:' : 'Your Message:');
}

function loadContentInLang(language) {
    /*
        This is run when the page initially loads, and whenever the language is changed.
    */
    applyMainLanguageChange(language);
    applyNavLanguageChange(language);
    for (let i = 0; i < cntTextFields.length; i++) {
        cntTextFields[i].getText(language);
    }
    for (let i = 0; i < cntDualImages.length; i++) {
        cntDualImages[i].getImg(language);
    }
}

function send_email(event) {
    event.preventDefault();

    let from = $('#email_input').val();
    let message = $('#message_input').val();

    console.log(from, message);
    $.ajax({
        type: 'POST',
        url: 'https://trioluna.com/api/send-email/',
        data: {
            from: from,
            to: "help.felixcreations@gmail.com",
            message: message,
            subject: "test!",
        },
        headers: {
            'Authorization': '1234' // TODO update
        },
        success: function(response) {
            console.log('Email sent successfully:', response);
        },
        error: function(xhr, status, error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    });
}
