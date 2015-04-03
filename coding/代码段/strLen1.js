/***************************
用来获取输入字符串的长度，如果是中文算两个字符
_strlen + chinese.length
_model是指定输入模式，中文Ch或者英文
接收的参数为输入字符串的"值"和"模式"
*/
var strLen = (function() {
	var trim = function(str) {
		str = str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"");	//去字符串左右两端空格
	}
	
	return function(_str,_model) {
		trim(_str);
		var _strlen = _str.length,
		    _model = _model || "Ch";				//默认字符串格式Ch
			
		if(_strlen == 0) {
			return 0;
		}else {
			var chinese = _str.match(/[\u4e00-\u9fa5]/g);	//匹配中文
			return _strlen + (chinese && _model =="Ch" ? chinese.length: 0);
		}
		
	}
	
	
	
})()