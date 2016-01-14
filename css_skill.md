### css总结.适合初学者 ###
```
1 让li 里面的内容 各左右对齐 虽然<span>放在后面也可以,但是设计页面的文字 不是一个水平线上的.
  <style rel="stylesheet" type="text/css">
	#notice{height:149px; width:350px}
	#notice li span{float:right;}
  </style>
  <ul id="notice">
	<li><span>05-09</span>测试版发布…</li>
        <li><span>04-02</span>注意：对如何使用软件及…</li>
</ul>

2 做出只要3个边框的div ,最简单的方法. 先读border 属性,然后再读border-bottom属性 ,就会把上个属性相对应的 值覆盖.省去一个一个的写上下左右边框样式了.
border:1px solid red; border-bottom:0px;

3. ul 里面的li 横向居中对齐 主要是text-align:center  和display:inline ,如果用float:left,就实现不了
#div{width: 1000px; height:70px;text-align:center;}
#div ul{list-style:none;}
#div ul li{display:inline}


　　当Content内容多时，即使main设置了高度100%或auto。在不同浏览器下还是不能完好的自动伸展。内容的高度比较高了，但容器main的高度还是不能撑开。
增加一个清除浮动，让父容器知道高度。增加一个BR并设置样式为clear:both。
<div id="main"> 
<div id="content"></div> 
<br style="clear:both;" />
</div>


1.样式命名
外　套：　　wrap
主导航：　　mainnav
子导航：　　subnav
页　脚：　　footer
整个页面：　content
页　眉：　　header
页　脚：　　footer
商　标：　　label
标　题：　　title
主导航：　　mainbav（globalnav）
顶导航：　　topnav
边导航：　　sidebar
左导航：　　leftsidebar
右导航：　　rightsidebar
旗　志：　　logo
标　语：　　banner
菜单内容1： menu1 content
菜单容量：　menu container
子菜单：　　submenu
边导航图标：sidebarIcon
注释：　　　note
面包屑：　　breadcrumb(即页面所处位置导航提示）
容器：　　　container
内容：　　　content
搜索：　　　search
登陆：　　　Login
功能区：　　shop(如购物车，收银台)
当前的　　　current

2.另外在编辑样式表时可用的注释可这样写：
<-- Footer -->
内容区
<-- End Footer -->

3.样式文件命名
主要的 master.css
布局，版面 layout.css
专栏 columns.css
文字 font.css
打印样式 print.css
主题 themes.css 



　　常用CSS缩写语法总结

　　使用缩写可以帮助减少你CSS文件的大小，更加容易阅读。css缩写的主要规则如下：

　　颜色

　　16进制的色彩值，如果每两位的值相同，可以缩写一半，例如：

　　#000000可以缩写为#000;#336699可以缩写为#369;

　　盒尺寸

　　通常有下面四种书写方法:

　　property:value1; 表示所有边都是一个值value1; 
　　property:value1 value2; 表示top和bottom的值是value1,right和left的值是value2 
　　property:value1 value2 value3; 表示top的值是value1，right和left的值是value2，bottom的值是value3 
　　property:value1 value2 value3 value4; 四个值依次表示top,right,bottom,left
　　方便的记忆方法是顺时针，上右下左。具体应用在margin和padding的例子如下：

　　margin:1em 0 2em 0.5em;

　　边框(border)

　　边框的属性如下：

　　border-width:1px; 
　　border-style:solid; 
　　border-color:#000;
　　可以缩写为一句：border:1px solid #000;

　　语法是border:width style color;

　　背景(Backgrounds)

　　背景的属性如下：

　　background-color:#f00; 
　　background-image:url(background.gif); 
　　background-repeat:no-repeat; 
　　background-attachment:fixed; 
　　background-position:0 0;
　　可以缩写为一句：background:#f00 url(background.gif) no-repeat fixed 0 0;

　　语法是background:color image repeat attachment position;

　　你可以省略其中一个或多个属性值，如果省略，该属性值将用浏览器默认值，默认值为：

　　color: transparent 
　　image: none 
　　repeat: repeat 
　　attachment: scroll 
　　position: 0% 0%
　　字体(fonts)

　　字体的属性如下：

　　font-style:italic; 
　　font-variant:small-caps; 
　　font-weight:bold; 
　　font-size:1em; 
　　line-height:140%; 
　　font-family:"Lucida Grande",sans-serif;
　　可以缩写为一句：font:italic small-caps bold 1em/140% "Lucida Grande",sans-serif;

　　注意，如果你缩写字体定义，至少要定义font-size和font-family两个值。

　　列表(lists)

　　取消默认的圆点和序号可以这样写list-style:none;,

　　list的属性如下:

　　list-style-type:square; 
　　list-style-position:inside; 
　　list-style-image:url(image.gif);
　　可以缩写为一句：list-style:square inside url(image.gif);

　　1. css 字体简写规则

　　当使用css定义字体时你可能会这样做：


　　font-size: 1em; 
　　line-height: 1.5em; 
　　font-weight: bold; 
　　font-style: italic; 
　　font-variant: small-caps; 
　　font-family: verdana,serif;

　　事实上你可以简写这些属性：

　　font: 1em/1.5em bold italic small-caps verdana,serif

　　现在好多了吧，不过有一点要注意：使用这一简写方式你至少要指定 font-size 和 font-family 属性，其他的属性(如 font-weight，font-style，font-varient)如未指定将自动使用默认值。

　　2. 同时使用两个class

　　通常我们只为属性指定一个class，但这并不等于你只能指定一个，实际上，你想指定多少就可以指定多少，例如：


<p class="text side">...</p>

　　通过同时使用两个 class(使用空格而不是逗号分割)，这个段落将同时应用两个 class 中制定的规则。如果两者中有任何规则重叠，那么后一个将获得实际的优先应用。

　　3. css中边框(border)的默认值

　　当编写一条边框的规则时，你通常会指定颜色、宽度以及样式(任何顺序均可)。例如：border: 3px solid #000(3像素宽的黑色实线边框)，其实这个例子中唯一需要指定的值只是样式。假如你指定样式为实线(solid)，那么其余的值将使用默认值：默认的宽度为中等(相当于3到4像素);默认的颜色为边框里的文字颜色。如果这正是你想要的效果，你完全可以不在css里指定。

　　4. !important会被IE忽略

　　在 css 中，通常最后指定的规则会获得优先权。然而对除了IE以外的浏览器来说，任何后面标有 !important 的语句将获得绝对的优先权，例如：margin-top: 3.5em !important; margin-top: 2em。

　　除IE以外所有浏览器中的顶部边界都是3.5em，而IE为2em，有时候这一点很有用，尤其在使用相对边界值时(就像这个例子)，可以显示出IE与其他浏览器的细微差别。(很多人可能还注意到了css的子选择器也是会被IE忽略的)

　　5. 图片替换的技巧

　　使用标准的html而不是图片来显示文字通常更为明智，除了加快下载还可以获得更好的可用性。但是如果你决心使用访问者的机器中可能没有的字体时，你只能选择图片。

　　举例来说，你想在每一页的顶部使用“Buy widgets”的标题，但你同时又希望这是能被搜索引擎发现的，为了美观你使用了少见的字体那么你就得用图片来显示了：


<h1><img src="widget-image.gif" alt="Buy widgets" /></h1>

　　这样当然没错，但是有证据显示搜索引擎对真实文本的重视远超过alt文本(因为已经有太多网站使用alt文本充当关键字)，因此，我们得用另一种方法：<h1><span>Buy widgets</span></h1> 那你的漂亮字体怎么办呢?下面的css可以帮上忙： 



　　h1 { 
　　background: url(widget-image.gif) no-repeat; 
　　} 
　　h1 span { 
　　position: absolute; 
　　left:-2000px; 
　　}

　　现在你既用上了漂亮的图片又很好的隐藏了真实文本——借助css，文本被定位于屏幕左侧-2000像素处。

　　6. css盒模型hack的另一选择

　　css盒模型hack被用来解决IE6之前的浏览器显示问题，IE6.0之前的版本会把某元素的边框值和填充值包含在宽度之内(而不是加在宽度值上)。例如，你可能会使用以下css来指定某个容器的尺寸：


　　#box { 
　　width: 100px; 
　　border: 5px; 
　　padding: 20px; 
　　}

　　然后在html中应用：<div id="box">...</div>，盒的总宽度在几乎所有浏览器中为150像素(100像素宽度+两条5像素的边框+两个20像素的填充)，唯独在IE6之前版本的浏览器中仍然为100像素(边框值和填充值包含在宽度值中)，盒模型的hack正是为了解决这一问题，但是也会带来麻烦。更简单的办法如下： 


　　css:


　　#box { 
　　width: 150px; 
　　} 
　　#box div { 
　　border: 5px; 
　　padding: 20px; 
　　}

　　html:


<div id="box"><div>...</div></div>

　　这样一来在任何浏览器中盒的总宽度都将是150像素。

　　7. 将块元素居中

　　假设你的网站使用了固定宽度的布局，所有的内容置于屏幕中央，可以使用以下的css：


　　#content { 
　　width: 700px; 
　　margin: 0 auto; 
　　}

　　你可以把html的body之内任何项目置于 

中，该项目将自动获得相等的左右边界值从而保证了居中显示。不过，这在IE6之前版本的浏览器中仍然有问题，将不会居中，因此必须修改如下： 



　　body { 
　　text-align: center; 
　　} 
　　#content { 
　　text-align: left; 
　　width: 700px; 
　　margin: 0 auto; 
　　}

　　对body的设定将导致主体内容居中，但是连所有的文字也居中了，这恐怕不是你想要的效果，为此#content 的div还要指定一个值：text-align: left。

　　8. 使用css实现垂直居中

　　垂直居中对表格来说是小菜一碟，只需指定单元格为 vertical-align: middle 即可，但这在css布局中不管用。假设你将一个导航菜单的高度设为2em，然后在css中指定垂直对齐的规则，文字还是会被排到盒的顶部，根本没有什么区别。

　　要解决这一问题，只需将盒的行高设为与盒的高度相同即可，以这个例子来说，盒高2em，那么只需在css中再加入一条：line-height: 2em 就可实现垂直居中了!

　　9. 容器内的css定位

　　css的最大优点之一就是可以将对象定位在文档的任何位置，同样的也可以将对象在某容器内进行定位。只需要为该容器添加一条css规则：


　　#container { 
　　position: relative; 
　　}

　　则容器内的任何元素的定位都是相对于该容器的。假定你使用以下html结构：

　　<div id="container"><div id="navigation">...</div></div> 


　　如果想将navigation定位在容器内离左边界30像素，离顶部5像素，可以使用以下css语句：


　　#navigation { 
　　position: absolute; 
　　left: 30px; 
　　top: 5px; 
　　}

　　10. 延伸至屏幕底部的背景色

　　css的缺点之一是缺乏垂直方向的控制，从而导致了一个表格布局不会遇到的问题。假设你在页面的左侧设定了一列用于放置网站的导航。页面为白色背景，但你希望导航所在的列为蓝色背景，使用以下css即可：


　　#navigation { 
　　background: blue; 
　　width: 150px; 
　　}

　　问题在于导航项不会一直延伸到页面的底部，自然它的背景色也不会延伸到底部。于是左列的蓝色背景在页面上被半路截断，浪费了你的一番设计。怎么办呢?很不幸我们现在只能用欺骗的办法，即将body的背景指定为与左列同颜色同宽度的图片，css如下：


　　body { 
　　background: url(blue-image.gif) 0 0 repeat-y; 
　　}

　　背景图应为宽150像素的蓝色图片。这一办法的缺点是没法使用em来指定左列的宽度，当用户改变文字的大小导致内容的宽度扩张时，背景色的宽度不会随之改变。到写这篇文章为止这是对这类问题的唯一解决办法，因此你只能为左列使用像素值来获得能够自动延伸的不同的背景色。




1、初步认识css:

<style type="text/css">
<!--
h1 {color:#FF0000 }
p {color: #6600FF; font-size: 12px; line-height: 20px}
-->
</style>

1、	Style是xhtml的一个标记  <!--  -->防止对方浏览器如果不支持css而把css做为文字显示
2、	H1 是一级标题    { }  里是css的属性


2、语法：
 选择符  {属性1：值1;  属性2：值2; ………………}

第1种选择符:  html标签    例如： h1 {color:#FF0000 }
第2种选择符:  . 类         例如： .orange {color: } 
注：类名以英文字母开头，后继字符可以是英文字母，数字，下划线
第3种选择符:  #id名        例如：#green {color: #00FF00} 
注：id名以英文字母开头，后继字符可以是英文字母，数字，下划线
第4种选择符:  标签：伪类      例如： 
     a :link {color:#6600FF;font-size: 28px;text-decoration: none}
a:visited {color:#6600FF;font-size: 28px;text-decoration: none}
a:hover {color:#FF0000;font-size: 28px;text-decoration: underline}
a:active {color:#FF00FF;font-size: 28px;text-decoration: underline}

第5种选择符:  标签. 类：伪类      例如： 
 a.sina:link {color:#66CC00;font-size: 28px;text-decoration: none}
a.sina:visited {color:#66CC00;font-size: 28px;text-decoration: none}
a.sina:hover {color:#FF0000;font-size: 28px;text-decoration: underline}
a.sina:active {color:#FF00FF;font-size: 28px;text-decoration: underline}

第6种选择符:  选择符  选择符 …..         例如：
P  b  i {color: #FF0000} 
#d1  a {color: #330000;font-size: 12px}
#d1  a: hover {color: #FFCC00}

.dd2  a {color: #330000;font-size: 12px}



第7种选择符:  选择符 , 选择符 , 选择符…..         例如：

h1, h2, h3, h4, h5, h6 {color : red}

第8种选择符:  父对象 > 子对象    [ ie7 ,fireFox有效 ]        例如：

body > div {	text-align: center ;	margin-right: auto ;	margin-left: auto ; }

第9种选择符:   *         例如：

*  {color: #FF0000}

第10种选择符:    属性选择符         例如：


Css的继承： 子元素沿用了父元素的css属性 ,叫做继承
Css的覆盖： 子元素和父元素定义形同的css属性 ,这时子元素的这些css属性会优先生效,叫做覆盖

Css的优先级别 ( 共4级)

1. html 标签                    …………………………     优先级为 1

2. 类 , 伪类                   ..…………………………    优先级为 10

3．Id                         …………………………    优先级为 100

4．Inline                       …………………………   优先级为 1000
 
 Css 嵌入网页的4中方法：

   1、嵌入head中
    <head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>网页标题</title>
<style type="text/css">
<!--
h1[align] {color: #FF0000}
-->
</style>
</head>

   2、用link 连接
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>网页标题</title>
<link rel="stylesheet" href="style.css" type="text/css" />
</head>
</head>

3、用import 导入
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>网页标题</title>
<style type="text/css">
<!--
@import url("style.css") ;
-->
</style>
</head>

4、用style 植入标记内
   <h1 style="color : #FF0000 ; font-size : 14px">

```