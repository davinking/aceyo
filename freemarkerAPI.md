### Freemarker 的一些基本用法 ###
```
1概念
2指令
if, else, elseif 
switch, case, default, break
list, break 
include 
Import 
compress 
escape, noescape 
assign 
global 
setting 
macro, nested, return
t, lt, rt 
3一些常用方法或注意事项 
表达式转换类 
数字循环 
对浮点取整数 
给变量默认值 
判断对象是不是null 
常用格式化日期 
添加全局共享变量数据模型 
直接调用java对象的方法 
字符串处理(内置方法) 
在模板里对sequences和hashes初始化 
注释标志 
sequences内置方法 
hashes内置方法 
4 freemarker在web开发中注意事项 
web中常用的几个对象 
view中值的搜索顺序 
在模板里ftl里使用标签 
如何初始化共享变量 
与webwork整合配置 
5高级方法 
自定义方法 
自定义 Transforms 
                                  
1概念
最常用的3个概念
sequence  序列，对应java里的list、数组等非键值对的集合
hash      键值对的集合
namespace 对一个ftl文件的引用,利用这个名字可以访问到该ftl文件的资源
2指令
if, else, elseif
语法
<#if condition>
  ...
<#elseif condition2>
  ...
<#elseif condition3>
  ...
...
<#else>
  ...
</#if>
用例
<#if x = 1>
  x is 1
</#if>
<#if x = 1>
  x is 1
<#else>
  x is not 1
</#if>
switch, case, default, break
语法
<#switch value>
  <#case refValue1>
    ...
    <#break>
  <#case refValue2>
    ...
    <#break>
  ...
  <#case refValueN>
    ...
    <#break>
  <#default>
    ...
</#switch>
用例
字符串
<#switch being.size>
  <#case "small">
     This will be processed if it is sm1概念
2指令
if, else, elseif 
switch, case, default, break
list, break 
include 
Import 
compress 
escape, noescape 
assign 
global 
setting 
macro, nested, return
t, lt, rt 
3一些常用方法或注意事项 
表达式转换类 
数字循环 
对浮点取整数 
给变量默认值 
判断对象是不是null 
常用格式化日期 
添加全局共享变量数据模型 
直接调用java对象的方法 
字符串处理(内置方法) 
在模板里对sequences和hashes初始化 
注释标志 
sequences内置方法 
hashes内置方法 
4 freemarker在web开发中注意事项 
web中常用的几个对象 
view中值的搜索顺序 
在模板里ftl里使用标签 
如何初始化共享变量 
与webwork整合配置 
5高级方法 
自定义方法 
自定义 Transforms 
                                  
1概念
最常用的3个概念
sequence  序列，对应java里的list、数组等非键值对的集合
hash      键值对的集合
namespace 对一个ftl文件的引用,利用这个名字可以访问到该ftl文件的资源
2指令
if, else, elseif
语法
<#if condition>
  ...
<#elseif condition2>
  ...
<#elseif condition3>
  ...
...
<#else>
  ...
</#if>
用例
<#if x = 1>
  x is 1
</#if>
<#if x = 1>
  x is 1
<#else>
  x is not 1
</#if>
switch, case, default, break
语法
<#switch value>
  <#case refValue1>
    ...
    <#break>
  <#case refValue2>
    ...
    <#break>
  ...
  <#case refValueN>
    ...
    <#break>
  <#default>
    ...
</#switch>
用例
字符串
<#switch being.size>
  <#case "small">
     This will be processed if it is small
     <#break>
  <#case "medium">
     This will be processed if it is medium
     <#break>
  <#case "large">
     This will be processed if it is large
     <#break>
  <#default>
     This will be processed if it is neither
</#switch>
数字
<#switch x>
  <#case x = 1>
    1
  <#case x = 2>
    2
  <#default>
    d
</#switch>
如果x=1 输出 1 2, x=2输出 2, x=3 输出d
list, break
语法
<#list sequence as item>
...
<#if item = "spring"><#break></#if>
...
</#list>
关键字
item_index:是list当前值的下标
item_has_next:判断list是否还有值
用例
<#assign seq = ["winter", "spring", "summer", "autumn"]>
<#list seq as x>
  ${x_index + 1}. ${x}<#if x_has_next>,</#if>
</#list>
输出
  1. winter,
  2. spring,
  3. summer,
  4. autumn  

include
语法
<#include filename>
or
<#include filename options>
options包含两个属性
encoding=”GBK” 编码格式
parse=true 是否作为ftl语法解析,默认是true，false就是以文本方式引入.注意在ftl文件里布尔值都是直接赋值的如parse=true,而不是parse=”true”
用例
/common/copyright.ftl包含内容
Copyright 2001-2002 ${me}<br>
All rights reserved.  
模板文件
<#assign me = "Juila Smith">
<h1>Some test</h1>
<p>Yeah.
<hr>
<#include "/common/copyright.ftl" encoding=”GBK”> 
输出结果
<h1>Some test</h1>
<p>Yeah.
<hr>
Copyright 2001-2002 Juila Smith
All rights reserved. 
Import
语法
<#import path as hash>
类似于java里的import,它导入文件，然后就可以在当前文件里使用被导入文件里的宏组件
用例
假设mylib.ftl里定义了宏copyright那么我们在其他模板页面里可以这样使用
<#import "/libs/mylib.ftl" as my>
<@my.copyright date="1999-2002"/>
"my"在freemarker里被称作namespace
compress
语法
<#compress>
  ...
</#compress>
用来压缩空白空间和空白的行
用例
<#assign x = "    moo  \n\n   ">
(<#compress>
  1 2  3   4    5
  ${moo}
  test only
  I said, test only
</#compress>)  
输出
(1 2 3 4 5
moo
test only
I said, test only) 
escape, noescape
语法
<#escape identifier as expression>
  ...
  <#noescape>...</#noescape>
  ...
</#escape>
用例
主要使用在相似的字符串变量输出，比如某一个模块的所有字符串输出都必须是html安全的，这个时候就可以使用该表达式
<#escape x as x?html>
  First name: ${firstName}
  <#noescape>Last name: ${lastName}</#noescape>
  Maiden name: ${maidenName}
</#escape>
相同表达式  
  First name: ${firstName?html}
  Last name: ${lastName }
  Maiden name: ${maidenName?html}
assign
语法
<#assign name=value>
or
<#assign name1=value1 name2=value2 ... nameN=valueN>
or
<#assign same as above... in namespacehash>
or
<#assign name>
  capture this
</#assign>
or
<#assign name in namespacehash>
  capture this
</#assign>
用例
生成变量,并且给变量赋值
给seasons赋予序列值
<#assign seasons = ["winter", "spring", "summer", "autumn"]>
给变量test加1
<#assign test = test + 1>
给my namespage 赋予一个变量bgColor,下面可以通过my.bgColor来访问这个变量
<#import "/mylib.ftl" as my>
<#assign bgColor="red" in my>
将一段输出的文本作为变量保存在x里
下面的阴影部分输出的文本将被赋值给x
<#assign x>
  <#list 1..3 as n>
    ${n} <@myMacro />
  </#list>
</#assign>
Number of words: ${x?word_list?size}
${x}
<#assign x>Hello ${user}!</#assign>     error
<#assign x=” Hello ${user}!”>         true
同时也支持中文赋值，如：
<#assign 语法>
  java
</#assign>
${语法}
打印输出:
java
global
语法
<#global name=value>
or
<#global name1=value1 name2=value2 ... nameN=valueN>
or
<#global name>
  capture this
</#global>
全局赋值语法，利用这个语法给变量赋值，那么这个变量在所有的namespace中是可见的,如果这个变量被当前的assign语法覆盖 如<#global x=2> <#assign x=1> 在

当前页面里x=2将被隐藏，或者通过${.global.x}来访问
setting
语法
<#setting name=value>
用来设置整个系统的一个环境
locale
number_format
boolean_format
date_format, time_format, datetime_format
time_zone
classic_compatible
用例
假如当前是匈牙利的设置，然后修改成美国
${1.2}
<#setting locale="en_US">
${1.2}  
输出
1,2
1.2
因为匈牙利是采用“,”作为十进制的分隔符，美国是用“.”
 
macro, nested, return
语法
<#macro name param1 param2 ... paramN>
  ...
  <#nested loopvar1, loopvar2, ..., loopvarN>
  ...
  <#return>
  ...
</#macro>
用例
<#macro test foo bar="Bar" baaz=-1>
  Test text, and the params: ${foo}, ${bar}, ${baaz}
</#macro>
<@test foo="a" bar="b" baaz=5*5-2/>
<@test foo="a" bar="b"/>
<@test foo="a" baaz=5*5-2/>
<@test foo="a"/> 
输出
  Test text, and the params: a, b, 23
  Test text, and the params: a, b, -1
  Test text, and the params: a, Bar, 23
  Test text, and the params: a, Bar, -1
定义循环输出的宏
<#macro list title items>
  <p>${title?cap_first}:
  <ul>
    <#list items as x>
      <li>${x?cap_first}
    </#list>
  </ul>
</#macro>
<@list items=["mouse", "elephant", "python"] title="Animals"/>
输出结果  
<p>Animals:
  <ul>
      <li>Mouse
      <li>Elephant
      <li>Python
  </ul>
包含body的宏
<#macro repeat count>
  <#list 1..count as x>
    <#nested x, x/2, x==count>
  </#list>
</#macro>
<@repeat count=4 ; c halfc last>
  ${c}. ${halfc}<#if last> Last!</#if>
</@repeat> 
输出
1. 0.5
  2. 1
  3. 1.5
  4. 2 Last!
 

t, lt, rt
语法
<#t> 去掉左右空白和回车换行
<#lt>去掉左边空白和回车换行
<#rt>去掉右边空白和回车换行
<#nt>取消上面的效果

3一些常用方法或注意事项

表达式转换类
${expression}计算expression并输出
#{ expression }数字计算#{ expression ;format}安格式输出数字format为M和m
M表示小数点后最多的位数,m表示小数点后最少的位数如#{121.2322;m2M2}输出121.23
 

数字循环
1..5 表示从1到5，原型number..number
对浮点取整数
${123.23?int} 输出123
给变量默认值
${var?default(“hello world<br>”)?html}如果var is null那么将会被hello world<br>替代
判断对象是不是null
    <#if mouse?exists>
      Mouse found
<#else>
也可以直接${mouse?if_exists})输出布尔形

<#if member?? >
??代表如果变量存在
</#if>

${mouse!"No mouse."} 
当mouse不存在时，返回default value

(product.color)!"red"   这种方式，能够处理product或者color为miss value的情况； 
而product.color!"red"将只处理color为miss value的情况 
product.color??将只测试color是否为null 
(product.color)??将测试product和color是否存在null 
?exists:旧版本的用法 

常用格式化日期
 openingTime必须是Date型,详细查看freemarker文档 Reference->build-in referece->build-in for date
${openingTime?date}
${openingTime?date_time}
${openingTime?time}
添加全局共享变量数据模型
在代码里的实现
    cfg = Configuration.getDefaultConfiguration();
cfg.setSharedVariable("global", "you good"); 
页面实现可以通过global指令,具体查看指令里的global部分
直接调用java对象的方法
${object.methed(args)} 
字符串处理(内置方法)
html安全输出
“abc<table>sdfsf”?html 
返回安全的html输出,替换掉html代码
xml安全输出
var?xml   
substring的用法
<#assign user=”hello jeen”>
${user[0]}${user[4]} 
${user[1..4]}
输出 :
ho
ello  
类似String.split的用法 
 “abc;def;ghi”?split(“;”)返回sequence
将字符串按空格转化成sequence,然后取sequence的长度
     var?word_list  效果同 var?split(“ ”) 
 var?word_list?size
取得字符串长度
var?length
大写输出字符
var?upper_case
小写输出字符
var?lower_case
首字符大写
var?cap_first
首字符小写
var?uncap_first
去掉字符串前后空格 
var?trim
每个单词的首字符大写
var?capitalize
类似String.indexof: 
 “babcdabcd”?index_of(“abc”) 返回1
 “babcdabcd”?index_of(“abc”,2) 返回5
类似String.lastIndexOf 
 last_index_of和String.lastIndexOf类似,同上
下面两个可能在代码生成的时候使用（在引号前加”\”）
j_string: 在字符串引号前加”\”
 <#assign beanName = 'The "foo" bean.'>
 String BEAN_NAME = "${beanName?j_string}";
打印输出:
 String BEAN_NAME = "The \"foo\" bean.";
js_string:
 <#assign user = "Big Joe's \"right hand\".">
<script>
  alert("Welcome ${user}!");
</script>  
打印输出
 alert("Welcome Big Joe\'s \"right hand\"!");
替换字符串 replace
${s?replace(‘ba’, ‘XY’ )}
${s?replace(‘ba’, ‘XY’ , ‘规则参数’)}将s里的所有的ba替换成xy 规则参数包含: i r m s c f 具体含义如下:
· i: 大小写不区分.
· f: 只替换第一个出现被替换字符串的字符串
· r:  XY是正则表达式
· m: Multi-line mode for regular expressions. In multi-line mode the expressions ^ and $ match just after or just before, respectively, a line terminator or the 

end of the string. By default these expressions only match at the beginning and the end of the entire string.
· s: Enables dotall mode for regular expressions (same as Perl singe-line mode). In dotall mode, the expression . matches any character, including a line 

terminator. By default this expression does not match line terminators.
· c: Permits whitespace and comments in regular expressions.

在模板里对sequences和hashes初始化
sequences 
1. [“you”,”me”,”he”] 
2. 1..100
3. [ {“Akey”:”Avalue”},{“Akey1”:”Avalue1”},
{“Bkey”:”Bvalue”},{“Bkey1”:”Bvalue1”},
]
  
hashes      {“you”:”a”,”me”:”b”,”he”:”c”}

注释标志
<#-- 
这里是注释 
-->
旧版本的freemarker采用的是<#comment> 注释 </#comment>方法
sequences内置方法
sequence?first
返回sequence的第一个值;前提条件sequence不能是null
sequence?last
 返回sequence最后一个值
sequence?reverse
 反转sequence的值
sequence?size
 返回sequence的大小
sequence?sort
 对sequence按里面的对象toString()的结果进行排序
sequence?sort_by(value)
对sequence 按里面的对象的属性value进行排序
如: sequence里面放入的是10 个user对象，user对象里面包含name,age等属性
sequence?sort_by(name) 表示所有的user按user.name进行排序
hashes内置方法
hash?keys
 返回hash里的所有keys, 返回结果类型sequence
hash?values
 返回hash里的所有value, 返回结果类型sequence
4 freemarker在web开发中注意事项
freemarker与webwork整合
web中常用的几个对象
Freemarker的ftl文件中直接使用内部对象:

url?id=12 方式传参
${Parameters.id} 
或 
${Parameters['id']}
或
${request.getParameter('id')}

${Request ["a"]}
${RequestParameters["a"]} //有问题
${Session ["a"]}
${Application ["a"]}
${JspTaglibs ["a"]}
与webwork整合之后 通过配置的servlet 已经把request,session等对象置入了数据模型中
在view中存在下面的对象
  我们可以在ftl中${req}来打印req对象
· req - the current HttpServletRequest 
· res - the current HttpServletResponse 
· stack - the current OgnlValueStack 
· ognl - the OgnlTool instance 
· webwork - an instance of FreemarkerWebWorkUtil 
· action - the current WebWork action 
· exception - optional the Exception instance, if the view is a JSP exception or Servlet exception view 
view中值的搜索顺序
${name}将会以下面的顺序查找name值
· freemarker variables 
· value stack 
· request attributes 
· session attributes 
· servlet context attributes 
在模板里ftl里使用标签
注意，如果标签的属性值是数字，那么必须采用nubmer=123方式给属性赋值
JSP页面
<%@page contentType="text/html;charset=ISO-8859-2" language="java"%>
<%@taglib uri="/WEB-INF/struts-html.tld" prefix="html"%>
<%@taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%>
<html>
  <body>
    <h1><bean:message key="welcome.title"/></h1>
    <html:errors/>
    <html:form action="/query">
      Keyword: <html:text property="keyword"/><br>
      Exclude: <html:text property="exclude"/><br>
      <html:submit value="Send"/>
    </html:form>
  </body>
</html> 
模板ftl页面
<#assign html=JspTaglibs["/WEB-INF/struts-html.tld"]>
<#assign bean=JspTaglibs["/WEB-INF/struts-bean.tld"]>
<html>
  <body>
    <h1><@bean.message key="welcome.title"/></h1>
    <@html.errors/>
    <@html.form action="/query">
      Keyword: <@html.text property="keyword"/><br>
      Exclude: <@html.text property="exclude"/><br>
      <@html.submit value="Send"/>
    </@html.form>
  </body>
</html> 

如何初始化共享变量
1． 初始化全局共享数据模型
freemark在web上使用的时候对共享数据的初始化支持的不够,不能在配置初始化的时候实现，而必须通过ftl文件来初始化全局变量。这是不能满主需求的，我们需要在

servlet init的时候留出一个接口来初始化系统的共享数据
具体到和webwork整合,因为本身webwork提供了整合servlet,如果要增加全局共享变量，可以通过修改

com.opensymphony.webwork.views.freemarker.FreemarkerServlet来实现,我们可以在这个servlet初始化的时候来初始化全局共享变量
与webwork整合配置
配置web.xml
<servlet>
    <servlet-name>freemarker</servlet-name>
    <servlet-class>com.opensymphony.webwork.views.freemarker.FreemarkerServlet</servlet-class>
    <init-param>
      <param-name>TemplatePath</param-name>
<param-value>/</param-value>
<!—模板载入文件夹，这里相对context root，递归获取该文件夹下的所有模板-->
    </init-param>
    <init-param>
      <param-name>NoCache</param-name> <!—是否对模板缓存-->
      <param-value>true</param-value>
    </init-param>
    <init-param>
      <param-name>ContentType</param-name>
      <param-value>text/html</param-value>
    </init-param>
    <init-param>
<param-name>template_update_delay</param-name>
<!—模板更新时间,0表示每次都更新,这个适合开发时候-->
      <param-value>0</param-value>
    </init-param>
    <init-param>
      <param-name>default_encoding</param-name>
      <param-value>GBK</param-value>
    </init-param>
    <init-param>
      <param-name>number_format</param-name>
      <param-value>0.##########</param-value><!—数字显示格式-->
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>freemarker</servlet-name>
    <url-pattern>*.ftl</url-pattern>
  </servlet-mapping>
5高级方法
自定义方法
${timer("yyyy-MM-dd H:mm:ss", x)}
${timer("yyyy-MM-dd ", x)}
在模板中除了可以通过对象来调用方法外（${object.methed(args)}）也可以直接调用java实现的方法，java类必须实现接口TemplateMethodModel的方法exec(List 

args). 下面以把毫秒的时间转换成按格式输出的时间为例子
public class LongToDate implements TemplateMethodModel {
    
public TemplateModel exec(List args) throws TemplateModelException {
SimpleDateFormat mydate = new SimpleDateFormat((String) args.get(0)));
        return mydate.format(new Date(Long.parseLong((String)args.get(1)));
    }
}  
将LongToDate对象放入到数据模型中
root.put("timer", new IndexOfMethod());
ftl模板里使用
<#assign x = "123112455445">
${timer("yyyy-MM-dd H:mm:ss", x)}
${timer("yyyy-MM-dd ", x)}
输出
2001-10-12 5:21:12
2001-10-12
自定义 Transforms
实现自定义的<@transform>文本或表达式</@transform>的功能,允许对中间的最终文本进行解析转换
例子：实现<@upcase>str</@upcase> 将str转换成STR 的功能
代码如下：
import java.io.*;
import java.util.*;
import freemarker.template.TemplateTransformModel;
class UpperCaseTransform implements TemplateTransformModel {
    public Writer getWriter(Writer out, Map args) {
        return new UpperCaseWriter(out);
    }
    private class UpperCaseWriter extends Writer {
       
        private Writer out;
           
        UpperCaseWriter (Writer out) {
            this.out = out;
        }
        public void write(char[] cbuf, int off, int len)
                throws IOException {
            out.write(new String(cbuf, off, len).toUpperCase());
        }
        public void flush() throws IOException {
            out.flush();
        }
        public void close() {
        }
    }
}  
然后将此对象put到数据模型中
root.put("upcase", new UpperCaseTransform());
在view(ftl)页面中可以如下方式使用
<@upcase>
hello world
</@upcase>
打印输出:
HELLO WORLD






if, else, elseif  
语法：  
<#if condition>  
  ...  
<#elseif condition2>  
  ...  
<#elseif condition3>  
  ...  
...  
<#else>  
  ...  
</#if>  
备注：condition、condition2···必须为boolean 类型，<#elseif ··>、<#else>可有0或多个。  
实例：  
 <#if x == 1>  
  x is 1  
<#elseif x == 2>  
  x is 2  
<#elseif x == 3>  
  x is 3  
<#elseif x &gt 4>  
  x is 4  
<#else>  
  x is not 1 nor 2 nor 3 nor 4  
</#if>     
备注：< 或 > 号 必须转义，否则出错。。转义请参考其他文档。  
  
switch, case, default, break  
语法  
<#switch value>  
  <#case refValue1>  
    ...  
    <#break>  
  <#case refValue2>  
    ...  
    <#break>  
  ...  
  <#case refValueN>  
    ...  
    <#break>  
  <#default>  
    ...  
</#switch>  
备注：该指令官方不推荐使用了，可以用if, else, elseif 指令代替。  
  
list, break  
语法  
<#list sequence as item>  
    ...  
</#list>  
备注： sequence 为一个sequence 或者 collection 类型。item 为 循环的变量。该指令中包含有两个特殊的循环变量，  
item_index：该值为当前循环的值。 item_has_next：该值为一个boolean类型，表明该循环是否含有下一个（是否为循环到了最后一个）  
实例：  
<#assign seq = ["winter", "spring", "summer", "autumn"]>  
<#list seq as x>  
  ${x_index + 1}. ${x}<#if x_has_next>,</#if>  
</#list>   
输出：  
  1. winter,  
  2. spring,  
  3. summer,  
  4. autumn     
 实例：  
<#assign x=3>  
<#list 1..x as i>  
  ${i}  
</#list>    
备注：当x 为一个数值序列时，可以使用该list 列出两个数值之间的值。（适合于表格的序号填写）  
实例：  
<#list seq as x>  
  ${x}  
  <#if x = "spring"><#break></#if>  
</#list>  
备注：可以用<#if···><#break> 来终止该循环。  
  
include  
语法  
<#include path>  
或者  
<#include path options>  
备注：  
path: 为包含一个文件的路径或者是一个输出为String 类型的表达式。   
options: 一个或多个的参数: encodingencoding=encoding, parseparse=parse   
encoding: 包含文件解析的编码，如GBK、utf-8等  
parse: 为一个boolean 类型值，true为用ftl解析，false为当作text文件解析 (also accepts a few string values for backward compatibility)  
实例：  
/common/copyright.ftl内容：  
Copyright 2001-2002 ${me}<br>  
All rights reserved.     
主体内容：   
<#assign me = "Juila Smith">  
<h1>Some test</h1>  
<p>Yeah.  
<hr>  
<#include "/common/copyright.ftl">     
 输出     
<h1>Some test</h1>  
<p>Yeah.  
<hr>  
Copyright 2001-2002 Juila Smith  
All rights reserved.     
备注：path 可以包含*任意取值，例如：*/copyright.ftl、commons/*/copyright.ftl等，*表示任意路径下的。  
该指令具有国际化，如<#include "footer.ftl">， 这个指令的搜索文件的顺序为footer_en_US.ftl,footer_en.ftl,footer.ftl （本地为英国）。  
  
import  
语法：  
<#import path as hash>  
备注：  
path:模板的路径名.   
hash: 在该文件中使用该模板指令的名称。  
实例：  
<#import "/libs/mylib.ftl" as my>  
文件中的使用：  
<@my.copyright date="1999-2002"/>   
  
noparse  
语法：  
<#noparse>  
  ...  
</#noparse>  
备注：该指令包含的文件将不被解析成ftl，而是直接输出。  
实例：  
Example:  
--------  
<#noparse>  
  <#list animals as being>  
  <tr><td>${being.name}<td>${being.price} Euros  
  </#list>  
</#noparse>     
输出：   
 Example:  
--------  
  <#list animals as being>  
  <tr><td>${being.name}<td>${being.price} Euros  
  </#list>  
  
compress  
语法：  
<#compress>  
  ...  
</#compress>  
备注：该指令将会把数据模型中的空格或者html格式去掉。  
实例：  
<#assign x = "    moo  \n\n   ">  
(<#compress>  
  1 2  3   4    5  
  ${moo}  
  test only  
  
  I said, test only  
  
</#compress>)   
输出：  
(1 2 3 4 5  
moo  
test only  
I said, test only)  
  
escape, noescape  
语法：  
<#escape identifier as expression>  
  ...  
  <#noescape>...</#noescape>  
  ...  
</#escape>   
备注：该指令对${```}该指令进行了格式化的输出。  
备注：  
<#escape x as x?html>  
  Customer Name: ${customerName}  
  Items to ship:  
  <#escape x as itemCodeToNameMap[x]>  
    ${itemCode1}  
    ${itemCode2}  
    ${itemCode3}  
    ${itemCode4}  
  </#escape>  
