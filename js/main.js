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

function carregaPortfolio() {
	var portfolio = document.getElementById("portfolio");
	var newPort = buscaNovoPortfolio();

	if(newPort != "") {
		portfolio.innerHTML = newPort;
	}
}

function buscaNovoPortfolio() {
	var jobs = buscaNovoPortfolioRequest();

	console.log(jobs);

	if(jobs == null || jobs.length == 0) {
		console.log("entrou");
		return "";
	}
	else{
		var count = 1;

		return `<h1>Portfolio</h1><hr>
				<div class="container">
					<div class="row">
						${jobs.map(job => makeJobDiv(job, count++))}
					</div>
				</div>
				`;
	}
}

function makeJobDiv(job, id) {
	//console.log(job);
	return `<div id="port${id}" class="col-xs-12 col-sm-6 col-md-3">
					<div class="thumbnail"><a href=${job.url}>
						<figure class="figure">
							<img src=${job.imageUrl} alt="" class="figure-img img-fluid port-img" id="port-img-1">
							<figcaption class="figure-caption port-caption">${job.titulo}</figcaption>
						</figure>
					</a></div>
				</div>`;
}

function buscaNovoPortfolioRequest() {
	var url = "../Portfolio%20Page/data/portfolio.json";
	var method = "GET";

	return getJSONData(url, method);
}

function getJSONData(url, httpMethod) {
	var request = new XMLHttpRequest();	
	var response;

	request.open(httpMethod, url, true);

	request.onload = function() {		
		if(request.status >= 200 && request.status < 400) {
			console.log("SUCCESS: " + request.status);
			response = JSON.parse(request.responseText);
		}
		else {
			console.log("Erro no AJAX: StatusCode = " + request.status);	
			response = null;
		}

		console.log(response);
		return response;
	};

	request.onerror = function() {
		console.log("Erro geral: StatusCode = " + request.status);		

		return null;
	};

	request.send();

	//return response;
}