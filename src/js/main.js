inquilinos = [
    {"codigo":1,"nombre":"fistro1","apellidos":"de la pradera1","dni":"14612750A","email":"a@a.com","telefono":3464566},
    {"codigo":2,"nombre":"fistro2","apellidos":"de la pradera2","dni":"14612750B","email":"a@a.com","telefono":3464566},
    {"codigo":3,"nombre":"fistro3","apellidos":"de la pradera3","dni":"14612750C","email":"a@a.com","telefono":3464566},
    {"codigo":4,"nombre":"fistro4","apellidos":"de la pradera4","dni":"14612750D","email":"a@a.com","telefono":3464566}
];

$.noConflict();
jQuery(document).ready(function($){
//código a ejecutar cuando el DOM está listo para recibir instrucciones.
    $("#contactForm").on("submit", validarFormulario);
    $("#borrartodos").click(function (event){
        if ($(this).is(":checked")){
            $("tbody input[type=checkbox]").prop("checked", true);
        }else {
            $("tbody input[type=checkbox]").prop("checked", false);
        }
    });


    function validarFormulario(){
        //Recoger valores de la vista
        //var pdni = document.getElementById("dni").value;
        var pdni = $("#dni").val();
        var pnombre = $("#nombre").val();
        var papellidos = $("#apellidos").val();
        var ptelefono = $("#telefono").val();
        var valido = false;

        var dniValido = validarDNI(pdni);
        var nombreValido = validarNombre(pnombre);
        var apellidoValido = validarApellidos(papellidos);
        var telefonoValido = validarTelefono(ptelefono);


        //Evaluarlos
        //En funcion del resultado se envian o no

        if (dniValido&&nombreValido&&apellidoValido&&telefonoValido){
            //document.getElementById(contactForm).submit();
            //$("#contactForm").submit();
            valido = true;
        }else{
            //Mostrar mensaje de error
            if (!dniValido) {
                $("#dni").siblings("div.text-error").text("DNI no valido");
            }
            if(!nombreValido){
                $("#nombre").siblings("div.text-error").text("Nombre no valido");
            }
            if(!apellidoValido){
                $("#apellidos").siblings("div.text-error").text("Apellidos no validos");
            }
            if(!telefonoValido){
                $("#telefono").siblings("div.text-error").text("Telefono no valido");
            }
        }
        return valido;
    }
    cargarArrayInquilinos();
    function cargarArrayInquilinos() {
        if (inquilinos.length > 0) {
            // Recorre el array
            for (var i=0; i < inquilinos.length; i++) {
                // Añadir el HTML a la pagina
                // <td><tr>Dato</td><td><tr>Dato</tr></td><td><tr>Dato</tr></td><td><tr>Dato</tr></td><td><tr>Dato</tr></td><td><tr>Dato</tr></td>
                console.log(i);
                var botonEditar = "<button>Editar</button>";
                var botonBorrar = "<button>Borrar</button>";
                var texto = "<tr><td><input type='checkbox' value='" + i + "'></td><td>" + inquilinos[i].nombre + "</td><td>" + inquilinos[i].apellidos+ "</td><td>" + inquilinos[i].dni + "</td><td>" + inquilinos[i].telefono + "</td><td>"+botonEditar+botonBorrar+"</td></tr>";
                $("#tablaInquilinos tbody").append(texto);
            }
            $("#tablaInquilinos tfoot td").html("<span class='text-error'>Total Inquilinos</span>" + inquilinos.length);

        }else{
            $("#tablaInquilinos").remove();
            $("#listadoInquilinos").text("No se han encontrado inquilinos...");
        }
    }
});

function validarNombre(nombre){
    const pattern = new RegExp("[a-zA-Z]{3,}");
    return pattern.test(nombre);
}

function validarApellidos(apellidos){
    const pattern = new RegExp("[a-zA-Z]{7,}");
    return pattern.test(apellidos);
}

function validarTelefono(telefono){
    var valido = true;
    const pattern = new RegExp("\d{9}");
    if(telefono != ""){
        valido = pattern.test(telefono);
    }
    return valido;
}


function validarDNI(dni){
    var valido = false;
    const pattern = new RegExp("/^\d{8}[a-zA-Z]$/;");
    if (pattern.test(dni)){
        var numeros = parseInt(dni.substring(0, (dni.length -1), 10));
        var letra = dni.substring(dni.length -1, 1);
        numeros = numeros % 23;
        letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        letras = letras.substring(numeros, numeros+1);
        if (letras == letra.toUpperCase() ) {
            valido = true;
        }
    }
    return valido;
}