</#escape>    
相当于：  
Customer Name: ${customerName?html}  
  Items to ship:  
    ${itemCodeToNameMap[itemCode1]?html}  
    ${itemCodeToNameMap[itemCode2]?html}  
    ${itemCodeToNameMap[itemCode3]?html}  
    ${itemCodeToNameMap[itemCode4]?html}  
  
assign  
语法：  
<#assign name=value>  
or  
<#assign name1=value1 name2=value2 ... nameN=valueN>  
or  
<#assign same as above... in namespacehash>  
or  
<#assign name>  
  capture this  
</#assign>  
or  
<#assign name in namespacehash>  
  capture this  
</#assign>  
备注：该指令可以创建或者替换变量为页面使用，该变量为最高的层才能被创建或替换，如foo，当foo.bar时将不能被创建或者替换。  
name：变量的名称。value：变量的值。namespacehash：import指令中的引用名。  
实例：  
<#assign seasons = ["winter", "spring", "summer", "autumn"]>   
<#assign  
  seasons = ["winter", "spring", "summer", "autumn"]  
  testtest = test + 1  
>  
实例：    
<#import "/mylib.ftl" as my>  
<#assign bgColor="red" in my>  
实例：  
 <#macro myMacro>foo</#macro>  
<#assign x>  
  <#list 1..3 as n>  
    ${n} <@myMacro />  
  </#list>  
