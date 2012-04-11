//图片层切换
(function($){jQuery.fn.slidertron=function(options){var settings=jQuery.extend({selectorParent:jQuery(this)},options);return jQuery.slidertron(settings);}
jQuery.slidertron=function(options){var settings=jQuery.extend({selectorParent:null,viewerSelector:null,slidesSelector:null,navNextSelector:null,navPreviousSelector:null,navFirstSelector:null,navLastSelector:null,navStopAdvanceSelector:null,navPlayAdvanceSelector:null,speed:'fast',navWrap:true,seamlessWrap:true,advanceDelay:0,advanceResume:0,advanceNavActiveClass:'active'},options);var isConfigured=true,isLocked=false,isAdvancing=false,isSeamless=false,list=new Array(),currentIndex=false,timeoutID;var __slides,__viewer,__navFirst,__navLast,__navNext,__navPrevious,__navStopAdvance,__navPlayAdvance;function getElement(selector,required)
{var x;try
{if(selector==null)
throw'is undefined';if(settings.selectorParent)
x=settings.selectorParent.find(selector);else
x=jQuery(selector);if(x.length==0)
throw'does not exist';return x;}
catch(error)
{if(required==true)
{alert('Error: Required selector "'+selector+'" '+error+'.');isConfigured=false;}}
return null;}
function advance()
{if(settings.advanceDelay==0)
return;if(!isLocked)
nextSlide();timeoutID=window.setTimeout(advance,settings.advanceDelay);}
function initializeAdvance()
{if(settings.advanceDelay==0)
return;if(__navPlayAdvance)
__navPlayAdvance.addClass(settings.advanceNavActiveClass);if(__navStopAdvance)
__navStopAdvance.removeClass(settings.advanceNavActiveClass);isAdvancing=true;timeoutID=window.setTimeout(advance,settings.advanceDelay);}
function interruptAdvance()
{if(!isAdvancing)
return;if(settings.advanceDelay==0)
return;window.clearTimeout(timeoutID);if(settings.advanceResume==0)
return;timeoutID=window.setTimeout(advance,settings.advanceResume);}
function stopAdvance()
{if(settings.advanceDelay==0)
return;if(!isAdvancing)
return;isAdvancing=false;window.clearTimeout(timeoutID);}
function playAdvance(skip)
{if(settings.advanceDelay==0)
return;if(isAdvancing)
return;isAdvancing=true;if(skip)
timeoutID=window.setTimeout(advance,settings.advanceDelay);else
advance();}
function firstSlide()
{switchSlide((isSeamless?1:0));}
function lastSlide()
{switchSlide((isSeamless?list.length-2:list.length-1));}
function nextSlide()
{if(currentIndex<list.length-1)
switchSlide(currentIndex+1);else if(settings.navWrap||isAdvancing)
switchSlide(0);}
function previousSlide()
{if(currentIndex>0)
switchSlide(currentIndex-1);else if(settings.navWrap)
switchSlide(list.length-1);}
function switchSlide(index)
{if(isLocked)
return false;isLocked=true;if(currentIndex===false)
{currentIndex=index;__reel.css('left',-1*list[currentIndex].x);isLocked=false;}
else
{var diff,currentX,newX;currentX=list[currentIndex].x;newX=list[index].x;diff=currentX-newX;__reel.animate({left:'+='+diff},settings.speed,'swing',function(){currentIndex=index;if(list[currentIndex].realIndex!==false)
{currentIndex=list[currentIndex].realIndex;__reel.css('left',-1*list[currentIndex].x);}
isLocked=false;});}}
function initialize()
{__viewer=getElement(settings.viewerSelector,true);__reel=getElement(settings.reelSelector,true);__slides=getElement(settings.slidesSelector,true);__navFirst=getElement(settings.navFirstSelector);__navLast=getElement(settings.navLastSelector);__navNext=getElement(settings.navNextSelector);__navPrevious=getElement(settings.navPreviousSelector);__navStopAdvance=getElement(settings.navStopAdvanceSelector);__navPlayAdvance=getElement(settings.navPlayAdvanceSelector);if(isConfigured==false)
{alert('Error: One or more configuration errors detected. Aborting.');return;}
__viewer.css('position','relative');__viewer.css('overflow','hidden');__reel.css('position','absolute');__reel.css('left',0);__reel.css('top',0);var cx=0,length=__slides.length;if(length>2&&settings.seamlessWrap)
{isSeamless=true;var first=__slides.first();var last=__slides.last();last.clone().insertBefore(first);first.clone().insertAfter(last);__slides=getElement(settings.slidesSelector,true);}
__slides.each(function(index){var y=jQuery(this);list[index]={object:y,x:cx,realIndex:false};y.css('position','absolute');y.css('left',cx);y.css('top',0);cx+=y.width();});if(isSeamless)
{list[0].realIndex=length;list[length+1].realIndex=1;}
if(__navFirst)
__navFirst.click(function(event){event.preventDefault();if(isLocked)
return false;if(isAdvancing)
interruptAdvance();firstSlide();});if(__navLast)
__navLast.click(function(event){event.preventDefault();if(isLocked)
return false;if(isAdvancing)
interruptAdvance();lastSlide();});if(__navNext)
__navNext.click(function(event){event.preventDefault();if(isLocked)
return false;if(isAdvancing)
interruptAdvance();nextSlide();});if(__navPrevious)
__navPrevious.click(function(event){event.preventDefault();if(isLocked)
return false;if(isAdvancing)
interruptAdvance();previousSlide();});if(__navStopAdvance)
__navStopAdvance.click(function(event){event.preventDefault();if(isLocked)
return false;if(!isAdvancing)
return false;__navStopAdvance.addClass(settings.advanceNavActiveClass);if(__navPlayAdvance)
__navPlayAdvance.removeClass(settings.advanceNavActiveClass);stopAdvance();});if(__navPlayAdvance)
__navPlayAdvance.click(function(event){event.preventDefault();if(isLocked)
return false;if(isAdvancing)
return false;__navPlayAdvance.addClass(settings.advanceNavActiveClass);if(__navStopAdvance)
__navStopAdvance.removeClass(settings.advanceNavActiveClass);playAdvance();});}
jQuery().ready(function(){initialize();initializeAdvance();firstSlide();});};})(jQuery);

