
```
<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Language" content="zh-CN" />
	<title>根据ip地址得到城市</title>

	<script src="http://fw.qq.com/ipaddress" charset="gb2312"></script>
	<script>
		alert("你的IP是："+IPData[0]+"，来自省份："+IPData[1]+"，城市："+IPData[2]);
	</script>

</head>
<body>
	这个是tx的根据ip地址得到城市的一个地址，请求的是远程服务器，因为对方是gb2312，本地utf-8<br />
	所以script标签要设定charset="gb2312" 不要理解错了，这个属性是说：我用gbk编码请求。而不是返回gbk编码的内容。<br />
	这个其实就是请求了一个全局的js变量。所以才有IPData[0]。
</body>
</html>
```