</#assign>  
Number of words: ${x?word_list?size}  
${x}   
输出：  
Number of words: 6  
    1 foo  
    2 foo  
    3 foo  
  
global  
语法：  
<#global name=value>  
or  
<#global name1=value1 name2=value2 ... nameN=valueN>  
or  
<#global name>  
  capture this  
</#global>  
备注：该指令相似于assign 指令，只是该指令创建的变量可以被所有命名空间使用。  
实例：  
<#global x = 1>   
<#assign x = 2>  
${x}  
${.global.x}  
</#assign>  
输出：  
2  
1  
备注：如果在当前命名空间中，有同名的变量存在，则global 变量将没隐藏，如需访问则：${.global.x}   
  
local  
语法：  
<#local name=value>  
or  
<#local name1=value1 name2=value2 ... nameN=valueN>  
or  
<#local name>  
  capture this  
</#local>  
备注：该指令类似 assign 指令，但它创建或者替换了本例变量，它只能在macro定义或者function 定义中有效。  
  
setting  
语法：  
<#setting name=value>  
备注：该指令的设置将影响到该指令设置的地方以下的内容有效。  
它提供的设值有：  
local：该值为本地的语言，将影响数值、时间等的格式。取值例如：en, en_US, en_US_MAC  
number_format:用于将数值转换成String，当没有明确的格式被指定时。  
boolean_format:用于将boolean转换成String  
date_format,time_format,datetime_format:用于将时间转换成String  
time_zone:用于设置时区,如"GMT", "GMT+2", "GMT-1:30", "CET", "PST", "America/Los_Angeles"  
url_escaping_charset:  
classic_compatible:  
实例：  
${1.2}  
<#setting locale="en_US">  
${1.2}    
输出：  
1,2  
1.2   
  
