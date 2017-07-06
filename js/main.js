$(document).ready(function() {
	//carregaImagensLocais();
	//carregaPortfolio();
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function carregaImagensLocais() {	
	$("#sobre-foto img")
		.one('load', function() { console.log("Imagens carregadas com sucesso"); })
		.one('error', function() { console.log("Deu ruim"); })
		.each(function() {if(this.complete) $(this).load()});
	;
}

function carregaEmail() {	
	var answer = document.querySelectorAll(".form");	
	var url = "mailto:raigomes2 at hotmail dot com";		

	if(validaFormulario(answer)) {
		var senderName = answer[0].value;
		var senderEmail = answer[1].value;
		var senderPhone = answer[2].value;
		var senderMessage = answer[3].value;

		var subject = senderName + " deixou uma mensagem no seu site";
		var body = "[Nome: " + senderName + " Email: " + senderEmail + " Telefone: " + senderPhone + "]" + "\r\n\r\n" + senderMessage;

		url = normalizaEmail(url) + "?subject=" + substituiCaracteresEspeciais(subject) + "&body=" + substituiCaracteresEspeciais(body);

		console.log(url);
		window.open(url);

		limpaCamposForm(answer);

		alert("Dados enviados para seu cliente de email");
	}
	else {
		alert("Preencha os campos corretamente");
	}	
	
}

function validaFormulario(vector) {
	if(vector == null) return false;

	for(var i = 0; i < vector.length - 2; i++) {
		if(vector[i].value == "") return false;
	}

	return true;
}

function normalizaEmail(email) {
	return email.replaceAll(" at ", "@")
				.replaceAll(" dot ", ".")				
	;
}

function substituiCaracteresEspeciais(text) {
	return encodeURIComponent(text);
}

function limpaCamposForm(campos) {
	for (var i = campos.length - 2; i >= 0; i--) {
		campos[i].value = '';
	}
}