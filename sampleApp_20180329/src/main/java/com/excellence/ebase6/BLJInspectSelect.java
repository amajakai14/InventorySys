package com.excellence.ebase6;

import com.excellence.dqube.base.BLJsonMap4DB;
import com.excellence.dqube.base.IBisinessLogic;
import com.excellence.dqube.base.IModel;

	public class BLJInspectSelect extends BLJsonMap4DB implements IBisinessLogic {

		@Override
		public void setModel(IModel model){

			super.setModel(model);

			super.pageTitle = "BLJInspectSelect";

			super.defaultSQL = "Select InspectNo, m.MaterialName, m.Unit, m.Supplier, p.OrderQuan, InspectCount, BadCount, InspectShort, ExpDate,InspectDate, InspectRemark\n"
					+ "From Inspect_Test i\n"
					+ "Inner Join PurchaseOrder_T p on i.PoNumber = p.PoNumber\n"
					+ "Inner Join Material_M m on p.MaterialID = m.MaterialID;";


		}

	}