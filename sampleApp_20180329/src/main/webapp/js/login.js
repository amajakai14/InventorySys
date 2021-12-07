/**
 * javascript for login
 */

/**
* 認証機能
*/
$(function(){

	//ログイン用ポップアップ生成
			//$.loginpopup = function(){

				
				$('#datafield').empty();
				$('#ebase6_controlmenu').hide();
				$('#ebase6_mainmenu').hide();
				$('#ebase6_submenu').hide();
				$('#ebase6_nav').hide();
				$('#ebase6_NavButtonGroup').hide();
				$('#userscreen').remove();
				

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
				document.getElementById("ebase6_initial_body").style.paddingTop = "0px";
				initialView.style.cssText = 'border-radius:10px;';
				

				//DOM型で要素をAppend
				var initialhead = document.createElement("div");
				initialhead.id = "ebase6_initial_head";
				initialView.appendChild(initialhead);
				$('#ebase6_initial_head').html("在庫管理システム");
				initialhead.style.cssText = 'border-top-left-radius:10px;border-top-right-radius:10px;text-indent:1em;';
				//date time
				var initialdate = document.createElement("div");
				initialdate.id = 'ebase_time_boxlogin';
				initialView.appendChild(initialdate);
				$('#ebase_time_boxlogin').html('');
				initialdate.style.cssText = 'padding-right:1em;';
				logintime();
				var rf = setInterval(logintime, 1000);
				
				
				//文言
				var caution = document.createElement("div");
				caution.id = "ebase6_initial_bottom";
				initialView.appendChild(caution);				
				//caution.innerHTML = "ユーザー名、パスワードを入力してください";
				caution.style.textAlign = 'Center';
				caution.style.cssText = 'position:absolute;left:30px;top:50px'	
				
				//table要素でユーザー名、パスワードのフォームを作成
				var table = document.createElement("table");
				table.id = "login_ninsyo";
				initialView.appendChild(table);
				table.style.cssText = 'position:absolute;left:65px;bottom:50px;border:none;';
				//ユーザー名フォーム
				var trElem1 = document.createElement("tr");
				table.appendChild(trElem1);

				var thElem1 = document.createElement("th");
				trElem1.appendChild(thElem1);
				thElem1.innerHTML = "ユーザー名";
				thElem1.style.cssText = 'border:none;';

				var tdElem1 = document.createElement("td");
				thElem1.appendChild(tdElem1);
				tdElem1.style.cssText = 'border:none;';
				
				var input1 = document.createElement("input")
				input1.setAttribute('type',"text");
				input1.setAttribute('maxlength',"50");
				input1.setAttribute('size',32);
				input1.setAttribute('id',"user_name");
				input1.style.cssText = 'border-radius:10px;text-indent:1em;border-width:1px';
				
				
				tdElem1.appendChild(input1);

				//パスワードフォーム
				var trElem2 = document.createElement("tr");
				table.appendChild(trElem2);

				var thElem2 = document.createElement("th");
				trElem2.appendChild(thElem2);
				thElem2.innerHTML = "パスワード";
				thElem2.style.cssText = 'border:none;';

				var tdElem2 = document.createElement("td");
				thElem2.appendChild(tdElem2);
				tdElem2.style.cssText = 'border:none;';

				var input2 = document.createElement("input")
				input2.setAttribute('type',"password");
				input2.setAttribute('maxlength',"20");
				input2.setAttribute('size',32);
				input2.setAttribute('id',"pass_word");
				input2.style.cssText = 'border-radius:10px;text-indent:1em;border-width:1px';
				tdElem2.appendChild(input2);


				//OKボタン
				var okbutton = document.createElement("input")
				okbutton.setAttribute('type',"button");
				okbutton.setAttribute('id',"ebase6_logon");
				okbutton.setAttribute('value',"ログイン");
				okbutton.style.cssText = 'position:absolute;left:40%;bottom:10px';
				okbutton.style.width = "100px"
				initialView.appendChild(okbutton);
				$('#ebase6_logon').off("click");
				$('#ebase6_logon').on("click" , ninsyo );
				$("#user_name").focus();
				
	

	//ログイン処理
	//20210510 田中追記
	function ninsyo() {
		var user = $('#user_name').val();
		var pass = $('#pass_word').val();
		var loginas = 'ユーザー名:' + user;
		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'ADDWORK02',user:user, pass:pass},function(login) {

			//空白、もしくは入力されたユーザー名・パスワードが間違っていた場合
			if(login.tblData.length != 0){
	
				//正しくデータが帰ってきた場合は認証OK
		
				$('#ebase6_initial_body').css('display', 'none');
				$('#ebase6_shadow').css('display', 'none');
				$('#ebase6_controlmenu').show();
				$('#ebase6_mainmenu').show();
				$('#ebase6_submenu').show();
				$('#ebase6_nav').show();
				$('#ebase6_NavButtonGroup').show();
				$('#ebase6_userid').html(loginas);
				$('#ebase6_shadow').css('display', 'none');
				$('#ebase6_menulist').css('display', 'none');
				$('#ebase6_popup').css('display', 'none');
				$('#table_item').css('display', 'none');
				loginTimeStopFunction(rf);
				
				$(document).ready(function(){
				var userid = document.getElementById('ebase6_userid');
				var curscreen = document.createElement('span');
				userid.prepend(curscreen);
				curscreen.innerHTML = 'メイン | ';
				curscreen.id = 'userscreen';
				});
	
			} else{
				$('#ebase6_initial_bottom').html("ユーザー名、またはパスワードが間違っています。再入力して下さい。");
				$('#ebase6_initial_bottom').css("color","red");
				$('#ebase6_initial_bottom').css("font-size","0.7em");
				$('#user_name').val('');
				$('#pass_word').val('');
				$("#user_name").focus();
			}

		});

	}

	//ログアウト処理
	$.logout = function(){
		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'ADDWORK03'}, function(){

				$('#datafield').empty();
				$('#ebase6_controlmenu').hide();
				$('#ebase6_mainmenu').hide();
				$('#ebase6_submenu').hide();
				$('#ebase6_nav').hide();
				$('#ebase6_NavButtonGroup').hide();
				$('#ebase6_userid').html('');
				$('.ebase6_mainReturn').hide();
				$('#ebase_time_boxlogin').remove();
				
					
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
				document.getElementById("ebase6_initial_body").style.paddingTop = "0px";
				initialView.style.cssText = 'border-radius:10px;';
				

				//DOM型で要素をAppend
				var initialhead = document.createElement("div");
				initialhead.id = "ebase6_initial_head";
				initialView.appendChild(initialhead);
				initialhead.style.cssText = 'border-top-left-radius:10px;border-top-right-radius:10px;text-indent:1em;';
				$('#ebase6_initial_head').html("在庫管理システム")
				//initialhead.setAttribute('value',"在庫管理システム");
				//date time
				var initialdate = document.createElement("div");
				initialdate.id = 'ebase_time_boxlogin';
				initialView.appendChild(initialdate);
				$('#ebase_time_boxlogin').html('');
				initialdate.style.cssText = 'padding-right:1em;';
				logintime();
				
				
				

				//文言
				var caution = document.createElement("div");
				caution.id = "ebase6_initial_bottom";
				initialView.appendChild(caution);				
				//caution.innerHTML = "ユーザー名、パスワードを入力してください";
				caution.style.textAlign = 'Center';
				caution.style.cssText = 'position:absolute;left:30px;top:50px'	
				
				//table要素でユーザー名、パスワードのフォームを作成
				var table = document.createElement("table");
				table.id = "login_ninsyo";
				initialView.appendChild(table);
				table.style.cssText = 'position:absolute;left:65px;bottom:50px;border:none;';
				//ユーザー名フォーム
				var trElem1 = document.createElement("tr");
				table.appendChild(trElem1);

				var thElem1 = document.createElement("th");
				trElem1.appendChild(thElem1);
				thElem1.innerHTML = "ユーザー名";
				thElem1.style.cssText = 'border:none;';

				var tdElem1 = document.createElement("td");
				thElem1.appendChild(tdElem1);
				tdElem1.style.cssText = 'border:none;';
				
				var input1 = document.createElement("input")
				input1.setAttribute('type',"text");
				input1.setAttribute('size',32);
				input1.setAttribute('id',"user_name");
				input1.style.cssText = 'border-radius:10px;text-indent:1em;border-width:1px';
				
				
				tdElem1.appendChild(input1);

				//パスワードフォーム
				var trElem2 = document.createElement("tr");
				table.appendChild(trElem2);

				var thElem2 = document.createElement("th");
				trElem2.appendChild(thElem2);
				thElem2.innerHTML = "パスワード";
				thElem2.style.cssText = 'border:none;';

				var tdElem2 = document.createElement("td");
				thElem2.appendChild(tdElem2);
				tdElem2.style.cssText = 'border:none;';

				var input2 = document.createElement("input")
				input2.setAttribute('type',"password");
				input2.setAttribute('size',32);
				input2.setAttribute('id',"pass_word");
				input2.style.cssText = 'border-radius:10px;text-indent:1em;border-width:1px';
				tdElem2.appendChild(input2);


				//OKボタン
				var okbutton = document.createElement("input")
				okbutton.setAttribute('type',"button");
				okbutton.setAttribute('id',"ebase6_logon");
				okbutton.setAttribute('value',"ログイン");
				okbutton.style.cssText = 'position:absolute;left:40%;bottom:10px';
				okbutton.style.width = "100px"
				initialView.appendChild(okbutton);
				$('#ebase6_logon').off("click");
				$('#ebase6_logon').on("click" , ninsyo );
				
				$("#user_name").focus();

			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
	}

	//ログイン用のポップアップをロード時に呼び出す
	//$.loginpopup();
	function logintime(){
		
				var today = new Date();
				var hour = today.getHours();
				var day = today.getDate();
     			var month = today.getMonth()+1;
				if(month <10){
				month = '0'+ month;
				}
				if(day <10){
				day = '0'+ day;
				}
				if(hour <10){
					hour = '0'+ hour
				}
				var minute = today.getMinutes();
				if(minute <10){
					minute = '0' + minute
				}
				var date = today.getFullYear()+'/'+month+'/'+day;
				var time = hour + ":" + minute;
				var dateTime = date+' '+time;
			  	var x = document.getElementById("ebase_time_boxlogin").innerHTML = '日時 : ' + dateTime;
				document.getElementById("ebase_time_boxlogin").style.textAlign = 'right';
				return x;
				
	}
	
	function loginTimeStopFunction(a) {
  		clearInterval(a);
	}


});
