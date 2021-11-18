package com.excellence.ebase6;

import com.excellence.dqube.base.BLJsonMap4DB;
import com.excellence.dqube.base.IBisinessLogic;
import com.excellence.dqube.base.IModel;

	public class BLJInspectDoneToday extends BLJsonMap4DB implements IBisinessLogic {

		@Override
		public void setModel(IModel model){

			super.setModel(model);

			super.pageTitle = "BLJInspectDoneToday";

			super.defaultSQL = "Select m. MaterialID, m.MaterialName, InspectCount, BadCount, InspectShort\n"
					+ "from Inspect_Test i\n"
					+ "Inner Join PurchaseOrder_T p on i.PoNumber = p.PoNumber\n"
					+ "Inner Join Material_M m on p.MaterialID = m.MaterialID\n"
					+ "Where InspectDate = CURDATE();";


		}

	}