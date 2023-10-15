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

