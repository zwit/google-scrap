var links = [];
var casper = require('casper').create();
var args = require('system').args;
var url = 'http://google.fr/search?q='+String(args[4]);

if (typeof args[5] != 'undefined')
	url += '&start='+String(args[5]);

function getLinks() {
    return Array.prototype.map.call(document.querySelectorAll('li.g'), function(e) {
		var desc = e.querySelectorAll(".st")[0];
		var title = e.querySelectorAll('h3.r a')[0];
        return {rowtitle:title.textContent, rowhref:e.querySelectorAll(".kv")[0].childNodes[0].textContent, rowdesc:desc.textContent};
    });

	
	//return document.querySelectorAll('li.g')[0].querySelectorAll('h3.r a')[0].textContent;
}

casper.start(url, function() {
});

casper.then(function() {
	//casper.echo(casper.cli.get(0));
    links = this.evaluate(getLinks);
});

casper.run(function() {
	if (links == null)
		this.echo('{ "results" : []}').exit();
	else
		this.echo(JSON.stringify(links)).exit();
});