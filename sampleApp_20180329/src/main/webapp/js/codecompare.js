/**
 * javascript for orderexe
 */

/**
* 発注作業画面の処理はここに書く
*/
$(function() {

	//発注作業画面表示
	$.orderexe = function() {
		firstpageOrder();
	}

	function firstpageOrder() {
		$('#datafield').empty();
		$('#ebase6_matHead').remove();
		$('#dataTable').remove();
		$('#userscreen').html('発注 | ');


		var field = document.getElementById("datafield");

		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 100px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_PoHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_PoHeadText').html("発注")
		
		var tablecontent = document.createElement("div");
		tablecontent.id = "ebase6_tablecontentOrd";
		field.appendChild(tablecontent);

		var table = document.createElement("table");
		tablecontent.appendChild(table);
		table.className = "tablesorter";
		table.id = "dataTable";
		table.style.cssText = "position:absolute;width:1012px;height:10px;"

		$.postJSON("DQube", { actionID: 'PoList' }, function(jres) {

			//pamView.innerHTML="SQL [ " + jres.pams["sql"] + " ]";

			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table.appendChild(theadElem);
			theadElem.appendChild(trElem);


			for (i = 0; i < jres.keys.length + 1; i++) {
				//テーブルにカラム名を表示
				var col = jres.keys[i - 1];
				if (i == 0) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.style.cssText = 'padding:5px;width:35px;border:1px black solid;display:none;';
					thElem.setAttribute('id','checkboxcol');
				} else if (i == 1) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "発注ID";
					thElem.setAttribute("class","Idcol");

				} else if (i == 2) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "食材名";
				} else if (i == 3) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "単位";
				} else if (i == 4) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "単価";
				} else if (i == 5) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "消費期間";
				} else if (i == 6) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "仕入れ店";
				} else if (i == 7) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "発注日";
				} else if (i == 8) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "納品予定日";
				} else if (i == 9) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "発注数";
				} else if (i == 10) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "発注備考";
				}

			}

			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			table.appendChild(tbodyElem);
			tbodyElem.setAttribute("id", "tbody_Po");
			tbodyElem.style.cssText = "display:contents;position:absolute;height:350px;width:1030px;overflow-y:auto;overflow-x:hidden;";

			//データのヒットがない場合、空行を作成
			if (jres.tblData.length == 0) {
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for (i = 0; i < jres.keys.length; i++) {
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "FC2604";
					tdElem.style.cssText = 'height:16px;';
					tdElem.setAttribute('id', i+1);
					if(i == 0){
							tdElem.setAttribute("class","Idcol");
					}
				}
			}

			for (j = 0; j < jres.tblData.length; j++) { //データの書きだし
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for (i = 0; i < jres.keys.length + 1; i++) {
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					if (i == 0) {
						var check = document.createElement("input");
						var rcheck = "chbox" + j;
						tdElem.appendChild(check);
						check.setAttribute('type', "checkbox");
						check.setAttribute('id', rcheck);
						check.setAttribute('class', "recheck")
						check.setAttribute('checkd', "checked");
						check.style.cssText = 'width:20px';
						tdElem.style.cssText = 'display:none;';
						tdElem.setAttribute('class','checkboxrow');
						$(rcheck).off("check");
					} else {
						var col = jres.keys[i - 1];
						tdElem.innerHTML = jres.tblData[j][col];
						tdElem.setAttribute('id', j * 10 + i);
						tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';
						if(i == 1){
							tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;display:none;';
						}
					}
				}
			}

			//背景色の高さはデータ量による
			var x = table.tBodies[0].rows.length;
			var hadjust = 32+28*x;
			table.style.cssText = "position:absolute;width:1012px;height:"+hadjust+"px;max-height:380px;";
			
			
			$("#dataTable").tablesorter({
				widgets: ['zebra'],
				sortList: [[7, 1]],
				headers: { 0: { sorter: false } }

			});
			
		
			//食材修正ボタン作成
			var btnh = document.createElement("input");
			tablecontent.appendChild(btnh);
			btnh.setAttribute('type', "button");
			btnh.setAttribute('value', "発注修正");
			btnh.setAttribute('id', "PoEdit");
			btnh.style.cssText = 'font-size:1em;padding: 5px;background-color: orange;position:absolute;left :95px;top:400px;cursor:pointer;'
			$('#PoEdit').off("click");
			$('#PoEdit').on("click", insertdata);
			
			if($('#2').html() == ''){
				$('#PoEdit').hide();
			} else{
				$('#PoEdit').show();
			}

			$("#dataTable").trigger("update");

			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
		
		//新規登録ボタン作成
			var btns = document.createElement("input");
			tablecontent.appendChild(btns);
			btns.setAttribute('type', "button");
			btns.setAttribute('value', "新規発注");
			btns.setAttribute('id', "NewPo");
			btns.style.cssText = 'font-size:1em;padding: 5px;background-color: green;position:absolute;left:5px;top:400px;cursor:pointer;'
			$('#NewPo').off("click");
			$('#NewPo').on("click", orderingWork);
		

		$('.ebase6_mainReturn').css('display', 'block');
		$('.ebase6_returnItemlist').css('display', 'none');

	}

	//発注商品の選択
	function orderingWork() {
		$('#ebase6_matHead').remove();

		var field = document.getElementById("datafield");
		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 150px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_PoHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_PoHeadText').html("発注")

		var matSubText = document.createElement("div");
		matSubText.id = "ebase6_matSubText";
		matHead.appendChild(matSubText);
		matSubText.style.cssText = "background-color: #59B7EA;"
		$('#ebase6_matSubText').html("新規")

		var select = document.createElement("select");
		field.appendChild(select);
		select.id = "dataSelect";
		select.style.cssText = 'position:relative;width:150px;height:30px;left:10px;';
		select.onchange = function() {


			if (document.getElementById("ebase6_popup_submit") == null) {
				//実行ボタン作成
				var btn = document.createElement("input");
				btn.setAttribute('type', "button");
				btn.setAttribute('value', "新規確定");
				btn.setAttribute('id', "ebase6_popup_submit");
				btn.style.cssText = "position:relative;top:100px;left:600px;width:80px;background-color:#59B7EA;cursor:pointer;border-color:black;"
				field.appendChild(btn);
				$('#ebase6_popup_submit').off("click"); //実行ボタンの処理を初期化
				$('#ebase6_popup_submit').on("click", insertPoData); //実行ボタンの処理変更
			}

		};
		var btnreturn = document.createElement("input");
		field.appendChild(btnreturn);
		btnreturn.setAttribute('type', "button");
		btnreturn.setAttribute('value', "戻る");
		btnreturn.setAttribute('class', "ebase6_returnItemlist");
		btnreturn.style.cssText = "top:300px;left:680px;width:80px;cursor:pointer;"
		$('.ebase6_returnItemlist').off("click");
		$('.ebase6_returnItemlist').on("click", firstpageOrder);

		//SQL文：単位、原価、前日発注数、在庫数表示
		//select UNIT,COST,ORDER_NUM,STOCK from ITEM_MST i inner join SUPPLY_HISTORY su on i.id = su.id inner join STOCK_HISTORY so on i.id = so.id where i.id = 2 and su.SUPPLY_DAY = ADDDATE(CURRENT_DATE(), -1);


		//submit処理開始
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube", { actionID: 'GoodsList' }, function(jres) {

			//pamView.innerHTML="SQL [ " + jres.pams["sql"] + " ]";

			var option1 = document.createElement("option");
			option1.innerHTML = "選択してください"
			select.appendChild(option1);

			for (i = 0; i < jres.tblData.length; i++) {
				var option2 = document.createElement("option");
				option2.value = jres.tblData[i]["MaterialName"];
				option2.innerHTML = jres.tblData[i]["MaterialName"];
				option2.setAttribute('id', "option_data" + i);
				select.appendChild(option2);
			}

			$("#dataSelect").trigger("update");

			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
		select.addEventListener("change", getMatData);

		$('.ebase6_mainReturn').css('display', 'none');
		$("#dataTable").css("display", "none");
		$("#dataTable1").css("display", "none");
		$("#NewPo").css("display", "none");
		$("#PoEdit").css("display", "none");
	}

	//選択した食材情報を表示する関数
	function getMatData() {
		$("#Selectmat_table").remove();
		$("#input_table").remove();
		var getValue = document.getElementById('dataSelect').selectedOptions[0].value;
		var item = getValue;
		var field = document.getElementById("datafield");
		var table1 = document.createElement("table");
		field.appendChild(table1);
		table1.id = "Selectmat_table";
		table1.class = "tablesorter";
		table1.style.cssText = "position:relative;top:10px;left:10px;width:500px;border-collapse: collapse;"
		$.postJSON("DQube", { actionID: 'GoodsSelect', item: item }, function(jres) {

			var theadElem1 = document.createElement("thead");  //DOM型で要素をAppendしていく
			var trElem1 = document.createElement("tr");
			table1.appendChild(theadElem1);
			theadElem1.appendChild(trElem1);

			for (i = 0; i < jres.keys.length; i++) {
				if (i == 0) {
					var thElem1 = document.createElement("th");
					trElem1.appendChild(thElem1);
					thElem1.innerHTML = "食材ID";
					thElem1.setAttribute("class", "Idcol");
					thElem1.style.cssText = "font-size:0.7em;";
				} else if (i == 1) {
					var thElem1 = document.createElement("th");
					trElem1.appendChild(thElem1);
					thElem1.innerHTML = "食材名";
					thElem1.style.cssText = "font-size:0.7em;";
				} else if (i == 2) {
					var thElem1 = document.createElement("th");
					trElem1.appendChild(thElem1);
					thElem1.innerHTML = "単位";
					thElem1.style.cssText = "font-size:0.7em;"
				} else if (i == 3) {
					var thElem1 = document.createElement("th");
					trElem1.appendChild(thElem1);
					thElem1.innerHTML = "単価";
					thElem1.style.cssText = "font-size:0.7em;";
				} else if (i == 4) {
					var thElem1 = document.createElement("th");
					trElem1.appendChild(thElem1);
					thElem1.innerHTML = "消費期間";
					thElem1.style.cssText = "font-size:0.7em;";
				} else if (i == 5) {
					var thElem1 = document.createElement("th");
					trElem1.appendChild(thElem1);
					thElem1.innerHTML = "仕入れ店";
					thElem1.style.cssText = "font-size:0.7em;";
				} else if (i == 6) {
					var thElem1 = document.createElement("th");
					trElem1.appendChild(thElem1);
					thElem1.innerHTML = "備考";
					thElem1.style.cssText = "width:150px;font-size:0.7em;";
				}
			}

			var tbodyElem1 = document.createElement("tbody");  //データ行を作成
			table1.appendChild(tbodyElem1);

			if (jres.tblData.length == 0) {  //データのヒットがない場合、空行を作成
				var trElem1 = document.createElement("tr");
				tbodyElem1.appendChild(trElem1);
				for (i = 0; i < jres.keys.length; i++) {
					var tdElem1 = document.createElement("td");
					trElem1.appendChild(tdElem1);
					tdElem1.style.cssText = "height:24px";
				}
			}

			for (j = 0; j < jres.tblData.length; j++) { //データの書きだし
				var trElem1 = document.createElement("tr");
				tbodyElem1.appendChild(trElem1);
				for (i = 0; i < jres.keys.length; i++) {
					if (i == 0) {
						var tdElem1 = document.createElement("td");
						trElem1.appendChild(tdElem1);
						tdElem1.style.background = "#fff";
						var col1 = jres.keys[i];
						tdElem1.innerHTML = jres.tblData[j][col1];
						tdElem1.setAttribute("class", "Idcol");
						tdElem1.setAttribute("id", "MatId");
					} else {
						var tdElem1 = document.createElement("td");
						trElem1.appendChild(tdElem1);
						tdElem1.style.background = "#fff";
						var col1 = jres.keys[i];
						tdElem1.innerHTML = jres.tblData[j][col1];
						tdElem1.style.cssText = "text-align:right;padding:5px;font-size:0.8em;height:20px;";
					}
				}
			}
			$("#dataTable1").trigger("update");
			return false;
		});

		var table2 = document.createElement("table");
		field.appendChild(table2);
		table2.id = "input_table";
		table2.style.cssText = "position:absolute;top:131px;left:511px;width:400px;border-collapse: collapse;font-size:0.7em;background-color: #FFFFFF"

		var theadElem2 = document.createElement("thead");  //DOM型で要素をAppendしていく
		var trElem2 = document.createElement("tr");
		table2.appendChild(theadElem2);
		theadElem2.appendChild(trElem2);

		var thElem2 = document.createElement("th");
		trElem2.appendChild(thElem2);
		thElem2.innerHTML = "発注数";


		var thElem2 = document.createElement("th");
		trElem2.appendChild(thElem2);
		thElem2.innerHTML = "納品予定日";


		var thElem2 = document.createElement("th");
		trElem2.appendChild(thElem2);
		thElem2.innerHTML = "発注備考";

		var tbodyElem2 = document.createElement("tbody");  //データ行を作成
		table2.appendChild(tbodyElem2);

		var trElem2 = document.createElement("tr");
		tbodyElem2.appendChild(trElem2);

		var tdElem2 = document.createElement("td");
		trElem2.appendChild(tdElem2);
		var input1 = document.createElement("input");
		tdElem2.appendChild(input1);
		input1.setAttribute('id', 'input_1');
		input1.setAttribute('type', 'number');
		input1.setAttribute("maxlength", "11");
		input1.setAttribute("oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
		input1.style.cssText = "width:100%;border:none;box-sizing:border-box;";

		var tdElem2 = document.createElement("td");
		trElem2.appendChild(tdElem2);
		var input2 = document.createElement("input");
		input2.setAttribute('type', 'date');
		input2.setAttribute('id', 'input_2');
		tdElem2.appendChild(input2);
		input2.style.cssText = "width:100%;border:none;box-sizing:border-box;";

		var tdElem2 = document.createElement("td");
		trElem2.appendChild(tdElem2);
		tdElem2.style.cssText = "height:24px";
		var input3 = document.createElement("input");
		tdElem2.appendChild(input3);
		input3.setAttribute('id', 'input_3');
		input3.style.cssText = "width:100%;border:none;box-sizing:border-box;";

	};

	function insertPoData() {
		$('#dataTable').remove();
		var id = document.getElementById("MatId").innerHTML;
		var ord = $('#input_1').val();
		var scheduled = $('#input_2').val();
		var poremark = $('#input_3').val();
		if(Number.isInteger(parseInt(ord)) == false){
					alert("発注数を入力してください");
					return false;
				} else if( scheduled == ''){
					alert('納品予定日を選択してください');
					return false;
				} 
		$.postJSON("DQube", { actionID: 'CheckDuplicateOrder', scheduled: scheduled,id: id }, function(jres){
			var col = jres.keys[0];
			var dataCount = jres.tblData[0][col];
			if(dataCount != 0){
			alert('すでに発注した食材は修正画面に修正してください');
			return false;
			} else{
				$.postJSON("DQube", { actionID: 'PoInsert', id: id, ord: ord, scheduled: scheduled, poremark: poremark }, function() {
					firstpageOrder();
					return false;
				});
			}			
		})
	};


	function SelectMatitem() {
		$('#buttonline').remove();
		$('.ebase6_mainReturn').css('display', 'none');
		$('#NewPo').css('display', 'none');
		$('#PoEdit').css('display', 'none');
		$('#button_ad').remove();
		$('#ebase6_matHead').remove();
		$('#ebase6_matSubText').remove();
		var field = document.getElementById("datafield");
		
		var tablecontent = document.getElementById("ebase6_tablecontentOrd");
		tablecontent.style.cssText = 'top:90px;';
		
		var reposition = document.getElementById("dataTable");
		reposition.style.cssText = "position:absolute;width:1051px;";
		var sizereduce = document.getElementById("tbody_Po");
		sizereduce.style.cssText = "display:block;position:absolute;height:260px;width:1070px;overflow-y:auto;overflow-x:hidden;";
		
		//背景色の高さはデータ量による
		var x = reposition.tBodies[0].rows.length;
		var hadjust = 34+32*x;
		reposition.style.cssText = "position:absolute;width:1051px;height:"+hadjust+"px;max-height:290px;overflow-y:auto;overflow-x:hidden;"

		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 150px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_PoHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_PoHeadText').html("発注")

		var matSubText = document.createElement("div");
		matSubText.id = "ebase6_matSubText";
		matHead.appendChild(matSubText);
		matSubText.style.cssText = "background-color: #FF9B9B;"
		$('#ebase6_matSubText').html("修正")

		var buttonline = document.createElement("div");
		buttonline.id = "buttonline";
		buttonline.style.cssText = 'margin:5px;position:absolute;top:-40px;';
		tablecontent.appendChild(buttonline);
		var btnad = document.createElement("input");
		buttonline.appendChild(btnad);
		btnad.setAttribute('type', "button");
		btnad.setAttribute('value', "追加/削除");
		btnad.setAttribute('id', "button_ad");
		btnad.style.cssText = 'position:relative;;background-color:	#C0C0C0;cursor:pointer;';
		$('#button_ad').off("click");
		$('#button_ad').on("click", getCheckedData);
		
		var checkboxcol = document.getElementById("checkboxcol");
		checkboxcol.style.cssText = "padding:5px;width:35px;border:1px black solid;";
		var all = document.getElementsByClassName('checkboxrow');
		for (var i = 0; i < all.length; i++) {
		 all[i].style.cssText = 'background-color:white;';
		}
		
		var btnreturn = document.createElement("input");
		field.appendChild(btnreturn);
		btnreturn.setAttribute('type', "button");
		btnreturn.setAttribute('value', "戻る");
		btnreturn.setAttribute('class', "ebase6_returnItemlist");
		btnreturn.setAttribute('id', "button_rt");
		btnreturn.style.cssText = "top:300px;left:90%;";
		$('#button_rt').off("click");
		$('#button_rt').on("click", firstpageOrder);
	};




	//品物データの登録処理
	function insertdata() {
		SelectMatitem()

	};



	//品物データの修正処理
	function getCheckedData() {
		var field = document.getElementById("datafield");
		var tablecontent = document.getElementById("ebase6_tablecontentOrd");
		var table = document.getElementById("dataTable");
		var tbodyRowCount = table.tBodies[0].rows.length;
		
		tablecontent.style.cssText = "position:absolute;top:90px;"

		$('#button_rt').remove();
		$('#ebase6_listCreateTable').remove();
		var listCreateTable = document.createElement("div");
		listCreateTable.id = "ebase6_listCreateTable";
		listCreateTable.style.cssText = 'top:300px;width:1163px;';
		tablecontent.appendChild(listCreateTable);
		
		tableord = document.createElement('table');
		listCreateTable.appendChild(tableord);
		tableord.id = "tableord";
		tableord.className = "tablesorter";
		tableord.style.cssText = 'border-collapse:collapse;';
		
		var theadElemOrd = document.createElement("thead"); 
		var trElemOrd = document.createElement("tr");
		tableord.appendChild(theadElemOrd);
		theadElemOrd.appendChild(trElemOrd);
	
		var view10 = document.createElement("th");
		tableord.appendChild(view10);
		view10.innerHTML = "発注ID";
		view10.id = "view1_sample";
		view10.style.cssText ='display:none;';

		var view1 = document.createElement("th");
		tableord.appendChild(view1);
		view1.innerHTML = "食材名";
		view1.id = "view1_sample";

		var view2 = document.createElement("th");
		tableord.appendChild(view2);
		view2.innerHTML = "単位";
		view2.id = "view2_sample";

		var view3 = document.createElement("th");
		tableord.appendChild(view3);
		view3.innerHTML = "単価";
		view3.id = "view3_sample";

		var view4 = document.createElement("th");
		tableord.appendChild(view4);
		view4.innerHTML = "消費期間";
		view4.id = "view4_sample";

		var view5 = document.createElement("th");
		tableord.appendChild(view5);
		view5.innerHTML = "仕入れ店";
		view5.id = "view5_sample";

		var view6 = document.createElement("th");
		tableord.appendChild(view6);
		view6.innerHTML = "発注数";
		view6.id = "view6_sample";

		var view7 = document.createElement("th");
		tableord.appendChild(view7);
		view7.innerHTML = "納品予定日";
		view7.id = "view7_sample";

		var view8 = document.createElement("th");
		tableord.appendChild(view8);
		view8.innerHTML = "発注日";
		view8.id = "view8_sample";

		var view9 = document.createElement("th");
		tableord.appendChild(view9);
		view9.innerHTML = "発注備考";
		view9.id = "view9_sample";
		
		var tbodyElemOrd = document.createElement('tbody');
		tableord.appendChild(tbodyElemOrd);
		tbodyElemOrd.setAttribute("id", "tbody_editOrd");

		var k = 0;
		for (j = 0; j < tbodyRowCount; j++) {
			var rcheck = "chbox" + j;
			var x = document.getElementById(rcheck).checked;
			if (x == true) {
				var trElem = document.createElement("tr");
				tbodyElemOrd.appendChild(trElem);
				for (i = 1; i <= 10; i++) {
					var delem = j * 10 + i;
					if (delem % 10 == 1) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x;
						var input = 'input' + k + i;
						tdElem.setAttribute('id',input);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;display:none;';
					} else if (delem % 10 == 2) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x;
						var input = 'input' + k + i;
						tdElem.setAttribute('id',input);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;';
					} else if (delem % 10 == 3 || delem % 10 == 4) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x;
						var input = 'input' + k + i;
						tdElem.setAttribute('id',input);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;';
					} else if (delem % 10 == 5 || delem % 10 == 6) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x;
						var input = 'input' + k + i;
						tdElem.setAttribute('id',input);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;';
					} else if (delem % 10 == 7) {
						delem = j * 10 + 9;
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:6px;width:110px;border:1px black solid;box-sizing:border-box;';
						var datainput = document.createElement('input');
						tdElem.appendChild(datainput);
						datainput.value = x;
						datainput.setAttribute('type', 'number');
						datainput.setAttribute('maxlength', '11');
						datainput.style.cssText = 'width:90%;color:blue;text-align:center;font-size:10pt;border:none;padding:3px;';
						var input = 'input' + k + i;
						datainput.setAttribute('id',input);
						datainput.setAttribute("oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
					} else if (delem % 10 == 8) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:6px;width:110px;border:1px black solid;box-sizing:border-box;';
						var datainput = document.createElement('input');
						tdElem.appendChild(datainput);
						datainput.value = x;
						datainput.setAttribute('type', 'date');
						datainput.style.cssText = 'width:90%;color:blue;text-align:center;font-size:10pt;border:none;padding:3px;';
						var input = 'input' + k + i;
						datainput.setAttribute('id',input);
					} else if (delem % 10 == 9) {
						delem = j * 10 + 7;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x;
						var input = 'input' + k + i;
						tdElem.setAttribute('id',input);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;';
					} else if (delem % 10 == 0) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x;
						tdElem.setAttribute('contenteditable', true);
						var input = 'input' + k + i;
						tdElem.setAttribute('id',input);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:6px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;color:blue;font-size:10pt;';
					}
				}
				k += 1;
			}

		}
		
		$(".allownumeric").on('keydown keyup', function(e) {
		  if (!/^\d+$/.test(e.key)) {
		    e.preventDefault();
		  }
		});
		$(".onlynumeric").on('keydown keyup', function() {
			addDashes(this);
		});
		var btn = document.createElement("input");
		listCreateTable.appendChild(btn);
		btn.setAttribute('type', "button");
		btn.setAttribute('value', "修正確定");
		btn.setAttribute('id', "button_cc");
		btn.style.cssText = 'position:relative;top:10px;left:5px;background-color:#FF9B9B;cursor:pointer;';
		$('#button_cc').off("click");
		$('#button_cc').on("click", updatePO);

		var btnreturn = document.createElement("input");
		listCreateTable.appendChild(btnreturn);
		btnreturn.setAttribute('type', "button");
		btnreturn.setAttribute('value', "戻る");
		btnreturn.setAttribute('class', "ebase6_returnItemlist");
		btnreturn.setAttribute('id', "button_rt");
		btnreturn.style.cssText = "left:75%;";	
		$('#button_rt').off("click");
		$('#button_rt').on("click", firstpageOrder);
	}
	
	function updatePO() {
		var table = document.getElementById("tableord");
		var tbodyRowCount = table.tBodies[0].rows.length;
		var tableCount = 0;
		for (j = 0; j < tbodyRowCount; j++) {
				var input_1 = "input" + j + 7;
				var input_2 = "input" + j + 8;
				var input_3 = "input" + j + 10;
				var input_7 = "input" + j + 1;

				var order = document.getElementById(input_1).value;
				if (parseInt(order) == order) {
				} else {
					alert("数字を入れてください");
					return false;
				}
				var delidate = document.getElementById(input_2).value;
				var poremark = document.getElementById(input_3).innerHTML;
				var id = document.getElementById(input_7).innerHTML;
				
				tablecontent = document.getElementById("ebase6_tablecontentOrd");
				tablecontent.style.cssText = "top:90px;";

				//$.ajaxSetup({ async: false });	
				$.postJSON("DQube", { actionID: 'PoUpdateData', order: order, delidate: delidate, poremark: poremark, id: id }, function(jres) {
					if (tableCount == 0) {
						$('#dataTable').remove();
						var table = document.createElement("table");
						tablecontent.appendChild(table);
						table.className = "tablesorter";
						table.id = "dataTable";
						table.style.cssText = "position:absolute;width:1012px;"

						//DOM型で要素をAppendしていく
						var theadElem = document.createElement("thead");
						var trElem = document.createElement("tr");
						table.appendChild(theadElem);
						theadElem.appendChild(trElem);


						for (i = 0; i < jres.keys.length + 1; i++) {
							//テーブルにカラム名を表示
							var col = jres.keys[i - 1];
							if (i == 0) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.style.cssText = 'padding:5px;width:35px;border:1px black solid;display:none;';
								thElem.setAttribute('id','checkboxcol');
							} else if (i == 1) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "発注ID";
								thElem.setAttribute("class","Idcol");

							} else if (i == 2) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "食材名";
							} else if (i == 3) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "単位";
							} else if (i == 4) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "単価";
							} else if (i == 5) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "消費期間";
							} else if (i == 6) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "仕入れ店";
							} else if (i == 7) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "発注日";
							} else if (i == 8) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "納品予定日";
							} else if (i == 9) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "発注数";
							} else if (i == 10) {
								var thElem = document.createElement("th");
								trElem.appendChild(thElem);
								thElem.innerHTML = "発注備考";
							}

						}
						
						//データ行を作成
						var tbodyElem = document.createElement("tbody");
						table.appendChild(tbodyElem);
						tbodyElem.setAttribute("id", "tbody_Po");
						tbodyElem.style.cssText = "display:block;position:absolute;height:350px;width:1030px;overflow-y:auto;overflow-x:hidden;"

						//データのヒットがない場合、空行を作成
						if (jres.tblData.length == 0) {
							var trElem = document.createElement("tr");
							tbodyElem.appendChild(trElem);
							for (i = 0; i < jres.keys.length; i++) {
								var tdElem = document.createElement("td");
								trElem.appendChild(tdElem);
								tdElem.style.background = "FC2604";
							}
						}

						for (j = 0; j < jres.tblData.length; j++) { //データの書きだし
							var trElem = document.createElement("tr");
							tbodyElem.appendChild(trElem);
							for (i = 0; i < jres.keys.length + 1; i++) {
								var tdElem = document.createElement("td");
								trElem.appendChild(tdElem);
								tdElem.style.background = "#fff";
								if (i == 0) {
									var check = document.createElement("input");
									var rcheck = "chbox" + j;
									tdElem.appendChild(check);
									check.setAttribute('type', "checkbox");
									check.setAttribute('id', rcheck);
									check.setAttribute('class', "recheck")
									check.setAttribute('checkd', "checked");
									check.style.cssText = 'width:20px'
									tdElem.style.cssText = 'display:none;';
									tdElem.setAttribute('class','checkboxrow');
									$(rcheck).off("check");
								} else {
									var col = jres.keys[i - 1];
									tdElem.innerHTML = jres.tblData[j][col];
									tdElem.setAttribute('id', j * 10 + i);
									tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';
									if( i == 1){
										tdElem.setAttribute("class","Idcol");
									}
								}
							}
						}
						//背景色の高さはデータ量による
						var x = table.tBodies[0].rows.length;
						var hadjust = 20+30*x;
						table.style.cssText = "position:absolute;width:1012px;height:"+hadjust+"px;max-height:380px;";


						$("#dataTable").tablesorter({
							widgets: ['zebra'],
							sortList: [[7, 1]],
							headers: { 0: { sorter: false } }

						});
					
						
						$("#dataTable").trigger("update");
						tableCount += 1;
						return false;
					}					
				});

		}
		
		matHead = document.getElementById('ebase6_matHead');
		matHead.style.cssText = "left:calc(50% - 100px);"

		$('.ebase6_mainReturn').css('display', 'block');
		$('.ebase6_returnItemlist').css('display', 'none');
		$('#button_cc').css('display', 'none');
		$('#PoEdit').show();
		$('#NewPo').show();
		$('#button_ad').remove();
		$('.ebase6_returnItemlist').css('display', 'none');
		$("#dataTable").trigger("update");
		$('#ebase6_matSubText').remove();
		$('#ebase6_listCreateTable').remove();
		return false;

	}
	
	$.orderexeshortcut = function() {
		$('.ebase6_mainReturn').hide();
		$('#ebase6_tablecontentInvmng').hide();
		$('#dataTableInvmng').hide();
		$('#tbody_Invmng').hide();
		$('#InvValText').hide();
		$('#allInvVal').hide();
		$('#inputdate').hide();
		$('#ebase6_invmngText').html("簡単発注");
		$('#ebase6_invmngText').css("background-color","#F5D98B");
		$('#userscreen').html('発注 | ');
		var field = document.getElementById('datafield');
		var table = document.getElementById('dataTableInvmng');
		var rowCount = table.tBodies[0].rows.length;
		
		
		var quickordcontainer = document.createElement("div");
		field.appendChild(quickordcontainer);
		quickordcontainer.id = "quickordcontainer";
		
		var tablequickord = document.createElement("table");
		quickordcontainer.appendChild(tablequickord);
		tablequickord.className = "tablesorter";
		tablequickord.id = "tablequickord";
		tablequickord.style.cssText = "position:relative;width:330px;height:10px;text-align:center;";
		
		var btn = document.createElement("input");
		btn.setAttribute('type', "button");	
		btn.setAttribute('value', "新規確定");
		btn.setAttribute('id', "ebase6_popup_submit");
		btn.style.cssText = "position:relative;top:20px;left:5px;width:80px;background-color:#59B7EA;cursor:pointer;border-color:#a9f6f4;"
		quickordcontainer.appendChild(btn);
		$('#ebase6_popup_submit').off("click"); //実行ボタンの処理を初期化
		$('#ebase6_popup_submit').on("click", insertPoQuickData); //実行ボタンの処理変更
		
		var btnreturn = document.createElement("input");
		quickordcontainer.appendChild(btnreturn);
		btnreturn.setAttribute('type', "button");
		btnreturn.setAttribute('value', "戻る");
		btnreturn.setAttribute('id', "ebase6_returnInvmng");
		$('#ebase6_returnInvmng').off("click");
		$('#ebase6_returnInvmng').on("click", $.inventorymanagement);
				
		var theadElem = document.createElement("thead");
		var trElem = document.createElement("tr");
		tablequickord.appendChild(theadElem);
		theadElem.appendChild(trElem);
		
		var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "食材ID";
		
		var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "食材名";
			
		var thElem = document.createElement("th");
		trElem.appendChild(thElem);
		thElem.innerHTML = "発注数";
		
		var thElem = document.createElement("th");
		trElem.appendChild(thElem);
		thElem.innerHTML = "発注備考";
		
		var tbodyElem = document.createElement("tbody");
			tablequickord.appendChild(tbodyElem);
			//tbodyElem.setAttribute("id", "tbody_Invmng");
			
		var k = 0;
		for(j=0;j<rowCount;j++){
			var col0 = 'col' + j + 0;
			var getcol0 = document.getElementById(col0);
			var col6 = 'col' + j + 6;
			var getcol6 = document.getElementById(col6);
			var col7 = 'col' + j + 7;
			var getcol7 = document.getElementById(col7);
			if(getcol6.innerHTML != '0.0'){
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					var matid = getcol7.innerHTML;
					tdElem.innerHTML = matid;
					tdElem.setAttribute('id', 'input' + k + 0);
					tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;';
				var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					var matname = getcol0.innerHTML;
					tdElem.innerHTML = matname;
					tdElem.setAttribute('id', 'input' + k + 1);
					tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;';
				var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					var ordqua = parseFloat(getcol6.innerHTML);
					tdElem.innerHTML = Math.ceil(ordqua);
					tdElem.setAttribute('id', 'input' + k + 2);
					tdElem.setAttribute('contenteditable', 'true');
					tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;';
				var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff"
					text = document.createElement('input');
					tdElem.appendChild(text);
					text.setAttribute('value','quickpost');
					text.setAttribute('spellcheck','false');
					text.setAttribute('id', 'input' + k + 3);
					text.style.cssText = 'text-align:center;';
					k += 1;
			}
		}
	}
	
	function insertPoQuickData() {
		var tablequickord = document.getElementById("tablequickord");
		var rowCountquickord = tablequickord.tBodies[0].rows.length;
		var Date1 = new Date();
		Date1.setDate(Date1.getDate() +1); 
		var tmr = Date1.getFullYear()+'-'+(Date1.getMonth()+1)+'-'+Date1.getDate();
		for(k=0;k<rowCountquickord;k++){
			var getval1 = 'input' + k + 0;
			var getval2 = 'input' + k + 2;
			var getval4 = 'input' + k + 3;
			var id = document.getElementById(getval1).innerHTML; 
			var ord = document.getElementById(getval2).innerHTML; 
			var scheduled = tmr; 
			var poremark = document.getElementById(getval4).value; 
			$.ajaxSetup({ async: false }); //同期
			$.postJSON("DQube", { actionID: 'PoInsert', id: id, ord: ord, scheduled: scheduled, poremark: poremark }, function() {
			return false;
			});
			$.ajaxSetup({ async: true }); //同期
		}
			firstpageOrder();
	};
	

});