/**
 * javascript for login
 */

/**
* 認証機能
*/
$(function(){

	//ログイン用ポップアップ生成
			//$.loginpopup = function(){
		$('#ebase6_initial_body').css('display', 'none');
		$('#ebase6_shadow').css('display', 'none');

				
				$('#datafield').empty();
				$('#ebase6_controlmenu').hide();
				$('#ebase6_mainmenu').hide();
				$('#ebase6_submenu').hide();
				$('#ebase6_nav').hide();
				$('#ebase6_NavButtonGroup').hide();
				

				//ボディ部分生成
				var field = document.getElementById("datafield");

				//暗転
				var shadow = document.createElement("div");
				shadow.id = "ebase6_shadow";
				field.appendChild(shadow);

				//ポップアップ用画面生成
				var initialView = document.createElement("div");
				initialView.id = "ebase6_initial_body";
				field.appendChild(initialView);
				document.getElementById("ebase6_initial_body").style.paddingTop = "0px"
				

				//DOM型で要素をAppend
				var initialhead = document.createElement("div");
				initialhead.id = "ebase6_initial_head";
				initialView.appendChild(initialhead);
				$('#ebase6_initial_head').html("在庫管理システム")
				//initialhead.setAttribute('value',"在庫管理システム");
				//date time
				var initialdate = document.createElement("div");
				initialdate.id = 'ebase_time_boxlogin';
				initialView.appendChild(initialdate);
				$('#ebase_time_boxlogin').html('');
				

				//文言
				var caution = document.createElement("div");
				caution.id = "ebase6_initial_bottom";
				initialView.appendChild(caution);				
				caution.innerHTML = "ユーザー名、パスワードを入力してください";
				caution.style.textAlign = 'Center';
				caution.style.cssText = 'position:absolute;left:30px;top:50px'	
				
				//table要素でユーザー名、パスワードのフォームを作成
				var table = document.createElement("table");
				table.id = "login_ninsyo";
				initialView.appendChild(table);
				table.style.cssText = 'position:absolute;left:30px; bottom:50px';
				//ユーザー名フォーム
				var trElem1 = document.createElement("tr");
				table.appendChild(trElem1);

				var thElem1 = document.createElement("th");
				trElem1.appendChild(thElem1);
				thElem1.innerHTML = "ユーザー名";

				var tdElem1 = document.createElement("td");
				thElem1.appendChild(tdElem1);
				
				var input1 = document.createElement("input")
				input1.setAttribute('type',"text");
				input1.setAttribute('size',32);
				input1.setAttribute('id',"user_name");
				
				
				tdElem1.appendChild(input1);

				//パスワードフォーム
				var trElem2 = document.createElement("tr");
				table.appendChild(trElem2);

				var thElem2 = document.createElement("th");
				trElem2.appendChild(thElem2);
				thElem2.innerHTML = "パスワード";

				var tdElem2 = document.createElement("td");
				thElem2.appendChild(tdElem2);

				var input2 = document.createElement("input")
				input2.setAttribute('type',"password");
				input2.setAttribute('size',32);
				input2.setAttribute('id',"pass_word");
				tdElem2.appendChild(input2);


				//OKボタン
				var okbutton = document.createElement("input")
				okbutton.setAttribute('type',"button");
				okbutton.setAttribute('id',"ebase6_logon");
				okbutton.setAttribute('value',"Login");
				okbutton.style.cssText = 'position:absolute;left:40%;bottom:10px';
				okbutton.style.width = "100px"
				initialView.appendChild(okbutton);
				$('#ebase6_logon').off("click");
				$('#ebase6_logon').on("click" , ninsyo );
				
	

	//ログイン処理
	//20210510 田中追記
	function ninsyo() {
		var user = $('#user_name').val();
		var pass = $('#pass_word').val();

		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'ADDWORK02',user:user, pass:pass},function(login) {

		//空白、もしくは入力されたユーザー名・パスワードが間違っていた場合
		if(login.tblData.length==0){
			$('#ebase6_initial_bottom').html("ユーザー名、またはパスワードが間違っています。再入力して下さい。");
			$('#ebase6_initial_bottom').css("color","red");
		} else {

		//正しくデータが帰ってきた場合は認証OK

		$('#ebase6_initial_body').css('display', 'none');
		$('#ebase6_shadow').css('display', 'none');
		$('#ebase6_controlmenu').show();
		$('#ebase6_mainmenu').show();
		$('#ebase6_submenu').show();
		$('#ebase6_nav').show();
		$('#ebase6_NavButtonGroup').show();
	

		}

		});

	}

	//ログアウト処理
	$.logout = function(){
		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'ADDWORK03'}, function(logout){

				$('#datafield').empty();
				$('#ebase6_controlmenu').remove();
				$('#ebase6_popup').remove();

				//ボディ部分生成
				var field = document.getElementById("datafield");

				//暗転
				var shadow = document.createElement("div");
				shadow.id = "ebase6_shadow";
				field.appendChild(shadow);

				//ポップアップ用画面生成
				var initialView = document.createElement("div");
				initialView.id = "ebase6_initial_body";
				field.appendChild(initialView);

				//DOM型で要素をAppend
				var initialhead = document.createElement("div");
				initialhead.id = "ebase6_initial_head";
				initialView.appendChild(initialhead);
				$('#ebase6_initial_head').html("在庫管理システム")
				//initialhead.setAttribute('value',"認証処理");

				//table要素でユーザー名、パスワードのフォームを作成
				var table = document.createElement("table");
				table.id = "login_ninsyo";
				initialView.appendChild(table);

				//ユーザー名フォーム
				var trElem1 = document.createElement("tr");
				table.appendChild(trElem1);

				var thElem1 = document.createElement("th");
				trElem1.appendChild(thElem1);
				thElem1.innerHTML = "ユーザー名";

				var tdElem1 = document.createElement("td");
				thElem1.appendChild(tdElem1);

				var input1 = document.createElement("input")
				input1.setAttribute('type',"text");
				input1.setAttribute('size',32);
				input1.setAttribute('id',"user_name");
				tdElem1.appendChild(input1);

				//パスワードフォーム
				var trElem2 = document.createElement("tr");
				table.appendChild(trElem2);

				var thElem2 = document.createElement("th");
				trElem2.appendChild(thElem2);
				thElem2.innerHTML = "パスワード";

				var tdElem2 = document.createElement("td");
				thElem2.appendChild(tdElem2);

				var input2 = document.createElement("input")
				input2.setAttribute('type',"password");
				input2.setAttribute('size',32);
				input2.setAttribute('id',"pass_word");
				tdElem2.appendChild(input2);

				//文言
				var caution = document.createElement("div");
				caution.id = "ebase6_initial_bottom";
				initialView.appendChild(caution);
				caution.innerHTML = "ユーザー名、パスワードを入力してください";

				//OKボタン
				var okbutton = document.createElement("input")
				okbutton.setAttribute('type',"button");
				okbutton.setAttribute('id',"ebase6_logon");
				okbutton.setAttribute('value',"Login");
				okbutton.style.cssText = 'position:absolute;left:0px;bottom:0px';
				initialView.appendChild(okbutton);
				$('#ebase6_logon').off("click");
				$('#ebase6_logon').on("click" , ninsyo );

			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
	}

	//ログイン用のポップアップをロード時に呼び出す
	//$.loginpopup();
	


});
