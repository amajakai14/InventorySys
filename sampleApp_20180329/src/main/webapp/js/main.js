/**
 * javascript for main
 */

/**
* 各機能の処理に飛ぶ
*/
$(function(){

	//ログイン認証処理キック
	//$('#ebase6_logon').click(function(){
		//$.ninsyo();
	//});

	//ログアウト処理キック
	$('#ebase6_logout').click(function(){
		$.logout();
	});


	//品物一覧画面出力処理キック

	});
	$('a[id=goodsView]').click(function(){
		$.itemlist();
	});
	$('#ebase6_NavgoodsView').click(function(){
		$.itemlist();
		
	});
	$('.ebase6_returnItemlist').click(function(){
		$.itemlist();
	});
	
	//発注作業画面出力処理キック
	$('a[id=PurchaseOrder]').click(function(){
		$.orderexe();
	});

	//品物検品画面出力処理キック
	$('a[id=goodsInspt]').click(function(){
		$.checkexe();
	});

	//在庫管理画面出力処理キック
	$('a[id=Inventory]').click(function(){
		$.inventorymanagement();
	});

	//棚卸作業画面出力処理キック
	$('a[id=StockCount]').click(function(){
		$.stockcount();
	});

	//履歴表示画面出力処理キック
	$('a[id=History]').click(function(){
		$('#datafield').empty();
		document.getElementById("ebase6_submenu").innerHTML="履歴表示";
	});
	
	//在庫管理画面出力処理キック
	$('a[id=mainmenu]').click(function(){
		$('#table_item').css('display', 'none');
		$('#ebase6_NavButtonGroup').css('display', 'block');		
		$('.ebase6_mainReturn').css('display', 'none');
		$('#datafield').empty();
	});


	
