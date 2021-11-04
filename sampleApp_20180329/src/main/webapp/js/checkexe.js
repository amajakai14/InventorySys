/**
 * javascript for checkexe
 */

//SQL文：単位、原価、発注日、発注数表示
	//select UNIT,COST,SUPPLY_DAY,ORDER_NUM from ITEM_MST i inner join SUPPLY_HISTORY su on i.id = su.id where i.id = 2;

/**
* 品物検品画面の処理はここに書く
*/
$(function(){

	//ALL menu close
	function menuClose() {
		$('#ebase6_shadow').css('display', 'none');
		$('#ebase6_menulist').css('display', 'none');
		$('#ebase6_popup').css('display', 'none');
	};

	//品物検品画面表示
	$.checkexe = function(){
		$('#datafield').empty();
		document.getElementById("ebase6_submenu").innerHTML="品物検品";
		$('#ebase6_popup').css('width', '300');
		$('#ebase6_popup').css('height', '200');
		$('#ebase6_popup').css('margin', '-150px 0 0 -100px');
		$('#ebase6_shadow').css('display', 'block'); //他入力欄をシャドウ化
		$('#ebase6_popup').css('display', 'block'); //ポップアップ表示
		$('#ebase6_popup_title').html(messages['TOPDBEXE']); //ポップアップにメッセージ表示
		$('#ebase6_popup_body').empty(); //ボディ初期化
		$('#ebase6_popup_foot').empty(); //フッター初期化
		//実行ボタン作成
		var btn = document.createElement("input");
		btn.setAttribute('type',"button");
		btn.setAttribute('value',messages['BTNSUBMIT']);
		btn.setAttribute('id',"ebase6_popup_submit");
		$('#ebase6_popup_foot').append(btn);
		$('#ebase6_popup_submit').off("click"); //実行ボタンの処理を初期化
		$('#ebase6_popup_submit').on("click" , goodsCheck ); //実行ボタンの処理変更
		$('#ebase6_popup_submit').on("click" , menuClose );//ポップアップを閉じる
		//入力欄作成
		var inp = document.createElement("textarea");
		inp.setAttribute('id',"ebase6_popup_check");
		inp.style.cssText = 'position:absolute;left:0;width:295px;height:128px;';
		$('#ebase6_popup_body').append(inp);

		var field = document.getElementById("datafield");

		 var btn = document.createElement("input");
	     field.appendChild(btn);
			btn.setAttribute('type',"button");
			btn.setAttribute('value',"登録");
			btn.setAttribute('id',"new_sample");
			btn.style.cssText = 'font-size:1.4em;padding: 10px 30px;background-color: #FF6633;position:absolute;top:80px;left:70px'
			$('#new_sample').off("click");
			$('#new_sample').on("click" , checkRegister );


			field.update();
	}

	//検品データ登録
	function checkRegister() {

		var id = $('#dataSelect').val();
		var supply = $('#input1_sample').val();

		$('#dataTable').remove();
		$('#ebase6_pamview').remove();

		var field = document.getElementById("datafield");

		var pamView = document.createElement("div");
		field.appendChild(pamView);
		pamView.className = "ebase6_pamview";
		pamView.id = "ebase6_pamview";
		pamView.style.cssText = 'position:absolute;top:70px';

		var table = document.createElement("table");
		field.appendChild(table);
		table.className = "tablesorter";
		table.id = "dataTable";
		table.style.cssText = 'position:absolute;top:80px';

		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'CheckRegister',id:id, supply:supply }, function(jres){

		pamView.innerHTML="SQL [ " + jres.pams["sql"] + " ]";

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
		$('#new_sample').remove();
		$('#view_sample').remove();
		$('#input_sample').remove();
		$('#view1_sample').remove();
		$('#input1_sample').remove();
		$('#dataSelect').remove();

		//$.ajaxSetup({ async: true }); //同期の解除
		return false;f
		});
	}

	//検品商品表示
	function goodsCheck(){
		var check = $('#ebase6_popup_check').val();

		$('#dataTable').remove();
		$('#ebase6_pamview').remove();

		var field = document.getElementById("datafield");

		var select = document.createElement("select");
		field.appendChild(select);
		select.id = "dataSelect";
		select.style.cssText = 'position:absolute;top:170px;width:150px;height:30px';
		select.onchange = function(){
			$('#view1_sample').remove();
			$('#input1_sample').remove();
			$('#ebase6_popup').css('width', '300');
			$('#ebase6_popup').css('height', '200');
			$('#ebase6_popup').css('margin', '-150px 0 0 -100px');
			$('#ebase6_shadow').css('display', 'block'); //他入力欄をシャドウ化
			$('#ebase6_popup').css('display', 'block'); //ポップアップ表示
			$('#ebase6_popup_title').html(messages['TOPDBEXE']); //ポップアップにメッセージ表示
			$('#ebase6_popup_body').empty(); //ボディ初期化
			$('#ebase6_popup_foot').empty(); //フッター初期化
			//実行ボタン作成
			var btn = document.createElement("input");
			btn.setAttribute('type',"button");
			btn.setAttribute('value',messages['BTNSUBMITt']);
			btn.setAttribute('id',"ebase6_popup_submit");
			$('#ebase6_popup_foot').append(btn);
			$('#ebase6_popup_submit').off("click"); //実行ボタンの処理を初期化
			$('#ebase6_popup_submit').on("click" , selectChange ); //実行ボタンの処理変更
			$('#ebase6_popup_submit').on("click" , menuClose ); //ポップアップを閉じる
			//入力欄作成
			var inp = document.createElement("textarea");
			inp.setAttribute('id',"ebase6_popup_item");
			inp.style.cssText = 'position:absolute;left:0;width:295px;height:128px;';
			$('#ebase6_popup_body').append(inp);

			var view1 = document.createElement("div");
	        field.appendChild(view1);
	        view1.innerHTML = "仕入数";
	        view1.style.cssText = 'position:absolute;top:150px;left:670px;';
	        view1.id = "view1_sample";

	        var input1 = document.createElement("input");
	        field.appendChild(input1);
	        input1.setAttribute("type", "text");
	        input1.style.cssText = 'position:absolute;top:170px;width:150px;height:25px;left:670px';
	        input1.setAttribute("id" ,"input1_sample");
	        input1.onchange = function() {
	        	$('#ebase6_popup').css('width', '300');
	    		$('#ebase6_popup').css('height', '200');
	    		$('#ebase6_popup').css('margin', '-150px 0 0 -100px');
	    		$('#ebase6_shadow').css('display', 'block'); //他入力欄をシャドウ化
	    		$('#ebase6_popup').css('display', 'block'); //ポップアップ表示
	    		$('#ebase6_popup_title').html(messages['TOPDBEXE']); //ポップアップにメッセージ表示
	    		$('#ebase6_popup_body').empty(); //ボディ初期化
	    		$('#ebase6_popup_foot').empty(); //フッター初期化
	    		//実行ボタン作成
	    		var btn = document.createElement("input");
	    		btn.setAttribute('type',"button");
	    		btn.setAttribute('value',messages['BTNSUBMIT']);
	    		btn.setAttribute('id',"ebase6_popup_submit");
	    		$('#ebase6_popup_foot').append(btn);
	    		$('#ebase6_popup_submit').off("click"); //実行ボタンの処理を初期化
	    		$('#ebase6_popup_submit').on("click" , orderNumber ); //実行ボタンの処理変更
	    		$('#ebase6_popup_submit').on("click" , menuClose ); //ポップアップを閉じる
	    		//入力欄作成
	    		var inp = document.createElement("textarea");
	    		inp.setAttribute('id',"order_number");
	    		inp.style.cssText = 'position:absolute;left:0;width:295px;height:128px;';
	    		$('#ebase6_popup_body').append(inp);

	            field.update();

	    	}

		}

		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'GoodsCheck', check:check}, function(jres){

			var option1 = document.createElement("option");
			option1.innerHTML = "選択してください"
			select.appendChild(option1);

			for(i=0;i<jres.tblData.length;i++){
                var option2 = document.createElement("option");
                option2.value = jres.tblData[i]["id"];
                option2.innerHTML = jres.tblData[i]["ITEM_NAME"];
                option2.setAttribute('id',"option_data");
                select.appendChild(option2);
            }

			$("#dataselect").trigger("update");

			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
	}

	// 不足数表示
	function orderNumber() {
		//var sql = prompt("input sql","");
		var ordNum = $('#order_number').val();

		//$('#dataTable').remove();

		var field = document.getElementById("datafield");

		var view = document.createElement("div");
        field.appendChild(view);
        view.innerHTML = "不足数";
        view.style.cssText = 'position:absolute;top:150px;right:410px;';
        view.setAttribute('id',"view_sample");

        var input = document.createElement("input");
        field.appendChild(input);
        input.setAttribute("type", "text");
        input.style.cssText = 'position:absolute;top:170px;width:150px;height:25px;right:300px';
        input.setAttribute('id',"input_sample");

		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'OrderNumber',ordNum:ordNum}, function(jres){

			//pamView.innerHTML="SQL [ " + jres.pams["sql"] + " ]";

			for(i=0;i<jres.tblData.length;i++){
			input.value = jres.tblData[i]["ORDER_NUM"] - $('#input1_sample').val();
			input.innerHTML = jres.tblData[i]["ORDER_NUM"] - $('#input1_sample').val();
			}

            if (input.value > 0) {
            	input.style.cssText = 'position:absolute;top:170px;width:150px;height:25px;right:300px;color:#FF0000';
            } else if (input.value == 0) {
            	input.style.cssText = 'position:absolute;top:170px;width:150px;height:25px;right:300px;color:#000000';
            }

		});
	}

	//セレクトボックス変更による処理
	function selectChange() {
		//var sql = prompt("input sql","");
		var list = $('#ebase6_popup_item').val();

		$('#dataTable').remove();
		$('#ebase6_pamview').remove();

		var field = document.getElementById("datafield");

		var table = document.createElement("table");
		field.appendChild(table);
		table.className = "tablesorter";
		table.id = "dataTable";
		table.style.cssText = 'position:absolute;top:160px;width:500px;height:25px;left:160px;';

		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'GoodsList',list:list }, function(jres){

			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table.appendChild(theadElem);
			theadElem.appendChild(trElem);

			var ssSearch = document.getElementById("ss_select");

			/*for(i=0;i<jres.keys.length;i++){
				//テーブルにカラム名を表示
				var col = jres.keys[i];
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML=jres.tblColData[col]["name"];
			}*/

			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			table.appendChild(tbodyElem);

			//データのヒットがない場合、空行を作成
			/*if(jres.tblData.length==0){
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for(i=0;i<jres.keys.length;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
				}
			}*/

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

});
