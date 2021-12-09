/**
 * javascript for itemlist
 */

$(function() {

	//品物一覧表示
	$.itemlist = function itemlist() {
		firstpageItem();
		$('#userscreen').html('食材リスト | ');
	}


	function firstpageItem() {
		$('#datafield').empty();
		$('#ebase6_matHead').remove();
		$('#dataTable').remove();

		var field = document.getElementById("datafield");

		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 100px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_matHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_matHeadText').html("食材リスト")
		
		var tablecontent = document.createElement("div");
		tablecontent.id = "ebase6_tablecontent";
		field.appendChild(tablecontent);
		tablecontent.style.cssText = "position:absolute;left:calc(50% - 338px);"
		
		
		var table = document.createElement("table");
		tablecontent.appendChild(table);
		table.className = "tablesorter";
		table.id = "dataTable";
		table.style.cssText = "position:absolute;width:676px;"

		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube", { actionID: 'GoodsList' }, function(jres) {
			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table.appendChild(theadElem);
			theadElem.appendChild(trElem);


			for (i = 0; i < jres.keys.length + 1; i++) {
				//テーブルにカラム名を表示
				var col = jres.keys[i];
				if (i == 0) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.style.cssText = "padding:5px;width:35px;border:1px black solid;display:none;"
					thElem.setAttribute('id','checkboxcol');
				} else if (i == 1) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "食材ID";
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
					thElem.innerHTML = "食材備考";
				}
			}

			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			table.appendChild(tbodyElem);
			tbodyElem.setAttribute("id", "tbody_mat")
			tbodyElem.style.cssText = "display:block;position:absolute;height:330px;overflow-y:auto;overflow-x:hidden;"

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
						if(i == 1){
							tdElem.setAttribute("class","Idcol");
						}
					}
				}
			}
			$("#dataTable").tablesorter({
				widgets: ['zebra'],
				sortList: [[1, 0]],
				headers: { 0: { sorter: false } }
				
				

			});
			
			//食材修正ボタン作成
			var btn = document.createElement("input");
			tablecontent.appendChild(btn);
			btn.setAttribute('type', "button");
			btn.setAttribute('value', "食材修正");
			btn.setAttribute('id', "matEdit");
			btn.style.cssText = 'font-size:1em;padding: 5px;background-color: orange;position:absolute;left:95px;top:380px;cursor:pointer;'
			$('#matEdit').off("click");
			$('#matEdit').on("click", correctitem);	
			
			if($('#2').html() == ''){
				$('#matEdit').hide();
			} else{
				$('#matEdit').show();
			}
			
			//背景色の高さはデータ量による
			var x = table.tBodies[0].rows.length;
			var hadjust = 32+28*x;
			table.style.cssText = "position:absolute;width:676px;height:"+hadjust+"px;max-height:360px;"

			$("#dataTable").trigger("update");
			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});



		//新規登録ボタン作成
		var btn = document.createElement("input");
		tablecontent.appendChild(btn);
		btn.setAttribute('type', "button");
		btn.setAttribute('value', "新規登録");
		btn.setAttribute('id', "new_sample");
		btn.style.cssText = 'font-size:1em;padding: 5px;background-color: green;position:absolute;left:5px;top:380px;cursor:pointer;'
		$('#new_sample').off("click");
		$('#new_sample').on("click", newgoods);

		


		$('.ebase6_mainReturn').css('display', 'block');
		$('.ebase6_returnItemlist').css('display', 'none');

	}



	/* 新規登録ボタン押下処理 */
	function newgoods() {
		$('#dataTable').remove();
		$('#datafield').empty();
		$('#matEdit').remove();
		$('#new_sample').remove();
		$('.ebase6_mainReturn').css('display', 'none');
		$('.ebase6_returnItemlist').show();


		var field = document.getElementById("datafield");

		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_matHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_matHeadText').html("食材リスト")

		var matSubText = document.createElement("div");
		matSubText.id = "ebase6_matSubText";
		matHead.appendChild(matSubText);
		$('#ebase6_matSubText').html("新規登録")


		var listCreateTable = document.createElement("div");
		listCreateTable.id = "ebase6_listCreateTable";
		field.appendChild(listCreateTable);

		var view1 = document.createElement("div");
		listCreateTable.appendChild(view1);
		view1.innerHTML = "食材名";
		view1.style.cssText = 'position:absolute;border:solid 1px;min-width:100px;width:15%;background-color:grey;padding:5px;text-align:center;box-sizing: border-box;';
		view1.id = "view1_sample";

		var view2 = document.createElement("div");
		listCreateTable.appendChild(view2);
		view2.innerHTML = "単位";
		view2.style.cssText = 'position:absolute;left:15%;border:solid 1px;min-width:50px;width:7.5%;background-color:grey;padding:5px;text-align:center;box-sizing: border-box;';
		view2.id = "view2_sample";

		var view3 = document.createElement("div");
		listCreateTable.appendChild(view3);
		view3.innerHTML = "単価";
		view3.style.cssText = 'position:absolute;left:22.5%;border:solid 1px;min-width:50px;width:7.5%;background-color:grey;padding:5px;text-align:center;box-sizing: border-box;';
		view3.id = "view3_sample";

		var view4 = document.createElement("div");
		listCreateTable.appendChild(view4);
		view4.innerHTML = "消費期間";
		view4.style.cssText = 'position:absolute;left:30%;border:solid 1px;min-width:100px;width:15%;background-color:grey;padding:5px;text-align:center;box-sizing: border-box;';
		view4.id = "view4_sample";

		var view5 = document.createElement("div");
		listCreateTable.appendChild(view5);
		view5.innerHTML = "仕入れ店";
		view5.style.cssText = 'position:absolute;left:45%;border:solid  1px;min-width:100px;width:15%;background-color:grey;padding:5px;text-align:center;box-sizing: border-box;';
		view5.id = "view5_sample";

		var view6 = document.createElement("div");
		listCreateTable.appendChild(view6);
		view6.innerHTML = "食材備考";
		view6.style.cssText = 'position:absolute;left:60%;border:solid 1px;min-width:250px;width:40%;background-color:grey;padding:5px;text-align:center;box-sizing: border-box;';
		view6.id = "view6_sample";


		var input1 = document.createElement("input");
		listCreateTable.appendChild(input1);
		input1.setAttribute("type", "text");
		input1.setAttribute("maxlength", "50");
		input1.style.cssText = 'position:absolute;top:35px;min-width:100px;width:15%;height:35px;padding:5px;text-align:center;box-sizing: border-box;';
		input1.setAttribute("id", "input1_sample");

		var input2 = document.createElement("input");
		listCreateTable.appendChild(input2);
		input2.setAttribute("type", "text");
		input2.setAttribute("maxlength", "200");
		input2.style.cssText = 'position:absolute;top:35px;left:15%;min-width:50px;width:7.5%;height:35px;padding:5px;text-align:center;box-sizing: border-box;';
		input2.setAttribute("id", "input2_sample");

		var input3 = document.createElement("input");
		listCreateTable.appendChild(input3);
		input3.setAttribute("oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
		input3.setAttribute("type", "number");
		input3.setAttribute("maxlength", "11");
		input3.style.cssText = 'position:absolute;top:35px;left:22.5%;height:35px;min-width:50px;width:7.5%;padding:5px;text-align:center;box-sizing: border-box;';
		input3.setAttribute("id", "input3_sample");
		var input4 = document.createElement("input");
		listCreateTable.appendChild(input4);
		input4.setAttribute("type", "number");
		input4.setAttribute("maxlength", "3");
		input4.setAttribute("oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
		input4.style.cssText = 'position:absolute;top:35px;left:30%;height:35px;min-width:100px;width:15%;padding:5px;text-align:center;box-sizing: border-box;';
		input4.setAttribute("id", "input4_sample");

		var input5 = document.createElement("input");
		listCreateTable.appendChild(input5);
		input5.setAttribute("type", "text");
		input5.setAttribute("maxlength", "50");
		input5.style.cssText = 'position:absolute;top:35px;left:45%;height:35px;min-width:100px;width:15%;padding:5px;text-align:center;box-sizing: border-box;';
		input5.setAttribute("id", "input5_sample");

		var input6 = document.createElement("input");
		listCreateTable.appendChild(input6);
		input6.setAttribute("type", "text");
		input6.style.cssText = 'position:absolute;top:35px;left:60%;height:35px;min-width:250px;width:40%;padding:5px;text-align:center;box-sizing: border-box;';
		input6.setAttribute("id", "input6_sample");

		var btn = document.createElement("input");
		listCreateTable.appendChild(btn);
		btn.setAttribute('type', "button");
		btn.setAttribute('value', "登録確定");
		btn.setAttribute('id', "button_sample");
		btn.style.cssText = 'position:relative;top:100px;left:15px;background-color:#59B7EA;cursor:pointer;';
		$('#button_sample').off("click");
		$('#button_sample').on("click", insertdata);

		var btnreturn = document.createElement("input");
		listCreateTable.appendChild(btnreturn);
		btnreturn.setAttribute('type', "button");
		btnreturn.setAttribute('value', "戻る");
		btnreturn.setAttribute('class', "ebase6_returnItemlist");
		btnreturn.style.cssText = "top:150px;left 70%;"
		$('.ebase6_returnItemlist').off("click");
		$('.ebase6_returnItemlist').on("click", firstpageItem);


		$('#ebase6_shadow').css('display', 'block');



	}

	/* 新規登録ボタン押下処理 */
	function correctitem() {
		$('#matEdit').hide();
		$('#new_sample').hide();
		$('.ebase6_mainReturn').css('display', 'none');
		$('.ebase6_returnItemlist').show();
		$('#button_ad').remove();
		$('#ebase6_matSubText').remove();
		$('#ebase6_controlmenu').css('display', 'none');
		$('#ebase6_matHead').remove();
		var field = document.getElementById("datafield");
		
		var tablecontent = document.getElementById("ebase6_tablecontent");
		tablecontent.style.cssText = "position:absolute;top:90px;left:calc(50% - 365px);";

		var reposition = document.getElementById("dataTable");
		reposition.style.cssText = "position:absolute;width:715px;";
		var sizereduce = document.getElementById("tbody_mat");
		sizereduce.style.cssText = "display:block;position:absolute;height:200px;overflow-y:auto;overflow-x:hidden;";
		
		//背景色の高さはデータ量による
		var x = reposition.tBodies[0].rows.length;
		var hadjust = 34+32*x;
		reposition.style.cssText = "position:absolute;width:715px;height:"+hadjust+"px;max-height:230px;";

		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 150px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_matHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_matHeadText').html("食材リスト")

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
		$('#button_ad').on("click", addcorrectdata);
		
		//チェックボックスを表示する
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
		btnreturn.style.cssText = "top:250px;left:80%;";	
		$('#button_rt').off("click");
		$('#button_rt').on("click", firstpageItem);
	}
	
	function addcorrectdata(){
		$('#button_rt').remove();
		$('#button_cc').remove();
		var reposition = document.getElementById('dataTable') ;
		var tablecontent = document.getElementById('ebase6_tablecontent');
		var tbodyRowCount = reposition.tBodies[0].rows.length;

		$('#ebase6_listCreateTable').remove();
		
		for (j = 0;j < tbodyRowCount; j++) {
			var rcheck = "chbox" + j;
			var x = document.getElementById(rcheck).checked;
			if(x == true){
				var listCreateTable = document.createElement("div");
				listCreateTable.id = "ebase6_listCreateTable";
				listCreateTable.style.cssText = 'top:250px;';
				tablecontent.appendChild(listCreateTable);
				
						
				tableit = document.createElement('table');
				listCreateTable.appendChild(tableit);
				tableit.id = "tableit";
				tableit.className = "tablesorter";
				tableit.style.cssText = 'border-collapse:collapse;';
				
				var theadElemit = document.createElement("thead"); 
				var trElemit = document.createElement("tr");
				tableit.appendChild(theadElemit);
				theadElemit.appendChild(trElemit);
				
				var view7 = document.createElement("th");
				tableit.appendChild(view7);
				view7.innerHTML = "食材ID";
				view7.id = "view7_sample";
				view7.style.cssText = 'display:none;';
		
				var view1 = document.createElement("th");
				tableit.appendChild(view1);
				view1.innerHTML = "食材名";
				view1.id = "view1_sample";
		
				var view2 = document.createElement("th");
				tableit.appendChild(view2);
				view2.innerHTML = "単位";
				view2.id = "view2_sample";
		
				var view3 = document.createElement("th");
				tableit.appendChild(view3);
				view3.innerHTML = "単価";
				view3.id = "view3_sample";
		
				var view4 = document.createElement("th");
				tableit.appendChild(view4);
				view4.innerHTML = "消費期間";
				view4.id = "view4_sample";
		
				var view5 = document.createElement("th");
				tableit.appendChild(view5);
				view5.innerHTML = "仕入れ店";
				view5.id = "view5_sample";
		
				var view6 = document.createElement("th");
				tableit.appendChild(view6);
				view6.innerHTML = "食材備考";
				view6.id = "view6_sample";
				
				var tbodyElemit = document.createElement('tbody');
				tableit.appendChild(tbodyElemit);
				tbodyElemit.setAttribute("id", "tbody_editIt");
				break;
			}
		}


		var k = 0;
		for (j = 0;j < tbodyRowCount; j++) {
			var rcheck = "chbox" + j;
			var x = document.getElementById(rcheck).checked;
			if(x == true){
				var trElem = document.createElement("tr");
				tbodyElemit.appendChild(trElem);
				for(i = 0; i < 8; i++){
				//elem.id = "elem" + j;
				var delem = j * 10 + i;
					if (delem % 10 == 2) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:6px;width:110px;border:1px black solid;box-sizing:border-box;';
						var datainput = document.createElement('input');
						tdElem.appendChild(datainput);
						datainput.value = x;
						datainput.setAttribute('type', 'text');
						datainput.setAttribute('maxlength', '50');
						datainput.style.cssText = 'width:90%;color:blue;text-align:center;font-size:10pt;border:none;padding:3px;';
						var input = 'input' + k + i;
						datainput.setAttribute('id',input);
						 				
					} else if (delem % 10 == 3) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:6px;width:110px;border:1px black solid;box-sizing:border-box;';
						var datainput = document.createElement('input');
						tdElem.appendChild(datainput);
						datainput.value = x;
						datainput.setAttribute('type', 'text');
						datainput.setAttribute('maxlength', '20');
						datainput.style.cssText = 'width:90%;color:blue;text-align:center;font-size:10pt;border:none;padding:3px;';
						var input = 'input' + k + i;
						datainput.setAttribute('id',input);
					} else if(delem % 10 == 4){
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:6px;width:110px;border:1px black solid;box-sizing:border-box;';
						var datainput = document.createElement('input');
						tdElem.appendChild(datainput);
						datainput.value = x;
						datainput.setAttribute('type', 'number');
						datainput.setAttribute('maxlength', '20');
						datainput.style.cssText = 'width:90%;color:blue;text-align:center;font-size:10pt;border:none;padding:3px;';
						var input = 'input' + k + i;
						datainput.setAttribute('id',input);
						datainput.setAttribute("oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
					} else if (delem % 10 == 5 ) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:6px;width:110px;border:1px black solid;box-sizing:border-box;';
						var datainput = document.createElement('input');
						tdElem.appendChild(datainput);
						datainput.value = x;
						datainput.setAttribute('type', 'number');
						datainput.setAttribute('maxlength', '3');
						datainput.style.cssText = 'width:90%;color:blue;text-align:center;font-size:10pt;border:none;padding:3px;';
						datainput.setAttribute("oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
						var input = 'input' + k + i;
						datainput.setAttribute('id',input);
					} else if(delem % 10 == 6){
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:6px;width:90px;border:1px black solid;box-sizing:border-box;';
						var datainput = document.createElement('input');
						tdElem.appendChild(datainput);
						datainput.value = x;
						datainput.setAttribute('type', 'text');
						datainput.setAttribute('maxlength', '50');
						datainput.style.cssText = 'width:90%;color:blue;text-align:center;font-size:10pt;border:none;padding:3px;';
						var input = 'input' + k + i;
						datainput.setAttribute('id',input);
					} else if (delem % 10 == 7) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:6px;width:90px;border:1px black solid;box-sizing:border-box;';
						var datainput = document.createElement('input');
						tdElem.appendChild(datainput);
						datainput.value = x;
						datainput.setAttribute('type', 'text');
						datainput.setAttribute('maxlength', '200');
						datainput.style.cssText = 'width:90%;color:blue;text-align:center;font-size:10pt;border:none;padding:3px;';
						var input = 'input' + k + i;
						datainput.setAttribute('id',input);
					} else if (delem % 10 == 1) {
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x;
						var input = 'input' + k + i;
						tdElem.setAttribute('id',input);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;display:none;';
					} 
				}
				k +=1;
				$('#button_cc').remove();
				var btn = document.createElement("input");
				listCreateTable.appendChild(btn);
				btn.setAttribute('type', "button");
				btn.setAttribute('value', "修正確定");
				btn.setAttribute('id', "button_cc");
				btn.style.cssText = 'position:relative;top:10px;background-color:#FF9B9B;cursor:pointer;';
				$('#button_cc').off("click");
				$('#button_cc').on("click", updatedata);
			}

		}
		try{
			var btnreturn = document.createElement("input");
			listCreateTable.appendChild(btnreturn);
			btnreturn.setAttribute('type', "button");
			btnreturn.setAttribute('value', "戻る");
			btnreturn.setAttribute('class', "ebase6_returnItemlist");
			btnreturn.setAttribute('id', "button_rt");
			btnreturn.style.cssText = "left:75%;";	
			$('#button_rt').off("click");
			$('#button_rt').on("click", firstpageItem);
		}catch(err){
			field = document.getElementById('datafield');
			var btnreturn = document.createElement("input");
			field.appendChild(btnreturn);
			btnreturn.setAttribute('type', "button");
			btnreturn.setAttribute('value', "戻る");
			btnreturn.setAttribute('class', "ebase6_returnItemlist");
			btnreturn.setAttribute('id', "button_rt");
			btnreturn.style.cssText = "top:250px;left:80%;";	
			$('#button_rt').off("click");
			$('#button_rt').on("click", firstpageItem);
		}
	}

	//品物データの登録処理
	function insertdata() {
		//var sql = prompt("input sql","");

		var name = $('#input1_sample').val();
		var unit = $('#input2_sample').val();
		var cost = $('#input3_sample').val();
		var expperiod = $('#input4_sample').val();
		var supp = $('#input5_sample').val();
		var caution = $('#input6_sample').val();

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
		table.style.cssText = 'position:absolute;top:80px;width:880px;margin:5px 5px 5px 5px;';
		if(/^\s*$/.test(name)||/^\s*$/.test(unit)||/^\s*$/.test(cost)||/^\s*$/.test(expperiod)||/^\s*$/.test(supp)){
			alert('必須項目に入力してください');
			return false;
		}else {

			//submit処理開始
			//$.ajaxSetup({ async: false }); //同期
			$.postJSON("DQube", { actionID: 'InsertData', name: name, unit: unit, cost: cost, expperiod: expperiod, supp: supp, caution: caution }, function() {
				$("#dataTable").trigger("update");
				firstpageItem();
				return false;
			});

		}
	}

	

	//品物データの修正処理
	function updatedata() {
		//var sql = prompt("input sql","");
		var tableCount = 0;
		var table = document.getElementById("tableit");
		var tbodyRowCount = table.tBodies[0].rows.length;

		for (j = 0; j < tbodyRowCount; j++) {
					var input_1 = "input" + j + 1;
					var input_2 = "input" + j + 2;
					var input_3 = "input" + j + 3;
					var input_4 = "input" + j + 4;
					var input_5 = "input" + j + 5;
					var input_6 = "input" + j + 6;
					var input_7 = "input" + j + 7;

					var name = document.getElementById(input_2).value;
					var unit = document.getElementById(input_3).value;
					var cost = document.getElementById(input_4).value;
					var expperiod = document.getElementById(input_5).value;
					var supp = document.getElementById(input_6).value;
					var caution = document.getElementById(input_7).value;
					var id = document.getElementById(input_1).innerHTML;
					//BlankSpace発見
					if(/^\s*$/.test(name)||/^\s*$/.test(unit)||/^\s*$/.test(cost)||/^\s*$/.test(expperiod)||/^\s*$/.test(supp)){
						alert('必須項目に入力してください');
						return false;
					}
					
					var tablecontent = document.getElementById("ebase6_tablecontent");
					tablecontent.style.cssText = "position:absolute;top:90px;left:calc(50% - 338px);"
					

					$.postJSON("DQube", { actionID: 'UpdateData', name: name, unit: unit, cost: cost, expperiod: expperiod, supp: supp, caution: caution, id: id }, function(jres) {
						if(tableCount == 0){
							//DOM型で要素をAppendしていく
							$('#dataTable').remove();
							var table = document.createElement("table");
							tablecontent.appendChild(table);
							table.className = "tablesorter";
							table.id = "dataTable";
							table.style.cssText = "position:absolute;width:676px;"
							
							var theadElem = document.createElement("thead");
							var trElem = document.createElement("tr");
							table.appendChild(theadElem);
							theadElem.appendChild(trElem);
				
				
							for (i = 0; i < jres.keys.length + 1; i++) {
								//テーブルにカラム名を表示
								var col = jres.keys[i];
								if (i == 0) {
									var thElem = document.createElement("th");
									trElem.appendChild(thElem);
									thElem.style.cssText = "padding:5px;width:35px;border:1px black solid;display:none;"
									thElem.setAttribute('id','checkboxcol');
								} else if (i == 1) {
									var thElem = document.createElement("th");
									trElem.appendChild(thElem);
									thElem.innerHTML = "食材ID";
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
									thElem.innerHTML = "食材備考";
								}
							}
				
							//データ行を作成
							var tbodyElem = document.createElement("tbody");
							table.appendChild(tbodyElem);
							tbodyElem.setAttribute("id", "tbody_mat")
							tbodyElem.style.cssText = "display:block;position:absolute;height:330px;overflow-y:auto;overflow-x:hidden;"
				
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
											if(i == 1){
												tdElem.setAttribute("class","Idcol");
											}
									}
								}
							}
						//背景色の高さはデータ量による
						var x = table.tBodies[0].rows.length;
						var hadjust = 20+30*x;
						table.style.cssText = "position:absolute;width:676px;height:"+hadjust+"px;max-height:360px;";
						}
						
						tableCount += 1;
						return false;
					});
					
				
				
			

		}
		matHead = document.getElementById('ebase6_matHead');
		matHead.style.cssText = "left:calc(50% - 100px);"
		
		$('.ebase6_mainReturn').css('display', 'block');
		$('.ebase6_returnItemlist').css('display', 'none');
		$('#button_cc').css('display', 'none');
		$('#matEdit').show();
		$('#new_sample').show();
		$('#button_ad').remove();
		$('.ebase6_returnItemlist').css('display', 'none');
		$("#dataTable").trigger("update");
		$('#ebase6_matSubText').remove();
		$('#ebase6_listCreateTable').remove();
		
		return false;
	}
	

	
});

