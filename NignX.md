## NignX  里面的 nginx.conf 配置文件的详细解释 ##
官方API：[http://wiki.nginx.org/NginxChs ](.md)
```
#user  nobody;								#使用哪个用户启动nginx 前面是用户,后面是组 
worker_processes  1;						#nginx工作的进程数量

#[ debug | info | notice | warn | error | crit ] 错误日志的级别及位置 
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid					logs/nginx.pid;		#进程文件
#worker_rlimit_nofile	51200;				#一个nginx进程打开的最多文件描述符数目，
											#理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，
											#所以最好与ulimit -n的值保持一致。

#工作模式及连接数上限
events {
	#use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; 
    	worker_connections  1024;				#每个进程最大连接数（最大连接=连接数x进程数）
}

#设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
	include       mime.types;				#设定mime类型
	default_type  application/octet-stream;	#默认文件类型 
	
	#设定日志格式
    	#log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    	#                  '$status $body_bytes_sent "$http_referer" '
	#                  '"$http_user_agent" "$http_x_forwarded_for"';

	#log_format download  '$remote_addr - $remote_user [$time_local] ' 
	#						 '"$request" $status $bytes_sent ' 
	#						 '"$http_referer" "$http_user_agent" ' 
	#						 '"$http_range" "$sent_http_content_range"';

	#access_log  logs/access.log	main;
	
	#charset						gb2312,utf-8;	#默认编码     
	#server_names_hash_bucket_size	128;			#服务器名字的hash表大小     

	sendfile        on;								#开启高效文件传输模式 

	#以下两个选项用于防止网络阻塞 
	tcp_nopush		on; 
	tcp_nodelay		on;

    
	keepalive_timeout		65;		#超时时间

	client_max_body_size	20m;    #上传文件大小限制 

	#设定请求缓冲
	client_header_buffer_size		1k;   
	large_client_header_buffers		4 4k;

	#开启gzip模块
	#gzip				on;
	#gzip_min_length	1k;			#最小压缩文件大小 
	#gzip_buffers		4 8k;		#压缩缓冲区 
	#压缩类型,默认就已经包含text/html 所以下面就不用再写了,当然写上去的话,也不会有问题,但是会有一个warn 
	#gzip_types			ext/plain application/x-javascript text/css text/html text/javascript application/xml; 
	#output_buffers		1 32k;
	#postpone_output	1460;


	#FastCGI是为了改善网站的性能－－减少资源占用，提高访问速度. 似乎只有php用得到
	#fastcgi_connect_timeout		300;
	#fastcgi_send_timeout			300;
	#fastcgi_read_timeout			300;
	#fastcgi_buffer_size			64k;
	#fastcgi_buffers				4 64k;
	#fastcgi_busy_buffers_size		128k;
	#fastcgi_temp_file_write_size	128k;


	#设定负载均衡的服务器列表
    upstream  localhost  {
			ip_hash;     #每个ip给一个hash值,可以复制session,防止集群session丢失
			server   127.0.0.1:8080  weight=5;	#weigth参数表示权值，权值越高被分配到的几率越大
			server   127.0.0.1:8081;
     }

	#虚拟主机的配置 
    server {
		listen       80;
		server_name  localhost;

		index        index.html index.htm index.jsp;
		#root        /usr/local/tomcat/webapps/123;

        charset utf-8;		#字符编码

		#设定本虚拟主机的访问日志 
		#access_log  logs/host.access.log  main;
		#client_header_timeout  3m;
		#client_body_timeout    3m;
		#send_timeout			3m;
		#sendfile				on;
		#tcp_nopush				on;
		#tcp_nodelay            on;
		#keepalive_timeout		65;

		#对 访问动态服务器的地址 启用负载均衡  
        location ~ \.(jsp|jspx|do|action|yo)?$ {
			proxy_pass				http://localhost;
			proxy_set_header		Host $host;
			proxy_set_header		X-Real-IP $remote_addr;
			proxy_set_header		X-Forwarded-For $proxy_add_x_forwarded_for;
			client_max_body_size	10m;   #上传文件大小限制 
			client_body_buffer_size 128k;   
			proxy_connect_timeout	90;   
			proxy_send_timeout		90;   
			proxy_read_timeout		90;   
			proxy_buffer_size		4k;   
			proxy_buffers			4 32k;   
			proxy_busy_buffers_size 64k;   
			proxy_temp_file_write_size 64k; 
			
        }

		#以扩展名方式匹配静态文件  
		location ~ .*\.(htm|html|gif|jpg|jpeg|png|bmp|ico|rar|css|js|zip|java|jar|txt|flv|swf|wma)$ {  
			root			/usr/local/tomcat/webapps/123;
			#expires        30d;			#expires 指令来控制其在浏览器的缓存时间
		}

		#以目录方式匹配静态目录  
		location ~ ^/(images|styles|javascript)/ {   
			root		/usr/local/www;  
			#expires	30d;  
		}

		#设定查看Nginx状态的地址  
		location /NginxStatus {   
			stub_status				on;   
			access_log				on;   
			auth_basic				"NginxStatus";   
			auth_basic_user_file	conf/htpasswd;   
		}

		#错误页面 
        #error_page		404		/404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page		500 502 503 504		/50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443;
    #    server_name  localhost;

    #    ssl                  on;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_timeout  5m;

    #    ssl_protocols  SSLv2 SSLv3 TLSv1;
    #    ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
    #    ssl_prefer_server_ciphers   on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```