
```
*###############以下是struts2拦截器器的简单配置################*
struts.xml：

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE struts PUBLIC "-//Apache Software Foundation//DTD Struts Configuration 2.1//EN" "http://struts.apache.org/dtds/struts-2.1.dtd">
<struts>

	<package name="admin" extends="struts-default" namespace="/admin">
	<!--拦截器不能跟登录退出方法放在同一个package下，不然会出现死循环-->
	<interceptors>
		<interceptor name="adminCheckLogin" class="util.AdminInterceptor" />
		<interceptor-stack name="myadmindefault">
				<interceptor-ref name="defaultStack" />
				<interceptor-ref name="adminCheckLogin" />
		</interceptor-stack>
	</interceptors>
	<default-interceptor-ref name="myadmindefault" />

	<global-results>
		<result name="error">../notfound.jsp</result>
		<result name="login">login.jsp</result>
	</global-results>

	 <action name="getEmpList" class="action.admin.UserAction" method="getEmployeeList">
        <result name="success" type="freemarker">manageEmp.ftl</result>
     </action>
	</package>
	
	<package name="admin_login" extends="struts-default" namespace="/admin">

     <action name="signOut" class="action.admin.UserAction" method="signOut">
         <result name="success">login.jsp</result> 
     </action>
	 <action name="login" class="action.admin.UserAction" method="getUser">
        <result name="success" type="freemarker">index.ftl</result>  
        <result name="input">login.jsp</result>
     </action>

	</package>
	
</struts>    

拦截器java类文件：

import java.util.Map;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class AdminInterceptor extends AbstractInterceptor {

	@Override
	public String intercept(ActionInvocation invocation) throws Exception {
		ActionContext context = invocation.getInvocationContext();
		Map<String, Object> map = context.getSession();
		//HttpServletRequest request= (HttpServletRequest)context.get(StrutsStatics.HTTP_REQUEST); 
		Object user = map.get("adminLoginUser");
		if (user!=null) {
			return invocation.invoke();
		}else {
			return Action.LOGIN;
		}
	}
}


*###############以下是过滤器的简单配置####################*
过滤器java类文件：

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import entity.UserInfo;

public class AuthorizationFilter implements Filter {
	
	@SuppressWarnings("unused")
	private FilterConfig filterConfig = null; 	//过滤器配置文件对象
	private String sendURL = null;	 			//如果用户未登录,则重定向到指定的页面

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpSession session = ((HttpServletRequest)request).getSession();
		HttpServletRequest request2 = (HttpServletRequest)request;
		UserInfo user = (UserInfo)session.getAttribute("loginUser");
		if (user!=null) {
			System.out.println("user!=null"+user);
			chain.doFilter(request, response);
		}else {
			((HttpServletResponse)response).sendRedirect(sendURL);
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
		this.sendURL = filterConfig.getInitParameter("sendURL");
	}

	@Override
	public void destroy() {
		this.filterConfig = null;
		this.sendURL = null;
	}
}

web.xml：

 <!-- 后台页面权限控制 sendUrl 有问题,无法过滤 这个拦截器有点问题，如果用可以再研究以下-->

<filter>
<filter-name>authority</filter-name>
<filter-class>util.AuthorizationFilter</filter-class>
<init-param> 
	<param-name>sendURL</param-name>
	<param-value>panel/login.jsp</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>authority</filter-name>
<url-pattern>/aa/*</url-pattern>
</filter-mapping>
```