User-defined directive (<@...>)  
语法：  
<@user_def_dir_exp param1=val1 param2=val2 ... paramN=valN/>  
(Note the XML-style / before the >)    
or if you need loop variables   
<@user_def_dir_exp param1=val1 param2=val2 ... paramN=valN ; lv1, lv2, ..., lvN/>  
  
Or the same as the above two but with end-tag  
  
<@user_def_dir_exp ...>  
  ...  
</@user_def_dir_exp>  
or  
<@user_def_dir_exp ...>  
  ...  
</@>  
  
Or all above but with positional parameter passing   
  
<@ val1, val2, ..., valN/>  
...etc.  
备注：该指令为调用用户自定义的指令，比如macro  
实例：  
<@list items=["mouse", "elephant", "python"] title="Animals"/>  
...  
<#macro list title items>  
  <p>${title?cap_first}:  
  <ul>  
    <#list items as x>  
      <li>${x?cap_first}  
    </#list>  
  </ul>  
</#macro>    
输出：  
  <p>Animals:  
  <ul>  
      <li>Mouse  
      <li>Elephant  
      <li>Python  
  </ul>  
    
...    
实例：  
<@myRepeatMacro count=4 ; x, last>  
  ${x}. Something... <#if last> This was the last!</#if>  
</@myRepeatMacro>    
  
