function phtml() {

    // faz a requisição

fetch("https://reqres.in/")
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error("Problema no servidor!");
            }
            return resp.text();
        })

        //tranforma em html 
        .then(text => {
            let d = new DOMParser();
            let html = d.parseFromString(text, "text/html");

            //aplica css na pagina 
            let links = html.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                let novoLink = document.createElement("link");
                novoLink.rel = "stylesheet";
                novoLink.href = link.href;
                document.head.appendChild(novoLink);
            });

            //insere o html obtido pela requisição no body 
            document.body.innerHTML = html.body.innerHTML;

        })
        .catch(err => {
            document.body.textContent = err.message;
        });
}



function botoes() {

document.getElementById("html").addEventListener("click", phtml)

}

window.onload = botoes;
