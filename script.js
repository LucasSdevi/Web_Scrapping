function obterCursos() {
    //Fazendo requisição
    fetch("https://corsproxy.io/?https://fatecsaosebastiao.cps.sp.gov.br/")
        .then(resp => {
            if (resp.status != 200) {
                throw new Error("Erro na requisição.");
            }
            return resp.text();
        })


        //Transformando em html 
        .then(htmlText => {
            const doc = new DOMParser();
            const html = doc.parseFromString(htmlText, "text/html");

            //Seleção dos cursos no carrosel
            html.querySelectorAll(".carousel-inner").forEach(c => {
                let cursoscarousel = "";
                cursoscarousel += c.innerHTML;
                document.querySelector("#carrosel").innerHTML = cursoscarousel;
            });


        })
        .catch(err => {
            console.error("Erro: ", err);
        });
}

function pegaImagem(imagemurl) {

    fetch("https://corsproxy.io/?"+imagemurl)
        .then(resp => {

            if (resp.status != 200) {
                throw new Error("Erro ao buscar imagem.");
            }
            return resp.blob();
        })

        //criando objeto imagem
        .then(blob => {
            const imageurl = URL.createObjectURL(blob);


            const img = document.createElement("img");

            img.src = imageurl;


            document.getElementById("imagemdiv").innerHTML = "";

            //colocando imagem na div
            document.getElementById("imagemdiv").appendChild(img);
        })
        .catch(err => {
            console.error("Erro: ", err);
        });
}

function pegaLogo() {


    pegaImagem("https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/141/2024/10/fatec_sao_sebastiao.png");
}

window.onload = () => {



    document.getElementById("cursos").addEventListener("click", obterCursos);
    document.getElementById("imagem").addEventListener("click", pegaLogo);
};
