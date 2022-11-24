
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>이벤트 정보</title>
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.js"></script>
</head>

<body>
	<h2 style="text-align: center">수정 페이지</h2>
	<form style="text-align: center" name="update" method="POST"
		action="/api/event/update">
		<div>
			<input name="etitle" value="${vo.etitle}" id="etitle" size=80
				placeholder="제목을 입력해주세요.">
		</div>
		<div style="margin-top: 15px">
			<input style="height: 300px" size=80 value="${vo.econtent}"
				name="econtent" id="econtent" placeholder="내용을 입력해주세요.">
		</div>
		<input name="ecode" value="${vo.ecode}" type="hidden" />
		<div>
			<button type="button" id="btnSave">수정</button>
			<button type="reset">취소</button>
		</div>
	</form>

	<h1>댓글 목록</h1>
	<div>
		<input id="ercontent" placeholder="댓글입력" size=80>
		<button id="insert">등록</button>
	</div>
	<table id="tbl"></table>
	<script id="temp" type="text/x-handlebars-template">
		{{#each .}}
		<tr class="row">
			<td>
				{{erwriter}}: {{ercontent}}
				<button class="delete" ercode={{ercode}}>삭제</button>
			</td>
		</tr>
		{{/each}}
	</script>
</body>
<div class="buttons">
	<button id="prev">이전</button>
	<span id="page">1/10</span>
	<button id="next">다음</button>
</div>
<script>
	var ecode = "${ecode}";
	var page = 1;
	getReplyList();

	$("#next").on("click", function() {
		page++;
		getReplyList();
	});

	$("#prev").on("click", function() {
		page--;
		getReplyList();
	});

	$(document).ready(function() {
		$("#btnSave").click(function() {
			var etitle = $("#etitle").val();
			var econtent = $("#econtent").val();
			if (etitle == "") {
				alert("제목을 입력하세요!")
				document.update.etitle.focus();
				return;
			}
			if (econtent == "") {
				alert("내용을 입력하세요!")
				document.update.econtent.focus();
				return;
			}
			//입력한 데이터를 전송
			document.update.submit();
			alert("수정이 완료되었습니다.")
		});
	});

	$("#tbl").on("click", ".row .delete", function() {
		var ercode = $(this).attr("ercode");
		if (!confirm(ercode + "번 댓글을 삭제하실래요?"))
			return;
		$.ajax({
			type : "post",
			url : "/api/ereply/adminDelete/" + ercode,
			success : function() {
				alert("삭제성공!");
				getReplyList();
			}
		});
	});

	function getReplyList() {

		var num = 6;
		$
				.ajax(
						{
							type : "get",
							url : "/api/ereply/list?page=" + page + "&num="
									+ num + "&ecode=" + ecode,
							dataType : "json"
						})
				.done(
						function(data) {
							console.log(JSON.stringify(data));
							var temp = Handlebars.compile($("#temp").html());
							$("#tbl").html(temp(data.list));

							if (data.total == 0) {
								$("#tbl")
										.append(
												"<tr><td colspan=6 class='none'>검색된 자료가 없습니다!</td></tr>");
								$(".buttons").hide();
							} else {
								$(".buttons").show();
								$("#page").html(
										page + "/" + Math.ceil(data.total / 6));

								page == 1 ? $("#prev").attr("disabled", true)
										: $("#prev").attr("disabled", false);
								page == Math.ceil(data.total / 6) ? $("#next")
										.attr("disabled", true) : $("#next")
										.attr("disabled", false);
							}
						})

	}
</script>
</html>

