var links = [];
var casper = require('casper').create();
var args = require('system').args;
var url;

if (typeof args[6] != 'undefined' && args[6] == 'bing') {
	url = 'http://bing.com/search?q='+args[4];
	if (typeof args[5] != 'undefined') {
		url += '&first='+((args[5]*10)-9);
	}
} else if (typeof args[6] != 'undefined' && args[6] == 'yahoo') {
	url = 'http://fr.search.yahoo.com/search?q='+args[4];
	if (typeof args[5] != 'undefined') {
		url += '&first='+((args[5]*10)-9);
	}
} else {
	url = 'http://google.fr/custom?q='+args[4];
	if (typeof args[5] != 'undefined') {
		url += '&start='+((args[5]-1)*10);
	}
}

function getLinksBing() {
	return Array.prototype.map.call(document.querySelectorAll('li.b_algo'), function(e) {
		var title = e.querySelectorAll('h2 a')[0];
		return {rowtitle:title.textContent, rowhref:e.querySelectorAll(".b_attribution")[0].childNodes[0].textContent, rowdesc:e.querySelectorAll(".b_attribution")[0].childNodes[1].textContent};
	});
} 

function getLinksYahoo() {
	return Array.prototype.map.call(document.querySelectorAll('li.res'), function(e) {
		var desc = e.querySelectorAll(".st")[0];
		var title = e.querySelectorAll('h3 a')[0];
		return {rowtitle:title.textContent};
	});
}
		
function getLinksGoogle() {
	return Array.prototype.map.call(document.querySelectorAll('li .g'), function(e) {
		
		var desc = e.querySelectorAll(".std .s")[0];
		var title = e.querySelectorAll('h2.r a')[0];
        return {rowtitle:title.textContent, rowhref:title.getAttribute('href'), rowdesc:desc.textContent};
    });
}

casper.start(url, function() {
});

casper.then(function() {
	
	if (typeof args[6] != 'undefined' && args[6] == 'bing') {
    links = this.evaluate(getLinksBing);
	} else if (typeof args[6] != 'undefined' && args[6] == 'yahoo') {
    links = this.evaluate(getLinksYahoo);
	} else {
    links = this.evaluate(getLinksGoogle);
	}
});

casper.run(function() {
	if (links == null)
		this.echo('{ "results" : []}').exit();
	else
		this.echo(JSON.stringify(links)).exit();
});