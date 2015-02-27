phantom.casperTest = true;var x = require('casper').selectXPath;var error = 0;var casper = require('casper').create({
            viewportSize: {
                width: 1280,
                height: 800
            }
        });
            casper.start('http://google.fr/', function() {
            var date = new Date();
            var pass = false;
            if(this.currentHTTPStatus==200)
                pass = true;
                this.echo(pass+';'+this.currentHTTPStatus+';null;'+this.getCurrentUrl()+';null;start;'+date.toJSON()+';null');
            });
        var captureError = function() {
        casper.then(function() {
            this.captureSelector('C:\wamp\www\google-scrap\mygooglescrap/public/php/capture/2/error.jpg','body', {
                    format: 'jpg',
                    quality: '70'
                });
        });
        };
        casper.then(function() {
            var date = new Date();
            var xpath =false;
            casper.waitFor(function check() {
                if(casper.exists('form[action="/search"]'))  {
                    return true;
                }
                else if(casper.exists(x('form[action="/search"]'))) {
                    xpath = true;
                    return true;
                }
                else {
                    return false;
                }
            }, function then() {
                if(xpath)
                {
                    pass = true;
                    try {
                        this.fill(x('form[action="/search"]'),{"q":"test"}, 1);
                    } catch (e) {
                        pass = false;
                    }
                }
                else
                {
                    pass = true;
                    try {
                        this.fill('form[action="/search"]',{"q":"test"}, 1);
                    } catch (e) {
                        pass = false;
                    }
                }
                if(pass === false && error === 0) {
                    captureError();
                    error++;
                }
                this.echo(pass+';null;true;'+this.getCurrentUrl()+';form[action="/search"];form;'+date.toJSON()+';{"q":"test"}');
            }, function timeout() {
                if(error === 0) {
                    captureError();
                    error++;
                }
                this.echo('false;null;false;'+this.getCurrentUrl()+';form[action="/search"];form;'+date.toJSON()+';{"q":"test"}');
            });
        });casper.then(function() {
            var date = new Date();
            var xpath =false;
            casper.waitFor(function check() {
                if(casper.exists('body'))  {
                    return true;
                }
                else if(casper.exists(x('body'))) {
                    xpath = true;
                    return true;
                }
                else {
                    return false;
                }
            }, function then() {
                if(xpath)
                {
                    this.captureSelector('C:\wamp\www\google-scrap\mygooglescrap/public/php/capture/2/1ccefe3ff559c9507e33f9e4fd764f01451.jpg',x('body'), {
                        format: 'jpg',
                        quality: 70
                    });
                }
                else
                {
                    this.captureSelector('C:\wamp\www\google-scrap\mygooglescrap/public/php/capture/2/1ccefe3ff559c9507e33f9e4fd764f01451.jpg','body', {
                        format: 'jpg',
                        quality: 70
                    });
                }
                this.echo('true;null;true;'+this.getCurrentUrl()+';body;captureSelector;'+date.toJSON()+';1ccefe3ff559c9507e33f9e4fd764f01451.jpg');
            }, function timeout() {
                if(error === 0) {
                    captureError();
                    error++;
                }
                this.echo('false;null;false;'+this.getCurrentUrl()+';body;captureSelector;'+date.toJSON()+';1ccefe3ff559c9507e33f9e4fd764f01451.jpg');
            });
        });casper.then(function() {
            var date = new Date();
            var xpath =false;
            casper.waitFor(function check() {
                if(casper.exists('body'))  {
                    return true;
                }
                else if(casper.exists(x('body'))) {
                    xpath = true;
                    return true;
                }
                else {
                    return false;
                }
            }, function then() {
                if(xpath)
                {
                    this.captureSelector('test/test.jpg',x('body'), {
                        format: 'jpg',
                        quality: 70
                    });
                }
                else
                {
                    this.captureSelector('test/test.jpg','body', {
                        format: 'jpg',
                        quality: 70
                    });
                }
                this.echo('true;null;true;'+this.getCurrentUrl()+';body;captureSelector;'+date.toJSON()+';test/test.jpg');
            }, function timeout() {
                if(error === 0) {
                    captureError();
                    error++;
                }
                this.echo('false;null;false;'+this.getCurrentUrl()+';body;captureSelector;'+date.toJSON()+';test/test.jpg');
            });
        });casper.run();