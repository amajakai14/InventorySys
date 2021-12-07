/**
 * javascript for addwork_enya
 */

/**
* DBに値を挿入し、表示する機能
*/
$(function(){
	$.userpage = function(){
		$('.ebase6_mainReturn').css('display', 'block');
		/*var userid = document.getElementById('ebase6_userid');
		var curscreen = document.createElement('span');
		userid.prepend(curscreen);
		curscreen.innerHTML = 'ユーザ管理 | ';
		curscreen.id = 'userscreen';*/
		$('#userscreen').html('ユーザー登録 | ');
		
		$('#datafield').empty();
		var field = document.getElementById('datafield');
		var createuserContainer = document.createElement('div');
		field.appendChild(createuserContainer);
		
		var Head = document.createElement("div");
		Head.id = "ebase6_matHead";
		Head.style.cssText = "left:calc(50% - 100px);"
		field.appendChild(Head);
		
		var HeadText = document.createElement("div");
		HeadText.id = "ebase6_userHeadText";
		Head.appendChild(HeadText);
		$('#ebase6_userHeadText').html("ユーザー登録");
		
		var nametag = document.createElement('div');
		createuserContainer.appendChild(nametag);
		nametag.innerHTML = '従業員氏名';
		
		
		createuserContainer.setAttribute('id','createuserContainer');
		
		var input_name = document.createElement('input');
		nametag.appendChild(input_name);
		input_name.setAttribute('id','input_name');
		input_name.setAttribute('maxlength','50');
		input_name.style.cssText = 'margin-left:70px;';
		$("#input_name").attr("spellcheck", "false");
		
		var linebreak = document.createElement('br');
		createuserContainer.appendChild(linebreak);
		
		var pwtag = document.createElement('div');
		createuserContainer.appendChild(pwtag);
		pwtag.innerHTML = 'パスワード';
		
		var input_pw = document.createElement('input');
		pwtag.appendChild(input_pw);
		input_pw.setAttribute('id','pw1');
		input_pw.setAttribute('type','password');
		input_pw.setAttribute('maxlength','20');
		input_pw.style.cssText = 'margin-left:70px;';
		
		var linebreak = document.createElement('br');
		createuserContainer.appendChild(linebreak);
		
		var pwtag2 = document.createElement('div');
		createuserContainer.appendChild(pwtag2);
		pwtag2.innerHTML = 'パスワード再入力';
		
		var input_pw2 = document.createElement('input');
		pwtag2.appendChild(input_pw2);
		input_pw2.setAttribute('id','pw2');
		input_pw2.setAttribute('type','password');
		input_pw2.setAttribute('maxlength','20');
		input_pw2.style.cssText = 'margin-left:23px;';
		
		var checkpw = document.createElement('div');
		createuserContainer.appendChild(checkpw);
		checkpw.style.cssText = 'margin-left:170px;font-size:0.7em;';
		checkpw.innerHTML = '&nbsp';
		input_pw2.onkeyup = function(){
			if(input_pw.value != input_pw2.value){
				checkpw.innerHTML = 'パスワードが間違っているようです。もう一度入力してください';
			} else{
				checkpw.innerHTML = '&nbsp';
			}			
		}
		input_pw.onchange = function(){
			if(input_pw.value != input_pw2.value){
				checkpw.innerHTML = 'パスワードが間違っているようです。もう一度入力してください';
			} else{
				checkpw.innerHTML = '&nbsp';
				
			}			
		}
		
		
		var btnemp = document.createElement("input");
		createuserContainer.appendChild(btnemp);
		btnemp.setAttribute('type', "button");
		btnemp.setAttribute('value', "登録確定");
		btnemp.setAttribute('id', "EmpRe");
		btnemp.style.cssText = 'margin-left:225px;cursor:pointer;'
		$('#EmpRe').off("click");
		$('#EmpRe').on("click", addWork);
		

		var tableuser = document.createElement("table");
		createuserContainer.appendChild(tableuser);
		tableuser.className = "tablesorter";
		tableuser.id = "dataTableuser";
		
		
		$.postJSON("DQube",{actionID:'EmployeeList'}, function(jres){
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			tableuser.appendChild(theadElem);
			theadElem.appendChild(trElem);
			
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML= '従業員ID';
				thElem.style.cssText = 'width:80px;box-sizing:border-box;';
				
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML= '従業員氏名';
				thElem.style.cssText = 'width:200px;box-sizing:border-box;';

			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			tableuser.appendChild(tbodyElem);
			tbodyElem.setAttribute('id','tbody_user');
			tbodyElem.style.cssText = "display:block;position:absolute;height:300px;width:296px;overflow-y:auto;overflow-x:hidden;border-collapse: collapse;";

			//データのヒットがない場合、空行を作成
			if(jres.tblData.length==0){
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for(i=0;i<jres.keys.length;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
				}
			}

			for(j=0;j<jres.tblData.length;j++){ //データの書きだし
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for(i=0;i<jres.keys.length;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					var col = jres.keys[i];
					tdElem.innerHTML = jres.tblData[j][col];
					if(i == 0){
						tdElem.style.cssText = 'width:80px;box-sizing:border-box;';
					}else{
						tdElem.style.cssText = 'width:200px;box-sizing:border-box;text-align:center;';
						var nameID = 'name' + j;
						tdElem.setAttribute('id',nameID);
					}
				}
			}
			
			return false;
		});
		
		
		
	}
	//ALL menu close
	function menuClose() {
		$('#ebase6_shadow').css('display', 'none');
		$('#ebase6_menulist').css('display', 'none');
		$('#ebase6_popup').css('display', 'none');
	};

	// 2018-03-22 M.Enya Add
	// 追加処理
	function addWork() {
		var name = $('#input_name').val();
		var pw = $('#pw1').val();
		var pw2 = $('#pw2').val();
		var namedup = false;
		var tableuser = document.getElementById('dataTableuser');
		var rowCount = tableuser.tBodies[0].rows.length;
		for(j=0;j<rowCount;j++){
			var alrhave = 'name' + j;
			var getname = document.getElementById(alrhave).innerHTML;
			if(name == getname){
				namedup = true;
				break;
			}
		}
		if( pw != pw2){
			alert('パスワードもう一度入力してからボタンを押してください');
			$('#pw1').val('');
			$('#pw2').val('');
			$('#pw1').focus();
			return false;
		} else if(name == ''||pw == ''){
			alert('名前とパスワードを入力してください');
			$('#input_name').val('');
			$('#pw1').val('');
			$('#pw2').val('');
			$('#input_name').focus();
			return false;
		} else if(namedup == true){
			alert('この氏名はすでに存在しています');
			$('#input_name').val('');
			$('#pw1').val('');
			$('#pw2').val('');
			$('#input_name').focus();
			return false;
		} else if(name.indexOf(' ') != -1 || pw.indexOf(' ') != -1 ){
			alert('Error');
			$('#input_name').val('');
			$('#pw1').val('');
			$('#pw2').val('');
			$('#input_name').focus();
			return false;
		} else{
			$('#dataTableuser').remove();
			$('#ebase6_pamview').remove();
	
	
			var tableuser = document.createElement("table");
			createuserContainer.appendChild(tableuser);
			tableuser.className = "tablesorter";
			tableuser.id = "dataTableuser";
	
			//submit処理開始
			//$.ajaxSetup({ async: false }); //同期
			$.postJSON("DQube",{actionID:'ADDWORK01', name:name, pw:pw}, function(jres){
	
	
				//DOM型で要素をAppendしていく
				var theadElem = document.createElement("thead");
				var trElem = document.createElement("tr");
				tableuser.appendChild(theadElem);
				theadElem.appendChild(trElem);
				
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML= '従業員ID';
				thElem.style.cssText = 'width:80px;box-sizing:border-box;';
				
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML= '従業員氏名';
				thElem.style.cssText = 'width:200px;box-sizing:border-box;';
	
				//データ行を作成
				var tbodyElem = document.createElement("tbody");
				tableuser.appendChild(tbodyElem);
				tbodyElem.setAttribute('id','tbody_user');
				tbodyElem.style.cssText = "display:block;position:absolute;height:300px;width:296px;overflow-y:auto;overflow-x:hidden;border-collapse: collapse;";
	
				//データのヒットがない場合、空行を作成
				if(jres.tblData.length==0){
					var trElem = document.createElement("tr");
					tbodyElem.appendChild(trElem);
					for(i=0;i<jres.keys.length;i++){
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
					}
				}
	
				for(j=0;j<jres.tblData.length;j++){ //データの書きだし
					var trElem = document.createElement("tr");
					tbodyElem.appendChild(trElem);
					for(i=0;i<jres.keys.length;i++){
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.background = "#fff";
						var col = jres.keys[i];
						tdElem.innerHTML = jres.tblData[j][col];
						if(i == 0){
							tdElem.style.cssText = 'width:80px;box-sizing:border-box;';
						}else{
							tdElem.style.cssText = 'width:200px;box-sizing:border-box;text-align:center;';
							var nameID = 'name' + j;	
							tdElem.setAttribute('id',nameID);
						}
					}
				}
				$('#input_name').val('');
				$('#pw1').val('');
				$('#pw2').val('');
				//$.ajaxSetup({ async: true }); //同期の解除
				return false;
			});
			
		}

	}


	// 2018-03-22 M.Enya Add
	// 値の入力ボックス作成
	$('a[id=addWork]').click(function(){
		$('#ebase6_popup').css('width', '300');
		$('#ebase6_popup').css('height', '200');
		$('#ebase6_popup').css('margin', '-150px 0 0 -100px');
		$('#ebase6_shadow').css('display', 'block'); //他入力欄をシャドウ化
		$('#ebase6_popup').css('display', 'block'); //ポップアップ表示
		$('#ebase6_popup_title').html(messages['ADDWORK']); //ポップアップにメッセージ表示
		$('#ebase6_popup_body').empty(); //ボディ初期化
		$('#ebase6_popup_foot').empty(); //フッター初期化
		//実行ボタン作成
		var btn = document.createElement("input");
		btn.setAttribute('type',"button");
		btn.setAttribute('value',messages['BTNSUBMIT']);
		btn.setAttribute('id',"ebase6_popup_submit");
		$('#ebase6_popup_foot').append(btn);
		$('#ebase6_popup_submit').off("click"); //実行ボタンの処理を初期化
		$('#ebase6_popup_submit').on("click" , addWork ); //実行ボタンの処理変更
		$('#ebase6_popup_submit').on("click" , menuClose ); //ポップアップを閉じる
		//入力欄作成
		var id_inp = document.createElement("textarea");
		id_inp.setAttribute('id',"ebase6_popup_id");
		id_inp.style.cssText = 'position:absolute;left:0;width:128px;height:64px;';
		$('#ebase6_popup_body').append(id_inp);
		//入力欄作成
		var value_inp = document.createElement("textarea");
		value_inp.setAttribute('id',"ebase6_popup_value");
		value_inp.style.cssText = 'position:absolute;right:0;width:128px;height:64px;';
		$('#ebase6_popup_body').append(value_inp);
	});
	
});
