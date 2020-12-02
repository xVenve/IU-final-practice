var cuentaActiva = null;


$(document).ready(function(){
    $("#calendario").simpleCalendar({
        months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','November','Diciembre'],
        days: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
        displayYear: true,              // Display year in header
        fixedStartDay: true,            // Week begin always by monday or by day set by number 0 = sunday, 7 = saturday, false = month always begin by first day of the month
        displayEvent: true,             // Display existing event
        disableEventDetails: false,     // disable showing event details
        disableEmptyDetails: true,      // disable showing empty date details
        events: [{
            startDate: new Date("2020-12-05 21:35"),
            endDate: new Date("2020-12-05"),
            summary: 'CUMPLEAÑOS DE LA FANTÁSTICA Y MARAVILLOSA NURIA GARCÍA ROZAS'
        },{
            startDate: new Date("2020-12-06"),
            endDate: new Date("2020-12-06"),
            summary: 'DIA DE LA CONSTITUCION DE ESPAÑITA'
        }
        ]});
});

function start() {
    document.getElementById('iniciosesion').style.paddingTop = "2%";
    document.getElementById('iniciosesion').style.width = "100%";
    document.getElementById('formularios').style.marginLeft = "38%";
    document.getElementById('formularios').style.marginRight = "35%";
    document.getElementById('formularios').style.width = "25%";
}

function guardarCookie() {
    var contraseña = document.getElementById('formcontraseña').value;
    var nombre = document.getElementById('formnombre').value;
    var apellidos = document.getElementById('formapellidos').value;
    var email = document.getElementById('formemail').value;
    var roles = document.getElementById('formrol').selectedOptions[0].value;
    var NIA = document.getElementById('formNIA').value;
    var sep = "#";
    var cookieCompleta = email + "=" + contraseña + sep + nombre + sep + apellidos + sep + roles + sep + NIA;
    document.cookie = cookieCompleta;
    
    $("#vertical-line").fadeOut("slow");
    $("#registro").fadeOut("slow");
    start();
}

function desplegarRegistro() {
    $("#vertical-line").fadeIn("slow");
    $("#registro").fadeIn("slow");
    document.getElementById('vertical-line').style.display = "absolute";
    document.getElementById('registro').style.display = "block";
    document.getElementById('iniciosesion').style.paddingTop = "10%";
    document.getElementById('formularios').style.marginLeft = "20%";
    document.getElementById('formularios').style.marginRight = "20%";
    document.getElementById('formularios').style.width = "58.33%";
    document.getElementById('iniciosesion').style.width = "40%";
}


function desplegar_contenido(x){
    var contenido = document.getElementById(x);
    $(contenido).slideToggle();
}

function desplegar_asignatura(x){
    var asignatura = document.getElementById(x);
    asignatura.style.display ="block";
    var home = document.getElementById("div_content");
    home.style.display ="none";
    $(".barralateralderecha").show();
}
 
function desplegar_contenido_barra(x){

    $(".div_content").hide();
    $("#IU").hide();
    $("#foroasignatura").hide();
    $("#calificaciones").hide();
    var contenido = document.getElementById(x);
    contenido.style.display = "block";

}

function obtenerCookie(email) {
    var emailigual = email + "=";
    var restoCookie = document.cookie.split(emailigual)[1];
    if (!restoCookie) {
        alert("Este correo no tiene una cuenta vinculada");
        location.reload();
    }
    var valoresCookie = restoCookie.split("#");
    return valoresCookie;
}

