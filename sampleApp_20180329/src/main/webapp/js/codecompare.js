/**
 * javascript for inventorymanagement
 */
$(function(){
	$.inventorymanagement = function (){
		$('#datafield').empty();
		$('#userscreen').remove();
		$('.ebase6_mainReturn').css('display', 'block');
		var field = document.getElementById("datafield");

		var matHead = document.createElement("div");
		matHead.id = "ebase6_invmngHead";
		matHead.style.cssText = "left:calc(50% - 100px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_invmngText";
		matHead.appendChild(matHeadText);
		$('#ebase6_invmngText').html("在庫一覧");
		
		
		var selectdate = document.createElement("input");
		field.appendChild(selectdate);
		selectdate.setAttribute('type','date');
		selectdate.setAttribute('id','inputdate');
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		selectdate.setAttribute('value',date);
		selectdate.style.cssText = "position:absolute;margin-left:20px;border:black;box-sizing:border-box;";
		var tablecontent = document.createElement("div");
		tablecontent.id = "ebase6_tablecontentInvmng";
		field.appendChild(tablecontent);

		var table = document.createElement("table");
		tablecontent.appendChild(table);
		table.className = "tablesorter";
		table.id = "dataTableInvmng";
		table.style.cssText = "position:absolute;width:788px;height:10px;";
		
		
		var tmr = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
		
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube", { actionID: 'PoSelectbyDate', tmr:tmr }, function(jres) {
			var col = jres.keys[0];
			var dataCount = jres.tblData[0][col];
			if(dataCount == 0){
			//食材修正ボタン作成
			var btnh = document.createElement("input");
			tablecontent.appendChild(btnh);
			btnh.setAttribute('type', "button");
			btnh.setAttribute('value', "新規発注へ");
			btnh.setAttribute('id', "PoEdit");
			btnh.style.cssText = 'font-size:.6em;padding:5px;background-color:#F5D98B;position:absolute;left:685px;top:-40px;cursor:pointer;width:100px;';
			$('#PoEdit').off("click");
			$('#PoEdit').on("click", toOrder);
			}
			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
		
		var dateselect = selectdate.value;

		$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube", { actionID: 'InventoryManagement',date:dateselect }, function(jres) {


			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table.appendChild(theadElem);
			theadElem.appendChild(trElem);


			for (i = 0; i < jres.keys.length + 1; i++) {
				//テーブルにカラム名を表示
				if (i == 0) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "食材名";
				} else if (i == 1) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "在庫数";

				} else if (i == 2) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "単価";
				} else if (i == 3) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "単位";
				} else if (i == 4) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "棚卸資産";
				} else if (i == 5) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "必要数";
				} else if (i == 6) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "不足数";
				} else if( i == 7){
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "matid";
						thElem.className = 'Idcol';
				}

			}

			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			table.appendChild(tbodyElem);
			tbodyElem.setAttribute("id", "tbody_Invmng");
			tbodyElem.style.cssText = "display:block;position:absolute;height:350px;width:805px;overflow-y:auto;overflow-x:hidden;";

			//データのヒットがない場合、空行を作成
			if (jres.tblData.length == 0) {
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for (i = 0; i < jres.keys.length; i++) {
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "FC2604";
					tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;height:26px;';
				}
			}

			for (j = 0; j < jres.tblData.length; j++) { //データの書きだし
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for (i = 0; i < jres.keys.length + 2; i++) {
					if(i < 7){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					var col = jres.keys[i];
					tdElem.innerHTML = jres.tblData[j][col];
					tdElem.setAttribute('id', 'col' + j + i);
					tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';
					} else if(i == 7){
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.background = "#fff";
						var col = jres.keys[i];
						tdElem.innerHTML = jres.tblData[j][col];
						tdElem.setAttribute('id', 'col' + j + i);
						tdElem.setAttribute('class', 'Idcol');
						tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';
					}
				}
			}

			//背景色の高さはデータ量による
			var x = table.tBodies[0].rows.length;
			var hadjust = 30+30*x;
			table.style.cssText = "position:absolute;width:788px;height:"+hadjust+"px;max-height:380px;";
			
			
			
			
			$("#dataTableInvmng").tablesorter({
				widgets: ['zebra'],
				sortList: [[1, 1]],
			});

			$("#dataTableInvmng").trigger("update");

			$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
		var InvValBox =  document.createElement("div");
		field.appendChild(InvValBox);
		InvValBox.setAttribute('id','InvValBox');
		var InvValText = document.createElement("div");
		InvValBox.appendChild(InvValText);
		InvValText.setAttribute('id','InvValText');
		InvValText.style.cssText = "position:absolute;background-color:white;border:1px solid black;padding:5px;width:110px;box-sizing:border-box;font-size:.7em;text-align:center;";
		$('#InvValText').html("資産総計");
		
		var AllInventValue = document.createElement('input');
		InvValBox.appendChild(AllInventValue);
		AllInventValue.setAttribute('id','allInvVal');
		AllInventValue.setAttribute('value','0');
		AllInventValue.setAttribute('readonly','true');
		AllInventValue.style.cssText = 'position:relative;background-color;left:110px;white;border:1px solid black;padding:5px;width:110px;box-sizing:border-box;font-size:.7em;text-align:center;text-decoration-line: underline;text-decoration-style: double;text-underline-position:under;';
		InventorySum();

		clickdate = document.getElementById('inputdate').onchange = function(){
			$('#ebase6_tablecontentInvmng').remove();
			$('#dataTableInvmng').remove();
			$('#tbody_Invmng').remove();
			$('#InvValBox').remove();
			var dateselect = selectdate.value;
			var tablecontent = document.createElement("div");
			tablecontent.id = "ebase6_tablecontentInvmng";
			field.appendChild(tablecontent);
	
			var table = document.createElement("table");
			tablecontent.appendChild(table);
			table.className = "tablesorter";
			table.id = "dataTableInvmng";
			table.style.cssText = "position:absolute;width:788px;height:10px;"
	
			$.ajaxSetup({ async: false }); //同期
			$.postJSON("DQube", { actionID: 'InventoryManagement', date:dateselect}, function(jres) {
	
	
				//DOM型で要素をAppendしていく
				var theadElem = document.createElement("thead");
				var trElem = document.createElement("tr");
				table.appendChild(theadElem);
				theadElem.appendChild(trElem);
	
	
				for (i = 0; i < jres.keys.length + 1; i++) {
					//テーブルにカラム名を表示
					if (i == 0) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "食材名";
					} else if (i == 1) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "在庫数";
	
					} else if (i == 2) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "単価";
					} else if (i == 3) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "単位";
					} else if (i == 4) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "棚卸資産";
					} else if (i == 5) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "必要数";
					} else if (i == 6) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "不足数";
					} 
	
				}
	
				//データ行を作成
				var tbodyElem = document.createElement("tbody");
				table.appendChild(tbodyElem);
				tbodyElem.setAttribute("id", "tbody_Invmng");
				tbodyElem.style.cssText = "display:block;position:absolute;height:350px;width:805px;overflow-y:auto;overflow-x:hidden;";
	
				//データのヒットがない場合、空行を作成
				if (jres.tblData.length == 0) {
					var trElem = document.createElement("tr");
					tbodyElem.appendChild(trElem);
					for (i = 0; i < jres.keys.length-1; i++) {
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.background = "FC2604";
						tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;height:26px;';
					}
				}
	
				for (j = 0; j < jres.tblData.length; j++) { //データの書きだし
					var trElem = document.createElement("tr");
					tbodyElem.appendChild(trElem);
					for (i = 0; i < jres.keys.length + 2; i++) {
						if(i < 7){
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.background = "#fff";
						var col = jres.keys[i];
						tdElem.innerHTML = jres.tblData[j][col];
						tdElem.setAttribute('id', 'col' + j + i);
						tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';
						} 
					}
				}
	
				//背景色の高さはデータ量による
				var x = table.tBodies[0].rows.length;
				var hadjust = 30+30*x;
				table.style.cssText = "position:absolute;width:788px;height:"+hadjust+"px;max-height:380px;";
				
				
				$("#dataTableInvmng").tablesorter({
					widgets: ['zebra'],
					sortList: [[1, 1]],
				});
	
				$("#dataTableInvmng").trigger("update");
	
				$.ajaxSetup({ async: true }); //同期の解除
				return false;
			});
			var InvValBox =  document.createElement("div");
			field.appendChild(InvValBox);
			InvValBox.setAttribute('id','InvValBox');
			var InvValText = document.createElement("div");
			InvValBox.appendChild(InvValText);
			InvValText.setAttribute('id','InvValText');
			InvValText.style.cssText = "position:absolute;background-color:white;border:1px solid black;padding:5px;width:110px;box-sizing:border-box;font-size:.7em;text-align:center;";
			$('#InvValText').html("資産総計");
			
			var AllInventValue = document.createElement('input');
			InvValBox.appendChild(AllInventValue);
			AllInventValue.setAttribute('id','allInvVal');
			AllInventValue.setAttribute('value','0');
			AllInventValue.setAttribute('readonly','true');
			AllInventValue.style.cssText = 'position:relative;background-color;left:110px;white;border:1px solid black;padding:5px;width:110px;box-sizing:border-box;font-size:.7em;text-align:center;text-decoration-line: underline;text-decoration-style: double;text-underline-position:under;';
			InventorySum();
		}
		
	}
	
	
	
	function InventorySum(){
		var table = document.getElementById('dataTableInvmng');
		var rowCount = table.tBodies[0].rows.length;
		var sum = 0;
		for(j=0;j<rowCount;j++){
			var col4 = 'col' + j + 4; 
			try{
			var getcol4 = document.getElementById(col4).innerHTML;
			sum += parseInt(getcol4);
			var AllInventValue = document.getElementById('allInvVal');
			AllInventValue.value = sum;
			}
			catch(err){
				return false;
			}		
		}
	}
	function toOrder(){
		$.orderexeshortcut();
	}
	
});