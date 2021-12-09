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
	$.checkexe = function (){
		$('#datafield').empty();
		$('#userscreen').html('検品 | ');
		var field = document.getElementById("datafield");

		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 100px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_CheckHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_CheckHeadText').html("検品");

		InspectRegis();

		
		//今日の検品の予定
		

	}
	
	function InspectRegis(){
		$('.ebase6_mainReturn').css('display', 'block');
		var field = document.getElementById("datafield");

	
			var pamView = document.createElement("div");
			field.appendChild(pamView);
			pamView.className = "ebase6_pamview";
			pamView.id = "ebase6_pamview1";
		
		//今日の納品予定確認
		$.ajaxSetup({ async: false }); //同期
		$.postJSON("DQube",{actionID:'CheckDeliverTodayYN'}, function(jres){
			
			var divElem = document.createElement("div");
			pamView.appendChild(divElem);
			var col = jres.keys[0];
			divElem.innerHTML= jres.tblData[0][col];
			divElem.setAttribute("id","CheckGoodsIn");
			divElem.style.cssText = 'display:none;';
		$.ajaxSetup({ async: true }); //同期
		return false;
		});	
		var CheckGoodsIn = parseInt(document.getElementById('CheckGoodsIn').innerHTML);
		if(CheckGoodsIn == 0){
				firstpageOrderCheck();
		} else{
			//検品テーブル確認
			$.ajaxSetup({ async: false }); //同期
			$.postJSON("DQube",{actionID:'InspectPoID'}, function(jres){
				
				var divElem = document.createElement("div");
				pamView.appendChild(divElem);
				var col = jres.keys[0];
				divElem.innerHTML= jres.tblData[0][col];
				divElem.setAttribute("id","Countdata");
				divElem.style.cssText = 'display:none;';
				$.ajaxSetup({ async: true }); //同期
				return false;
			});			
			var Countdata = parseInt(document.getElementById('Countdata').innerHTML);
			//入力するか、ターブルを表示するか
			if(Countdata == CheckGoodsIn){
				firstpageOrderCheck();
			}else{
				newInspect();
			}
		}
	}
	
	function newInspect(){
		var field = document.getElementById("datafield");
		
		var tablecontent = document.createElement('div');
			field.appendChild(tablecontent);
			tablecontent.id = "ebase6_tablecontentnewInspect";
			//tablecontent.style.cssText = "position:absolute;left:calc(50% - 450px);";
			
			$('.ebase6_mainReturn').hide();
			
		
		var table = document.createElement("table");
			tablecontent.appendChild(table);
			table.className = "tablesorter";
			table.id = "dataTable";
			table.style.cssText = 'position:relative;';
			//発注と食材の情報を取得ためのテーブル作成
			$.ajaxSetup({ async: false }); //同期 これがないと順番にデータを取得できない
			$.postJSON("DQube",{actionID:'GoodsCheck'}, function(jres){
				
				var rc = document.createElement('div')
				table.appendChild(rc);
				var rowCount =  jres.tblData.length;
				rc.innerHTML = rowCount;
				rc.setAttribute('id','rowCount');
				rc.style.cssText = 'display:none;';
				
	
				//DOM型で要素をAppendしていく
				var theadElem = document.createElement("thead");
				var trElem = document.createElement("tr");
				table.appendChild(theadElem);
				theadElem.appendChild(trElem);
	
	
				for(i=0;i<jres.keys.length;i++){
					//テーブルにカラム名を表示
						var col = jres.keys[i];
					if (i == 0) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "食材名";
						thElem.style.cssText = "min-width:100px;border:1px solid #000000;box-sizing:border-box;"
					} else if (i == 1) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "単位";
						thElem.style.cssText = "box-sizing:border-box;"
	
					} else if (i == 2) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "仕入れ店";
						thElem.style.cssText = "box-sizing:border-box;"
					} else if (i == 3) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "発注ID";
						thElem.setAttribute('class','hidden');
					} else if (i == 4) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "日付";
						thElem.style.cssText = "box-sizing:border-box;"
						thElem.setAttribute('class','hidden');
					} else if (i == 5) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "消費期間";
						thElem.style.cssText = "box-sizing:border-box;"
						thElem.setAttribute('class','hidden');
					} else if (i == 6) {
						var thElem = document.createElement("th");
						trElem.appendChild(thElem);
						thElem.innerHTML = "発注数";
						thElem.style.cssText = "box-sizing:border-box;"
					}
					
				}
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML = "検品数";
				thElem.style.cssText = "box-sizing:border-box;"
		
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML = "不良品数";
				thElem.style.cssText = "box-sizing:border-box;"
				
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML = "検品不足";
				thElem.style.cssText = "box-sizing:border-box;"
				
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML = "消費期限";
				thElem.style.cssText = "box-sizing:border-box;"		
				
				var thElem = document.createElement("th");
				trElem.appendChild(thElem);
				thElem.innerHTML = "検品備考";
				thElem.style.cssText = "box-sizing:border-box;"											
				
				
	
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
					for (i = 0; i < jres.keys.length; i++) {
						if(i == 3 || i == 4 || i == 5){
							var tdElem = document.createElement("td");
							trElem.appendChild(tdElem);
							tdElem.style.background = "#fff";
							var col = jres.keys[i];
							tdElem.innerHTML = jres.tblData[j][col];
							tdElem.setAttribute('id', j * 10 + i);
							tdElem.setAttribute('class','hidden');
							tdElem.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;';
						} else{
							var tdElem = document.createElement("td");
							trElem.appendChild(tdElem);
							tdElem.style.background = "#fff";
							var col = jres.keys[i];
							tdElem.innerHTML = jres.tblData[j][col];
							tdElem.setAttribute('id', j * 10 + i);
							tdElem.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;';
						}
					}
					for(i = 7; i < 12; i++){
						if(i == 9){
							var tdElem = document.createElement("td");
							trElem.appendChild(tdElem);
							tdElem.style.background = "#fff";
							tdElem.innerHTML = "";
							tdElem.setAttribute('id', "input_" + j + i);
							tdElem.style.cssText = "box-sizing:border-box;font-size:8pt;text-align:right;font-weight:bold;color:blue;";

						} else if(i == 10){
							var tdElem = document.createElement("td");
							trElem.appendChild(tdElem);
							tdElem.style.background = "#fff";
							tdElem.innerHTML = "";
							tdElem.setAttribute('id', "input_" + j + i);
							tdElem.style.cssText = "box-sizing:border-box;font-size:8pt;text-align:right;font-weight:bold;color:blue;";
						}  else{
							var tdElem = document.createElement("td");
							trElem.appendChild(tdElem);
							tdElem.style.background = "#fff";
							var input = document.createElement("input");
							tdElem.appendChild(input);
							input.setAttribute('id', "input_" + j + i);
							input.style.cssText = "width:100%;border:none;box-sizing:border-box;font-size:8pt;text-align:right;font-weight:bold;color:blue;";
							if( i == 7|| i == 8){
								input.setAttribute('type', "number");
								input.setAttribute('type', 'number');
								input.setAttribute('maxlength', '11');
								input.setAttribute("oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
							}
						}

					}
					
				}
				
				$("#dataTable").tablesorter({
				widgets: ['zebra'],
				sortList: [[10, 1]],
				headers: { 0: { sorter: false } }

				});
			

				$("#dataTable").trigger("update");
	
				$.ajaxSetup({ async: true }); //同期の解除
				return false;
			});	
		calExpDate();
		var rowCount = parseInt(document.getElementById('rowCount').innerHTML);
		for(i = 0; i < rowCount;i++){
			//発注数、検品数、検品不足数のIDを取得
			var input1 = "input_" + i + 7;
			var input2 = "input_" + i + 8;
			var input1ID = document.getElementById(input1);
			var input2ID = document.getElementById(input2);
			input1ID.onchange = function(){
				AutoCheckGoods();
			}
			input2ID.onchange = function(){
				AutoCheckGoods();
			}
		}
		
		var btnr = document.createElement("input");
			tablecontent.appendChild(btnr);
			btnr.setAttribute('type', "button");
			btnr.setAttribute('value', "メインに戻る");
			//btnr.setAttribute('class', ".ebase6_mainReturn");
			btnr.setAttribute('id', "mainreturn");
			btnr.style.cssText = 'position:relative;display:inline;top:15px;left:80%;';
			$('#mainreturn').off("click");
			$('#mainreturn').on("click", mainReturn);
		
		//新規登録ボタン作成
		var btns = document.createElement("input");
		tablecontent.appendChild(btns);
		btns.setAttribute('type', "button");
		btns.setAttribute('value', "検品確定");
		btns.setAttribute('id', "checkRe");
		btns.style.cssText = 'font-size:1em;padding: 5px;background-color: green;position:relative;left:5px;top:10px;cursor:pointer;'
		$('#checkRe').off("click");
		$('#checkRe').on("click", checkRegister);
	}
	//消費期限の計算
	function calExpDate(){
		var rowCount = parseInt(document.getElementById('rowCount').innerHTML);
		for(j = 0; j < rowCount; j++){
			//消費期間と入力IDを取得
			var input = "input_" + j + 10;
			var expp = j*10 + 5;
			var inputID = document.getElementById(input);
			var exppID = document.getElementById(expp);
			//日付計算
			var dt = new Date();
			var addDate = parseInt(exppID.innerHTML);
			dt.setDate(dt.getDate() + addDate);
			var value = formatDate(dt);
			//値を各IDに与える
			inputID.innerHTML = value;
		}
		
	}
	
	function formatDate(dt) {
		var y = dt.getFullYear();
		var m = ('00' + (dt.getMonth()+1)).slice(-2);
		var d = ('00' + dt.getDate()).slice(-2);
		return (y + '-' + m + '-' + d);
	}
	
	//検品不足 (発注数ー検品数ー不良品数)
	function AutoCheckGoods(){
		var rowCount = parseInt(document.getElementById('rowCount').innerHTML);
		for(j = 0; j < rowCount; j++){
		//発注数、検品数、検品不足数のIDを取得
		var ordnum = j*10 + 6;
		var input1 = "input_" + j + 7;
		var input2 = "input_" + j + 8;
		var input3 = "input_" + j + 9;
		var ordnumID = document.getElementById(ordnum);
		var input1ID = document.getElementById(input1);
		var input2ID = document.getElementById(input2);
		var input3ID = document.getElementById(input3);
		//値を取得
		var total = parseInt(ordnumID.innerHTML);
		var pass = input1ID.value;
		if(pass == ''){
			pass = 0;
		}
		var fail = (input2ID.value);
		if(fail == ''){
			fail = 0;
			input2ID.value = fail;
		}
		//検品不足の計算
		x = total - parseInt(pass) + parseInt(fail);
			if(x != 0){
				input3ID.innerHTML = x;
				input3ID.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;color: red;';
			} else{
				input3ID.innerHTML = x;
				input3ID.style.cssText = 'padding:5px;width:100px;border:1px black solid;box-sizing:border-box;color: black;';
			}
		}
	}
	

	//検品データ登録
	function checkRegister() {
		
		var rowCount = parseInt(document.getElementById('rowCount').innerHTML);
		
		for(j = 0; j < rowCount;j++){
			//ID取得
			var input_1 = j*10 + 3;
			var input_2 = 'input_' + j + 7;
			var input_3 = 'input_' + j + 8;
			var input_4 = 'input_' + j + 9;
			var input_5 = 'input_' + j + 10;
			var input_6 = 'input_' + j + 11;
			//値を取得
			var id = document.getElementById(input_1).innerHTML;
			var realcount = document.getElementById(input_2).value;
			if (parseInt(realcount) != realcount) {
				alert("検品数にデータを入力してください");
				return false;
			}
		}
		for(j = 0; j < rowCount;j++){
			//ID取得
			var input_1 = j*10 + 3;
			var input_2 = 'input_' + j + 7;
			var input_3 = 'input_' + j + 8;
			var input_4 = 'input_' + j + 9;
			var input_5 = 'input_' + j + 10;
			var input_6 = 'input_' + j + 11;
			//値を取得
			var id = document.getElementById(input_1).innerHTML;
			var realcount = document.getElementById(input_2).value;
				var badcount = document.getElementById(input_3).value;
				var shortcount = document.getElementById(input_4).innerHTML;
				var expdate = document.getElementById(input_5).innerHTML;
				if(badcount == ""){
					badcount = "0";
				}
				var checkremark = document.getElementById(input_6).value;
				//submit処理開始
				//$.ajaxSetup({ async: false }); //同期
				$.postJSON("DQube",{actionID:'CheckRegister',id:id, realcount:realcount, badcount:badcount, shortcount:shortcount, expdate:expdate, checkremark:checkremark}, function(){
					
						$.checkexe();
						return false;
				});
		}
		
	}

	function firstpageOrderCheck(){
		$('.ebase6_mainReturn').css('display', 'block');
		$('.ebase6_returnItemlist').css('display', 'none');
		
		var field = document.getElementById("datafield");

		
		var tablecontent = document.createElement("div");
		tablecontent.id = "ebase6_tablecontent";
		field.appendChild(tablecontent);
		
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
						tdElem.setAttribute('id', 'Check' + j + i);
							if(i == 1){
								tdElem.setAttribute("class","hidden");
							}
					}
				}
			}
			//背景色の高さはデータ量による
			var x = table.tBodies[0].rows.length;
			var hadjust = 32+28*x;
			table.style.cssText = "position:absolute;width:1125px;height:"+hadjust+"px;max-height:380px;"
			
			$("#dataTable").tablesorter({
				widgets: ['zebra'],
				sortList: [[10, 1]],
				headers: { 0: { sorter: false } }

			});
			
			
			var btnh = document.createElement("input");
			tablecontent.appendChild(btnh);
			btnh.setAttribute('type', "button");
			btnh.setAttribute('value', "検品修正");
			btnh.setAttribute('id', "CheckEdit");
			btnh.style.cssText = 'font-size:1em;padding:5px;background-color: orange;position:absolute;left:5px;top:400px;cursor:pointer;'
			$('#CheckEdit').off("click");
			$('#CheckEdit').on("click", selectInsptlist);
			
			if($('#2').html() == ''){
				$('#CheckEdit').hide();
			} else{
				$('#CheckEdit').show();
			}

			$("#dataTable").trigger("update");
			//$.ajaxSetup({ async: true }); //同期の解除
			return false;
		});

		
		
	}
	
	function selectInsptlist(){
		$('.ebase6_mainReturn').css('display', 'none');
		$('#CheckEdit').css('display', 'none');
		$('#button_ad').remove();
		$('#ebase6_matHead').remove();
		$('#ebase6_matSubText').remove();
		var field = document.getElementById("datafield");
		var tablecontent = document.getElementById('ebase6_tablecontent')
		tablecontent.style.cssText = "position:absolute;left:20px;top:90px;"

		var reposition = document.getElementById("dataTable");
		reposition.style.cssText = "position:absolute;width:1125px;";
		var sizereduce = document.getElementById("tbody_mat");
		sizereduce.style.cssText = "display:block;position:absolute;width:1180px;height:30px;overflow-y:auto;overflow-x:hidden;";
		
		//背景色の高さはデータ量による
		var x = reposition.tBodies[0].rows.length;
		var hadjust = 32+32*x;
		reposition.style.cssText = "position:absolute;width:1163px;height:"+hadjust+"px;max-height:290px;overflow-y:auto;overflow-x:hidden;"
		
		var hbodyadjust = 32+32*x;
		sizereduce.style.cssText = "display:block;position:absolute;width:1180px;height:"+hbodyadjust+"px;max-height:260px;overflow-y:auto;overflow-x:hidden;";

		var matHead = document.createElement("div");
		matHead.id = "ebase6_matHead";
		matHead.style.cssText = "left:calc(50% - 150px);"
		field.appendChild(matHead);

		var matHeadText = document.createElement("div");
		matHeadText.id = "ebase6_CheckHeadText";
		matHead.appendChild(matHeadText);
		$('#ebase6_CheckHeadText').html("検品")

		var matSubText = document.createElement("div");
		matSubText.id = "ebase6_matSubText";
		matHead.appendChild(matSubText);
		matSubText.style.cssText = "background-color: #FF9B9B;"
		$('#ebase6_matSubText').html("修正")


		var btnad = document.createElement("input");
		tablecontent.appendChild(btnad);
		btnad.setAttribute('type', "button");
		btnad.setAttribute('value', "追加/削除");
		btnad.setAttribute('id', "button_ad");
		btnad.style.cssText = 'position:relative;;background-color:	#C0C0C0;cursor:pointer;top:-40px;left:5px;';
		$('#button_ad').off("click");
		$('#button_ad').on("click", getInsptCheckedData);
		
		var btnreturn = document.createElement("input");
		field.appendChild(btnreturn);
		btnreturn.setAttribute('type', "button");
		btnreturn.setAttribute('value', "戻る");
		btnreturn.setAttribute('class', "ebase6_returnItemlist");
		btnreturn.setAttribute('id', "button_rt");
		btnreturn.style.cssText = "position:absolute;top:400px;left:80%;";
		$('.ebase6_returnItemlist').off("click");
		$('.ebase6_returnItemlist').on("click", $.checkexe);
		
		var checkboxcol = document.getElementById("checkboxcol");
		checkboxcol.style.cssText = "padding:5px;width:35px;border:1px black solid;";
		
		var all = document.getElementsByClassName('checkboxrow');
		for (var i = 0; i < all.length; i++) {
		 all[i].style.cssText = 'background-color:white;';
		}	
	}
	function getInsptCheckedData(){
		var field = document.getElementById("datafield");
		var table = document.getElementById("dataTable");
		var tbodyRowCount = table.tBodies[0].rows.length;
		
		$('#button_rt').remove();
		$('#ebase6_listCreateTable').remove();
		var listCreateTable = document.createElement("div");
		listCreateTable.id = "ebase6_listCreateTable";
		listCreateTable.style.cssText = 'top:300px;left:20px;width:1163px;';
		field.appendChild(listCreateTable);
		
		tablech = document.createElement('table');
		listCreateTable.appendChild(tablech);
		tablech.id = "tablech";
		tablech.className = "tablesorter";
		tablech.style.cssText = 'border-collapse:collapse;';
		
		var theadElemCh = document.createElement("thead"); 
		var trElemCh = document.createElement("tr");
		tablech.appendChild(theadElemCh);
		theadElemCh.appendChild(trElemCh);
				
		var view1 = document.createElement("th");
		tablech.appendChild(view1);
		view1.innerHTML = "食材名";
		view1.id = "view1_sample";

		var view2 = document.createElement("th");
		tablech.appendChild(view2);
		view2.innerHTML = "単位";
		view2.id = "view2_sample";

		var view3 = document.createElement("th");
		tablech.appendChild(view3);
		view3.innerHTML = "発注数";
		view3.id = "view3_sample";

		var view4 = document.createElement("th");
		tablech.appendChild(view4);
		view4.innerHTML = "検品数";
		view4.id = "view4_sample";

		var view5 = document.createElement("th");
		tablech.appendChild(view5);
		view5.innerHTML = "不良品数";
		view5.id = "view5_sample";

		var view6 = document.createElement("th");
		tablech.appendChild(view6);
		view6.innerHTML = "検品不足";
		view6.id = "view6_sample";

		var view7 = document.createElement("th");
		tablech.appendChild(view7);
		view7.innerHTML = "検品備考";
		view7.id = "view7_sample";

		var view8 = document.createElement("th");
		tablech.appendChild(view8);
		view8.innerHTML = "検品日";
		view8.id = "view8_sample";
		
		var view9 = document.createElement("th");
		tablech.appendChild(view9);
		view9.innerHTML = "検品ID";
		view9.id = "view8_sample";
		view9.style.cssText = 'display:none;';
		
		var tbodyElemch = document.createElement('tbody');
		tablech.appendChild(tbodyElemch);
		tbodyElemch.setAttribute("id", "tbody_editInspt");
		
		var k = 0;
		for(j = 0;j < tbodyRowCount; j++){
			var rcheck = "chbox" + j;
			var x = document.getElementById(rcheck).checked;
			if(x == true){
				var trElem = document.createElement("tr");
				tbodyElemch.appendChild(trElem);
				for(i = 0; i < 9; i++){
					if(i == 0 || i == 1){
						var delem = 'Check' + j + (i+2);
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;';
					} else if(i == 2){
						var delem = 'Check' + j + 5;
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;;text-align:center;';
						tdElem.innerHTML = x
						var inpu = "inputch_" + k + i;
						tdElem.setAttribute('id', inpu);
					}else if(i == 3 || i == 4){
						var delem = 'Check' + j + (i+3);
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';	
						var input = document.createElement("input");
						tdElem.appendChild(input);
						input.setAttribute('maxlength', '11');
						input.setAttribute('value', x);
						input.setAttribute("oninput","javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");
						input.setAttribute('type', 'number');
						input.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
						var inpu = "inputch_" + k + i;
						input.setAttribute('id', inpu);
					} else if(i == 5){
						var delem = 'Check' + j + 8;
						var x = document.getElementById(delem).innerHTML
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.innerHTML = x;
						if(parseInt(x) == 0){
							tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;color:black;';
						} else{
							tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;color:red;';
						}
						var inpu = "inputch_" + k + i;
						tdElem.setAttribute('id', inpu);
						
					} else if(i == 6){
						var delem = 'Check' + j + (i+5);
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.background = "#fff";
						tdElem.style.cssText = 'padding:5px;width:110px;border:1px black solid;box-sizing:border-box;';	
						var input = document.createElement("input");
						tdElem.appendChild(input);
						input.setAttribute('value', x);
						input.style.cssText = "width:100%;border:none;box-sizing:border-box;text-align:right;color:blue;text-align:center;";
						var inpu = "inputch_" + k + i;
						input.setAttribute('id', inpu);
					} else if(i == 7){
						var delem = 'Check' + j + 10;
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;';
						tdElem.innerHTML = x
					} else if( i == 8){
						var delem = 'Check' + j + 1;
						var x = document.getElementById(delem).innerHTML;
						var tdElem = document.createElement("td");
						trElem.appendChild(tdElem);
						tdElem.style.cssText = 'padding:8px;width:110px;border:1px black solid;box-sizing:border-box;text-align:center;display:none;';
						tdElem.innerHTML = x;
						var inpu = "inputch_" + k + i;
						tdElem.setAttribute('id', inpu);
					}
							
				}
				k += 1;
			}
		
		
			
		}
		
		var btnreturn = document.createElement("input");
		listCreateTable.appendChild(btnreturn);
		btnreturn.setAttribute('type', "button");
		btnreturn.setAttribute('value', "戻る");
		btnreturn.setAttribute('class', "ebase6_returnItemlist");
		btnreturn.setAttribute('id', "button_rt");
		btnreturn.style.cssText = "left:72%;";
		$('.ebase6_returnItemlist').off("click");
		$('.ebase6_returnItemlist').on("click", $.checkexe);
		
		var btn = document.createElement("input");
		listCreateTable.appendChild(btn);
		btn.setAttribute('type', "button");
		btn.setAttribute('value', "修正確定");
		btn.setAttribute('id', "button_cc");
		btn.style.cssText = 'position:relative;top:10px;left:-35px;background-color:#FF9B9B;cursor:pointer;';
		$('#button_cc').off("click");
		$('#button_cc').on("click", updateInspt);
		
		var inputRow = tablech.tBodies[0].rows.length;
		for(j = 0; j < inputRow; j++){
			var input2 = "inputch_" + j + 3;
			var input3 = "inputch_" + j + 4;
			var input2ID = document.getElementById(input2);
			var input3ID = document.getElementById(input3);
			input2ID.onchange = function(){
				AutoCheckGoods2()
			}
			input3ID.onchange = function(){
				AutoCheckGoods2()
			}
		}
			

	}
	function AutoCheckGoods2(){
		var tablech = document.getElementById('tablech');
		var inputRow = tablech.tBodies[0].rows.length;
		for(j = 0; j < inputRow; j++){
		//発注数、検品数、検品不足数のIDを取得
		var input1 = "inputch_" + j + 2;
		var input2 = "inputch_" + j + 3;
		var input3 = "inputch_" + j + 4;
		var input4 = "inputch_" + j + 5;
		var input1ID = document.getElementById(input1);
		var input2ID = document.getElementById(input2);
		var input3ID = document.getElementById(input3);
		var input4ID = document.getElementById(input4);
		//値を取得
		var total = parseInt(input1ID.innerHTML);
		var pass = parseInt(input2ID.value);
		if(pass == ''){
			pass = 0;
		}
		var fail = parseInt(input3ID.value);
		if(fail == ''){
			fail = 0;
		}
		//検品不足の計算
		x = total - parseInt(pass) + parseInt(fail);
			if(x != 0){
				input4ID.innerHTML = x;
				input4ID.style.cssText = 'padding:8px;width:100px;border:1px black solid;box-sizing:border-box;color: red;text-align:center;';
			} else{
				input4ID.innerHTML = x;
				input4ID.style.cssText = 'padding:8px;width:100px;border:1px black solid;box-sizing:border-box;color: black;text-align:center;';
			}
		}
		
	}
	//DBに更新
	function updateInspt(){
		var field = document.getElementById("datafield");
		var tablech = document.getElementById("tablech");
		var inputRow = tablech.tBodies[0].rows.length;
		tableCount = 0;
		for(k = 0; k < inputRow; k++){
			var input1 = "inputch_" + k + 3;
			var input2 = "inputch_" + k + 4;
			var input3 = "inputch_" + k + 5;
			var input4 = "inputch_" + k + 6;
			var input_id = "inputch_" + k + 8;
			
			var realcount = document.getElementById(input1).value;
			var badcount = document.getElementById(input2).value;
			var shortcount = document.getElementById(input3).innerHTML;
			var checkremark = document.getElementById(input4).value;
			var id = document.getElementById(input_id).innerHTML;
			if(realcount == ''|| badcount == ''){
				alert('検品数と不良数を入力してください');
				return false;
			}
				$.postJSON("DQube", { actionID: 'InspectUpdateData', realcount: realcount, badcount: badcount, shortcount: shortcount, checkremark: checkremark, id: id }, function(jres) {
						//if (tableCount == 0) {
							$('#dataTable').remove();
							$('#ebase6_tablecontent').remove();
							
							var tablecontent = document.createElement("div");
							tablecontent.id = "ebase6_tablecontent";
							field.appendChild(tablecontent);
							
							var table = document.createElement("table");
							tablecontent.appendChild(table);
							table.className = "tablesorter";
							table.id = "dataTable";
							table.style.cssText = "position:absolute;width:1125px;"

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
									thElem.style.cssText = 'padding:5px;width:35px;border:1px black solid;display:none;';
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
							tbodyElem.setAttribute("id", "tbody_mat");
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
										check.style.cssText = 'width:20px'
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
							var hadjust = 10+30*x;
							table.style.cssText = "position:absolute;width:1125px;height:"+hadjust+"px;max-height:380px;";


							$("#dataTable").tablesorter({
								widgets: ['zebra'],
								sortList: [[10, 1]],
								headers: { 0: { sorter: false } }

							});
							$("#dataTable").trigger("update");
							
							var btnh = document.createElement("input");
							tablecontent.appendChild(btnh);
							btnh.setAttribute('type', "button");
							btnh.setAttribute('value', "検品修正");
							btnh.setAttribute('id', "CheckEdit");
							btnh.style.cssText = 'font-size:1em;padding:5px;background-color: orange;position:absolute;left:5px;top:400px;cursor:pointer;'
							$('#CheckEdit').off("click");
							$('#CheckEdit').on("click", selectInsptlist);
		
							tableCount += 1;
							return false;
						//}						
					});
					

		}
					matHead = document.getElementById('ebase6_matHead');
					matHead.style.cssText = "left:calc(50% - 100px);";
					$('#button_ad').remove();
					$('.ebase6_mainReturn').css('display', 'block');
					$('#button_cc').css('display', 'none');
					$('#button_ad').remove();
					$('#ebase6_matSubText').remove();
					$('#ebase6_listCreateTable').remove();
	}

	//元々にあるコード、まだ応用していない部分
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
	function mainReturn(){
		$('#table_item').css('display', 'none');
		$('#ebase6_NavButtonGroup').css('display', 'block');		
		$('.ebase6_mainReturn').css('display', 'none');
		$('#datafield').empty();
		$('#userscreen').html('メイン | ');
	}
});
