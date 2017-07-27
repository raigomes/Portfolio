var controladorPortfolio = (

	function () {
		"use strict";

		const numeroDeJobs = 4;

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

				answer += `
				<div id="port${id}" class="port col-xs-12 col-sm-6 col-md-3" 
				onmouseover="controladorPortfolio.changePortfolioColor('#port${id} div');"
				onmouseout="controladorPortfolio.changePortfolioColor('#port${id} div');">
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

		function changePortfolioColor(seletor) {
			$(seletor).toggleClass("selected");
		}

		function insereValoresDefault(job, id) {
			var obj = new Object();

			obj.id = id;
			obj.titulo = (job == null || job.titulo == "") ? "Coming soon :)" : job.titulo;
			obj.url = (job == null || job.url == "") ? "https://github.com/raigomes" : job.url;
			obj.imageUrl = (job == null || job.imageUrl == "") ? "http://imageshack.com/a/img923/9206/KnZIEc.png" : job.imageUrl;

			return obj;
		}

		function buscaNovoPortfolioRequest() {
			//var url = "../Portfolio%20Page/data/portfolio.json";
			var url = "https://codepen.io/raigomes/pen/JJqWpL.js";
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

		return {
			carregaPortfolio: carregaPortfolio,
			changePortfolioColor: changePortfolioColor
		}
	}
)();