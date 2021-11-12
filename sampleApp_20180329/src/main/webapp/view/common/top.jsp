<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ja">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=0.6, maximum-scale=1.5, user-scalable=yes" />

	<link rel="stylesheet" href="css/base.css" />
	<link rel="stylesheet" href="js/jQuery/tablesorter/themes/blue/style.css" />

	<!--Business Application System Executer 6  -->
	<title>在庫管理システム</title>
</head>

<body>

		<!-- Main Menu  -->
	<div id="ebase6_mainmenu">

		
		<!--Excellence Business Application System Executer 6  -->
		在庫管理システム

		
		<input type="text" id="ebase_time_boxmain">
		<script>
		var today = new Date();
		var hour = today.getHours();
		if(hour <10){
			hour = '0'+ hour
		}
		var minute = today.getMinutes();
		if(minute <10){
			minute = '0' + minute
		}
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = hour + ":" + minute;
		var dateTime = date+' '+time;
 		 document.getElementById("ebase_time_boxmain").value = dateTime;
		</script>
		<button id="ebase6_logout" type="button">ログアウト</button>
					<!-- Control Menu  //-->

		
	</div>

	<!-- Body  -->
	<div id="ebase6_body">
	<div id="ebase6_nav">

		<!-- レイアウトは良い感じに直して -->
		<table id = "table_item">
		<tr>
		<td style="background-color:#C0C0C0">メニュー</td>
		<td style="background-color:#38F088"><a id="goodsView" href="javascript:void(0)">食材リスト </a></td>
		<td style="background-color:#F5D98B"><a id="PurchaseOrder" href="javascript:void(0)">発注 </a></td>
		<td style="background-color:#f5ff45 "><a id="goodsInspt" href="javascript:void(0)">検品 </a></td>
		<td style="background-color:#1D91DE"><a id="Inventory" href="javascript:void(0)">在庫一覧 </a></td>
		<td style="background-color:#f1b51d"><a id="StockCount" href="javascript:void(0)">棚卸 </a></td>
		</tr>
		</table>
	</div>
	<!--機能ボタン作成-->
	<div id ="ebase6_NavButtonGroup">
		<div class="grid-container">
		<div class="box item1"><button id ="ebase6_NavgoodsView" type="button">食材リスト</button></div>
 		<div class="box item2"><button id ="ebase6_NavPurchaseOrder" type="button">発注</button></div>
 		<div class="box item3"><button id ="ebase6_NavgoodsInspt" type="button">検品</button></div>
 		<div class="box item4"><button id ="ebase6_NavInventory" type="button">在庫一覧</button></div>
 		<div class="box item5"><button id ="ebase6_NavStockCount" type="button">棚卸</button></div>
 		<div class="box item6"><button id ="ebase6_NavIDRegister" type="button">ユーザー登録</button></div>
		</div>
	</div>
	



			    	<!-- Mentenuce Menu List -->
		<div id="ebase6_controlmenu">
			<input id="ebase6_conmenu_mente" type="image" src="view/image/ico_mente_57_57.png" />
		</div>	
		<div id="ebase6_menulist">
				<div id="ebase6_menulist_title">Mentenunce</div>
				<ul>
					<li><a id="initialsetup" href="javascript:void(0)">Initial Setup</a></li>
					<li><a id="xmlexe" href="javascript:void(0)">XML Execute</a></li>
					<li><a id="dbexe" href="javascript:void(0)">DB SQL Execute</a></li>
					<li><a id="addWork" href="javascript:void(0)">Add Work 20180322 Enya</a></li>
				</ul>
		</div>
 			<div id="datafield"></div>
 	<div>
	<button class ="ebase6_mainReturn" type="button">Mainに戻る </button>
	</div>		
	</div>
		


	




	<!-- Popup -->
	<div id="ebase6_popup">
		<div id="ebase6_popup_head">
			<div id="ebase6_popup_title"></div>
			<input type="image" src="view/image/icon_close_32.png" id="ebase6_popup_close" style="float:right;right:0;" />
			<div style="clear:both"></div>
    	</div>
    	<div id="ebase6_popup_body">
    	</div>
    	<div id="ebase6_popup_foot">
    	</div>
	</div>



</body>

<!-- スクリプト //-->
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jQuery/tablesorter/jquery.tablesorter.js"></script>
<script type="text/javascript" src="js/control.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/sqlexe.js"></script>
<script type="text/javascript" src="js/xmlexe.js"></script>
<script type="text/javascript" src="js/enya_addwork.js"></script>
<script type="text/javascript" src="js/login.js"></script>
<script type="text/javascript" src="js/itemlist.js"></script>
<script type="text/javascript" src="js/orderexe.js"></script>
<script type="text/javascript" src="js/checkexe.js"></script>

</html>