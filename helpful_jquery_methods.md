### 你已经玩jQuery一段时间了，你开始掌握使用它的窍门了，并且，你真的很喜欢它。那么你是否准备着把你的jQuery知识提高一个档次？现在，我将会展示二十个你可能从没见过的函数和特性。 ###
**分类：jQuery**难度：适中
```
1, after()/before()
　　有时候，你想往DOM中插入一些东西，但你却找不到好的方法去实现。append()或者prepend()不会有什么作用，并且你不想增加额外的容器和ID。那么，这两个函数可能正是你需要的。它们使你可以把新元素插入到DOM的另一个元素的前面或者后面；也就是说，新元素和旧元素是相邻的。
$('#child').after($('<p />')).text('This becomes a sibling of #child'));<br /> $('#child').before($('<p />')).text('Same here, but this is go about #child'));

　　如果你想把一个正在在处理的元素插入，也可以使用这两个函数：
$('<p>I\'ll be a sibling of #child</p>').insertAfter($('#child'));

2, change()
　　change()方法是一个事件处理器，就好像click()或者hover()那样。这个change事件是专为文本框（textarea）、文本输入（input）和选择组合框（select）而设的；当目标元素的值改变时即会触发。要注意的是，这个方法和focusOut()、blur()方法不同。当元素失去焦点时，focusOut()和blur()方法都会触发，无论元素的值是否已被改变。

　　change()方法在客户端的验证处理中相当好用，远比blur()好用。因为如果用户并没有改变表单的值的话，你是不想再次验证它的。
$('input[type=text]').change(function () { <br /> 　　switch (this.id) { <br /> 　　　　/* 表单验证代码 */ <br /> 　　} <br /> });

3, Context
　　在jQuery中，Context既是一个参数，又是一个属性。当查找元素时，你可以传递第二个参数到jQuery函数中，以约束所返回的匹配你的选择器的元素为context元素的子元素。这或许会有点混乱。那么看看这些例子吧：
<p class="hello">Hello World</p> <div id="wrap"> <p class="hello">Hello World</p> </div>

var hi1 = $('.hello'),<br /> hi2 = $('.hello', $('#wrap').get(0));<br /> console.group('hi1');<br /> console.log("Number of elements in collection:", hi1.length);<br /> console.log("Context of the collection:", hi1.context);<br /> console.groupEnd();<br /> console.group('hi2');<br /> console.log("Number of elements in collection:", hi2.length);<br /> console.log("Context of the collection:", hi2.context);<br /> console.groupEnd();

　　译者注：以下是在调试工具中的输出。

　　那么这个属性有什么妙用呢？比如在事件处理函数中就很有用。如果你在事件处理函数中引用一个子元素，那么你可以像这样来作为context来传值：
$('ul#options li').click(function () { $('a', this) . . . });

4, data() / removeData()
　　你有没有曾经打算把一些数据存储在一个元素中呢？用data()方法你可以轻易地实现这一想法。你可以传递两个参数（参数名和参数值）或者一个参数（译者：json对象）。
$('#wrap').data('myKey', 'myValue');<br /> $('#container').data({ myOtherKey : 'myOtherValue', year : 2010 });

　　要取回你的数值，只需使用这个方法来调用对应的参数名。
$('#container').data('myOtherKey'); //返回 'myOtherValue' $('#container').data('year'); //返回 2010

要取得一个元素相关的所有数据，可以调用不带参数的data()；你将会得到一个json对象。

　　如果你添加数据到一个元素后，又打算删除这组数据，只需调用removeData()方法，传递正确的参数名称给它。
$('#container').data('myOtherKey'); //返回 'myOtherValue' $('#container').data('year'); //返回 2010

5, queue() / dequeue()
　　queue()和dequeue()函数是用来处理动画的。队列（queue）就是将要在元素上实现的动画列表；一个元素的动画队列缺省地命名为“fx”。我们来设置一个场景：

HTML
<ul><br /> <li id="start">Start Animating</li><br /> <li id="reset">Stop Animating</li><br /> <li id="add">Add to Queue</li><br /> </ul><br /> <div style="width:150px; height:150px; background:#ececec;"></div>

JavaScript
<p>$('#start').click(animateBox);</p> <p>$('#reset').click(function() {<br /> $('div').queue('fx', []);<br /> });</p> <p>$('#add').click(function() {<br /> $('div').queue( function(){<br /> $(this).animate({ height : '-=25'}, 2000);<br /> $(this).dequeue();<br /> });<br /> });</p> <p>function animateBox() {<br /> $('div').slideUp(2000)<br /> .slideDown(2000)<br /> .hide(2000)<br /> .show(2000, animateBox);<br /> }</p>

　　这是将会发生的：在animateBox()中，我们设置了一个动画队列；留意最后一个动画又调用了animateBox()，所以这样会一直重复这个队列。当我们点击li#start，函数被调用，队列开始；当我们点击li#reset，当前的动画结束后，div会停止运动。这是使用jQuery将名为“fx”的队列设置成一个空数组；就是把这个队列清空了。那么当我们点击li#add时呢？首先，我们调用div上的queue()函数，这将会把我们传递进去的函数增加到队列的末尾。因为我们没有在第一个参数指定一个队列，所以使用的是“fx”队列。在这个函数里，我们使这个div运动起来，然后在div上调用dequeue()，从队列中删除了这个函数并使队列继续进行。队列会继续重复，但这个函数不会成为队列的一部分。

6, delay()
　　当有一长列动画在等待时，你可以使用delay()方法来暂停动画一段时间。把暂停时间作为一个参数传给它，单位是毫秒。
$('div').hide().delay(2000).show(); // div 会隐藏2秒后显示

7, bind(), unbind(), live(), 以及 die()
　　你可知道，当你添加一个click事件到一个元素上时，像这样：
$('#el').click(function () { /*******/ });

　　……你实际上只是在使用包着外壳的bind()方法？要使用bind()方法本身，你可以传递事件的类型作为第一个参数，然后是事件的函数作为第二个参数。

　　如果你需要使用许多事件处理函数，你可以使用名空间将它们归类。在事件名称后用英文句号连接你的名空间。
$('#el').bind('click', function () { /*******/ });<br /> $('#el').bind('click.toolbarEvents', function () { /*******/ }); // 名空间

　　你也可以同时分配相同的函数给多个事件。各个事件间使用空格分隔。如果你想实现和hover()相同的效果，你可以使用这种方式：
$('#el').bind('mouseover mouseout', function () { /*******/ });

　　如果你有需要，还可以通过第三个参数（在第二个位置）给函数传递数据：
$('#el').bind('click', { status : 'user-ready' }, function () {<br /> switch(event.data.status) {<br /> /********/<br /> }<br /> });

　　你迟早会遇到这么一种情况：你通过一个事件处理函数把元素插入到DOM中，然而你发现在这个插入的元素上，由bind()或者披着bind()外壳的事件触发的处理函数无法生效。如果这样的话，你将需要用到live()或者delegate()方法。它可以将事件处理函数恰当地绑定到插入的元素中。
$('.toggle').live(function () {<br /> /* code */<br /> $('<span class="toggle">Enable Beta Features</span>').appendTo($('#optionsPanel'));<br /> /* more code */<br /> });

　　要清理bind()创建的事件处理函数，可以使用unbind()方法。如果你不传递任何参数的话，它将会清除所有处理函数。如果只移除特定的处理函数的话，你可以传递事件类型作为参数。使用特定的名空间创建的处理函数，清除时也要加上名空间，或者使用它的复制。如果你只是希望移除特定的函数，把函数的名字作为第二个参数传递。
$('button').unbind(); // 移除所有<br /> $('button').unbind('click'); // 移除所有clicks()创建的<br /> $('button').unbind('.toolbarEvents'); // 移除所有名空间为toolbarEvents创建的<br /> $('button').unbind('click.toolbarEvents'); // 移除所有名空间toolbarEvents下的click()创建的<br /> $('button').unbind('click', myFunction); // 仅移除这个函数

　　注意你可以bind()/unbind()所传递的处理函数，这仅仅对有函数名的函数起作用。

　　如果你正在尝试从被事件触发的函数内部去unbind一个事件，只需将event对象传递给unbind()。
$('p').bind('click', function (event) {<br /> $('p').unbind(event);<br /> } );

　　你不能对live()委派的事件使用unbind()，而使用die()代替。
$('span').die(); // removes all<br /> $('span').die('mouseover'); // 清除所有mouseovers创建的<br /> $('span').die('mouseover', fn); // 仅清除这个

　　现在，你可以熟练而有效地使用jQuery的事件机制了。

8, eq()
　　如果你在一个元素集中查找特定的元素，你可以传递元素的索引给eq()方法以得到单一的jQuery元素。传递一个负数索引将会从元素集末端开始数起。
var ps = $('p');<br /> console.log(ps.length); // logs 3;<br /> ps.eq(1).addClass('emphasis'); // 仅对第二个项目增加了emphasis样式（由0为起点）

　　你也可以在选择符中使用:eq()。这样的话，前面的例子也可以这样：
$('p:eq(1)').addClass('emphasis');


9, get()
　　当查找一个元素集合的时候，jQuery会将它们作为jQuery对象返回。所以，你可使用所有的jQuery方法。如果你只是想得到基本的DOM元素，你可以使用get()方法。

　　你可以指定一个索引来获取一个元素。
alert( $('p') ); // [object Object] - jquery 对象<br /> alert( $('p').get(1) ); // [object HTMLParagraphElement]

10, grep()
　　如果你不熟悉Unix/Linux shells，你可能没听说过grep这个术语。在一个终端，这是一个文本检索程序；但在jQuery，我们使用它来筛选一个元素数组。它不是一个jQuery方法。你可以传递一个数组作为第一个参数，筛选函数作为第二个参数。筛选函数本身又带了两个参数：一个是数组中的元素，另一个是对应的索引。这个筛选函数经过处理并返回true或者false值。默认状态下，所有返回true值的元素将会保留。你可以增加一个布尔值作为第三个参数，来反过来，使返回false的元素被保留。
<p>var nums = '1,2,3,4,5,6,7,8,9,10'.split(',');</p> <p>nums = $.grep(nums, function(num, index) {<br /> // num = 当前数组元素的值<br /> // index = 元素的索引<br /> return num > 5; // 返回布尔值<br /> });</p> <p>console.log(nums) // 6,7,8,9,10</p>

　　可以查阅不久前 Jeffrey Way 写的 a great quick tip 介绍 $.grep 的文章。

11, 伪类选择符
　　嘿嘿，jQuery使用的CSS选择符引擎，提供了不少的伪类选择符，使得查找元素的工作更为轻松。看看下面这些有意思的例子：
$(':animated'); // 返回所有正在运动的元素<br /> $(':contains(me)'); // 返回所有包括'me'的文本的元素<br /> $(':empty'); // 返回所有没有子节点或者文本的元素<br /> $(':parent'); // 返回所有有子节点或者文本的元素<br /> $('li:even'); // 返回所有序号为偶数的<li>元素<br /> $('li:odd'); // ……猜到是什么意思了吧？<br /> $(':header'); // 返回所有标题：h1 - h6<br /> $('li:gt(4)'); // 返回所有序号大于4的<li>元素（由0为起点）<br /> $('li:lt(4)'); // 返回所有序号小于4的<li>元素<br /> $(':only-child'); // 返回所有……这个很明显吧！

　　还有许多。当然，上面这些是比较特殊的。

12, isArray() / isEmptyObject() / isFunction() / isPlainObject()
　　有时候，你需要确认转给函数的参数类型是正确的。这几个函数会使得这个工作变得简单。前三个函数的功能是不言而喻的：
$.isArray([1, 2, 3]); // 返回 true<br /> $.isEmptyObject({}); // 返回 true<br /> $.isFunction(function () { /****/ }); // 返回 true

　　最后一个就不那么明显了。当转递的参数是一个创建为对象字面值，或者是使用new Object()创建的对象的话，isPlainObject()返回true。
function Person(name) {<br /> this.name = name<br /> return this;<br /> }<br /> $.isPlainObject({})); // 返回 true<br /> $.isPlainObject(new Object()); // 返回 true<br /> $.isPlainObject(new Person()); // 返回 false

13, makeArray()
　　当你使用jQuery创建一个DOM元素集合时，得到的是一个jQuery对象。有的情况你会希望返回的是一个数组或者一组规整的DOM元素。makeArray() 正好能满足你的要求。
var ps = $('p');<br /> $.isArray(ps); //返回 false;<br /> ps = $.makeArray(ps);<br /> $.isArray(ps); // 返回 true;

14, map()
　　map()方法有点像grep()。正如你所意料的，它带一个函数作为参数，这个函数又有两个参数。传递的函数会对集合中的每个元素执行一次。无论这个函数的返回值是什么，都会分别取代元素原来的位置。
$('ul#nav li a').map(function() {<br /> return $(this).attr('title');<br /> }); // 集合变成了链接的标题<br /> // 工具提示插件的制作可以基于这种操作

15, parseJSON()
　　如果你在使用 $.post 或者 $.get，以及在一些其它会和JSON打交道的情况，你会发现parseJSON()相当有用。这个函数使用浏览器内建的JSON解析器（如果有的话）。这会明显地提高速度。
$.post('somePage.php', function (data) {<br /> /*****/<br /> data = $.parseJSON(data); <br /> /*****/ <br /> });

16, proxy()
　　如果你将一个函数作为对象属性，而这个函数引用了对象中的其他属性，你将不能在其他函数中调用这个函数并得到正确结果……我知道这样说很混乱，先看看这个例子吧：
var person = {<br /> name : "Andrew",<br /> meet : function () {<br /> alert('我的名字是' + this.name);<br /> }<br /> };<br /> person.meet();<br /> $('#test').click(person.meet);

　　函数自己运行时，person.meet() 会弹出正确的结果。但是当它被事件调用时，会弹出“我的名字是undefined”。这是因为函数不是在恰当的上下文中被调用。要修正这个问题，可以使用proxy()函数：
$('#test').click($.proxy(person.meet, person));<br /> // 也可以这样： $.proxy(person, "meet")

17, replaceAll() / replaceWith()
　　如果你想替换DOM元素，这就是你需要的。我们可以在查找或创建的元素上调用replaceAll()，将想要替换成的元素选择符转进去。在这个例子里，所有有“error”类的元素都将被替换成我们创建的 span 元素。
$('<span class="fixed">The error has been corrected</span>').replaceAll('.error');

　replaceWith()方法只是把选择符反过来引用，即先把想替换的内容查找到：
$('.error').replaceWith('<span class="fixed">The error has been corrected</span>');

　　这两个方法将分别返回元素或者是HTML序列，你也可以将它们作为参数传递。

18, serialize() / serializeArray()
　　serialize()方法是用来将表单中的值编码成一个字符串。

HTML
<form><br /> <input type="text" name="name" value="John Doe" /><br /> <input type="text" name="url" value="http://www.example.com" /><br /> </form>

JavaScript
console.log($('form').serialize());<br /> // logs : name=John+Doe&url=http%3A%2F%2Fwww.example.com

　　你也可以使用serializeArray()方法来将表单中的值转成一个Json对象数组而不是字符串。
console.log($('form').serializeArray());​​​<br /> // logs : [{ name : 'name', value : 'John Doe'} , { name : 'url', value : 'http://www.example.com' } ]

19, siblings()
　　你可能已经猜到siblings()方法能做什么——它将返回所有兄弟元素集：
<div> . . . </div><br /> <p> . . . </p><br /> <span> . . . </span>
$('p').siblings(); // returns <div>, <span>

20, wrap() / wrapAll() / wrapInner()
　　这三个函数是便于使用一个元素包围其他元素的。三个都带一个参数：或者是一个元素，如HTML序列，一个CSS选择符，一个jQuery对象，或者一个DOM元素，又或者是一个返回元素的函数。

　　wrap()方法使用指定的元素将集合中的每一个元素包围：
$('p').wrap('<div class="warning" />'); // 所有段落都被包含在 div.warning 中

　　wrapAll()方法会将集合中所有的元素都包围在同一个元素中。这意味着集合中的元素会被移动到DOM中的新位置，排列在第一个元素的后面，并一起被包围。

处理前的HTML
<p><br /> <span> . . . </span><br /> <span class="moveMe"> . . . </span><br /> <span class="moveMe"> . . . </span><br /> </p><br /> <p><br /> <span> . . . </span><br /> <span class="moveMe"> . . . </span><br /> <span class="moveMe"> . . . </span><br /> </p>

JavaScript
$('.moveMe').wrapAll(document.createElement('div'));

处理后的HTML
<p><br /> <span> . . . </span><br /> <div><br /> <span class="moveMe"> . . . </span><br /> <span class="moveMe"> . . . </span><br /> <span class="moveMe"> . . . </span><br /> <span class="moveMe"> . . . </span><br /> </div><br /> </p><br /> <p><br /> <span> . . . </span><br /> </p>

　　wrapInner()函数则是用指定的元素来包围集合中的每一个元素内部的内容。
<p> <br /> <span> . . . </span> <br /> <span> . . . </span> <br /> </p>
 
JavaScript
$('p').wrapInner($('<div />'));

处理后的HTML
<p> <br /> <div> <br /> <span> . . . </span> <br /> <span> . . . </span> <br /> </div> <br /> </p>
```
好了，现在，你已经掌握了超过20项新的jQuery特性了。下个项目中你就可以大显身手了。