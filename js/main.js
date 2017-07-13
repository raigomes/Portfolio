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

function carregaPortfolio() {
	var portfolio = document.getElementById("portfolio");
	var newPort = buscaNovoPortfolio();

	if(newPort != "") {
		portfolio.innerHTML = newPort;
	}
}

function buscaNovoPortfolio() {
	var jobs = buscaNovoPortfolioRequest();

	if(jobs == null || jobs.length == 0) {
		return "";
	}
	else{		

		return `<h1>Portfolio</h1><hr>
				<div class="container">
					<div class="row">
						${criaListaDeJobs(jobs)}
					</div>
				</div>
				`;
	}
}

function criaListaDeJobs(jobs) {
	var answer = "";

	for (var id = 0; id < numeroDeJobs; id++) {
		var job = (id < jobs.portfolio.length) ? jobs.portfolio[id] : null;

		job = insereValoresDefault(job, id);

		answer += `<div id="port${id}" class="col-xs-12 col-sm-6 col-md-3">
					<div class="thumbnail"><a href=${job.url}>
						<figure class="figure">
							<img src=${job.imageUrl} alt="${job.titulo}" class="figure-img img-fluid port-img" id="port-img-1">
							<figcaption class="figure-caption port-caption">${job.titulo}</figcaption>
						</figure>
					</a></div>
				</div>
				`
	}

	return answer;
}

function insereValoresDefault(job, id) {
	var obj = new Object();

	console.log("INPUT");
	console.log(job);

	obj.id = id;
	obj.titulo = (job == null || job.titulo == "") ? "Coming soon :)" : job.titulo;
	obj.url = (job == null || job.url == "") ? "https://github.com/raigomes" : job.url;
	obj.imageUrl = (job == null || job.imageUrl == "") ? "http://imageshack.com/a/img923/9206/KnZIEc.png" : job.imageUrl;

	console.log("OUTPUT");
	console.log(obj);

	return obj;
}

function buscaNovoPortfolioRequest() {
	var url = "../Portfolio%20Page/data/portfolio.json";
	var method = "GET";

	return getJSONData(url, method);
}

function getJSONData(url, httpMethod) {
	var request = new XMLHttpRequest();	
	var response;		

	request.onload = function() {		
		if(request.status >= 200 && request.status < 400) {
			console.log("SUCCESS: " + request.status);
			response = JSON.parse(request.responseText);
		}
		else {
			console.log("Erro no AJAX: StatusCode = " + request.status);
			response = null;
		}

	};

	request.onerror = function() {
		console.log("Erro geral: StatusCode = " + request.status);				

		response = null;		
	};	

	request.open(httpMethod, url, false);

	request.send();

	return response;
}