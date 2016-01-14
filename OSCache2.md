
```
(1)
背景：
1 面临的问题
1.1 需要处理的特殊动态内容
在信息系统建设过程中我们通常会遇到这样的问题：
1. 基础数据的变更问题
信息系统中需要处理的基础数据的内容短时间内是不会发生变化的，但是在一个相对长一些的时间里，它却可能是动态增加或者减少的。
举个例子：电子商务中关于送货区域的定义，可能短时间内不会发生变化，但是随着电子商务企业业务的扩大，系统中需要处理的送货区域就可能增加。所以我们的系统中不得不在每次向客户展示送货区域信息的时候都和数据库（假设送货区域信息保存在数据库中，这也是通常采用的处理方法）进行交互。
2. 统计报表（不仅限于统计报表）的问题
一般来说，统计报表是一个周期性的工作，可能是半个月、一个月或者更长的时间才会需要更新一次，然而统计报表通常是图形显示或者是生成pdf、word、excel等格式的文件，这些图形内容、文件的生成通常需要消耗很多的系统资源，给系统运行造成很大的负担。

1.2 问题的共同点
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
 
(2)
在J2EE系统中，我们经常需要处理一些特殊的动态内容，这些内容在一个时间段内的变更非常有限，但是又不得不将他们确定为动态内容进行输出，而且非常消耗数据库系统资源或者web服务器的资源，这时我们就可以采用Cache----一种用于提高系统响应速度、改善系统运行性能的技术来优化我们的系统。尤其是在Web应用中，这种处理可以很显著的改善系统运行性能。
现在介绍一个实现J2EE框架中Web应用层缓存功能的开放源代码项目----OSCache。
OSCache是OpenSymphony组织提供的一个J2EE架构中Web应用层的缓存技术实现组件，它的出现解决了我们面临的问题。
 
在目前流行的三种开源的缓存工具中，OSCache的配置和使用应给是最简单的了，它主要是针对页面级的配置，EHCache主要针对对象级的缓存，MemCached应该是比较完整的了。
简单的说，缓存就是Map<key,value>，创建缓存就是添加一个map,使用就是通过key取value.
 

2.1 主要特征
1. 兼容多种支持JSP的web服务器BEA Weblogic (7.x或者以上版本) 、IBM Websphere (5.0版本)、Tomcat (4.0或者以上版本) ，其他支持servlet2.3、jsp1.2的web服务器应该都是完全兼容OSCache的。
2. 可选的缓存区
你可以使用内存、硬盘空间、同时使用内存和硬盘或者提供自己的其他资源（需要自己提供适配器）作为缓存区。
    * 使用内存作为缓存区将可以提供更好的性能
    * 使用硬盘作为缓存区可以在服务器重起后迅速恢复缓存内容
    * 同时使用内存和硬盘作为缓存区则可以减少对内存的占用
3. 灵活的缓存系统
OSCache支持对部分页面内容或者对页面级的响应内容进行缓存，编程者可以根据不同的需求、不同的环境选择不同
的缓存级别。
 
(3)
安装过程
从http://www.opensymphony.com/oscache/download.html下载合适的OSCache版本，
我下载的是oscache-2.0.2-full版本。
解压缩下载的文件到指定目录
从解压缩目录取得oscache.jar 文件放到 /WEB-INF/lib 或相应类库目录 目录中，
jar文件名可能含有版本号和该版本的发布日期信息等，如oscache-2.0.2-22Jan04.jar。
 
如果你的jdk版本为1.3.x,建议在lib中加入Apache Common Lib 的commons-collections.jar包。
如jdk是1.4以上则不必。
 
从src或etc目录取得oscache.properties 文件，放入src根目录或发布环境的/WEB-INF/classes 目录。

如你需要建立磁盘缓存，须修改oscache.properties 中的cache.path信息 (去掉前面的#注释)。
win类路径类似为c:\\app\\cache
unix类路径类似为/opt/myapp/cache
 
拷贝OSCache标签库文件oscache.tld到/WEB-INF/classes目录。
 
现在你的应用目录类似如下：
$WEB_APPLICATION\WEB-INF\lib\oscache.jar
$WEB_APPLICATION\WEB-INF\classes\oscache.properties
$WEB_APPLICATION\WEB-INF\classes\oscache.tld

将下列代码加入web.xml文件中
<taglib>
<taglib-uri>oscache</taglib-uri>
<taglib-location>/WEB-INF/classes/oscache.tld</taglib-location>
</taglib>
 
为了便于调试日志输出，须加入commons-logging.jar和log4j-1.2.8.jar到当前类库路径中在src目录加入下面两个日志输出配置文件：
log4j.properties 文件内容为：
log4j.rootLogger=DEBUG,stdout,file
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=[start]%d{yyyy/MM/dd/ HH:mm:ss}[DATE]%n%p[PRIORITY]%
n%x[NDC]%n%t[THREAD] n%c[CATEGORY]%n%m[MESSAGE]%n%n
log4j.appender.file=org.apache.log4j.RollingFileAppender
log4j.appender.file.File=oscache.log
log4j.appender.file.MaxFileSize=100KB
log4j.appender.file.MaxBackupIndex=5
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[start]%d{yyyy/MM/dd/ HH:mm:ss}[DATE]%n%p[PRIORITY]%n%x
[NDC]%n%t[THREAD] n%c[CATEGORY]%n%m[MESSAGE]%n%n
log4j.logger.org.apache.commons=ERROR
log4j.logger.com.opensymphony.oscache.base=INFO

commons-logging.properties 文件内容为
org.apache.commons.logging.Log=org.apache.commons.logging.impl.Log4JCategoryLog
 
2.oscache.properties 文件配置向导
cache.memory
值为true 或 false ，默认为在内存中作缓存，
如设置为false，那cache只能缓存到数据库或硬盘中，那cache还有什么意义：）
cache.capacity
缓存元素个数
cache.persistence.class
持久化缓存类，如此类打开，则必须设置cache.path信息
cache.cluster 相关
为集群设置信息。
如
cache.cluster.multicast.ip为广播IP地址
cache.cluster.properties为集群属性
 
(4)
使用OSCache
OSCache中按照缓存范围的不同分为两种不同的方式：一种是缓存JSP页面中部分或者全部内容，一种是基于整个页面文件的缓存。
4.1 JSP部分内容缓存
使用Cache提供的缓存标签。这是OSCache提供的标签库中最重要的一个标签。
cache标签的属性说明:
key - 标识缓存内容的关键词。在指定的作用范围内必须是唯一的。默认的key是被访问页面的URI和后面的请求字符串。
scope - 缓存发生作用的范围，可以是application或者session
time - 缓存内容的时间段，单位是秒，默认是3600秒，也就是一个小时，如果设定一个负值，那么这部分被缓存的内容将永远不过期。
duration - 指定缓存内容失效的时间，是相对time的另一个选择，可以使用简单日期格式或者符合USO-8601的日期格式。如：duration='PT5M' duration='5s'等
refresh - false 或者true。
如果refresh属性设置为true，不管其他的属性是否符合条件，这部分被缓存的内容都将被更新，这给编程者一种选择，决定什么时候必须刷新。
mode - 如果编程者不希望被缓存的内容增加到给用户的响应中，可以设置mode属性为"silent"其它可用的属性还包括：cron 、groups、language、refreshpolicyclass、refreshpolicyparam。
上面的这些属性可以单独使用，也可以根据需要组合使用，下面的例子将讲解这些常用属性的使用方式。
实例一：
cache1.jsp 内容如下
<%@ page import="java.util.*" %>
<%@ taglib uri="oscache" prefix="cache" %>
<html>
<body>
没有缓存的日期: <%= new Date() %><p>
<!--自动刷新-->
<cache:cache time="30">
每30秒刷新缓存一次的日期: <%= new Date() %>
</cache:cache>
<!--手动刷新-->
<cache:cache key="testcache">
手动刷新缓存的日期: <%= new Date() %> <p>
</cache:cache>
<a href="/cache2.jsp">手动刷新</a>
</body>
</html>
cache2.jsp 执行手动刷新页面如下
<%@ taglib uri="oscache" prefix="cache" %>
<html>
<body>
缓存已刷新...<p>
<cache:flush key="testcache" scope="application"/>
<a href="/cache1.jsp">返回</a>
</body>
</html>

你也可以通过下面语句定义Cache的有效范围,如不定义scope,scope默认为Applcation
<cache:cache time="30" scope="session">
...
</cache:cache>

4.2 用CashFilter实现页面级缓存
在OSCache组件中提供了一个CacheFilter用于实现页面级的缓存，这种功能的实现是通过在web.xml中进行配置来决定缓存哪一个或者一组页面，而且还可以设置缓存的相关属性，这种基于配置文件的实现方式对于J2EE来说应该是一种标准的实现方式了。
你可以在web.xml中定义缓存过滤器，定义特定资源的缓存。
<filter>
<filter-name>CacheFilter</filter-name>
<filter-class>com.opensymphony.oscache.web.filter.CacheFilter</filter-class>
<init-param>
<param-name>time</param-name>
<param-value>60</param-value>
</init-param>
<init-param>
<param-name>scope</param-name>
<param-value>session</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>CacheFilter</filter-name>
<!-对/testContent.jsp页面内容进行缓存-->
<url-pattern>/testContent.jsp</url-pattern>
<!-对所有jsp页面内容进行缓存-->
<url-pattern>*.jsp</url-pattern>
</filter-mapping>
 
如:
第一次进行页面后,会输出(即会将页面内容放于cache中):
2009-06-08 14:37:05,437 [com.opensymphony.oscache.web.filter.CacheFilter]-[INFO] <cache>: filter in scope 3
2009-06-08 14:37:05,640 [com.opensymphony.oscache.web.ServletCacheAdministrator]-[INFO] Created new session-scoped cache in session A1317175AD031AF7FAA6E9C376C1D6A at key: __oscache_cache
2009-06-08 14:37:05,640 [com.opensymphony.oscache.web.ServletCacheAdministrator]-[INFO] Created new cache in scope 3
2009-06-08 14:37:05,671 [com.opensymphony.oscache.web.filter.CacheFilter]-[INFO] <cache>: New cache entry, cache stale or cache scope flushed for /BBSCS_8_0_3/_GET_
2009-06-08 14:37:10,187
第二次登录时,会出现(即会从cache中获取页面内容):
2009-06-08 14:38:55,593 [com.opensymphony.oscache.web.filter.CacheFilter]-[INFO] <cache>: filter in scope 3
2009-06-08 14:38:55,593 [com.opensymphony.oscache.web.filter.CacheFilter]-[INFO] <cache>: New cache entry, cache stale or cache scope flushed for /BBSCS_8_0_3/_GET_
注意，CacheFilter只捕获Http头为200的页面请求，即只对无错误请求作缓存，
而不对其他请求（如500,404,400）作缓存处理
 
4.3 对象缓存
在实际应用中除了JSP标签库,还可以使用OSCache提供的Java API .下面我来介绍一个实用的Java类 ,使用GeneralCacheAdministrator来建立,刷新和管理缓存.
主要用到的GeneralCacheAdministrator的方法有：
public Object getFromCache(String key) throws NeedsRefreshException; -- 从缓存中获取一个key标识的对象.
public Object getFromCache(String key, int refreshPeriod) throws NeedsRefreshException ; -- 从缓存中获取一个key标识的对象.  refreshPeriod刷新周期,标识此对象在缓存中保存的时间(单位:秒)
public void putInCache(String key, Object content)  -- 存储一个由Key标识的缓存对象.
public void putInCache(String key, Object content, String[] groups)   -- 存储一个由Key标识的属于groups中所有成员的缓存对象.
public void flushEntry(String key) -- 更新一个Key标识的缓存对象.
public void flushGroup(String group) --更新一组属于groupr标识的所有缓存对象.
public void flushAll() -- 更新所有缓存.
public void cancelUpdate(String key) --- 取消更新 只用于在处理捕获的NeedsRefreshException异常并尝试生成新缓存内容失效的时候.
public void removeEntry(String key) ---从缓中移除一个key标识的对象
public void clear()  --- 清除所有缓存
eg.
------------
///采取补救措施的典型方案
String myKey = "myKey";
String myValue;
int myRefreshPeriod = 1000; //刷新周期1000秒
try {
    //从Cache中获得 要做类型转换
    myValue = (String) admin.getFromCache(myKey, myRefreshPeriod);
} catch (NeedsRefreshException nre) {
    try {
        // Cache中没有则从库获得数据.
        myValue = "This is the content retrieved.";
        // 存放在Cache中 键值myKey
        admin.putInCache(myKey, myValue);
    } catch (Exception ex) {
 // 尝试恢复Cache中的内容
        myValue = (String) nre.getCacheContent();
        // 如果Cache中的内容没有复原 则用这个终级方法
        admin.cancelUpdate(myKey);  //取消对myKey的更新 即类似数据回滚
    }
}
///不采取补救措施的典型方案
String myKey = "myKey";
String myValue;
int myRefreshPeriod = 1000;
try {
    //从Cache中获得 要做类型转换
    myValue = (String) admin.getFromCache(myKey, myRefreshPeriod);
} catch (NeedsRefreshException nre) {
    try {
        // Cache中没有则从库获得数据.
        myValue = "This is the content retrieved.";
        // 存放在Cache中 键值myKey
        admin.putInCache(myKey, myValue);
        updated = true;
    } finally {
        if (!updated) {
            // 如果Cache中的内容更新出现异常 则用这个终级方法
        admin.cancelUpdate(myKey);          }//取消对myKey的更新 即类似数据回滚
        }
    }
}
注意:
如果一个NeedsRefreshException出现 必须调用admin.putInCache或甚至admin.cancelUpdate来避免死锁情况发生.
 
 
实例：
以上的方法,主要用于页面内容的缓存;
缓存对象,主要用于数据库的操作.
先创建一个Cache的接口;
再创建一个实现Cache接口的类:OsCacheImp.java;
进行应用.
对应查询操作时,会用到cache中的get(),若为NULL,则再用ADD();
remove时,用到remove();
save/update,也用到remove.为什么不是用add呢???
因为保存或更新时,意味着原来的东西,发生了变化.所以,保存后,要删除原来的,下次再获取最新的.

public interface Cache {
 public void add(Object key, Object value);
 public Object get(Object key);
 public void remove(Object key);
 public void removeAll();
}
 
import com.opensymphony.oscache.general.*;
import com.opensymphony.oscache.base.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import java.util.*;
import org.springframework.core.io.*;
public class OsCacheImp implements Cache {
 private static final Log logger = LogFactory.getLog(OsCacheImp.class);
 private GeneralCacheAdministrator admin;
 public OsCacheImp() {
  admin = new GeneralCacheAdministrator();
 }
 public OsCacheImp(String profile) {
  Properties properties = new Properties();
  ClassPathResource classPathResource = new ClassPathResource(profile);
  try {
   logger.info("Init Cache...");
   properties.load(classPathResource.getInputStream());
   admin = new GeneralCacheAdministrator(properties);
  } catch (Exception ex) {
   logger.error(ex);
   admin = new GeneralCacheAdministrator();
  }
 }
 public void add(Object key, Object value) {
  logger.debug("Add into cache [Key:" + key + "]");
  this.admin.putInCache(String.valueOf(key), value);
 }
 public Object get(Object key) {
  try {
   logger.debug("Get from cache [Key:" + key + "]");
   return this.admin.getFromCache(String.valueOf(key));
  } catch (NeedsRefreshException ex) {
   logger.debug("Object not in cache, return null");
   this.admin.cancelUpdate(String.valueOf(key));
   return null;
  }
 }
 public void remove(Object key) {
  logger.debug("Remove from cache [Key:" + key + "]");
  this.admin.flushEntry(key.toString());
 }
 public void removeAll() {
  logger.debug("Remove all");
  this.admin.flushAll();
 }
}

应用:
if (Constant.USE_PERMISSION_CACHE) 
{
Map[] mapPermission 
= (Map[]) this.getUserPermissionCache().get("R_" + String.valueOf(roleID));
  if (mapPermission == null) 
  {
    mapPermission = this.getPermissionMaps(roleID);
    this.getUserPermissionCache().add("R_" + String.valueOf(roleID), mapPermission);
  }
  return mapPermission;
} 
else 
{
return this.getPermissionMaps(roleID);    
}

System.out.println("----------现在的时间:"+System.currentTimeMillis());
   pi=(PersonInfo)this.getPersonCache().get(this.getUserName());
   if(pi==null)
   {
    pi=this.getPersonService().queryPersonInfoByName
(this.getUserName());
    System.out.println("----------现在的时
间:"+System.currentTimeMillis());
    System.out.println("----------由数据库查询来输出");
    this.getPersonCache().add(this.getUserName(), pi);
    System.out.println("----------把密码放入Cache");
   }
   else
   {
    System.out.println("----------现在的时
间:"+System.currentTimeMillis());
    System.out.println("----------由OsCache来输出");
   }
输出为:
----------现在的时间:1244446098687
----------现在的时间:1244446098703(时间相差:16)
----------由数据库查询来输出
----------把密码放入Cache

----------现在的时间:1244446165984
----------现在的时间:1244446165984(时间相差:0)
----------由OsCache来输出
OSCACHE集群功能
 Oscache的集群功能没有完全实现，只是实现了flush的接口，需要用户自己去实现它的其它集群接口(不知道他是出于什么考虑). 
如果采用Jgroups组件，则需要继承自JavaGroupsBroadcastingListener抽象类，继承它的handleClusterNotification方法，完成集群其它功能的实现： 
注意：集群中传递的对象必须实现Serializable接口。
public class JavaGroupsBroadcastingListenerImpl extends 
    JavaGroupsBroadcastingListener { 
  public void handleClusterNotification(ClusterNotification message) { 
     
    switch (message.getType()) { 
    case CacheConstants.CLUSTER_ENTRY_ADD: 
      System.out.println("集群新增:" + message.getData()); 
      if(message.getData() instanceof QflagCacheEvent) { 
        QflagCacheEvent event = (QflagCacheEvent)message.getData(); 
        cache.putInCache(event.getKey(), event.getEntry().getContent(),null,null,CLUSTER_ORIGIN); 
      } 
      break; 
    case CacheConstants.CLUSTER_ENTRY_UPDATE: 
      System.out.println("集群更新:" + message.getData()); 
      if(message.getData() instanceof QflagCacheEvent) { 
        QflagCacheEvent event = (QflagCacheEvent)message.getData(); 
        cache.putInCache(event.getKey(), event.getEntry().getContent(),null,null,CLUSTER_ORIGIN); 
      } 
      break; 
    case CacheConstants.CLUSTER_ENTRY_DELETE: 
      System.out.println("集群删除:" + message.getData()); 
      if(message.getData() instanceof QflagCacheEvent) { 
        QflagCacheEvent event = (QflagCacheEvent)message.getData(); 
//        cache.removeEntry(event.getKey(),event.getOrigin()); 
        cache.removeEntry(event.getKey()); 
      } 
      break; 
    } 

  } 
    
  public void cacheEntryAdded(CacheEntryEvent event) { 
    super.cacheEntryAdded(event); 
    if(!CLUSTER_ORIGIN.equals(event.getOrigin())) { 
      sendNotification(new ClusterNotification(CacheConstants.CLUSTER_ENTRY_ADD, new QflagCacheEvent(event.getMap(),event.getEntry(),CLUSTER_ORIGIN))); 
    } 
  } 

//  @Override 
//  public void cacheEntryFlushed(CacheEntryEvent event) { 
//     
//    super.cacheEntryFlushed(event); 
//    if(!CLUSTER_ORIGIN.equals(event.getOrigin())) { 
//      sendNotification(new ClusterNotification(CacheConstants.CLUSTER_ENTRY_ADD, new UcallCacheEvent(event.getMap(),event.getEntry(),CLUSTER_ORIGIN))); 
//    } 
//  } 

  @Override 
  public void cacheEntryRemoved(CacheEntryEvent event) { 
     
    super.cacheEntryRemoved(event); 
    if(!CLUSTER_ORIGIN.equals(event.getOrigin())) { 
      sendNotification(new ClusterNotification(CacheConstants.CLUSTER_ENTRY_DELETE, new QflagCacheEvent(event.getMap(),event.getEntry(),CLUSTER_ORIGIN))); 
    } 
  } 

  @Override 
  public void cacheEntryUpdated(CacheEntryEvent event) { 
     
    super.cacheEntryUpdated(event); 
    if(!CLUSTER_ORIGIN.equals(event.getOrigin())) { 
      sendNotification(new ClusterNotification(CacheConstants.CLUSTER_ENTRY_UPDATE, new QflagCacheEvent(event.getMap(),event.getEntry(),CLUSTER_ORIGIN))); 
    } 
  } 
    
} 


package qflag.ucall.cache; 
public class CacheConstants { 
  /** 
    * 添加缓存对象操作 
    */ 
  public final static int ACTION_ADD_OBJ = 1; 
  /** 
    * 更新缓存对象操作 
    */ 
  public final static int ACTION_UPDATE_OBJ = 2; 
  /** 
    * 删除缓存对象操作 
    */ 
  public final static int ACTION_DELETE_OBJ = 3; 
  /** 
    * 刷新缓存对象 
    */ 
  public final static int ACTION_FLUSH_OBJ = 4; 
    
    
  /** 
    * 集群entry add处理 
    */ 
  public final static int CLUSTER_ENTRY_ADD = 20; 
    
  /** 
    * 集群entry update处理 
    */ 
  public final static int CLUSTER_ENTRY_UPDATE = 21; 
    
  /** 
    * 集群entry delete处理 
    */ 
  public final static int CLUSTER_ENTRY_DELETE = 22; 
} 


package qflag.ucall.cache.event; 

import java.io.Serializable; 

import com.opensymphony.oscache.base.Cache; 
import com.opensymphony.oscache.base.CacheEntry; 
import com.opensymphony.oscache.base.events.CacheEntryEvent; 
import com.opensymphony.oscache.base.events.CacheEvent; 

public class QflagCacheEvent extends CacheEvent implements Serializable { 
  /** 
    * The cache where the entry resides. 
    */ 
  private Cache map = null; 

  /** 
    * The entry that the event applies to. 
    */ 
  private CacheEntry entry = null; 

  /** 
    * Constructs a cache entry event object with no specified origin 
    *    
    * @param map 
    *                        The cache map of the cache entry 
    * @param entry 
    *                        The cache entry that the event applies to 
    */ 
  public QflagCacheEvent(Cache map, CacheEntry entry) { 
    this(map, entry, null); 
  } 

  /** 
    * Constructs a cache entry event object 
    *    
    * @param map 
    *                        The cache map of the cache entry 
    * @param entry 
    *                        The cache entry that the event applies to 
    * @param origin 
    *                        The origin of this event 
    */ 
  public QflagCacheEvent(Cache map, CacheEntry entry, String origin) { 
    super(origin); 
    this.map = map; 
    this.entry = entry; 
  } 

  /** 
    * Retrieve the cache entry that the event applies to. 
    */ 
  public CacheEntry getEntry() { 
    return entry; 
  } 

  /** 
    * Retrieve the cache entry key 
    */ 
  public String getKey() { 
    return entry.getKey(); 
  } 

  /** 
    * Retrieve the cache map where the entry resides. 
    */ 
  public Cache getMap() { 
    return map; 
  } 

  public String toString() { 
    return "key=" + entry.getKey(); 
  } 
} 
```