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

	if(jobs === null || jobs.length == 0) {
		return "";
	}
	else{
		var count = 1;

		/*return `<h1>Portfolio</h1><hr>
				<div class="container">
					<div class="row">
						${jobs.map(job => ${makeJobDiv(jobs, count++)})}
					</div>
				</div>
				`;
		S*/
	}
}

function makeJobDiv(jobs, id) {
	return `<div id="port${id}" class="col-xs-12 col-sm-6 col-md-3">
					<div class="thumbnail"><a href=${jobs.url}>
						<figure class="figure">
							<img src=${jobs.imageUrl} alt="" class="figure-img img-fluid port-img" id="port-img-1">
							<figcaption class="figure-caption port-caption">${jobs.titulo}</figcaption>
						</figure>
					</a></div>
				</div>`;
}

function buscaNovoPortfolioRequest() {
	return [`{  
         "id": 1,
         "titulo": "Tribute Page",
         "url": "https://codepen.io/raigomes/pen/BpVpxr",
         "imageUrl": "https://c2.staticflickr.com/4/3689/10613180113_fdf7bcd316_b.jpg"
      }`];
}