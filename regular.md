### 正则表达式的使用 ###
```
 一个文本格式或正则表达式构造函数

文本格式： /pattern/flags

正则表达式构造函数： new RegExp("pattern"[,"flags"]);

参数说明：

pattern -- 一个正则表达式文本

flags -- 如果存在，将是以下值：

g: 全局匹配

i: 忽略大小写

gi: 以上组合

[注意] 文本格式的参数不用引号，而在用构造函数时的参数需要引号。如：/ab+c/i new RegExp("ab+c","i")是实现一样的功能。在构造函数中，一些特殊字符需要进行转意(在特殊字符前加"\")。如：re = new RegExp("\\w+")

正则表达式中的特殊字符

字符 含意

\ 做为转意，即通常在"\"后面的字符不按原来意义解释，如/b/匹配字符"b"，当b前面加了反斜杆后/\b/，转意为匹配一个单词的边界。

-或-

对正则表达式功能字符的还原，如"*"匹配它前面元字符0次或多次，/a*/将匹配a,aa,aaa，加了"\"后，/a\*/将只匹配"a*"。

^ 匹配一个输入或一行的开头，/^a/匹配"an A"，而不匹配"An a"

$ 匹配一个输入或一行的结尾，/a$/匹配"An a"，而不匹配"an A"

* 匹配前面元字符0次或多次，/ba*/将匹配b,ba,baa,baaa

+ 匹配前面元字符1次或多次，/ba+/将匹配ba,baa,baaa

? 匹配前面元字符0次或1次，/ba?/将匹配b,ba

(x) 匹配x保存x在名为$1...$9的变量中

x|y 匹配x或y

{n} 精确匹配n次

{n,} 匹配n次以上

{n,m} 匹配n-m次

[xyz] 字符集(character set)，匹配这个集合中的任一一个字符(或元字符)

[^xyz] 不匹配这个集合中的任何一个字符

[\b] 匹配一个退格符

\b 匹配一个单词的边界

\B 匹配一个单词的非边界

\cX 这儿，X是一个控制符，/\cM/匹配Ctrl-M

\d 匹配一个字数字符，/\d/ = /[0-9]/

\D 匹配一个非字数字符，/\D/ = /[^0-9]/

\n 匹配一个换行符

\r 匹配一个回车符

\s 匹配一个空白字符，包括\n,\r,\f,\t,\v等

\S 匹配一个非空白字符，等于/[^\n\f\r\t\v]/

\t 匹配一个制表符

\v 匹配一个重直制表符

\w 匹配一个可以组成单词的字符(alphanumeric，这是我的意译，含数字)，包括下划线，如[\w]匹配"$5.98"中的5，等于[a-zA-Z0-9]

\W 匹配一个不可以组成单词的字符，如[\W]匹配"$5.98"中的$，等于[^a-zA-Z0-9]。

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

一 javascript正则表达式的基本知识

1     javascript 正则对象创建 和用法

    声明javascript     一个文本格式或正则表达式构造函数

文本格式： /pattern/flags

正则表达式构造函数： new RegExp("pattern"[,"flags"]);

参数说明：

pattern -- 一个正则表达式文本

flags -- 如果存在，将是以下值：

g: 全局匹配

i: 忽略大小写

gi: 以上组合

[注意] 文本格式的参数不用引号，而在用构造函数时的参数需要引号。如：/ab+c/i new RegExp("ab+c","i")是实现一样的功能。在构造函数中，一些特殊字符需要进行转意(在特殊字符前加"\")。如：re = new RegExp("\\w+")

正则表达式中的特殊字符

字符 含意

\ 做为转意，即通常在"\"后面的字符不按原来意义解释，如/b/匹配字符"b"，当b前面加了反斜杆后/\b/，转意为匹配一个单词的边界。

-或-

对正则表达式功能字符的还原，如"*"匹配它前面元字符0次或多次，/a*/将匹配a,aa,aaa，加了"\"后，/a\*/将只匹配"a*"。

^ 匹配一个输入或一行的开头，/^a/匹配"an A"，而不匹配"An a"

$ 匹配一个输入或一行的结尾，/a$/匹配"An a"，而不匹配"an A"

* 匹配前面元字符0次或多次，/ba*/将匹配b,ba,baa,baaa

+ 匹配前面元字符1次或多次，/ba+/将匹配ba,baa,baaa

? 匹配前面元字符0次或1次，/ba?/将匹配b,ba

(x) 匹配x保存x在名为$1...$9的变量中

x|y 匹配x或y

{n} 精确匹配n次

{n,} 匹配n次以上

{n,m} 匹配n-m次

[xyz] 字符集(character set)，匹配这个集合中的任一一个字符(或元字符)

[^xyz] 不匹配这个集合中的任何一个字符

[\b] 匹配一个退格符

\b 匹配一个单词的边界

\B 匹配一个单词的非边界

\cX 这儿，X是一个控制符，/\cM/匹配Ctrl-M

\d 匹配一个字数字符，/\d/ = /[0-9]/

\D 匹配一个非字数字符，/\D/ = /[^0-9]/

\n 匹配一个换行符

\r 匹配一个回车符

\s 匹配一个空白字符，包括\n,\r,\f,\t,\v等

\S 匹配一个非空白字符，等于/[^\n\f\r\t\v]/

\t 匹配一个制表符

\v 匹配一个重直制表符

\w 匹配一个可以组成单词的字符(alphanumeric，这是我的意译，含数字)，包括下划线，如[\w]匹配"$5.98"中的5，等于[a-zA-Z0-9]

\W 匹配一个不可以组成单词的字符，如[\W]匹配"$5.98"中的$，等于[^a-zA-Z0-9]。

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

一 javascript正则表达式的基本知识

1     javascript 正则对象创建 和用法

    声明javascript 正则表达式
    
     var reCat = new RegExp("cat");
      你也可以 
     var reCat = /cat/;      //Perl 风格   （推荐）

2 学习最常用的 test exec match search  replace  split 6个方法

   1） test  检查指定的字符串是否存在

       var data = "123123";
       var reCat = /123/gi;
       alert(reCat.test(data));  //true
     
       //检查字符是否存在  g 继续往下走  i 不区分大小写

   2） exec 返回查询值

       var data = "123123,213,12312,312,3,Cat,cat,dsfsdfs,";
       var reCat = /cat/i;
       alert(reCat.exec(data));  //Cat

     3）match  得到查询数组

       var data = "123123,213,12312,312,3,Cat,cat,dsfsdfs,";
       var reCat = /cat/gi;
       var arrMactches = data.match(reCat)

       for (var i=0;i < arrMactches.length ; i++)
       {
            alert(arrMactches[i]);   //Cat  cat
       }

     4） search  返回搜索位置  类似于indexof

       var data = "123123,213,12312,312,3,Cat,cat,dsfsdfs,";
       var reCat = /cat/gi;
       alert(data.search(reCat));  //23


    5） replace  替换字符  利用正则替换

       var data = "123123,213,12312,312,3,Cat,cat,dsfsdfs,";
       var reCat = /cat/gi;
       alert(data.replace(reCat,"libinqq"));

    6）split   利用正则分割数组

       var data = "123123,213,12312,312,3,Cat,cat,dsfsdfs,";
       var reCat = /\,/;
       var arrdata = data.split(reCat);

       for (var i = 0; i < arrdata.length; i++)
       {
            alert(arrdata[i]);
       }
   
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    

    匹配中文字符的正则表达式： [u4e00-u9fa5]

　　评注：匹配中文还真是个头疼的事，有了这个表达式就好办了

　　匹配双字节字符(包括汉字在内)：[^x00-xff]

　　评注：可以用来计算字符串的长度（一个双字节字符长度计2，ASCII字符计1）

　　匹配空白行的正则表达式：ns*r

　　评注：可以用来删除空白行

　　匹配HTML标记的正则表达式：< (S*?)[^>]*>.*?|< .*? />

　　评注：网上流传的版本太糟糕，上面这个也仅仅能匹配部分，对于复杂的嵌套标记依旧无能为力

　　匹配首尾空白字符的正则表达式：^s*|s*$

　　评注：可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式

　　匹配Email地址的正则表达式：w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*

　　评注：表单验证时很实用

　　匹配网址URL的正则表达式：[a-zA-z]+://[^s]*

　　评注：网上流传的版本功能很有限，上面这个基本可以满足需求

　　匹配帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$

　　评注：表单验证时很实用

　　匹配国内电话号码：d{3}-d{8}|d{4}-d{7}

　　评注：匹配形式如 0511-4405222 或 021-87888822

　　匹配腾讯QQ号：[1-9][0-9]{4,}

　　评注：腾讯QQ号从10000开始

　　匹配中国邮政编码：[1-9]d{5}(?!d)

　　评注：中国邮政编码为6位数字

　　匹配身份证：d{15}|d{18}

　　评注：中国的身份证为15位或18位

　　匹配ip地址：d+.d+.d+.d+

　　评注：提取ip地址时有用

　　匹配特定数字：

　　^[1-9]d*$　 　 //匹配正整数

　　^-[1-9]d*$ 　 //匹配负整数

    ^-?[1-9]d*$　　 //匹配整数
    ^[1-9]d*|0$　 //匹配非负整数（正整数 + 0）

　　^-[1-9]d*|0$　　 //匹配非正整数（负整数 + 0）

　　^[1-9]d*.d*|0.d*[1-9]d*$　　 //匹配正浮点数

　　^-([1-9]d*.d*|0.d*[1-9]d*)$　 //匹配负浮点数

　　^-?([1-9]d*.d*|0.d*[1-9]d*|0?.0+|0)$　 //匹配浮点数

　　^[1-9]d*.d*|0.d*[1-9]d*|0?.0+|0$　　 //匹配非负浮点数（正浮点数 + 0）

　　^(-([1-9]d*.d*|0.d*[1-9]d*))|0?.0+|0$　　//匹配非正浮点数（负浮点数 + 0）

　　评注：处理大量数据时有用，具体应用时注意修正

　　匹配特定字符串：

　　^[A-Za-z]+$　　//匹配由26个英文字母组成的字符串

　　^[A-Z]+$　　//匹配由26个英文字母的大写组成的字符串

　　^[a-z]+$　　//匹配由26个英文字母的小写组成的字符串

　　^[A-Za-z0-9]+$　　//匹配由数字和26个英文字母组成的字符串

　　^w+$　　//匹配由数字、26个英文字母或者下划线组成的字符串

　　在使用RegularExpressionValidator验证控件时的验证功能及其验证表达式介绍如下:

　　只能输入数字："^[0-9]*$"

　　只能输入n位的数字："^d{n}$"

　　只能输入至少n位数字："^d{n,}$"

　　只能输入m-n位的数字："^d{m,n}$"

　　只能输入零和非零开头的数字："^(0|[1-9][0-9]*)$"

　　只能输入有两位小数的正实数："^[0-9]+(.[0-9]{2})?$"

　　只能输入有1-3位小数的正实数："^[0-9]+(.[0-9]{1,3})?$"

　　只能输入非零的正整数："^+?[1-9][0-9]*$"

　　只能输入非零的负整数："^-[1-9][0-9]*$"

　　只能输入长度为3的字符："^.{3}$"

只能输入由26个英文字母组成的字符串："^[A-Za-z]+$"

　　只能输入由26个大写英文字母组成的字符串："^[A-Z]+$"

　　只能输入由26个小写英文字母组成的字符串："^[a-z]+$"

　　只能输入由数字和26个英文字母组成的字符串："^[A-Za-z0-9]+$"

　　只能输入由数字、26个英文字母或者下划线组成的字符串："^w+$"

　　验证用户密码:"^[a-zA-Z]w{5,17}$"正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。

　　验证是否含有^%&’,;=?$"等字符："[^%&',;=?$x22]+"

　　只能输入汉字："^[u4e00-u9fa5],{0,}$"

　　验证Email地址："^w+[-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$"

　　验证InternetURL："^http://([w-]+.)+[w-]+(/[w-./?%&=]*)?$"

　　验证电话号码："^((d{3,4})|d{3,4}-)?d{7,8}$"

　　正确格式为："XXXX-XXXXXXX"，"XXXX-XXXXXXXX"，"XXX-XXXXXXX"，

　　"XXX-XXXXXXXX"，"XXXXXXX"，"XXXXXXXX"。

　　验证身份证号（15位或18位数字）："^d{15}|d{}18$"

　　验证一年的12个月："^(0?[1-9]|1[0-2])$"正确格式为："01"-"09"和"1""12"

　　验证一个月的31天："^((0?[1-9])|((1|2)[0-9])|30|31)$"

　　正确格式为："01""09"和"1""31"。

　　匹配中文字符的正则表达式： [u4e00-u9fa5]

    匹配双字节字符(包括汉字在内)：[^x00-xff]

　　匹配空行的正则表达式：n[s| ]*r

　　匹配HTML标记的正则表达式：/< (.*)>.*|< (.*) />/

　　匹配首尾空格的正则表达式：(^s*)|(s*$)

　　匹配Email地址的正则表达式：w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*

　　匹配网址URL的正则表达式：http://([w-]+.)+[w-]+(/[w- ./?%&=]*)?

　　(1)应用：计算字符串的长度（一个双字节字符长度计2，ASCII字符计1）

	String.prototype.len=function(){return this.replace([^x00-xff]/g,"aa").length;}

　　(2)应用：javascript中没有像vbscript那样的trim函数，我们就可以利用这个表达式来实现

	String.prototype.trim = function()
	{
	return this.replace(/(^s*)|(s*$)/g, "");
	}
	(3)应用：利用正则表达式分解和转换IP地址

	function IP2V(ip) //IP地址转换成对应数值
	{
	re=/(d+).(d+).(d+).(d+)/g //匹配IP地址的正则表达式
	if(re.test(ip))
	{
	return RegExp.{GetProperty(Content)}*Math.pow(255,3))+RegExp.$2*Math.pow(255,2))+RegExp.$3*255+RegExp.$4*1
	}
	else
	{
	throw new Error("Not a valid IP address!")
	}
	}

　　(4)应用：从URL地址中提取文件名的javascript程序

	s="http://www.9499.net/page1.htm";
	s=s.replace(/(.*/){0,}([^.]+).*/ig,"$2″) ; //Page1.htm

　　(5)应用：利用正则表达式限制网页表单里的文本框输入内容

　　用正则表达式限制只能输入中文：onkeyup="value="/blog/value.replace(/["^u4E00-u9FA5]/g,") " onbeforepaste="clipboardData.setData(’text’,clipboardData.getData(’text’).replace(/[^u4E00-u9FA5]/g,"))"

　　用正则表达式限制只能输入全角字符： onkeyup="value="/blog/value.replace(/["^uFF00-uFFFF]/g,") " onbeforepaste="clipboardData.setData(’text’,clipboardData.getData(’text’).replace(/[^uFF00-uFFFF]/g,"))"

　　用正则表达式限制只能输入数字：onkeyup="value="/blog/value.replace(/["^d]/g,") " onbeforepaste= "clipboardData.setData(’text’,clipboardData.getData(’text’).replace(/[^d]/g,"))"

　　用正则表达式限制只能输入数字和英文：onkeyup="value="/blog/value.replace(/[W]/g,"") " onbeforepaste="clipboardData.setData(’text’,clipboardData.getData(’text’).replace(/[^d]/g,"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

1.文本框只能输入数字代码(小数点也不能输入)
<input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
2.只能输入数字,能输小数点.
<input onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">
<input name=txt1 onchange="if(/\D/.test(this.value)){alert('只能输入数字');this.value='';}">
3.数字和小数点方法二
<input type=text tvalue="" ovalue="" onkeypress="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.tvalue=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.ovalue=this.value" onkeyup="if(!this.value.match(/^[\+\-]?\d*?\.?\d*?$/))this.value=this.t_value;else this.tvalue=this.value;if(this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/))this.ovalue=this.value" onblur="if(!this.value.match(/^(?:[\+\-]?\d+(?:\.\d+)?|\.\d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^\.\d+$/))this.value=0+this.value;if(this.value.match(/^\.$/))this.value=0;this.ovalue=this.value}">
4.只能输入字母和汉字
<input onkeyup="value=value.replace(/[\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))" maxlength=10 name="Numbers">
5.只能输入英文字母和数字,不能输入中文
<input onkeyup="value=value.replace(/[^\w\.\/]/ig,'')">
6.只能输入数字和英文<font color="Red">chun</font>
<input onKeyUp="value=value.replace(/[^\d|chun]/g,'')">
7.小数点后只能有最多两位(数字,中文都可输入),不能输入字母和运算符号:
<input onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false">
8.小数点后只能有最多两位(数字,字母,中文都可输入),可以输入运算符号:
<input onkeyup="this.value=this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')">
————————————————————————————————————————
只能输入汉字：
<input onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\u4E00-\u9FA5]/g,''))">
只能输入数字：
<input onkeyup="value=value.replace(/[^\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">

只能输入英文和数字：
<input onkeyup="value=value.replace(/[\W]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))">
控制输入框只能输入文字或数字，也可以不允许输入特殊字符
这里不允许输入如下字符: (像 !@#$%^&* 等)<br>
<textarea rows=2 cols=20 name=comments onKeypress="if ((event.keyCode > 32 && event.keyCode < 48) || (event.keyCode > 57 && event.keyCode < 65) || (event.keyCode > 90 && event.keyCode < 97)) event.returnValue = false;">
只禁止空格输入
onkeyup="value=value.replace(/\s/g,'')"
只能输入中文和英文：
onkeyup="value=value.replace(/[^\a-zA-Z\u4E00-\u9FA5]/g,'')" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\a-zA-Z\u4E00-\u9FA5]/g,''))"
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

onbeforepaste 意思是在用户执行粘贴动作之前。
clipboardData.setData('text', xxx)  是把xxx的内容复制到剪贴板
clipboardData.getData('text')  是读出当前剪贴板里的内容，
.replace(/[^\d]/g,'')  是正则替换，把里面除了数字以外的字符全部都去掉，
整个语句的功能是，每当用户执行粘贴操作前，先取出剪贴板的内容字符串，删除不是数字的字符，只保留数字，然后再粘贴，而不是直接粘贴 

```