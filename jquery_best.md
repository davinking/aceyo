## JQuery最佳实践 ##
```
1. 使用最新版本的jQuery
jQuery的版本更新很快，你应该总是使用最新的版本。因为新版本会改进性能，还有很多新功能。
下面就来看看，不同版本的jQuery性能差异有多大。这里是三条最常见的jQuery选择语句：
　　$('.elem')
　　$('.elem', context)
　　context.find('.elem')
可以看到，1.6.2版本的运行次数，远远超过两个老版本。尤其是第一条语句，性能有数倍的提高。
其他语句的测试，比如.attr("value")和.val()，也是新版本的jQuery表现好于老版本。
2. 用对选择器
在jQuery中，你可以用多种选择器，选择同一个网页元素。每种选择器的性能是不一样的，你应该了解它们的性能差异。
（1）最快的选择器：id选择器和元素标签选择器
举例来说，下面的语句性能最佳：
　　$('#id')
　　$('form')
　　$('input')
遇到这些选择器的时候，jQuery内部会自动调用浏览器的原生方法（比如getElementById()），所以它们的执行速度快。
（2）较慢的选择器：class选择器
$('.className')的性能，取决于不同的浏览器。
Firefox、Safari、Chrome、Opera浏览器，都有原生方法getElementByClassName()，所以速度并不慢。但是，IE5-IE8都没有部署这个方法，所以这个选择器在IE中会相当慢。
（3）最慢的选择器：伪类选择器和属性选择器
先来看例子。找出网页中所有的隐藏元素，就要用到伪类选择器：
　　$(':hidden')
属性选择器的例子则是：
　　$('[attribute=value]')
这两种语句是最慢的，因为浏览器没有针对它们的原生方法。但是，一些浏览器的新版本，增加了querySelector()和querySelectorAll()方法，因此会使这类选择器的性能有大幅提高。
最后是不同选择器的性能比较图。

可以看到，ID选择器遥遥领先，然后是标签选择器，第三是Class选择器，其他选择器都非常慢。
3. 理解子元素和父元素的关系
下面六个选择器，都是从父元素中选择子元素。你知道哪个速度最快，哪个速度最慢吗？
　　$('.child', $parent)
　　$parent.find('.child')
　　$parent.children('.child')
　　$('#parent > .child')
　　$('#parent .child')
　　$('.child', $('#parent'))
我们一句句来看。
(1) $('.child', $parent)
这条语句的意思是，给定一个DOM对象，然后从中选择一个子元素。jQuery会自动把这条语句转成$.parent.find('child')，这会导致一定的性能损失。它比最快的形式慢了5%-10%。
(2) $parent.find('.child')
这条是最快的语句。.find()方法会调用浏览器的原生方法（getElementById，getElementByName，getElementByTagName等等），所以速度较快。
(3) $parent.children('.child')
这条语句在jQuery内部，会使用$.sibling()和javascript的nextSibling()方法，一个个遍历节点。它比最快的形式大约慢50%。
(4) $('#parent > .child')
jQuery内部使用Sizzle引擎，处理各种选择器。Sizzle引擎的选择顺序是从右到左，所以这条语句是先选.child，然后再一个个过滤出父元素#parent，这导致它比最快的形式大约慢70%。
(5) $('#parent .child')
这条语句与上一条是同样的情况。但是，上一条只选择直接的子元素，这一条可以于选择多级子元素，所以它的速度更慢，大概比最快的形式慢了77%。
(6) $('.child', $('#parent'))
jQuery内部会将这条语句转成$('#parent').find('.child')，比最快的形式慢了23%。
所以，最佳选择是$parent.find('.child')。而且，由于$parent往往在前面的操作已经生成，jQuery会进行缓存，所以进一步加快了执行速度。
具体的例子和比较结果，请看这里。[http://jsperf.com/jquery-selectors-context/2]
4. 不要过度使用jQuery
jQuery速度再快，也无法与原生的javascript方法相比。所以有原生方法可以使用的场合，尽量避免使用jQuery。
请看下面的例子，为a元素绑定一个处理点击事件的函数：
　　$('a').click(function(){
　　　　alert($(this).attr('id'));
　　});
这段代码的意思是，点击a元素后，弹出该元素的id属性。为了获取这个属性，必须连续两次调用jQuery，第一次是$(this)，第二次是attr('id')。
事实上，这种处理完全不必要。更正确的写法是，直接采用javascript原生方法，调用this.id：
　　$('a').click(function(){
　　　　alert(this.id);
　　});
根据测试，this.id的速度比$(this).attr('id')快了20多倍。
5. 做好缓存
选中某一个网页元素，是开销很大的步骤。所以，使用选择器的次数应该越少越好，并且尽可能缓存选中的结果，便于以后反复使用。
比如，下面这样的写法就是糟糕的写法：
　　jQuery('#top').find('p.classA');
　　jQuery('#top').find('p.classB');
更好的写法是：
　　var cached = jQuery('#top');
　　cached.find('p.classA');
　　cached.find('p.classB');
根据测试，缓存比不缓存，快了2-3倍。
6. 使用链式写法
jQuery的一大特点，就是允许使用链式写法。
　　$('div').find('h3').eq(2).html('Hello');
采用链式写法时，jQuery自动缓存每一步的结果，因此比非链式写法要快。根据测试，链式写法比（不使用缓存的）非链式写法，大约快了25%。
7. 事件的委托处理（Event Delegation）
javascript的事件模型，采用"冒泡"模式，也就是说，子元素的事件会逐级向上"冒泡"，成为父元素的事件。
利用这一点，可以大大简化事件的绑定。比如，有一个表格（table元素），里面有100个格子（td元素），现在要求在每个格子上面绑定一个点击事件（click），请问是否需要将下面的命令执行100次？
　　$("td").bind("click", function(){
　　　　$(this).toggleClass("click");
　　});
回答是不需要，我们只要把这个事件绑定在table元素上面就可以了，因为td元素发生点击事件之后，这个事件会"冒泡"到父元素table上面，从而被监听到。
因此，这个事件只需要在父元素绑定1次即可，而不需要在子元素上绑定100次，从而大大提高性能。这就叫事件的"委托处理"，也就是子元素"委托"父元素处理这个事件。
具体的写法有两种。第一种是采用.delegate()方法：
　　$("table").delegate("td", "click", function(){
　　　　$(this).toggleClass("click");
　　});
第二种是采用.live()方法：(此方法已测试,内存占用啥的效率一样差.)
　　$("table").each(function(){
　　　　$("td", this).live("click", function(){
　　　　　　$(this).toggleClass("click");
　　　　});
　　});
第三种,以下方法是测试后的高效方法.
$('table').click(function(e){
		var cell = $(e.target); 
		alert(cell.html());
	});
这两种写法基本等价。唯一的区别在于，.delegate()是当事件冒泡到指定的父元素时触发，.live()则是当事件冒泡到文档的根元素后触发，因此.delegate()比.live()稍快一点。此外，这两种方法相比传统的.bind()方法还有一个好处，那就是对动态插入的元素也有效，.bind()只对已经存在的DOM元素有效，对动态插入的元素无效。
根据测试，委托处理比不委托处理，快了几十倍。在委托处理的情况下，.delegate()又比.live()大约快26%。[http://jsperf.com/bind-vs-click/12]
8. 少改动DOM结构
（1）改动DOM结构开销很大，因此不要频繁使用.append()、.insertBefore()和.insetAfter()这样的方法。
如果要插入多个元素，就先把它们合并，然后再一次性插入。根据测试，合并插入比不合并插入，快了将近10倍。
（2）如果你要对一个DOM元素进行大量处理，应该先用.detach()方法，把这个元素从DOM中取出来，处理完毕以后，再重新插回文档。根据测试，使用.detach()方法比不使用时，快了60%。
（3）如果你要在DOM元素上储存数据，不要写成下面这样：
　　var elem = $('#elem');
　　elem.data(key,value);
而要写成
　　var elem = $('#elem');
　　$.data(elem,key,value);
根据测试，后一种写法要比前一种写法，快了将近10倍。因为elem.data()方法是定义在jQuery函数的prototype对象上面的，而$.data()方法是定义jQuery函数上面的，调用的时候不从复杂的jQuery对象上调用，所以速度快得多。（此处可以参阅下面第10点。）
9. 正确处理循环
循环总是一种比较耗时的操作，如果可以使用复杂的选择器直接选中元素，就不要使用循环，去一个个辨认元素。
javascript原生循环方法for和while，要比jQuery的.each()方法快，应该优先使用原生方法。
10. 尽量少生成jQuery对象
每当你使用一次选择器（比如$('#id')），就会生成一个jQuery对象。jQuery对象是一个很庞大的对象，带有很多属性和方法，会占用不少资源。所以，尽量少生成jQuery对象。
举例来说，许多jQuery方法都有两个版本，一个是供jQuery对象使用的版本，另一个是供jQuery函数使用的版本。下面两个例子，都是取出一个元素的文本，使用的都是text()方法。你既可以使用针对jQuery对象的版本：
　　var $text = $("#text");
　　var $ts = $text.text();
也可以使用针对jQuery函数的版本：
　　var $text = $("#text");
　　var $ts = $.text($text);
由于后一种针对jQuery函数的版本不通过jQuery对象操作，所以相对开销较小，速度比较快。
```
## jQuery性能优化指南 ##
```
1.总是从ID选择器开始继承
JQuery中最快的筛选器是ID筛选器($('#someid'))。这是因为它直接和JavaScript的getElementById()方法对应。

<div id="content">  
    <form method="post" action="/">  
        <h2>Traffic Light</h2>  
        <ul id="traffic_light">  
            <li><input type="radio" class="on" name="light" value="red" /> Red</li>  
            <li><input type="radio" class="off" name="light" value="yellow" /> Yellow</li>  
            <li><input type="radio" class="off" name="light" value="green" /> Green</li>  
        </ul>  
        <input class="button" id="traffic_button" type="submit" value="Go" />  
    </form>  
</div>  
 选择单个元素：

像这样选择按钮是低效的:

var traffic_button = $('#content .button');  
 用ID直接选择按钮效率更高:

var traffic_button = $('#traffic_button');   
 选择多个元素

提到多元素选择其实是在说DOM遍历和循环, 这些都是比较慢的东西.为了提高性能, 最好从就近的ID开始继承.

var traffic_lights = $('#traffic_light input');  
2. 在class前使用tag
第二快的选择器是tag选择器($('head')). 因为它和JavaScript的getElementsByTagName() 方法对应.

<div id="content">  
    <form method="post" action="/">  
        <h2>Traffic Light</h2>  
        <ul id="traffic_light">  
            <li><input type="radio" class="on" name="light" value="red" /> Red</li>  
            <li><input type="radio" class="off" name="light" value="yellow" /> Yellow</li>  
            <li><input type="radio" class="off" name="light" value="green" /> Green</li>  
        </ul>  
        <input class="button" id="traffic_button" type="submit" value="Go" />  
    </form>  
</div>  
总是用一个tag name来限制(修饰)class (并且不要忘记就近的ID):

var active_light = $('#traffic_light input.on');  
注意: 在jquery中Class是最慢的选择器. IE浏览器下它会遍历所有DOM节点不管它用在那里.

不要用tag name来修饰ID. 下面的例子将会遍历所有的div元素来查找id为'content'的哪一个节点:

var content = $('div#content');  
用ID修饰ID也是画蛇添足:

var traffic_light = $('#content #traffic_light');  
3. 给选择器指定前后文
jQuery的参考文档里说：

    传递给jQuery() 原始DOM节点的前后文（如果没有东西被传递，则前后文为整个文档）。

    目的是连同选择器一起，实现更为准确的查询。

所以，如果你一定要利用class来指定目标，至少为选择器指定上下文，以免jQuery费精力去遍历整个DOM文档：

与其这样写：

$('.class').css ('color' '#123456');  
为选择器加上前后文比较好（expression: 目标选择器；context: 前后文）：$(expression, context)

也就是说：

$('.class', '#class-container').css ('color', '#123456');  
这样做要快得多，因为它不用遍历整个DOM。只要找到#class-container就好了。

4.缓存JQuery对象
要养成将jquery对象缓存进变量的习惯.

永远不要这样做: 

$('#traffic_light input.on).bind('click', function(){...}); 
$('#traffic_light input.on).css('border', '3px dashed yellow');  
$('#traffic_light input.on).css('background-color', 'orange'); 
$('#traffic_light input.on).fadeIn('slow');  
最好先将对象缓存进一个变量然后再操作:

var $active_light = $('#traffic_light input.on');  
$active_light.bind('click', function(){...});  
$active_light.css('border', '3px dashed yellow');  
$active_light.css('background-color', 'orange');  
$active_light.fadeIn('slow');  
为了记住我们本地变量是jquery的封装, 通常用一个$作为变量前缀. 记住:永远不要让相同的选择器在你的代码里出现多次.

缓存jquery结果,备用

如果你打算将jquery结果对象用在程序的其它部分,或者你的function会多次执行, 那么就将他们缓存到一个全局变量中.

定义一个全局容器来存放jquery结果, 我们就可以在其它函数引用它们: 

// 在全局范围定义一个对象 (例如: window对象)  
window.$my =  
{  
    // 初始化所有可能会不止一次要使用的查询  
    head : $('head'),  
    traffic_light : $('#traffic_light'),  
    traffic_button : $('#traffic_button')  
};   
function do_something()  
{  
    // 现在你可以引用存储的结果并操作它们  
    var script = document.createElement('script');  
    $my.head.append(script);  
  
    // 当你在函数内部操作是, 可以继续将查询存入全局对象中去.  
    $my.cool_results = $('#some_ul li');  
    $my.other_results = $('#some_table td');  
  
    // 将全局函数作为一个普通的jquery对象去使用.  
    $my.other_results.css('border-color', 'red');  
    $my.traffic_light.css('border-color', 'green');  
}  
5.用for替代each
原生函数总是比辅助组件更快。

如果遇到需要遍历对象的情况（如从远程接收的JSON对象），你最好重写你的（JSON）对象为一个数组，数组的循环处理要容易些。

利用Firebug，我们能测定每个函数的执行时间。

var array = new Array ();  
for (var i=0; i<10000; i++) {  
array[i] = 0;  
}  
console.time('native');  //原生for函数  
var l = array.length;  
for (var i=0;i<l; i++) {  
array[i] = i;  
}  
console.timeEnd('native');  
  
console.time('jquery');  //jQuery的each方法  
$.each (array, function (i) {  
array[i] = i;  
});  
console.timeEnd('jquery');  
结果显示原生代码只需2毫秒就做到的事，利用jQuery的each方法需要26毫秒。而且这还只是我在本机上测试一个基本上啥也没做的函数的结果，当遇到更复杂的情况，例如设置css属性或DOM操作时，时间差异肯定更大。

6. 掌握强大的链式操作
上面的例子也可以写成这样:

var $active_light = $('#traffic_light input.on');$active_light.bind('click', function(){...})  
    .css('border', '3px dashed yellow')  
    .css('background-color', 'orange')  
    .fadeIn('slow');  
这样可以写更少的代码, 让我们的js更轻量.  

7.使用子查询
jQuery 允许我们对一个已包装的对象使用附加的选择器操作. 因为我们已经在保存了一个父级对象在变量里, 这样大大提高对其子元素的操作: 

<div id="content">  
    <form method="post" action="/">  
        <h2>Traffic Light</h2>  
        <ul id="traffic_light">  
            <li><input type="radio" class="on" name="light" value="red" /> Red</li>  
            <li><input type="radio" class="off" name="light" value="yellow" /> Yellow</li>  
            <li><input type="radio" class="off" name="light" value="green" /> Green</li>  
        </ul>  
        <input class="button" id="traffic_button" type="submit" value="Go" />  
    </form>  
</div>  
例如, 我们可以用子查询的方法来抓取到亮或不亮的灯, 并缓存起来以备后续操作.

var $traffic_light = $('#traffic_light'),  
    $active_light = $traffic_light.find('input.on'),  
    $inactive_lights = $traffic_light.find('input.off');  
提示: 你可以用逗号分隔的方法一次声明多个局部变量–节省字节数 

8.对直接的DOM操作进行限制
这里的基本思想是在内存中建立你确实想要的东西，然后更新DOM 。这并不是一个jQuery最佳实践，但必须进行有效的JavaScript操作 。直接的DOM操作速度很慢。

例如,你想动态的创建一组列表元素, 千万不要这么做:  

var top_100_list = [...], // 假设这里是100个独一无二的字符串  
  
    $mylist = $('#mylist'); // jQuery 选择到 <ul> 元素  
  
for (var i=0, l=top_100_list.length; i<l; i++)  
{  
    $mylist.append('<li>' + top_100_list[i] + '</li>');  
}  
我们应该将整套元素字符串在插入进dom中之前全部创建好:  

var top_100_list = [...], // 假设这里是100个独一无二的字符串   
    $mylist = $('#mylist'), // jQuery 选择到 <ul> 元素   
    top_100_li = ""; // 这个变量将用来存储我们的列表元素   
for (var i=0, l=top_100_list.length; i<l; i++)  
{  
    top_100_li += '<li>' + top_100_list[i] + '</li>';  
}  
$mylist.html(top_100_li);  
我们在插入之前将多个元素包裹进一个单独的父级节点会更快:

var top_100_list = [...], // 假设这里是100个独一无二的字符串   
    $mylist = $('#mylist'), // jQuery 选择到 <ul> 元素   
    top_100_ul = '<ul id="#mylist">'; // 存储整个UL  
  
for (var i=0, l=top_100_list.length; i<l; i++)  
{  
    top_100_ul += '<li>' + top_100_list[i] + '</li>';  
}  
top_100_ul += '</ul>'; // UL结束  
  
$mylist.replaceWith(top_100_ul);  
如果你做了以上几条还是担心有性能问题,那么:

试试jquery的 clone() 方法, 它会创建一个节点树的副本, 它允许以”离线”的方式进行dom操作, 当你操作完成后再将其放回到节点树里. 
使用DOM DocumentFragments. 正如jQuery作者所言, 它的性能要明显优于直接的dom操作. 

9. 冒泡
除非在特殊情况下, 否则每一个js事件(例如:click, mouseover, 等.)都会冒泡到父级节点. 当我们需要给多个元素调用同个函数时这点会很有用.

代替这种效率很差的多元素事件监听的方法就是, 你只需向它们的父节点绑定一次, 并且可以计算出哪个节点触发了事件.

例如, 我们要为一个拥有很多输入框的表单绑定这样的行为: 当输入框被选中时为它添加一个class

像这样绑定事件是低效的:

$('#entryform input).bind('focus', function(){ 
    $(this).addClass('selected');  
}).bind('blur', function(){ 
    $(this).removeClass('selected');  
});  
我们需要在父级监听获取焦点和失去焦点的事件:

$('#entryform).bind('focus', function(e){ 
    var cell = $(e.target);  // e.target 保存事件的触发者 
    cell.addClass('selected');  
}).bind('blur', function(e){ 
    var cell = $(e.target); 
    cell.removeClass('selected');  
});  
父级元素扮演了一个调度员的角色, 它可以基于目标元素绑定事件. 如果你发现你给很多元素绑定了同一个事件监听, 那么你肯定哪里做错了.  

10.消除无效查询
尽管jquery可以很优雅的处理没有匹配元素的情况, 但它还是需要花费时间去寻找. 如果你整站只有一个全局js, 那么极有可能把所有的jquery函数塞进$(document)ready(function(){//所有你引以为傲的代码})里.只运行在页面里用到的函数. 大多数有效的方法就是使用行内初始化函数, 这样你的模板就能准确的控制何时何处该执行js.

例如, 你的”文章”页面模板, 你可能会引用如下的代码在body结束处:

<script type="text/javascript>  
mylib.article.init();  
</script>  
</body>  
如果你的页面模板包含一些多变的模块可能不会出现在页面中, 或者为了视觉呈现的原因你需要它们能够快速加载, 你可以将初始化函数紧跟在模块之后.

<ul id="traffic_light">  
    <li><input type="radio" class="on" name="light" value="red" /> Red</li>  
    <li><input type="radio" class="off" name="light" value="yellow" /> Yellow</li>  
    <li><input type="radio" class="off" name="light" value="green" /> Green</li>  
</ul>  
<script type="text/javascript>  
mylib.traffic_light.init();  
</script>  
你的全局js库可能会是这样子的:  

var mylib =  
{  
    article_page :  
    {  
        init : function()  
        {  
            // Article 特有的jQuery函数.  
        }  
    },  
    traffic_light :  
    {  
        init : function()  
        {  
            // Traffic light 特有的jQuery函数.  
        }  
    }  
}  
   

11. 推迟到 $(window).load
jquery对于开发者来说有一个很诱人的东西, 可以把任何东西挂到$(document).ready下冒充事件. 在大多数例子中你都会发现这样的情况.

尽管$(document).ready确实很有用, 它可以在页面渲染时,其它元素还没下载完成就执行. 如果你发现你的页面一直是载入中的状态, 很有可能就是$(document).ready函数引起的.

你可以通过将jquery函数绑定到$(window).load 事件的方法来减少页面载入时的cpu使用率. 它会在所有的html(包括<iframe>)被下载完成后执行.

$(window).load(function(){  
    // 页面完全载入后才初始化的jQuery函数.  
});  
多余的功能例如拖放, 视觉特效和动画, 预载入隐藏图像,等等. 都是适合这种技术的场合.

12. 避免使用concat()，利用join()处理长字串
听起来可能挺奇怪，不过这样做真的能提升速度，尤其是当连接特别长的字串时。

先建立一个数组，放入你想要串联的东西。join()方法比字符串的concat()函数要快得多。

var array = [];  
for (var i=0; i<=10000; i++) {  
array[i] = '<li>'+i+'</li>';  
}  
  
$('#list').html(array.join (''));  
近期一项由Tom Trenka发起的测试中，得出了下表的结果：

    “ += 操作符更快——比把字串片段放到数组中然后join起来还要快”，“作为字串缓冲（string buffer）的数组在大部分浏览器中都比string.prototype.concat.apply方法效率更高，Windows下的Firefox 2.0.0.14例外。”

    — Tom Trenka

13. 合并、最小化脚本
 大部分浏览器都不能同时处理多个脚本文件，所以它们都是排队加载——加载时间也相应地延长了。

考虑到你网站的每个页面都会加载这些脚本，你应该考虑把它们放到单个文件中，然后利用压缩工具（比如 Dean Edwards 的这款）把它们最小化。更小的文件无疑将带来更快的加载速度。

JavaScript和CSS压缩的目的是在保持脚本的执行性能的同时，减少数据传递的字节数（可以通过减小原始文件，也可以利用gzip。大多数产品级的网络服务器都把gzip作为HTTP协议的一部分）。

— 引自 YUI compressor，一款 jQuery官方推荐的压缩脚本的工具。

14. 全面掌握jquery库
知己知彼, 百战百胜.  只有更深入的了解jQuery才能更灵活的使用它.  这里提供一个jQuery的速查手册, 可以打印出来随身携带.  要是有能力将jQuery源码通读一遍那就更好了.

```