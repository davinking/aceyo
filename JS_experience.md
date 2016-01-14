**开发经验浅谈之前端JS编写宝典**
```
一、简化代码

采用更为简短的写法，不仅可以减少输入的字符数，还可以减少文件大小。大部分采用简单写法的代码，执行效率都有轻微提高。

1.1  简化常用对象定义：

使用 var obj = {}; 代替 var obj = new Object();
使用 var arr = []; 代替 var arr = new Array();

1.2  精简if语句

三元操作符可以有效精简只涉及赋值传值操作的if语句，比如
var score = 60, grade;
if (score < 60) {
    grade = “不及格”;
} else {
    grade = “及格”;
}
可以精简为：
var score = 60;
var grade = score < 60 ? “不及格” : “及格”;
三元操作符也支持嵌套，但是嵌套的层次太多会影响程序的可读性，这方面要多加斟酌。

1.3  使用JSON

JSON是一种轻量级的数据格式，轻量级首先体现在它的结构定义非常简单。
var obj = {};
obj.p1 = ‘a’;
obj.p2 = ‘b’;
obj.p3 = ‘c’;
可精简为：
var obj = {
    p1 : ‘a’,
    p2 : ‘b’,
    p3 : ‘c’
};

二、使用高效率的代码

网上流传的效率优化文章非常多，一些比较专业的Javascript书籍也谈到了不少，因此，这里就只列出一些很少谈到的。

2.1  精简循环体

循环的效率很大程度上是由循环体决定的，与之相比，用for还是while的差别就太小了。考虑如下的代码，其功能是为某一批元素添加事件：
function addEvent(elems, eventName, handler) {
    for (var i = 0, len = elems.length; i < len; i++) {
        if (window.attachEvent) {
            elems[i].attachEvent(”on” + eventName, handler);
        } else if (window.addEventListener) {
            elems[i].addEventListener(eventName, handler, false);
        }
    }
}
循环每执行一次，都会判断window对象的attachEvent或addEventListener是否存在，其实这个仅判断一次也就够了；此外，“”on” + eventName”的字符串拼接也会重复执行。优化如下：
function addEvent(elems, eventName, handler) {
    var i = -1, len = elems.length;
    if (window.attachEvent) {
        eventName = “on” + eventName;
        while (++i < len) {
            elems[i].attachEvent(eventName, handler);
        }
    } else if (window.addEventListener) {
        while (++i < len) {
            elems[i].addEventListener(eventName, handler, false);
        }
    }
}

2.2  尽量使用原生的函数而不是自定义函数

当你对Javascript的内置类型变量执行某项操作时，你应该先查查这项操作是否有原生的方法。
要生成一个数组的副本，你会怎么做呢？遍历数组元素然后逐个赋值到另一个数组，这似乎是唯一的方法。其实，原生的Array.prototype.slice就可以达到复制的目的。这个方法可以从某个数组返回选定的元素，且不影响原来的数组。如果参数留空，返回的就是全部元素。
Array.prototype.slice还可以对某些不是数组而又能通过数字索引访问的类型进行操作，比如arguments：
function test() {
    alert(Array.prototype.slice.call(arguments));
}
test(1, 2, 3); // output “1,2,3″
在Firefox下，它甚至可以对HtmlCollection进行操作。可惜在IE下不行。

另一个例子是数组排序，一般情况下，我们不需要另外写排序算法，用原生的Array.prototype.sort就够了。sort方法只有一个参数，该参数是一个函数，决定两个相比较的元素谁在前谁在后，默认是按照字符顺序排序，比如11会排在2之前。要按数字大小排序，可以这样写：
var arr = [11, 2, 0, 12, 33];
arr.sort(
    function(a, b) {
        return a – b;
    }
);
也可以按照对象的某个属性进行排序：
var arr = [
    { id : 11 },
    { id : 0 },
    { id : 22 }
];
arr.sort(
    function(a, b) {
        return a.id – b.id;
    }
);

2.3  数组去重复

Array类型并没有提供去重复的方法，如果要把数组的重复元素干掉，那得自己想办法：
function unique(arr) {
    var result = [], isRepeated;
    for (var i = 0, len = arr.length; i < len; i++) {
        isRepeated = false;
        for (var j = 0, len = result.length; j < len; j++) {
            if (arr[i] == result[j]) {   
                isRepeated = true;
                break;
            }
        }
        if (!isRepeated) {
            result.push(arr[i]);
        }
    }
    return result;
}
总体思路是把数组元素逐个搬运到另一个数组，搬运的过程中检查这个元素是否有重复，如果有就直接丢掉。从嵌套循环就可以看出，这种方法效率极低。我们可以用一个hashtable的结构记录已有的元素，这样就可以避免内层循环。恰好，在Javascript中实现hashtable是极为简单的，改进如下：
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

三、使代码更易读、更好维护

无论是在开发中还是开发后，保持代码清晰易读可以更快更准确地修改代码。

3.1  连接HTML字符串

相信做前端开发的朋友都受过这个折磨：连接HTML的时候被可恶的单引号、双引号搞得头昏脑胀。比如：
element.innerHTML = ‘<a href=”‘ + url + ‘” onclick=”alert(” + msg + ‘’);”>’ + text + ‘</a>’;
这里介绍一个字符串格式化函数：
String.format = function(str) {
    var args = arguments, re = new RegExp(”%([1-" + args.length + "])”, “g”);
    return String(str).replace(
        re,
        function($1, $2) {
            return args[$2];
        }
    );
};
调用方法很简单：
element.innerHTML = String.format(’<a href=”%1″ onclick=”alert(’%2’);”>%3</a>’, url, msg, text);
意思就是用第n个参数把%n替换掉。这样一来清晰多了吧。

3.2  为您的程序打造一个Config配置对象

编写Java或者C#程序的时候，我们一般会从XML读取程序的配置信息。在Javascript里面，用XML做配置信息不大划算，一方面要多请求一个XML文件或者把XML字符串转换为XML对象，另一方面XML对象的方法比较复杂冗长。轻量级的JSON是最好的选择。
程序中的常量应该放到Config配置对象中，比如Ajax请求的Url、某个操作的提示等，例如：
var Config = {
    ajaxUrl : “test.jsp”,
    successTips : “请求完成”
};
如果Config的数量较多，可以根据配置类型多嵌套一层，比如：
var Config = {
    url : {
        src1 : “test1.jsp”,
        src2 : “test2.jsp”,
        .
        .
    },
    tips : {
        src1Suc : “请求1完成”,
        src2Suc: “请求2完成”,
        .
        .
    }
};
Config应放置于程序的最前面，方便查看和修改。


开发经验浅谈之前端JS编写宝典

怎样让自己的JS规范起来，怎样让自己的JS越来越出色，怎样让自己的JS和任何其它JS共存与互不影响，给自己的js加上命名空间吧；写出自己的个性,接下来我来讲讲几种最常见的也是最具有价值的JS定义；

1.直接new出Object对象
	var app = new Object();
        app.albums = {
            init: function() {
                alert("Hellow JScript!");
            },
            onClick : function () {
            }
        }
	app.albums.init();

2.定义为对象的第二种写法(全局的命名空间的对象)：window.obj || {}
	if (typeof namespace == "undefined" || !namespace) { 
            var namespace = window.namespace || {};//var namespace=window.namespace或者var namespace={}
        namespace.Com = {
            fun:function(){}
        };
for example
	var nav = {};
        nav.albums = {
            pageIndex:10,
            onViewer: function() {
                alert("Hello World");

            }
        };
	nav.albums.onViewer();

3.闭包起来用用吧(function(){})();
	var page = (function() {
            var pageIndex = 1,
                pageSize = 20,
                recordCount = 100,
                totalPage = 20;
            var inner;
            return inner = {
                preload: function() {
                    alert(recordCount);
                }
            };
        })();
	page.preload();

4.定义函数,并让它具有特定属性与方法
	function Fx(o) {
            this.url = o.url;
        }
        Fx.prototype.onDel = function() {
            alert(this.url);
        };
        Fx.prototype = {
            onDel: function() {
                alert("dd");
            },
            onSelect: function() {
            }
        };
        var nfx = new Fx({ url: "dddddd" });

5.看看prototype吧
Object.extend = function(destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        }
        var Class = {
            create: function() {
                return function() { this.initialize.apply(this, arguments); }
            }
        }
	var apps = Class.create();
	apps.prototype = {
    	     initialize: function(cfg) {
        	  jQuery.extend(this.config, cfg);
        	  this.version = "1.2";
        	  this.license = "hn-man@live.cn";
    	     }
        }; 
	var apps2 = Class.create();
        Object.extend(apps2, {
            on2: {
                pa: 1
            },
            on1: 1,
            onOk: function() {
                alert("hello world!");
            }
        });   
        var apps3 = Class.create();
        Object.extend(apps3, apps2);
        var apps4 = Class.create();
        Object.extend(apps4, apps2);

        apps3.on1 = 10;

        alert(apps4.on1);

6.看看jQuery吧
	jQuery.fn.extend({
            check: function() {
                return this.each(function() { this.checked = true; });
            },
            uncheck: function() {
                return this.each(function() { this.checked = false; });
            }
        });

	or

	jQuery.fn.check = function() {
            return this.each(function() { this.checked = true; });
        }

7.其它Demo罗列在下，自己意会:
function func(){} 
	var func=function(){};
for example :
	var addEvent=new function(){ 
	    if(!-[1,]) return function(elem,type,func){attachEvent(elem,'on'+type,func);}; 
	    else return function(elem,type,func){addEventListener(elem,type,func,false);} 
	};
	var class=new function(){ 
		var privateArg;//静态私有变量 
		function privateMethod=function(){};//静态私有方法 
		return function(){/*真正的构造器*/};
	};
```