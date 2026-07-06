async function logar(){
    const dados = {
        email:  document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };

    try {
        const res = await fetch('http://localhost:3000/login', {
            method: "POST", 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(dados)
        });
        const resultado = await res.json();
        if(resultado.token){
            localStorage.setItem("token", resultado.token);
            window.location.href = "index.html";
        }

           else{ alert(resultado.erro) }
       
            
    } catch (erro) {
            erro: "Ocorreu um erro inesperado. Por favor tente novemente mais tarde."
    }
}