	function firstpageOrderCheck(){
		$('.ebase6_mainReturn').css('display', 'block');
		
		var field = document.getElementById("datafield");

		
		var tablecontent = document.createElement("div");
		tablecontent.id = "ebase6_tablecontent";
		field.appendChild(tablecontent);
		tablecontent.style.cssText = "position:absolute;left:calc(50% - 563px);"
		
		
		var table = document.createElement("table");
		tablecontent.appendChild(table);
		table.className = "tablesorter";
		table.id = "dataTable";
		table.style.cssText = "position:absolute;width:1125px;"

		
		//$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube", { actionID: 'InspectSelect' }, function(jres) {
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
					thElem.style.cssText = "padding:5px;width:35px;border:1px black solid;display:none;";
					thElem.setAttribute('id','checkboxcol');
				} else if (i == 1) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "検品ID";
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
					thElem.innerHTML = "仕入れ店";
				} else if (i == 5) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "発注数";
				} else if (i == 6) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "検品数";
				} else if (i == 7) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "不良品数";
				} else if (i == 8) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "検品不足";
				} else if (i == 9) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "消費期限";
				} else if (i == 10) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "検品日";
				} else if (i == 11) {
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML = "検品備考";
				}
			}

			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			table.appendChild(tbodyElem);
			tbodyElem.setAttribute("id", "tbody_mat")
			tbodyElem.style.cssText = "display:block;position:absolute;height:350px;overflow-y:auto;overflow-x:hidden;"

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
						check.style.cssText = 'width:20px';
						tdElem.style.cssText = 'display:none;';
						tdElem.setAttribute('class','checkboxrow');
						$(rcheck).off("check");
					} else {
						var col = jres.keys[i - 1];
						tdElem.innerHTML = jres.tblData[j][col];
						tdElem.setAttribute('id', 'Check' + j + i);
							if(i == 1){
								tdElem.setAttribute("class","hidden");
							}
					}
				}
			}
			//背景色の高さはデータ量による
			var x = table.tBodies[0].rows.length;
			var hadjust = 20+30*x;
			table.style.cssText = "position:absolute;width:1125px;height:"+hadjust+"px;max-height:380px;"
			
			$("#dataTable").tablesorter({
				widgets: ['zebra'],
				sortList: [[10, 1]],
				headers: { 0: { sorter: false } }

			});

			$("#dataTable").trigger("update");
			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});

		
		var btnh = document.createElement("input");
		tablecontent.appendChild(btnh);
		btnh.setAttribute('type', "button");
		btnh.setAttribute('value', "検品修正");
		btnh.setAttribute('id', "CheckEdit");
		btnh.style.cssText = 'font-size:1em;padding:5px;background-color: orange;position:absolute;left:5px;top:380px;cursor:pointer;'
		$('#CheckEdit').off("click");
		$('#CheckEdit').on("click", selectInsptlist);
	}