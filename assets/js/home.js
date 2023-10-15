$(document).ready(function(){
    $.ajax({
        url: "http://localhost:8000/api/pacotes", // URL para a qual você deseja fazer a requisição
        type: "GET", // Método da requisição (GET, POST, PUT, DELETE, etc.)
        dataType: "json", // Tipo de dados que você espera receber
        success: function(data) {
            //console.log(data.data[0].nome);
            let contents = data.data; 
            for (let content of contents){
                var option = $("<option>");
                    option.val(content.valorFinal).text(content.nome);
                    $("#pacotes").append(option);       
            }
            for (let content of contents){
                var option = $("<option>");
                    option.val(content.quantidadePlacas).text(content.nome);
                    $("#quantidadePlacas").append(option);       
            }
            // for (let content of contents){
            //     var option = $("<option>");
            //         option.val(content.valorFinal).text(content.nome);
            //         $("#pacotes").append(option);       
            // }
    //usar 3 for talvez nao seja tao eficiente porem e momentaneamente mais facil
        },
        error: function(xhr, status, error) {
            console.error("Erro na requisição:", status, error);
        }
    });
});

$('#budget-form').submit(function(event) {
    event.preventDefault();
    sendBudget();
});

$('#economy-form').submit(function(event) {
    event.preventDefault();
    sendEconomy();
});

function sendBudget(){

    var jsonContent = {
        valorPacote : $('#pacotes').val(),
        placasAdicionais : $('#quantidade').val()
    } 
    
    $.ajax({
        url: 'http://localhost:8000/api/budget', // Substitua pela URL da sua API
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonContent),
        success: function(response) {
            $('#resultado').val(response).prop('disabled', true);
        },
        error: function(error) {
            console.error('Erro na requisição:', error);
        }
    });

}

function sendEconomy(){
    var jsonContent = {
        quantidadePlacas : $('#quantidadePlacas').val(),
        quantidadePlacasAdicionais : $('#quantidadeAdicional').val(),
        usoCliente : $('#consumoMedio').val()
    }
    //console.log(jsonContent);
    $.ajax({
        url: 'http://localhost:8000/api/economy', 
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonContent),
        success: function(response) {
            console.log(response);
            //$('#resultadoEconomy').val(response).prop('disabled', true);
            //pensar melhor na logica depois
        },
        error: function(error) {
            console.error('Erro na requisição:', error);
        }
    });

}
