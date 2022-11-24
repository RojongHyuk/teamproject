<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>공지사항</title>

<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
</head>
<body>
	<h1>공지사항</h1>

	<form style="text-align: center" name="frm" method="POST"
		action="/api/notice/update">
		<div>
			<input name="ntitle" value="${vo.ntitle}" id="ntitle" size=80
				placeholder="제목을 입력해주세요.">
		</div>
		<div style="margin-top: 15px">
			<input style="height: 300px" size=80 value="${vo.ncontent}"
				name="ncontent" id="ncontent" placeholder="내용을 입력해주세요.">
		</div>
		<input type="hidden" name=nwriter value="${vo.nwriter}" /> <input
			type="hidden" name=ncode value="${vo.ncode}" />
		<div>
			<button type="button" id="btnSave">수정하기</button>
			<button type="button" id="list">뒤로가기</button>
		</div>
	</form>
</body>
<script>
	$("#list").on("click", function() {
		location.href = "/notice/list?page=1&num=6&searchType=&keyword=";
	});

	$("#btnSave").on("click", function() {
		var ntitle = $("#ntitle").val();
		var ncontent = $("#ncontent").val();
		if (ntitle == "") {
			alert("제목을 입력하세요!")
			ntitle.focus();
			return;
		}
		if (ncontent == "") {
			alert("내용을 입력하세요!")
			ncontent.focus();
			return;
		}
		//입력한 데이터를 전송
		frm.submit();
		alert("수정이 완료되었습니다.")
	});
s</script>
</html>