//flash 加载 js
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('5(R 8=="16"){7 8=p O()}5(R 8.L=="16"){8.L=p O()}5(R 8.Y=="16"){8.Y=p O()}8.G=o(a,b,w,h,d,c,e,f,g,i,j){5(!v.2j||!v.1w){l}4.1t=j?j:"2k";4.1E=8.L.1d(4.1t);4.1h=p O();4.V=p O();4.18=p W();5(a){4.t("1f",a)}5(b){4.t("C",b)}5(w){4.t("H",w)}5(h){4.t("I",h)}5(d){4.t("J",p 8.y(d.2f().12(".")))}4.P=8.Y.1y(4.m("J"),e);5(c){4.1l("2c",c)}7 q=f?f:"2b";4.1l("29",q);4.t("1q",e);4.t("N",M);7 k=(g)?g:28.14;4.t("1r",k);4.t("Q","");5(i){4.t("Q",i)}};8.G.13={t:o(a,b){4.18[a]=b},m:o(a){l 4.18[a]},1l:o(a,b){4.1h[a]=b},1i:o(){l 4.1h},K:o(a,b){4.V[a]=b},27:o(a){l 4.V[a]},1D:o(){l 4.V},17:o(){7 a=p W();7 b;7 c=4.1D();S(b 19 c){a.1a(b+"="+c[b])}l a},1u:o(){7 a="";5(D.1b&&D.1c&&D.1c.B){5(4.m("N")){4.K("1C","26")}a="<25 24=\\"23/x-22-21\\" 1F=\\""+4.m("1f")+"\\" H=\\""+4.m("H")+"\\" I=\\""+4.m("I")+"\\"";a+=" C=\\""+4.m("C")+"\\" U=\\""+4.m("C")+"\\" ";7 b=4.1i();S(7 c 19 b){a+=[c]+"=\\""+b[c]+"\\" "}7 d=4.17().1v("&");5(d.B>0){a+="1x=\\""+d+"\\""}a+="/>"}1j{5(4.m("N")){4.K("1C","1Y")}a="<1z C=\\""+4.m("C")+"\\" 1V=\\"1R:1O-1L-1K-1I-1G\\" H=\\""+4.m("H")+"\\" I=\\""+4.m("I")+"\\">";a+="<1n U=\\"20\\" 1m=\\""+4.m("1f")+"\\" />";7 e=4.1i();S(7 c 19 e){a+="<1n U=\\""+c+"\\" 1m=\\""+e[c]+"\\" />"}7 f=4.17().1v("&");5(f.B>0){a+="<1n U=\\"1x\\" 1m=\\""+f+"\\" />"}a+="</1z>"}l a},1H:o(a){5(4.m("1q")){7 b=p 8.y([6,0,1J]);5(4.P.X(b)&&!4.P.X(4.m("J"))){4.t("N",F);4.K("1M",1N(4.m("1r")));v.1k=v.1k.1P(0,1Q)+" - 1A 1S 1T";4.K("1U",v.1k)}}5(4.1E||4.m("N")||4.P.X(4.m("J"))){7 n=(R a=="1W")?v.1w(a):a;n.1X=4.1u();l F}1j{5(4.m("Q")!=""){v.14.1g(4.m("Q"))}}l M}};8.Y.1y=o(a,b){7 c=p 8.y([0,0,0]);5(D.1b&&D.1c.B){7 x=D.1b["1Z 1A"];5(x&&x.1s){c=p 8.y(x.1s.1g(/([a-z]|[A-Z]|\\s)+/,"").1g(/(\\s+r|\\s+b[0-9]+)/,".").12("."))}}1j{1p{7 d=p 1o("T.T");S(7 i=3;d!=1e;i++){d=p 1o("T.T."+i);c=p 8.y([i,0,0])}}1B(e){}5(a&&c.u>a.u){l c}5(!a||((a.E!=0||a.15!=0)&&c.u==a.u)||c.u!=6||b){1p{c=p 8.y(d.2a("$J").12(" ")[1].12(","))}1B(e){}}}l c};8.y=o(a){4.u=11(a[0])!=1e?11(a[0]):0;4.E=11(a[1])||0;4.15=11(a[2])||0};8.y.13.X=o(a){5(4.u<a.u){l M}5(4.u>a.u){l F}5(4.E<a.E){l M}5(4.E>a.E){l F}5(4.15<a.15){l M}l F};8.L={1d:o(a){7 q=v.14.2d||v.14.2e;5(q){7 b=q.10(a+"=");7 c=(q.10("&",b)>-1)?q.10("&",b):q.B;5(q.B>1&&b>-1){l q.2g(q.10("=",b)+1,c)}}l""}};5(W.13.1a==1e){W.13.1a=o(a){4[4.B]=a;l 4.B}}7 2h=8.L.1d;7 2i=8.G;7 G=8.G;',62,145,'||||this|if||var|deconcept|||||||||||||return|getAttribute||function|new||||setAttribute|major|document|||PlayerVersion|||length|id|navigator|minor|true|SWFObject|width|height|version|addVariable|util|false|doExpressInstall|Object|installedVer|redirectUrl|typeof|for|ShockwaveFlash|name|variables|Array|versionIsValid|SWFObjectUtil||indexOf|parseInt|split|prototype|location|rev|undefined|getVariablePairs|attributes|in|push|plugins|mimeTypes|getRequestParameter|null|swf|replace|params|getParams|else|title|addParam|value|param|ActiveXObject|try|useExpressInstall|xiRedirectUrl|description|DETECT_KEY|getSWFHTML|join|getElementById|flashvars|getPlayerVersion|object|Flash|catch|MMplayerType|getVariables|skipDetect|src|444553540000|write|96B8|65|11cf|AE6D|MMredirectURL|escape|D27CDB6E|slice|47|clsid|Player|Installation|MMdoctitle|classid|string|innerHTML|ActiveX|Shockwave|movie|flash|shockwave|application|type|embed|PlugIn|getVariable|window|quality|GetVariable|high|bgcolor|search|hash|toString|substring|getQueryParamValue|FlashObject|createElement|detectflash'.split('|'),0,{}));

