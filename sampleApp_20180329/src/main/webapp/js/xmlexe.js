/**
 * javascript for xmlexe
 */

/**
* XMLファイル処理用スクリプト
*/
$(function(){

	//ALL menu close
	function menuClose() {
		$('#ebase6_shadow').css('display', 'none');
		$('#ebase6_menulist').css('display', 'none');
		$('#ebase6_popup').css('display', 'none');
	};

	//XML処理
	function xmlExecute() {
		var xml = $('#ebase6_popup_xml').val();
		var key = $('#ebase6_popup_xmlkey').val();

		$('#dataTable').remove();
		$('#ebase6_pamview').remove();

		var field = document.getElementById("datafield");

		var pamView = document.createElement("div");
		field.appendChild(pamView);
		pamView.className = "ebase6_pamview";
		pamView.id = "ebase6_pamview";

		var table = document.createElement("table");
		field.appendChild(table);
		table.className = "tablesorter";
		table.id = "dataTable";

		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'XMLEXE01' , xmlfile:xml, xmlKey:key}, function(jres){

			pamView.innerHTML="XML [ " + jres.pams["xml"] + " ] KEY [ " + jres.pams["key"] + " ]";

			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table.appendChild(theadElem);
			theadElem.appendChild(trElem);

			var ssSearch = document.getElementById("ss_select");

			for(i=0;i<jres.keys.length;i++){
				//テーブルにカラム名を表示
				var col = jres.keys[i];
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.className = jres.tblColData[col]["classname"];
				thElem.innerHTML=jres.tblColData[col]["name"];

			}

			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			table.appendChild(tbodyElem);

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
				}
			}


			$("#dataTable").tablesorter({
				widgets: ['zebra'],
				sortList: [[0, 1]]
			});
			$("#dataTable").trigger("update");

			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
	}

	//XMLファイル指定用のボックス作成
	$('a[id=xmlexe]').click(function(){
		$('#ebase6_popup').css('width', '300');
		$('#ebase6_popup').css('height', '200');
		$('#ebase6_popup').css('margin', '-150px 0 0 -100px');
		$('#ebase6_shadow').css('display', 'block'); //他入力欄をシャドウ化
		$('#ebase6_popup').css('display', 'block'); //ポップアップ表示
		$('#ebase6_popup_title').html(messages['TOPXMLEXE']); //ポップアップにメッセージ表示
		$('#ebase6_popup_body').empty(); //ボディ初期化
		$('#ebase6_popup_foot').empty(); //フッター初期化
		//実行ボタン作成
		var btn = document.createElement("input");
		btn.setAttribute('type',"button");
		btn.setAttribute('value',messages['BTNSUBMIT']);
		btn.setAttribute('id',"ebase6_popup_submit");
		$('#ebase6_popup_foot').append(btn);
		$('#ebase6_popup_submit').off("click"); //実行ボタンの処理を初期化
		$('#ebase6_popup_submit').on("click" , xmlExecute ); //実行ボタンの処理変更
		$('#ebase6_popup_submit').on("click" , menuClose ); //ポップアップを閉じる
		//入力欄作成
		var $label1 = $('<label>'+messages['LBXMLSELCT']+'</label>');
		$('#ebase6_popup_body').append($label1);
		$('#ebase6_popup_body').append("<br>");
		var sect = document.createElement("select");
		sect.setAttribute('id',"ebase6_popup_xml");
		sect.style.cssText = 'width:295px';
		$('#ebase6_popup_body').append(sect);
		var characters = {
			System: 'control/system.xml',
			Control: 'control/control.xml',
			Message: 'control/message.xml',
			Column: 'control/colname.xml'
			},
			$select = $('#ebase6_popup_xml'),
		    $option,
		    isSelected;
		$.each(characters, function (name, value) {
		    isSelected = (value === 'Control');
		    $option = $('<option>')
		        .val(value)
		        .text(name)
		        .prop('selected', isSelected);
		    $select.append($option);
		});
		$('#ebase6_popup_body').append("<br>");
		var $label2 = $('<label>'+messages['LBXMLKEY']+'</label>');
		$('#ebase6_popup_body').append($label2);
		$('#ebase6_popup_body').append("<br>");
		var inp = document.createElement("input");
		inp.setAttribute('type',"text");
		inp.setAttribute('id',"ebase6_popup_xmlkey");
		$('#ebase6_popup_body').append(inp);
	});


});