function inicioSesion() {
    var emailInicio = document.getElementById('inicioemail').value;
    var contraseñaInicio = document.getElementById('iniciocontraseña').value;
    var elementosCookie = obtenerCookie(emailInicio);
    var contraseñaCookie = elementosCookie[0];
    var rolCookie = elementosCookie[3];
    var usernameCookie = elementosCookie[1] + " " + elementosCookie[2];
    if (contraseñaInicio === contraseñaCookie) {
        cuentaActiva = emailInicio;
        //window.addEventListener("resize", responsive);
        document.getElementById('formularios').style.display="none";
        document.getElementById('cabecera2').style.display="block";
        document.getElementById('principal').style.display="flex";
        document.getElementById('perfil').style.display="inline";
        document.getElementById('abajo').style.display="block";
        document.getElementById('lateral').style.display="block";
        
        if (rolCookie === "Estudiante") {
            estudiante();
        } else if(rolCookie === "Profesor"){
            profesor();
        }else{
            administrador();
        }
        document.getElementById('nombreusuario').innerHTML=usernameCookie;
        /*responsive();
        Inicio();*/
    }
}

function estudiante(){
    $(".admin").hide();
    $(".profesor").hide();
    $(".estudiante").show();
    crear_notas();
    $("#TABLA_ESTUDIANTE").show();

   
}

//MOSTRAR ROL PROFESOR
function profesor(){
    $(".admin").hide();
    $(".estudiante").hide();
    $(".profesor").show();
}

function administrador(){
    $(".profesor").hide();
    $(".estudiante").hide();
    $(".admin").show();
}

function cerrarSesion(){
    var confirmacion=confirm("¿Quieres cerrar sesión?");
    if(confirmacion){
        start();
        $("#principal").hide();
        $("#formularios").show();
        $("#perfil").hide();
        $("#cabecera2").hide();
        $("#abajo").hide();
}
}

function Inicio(){
    $("#div_content").show();
    $("#IU").hide();
    $("#calificaciones").hide();
    $(".barralateralderecha").hide();

}
//ABRIR Y CERRAR UN HILO DEL FORO
function alternarForo(x){
    var mensajesForo=document.getElementById('hilo'+ x);
    $(mensajesForo).slideToggle();
}

//ENVIAR MENSAJE POR EL FORO
function enviarMensajeForo(i){
    var mensaje=document.getElementById("usermensaje"+i).value;
    var cookieActual=obtenerCookie(cuentaActiva);
    var nombre=cookieActual[1]+' '+cookieActual[2];
    var hoy= new Date();
    var fecha =hoy.getHours() + ":" + hoy.getMinutes() + " "+ hoy.getDate() + "/" + (hoy.getMonth()+1) + "/" + hoy.getFullYear();
    $("#mensajesforo"+i).append('<div class="mensajeusuarioenvio"> <div class="informacionusuario"> <div class="fechamensajeenvio">'+
    '<p>'+fecha+'</p></div>'+
    '<div class="nombreestudianteenvio"><p>'+nombre+'</p> </div>'+
    '<div class="estudianteconversacion">'+
    '<img src="./images/usericon.png" id="usericon" alt="usericon"></div>'+
    '</div><div class="mensajeforo"><p>'
    +mensaje+'</p></div></div>');
    var numReplicas=Number(document.getElementById("replicas"+i).textContent);
    document.getElementById("replicas"+i).innerHTML=numReplicas+1;
    document.getElementById('ultimomensaje'+i).innerHTML=fecha;
    document.getElementById("usermensaje"+i).value="";
}

//Métodos para descargar la tabla de calificaciones en formato excel.
$(".export_e").click(function () {
  $("#TABLA_ESTUDIANTE").table2excel({
    // exclude CSS class
    exclude: ".noExl",
    name: "Data",
    filename: "calificaciones" //do not include extension
  });
});

$(".export_p").click(function () {
  $("#TABLA_PROFESOR").table2excel({
    // exclude CSS class
    exclude: ".noExl",
    name: "Data",
    filename: "calificaciones" //do not include extension
  });
});

//Método para generar aleatoriamente las notas de calificaciones.
function crear_notas() {
  var a1 = document.getElementById("act1").innerHTML = Math.floor(Math.random() * 1000) / 100;
  var a2 = document.getElementById("act2").innerHTML = Math.floor(Math.random() * 1000) / 100;
  var a3 = document.getElementById("act3").innerHTML = Math.floor(Math.random() * 1000) / 100;
  var m = document.getElementById("media").innerHTML = Math.floor((a1 + a2 + a3) * 100 / 3) / 100;
}