//google 统计
var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-16094722-1']); _gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

//留言板
var cbvis=false;var cbload=false;function togglecbox(){var cbdiv=document.getElementById("cboxdiv");var cbbut=document.getElementById("cboxbutton");if(!cbvis){if(!cbload){cbdiv.innerHTML='<iframe frameborder="0" width="200" height="305" src="http://www6.cbox.ws/box/?boxid=620417&amp;boxtag=ywfryr&amp;sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" name="cboxmain6-620417" style="border:#ababab 1px solid;border-bottom:0px" id="cboxmain6-620417"></iframe><iframe frameborder="0" width="200" height="75" src="http://www6.cbox.ws/box/?boxid=620417&amp;boxtag=ywfryr&amp;sec=form" marginheight="2" marginwidth="2" scrolling="no" allowtransparency="yes" name="cboxform6-620417" style="border:#ababab 1px solid;border-top:0px" id="cboxform6-620417"></iframe>';cbload=true;}cbdiv.style.display="block";cbbut.innerHTML="关闭留言板";}else{cbdiv.style.display="none";cbbut.innerHTML="<b>打开留言板</b>";}cbvis=!cbvis;}	

$(function(){

	if($('#slideshow').length > 0){		//判断是否是首页

		$('.reel').append('<div class="slide"><img src="images/2.jpg" width="726" height="335" alt="GooglePlus" /></div>').
			append('<div class="slide"><img src="images/1.png" width="726" height="335" alt="GoogleDoc" /></div>').
			append('<div class="slide"><img src="images/3.png" width="726" height="335" alt="GoogleCode" /></div>').
			append('<div class="slide"><img src="images/4.png" width="726" height="335" alt="SkyDrive" /></div>');

		$('#foobar').slidertron({
			viewerSelector:			'.viewer',
			reelSelector:			'.viewer .reel',
			slidesSelector:			'.viewer .reel .slide',
			navPreviousSelector:	'.previous',
			navNextSelector:		'.next',
			navFirstSelector:		'.first',
			navLastSelector:		'.last'
		});

		//引用标签云
		var so = new SWFObject("images/tagcloud.swf", "tagcloud", "240", "240", "7", "#ffffff");so.addParam("wmode", "transparent");so.addVariable("tcolor", "0x2A00FF");so.addVariable("tcolor2", "0x2ABF00");so.addVariable("hicolor", "0x5291CC");so.addVariable("mode", "tags");so.addVariable("distr", "true");so.addVariable("tspeed", "100");
		// so.addVariable("xmlpath", "../doc/tagcloud.xml"); 用xml 就不能用so.addVariable("mode", "tags");
		so.addVariable("tagcloud", "<tags><a href='http://www.aceyo.com' style='9' target='_blank'>Interceptor</a><a href='http://www.aceyo.com' style='8' target='_blank'>Filter</a><a href='http://www.aceyo.com' style='10' target='_blank'>Favicon</a><a href='http://www.aceyo.com' style='12' target='_blank'>HTML5</a><a href='http://www.aceyo.com' style='13' target='_blank'>Cache</a><a href='http://www.aceyo.com' style='16' target='_blank'>HtmlParser</a><a href='http://www.aceyo.com' style='18' target='_blank' color='0xff88ff'>SQLite</a><a href='http://www.aceyo.com' style='17' target='_blank'>FreeMarker</a><a href='http://www.aceyo.com' style='9' target='_blank'>JQuery</a><a href='http://www.aceyo.com' style='22' target='_blank'>GZip</a><a href='http://www.aceyo.com' style='15' target='_blank'>Ajax</a><a href='http://www.aceyo.com' style='21' target='_blank'>xhEditor</a><a href='http://www.aceyo.com' style='19' target='_blank'>UrlRewrite</a><a href='http://www.aceyo.com' style='17' target='_blank' color='0xff7722'>JavaScript</a><a href='http://www.aceyo.com' style='16' target='_blank'>CSS</a><a href='http://www.aceyo.com' style='14' target='_blank'>Log4j</a><a href='http://www.aceyo.com' style='14' target='_blank'>Ibatis</a><a href='http://www.aceyo.com' style='12' target='_blank' color='0xeeee22'>Struts2</a><a href='http://www.aceyo.com' style='9' target='_blank' color='0xff0099'>www.aceyo.com</a></tags>");
		so.write("tagcloudflashcontent");

	}

	if($('#hamster').length > 0){	//about页
		var so = new SWFObject("images/hamster.swf", "hamster", "240", "240", "7", "#fff");so.addParam("wmode", "transparent");
		so.write("hamster");
	}

	if($('#waterwheel-carousel-default').length > 0){	//gallery页
		$("#waterwheel-carousel-default").waterwheelCarousel({autoPlay: 1500});
	}
	
	// google+
	$.getScript("https://apis.google.com/js/plusone.js");

	$('#footer').after('<a href="javascript:void(0)" id="cboxbutton" onclick="togglecbox()"><b>打开留言板</b></a><div id="cboxdiv"></div>');
	togglecbox();
});