/**
 * javascript for inventorymanagement
 */
$(function(){
	$.inventorymanagement = function (){
		$('#datafield').empty();
		
		var field = document.getElementById("datafield");

		var matHead = document.createElement("div");
		matHead.id = "ebase6_invmngHead";
		matHead.style.cssText = "left:calc(50% - 100px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_invmngText";
		matHead.appendChild(matHeadText);
		$('#ebase6_invmngText').html("在庫一覧");

		var tablecontent = document.createElement("div");
		tablecontent.id = "ebase6_tablecontentOrd";
		field.appendChild(tablecontent);

		var table = document.createElement("table");
		tablecontent.appendChild(table);
		table.className = "tablesorter";
		table.id = "dataTableInvmng";
		table.style.cssText = "position:absolute;width:900px;height:10px;"

		$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube", { actionID: 'InventoryManagement' }, function(jres) {


			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table.appendChild(theadElem);
			theadElem.appendChild(trElem);


			for (i = 0; i < jres.keys.length + 2; i++) {
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
					thElem.innerHTML = "発注目安";
				} else if (i == 7) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "不足数";
				} 

			}

			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			table.appendChild(tbodyElem);
			tbodyElem.setAttribute("id", "tbody_Invmng");
			tbodyElem.style.cssText = "display:block;position:absolute;height:350px;width:915px;overflow-y:auto;overflow-x:hidden;";

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
				for (i = 0; i < jres.keys.length + 2; i++) {
					if(i < 4){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					var col = jres.keys[i];
					tdElem.innerHTML = jres.tblData[j][col];
					tdElem.setAttribute('id', 'col' + j + i);
					tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';
					} else if(i == 4 || i == 6){
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.background = "#fff";
						tdElem.innerHTML = '';
						tdElem.setAttribute('id', 'col' + j + i);
						tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';
					} else if(i == 5|| i == 7){
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.background = "#fff";
						var col = jres.keys[i-2];
						tdElem.innerHTML = jres.tblData[j][col];
						tdElem.setAttribute('id', 'col' + j + i);
						tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';
					}
				}
			}

			//背景色の高さはデータ量による
			var x = table.tBodies[0].rows.length;
			var hadjust = 20+30*x;
			table.style.cssText = "position:absolute;width:900px;height:"+hadjust+"px;max-height:380px;";
			
			
			$("#dataTableInvmng").tablesorter({
				widgets: ['zebra'],
				sortList: [[7, 1]],
				headers: { 0: { sorter: false } }

			});

			$("#dataTableInvmng").trigger("update");

			$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});
		InventoryCal();
		OrderNeed();
		

	}
	
	function OrderNeed(){
		var table = document.getElementById('dataTableInvmng');
		var rowCount = table.tBodies[0].rows.length;
		for(j=0;j<rowCount;j++){
			var col7 = 'col' + j + 7;
			var getcol7 = document.getElementById(col7).innerHTML;
			var col6 = 'col' + j + 6;
			var getcol6 = document.getElementById(col6);
			getcol6.innerHTML = Math.ceil(parseFloat(getcol7));
		}
	}
	
	function InventoryCal(){
		var table = document.getElementById('dataTableInvmng');
		var rowCount = table.tBodies[0].rows.length;
		for(j=0;j<rowCount;j++){
			var col1 = 'col' + j + 1; 
			var col2 = 'col' + j + 2;
			var col4 = 'col' + j + 4;
			var getcol1 = document.getElementById(col1).innerHTML;
			var getcol2 = document.getElementById(col2).innerHTML;
			var getcol4 = document.getElementById(col4);
			var InvVal = parseInt(getcol1) * parseInt(getcol2);
			getcol4.innerHTML = InvVal;
		}
	}
	
	function InventorySum(){
		
	}
	
	
});