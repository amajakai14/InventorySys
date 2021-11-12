package com.excellence.ebase6;

import com.excellence.dqube.base.BLJsonMap4DB;
import com.excellence.dqube.base.IBisinessLogic;
import com.excellence.dqube.base.IModel;

	public class BLJGoodsCheck extends BLJsonMap4DB implements IBisinessLogic {

		@Override
		public void setModel(IModel model){

			super.setModel(model);

			super.pageTitle = "BLJGoodsCheck";

			super.defaultSQL = "Select m.MaterialName, m.Unit, m.Supplier, p.PoNumber, p.DeliverDate, m.ExpPeriod, p.OrderQuan\r\n"
					+ "From PurchaseOrder_T p\r\n"
					+ "LEFT JOIN Material_M m\r\n"
					+ "On p.MaterialID = m.MaterialID\r\n"
					+ "Where DeliverDate = CURDATE();";


		}

	}

