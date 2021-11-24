package com.excellence.ebase6;

import com.excellence.dqube.base.BLJsonMap4DB;
import com.excellence.dqube.base.IBisinessLogic;
import com.excellence.dqube.base.IModel;

	public class BLJInventoryManagement extends BLJsonMap4DB implements IBisinessLogic {

		@Override
		public void setModel(IModel model){

			super.setModel(model);

			super.pageTitle = "BLJInventoryManagement";

			super.defaultSQL = "select m. MaterialName, inv. AsCount, m. UnitCost, m.Unit, inv. InventoryNeed, inv. InventoryShort \n"
					+ "From Material_M m\n"
					+ "Inner Join Inventory_Count inv on inv.MaterialID = m. MaterialID\n"
					+ "Where (Date = curdate());";


		}

	}