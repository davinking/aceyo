
```
========华录短信平台常用方法代码备份,Updating ...==============

1. struts2 action 里面response ajax 字符串:
	ActionContext ctx = ActionContext.getContext();               
	HttpServletResponse response = (HttpServletResponse)ctx.get(ServletActionContext.HTTP_RESPONSE); 
	PrintWriter out = response.getWriter();
	out.write("string");

2. freemarker function 的使用 和 变量声明与赋值:
	<#global sum=0 /> //声明sum变量,所有命名空间使用; <#assign name=value>  本页使用; <#local name=value> 只能在宏和函数内使用
	<#list list as o>
	<tr>
		<input type="hidden" value="${tot(o.QUANTITY?number)}" /> //执行tot函数, '?number' 转为数字
	</tr>
	</#list>
	<tr>
		<td align=center colspan='3'>总计：${sum}</td>	//得到sum变量的值
	</tr>

	// tot 函数
	<#function tot x>
		<#global sum=sum+x>
		<#return sum>
	</#function>

3. 页面刷新js:
	location.reload();

4. js Object 赋值:
	var obj = new Object();
	obj.id= id;
	obj.chid=chid;

页面获取值(弹出窗口):
	var obj = window.dialogArguments;
	obj.chid;

5. js 警告窗口判断
	if(!confirm('确定停用 \''+chid+'\' 通道?')) return;


```