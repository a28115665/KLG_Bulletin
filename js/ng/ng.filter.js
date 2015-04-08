// APP FILTER
// main directives
angular.module('app.filter', [])
	// 顯示年/月/日
	.filter('ShowtoLocaleDateString', function() {
		return function(input) {
			if (!isNaN(input) || typeof input != 'undefined') {
			  	return new Date(input).toLocaleDateString();
			} else {
			  	return '';
			}
		};
	})

	// 排氣量單位
	.filter('CarCount', [ '$filter', '$locale', function($filter, $locale) {
		var number = $filter('number'), formats = $locale.NUMBER_FORMATS;
        return function (amount, symbol) {
            var value = number(amount, symbol);
            return value + 'cc'
        }
	}])

	//數字
	.filter('Number', [ '$filter', '$locale', function($filter, $locale) {
		var number = $filter('number'), formats = $locale.NUMBER_FORMATS;
        return function (amount, symbol) {
            var value = number(amount, symbol);
            return value
        }
	}])

	//無小數的金錢
	.filter('Currency', [ '$filter', '$locale', function($filter, $locale) {
		var currency = $filter('currency'), formats = $locale.NUMBER_FORMATS;
        return function (amount, symbol) {
        	if(amount == ''){
	            var value = currency(amount, symbol);
        		return value.replace(new RegExp('\\' + formats.DECIMAL_SEP + '\\d{2}'), '');
        	}else if(amount < 0){
	            var value = currency(amount, symbol);
        		return value.replace(new RegExp('\\' + formats.DECIMAL_SEP + '\\d{2}'), '').replace('(','-').replace(')','');
        	}else if(amount == 0){
        		return 1;
        	}else{
	            var value = currency(amount, symbol);
	            return value.replace(new RegExp('\\' + formats.DECIMAL_SEP + '\\d{2}'), '')
        	}
        }
	}])

	//有小數的金錢
	.filter('FloatCurrency', [ '$filter', '$locale', function($filter, $locale) {
		var currency = $filter('currency'), formats = $locale.NUMBER_FORMATS;
        return function (amount, symbol) {	            
        	var value = currency(amount, symbol);
            return value;
        }
	}])

	.filter('DatetimeYYYYMMDD', function() {
		return function(input) {
			if (input != null || typeof input != 'undefined') {
			  	return input.slice(0, 19);
			} else {
			  	return '';
			}
		};
	})

	.filter('DateFormatFor042', function() {
		return function(input) {
		  	return input + '年度';
		};
	})

	.filter('BooleanStatus', function(BooleanConstant) {
		return function(input) {
			if (BooleanConstant[input]) {
			  	return BooleanConstant[input];
			} else {
			  	return '';
			}
		};
	})
	.factory( 'BooleanConstant', function() {
		return {
			0: '否',
			1: '是'
		};
	})

	.filter('OMTYPENumberStatus', function(OMTYPENumberConstant) {
		return function(input) {
			if (OMTYPENumberConstant[input]) {
			  	return OMTYPENumberConstant[input];
			} else {
			  	return '';
			}
		};
	})
	.factory('OMTYPENumberConstant', function() {
		return {
			'92無鉛'  : '92無鉛',
			'95無鉛'  : '95無鉛',
			'98無鉛'  : '98無鉛',
			'超級柴油': '超級柴油'
		};
	})

	.filter('Department', function(DepartmentConstant) {
		return function(input) {
			if (DepartmentConstant[input]) {
			  	return DepartmentConstant[input];
			} else {
			  	return '';
			}
		};
	})
	.factory('DepartmentConstant', function() {
		return {
			'測試單位一'  : '測試單位一',
			'測試單位二'  : '測試單位二',
			'測試單位三'  : '測試單位三',
			'測試單位四'  : '測試單位四'
		};
	})

	.filter('InformationName', function(InformationConstant) {
		return function(input) {
			if (InformationName[input]) {
			  	return InformationName[input];
			} else {
			  	return '';
			}
		};
	})
	.factory( 'InformationConstant', function() {
		return {
			U_ID        : '使用者帳號',
			U_Name      : '使用者姓名',
			U_Department: '使用者單位',
			U_PW        : '密碼',
			U_Mail      : '信箱',
			U_Check     : '管理者核可',
			U_CR_TIME   : '使用者建置時間',

			CM_Check_SYM     : '核銷起年月',
			CM_Check_EYM     : '核銷迄年月',
			CM_Maintain_Item : '維修內容項目', 
			CM_Maintain_Cost : '維修費',
			CM_Memo          : '備註',

			ID     		: '流水號',
			C_Plate     : '車牌號碼',
            C_Type      : '車輛種類',
            C_Buy_YM    : '建置年月',
            C_Department: '單位',
            C_CCount    : '排氣量', 
            C_Discard   : '報廢',
            C_Move      : '移撥',
            C_Memo      : '備註',

            CI_YM                : '年度',
            //CI_NeedMaintain_Cost : '養護費',
            //CI_Insurance_Cost    : '保險費',
            CI_Plate_Cost        : '牌照稅',
            CI_Training_Cost     : '燃料使用費',
            //CI_Test_Cost         : '檢測費',
            //CI_Receipt_Cost      : '稅捐費',
            //CI_Rule_Cost         : '規費',
            CI_Test_Memo         : '備註',
            CI_NeedMaintain_Cost1: '當年度養護費',
			CI_NeedMaintain_Cost2: '當年剩餘養護費',
			CI_NeedMaintain_Cost3: '去年度養護費',
			CI_NeedMaintain_Cost4: '去年剩餘養護費',
			CI_Insurance_Cost1   : '當年度保險費',
			CI_Test_Cost1   	 : '當年度檢測費',
			CI_NeedMaintain_Cost_TY: '(年度)養護費',
			CI_Insurance_Cost_TY   : '(年度)保險費',
			CI_Receipt_Cost_TY     : '(年度)稅捐費',
			CI_Rule_Cost_TY        : '(年度)規費',

            CI_Date     : '違規日期',
            CI_Time     : '違規時間', 
            CI_Item     : '違規內容',
            CI_Cost     : '違規罰款金額',
            CI_Memo     : '備註',

            OM_DateTime    : '交易日期時間',
			OM_TYPE_Number : '油品',
			OM_Station     : '加油站',
			OM_Department  : '單位',
			OM_Count       : '油量',
			OM_Unit        : '參考單價',
			OM_Money       : '參考金額'
		};
	})