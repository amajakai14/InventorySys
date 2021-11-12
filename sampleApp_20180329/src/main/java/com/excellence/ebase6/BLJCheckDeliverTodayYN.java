package com.excellence.ebase6;

import com.excellence.dqube.base.BLJsonMap4DB;
import com.excellence.dqube.base.IBisinessLogic;
import com.excellence.dqube.base.IModel;

	public class BLJCheckDeliverTodayYN extends BLJsonMap4DB implements IBisinessLogic {

		@Override
		public void setModel(IModel model){

			super.setModel(model);

			super.pageTitle = "BLJCheckDeliverTodayYN";

			super.defaultSQL = "SELECT count(*) From PurchaseOrder_T Where DeliverDate = CURDATE();";


		}

	}