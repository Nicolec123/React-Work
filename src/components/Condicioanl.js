import {useState} from 'react';


function Condicional(){


    const [email,setEmail]= useState()
    const [userEmail,setUserEmail]= useState()



    function enviarEmail(e){
        e.preventDefault();
        setUserEmail(email);
        console.log(userEmail);

       
    }

    function limparEmail(){
        setUserEmail();

       
    }

return(
        <div>
            <h1>Cadastre seu email:</h1>
            <input type="email"  placeholder="Insira seu email" onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit"  onClick={enviarEmail}>Enviar</button>
            {userEmail &&(

                <div>
                    <h2>Email enviado com sucesso!</h2>
                    <p>Seu email é: {userEmail}</p>
                    <buttom onClick={limparEmail}>Limpar</buttom>
                </div>

            )}
            <form>

            </form>
        </div>
     )
}

export default Condicional

//isso abaixo é um if (se tal cpisa)
//&& concatena para dizer no caso se tem um email de uauario execute isso 
//o abiri a chaves criou uma condição java script
// nO fim vsc consegue imporimir algo no templete anj tela baseado no que o usuario escreveu

/*{userEmail &&( 

    <div>
        <h2>Email enviado com sucesso!</h2>
        <p>Seu email é: {userEmail}</p>
    </div>

)}*/

