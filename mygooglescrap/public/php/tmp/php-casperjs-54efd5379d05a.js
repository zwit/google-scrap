var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    colorizerType: 'Dummy'
});
casper.userAgent('casper');
casper.start().then(function() {
    this.open('http://google.fr/', {
        headers: {
            'Accept': 'text/html'
        }
    });
});casper.then(function () {
    this.fill('form[action="/search"]', {"q":"search"}, true);
});casper.then(function() {
    this.captureSelector('test.jpg', '#hplogo');
});casper.then(function () {
    this.echo('[CURRENT_URL]' + this.getCurrentUrl());
    this.echo('[CURRENT_TITLE]' + this.getTitle());
    this.echo('[CURRENT_PAGE_CONTENT]' + this.getPageContent());
    this.echo('[CURRENT_HTML]' + this.getHTML());
});
casper.run();