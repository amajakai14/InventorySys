package com.excellence.ebase6;

import com.excellence.dqube.base.BLJsonMap4DB;
import com.excellence.dqube.base.IBisinessLogic;
import com.excellence.dqube.base.IModel;

public class BLJPoList extends BLJsonMap4DB implements IBisinessLogic {


	@Override
	public void setModel(IModel model){

		super.setModel(model);

		super.pageTitle = "BLJPoList";

		super.defaultSQL = "select p.PoNumber, m.MaterialName, m.Unit, m.UnitCost, m.ExpPeriod, m.Supplier, p.PoDate, p.DeliverDate, p.OrderQuan, p.PoRemark\n"
				+ "from PurchaseOrder_T p\n"
				+ "inner join  Material_M m on p.MaterialID = m.MaterialID;";

	}

}