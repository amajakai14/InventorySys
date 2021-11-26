/**
 * javascript for ebase6
 */
$(function(){

	messages = {}; //メッセージ配列
	msgidlist = [ 'TOPDBEXE','BTNSUBMIT','BTNSUBMIT','BTNSUBMIT','LBXMLKEY','LBXMLSELCT','ADDWORK','InsertData' ];

	//POST処理作成
	$.postJSON = function(url, data, callback) {
		$.post(url, data, callback, "json");
	};

	//初回稼働時
	$(document).ready(function(){
		//ラングコードを取得
		var lang = navigator.language || navigator.userLanguage;
		if(lang != "ja") lang="en";
		//メッセージ配列の生成
		$.postJSON("DQube",{actionID:'MSGGET01' ,ids:msgidlist , lang:lang}, function(jres){
			for(j=0;j<msgidlist.length;j++){
				id = msgidlist[j];
				messages[id] = jres.message[id];
			}
		});
	});
	
	//Logout
	ebase6_logout
	$('#ebase6_logout').click(function(){
		$.logout();
	});
	//ALL menu close
	function menuClose() {
		$('#ebase6_shadow').css('display', 'none');
		$('#ebase6_menulist').css('display', 'none');
		$('#ebase6_popup').css('display', 'none');
	};

	//初期処理
	$('a[id=initialsetup]').click(function(){
		$.postJSON("DQube",{actionID:'INITILIZ'}, function(jres){
			alert(jres.result["result"]);
			return false;
		});
	});

	//メンテナンスボタンをクリック
	$('#ebase6_conmenu_mente').click(function(){
		if($('#ebase6_menulist').css('display') == "block"){
			menuClose();
		}else{
			$('#ebase6_menulist').css('display', 'block');
		}
	});

	//ポップアップクローズ
	$('#ebase6_popup_close').click(function(){
		$('#ebase6_popup').css('display', 'none');
		$('#ebase6_shadow').css('display', 'none');
	});

	/* NAVIGATION FRAME */
	var navPX = $("#ebase6_nav").offset().left + window.pageXOffset;
	var navPY = $("#ebase6_nav").offset().top + window.pageYOffset;
	var winTop = $("#ebase6_body").scrollTop();
	$("#ebase6_nav").css('position','relative');
	//$("#ebase6_nav").animate({top: winTop + "px"}, "slow");

	//スクロールをするたびに実行
	$("#ebase6_body").scroll(function () {
		winTop = $("#ebase6_body").scrollTop();
		$("#ebase6_nav").stop(); //これがないと連続して実行されたときに変な動きになります。
		$("#ebase6_nav").css('position','relative');
		//$("#ebase6_nav").animate({top: winTop + "px"}, "slow");

	});
	
	
	
		//ALL menu close
	function menuClose() {
		$('#ebase6_shadow').css('display', 'none');
		$('#ebase6_menulist').css('display', 'none');
		$('#ebase6_popup').css('display', 'none');
	};
		//menubar show
	function menubarShow() {
		$('#table_item').css('display', 'block');
		$('#ebase6_mainReturn').css('display', 'block');
		$('#ebase6_NavButtonGroup').css('display', 'none');
	};
		//return to main menu
		function mainReturn(){
		$('#table_item').css('display', 'none');
		$('#ebase6_NavButtonGroup').css('display', 'block');		
		$('.ebase6_mainReturn').css('display', 'none');
		$('#datafield').empty();
	};
		//Mainボタンをクリック
		$('.ebase6_mainReturn').click(function(){
		if($('.ebase6_mainReturn').css('display') == "block"){
			mainReturn();
			
		}
	});
 		//食材リストボタンをクリック
	$('#ebase6_NavgoodsView').click(function(){
		menubarShow();
		$('#datafield').css('display', 'block');
		
		
	});
	

	 	//発注ボタンをクリック
	$('#ebase6_NavPurchaseOrder').click(function(){
		menubarShow();
		$('#datafield').css('display', 'block');
		$.orderexe();		
	});
	
		//検品ボタンをクリック
	$('#ebase6_NavgoodsInspt').click(function(){
		menubarShow();
		$('#datafield').css('display', 'block');
		$.checkexe();
	});	
		//棚卸ボタンをクリック
	$('#ebase6_NavStockCount').click(function(){
		menubarShow();
		$('#datafield').css('display', 'block');
		$.stockcount();
	});	
		//在庫一覧をクリック
	$('#ebase6_NavInventory').click(function(){
		menubarShow();
		$('#datafield').css('display', 'block');
		$.inventorymanagement();
	});	
		//ユーザー登録をクリック
	$('#ebase6_NavIDRegister').click(function(){
		menubarShow();
		$('#datafield').css('display', 'block');
		$.userpage();
	});	

		//SetFooter




});