macro, nested, return  
语法：  
<#macro name param1 param2 ... paramN>  
  ...  
  <#nested loopvar1, loopvar2, ..., loopvarN>  
  ...  
  <#return>  
  ...  
</#macro>  
备注：该指令保存着模板的部分定义，可以用用户指令来调用该指令使用。该指令可以定义在任何地方，不管设定的地方之前或者之后都能使用。也可以指定默认参数的

默认值。  
实例：  
<#macro test foo bar="Bar" baaz=-1>  
  Test text, and the params: ${foo}, ${bar}, ${baaz}  
</#macro>  
<@test foo="a" bar="b" baaz=5*5-2/>  
<@test foo="a" bar="b"/>  
<@test foo="a" baaz=5*5-2/>  
<@test foo="a"/>    
输出：  
  Test text, and the params: a, b, 23  
  Test text, and the params: a, b, -1  
  Test text, and the params: a, Bar, 23  
  Test text, and the params: a, Bar, -1  
实例：  
<#macro img src extra...>  
  <img src="/context${src?html}"   
  <#list extra?keys as attr>  
    ${attr}="${extra[attr]?html}"  
  </#list>  
  >  
</#macro>  
<@img src="/images/test.png" width=100 height=50 alt="Test"/>   
输出：  
  <img src="/context/images/test.png"  
    alt="Test"  
    height="50"  
    width="100"  
  >    
