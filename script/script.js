var cuentaActiva=null;

function start() {
    document.getElementById("iniciosesion").style.display = "block";

  
  
}

function guardarCookie(){
    var NIA=document.getElementById('formNIA').value;
    var contraseña=document.getElementById('formcontraseña').value;
    var nombre=document.getElementById('formnombre').value;
    var apellidos=document.getElementById('formapellidos').value;
    var email=document.getElementById('formemail').value;
    var roles=document.getElementById('formrol').selectedOptions[0].value;
    var sep="#";
    var cookieCompleta=email+"="+contraseña+sep+nombre+sep+apellidos+sep+roles+sep+NIA;
    document.cookie=cookieCompleta;
    
    document.getElementById('vertical-line').style.display="none";
    document.getElementById('registro').style.display="none";
    document.getElementById('iniciosesion').style.paddingTop="2%";
    document.getElementById('iniciosesion').style.width="100%";
    document.getElementById('formularios').style.marginLeft="38%";
    document.getElementById('formularios').style.marginRight="35%";
    document.getElementById('formularios').style.width="25%";
    
} 

function desplegarRegistro(){
    document.getElementById('vertical-line').style.display="inline-block";
    document.getElementById('registro').style.display="block";
    document.getElementById('iniciosesion').style.paddingTop="10%";
    document.getElementById('formularios').style.marginLeft="20%";
    document.getElementById('formularios').style.marginRight="20%";
    document.getElementById('formularios').style.width="58.33%";
    document.getElementById('iniciosesion').style.width="40%";
    
}

function obtenerCookie(email){
    var emailigual=email+"=";
    var restoCookie=document.cookie.split(emailigual)[1];
    if(!restoCookie){
        alert("Este correo no tiene una cuenta vinculada");
        location.reload();
    }
    var valoresCookie=restoCookie.split("#");
    return valoresCookie;
}

function inicioSesion(){
    var emailInicio=document.getElementById('inicioemail').value;
    var contraseñaInicio=document.getElementById('iniciocontraseña').value;
    var elementosCookie=obtenerCookie(emailInicio);
    var contraseñaCookie=elementosCookie[0];
    var rolCookie=elementosCookie[1];
    if(contraseñaInicio===contraseñaCookie){
        cuentaActiva=emailInicio;
        alert(cuentaActiva);
        /*window.addEventListener("resize", responsive);
        document.getElementById('inicioformulario').style.display="none";
        document.getElementById('menucabecera').style.display="block";
        document.getElementById('perfil').style.display="inline";*/
        if(rolCookie==="Estudiante"){
            estudiante();
        }else{
            adminprofe();
        }
        /*document.getElementById('nombreusuario').innerHTML=usernameCookie;
        responsive();
        Inicio();*/
    }
}

