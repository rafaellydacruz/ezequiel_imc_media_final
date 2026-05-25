function abrirTab(index){
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(bnt => bnt.classList.remove('active'));
    document.querySelectorAll('.tab-content')[index].classList.add('active');
    document.querySelectorAll('.tab-btn')[index].classList.add('active')
}
function formatarResposta(resultado){
    if(resultado.erro){
        return `<div style="color:#721c24;padding:15px;background:#f8d7da;border:1px solid #f5c6cb;border-radius:5px;font-weight:bold">
            erro:${resultado.erro}<div/>`;
    }
    let html=`<div style="padding:15px;background:#d4eda;color#155724;border:1px solid #c3e6b;border-radius:5px;">`;
    html += `<h3 style="margin-top:0;margin-bottom:15px;border-bottom:1px solid #c3e6cb;padding-bottom:5px;">Sucesso</h3>`;
    html +=`<ul style="list-style-type: nome;padding-left:0;">`;

    for(const[key,value]of Object.entries(resultado)){
            let label=key.charAt(0).toLocaleUpperCase()+key.slice(1)
            if(key.toLowerCase() === "imc"){
                label="IMC";
            }
            html += `<li style="margin-bottom:8px;font-size:16px;">
            <strong style="color:#0b2e13">${label}:</strong> ${value}
            </li>`;
    }
    html+=`</ul>
    </div>`;
    return html;
}
    async function calcularImc(){
        const dados = {
            nome:  document.getElementById("nome").value,
            idade: document.getElementById("idade").value,
            altura: document.getElementById("altura").value,
            peso: document.getElementById("peso").value
        };

        try {
            const res = await fetch('http://localhost:3000/imc', {
                method: "POST", 
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(dados)
            });
            const resultado = await res.json();
            document.getElementById("resultadoImc").innerHTML = formatarResposta(resultado);
        } catch (erro) {
            document.getElementById("resultadoImc").innerHTML = formatarResposta({
                erro: "Ocorreu um erro inesperado. Por favor tente novemente mais tarde."
            });
        }
    }
    async function calcularMedia(){
        const dados = {
            nome:  document.getElementById("nome").value,
            nota1: document.getElementById("nota1").value,
            nota2: document.getElementById("nota2").value
        };

        try {
            const res = await fetch('http://localhost:3000/media', {
                method: "POST", 
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(dados)
            });
            const resultado = await res.json();
            document.getElementById("resultadoMedia").innerHTML = formatarResposta(resultado);
        } catch (erro) {
            document.getElementById("resultadoMedia").innerHTML = formatarResposta({
                erro: "Ocorreu um erro inesperado. Por favor tente novemente mais tarde."
            });
        }
    }

