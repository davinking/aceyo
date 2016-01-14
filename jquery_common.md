### 我自己总结的jquery的常用方法,适合初学者 ###
```
给jq 的$符号引用改为 $j 以便不与其他$符号冲突   var $j = jQuery.noConflict();

查找 ID 为"myDiv"的元素。$("#myDiv"); 

查找一个 DIV 元素。$("div"); 

查找含有特殊字符的元素 	<span id="foo:bar"></span> ---> ${"#foo\\:bar"}
			<span id="foo[bar]"></span>  ---> ${"#foo\\[bar\\]"}
			<span id="foo.bar"></span> ---> ${"foo\\.bar"}

查找所有类是 "myClass" 的元素. $(".myClass"); 

查找所有 name 属性是 newsletter 的 input 元素 $("input[name='newsletter']").attr("checked", true); 

找到匹配任意一个类的元素。 $("div,span,p.myClass") 

找到表单中所有的 input 元素 $("form input") 

匹配表单中所有的子级input元素。$("form > input") 

查找表格的1、3、5...行（即索引值0、2、4...） $("tr:even") 

查找表格的2、4、6行（即索引值1、3、5...） $("tr:odd")

给页面内所有标题加上背景色 $(":header").css("background", "#EEE"); 

只有对不在执行动画效果的元素执行一个动画特效 $("#run").click(function(){
  						$("div:not(:animated)").animate({ left: "+=20" }, 1000);}); 

查找所有包含 "John" 的 div 元素 $("div:contains('John')") 

查找所有含有 id 属性的 div 元素 $("div[id]") 

找到所有含有 id 属性，并且它的 name 属性是以 man 结尾的 $("input[id][name$='man']") 

查找所有密码框 $(":password")  

匹配type为hidden的元素 $("input:hidden") 

查找所有选中的复选框元素 $("input:checked") 
查找所有未选中的 input 元素 $("input:not(:checked)") 

查找所有选中的选项元素 $("select option:selected") 

返回文档中第一个图像的src属性值。<img src="test.jpg"/> ---> $("img").attr("src"); 

为所有图像设置src和alt属性。 $("img").attr({ src: "test.jpg", alt: "Test Image" }); 

为所有图像设置src属性。 $("img").attr("src","test.jpg"); 

将文档中图像的src属性删除 $("img").removeAttr("src"); 

为匹配的元素加上 selected

<html><head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<title>400 Bad Request</title>
<style><!--
body {font-family: arial,sans-serif}
div.nav {margin-top: 1ex}
div.nav A {font-size: 10pt; font-family: arial,sans-serif}
span.nav {font-size: 10pt; font-family: arial,sans-serif; font-weight: bold}
div.nav A,span.big {font-size: 12pt; color: #0000cc}
div.nav A {font-size: 10pt; color: black}
A.l:link {color: #6f6f6f}
A.u:link {color: green}
//--></style>
<script><!--
var rc=400;
//-->
</script>
</head>
<body text=#000000 bgcolor=#ffffff>
<table border=0 cellpadding=2 cellspacing=0 width=100%><tr><td rowspan=3 width=1% nowrap>
<b><font face=times color=#0039b6 size=10>G</font><font face=times color=#c41200 size=10>o</font><font face=times color=#f3c518 size=10>o</font><font face=times color=#0039b6 size=10>g</font><font face=times color=#30a72f size=10>l</font><font face=times color=#c41200 size=10>e</font>&nbsp;&nbsp;</b>
<td>&nbsp;</td></tr>
<tr><td bgcolor="#3366cc"><font face=arial,sans-serif color="#ffffff"><b>Error</b></td></tr>
<tr><td>&nbsp;</td></tr></table>
<blockquote>
<H1>Bad Request</H1>
Your client has issued a malformed or illegal request.

<p>
</blockquote>
<table width=100% cellpadding=0 cellspacing=0><tr><td bgcolor="#3366cc"><img alt="" width=1 height=4></td></tr></table>
</body></html>
```