实例：  
<#macro do_thrice>  
  <#nested 1>  
  <#nested 2>  
  <#nested 3>  
</#macro>  
<@do_thrice ; x>  
  ${x} Anything.  
</@do_thrice>    
输出：  
  1 Anything.  
  2 Anything.  
  3 Anything.  
实例：  
<#macro test>  
  Test text  
  <#return>  
  Will not be printed.  
</#macro>  
<@test/>    
输出：  
Test text  
  
function, return  
语法：  
<#function name param1 param2 ... paramN>  
  ...  
  <#return returnValue>  
  ...  
</#function>  
备注：该指令创建了一个方法变量，该指令和macro指令类似，只是return 中必须有返回值。  
实例：  
<#function avg x y>  
  <#return (x + y) / 2>  
</#function>  
${avg(10, 20)}    
输出：  
15  
实例：  
<#function avg nums...>  
  <#local sum = 0>  
  <#list nums as num>  
    <#local sumsum = sum + num>  
  </#list>  
  <#if nums?size != 0>  
    <#return sum / nums?size>  
  </#if>  
</#function>  
${avg(10, 20)}  
${avg(10, 20, 30, 40)}  
${avg()!"N/A"}    
输出:  
15  
25  
N/A  
  
flush  
语法：  
<#flush>  
备注：强制输出。虽然FreeMarker会自动的flush 但有些时候要强制flash 的时候可以使用该指令。  
  
