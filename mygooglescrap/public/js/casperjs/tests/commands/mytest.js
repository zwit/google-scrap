var links = [];
var casper = require('casper').create();
var args = require('system').args;
var url = 'http://google.fr/search?q='+String(args[4]);
if (typeof args[5] != 'undefined')
	url += '&start='+String(args[5]);
// function getLinks() {
    // var links = document.querySelectorAll('h3.r a');
	
	// var desc =  Array.prototype.forEach.call(document.querySelectorAll('li.g'), function(e) { 
		// var title = e.querySelectorAll('h3.r a')[0];
        // return new Array(title.textContent); 
	// })

	// return desc;
// }

function getLinks() {
    return Array.prototype.map.call(document.querySelectorAll('li.g'), function(e) {
		var desc = e.querySelectorAll(".st")[0];
		var title = e.querySelectorAll('h3.r a')[0];
        return '{"rowtitle":"'+title.textContent+'", "rowhref":"'+title.getAttribute("href")+'", "rowdesc":"'+desc.textContent+'"}';
    });
}

casper.start(url, function() {
    // search for 'casperjs' from google form
    //this.fill('form[action="/search"]', { q: String(args[4]) }, true);
	//this.click('h3.r a');
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo('{ "results" : [' + links.join(',') + ']}').exit();
});