const numeroDeJobs = 4;

$(document).ready(function() {
	//carregaImagensLocais();
	carregaPortfolio();
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/*function carregaImagensLocais() {	
	$("#sobre-foto img")
		.one('load', function() { console.log("Imagens carregadas com sucesso"); })
		.one('error', function() { console.log("Deu ruim"); })
		.each(function() {if(this.complete) $(this).load()});
	;
}*/

