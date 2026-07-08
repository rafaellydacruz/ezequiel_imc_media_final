if(window.location.pathname.endsWith('index.html') && !localStorage.getItem('token')){
    window.location.href='login.html';
}

function abrirTab(index){
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.querySelectorAll('.tab-content')[index].classList.add('active');
    document.querySelectorAll('.tab-btn')[index].classList.add('active');
}

function formatarResposta(resultado){

    if(resultado.erro){
        return `
        <div style="color:#721c24;padding:15px;background:#f8d7da;border:1px solid #f5c6cb;border-radius:5px;font-weight:bold">
            Erro: ${resultado.erro}
        </div>`;
    }

    let html = `
    <div style="padding:15px;background:#d4edda;color:#155724;border:1px solid #c3e6cb;border-radius:5px;">
    <h3 style="margin-top:0;margin-bottom:15px;border-bottom:1px solid #c3e6cb;padding-bottom:5px;">
    Sucesso
    </h3>
    <ul style="list-style-type:none;padding-left:0;">`;

    for(const [key,value] of Object.entries(resultado)){

        let label = key.charAt(0).toUpperCase() + key.slice(1);

        if(key.toLowerCase() === "imc"){
            label = "IMC";
        }

        html += `
        <li style="margin-bottom:8px;font-size:16px;">
            <strong style="color:#0b2e13">${label}:</strong> ${value}
        </li>`;
    }

    html += `
    </ul>
    </div>`;

    return html;
}


async function logar(){

    const dados = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    try{

        const res = await fetch('http://localhost:3000/login',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(dados)
        });

        const resultado = await res.json();

        if(resultado.token){

            localStorage.setItem("token",resultado.token);
            window.location.href="index.html";

        }else{
            alert(resultado.erro);
        }

    }catch(erro){

        alert("Ocorreu um erro inesperado. Por favor tente novamente mais tarde.");

    }
}


function logout(){

    localStorage.removeItem('token');
    window.location.href='login.html';

}



async function cadastrarClientes(){

    const dados = {

        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        cep: document.getElementById("cep").value,
        rua: document.getElementById("rua").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        numero: document.getElementById("numero").value

    };


    try{

        const res = await fetch('http://localhost:3000/clientes',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(dados)
        });


        const resultado = await res.json();


        document.getElementById("resultadoImc").innerHTML =
        formatarResposta(resultado);


        document.getElementById("nome").value="";
        document.getElementById("cpf").value="";
        document.getElementById("cep").value="";
        document.getElementById("rua").value="";
        document.getElementById("cidade").value="";
        document.getElementById("estado").value="";
        document.getElementById("numero").value="";


    }catch(erro){

        document.getElementById("resultadoImc").innerHTML =
        formatarResposta({
            erro:"Ocorreu um erro inesperado. Por favor tente novamente mais tarde."
        });

    }

}



async function cadastrarUsuario(){

    const dados = {

        nome:document.getElementById("nome").value,
        email:document.getElementById("email").value,
        senha:document.getElementById("senha").value

    };


    try{

        const res = await fetch('http://localhost:3000/usuarios',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(dados)
        });


        const resultado = await res.json();


        if(resultado.token){

            localStorage.setItem("token",resultado.token);
            window.location.href="index.html";

        }else{

            alert("Cadastro inválido");
    
        }


    }catch(erro){

        alert("Falha na comunicação com o servidor.");

    }

}



async function calcularMedia(){

    const dados = {

        nome:document.getElementById("nome").value,
        email:document.getElementById("email").value,
        senha:document.getElementById("senha").value

    };


    try{

        const res = await fetch('http://localhost:3000/usuarios',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(dados)
        });


        const resultado = await res.json();


        document.getElementById("resultadoMedia").innerHTML =
        formatarResposta(resultado);


    }catch(erro){

        document.getElementById("resultadoMedia").innerHTML =
        formatarResposta({
            erro:"Ocorreu um erro inesperado. Por favor tente novamente mais tarde."
        });

    }

}



function buscarEndereco(){

    const cep = document.getElementById('cep').value;


    fetch(`https://viacep.com.br/ws/${cep}/json/`)

    .then(response=>{

        if(!response.ok){

            throw new Error("Erro na requisição: "+response.status);

        }

        return response.json();

    })


    .then(data=>{

        document.getElementById('rua').value=data.logradouro;
        document.getElementById('cidade').value=data.localidade;
        document.getElementById('estado').value=data.uf;
        document.getElementById('numero').focus();

    })


    .catch(error=>{

        console.error(error);

    });

}