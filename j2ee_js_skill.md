  1. 下面例举的都是Jq或Js相关实际开发中用到的方法和总结的经验,每个用例Demo用2个空格分隔.
  1. 如有其他疑问请联系作者 Email：op@aceyo.com
  1. 最后更新日期：2010.11.25


/**以下是js前台操作相关方法**/

```
//** 对 serializeArray() 序列号方法详细解释 **//
1.HTML部分: <input type="text" name="name" value="John Doe" /><br /> <input type="text" name="url" value="http://www.example.com" />
2.serializ() 方法是用来将表单中的值编码成一个字符串,格式为: name=John+Doe&url=http%3A%2F%2Fwww.example.com .
3.serializeArray() 方法来将表单中的值转成一个Json对象数组,注意是数组,格式为:[{ name : 'name', value : 'John Doe'} , { name : 'url', value : 'http://www.example.com' } ] ,
	所以当你迭代json的时候出来的是[object Object].这个郁闷我好久.
4.json合并赋值普通for()写法: for(var i = 0,len = json1.length; i < len; i++) {json1.push(json2[i]);};  或: for(obj in json1) {json1.push(json2[obj]);}
	或 jquery 遍历写法: $.each( json1, function(i, field){json1.push(json2[i]);});  jquery 自带方法 : var s = $.merge( [0,1,2], [2,3,4] );
5.单独往一个json里面添加对象就可以直接: json1.push({ name : 'name', value : 'John Doe'});
6.遍历就可以用: $.each( json1, function(i, field){alert(field.name + " ");});
7.以上操作注意: 以上操作均为对serializeArray() 生成的json数组 操作. 如果需要往Json 里面添加对象,在下面的方法里面可以找到.
		一直没搞懂为啥合并的时候要遍历 'json1' 然后 'push(json2)' 而不是遍历 'json2' 再 'push()', 如果 for 里面是 'json2' 就会遍历出数组里面的其他函数. 
		所以一定要注意.不要写反了.一定要照着上面的逻辑写.才能把 'json2' 合并到 'json1' 里面. js 这弱语音就是那么难理解.	


// ** Json 添加 键值对 对象 **//
 Json1['key'] = value;


// ** JQuery 遍历获取某个DOM对象 **//
 $(element).eq(i).val(); //可获取第i个元素的值
 $(element).get(i); //可获取第i个元素的数组,所以不能加val(),会报错的.


// ** JQuery 中 scrollTop(val) 方法的使用 **//
 $("div.demo").scrollTop(300);	//JQ API中 只说这么用,但是让我费解了好久,后来才弄明白. 实际意义是: 'div.demo' 这个层里面如果出现滚动条,demo这个对象的滚动条下移300px.
 真正用的时候应该是:   $(function(){ $("body").scrollTop(300); });  //页面加载 滚动条就下移300px.


// ** 如果是JS提交文本框内容数据, 需要重置文本框, 必须用 each() **//
 $('form').each(function(){ this.reset();}); 	//注:没form标签,不能用 reset()


//** 页面加载执行 屏蔽form的回车事件, bug是这个form里面的所有回车都屏蔽了,如<textarea> **//
$(function(){
	$('form').keydown(function(){
		return (event.keyCode==13)?false:true;
	}); 	
});


//** 突破IE屏蔽限制弹出新窗口 **//
大多数浏览器的弹出式广告屏蔽功能执行的是屏蔽window.open这个函数。
而showModal类函数只要能运行便能打开一个模态窗口, 其他具体参数自己去Google.
var sFeathers = "dialogWidth=1000px;dialogHeight=800px;dialogTop=0;resizable=1;center=1";
showModalDialog(data['siteLink'],'',sFeathers);


// ** CheckBox 的 选择所有方法 **//
function check_all() {
	$("input[name='chk_log']").each(function() {
		$(this).attr('checked', !$(this).attr('checked')); // 全部反选的方法
		// $('#chk_all').attr('checked')?
		// $(this).attr('checked',true):$(this).attr('checked',false); //全选全不选的方法
	});
}

//** 取得下拉选单的选取值 **//
$(#testSelect option:selected').text();         //某些时候就要用着方法.
$("#testSelect").find('option:selected').text();
$("#testSelect").val();         //这个值有可能会跟上面2个方法得到的值会不同.


//**根据option的值选中下拉框 **//
$('#testSelect').val('111');
$("#sel").attr("value",'-sel3');         //设置value=-sel3的项目为当前选中项
$("<option value='1'>1</option>").appendTo("#sel");         //添加下拉框的option
$("#sel").empty()；        // 清空下拉框


//** 对页面操作需要的提示文字   msg: 要提示的文字 **//
function show_tip(msg) {
	var tip = $("#msg_tip");
	tip.fadeIn('normal', function() {
		tip.text(msg);
	}); // 淡入提示消息
	setTimeout(function() {
		tip.fadeOut('slow');
	}, 4000); // 4秒后淡出提示消息
}


//** AJAX GET方式获取 List, 迭代放入下拉菜单**//
function init_alarm_type(){
	var url = "bulletin_notifylist.action";
	$.post(url,function(json){
		var html='';
		$.each(json,function(i,obj){
		    html+="<option value='"+obj['id']+"'>"+obj['typeName']+"</option>";
		});
		$("#notify_type").append(html);	//整体加载,HTML渲染的更快.
	});
}


//** 在父窗口中操作 选中IFRAME中的所有单选钮**//
$(window.frames["iframe1"].document).find("input[@type='radio']").attr("checked","true");
$(window.iframe).contents().find("input[@type='radio']").attr("checked","true");  //没有id的方法
//** 在IFRAME中操作 选中父窗口中的所有单选钮**//
$(window.parent.document).find("input[@type='radio']").attr("checked","true");
iframe框架的：<iframe src="test.html" id="iframe1" width="700" height="300" frameborder="0" scrolling="auto"></iframe>


//** 添加iframe,自动获取iframe内容的高度**//
.iframe{width:100%;min-height:580px;}
<iframe class="iframe" scrolling="no" onload="autoHeight(this)" frameborder="0" src="'+url+'"></iframe>
//改变iframe页面的高度,不然加载高于css设定的600px的页面ff等浏览器会超出隐藏. ajax加载的超过高度要提前设定iframe内容的高度.
function autoHeight(obj){
	$(obj).height($(obj).contents().height()+20);
}


//** 弹出新窗口 并全屏 **//
function openNew(url){
	var screenWidth = screen.availWidth, screenHeight = screen.availHeight;
	var sFeathers = "fullscreen=yes,menubar=no,scrollbars=no,toolbar=no,status=no,location=no";
	var win = open(url,'_blank',sFeathers);
	if(win){
        win.resizeTo(screenWidth,screenHeight);
        win.outerWidth = screenWidth;
        win.outerHeight = screenHeight;
        win.moveTo(0,0);
    }
}


/** 解决session过期跳转到登陆页面并跳出iframe框架 **//
在你想控制跳转的页面，比如login.jsp中的<head>与</head>之间加入以下代码： 
<script> if (window != top)  top.location.href = location.href; </script> 


/** 点击回车后执行相关方法 **//
function keysearch(){
	document.onkeydown = function(evt){
		var evt = window.event?window.event:evt;	//区别浏览器
		if(evt.keyCode==13){
			if(document.activeElement.name=='s_query')	//判断元素是否得到焦点
			otherfunction();
		}
	}
}


/**把一个数组对象转换为逗号分隔的字符串**//
var obj = $('input[name="val"]');
var arr = obj.map(function(){return $(this).val();}).get(); //转为数组,中间用逗号分隔. get().join(";"),以分号分隔 
var str = arr.toString();//转为字符串


/**把一个数字保留一位小数**//
(20/10).toFixed(1);
结果: 2.0


//**有意思的3元表达式**//
var b = 3;
var a = (b==1)?'1':(b==2)?'2':(b==3)?'3':'4';
alert("b等于: "+a);


//**得到当前日期,兼容各个browser**//
function getDate(){
  var d,s,t;
  d=new Date();
  s=d.getFullYear().toString(10)+"-";
  t=d.getMonth()+1;
  s+=(t>9?"":"0")+t+"-";
  t=d.getDate();
  s+=(t>9?"":"0")+t+" ";
  t=d.getHours();
  s+=(t>9?"":"0")+t+":";
  t=d.getMinutes();
  s+=(t>9?"":"0")+t+":";
  t=d.getSeconds();
  s+=(t>9?"":"0")+t;
  $('#date').text(s);
}

//**把html的"<"和">"换成转义符.用jquery赋值的时候要转换回去,否则原文显示.**//
$.fn.formatVal = function(args) {
	if ($(this).is(':text,textarea')){
		if(args != undefined){	//如果是赋值方法
			return $(this).val(args.replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
		}else{
			return $(this).val().replace(/</g,'&lt;').replace(/>/g,'&gt;');
		}
	}else{
		if(args != undefined){	//如果是赋值方法
			return $(this).val(args);
		}else{
			return $(this).val();
		}
	}
};

//**当按钮点击提交的时候,限制连续点击,替换点击按钮的方法.**//
//但是一个页面如果有多次使用的时候就会出现bug,可以试着传参解决.
$.fn.submitLoadding = function(){
	var imgUrl = 'images/loadding.gif';
	$(this).hide();
	$("#submitLoadding_box").remove();
	$(this).after('<div id="submitLoadding_box"><img src="'+imgUrl+'"/>处理中...</div>');
};
$.fn.hideSubmitLoadding = function(){
	$(this).show();
	$("#submitLoadding_box").remove();
};
//使用方法
$("#submit").bind("click", function(){
	$(this).submitLoadding();
	$.getJSON("test.js", function(){
		$(this).hideSubmitLoadding();
	});
});

///*********************************************************************************////
///*******	功能: 检查为空方法. 页面加载要先执行btn_live_click()方法	********////
///*******	条件: 1目标class为"check_empty" 的, 2按钮class为"btn_ce"的	********////
///*********************************************************************************////

//** 检验是否为空  为空返回ture, trim()方法在ie6下有问题 ,所以用了 正则去前后空格 **//
function isEmpty(){
	var key = false;
	$('.check_empty').each(function(){
		 if($(this).val().replace(/(^\s*)|(\s*$)/g, '')==''){
			 key = true;
		 };
	});
	return key;
}

//按钮绑定检查事件  设class为 ce 的都检查 是否为空的文本框
function btn_live_click(){
	$('.btn_ce').live('click',function(e){
              // $(e.target) = $(this);       //得到触发对象2种方式
		if( isEmpty() ){
			alert('不能为空');
			return false;
		}else{
			return true;
		}
	});
}

//超链绑定检查事件  设class为a_del 的都检查 是否弹出提示确认窗口
function a_live_delclick(){
	var msg = "您确定要删除吗？ 删除后将无法恢复！"; 
	$('.a_del').live('click',function(e){
		return confirm(msg);
	});
}

//文本框绑定检查事件  设class为 txt_cn 的都检查 是否为数字的文本框
function txt_live_check_num(){
	$('.txt_cn').live('keyup blur',function(){
		$(this).val($(this).val().replace(/[^\d]/g,''));
	});
}


/*************************************************** 以下是js前台验证相关方法 ************************************************************/


//** 检查只能输入 中文,英文,数字,逗号,空格 .   clazz 为要检验的类**//
function check_en_cn_num(clazz){
	$('.'+clazz).keyup(function(){	//按下时检查
		//$(this).val($(this).val().replace(/[^\a-zA-Z0-9\u4E00-\u9FA5]/g,''));
		$(this).val($(this).val().replace(/[^\a-zA-Z0-9\u4E00-\u9FA5-\s-,]/g,''));
	});
	$('.'+clazz).blur(function(){	//失去焦点时检查
		$(this).val($(this).val().replace(/[^\a-zA-Z0-9\u4E00-\u9FA5-\s-,]/g,''));
	});
	$('.'+clazz).live("onbeforepaste", function(){	//绑定粘贴事件
	    clipboardData.setData('text',clipboardData.getData('text').replace(/[^\a-zA-Z0-9\u4E00-\u9FA5-\s-,]/g,''));
	});
}


//** 检查只能输入 数字 . clazz 为要检验的类**//
function check_num(clazz){
	$('.'+clazz).keyup(function(){	//按下时检查
		$(this).val($(this).val().replace(/[^\d]/g,''));
	});
	$('.'+clazz).blur(function(){	//失去焦点时检查
		$(this).val($(this).val().replace(/[^\d]/g,''));
	});
	$('.'+clazz).live("onbeforepaste", function(){	//绑定粘贴事件
	    clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''));
	});
}


//** 检验是否为空  为空返回ture, trim()方法在ie6下有问题 ,所以用了 正则去前后空格 **//
function check_null(){
	var key = false;
	$('#form_add .checked').each(function(){
		// $(this).val().trim()	//ie6下有问题
		 if($(this).val().replace(/(^\s*)|(\s*$)/g, '')==''){
			 key = true;
		 };
	});
	return key;
}


//** 输入必需是手机号  **//
function mobileCheck(){
	var obj = $('#a_number').val();
	var myreg = /^(((13[0-9]{1})|15[0-9]{1}|18[0-9]{1}|)+\d{8})$/;
	return myreg.test(obj)?true:false;
}

//** 输入必需是邮箱  **//
function emailCheck(email){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return myreg.test(email)?true:false;
}

//** 剩余字数检查方法 HTML 和 JS 方法 未用 JQ **//
1. <textarea name="content" cols="50" rows="5" onkeydown="textCounter(this,this.form.remLen,100);" onkeyup="textCounter(this,this.form.remLen,100);" ></textarea><br/>
共可输入100字，还剩<input maxlength="3" name="remLen" readonly="readonly" size="3" type="text" value="100" />字。

2. function textCounter(field,countfield,maxlimit){
	 if(field.value.length > maxlimit)
		field.value = field.value.substring(0,maxlimit);
	else
		countfield.value = maxlimit - field.value.length;
  }

```