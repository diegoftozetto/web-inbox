$(document).ready(function(){
	
	listarCaixaEntrada();

	$("#btnNovaMensagem").click(function(){
			$("#dvListaConteudo").addClass("dvEsconde");
			$("#dvNovaMensagem").removeClass("dvEsconde");

			$("#tdItemMenu").html("");
			$("#tdItemMenu").append("Nova Mensagem");

			$("#inPara").removeClass("erro");
			$("#inAssunto").removeClass("erro");
			$("#inTexto").removeClass("erro");
			$("#inM1").removeClass("erro");
			$("#inM2").removeClass("erro");

			$("#inPara").val("");
			$("#inCc").val("");
			$("#inAssunto").val("");
			$("#inTexto").val("");
			$("#inM1").val("");
			$("#inM2").val("");
	});

	$("#trNovo").click(function(){
			$("#dvListaConteudo").removeClass("dvEsconde");
			$("#dvNovaMensagem").addClass("dvEsconde");

			$("#tdItemMenu").html("");
			$("#tdItemMenu").append("Caixa de Entrada");

			listarCaixaEntrada();
	});

	$("#trItensEnviados").click(function(){
			$("#dvListaConteudo").removeClass("dvEsconde");
			$("#dvNovaMensagem").addClass("dvEsconde");

			$("#tdItemMenu").html("");
			$("#tdItemMenu").append("Itens Enviados");

			listarItensEnviados();
	});


	$("#trItensExcluidos").click(function(){
			$("#dvListaConteudo").removeClass("dvEsconde");
			$("#dvNovaMensagem").addClass("dvEsconde");

			$("#tdItemMenu").html("");
			$("#tdItemMenu").append("Itens Excluidos");

			listarItensExcluidos();
	});

	$("#btnEnviar").click(function(){
		var para = $("#inPara").val();
		var cc = $("#inCc").val();
		var assunto = $("#inAssunto").val();
		var texto = $("#inTexto").val();
		var m1 = $("#inM1").val();
		var m2 = $("#inM2").val();

		if(para == "" || assunto == "" || texto == "" || m1 == "" || m2 == ""){	

			if(para == "") $("#inPara").addClass("erro");
			else $("#inPara").removeClass("erro");

			if(assunto == "") $("#inAssunto").addClass("erro");
			else $("#inAssunto").removeClass("erro");

			if(texto == "") $("#inTexto").addClass("erro");
			else $("#inTexto").removeClass("erro");

			if(m1 == "") $("#inM1").addClass("erro");
			else $("#inM1").removeClass("erro");

			if(m2 == "") $("#inM2").addClass("erro");
			else $("#inM2").removeClass("erro");
		}
		else{			
			registrarEmail(para, cc, assunto, texto, m1+m2);
		}

	});
});


function registrarEmail(para, cc, assunto, texto, mensagem){
	$.ajax({
			type: "POST",
			url: "../php/registrarEmail.php",
			data:{
			regPara: para,
			regCc: cc,
			regAssunto: assunto,
			regTexto: texto,
			regMensagem: mensagem
		},
		success:function(retorno){
			alert(retorno);

			$("#dvListaConteudo").removeClass("dvEsconde");
			$("#dvNovaMensagem").addClass("dvEsconde");

			$("#tdItemMenu").html("");
			$("#tdItemMenu").append("Caixa de Entrada");

			listarCaixaEntrada();
		}
	});
}

function listarCaixaEntrada(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "../php/listarCaixaEntrada.php",
		success:function(retorno){
			mostarLista(1, retorno);					
		}
	});
}

function listarItensEnviados(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "../php/listarItensEnviados.php",
		success:function(retorno){
			mostarLista(2, retorno);					
		}
	});
}

function listarItensExcluidos(){
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "../php/listarItensExcluidos.php",
		success:function(retorno){
			mostarLista(3, retorno);					
		}
	});
}

function mostarLista(tipo, retorno){
	$("#dvListaConteudo table").html("");
	$("#dvListaConteudo table").attr("cellspacing","0");
	$("#dvListaConteudo table").attr("width","100%");


	for(var i=0;i<retorno.length;i++){
		$("#dvListaConteudo table").append("<tr >");
		$("#dvListaConteudo table").append("<td class='tdEmail' id='tdImg'><img src='../img/ic_user.png'></td>");
		$("#dvListaConteudo table").append("<td class='tdEmail' id='tdPara'>"+retorno[i].para+"</td>");
		$("#dvListaConteudo table").append("<td class='tdEmail' id='tdAssunto'><b><u>Assunto</u>:</b>"+retorno[i].assunto+"</td>");
		
		if(retorno[i].texto.length > 60)
			$("#dvListaConteudo table").append("<td class='tdEmail' id='tdTexto'>"+retorno[i].texto.substring(0, 60)+"...</td>");
		else
			$("#dvListaConteudo table").append("<td class='tdEmail' id='tdTexto'>"+retorno[i].texto+"</td>");	
		
		if(tipo == 1) {
			$("#dvListaConteudo table").append("<td class='tdEmail' id='tdBtnRemover'><button id='btnRemover' onClick='removerItemRecebido("+i+")'>Remover</button></td>");			
		}
		if(tipo == 2) {
			$("#dvListaConteudo table").append("<td class='tdEmail' id='tdBtnRemover'><button id='btnRemover' onClick='removerItemEnviado("+i+")'>Remover</button></td>");			
		}
		$("#dvListaConteudo table").append("</tr>");
	}	
}


function removerItemRecebido(i){
	$.ajax({
			type: "POST",
			url: "../php/removerEmailRecebido.php",
			data:{
			posicao: i
		},
		success:function(retorno){
			alert(retorno);
			listarCaixaEntrada();
		}
	});


}


function removerItemEnviado(i){
	$.ajax({
			type: "POST",
			url: "../php/removerEmailEnviado.php",
			data:{
			posicao: i
		},
		success:function(retorno){
			alert(retorno);
			listarItensEnviados();
		}
	});


}
