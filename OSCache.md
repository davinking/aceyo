
```
Cache是一种用于提高系统响应速度、改善系统运行性能的技术。尤其是在Web应用中，通过缓存页面的输出结果，可以很显著的改善系统运行性能。本文中 作者给大家介绍一个实现J2EE框架中Web应用层缓存功能的开放源代码项目----OSCache。通过应用OSCache，我们不但可以实现通常的 Cache功能，还能够改善系统的稳定性。
关键词： Cache 系统性能
1面临的问题
　1.1需要处理的特殊动态内容
　　在信息系统建设过程中我们通常会遇到这样的问题：
　　1.基础数据的变更问题
　　　信息系统中需要处理的基础数据的内容短时间内是不会发生变化的，但是在一个相对长一些的时间里，它却可能是动态增加或者减少的。
　　　举个例子：电子商务中关于送货区域的定义，可能短时间内不会发生变化，但是随着电子商务企业业务的扩大，系统中需要处理的送货区域就可能增 加。所以我们的系统中不得不在每次向客户展示送货区域信息的时候都和数据库（假设送货区域信息保存在数据库中，这也是通常采用的处理方法）进行交互。
　　2.统计报表（不仅限于统计报表）的问题
　　　一般来说，统计报表是一个周期性的工作，可能是半个月、一个月或者更长的时间才会需要更新一次，然而统计报表通常是图形显示或者是生成pdf、word、excel等格式的文件，这些图形内容、文件的生成通常需要消耗很多的系统资源，给系统运行造成很大的负担。
　1.2问题的共同点
　　通过比较分析，不难发现这两类问题有一些共同点：
　　1、被处理的内容短时间不变，所以短时间内可以作为静态内容进行处理
　　2、在一个不太长的时间内，被处理的内容可能或者必定产生变化，所以必须将他们作为动态内容进行处理
　　3、在合理的时间区段内可以忽略被处理内容变化后带来的影响
　　4、对这些内容的处理动作比较消耗系统性能，影响系统响应时间
　1.3 解决方法
　　缓存技术可以帮助我们很好的解决这个问题：
　　　1、缓存信息
　　　当上述的基础数据或者统计报表第一次被访问时，被处理的内容被当作动态信息，基础数库从数据库中获得，统计报表也会被生成符合要求的图形、文件，然后这些信息都会被放入缓存信息中。
　　　2、响应信息由缓存提供
　　　当上述的基础数据或者统计报表继续被访问时，系统将会首先检查缓存信息中是否有对应的内容和我们设定的缓存规则，如果符合缓存信息存在而且符合缓存规则，给出的响应将来自于缓存信息，如果没有或者缓存信息已经不符合设定的要求，系统将重复上一步的动作。
　　　很显然，上面的步骤2中，多数情况下，当用户请求到达时，被处理的内容将来自于缓存，所以大大的减少了与数据库的交互，或者不再需要为每个请求都生成一次报表图形或者文件，这部分工作的减少对于降低系统性能消耗、提高系统稳定性和并发处理能力是非常有益的。
2　OSCache简介
　　OSCache是OpenSymphony组织提供的一个J2EE架构中Web应用层的缓存技术实现组件，它的出现解决了我们面临的问题。
　　OSCache目前最新的稳定版本是2.4.1 ，本文中的例子都是基于这个版本的，如果大家运行例子的过程中发生问题，请首先确认是否采用了正确的软件版本。
　2.1主要特征
　　1.兼容多种支持JSP的web服务器
　　　已经通过兼容测试的web服务器包括OrionServer (1.4.0或者以上版本) 、Macromedia JRun (3.0或者以上版本) 、BEA Weblogic (7.x或者以上版本) 、IBM Websphere (5.0版本)、Silverstream (3.7.4版本)、Caucho Resin (1.2.3或者以上版本)、Tomcat (4.0或者以上版本) ，其他支持servlet2.3、jsp1.2的web服务器应该都是完全兼容OSCache的。
　　2.可选的缓存区
　　　你可以使用内存、硬盘空间、同时使用内存和硬盘或者提供自己的其他资源（需要自己提供适配器）作为缓存区。
　　　1)使用内存作为缓存区将可以提供更好的性能
　　　2)使用硬盘作为缓存区可以在服务器重起后迅速恢复缓存内容
　　　3)同时使用内存和硬盘作为缓存区则可以减少对内存的占用
　　3.灵活的缓存系统
　　　　OSCache支持对部分页面内容或者对页面级的响应内容进行缓存，编程者可以根据不同的需求、不同的环境选择不同的缓存级别。
　　4.容错
　　　在一般的web应用中，如果某个页面需要和数据库打交道，而当客户请求到达时，web应用和数据库之间无法进行交互，那么将返回给用户 “系统出错”或者类似的提示信息，如果使用了OSCache的话，你可以使用缓存提供给用户，给自己赢得维护系统或者采取其他补救的时间。
　　其它特性还包括对集群的支持、缓存主动刷新等特性，大家可以参考OpenSymphony网站上的其他资源获取更多的信息。
3　OSCache组件的安装
　　OSCache是一个基于web应用的组件，他的安装工作主要是对web应用进行配置，大概的步骤如下：
　　1.下载、解压缩OSCache
　　　请到OSCache的主页http://www.opensymphony.com/oscache/download.html下载Oscache的最新版本，作者下载的是OSCache的最新稳定版本2.0。
　　　将下载后的。Zip文件解压缩到c:\oscache（后面的章节中将使用%OSCache_Home%来表示这个目录）目录下
　　2.新建立一个web应用
　　3.将主要组件%OSCache_Home%\oscache.jar放入WEB-INF\lib目录
　　4.commons-logging.jar、commons-collections.jar的处理
　　l、OSCache组件用Jakarta Commons Logging来处理日志信息，所以需要commons-logging.jar的支持，请将%OSCache_Home%\lib\core \commons-logging.jar放入classpath（通常意味着将这个文件放入WEB-INF\lib目录）
　　２、如果使用JDK1.3,请将%OSCache_Home%\lib\core\commons-collections.jar放入classpath，如果使用JDK1.4或者以上版本，则不需要了
　　5.将oscache.properties、oscache.tld放入WEB-INF\class目录
　　　１、%OSCache_Home%\oscache.properties包含了对OSCache运行特征值的设置信息
　　　２、%OSCache_Home%\oscache.tld包含了OSCache提供的标签库的定义内容
　　6.修改web.xml文件
　　在web.xml文件中增加下面的内容，增加对OSCache提供的taglib的支持：
　　<taglib>
　　　<taglib-uri>oscache</taglib-uri>
　　　<taglib-location>/WEB-INF/classes/ oscache.tld</taglib-location>
　　</taglib>
　4　开始使用OSCache中的缓存组件
　OSCache中按照缓存范围的不同分为两种不同的方式：一种是缓存JSP页面中部分或者全部内容，一种是基于整个页面文件的缓存。
　　　4.1JSP部分内容缓存
　　　　4.1.1Cache—OSCache提供的缓存标签
　　　　　这是OSCache提供的标签库中最重要的一个标签，包括在标签中的内容将应用缓存机制进行处理，处理的方式将取决于编程者对cache标签属性的设置。
　　　　第一次请求到达时，标签中的内容被处理并且缓存起来，当下一个请求到达时，缓存系统会检查这部分内容的缓存是否已经失效，主要是以下几项：
　　　　1.缓存时间超过了cache标签设置的time或者duration属性规定的超时时间
　　　　2.cron属性规定的时间比缓存信息的开始时间更晚
　　　　3.标签中缓存的内容在缓存后又被重新刷新过
　　　　4.其他缓存超期设定
　　　　如果符合上面四项中的任何一项，被缓存的内容视为已经失效，这时被缓存的内容将被重新处理并且返回处理过后的信息，如果被缓存的内容没有失效，那么返回给用户的将是缓存中的信息。
cache标签的属性说明:
key – 标识缓存内容的关键词。在指定的作用范围内必须是唯一的。默认的key是被访问页面的URI和后面的请求字符串。
你可以在同一个页面中使用很多cache标签而不指定他的key属性，这种情况下系统使用该页面的URI和后面的请求字符串，另外再自动给这些key增加一个索引值来区分这些缓存内容。但是不推荐采用这样的方式。
scope – 缓存发生作用的范围，可以是application或者session
time – 缓存内容的时间段，单位是秒，默认是3600秒，也就是一个小时，如果设定一个负值，那么这部分被缓存的内容将永远不过期。
duration – 指定缓存内容失效的时间，是相对time的另一个选择，可以使用简单日期格式或者符合USO-8601的日期格式。如：duration='PT5M' duration='5s'等
refresh – false 或者true。
如果refresh属性设置为true，不管其他的属性是否符合条件，这部分被缓存的内容都将被更新，这给编程者一种选择，决定什么时候必须刷新。
mode – 如果编程者不希望被缓存的内容增加到给用户的响应中，可以设置mode属性为“silent”
其它可用的属性还包括：cron 、groups、language、refreshpolicyclass、refreshpolicyparam。
上面的这些属性可以单独使用，也可以根据需要组合使用，下面的例子将讲解这些常用属性的使用方式。
　　　4.1.2Cache标签实例分析:
　　　　1.最简单的cache标签用法
　　　　使用默认的关键字来标识cache内容，超时时间是默认的3600秒
<cache:cache>
<%
//自己的JSP代码内容
%>
</cache:cache>
2.用自己指定的字符串标识缓存内容，并且设定作用范围为session。
<cache:cache key="foobar" scope="session">
<%
//自己的JSP代码内容
%>
</cache:cache>
3.动态设定key值，使用自己指定的time属性设定缓存内容的超时时间，使用动态refresh值决定是否强制内容刷新。
因为OSCache使用key值来标识缓存内容，使用相同的key值将会被认为使用相同的的缓存内容，所以使用动态的key值可以自由的根据不同的角色、不同的要求决定使用不同的缓存内容。
<cache:cache key="<%= product.getId() %>" time="1800" refresh="<%= needRefresh %>">
<%
//自己的JSP代码内容
%>
</cache:cache>
4.设置time属性为负数使缓存内容永不过期
<cache:cache time="-1">
<%
//自己的JSP代码内容
%>
5.使用duration属性设置超期时间
<cache:cacheduration='PT5M'>
<%
//自己的JSP代码内容
%>
6.使用mode属性使被缓存的内容不加入给客户的响应中
<cache:cachemode='silent'>
<%
//自己的JSP代码内容
%>
4.2用CashFilter实现页面级缓存
在OSCache组件中提供了一个CacheFilter用于实现页面级的缓存，主要用于对web应用中的某些动态页面进行缓存，尤其是那些需要生 成pdf格式文件/报表、图片文件等的页面，不仅减少了数据库的交互、减少数据库服务器的压力，而且对于减少web服务器的性能消耗有很显著的效果。
这种功能的实现是通过在web.xml中进行配置来决定缓存哪一个或者一组页面，而且还可以设置缓存的相关属性，这种基于配置文件的实现方式对于J2EE来说应该是一种标准的实现方式了。
[注] 只有客户访问时返回http头信息中代码为200（也就是访问已经成功）的页面信息才能够被缓存
1.缓存单个文件
修改web.xml，增加如下内容，确定对/testContent.jsp页面进行缓存。
<filter>
<filter-name>CacheFilter</filter-name>
<filter-class>com.opensymphony.oscache.web.filter.CacheFilter</filter-class>
</filter>
<filter-mapping>
<filter-name>CacheFilter</filter-name>
<!—对/testContent.jsp页面内容进行缓存-->
<url-pattern>/testContent.jsp</url-pattern>
</filter-mapping>
2.缓存URL pattern
修改web.xml，增加如下内容，确定对*.jsp页面进行缓存。
<filter>
<filter-name>CacheFilter</filter-name>
<filter-class>com.opensymphony.oscache.web.filter.CacheFilter</filter-class>
</filter>
<filter-mapping>
<filter-name>CacheFilter</filter-name>
<!—对所有jsp页面内容进行缓存-->
<url-pattern>*.jsp</url-pattern>
</filter-mapping>
3.自己设定缓存属性
在页面级缓存的情况下，可以通过设置CacheFilter的初始属性来决定缓存的一些特性：
time属性设置缓存的时间段，默认为3600秒，可以根据自己的需要只有的设置
而scope属性设置，默认为application，可选项包括application、session
<filter>
<filter-name>CacheFilter</filter-name>
<filter-class>com.opensymphony.oscache.web.filter.CacheFilter</filter-class>
<init-param>
<param-name>time</param-name>
<param-value>600</param-value>
</init-param>
<init-param>
<param-name>scope</param-name>
<param-value>session</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>CacheFilter</filter-name>
<!—对所有jsp页面内容进行缓存-->
<url-pattern>*.jsp</url-pattern>
</filter-mapping>
4.3 在freemarker使用oscache
<#assign cache=JspTaglibs["/WEB-INF/classes/oscache.tld"] /> 
<@cache.cache key="xxx" time=20> 
${fowUrlaa} 
</@cache.cache> 
注入此处time=20 不能为 time="20"

5性能测试结果
5.1测试环境
系统平台：windows 2000 高级服务器/ P3 800 /512M内存
web服务器：websphere 5.0
数据库服务器：mysql 4.0.18-nt
性能测试用工具：apache Jmeter
5.2测试计划
l这次性能测试对比方为使用缓存和不使用缓存两种，他们的访问代码都是一样的：通过数据源从本地mysql数据库中获取person表的所有记录，然后显示在页面上。
l测试中将模仿10个用户，每个用户发起5次请求，然后统计所有访问花费的时间。
5.3测试结果
使用缓存后的测试结果
不使用缓存时的测试结果
所有请求花费的总时间(毫秒)
20569
22870
性能测试的详细结果请大家查看下载内容中的《不使用cache时的系统性能测试结果.txt》和《使用cache后系统性能测试结果.txt》
6总结
在J2EE系统中，我们经常需要处理一些特殊的动态内容，这些内容在一个时间段内的变更非常有限，但是又不得不将他们确定为动态内容进行输出，而且 非常消耗数据库系统资源或者web服务器的资源，这时我们就可以采用Cache----一种用于提高系统响应速度、改善系统运行性能的技术----来优化 我们的系统。尤其是在Web应用中，这种处理可以很显著的改善系统运行性能。
本文中作者给大家介绍一个实现J2EE框架中Web应用层缓存功能的开放源代码项目----OSCache。它提供了在J2EE系统中实现缓存需要 的丰富的功能。通过应用OSCache，我们不但可以实现通常的Cache功能、自由的设定cache的相关特性比如缓存时间段/缓存内容等，提升系统性 能，而且还能有效的改善系统的稳定性。除此之外，OSCache组件还提供了更多的特性比如集群、容错、灵活的缓存区选择等。
```