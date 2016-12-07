var crypto = require('crypto');
var express = require('express');
var app = express();
var blowfishCipher = crypto.createCipher('blowfish', "asdf");

app.locals.root_path = __dirname;


var crypting = function( text, algorithm, crypt ){
	var cipher;
	var dec;
	if(!!crypt){
		cipher = crypto.createCipher( algorithm, "asdf");
		dec = cipher.update(text, 'utf8', 'hex');
		return dec + cipher.final('hex');
	}else{
		cipher = crypto.createDecipher( algorithm, "asdf" );
		dec = cipher.update(text, 'hex', 'utf8' );
		return dec + cipher.final('utf8');
	}
}

app.get('/', function(req, res){
	var word = "El gato",
		crypt = {
			'des3': crypting( word, "des3", 1),
			'blowfish': crypting(word, "blowfish",1)
		},
		uncrypt = {
			'des3': crypting( crypt.des3, "des3"),
			'blowfish': crypting( crypt.blowfish, "blowfish")
		}

	var output = {
		'word': word,
		'crypt': crypt,
		'uncrypt': uncrypt

	}
	res.json(output);
});

var port = 8000;

app.listen(port,function() {
	console.log('http://localhost:'+port);
});