stop  
语法：  
<#stop>  
or  
<#stop reason>  
备注：当FreeMarker要强制终止的时候，可以使用该指令，reason 为自定义终止的原因。  
  
ftl  
语法：  
<#ftl param1=value1 param2=value2 ... paramN=valueN>  
备注：该指令是提供一些参数如果该文件是ftl文件，如果该文件存在则该设置在文件的最开始的地方。  
设置的参数有：  
encoding：模板的编码，取值为：utf-8、GBK等  
strip_whitespace:是否去掉空格。取值为true、false  
strip_text:是否去掉最高层的文本，取值为true、false  
strict_syntax:是否为严格的语法，取值为true、false  
ns_prefixes:  
attributes:  
  
t, lt, rt  
语法  
<#t>  -在该行中忽略所有的空格  
<#lt> -在该行中忽略左边的所有空格  
<#rt> -在该行中忽略右边的所有空格  
<#nt> -不去掉该行的空格  
  
实例：  
--  
  1 <#t>  
  2<#t>  
  3<#lt>  
  4  
  5<#rt>  
  6  
--    
输出：  
--  
1 23  
  4  
  5  6  
--    
  
attempt, recover  
语法：  
<#attempt>  
  attempt block  
<#recover>  
  recover block  
</#attempt>  
备注：该指令是一个错误的捕获，和java 中的 try{}catch 相似。<#recover>是修复指令，代替出错的输出文本。  
实例：  
Primary content  
<#attempt>  
  Optional content: ${thisMayFails}  
<#recover>  
  Ops! The optional content is not available.  
</#attempt>  
Primary content continued    
输出：  
如果thisMayFails 变量不存在  
Primary content  
  Ops! The optional content is not available.  
Primary content continued   
如果thisMayFails 变量存在  
Primary content  
  Optional content: 123  
Primary content continued  
  
visit, recurse, fallback  
语法：  
<#visit node using namespace>  
or  
<#visit node>  
<#recurse node using namespace>  
or  
<#recurse node>  
or  
<#recurse using namespace>  
or  
<#recurse>  
<#fallback>  
备注：visit 和recurse 指令是用来递归处理树节点的。在实际中，很多情况下是用来处理xml。  
实例：  
<#-- Assume that nodeWithNameX?node_name is "x" -->  
<#visit nodeWithNameX>  
Done.  
<#macro x>  
   Now I'm handling a node that has the name "x".  
   Just to show how to access this node: this node has ${.node?children?size} children.  
</#macro>    
输出：  
Now I'm handling a node that has the name "x".  
   Just to show how to access this node: this node has 3 children.  
Done.    
实例：  
主体  
<#import "n1.ftl" as n1>  
<#import "n2.ftl" as n2>  
  
<#-- This will call n2.x (because there is no n1.x): -->  
<#visit nodeWithNameX using [n1, n2]>  
  
<#-- This will call the x of the current namespace: -->  
<#visit nodeWithNameX>  
  
<#macro x>  
  Simply x  
</#macro>  
    
n1.ftl  
<#macro y>  
  n1.y  
</#macro>  
  
 n2.ftl:    
 <#macro x>  
  n2.x  
  <#-- This will call n1.y, becuase it inherits the "using [n1, n2]" from the pending visit call: -->  
  <#visit nodeWithNameY>  
  <#-- This will call n2.y: -->  
  <#visit nodeWithNameY using .namespace>  
