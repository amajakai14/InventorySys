/**
 * javascript for inventorycount
 */
$(function(){
	$.stockcount = function stockcount(){
		firstpageStockCount();
	}
	
	function firstpageStockCount(){
		$('#datafield').empty();
		$('#ebase6_matHead').remove();
		$('#dataTableInv').remove();
		var field = document.getElementById("datafield");
		
		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 100px);"
		field.appendChild(matHead);

		var stockHeadText = document.createElement("div");
		stockHeadText.id = "ebase6_StockHeadText";
		matHead.appendChild(stockHeadText);
		$('#ebase6_StockHeadText').html("棚卸")
		
		var selectdate = document.createElement("input");
		field.appendChild(selectdate);
		selectdate.setAttribute('type','date');
		selectdate.setAttribute('id','inputdate');
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		selectdate.setAttribute('value',date);
		selectdate.style.cssText = "margin-left:20px;border:black;box-sizing:border-box;";
		
		var stckcount = document.createElement("input");
		field.appendChild(stckcount);
		stckcount.setAttribute('type', "button");
		stckcount.setAttribute('value', "棚卸情報入力");
		stckcount.setAttribute('id', "button_sc");
		stckcount.style.cssText = "position:absolute;left:80%;";
		$('#button_sc').off("click");
		$('#button_sc').on("click", Countingstock);
		
		clickdate = document.getElementById('inputdate').onchange = function(){
				
			var table1 = document.createElement("table");
			field.appendChild(table1);
			table1.className = "tablesorter";
			table1.id = "daySaleTable";
		}
		
		
	}
	
	function Countingstock(){
		
		$('#ebase6_matHead').remove();
		$('#ebase6_matSubText').remove();
		$('.ebase6_mainReturn').css('display', 'none');
		$('#button_sc').remove();
		$('#inputdate').remove();
		
		field = document.getElementById('datafield');
		selectdate = document.createElement('input');
		field.appendChild(selectdate);
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		selectdate.setAttribute('type','date');
		selectdate.setAttribute('value',date);
		selectdate.setAttribute('id','inputdate');
		selectdate.setAttribute('readonly','true');
		selectdate.style.cssText = "margin-left:20px;border:black;box-sizing:border-box;background-color:unset;";
		
		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 150px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_PoHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_PoHeadText').html("棚卸")

		var matSubText = document.createElement("div");
		matSubText.id = "ebase6_matSubText";
		matHead.appendChild(matSubText);
		matSubText.style.cssText = "background-color: #FF9B9B;"
		$('#ebase6_matSubText').html("棚卸情報入力");
		
		var Daysalebox =document.createElement('div');
		field.appendChild(Daysalebox);
		Daysalebox.id = "Daysalebox";
		var Daysale = document.createElement('div');
		Daysalebox.appendChild(Daysale);
		Daysale.innerHTML = '売上';
		Daysale.style.cssText = "width:50px;display:inline-block;background:aqua;box-sizing:border-box;border:1px black solid;text-align:center;cursor:default;"
		Daysale.onclick = function(){
			CalDaysum();
		}
		var Daysalevalue = document.createElement('input');
		Daysalevalue.id = "Revenue";
		Daysalebox.appendChild(Daysalevalue);
		Daysalevalue.style.cssText = 'width:100px;box-sizing:border-box;';
		Daysalevalue.onchange = function(){
			CalDaysum();
		} 
		
		//経営テーブル
		var tablecontentmng = document.createElement('div');
		tablecontentmng.id = 'ebase6_tablecontentmng';
		field.appendChild(tablecontentmng);
		
		var tablemng = document.createElement("table");
		tablecontentmng.appendChild(tablemng);
		tablemng.className = "tablesorter";
		tablemng.id = "dataTableMng";
		
		var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			tablemng.appendChild(theadElem);
			theadElem.appendChild(trElem);
			
		var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "";
			
		var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "売上原価";
			
		var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "原価率(%)";
		
		var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "廃棄額";
		
		var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "ロス率(%)";
		
		var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "収支";
			
		var tbodyElem = document.createElement("tbody");
		tablemng.appendChild(tbodyElem);
		
		var trElem = document.createElement("tr");
		tbodyElem.appendChild(trElem);
		
		for(i =0;i<6;i++){
			if(i == 0){
				var tdElem = document.createElement("td");
				trElem.appendChild(tdElem);
				tdElem.style.background = "#fff";
				tdElem.innerHTML = "総計";
				setid = 'tablemng' + i;
				tdElem.setAttribute('id',setid);
			} else{
				var tdElem = document.createElement("td");
				trElem.appendChild(tdElem);
				tdElem.style.background = "#fff";
				tdElem.innerHTML = "";
				setid = 'tablemng' + i;
				tdElem.setAttribute('id',setid);
			}
			
		}
				
		
		//Main
		var tablecontent = document.createElement("div");
		tablecontent.id = "ebase6_tablecontentInv";
		field.appendChild(tablecontent);

		var table1 = document.createElement("table");
		tablecontent.appendChild(table1);
		table1.className = "tablesorter";
		table1.id = "dataTableInv";
		
		
		$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'GoodsList'}, function(jres){

			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table1.appendChild(theadElem);
			theadElem.appendChild(trElem);

			for(i=0;i<jres.keys.length-2;i++){
				//テーブルにカラム名を表示
				if(i == 0){
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML= "MatID";
					thElem.className = 'hidden';
				} else if(i == 1){
					var col = jres.keys[i];
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML= "食材名";
				} else if(i == 2){
					var col = jres.keys[i];
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML= "unit";
					thElem.className = 'hidden';
				} else if(i == 3){
					var col = jres.keys[i];
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML= "unitcost";
					thElem.className = 'hidden';
				} else if(i == 4){
					var col = jres.keys[i];
					var thElem = document.createElement("th");
					trElem.appendChild(thElem);
					thElem.innerHTML= "消費期間(日)";
				} 
			}
			//5
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "InventoryBF";
			thElem.className = 'hidden';
			//6
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "在庫数";
			thElem.style.cssText = "box-sizing:border-box;"
			//7
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "補填数";
			thElem.style.cssText = "box-sizing:border-box;"
			//8
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "補填額";
			thElem.style.cssText = "box-sizing:border-box;"				
			//9
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "廃棄数";
			thElem.style.cssText = "box-sizing:border-box;"		
			//10
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "Inspectcount";
			thElem.className = 'hidden';
			//11
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "Badcount";
			thElem.className = 'hidden';
			//12
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "消費数";
			thElem.style.cssText = "box-sizing:border-box;"
			//13
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "廃棄額";
			thElem.style.cssText = "box-sizing:border-box;"
			//14
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "ロス率(%)";
			thElem.style.cssText = "box-sizing:border-box;"		
			//15
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "原価";
			thElem.style.cssText = "box-sizing:border-box;"	
			//16
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "必要数";
			thElem.style.cssText = "box-sizing:border-box;"		
			//17
			var thElem = document.createElement("th");
			trElem.appendChild(thElem);
			thElem.innerHTML = "不足数";
			thElem.style.cssText = "box-sizing:border-box;"	
			
				
			


			//データ行を作成
			var tbodyElem = document.createElement("tbody");
			table1.appendChild(tbodyElem);
			tbodyElem.setAttribute('id','tbody_stock');
			tbodyElem.style.cssText = 'display:block;height:500px;position:absolute;';

			//データのヒットがない場合、空行を作成
			if(jres.tblData.length==0){
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for(i=0;i<jres.keys.length-2;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.innerHTML = '0';
					setid = 'table1' + j + '_' + i;
					tdElem.setAttribute('id',setid);
				}
			}

			for(j=0;j<jres.tblData.length;j++){ //データの書きだし
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				var rownum = 'r'+j;
				trElem.setAttribute('class','r');
				trElem.setAttribute('id',rownum);
				for(i=0;i<jres.keys.length-2;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					var col = jres.keys[i];
					tdElem.innerHTML = jres.tblData[j][col];
					setid = 'tablea' + j + '_' + i;
					tdElem.setAttribute('id',setid);
					if(i == 0||i == 2||i == 3){
						tdElem.setAttribute('class','hidden');
					}
				}
				for(i=5;i<18;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.style.background = "#fff";
					tdElem.innerHTML = "";
					setid = 'tablea' + j + '_' + i;
					tdElem.setAttribute('id',setid);
					if(i == 5 ||i == 10||i == 11){
						tdElem.setAttribute('class','hidden');
					}
					if(i == 6 ||i == 7||i == 8 || i == 9){
						var input = document.createElement("input");
						tdElem.appendChild(input);
						input.setAttribute('value', "");
						input.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
						var inputid = 'inputa' + j + '_' + i;
						input.setAttribute('id', inputid);
					}
				}
			}
			var x = table.tBodies[0].rows.length;
			var hadjust = 34+34*x;
			table1.style.cssText = "position:absolute;width:676px;height:"+hadjust+"px;max-height:510px;";
			

			$("#dataTableInv").trigger("update");

			$.ajaxSetup({ async: true }); //同期
			return false;
		});
		
		//昨日の在庫数
		var table2 = document.createElement("table");
		tablecontent.appendChild(table2);
		table2.className = "hidden";
		table2.id = "dataTable2";
		
		$.ajaxSetup({ async: false }); //同期の解除
		$.postJSON("DQube",{actionID:'CountingStock'}, function(jres){
			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table2.appendChild(theadElem);
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
			table2.appendChild(tbodyElem);

			//データのヒットがない場合、空行を作成
			if(jres.tblData.length==0){
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for(i=0;i<jres.keys.length;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					//tdElem.innerHTML = '0';
					setid = 'tableb' + j + '_' + i;
					tdElem.setAttribute('id',setid);
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
					setid = 'tableb' + j + '_' + i;
					tdElem.setAttribute('id',setid);
				}
			}


			$("#dataTableInv").trigger("update");

			$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});		
		//今日の検品情報
		var table3 = document.createElement("table");
		tablecontent.appendChild(table3);
		table3.className = "hidden";
		table3.id = "dataTable3";
		$.ajaxSetup({ async: false }); //同期の解除
		$.postJSON("DQube",{actionID:'InspectDoneToday'}, function(jres){
			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			table3.appendChild(theadElem);
			theadElem.appendChild(trElem);


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
			table3.appendChild(tbodyElem);

			//データのヒットがない場合、空行を作成
			if(jres.tblData.length==0){
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for(i=0;i<jres.keys.length;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.innerHTML = '0';
					setid = 'tablec' + 0 + '_' + i;
					tdElem.setAttribute('id',setid);
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
					setid = 'tablec' + j + '_' + i;
					tdElem.setAttribute('id',setid);
					
				}
			}


			$("#dataTableInv").trigger("update");

			$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});	
		$.ajaxSetup({ async: false }); //同期
		FourWeeksGoods();
		$.ajaxSetup({ async: true }); //同期の解除
		CalGoodsNeed();
		lastestInv();
		GoodsInToday();
		var tbodyRowCountT1 = table1.tBodies[0].rows.length;
		for(i = 0; i < tbodyRowCountT1;i++){
			var input1 = "inputa" + i + '_'+ 6;
			var input2 = "inputa" + i + '_'+ 7;
			var input3 = "inputa" + i + '_'+ 8;
			var input4 = "inputa" + i + '_'+ 9;
			var input1ID = document.getElementById(input1);
			var input2ID = document.getElementById(input2);
			var input3ID = document.getElementById(input3);
			var input4ID = document.getElementById(input4);
			input1ID.onchange = function(){
				GoodsSaleAmount();
				GoodsLossRate();
				CalInvShort();
				SumWaste();
			}
			input2ID.onchange = function(){
				GoodsSaleAmount();
				SumWaste()
				GoodsLossRate();
				
			}
			input3ID.onchange = function(){
				GoodsCost();
				GoodsSaleAmount();
				SumWaste()
				GoodsLossRate();
			}
			input4ID.onchange = function(){
				GoodsSaleAmount();
				GoodsLossRate();
				SumWaste();
			}
		}
	}
	
	function lastestInv(){
		var table1 = document.getElementById('dataTableInv');
		var table2 = document.getElementById('dataTable2');
		var tbodyRowCountT1 = table1.tBodies[0].rows.length;
		var tbodyRowCountT2 = table2.tBodies[0].rows.length;
		for(j=0;j<tbodyRowCountT1;j++){
			var t1 = 'tablea' + j + '_' + 0;
			var t1col5 = 'tablea' + j + '_' + 5;
			var gett1 = document.getElementById(t1).innerHTML;
			var sett1col5 = document.getElementById(t1col5);
			for(i=0;i<tbodyRowCountT2;i++){				
				var t2 = 'tableb' + i + '_' + 1;
				var setvalueID = 'tableb' + i + '_' + 2;
				var setvalue =  document.getElementById(setvalueID);
				var gett2 = document.getElementById(t2).innerHTML;
				if(gett1 == gett2){
					sett1col5.innerHTML = setvalue.innerHTML;
					break;
				} else{
					sett1col5.innerHTML = '0';
				}
				
			}
		}
	}
	
	function GoodsInToday(){
		var table1 = document.getElementById('dataTableInv');
		var table3 = document.getElementById('dataTable3');
		var tbodyRowCountT1 = table1.tBodies[0].rows.length;
		var tbodyRowCountT3 = table3.tBodies[0].rows.length;
		for(j=0;j<tbodyRowCountT1;j++){
			var t1 = 'tablea' + j + '_' + 0;
			var gett1 = document.getElementById(t1).innerHTML;
			var t1col10 = 'tablea' + j + '_' + 10;
			var sett1col10 = document.getElementById(t1col10);
			var t1col11 = 'tablea' + j + '_' + 11;
			var sett1col11 = document.getElementById(t1col11);
			for(i=0;i<tbodyRowCountT3;i++){				
				var t3 = 'tablec' + i + '_' + 0;
				var setvalueID1 = 'tablec' + i + '_' + 2;
				var setvalue1 =  document.getElementById(setvalueID1);
				var setvalueID2 = 'tablec' + i + '_' + 3;
				var setvalue2 =  document.getElementById(setvalueID2);
				var gett3 = document.getElementById(t3).innerHTML;
				if(gett1 == gett3){
					sett1col10.innerHTML = setvalue1.innerHTML;
					sett1col11.innerHTML = setvalue2.innerHTML;
					break;
				} else{
					sett1col10.innerHTML = '0';
					sett1col11.innerHTML = '0';
				}
				
			}
		}
	}
	
	function GoodsSaleAmount(){
		var table1 = document.getElementById('dataTableInv');
		var tbodyRowCountT1 = table1.tBodies[0].rows.length;
		for(j=0;j<tbodyRowCountT1;j++){
			var t1col5 = 'tablea' + j + '_' + 5;
			var gett1col5 = document.getElementById(t1col5).innerHTML;
			var t1col15 = 'tablea' + j + '_' + 15;
			var gett1col15 = document.getElementById(t1col15);
			var t1col6 = 'inputa' + j + '_' + 6;
			var gett1col6 = document.getElementById(t1col6).value;
			var t1col7 = 'inputa' + j + '_' + 7;
			var gett1col7 = document.getElementById(t1col7);
			if(gett1col7.value == ''){
				gett1col7.value = '0'
			}
			var t1col8 = 'inputa' + j + '_' + 8;
			var gett1col8 = document.getElementById(t1col8);
			if(gett1col7.value != '0' && gett1col8.value == '0'){
				gett1col8.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:red;text-align:center;";
				gett1col7.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
				gett1col15.style.cssText = "color:red;";
			}else if(gett1col7.value == '0'){
				gett1col8.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
				gett1col15.style.cssText = "color:black;";
			}else if(gett1col7.value != '0' && gett1col8.value != '0'){
				gett1col8.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
				gett1col7.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
				gett1col15.style.cssText = "color:black;";
			}
			if(gett1col8.value == ''){
				gett1col8.value = '0'
			}
			if(gett1col7.value == '0' && gett1col8.value != '0'){
				gett1col8.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:red;text-align:center;";
				gett1col7.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:red;text-align:center;";
				gett1col15.style.cssText = "color:red;";
			}else if(gett1col7.value == '0' && gett1col8.value == '0'){
				gett1col8.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
				gett1col7.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
				gett1col15.style.cssText = "color:black;";
			}
			var t1col9 = 'inputa' + j + '_' + 9;
			var gett1col9 = document.getElementById(t1col9);
			if(gett1col9.value == ''){
				gett1col9.value = '0'
			}
			var t1col10 = 'tablea' + j + '_' + 10;
			var gett1col10 = document.getElementById(t1col10).innerHTML;
			var t1col11 = 'tablea' + j + '_' + 11;
			var gett1col11 = document.getElementById(t1col11).innerHTML;
			var t1col12 = 'tablea' + j + '_' + 12;
			var sett1col12 = document.getElementById(t1col12);
			var TotalSaleAmount =  parseInt(gett1col5) - parseInt(gett1col6) +  parseInt(gett1col7.value) - parseInt(gett1col9.value) + parseInt(gett1col10) - parseInt(gett1col11);
			sett1col12.innerHTML = TotalSaleAmount;
			if(TotalSaleAmount < 0){
				sett1col12.style.cssText = "color:red;";
			} else{
				sett1col12.style.cssText = "color:black;";
			}
			if(sett1col12.innerHTML == 'NaN'){
				sett1col12.innerHTML = '0';
				sett1col12.style.cssText = "color:red;";
			}
		}
			GoodsCost();
	}
	
	function SumWaste(){
		var table1 = document.getElementById('dataTableInv');
		var tbodyRowCountT1 = table1.tBodies[0].rows.length;
		for(j=0;j<tbodyRowCountT1;j++){
			var t1col9 = 'inputa' + j + '_' + 9;
			var gett1col9 = document.getElementById(t1col9);
			var t1col2 = 'tablea' + j + '_' + 3;
			var gett1col2 = document.getElementById(t1col2);
			var t1col13 = 'tablea' + j + '_' + 13;
			var sett1col13 = document.getElementById(t1col13);
			var TotalWaste = parseInt(gett1col9.value) * parseInt(gett1col2.innerHTML);
			sett1col13.innerHTML = TotalWaste;
		}
	}
	
	function GoodsLossRate(){
		var table1 = document.getElementById('dataTableInv');
		var tbodyRowCountT1 = table1.tBodies[0].rows.length;
		for(j=0;j<tbodyRowCountT1;j++){
			var t1col9 = 'inputa' + j + '_' + 9;
			var gett1col9 = document.getElementById(t1col9);
			var t1col5 = 'tablea' + j + '_' + 5;
			var gett1col5 = document.getElementById(t1col5);
			var t1col14 = 'tablea' + j + '_' + 14;
			var sett1col14 = document.getElementById(t1col14);
			if(gett1col5.innerHTML == '0'){
				if(gett1col9.value == '0'){
					sett1col14.innerHTML ='0.00';
					sett1col14.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;color:black;';
				} else{
					sett1col14.innerHTML ='999.99';
					sett1col14.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;color:red;';
				}
			}else{
				var Lossrate = (parseInt(gett1col9.value) / parseInt(gett1col5.innerHTML))*100;
				if(Lossrate > 100 && Lossrate < 1000){
					sett1col14.innerHTML = Lossrate.toFixed(2);
					sett1col14.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;color:red;';
				}else if(Lossrate > 1000){
					sett1col14.innerHTML ='999.99';
					sett1col14.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;color:red;';
				}else{
				sett1col14.innerHTML = Lossrate.toFixed(2);
				sett1col14.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;color:black;';
				}
			}
		}
	}
	
	function GoodsCost(){
		var table1 = document.getElementById('dataTableInv');
		var tbodyRowCountT1 = table1.tBodies[0].rows.length;
		for(j=0;j<tbodyRowCountT1;j++){
			var t1col3 = 'tablea' + j + '_' + 3;
			var gett1col3 = document.getElementById(t1col3);
			var t1col5 = 'tablea' + j + '_' + 5;
			var gett1col5 = document.getElementById(t1col5);
			var t1col6 = 'inputa' + j + '_' + 6;
			var gett1col6 = document.getElementById(t1col6);
			var t1col9 = 'inputa' + j + '_' + 9;
			var gett1col9 = document.getElementById(t1col9);
			var t1col10 = 'tablea' + j + '_' + 10;
			var gett1col10 = document.getElementById(t1col10);
			var t1col11 = 'tablea' + j + '_' + 11;
			var gett1col11 = document.getElementById(t1col11);
			//普段の品物の原価
			var NormalGoodsSaleAmount = parseInt(gett1col5.innerHTML) -  parseInt(gett1col6.value) - parseInt(gett1col9.value) + parseInt(gett1col10.innerHTML) - parseInt(gett1col11.innerHTML)
			var NormalCost = parseInt(gett1col3.innerHTML) * NormalGoodsSaleAmount
			//補填額
			var t1col8 = 'inputa' + j + '_' + 8;
			var gett1col8 = document.getElementById(t1col8);
			var AbnormalCost = parseInt(gett1col8.value);
			var t1col15 = 'tablea' + j + '_' + 15;
			var sett1col15 = document.getElementById(t1col15);
			//合計
			var TotalCost = NormalCost + AbnormalCost;
			sett1col15.innerHTML = TotalCost;
			if(sett1col15.innerHTML == 'NaN'){
				sett1col15.style.cssText = 'color:red;';
				sett1col15.innerHTML = '0';
			}else{
				sett1col15.style.cssText = 'color:black;';
			}
		}
	}
	
	function FourWeeksGoods(){
		var Date1 = new Date();
		Date1.setDate(Date1.getDate() - 6); 
		var Date2= new Date();
		Date2.setDate(Date2.getDate() - 13); 
		var Date3 = new Date();
		Date3.setDate(Date3.getDate() - 20); 
		var Date4 = new Date();
		Date4.setDate(Date4.getDate() - 27); 
		var Week1 = Date1.getFullYear()+'-'+(Date1.getMonth()+1)+'-'+Date1.getDate();
		var Week2 = Date2.getFullYear()+'-'+(Date2.getMonth()+1)+'-'+Date2.getDate();
		var Week3 = Date3.getFullYear()+'-'+(Date3.getMonth()+1)+'-'+Date3.getDate();
		var Week4 = Date4.getFullYear()+'-'+(Date4.getMonth()+1)+'-'+Date4.getDate();
		
		//Week4 = '2021-10-06';
		
		var tablecontent  = document.getElementById('ebase6_tablecontentInv');
		var tablefourweeks = document.createElement("table");
		tablecontent.appendChild(tablefourweeks);
		tablefourweeks.className = "hidden";
		tablefourweeks.id = "dataTablefourweeks";
		$.postJSON("DQube",{actionID:'FourWeeksGoodsSales', Week1:Week1, Week2:Week2, Week3:Week3, Week4:Week4,}, function(jres){
			//DOM型で要素をAppendしていく
			var theadElem = document.createElement("thead");
			var trElem = document.createElement("tr");
			tablefourweeks.appendChild(theadElem);
			theadElem.appendChild(trElem);

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
			tablefourweeks.appendChild(tbodyElem);

			//データのヒットがない場合、空行を作成
			if(jres.tblData.length==0){
				var trElem = document.createElement("tr");
				tbodyElem.appendChild(trElem);
				for(i=0;i<jres.keys.length;i++){
					var tdElem = document.createElement("td");
					trElem.appendChild(tdElem);
					tdElem.innerHTML = 'x';
					setid = 'tableFW' + 0 + '_' + i;
					tdElem.setAttribute('id',setid);
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
					setid = 'tableFW' + j + '_' + i;
					tdElem.setAttribute('id',setid);
				}
			}
			return false;
		});

	}
	
	function CalGoodsNeed(){
		tablefourweeks = document.getElementById('dataTablefourweeks');
		dataTableInv = document.getElementById('dataTableInv');
		rowCountTfw = tablefourweeks.tBodies[0].rows.length;
		rowCountTdt = dataTableInv.tBodies[0].rows.length;
		for(j=0;j<rowCountTdt;j++){
			var countdata = 0;
			var Totalsum = 0;
			var GetmatID = 'tablea' + j + '_0';
			var MatID = document.getElementById(GetmatID).innerHTML;
			var GetNeedVal = 'tablea' + j + '_16';
			for(i=0;i<rowCountTfw;i++){
				var GetmatID2 = 'tableFW' + i + '_0';
				var MatID2 = document.getElementById(GetmatID2).innerHTML;
				if(MatID == MatID2){
					var GetVal2 = 'tableFW' + i + '_2';
					var val = document.getElementById(GetVal2).innerHTML;
					var x = parseInt(val);
					Totalsum += x;
					countdata += 1;
				}
			var NeedVal = 	document.getElementById(GetNeedVal);
				if(countdata != 0){
					var avg = Totalsum / countdata;
					avg = avg * 10;
					var y = Math.round(avg);
					y = y / 10;
				} else{
					var y = 0;
				}
			NeedVal.innerHTML = y;
			}
		}
		
	}
	
	function CalInvShort(){
		dataTableInv = document.getElementById('dataTableInv');
		rowCountTdt = dataTableInv.tBodies[0].rows.length;
		for(j=0;j<rowCountTdt;j++){
			var GetCurInv = 'inputa' + j + '_6';
			var CurInv = document.getElementById(GetCurInv).value;
			var GetInvNeed = 'tablea' + j + '_16';
			var InvNeed = document.getElementById(GetInvNeed).innerHTML;
			var GetInvShort = 'tablea' + j + '_17';
			var InvShort = document.getElementById(GetInvShort);
			var x = parseFloat(InvNeed) -  parseInt(CurInv);
			if(x > 0){
				InvShort.innerHTML = x;
			}else{
				InvShort.innerHTML = 0;
			}
			
		}
	}	
	
	function CalDaysum(){
		dataTableInv = document.getElementById('dataTableInv');
		rowCountTdt = dataTableInv.tBodies[0].rows.length;
		SumCOGS = 0;
		SumofWaste = 0;
		for(j=0;j<rowCountTdt;j++){
			//原価の合計
			var GetCost = 'tablea' + j + '_15';
			var Cost = parseInt(document.getElementById(GetCost).innerHTML);
			SumCOGS += Cost;
			//廃棄額の合計
			var GetWaste = 'tablea' + j + '_13';
			var WasteX = document.getElementById(GetWaste).innerHTML;
			var Waste = parseInt(WasteX);
			SumofWaste += Waste;		
		}
		//売上原価の計算
		var COGSID = document.getElementById('tablemng1');
		COGSID.innerHTML = SumCOGS;
		if(COGSID.innerHTML == 'NaN'){
			COGSID.innerHTML = '-';
			COGSID.style.cssText = "color:red;";
		}else{
			COGSID.style.cssText = "color:black;";
		}
		//原価率の計算
		var Getrevenue = document.getElementById('Revenue');
		var x = parseInt(Getrevenue.value);
		var CostMargin = SumCOGS/x * 100;
		CostMargin = Math.round(CostMargin*100)/100;
		document.getElementById('tablemng2').innerHTML = CostMargin;
		if(document.getElementById('tablemng2').innerHTML == 'NaN'){
			document.getElementById('tablemng2').innerHTML = '-';
			document.getElementById('tablemng2').style.cssText = "color:red;";
		}else{
			document.getElementById('tablemng2').style.cssText = "color:black;";
		}
		//廃棄の計算
		document.getElementById('tablemng3').innerHTML = SumofWaste;
		if(document.getElementById('tablemng3').innerHTML == 'NaN'){
			document.getElementById('tablemng3').innerHTML = '-';
			document.getElementById('tablemng3').style.cssText = "color:red;";
		}else{
			document.getElementById('tablemng3').style.cssText = "color:black;";
		}
		//廃棄率の計算
		var LossRate = SumofWaste/x * 100;
		LossRate = Math.round(LossRate*100)/100;
		document.getElementById('tablemng4').innerHTML =  LossRate;
		if(document.getElementById('tablemng4').innerHTML == 'NaN'){
			document.getElementById('tablemng4').innerHTML = '-';
			document.getElementById('tablemng4').style.cssText = "color:red;";
		}else{
			document.getElementById('tablemng4').style.cssText = "color:black;";
		}
		//収支の計算
		var GP = x - SumCOGS - SumofWaste;
		document.getElementById('tablemng5').innerHTML = GP;
		if(document.getElementById('tablemng5').innerHTML == 'NaN'){
			document.getElementById('tablemng5').innerHTML = '-';
			document.getElementById('tablemng5').style.cssText = "color:red;";
		}else{
			document.getElementById('tablemng5').style.cssText = "color:black;";
		}
	}	
		
});