</#macro>  
  
<#macro y>  
  n2.y  
</#macro>     
 输出：  
 n2.x  
  n1.y  
  n2.y  
  
  Simply x  

*Freemarker的内置函数及用法*
一、  Sequence的内置函数

1. sequence?first 返回sequence的第一个值。
2. sequence?last  返回sequence的最后一个值。
3. sequence?reverse 将sequence的现有顺序反转，即倒序排序
4. sequence?size    返回sequence的大小
5. sequence?sort    将sequence中的对象转化为字符串后顺序排序
6. sequence?sort_by(value) 按sequence中对象的属性value进行排序
注意：Sequence不能为null。以上方法在我的另一篇博客Freemarker中如何遍历List有详细的应用，感兴趣的朋友可以参考。

二、 Hash的内置函数

1.  hash?keys 返回hash里的所有key,返回结果为sequence
2.  hash?values 返回hash里的所有value,返回结果为sequence
例如：
<#assign user={“name”:“hailang”, “sex”:“man”}>
<#assign keys=user?keys>
<#list keys as key>
  ${key}=${user[key]}
</#list>

三、 操作字符串函数

1.  substring（start,end）从一个字符串中截取子串
start:截取子串开始的索引，start必须大于等于0，小于等于end
end: 截取子串的长度，end必须大于等于0，小于等于字符串长度，如果省略该参数，默认为字符串长度。
例子：
${‘str’?substring(0)}à结果为str
${‘str’?substring(1)}à结果为tr
${‘str’?substring(2)}à结果为r
${‘str’?substring(3)}à结果为
${‘str’?substring(0,0)}à结果为
${‘str’?substring(0,1)}à结果为s
${‘str’?substring(0,2)}à结果为st
${‘str’?substring(0,3)}à结果为str

2. cap_first 将字符串中的第一个单词的首字母变为大写。
${‘str’？cap_first}à结果为Str

3. uncap_first将字符串中的第一个单词的首字母变为小写。
${‘Str’？cap_first}à结果为str

4. capitalize将字符串中的所有单词的首字母变为大写
${‘str’？ capitalize}à结果为STR

5. date,time，datetime将字符串转换为日期
例如：
<#assign date1=”2009-10-12”?date(“yyyy-MM-dd”)>
<#assign date2=”9:28:20”?time(“HH:mm:ss”)>
<#assign date3=” 2009-10-12 9:28:20”?time(“HH:mm:ss”)>
${date1}à结果为2009-10-12
${date2}à结果为9:28:20
${date3}à结果为2009-10-12 9:28:20
时间格式化： ${book.date?string('yyyy-MM-dd')}
判断长度：<#if oa.content?length gt= 20>
注意：如果指定的字符串格式不正确将引发错误。

6. ends_with 判断某个字符串是否由某个子串结尾，返回布尔值。
${“string”?ends_with(“ing”)?string} 返回结果为true
注意：布尔值必须转换为字符串才能输出

7. html 用于将字符串中的<、>、&和“替换为对应得&lt;&gt;&quot:&amp

8.index_of（substring,start）在字符串中查找某个子串，返回找到子串的第一个字符的索引，如果没有找到子串，则返回-1。
Start参数用于指定从字符串的那个索引处开始搜索，start为数字值。
如果start大于字符串长度，则start取值等于字符串长度，如果start小于0， 则start取值为0。
${“string”?index_of(“in”) à结果为3
${“string”?index_of(“ab”) à结果为-1

9. length返回字符串的长度 ${“string”?length}à结果为6

10. lower_case将字符串转为小写
${“STRING”?lower_case}à结果为string

11.upper_case将字符串转为大写
${“string”?upper_case}à结果为STRING

12.contains 判断字符中是否包含某个子串。返回布尔值
${“string”?contains(“ing”)?string} à结果为true
注意：布尔值必须转换为字符串才能输出

13.number将字符串转换为数字
${“111.11”?number}à结果为111.11

14.replace用于将字符串中的一部分从左到右替换为另外的字符串。
${“strabg”?replace(“ab”,”in”)} à结果为string

15.split使用指定的分隔符将一个字符串拆分为一组字符串
<#list “This|is|split”?split(“|”) as s>
    ${s}
</#list>
结果为:
This
is
split

16. trim 删除字符串首尾空格 ${“  String ”?trim} à结果为String

四、 操作数字

1.c 用于将数字转换为字符串
${123?c} à结果为123

2.string用于将数字转换为字符串
Freemarker中预订义了三种数字格式：number,currency（货币）和percent(百分比)其中number为默认的数字格式转换
例如： 
<#assign tempNum=20>
${tempNum}    
${tempNum?string.number}或${tempNum?string(“number”)} à结果为20
${tempNum?string.currency}或${tempNum?string(“currency”)} à结果为￥20.00
${tempNum?string. percent}或${tempNum?string(“percent”)} à结果为2,000%

五、操作布尔值
string 用于将布尔值转换为字符串输出
true转为“true”，false转换为“false”
foo?string(“yes”,”no”)如果布尔值是true,那么返回“yes”,否则返回no
```