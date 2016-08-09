/*
 * HTML5 Sortable jQuery Plugin
 * https://github.com/voidberg/html5sortable
 *
 * Original code copyright 2012 Ali Farhadi.
 * This version is mantained by Alexandru Badiu <andu@ctrlz.ro> & Lukas Oppermann <lukas@vea.re>
 *
 *
 * Released under the MIT license.
 */
!function(e,t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):e.sortable=t(e.jQuery)}(this,function(e){"use strict";var t,a,r=e(),n=[],i=function(e){e.off("dragstart.h5s"),e.off("dragend.h5s"),e.off("selectstart.h5s"),e.off("dragover.h5s"),e.off("dragenter.h5s"),e.off("drop.h5s")},o=function(e){e.off("dragover.h5s"),e.off("dragenter.h5s"),e.off("drop.h5s")},d=function(e,t){e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text",""),e.dataTransfer.setDragImage&&e.dataTransfer.setDragImage(t.item,t.x,t.y)},s=function(e,t){return t.x||(t.x=parseInt(e.pageX-t.draggedItem.offset().left)),t.y||(t.y=parseInt(e.pageY-t.draggedItem.offset().top)),t},l=function(e){return{item:e[0],draggedItem:e}},f=function(e,t){var a=l(t);a=s(e,a),d(e,a)},h=function(e,t){return"undefined"==typeof e?t:e},g=function(e){e.removeData("opts"),e.removeData("connectWith"),e.removeData("items"),e.removeAttr("aria-dropeffect")},c=function(e){e.removeAttr("aria-grabbed"),e.removeAttr("draggable"),e.removeAttr("role")},u=function(e,t){return e[0]===t[0]?!0:void 0!==e.data("connectWith")?e.data("connectWith")===t.data("connectWith"):!1},p=function(e){var t=e.data("opts")||{},a=e.children(t.items),r=t.handle?a.find(t.handle):a;o(e),g(e),r.off("mousedown.h5s"),i(a),c(a)},m=function(t){var a=t.data("opts"),r=t.children(a.items),n=a.handle?r.find(a.handle):r;t.attr("aria-dropeffect","move"),n.attr("draggable","true");var i=(document||window.document).createElement("span");"function"!=typeof i.dragDrop||a.disableIEFix||n.on("mousedown.h5s",function(){-1!==r.index(this)?this.dragDrop():e(this).parents(a.items)[0].dragDrop()})},v=function(e){var t=e.data("opts"),a=e.children(t.items),r=t.handle?a.find(t.handle):a;e.attr("aria-dropeffect","none"),r.attr("draggable",!1),r.off("mousedown.h5s")},b=function(e){var t=e.data("opts"),a=e.children(t.items),r=t.handle?a.find(t.handle):a;i(a),r.off("mousedown.h5s"),o(e)},x=function(i,o){var s=e(i),l=String(o);return o=e.extend({connectWith:!1,placeholder:null,dragImage:null,disableIEFix:!1,placeholderClass:"sortable-placeholder",draggingClass:"sortable-dragging",hoverClass:!1},o),s.each(function(){var i=e(this);if(/enable|disable|destroy/.test(l))return void x[l](i);o=h(i.data("opts"),o),i.data("opts",o),b(i);var s,g,c,p=i.children(o.items),v=null===o.placeholder?e("<"+(/^ul|ol$/i.test(this.tagName)?"li":"div")+' class="'+o.placeholderClass+'"/>'):e(o.placeholder).addClass(o.placeholderClass);if(!i.attr("data-sortable-id")){var I=n.length;n[I]=i,i.attr("data-sortable-id",I),p.attr("data-item-sortable-id",I)}if(i.data("items",o.items),r=r.add(v),o.connectWith&&i.data("connectWith",o.connectWith),m(i),p.attr("role","option"),p.attr("aria-grabbed","false"),o.hoverClass){var C="sortable-over";"string"==typeof o.hoverClass&&(C=o.hoverClass),p.hover(function(){e(this).addClass(C)},function(){e(this).removeClass(C)})}p.on("dragstart.h5s",function(r){r.stopImmediatePropagation(),o.dragImage?(d(r.originalEvent,{item:o.dragImage,x:0,y:0}),console.log("WARNING: dragImage option is deprecated and will be removed in the future!")):f(r.originalEvent,e(this),o.dragImage),t=e(this),t.addClass(o.draggingClass),t.attr("aria-grabbed","true"),s=t.index(),a=t.height(),g=e(this).parent(),t.parent().triggerHandler("sortstart",{item:t,placeholder:v,startparent:g})}),p.on("dragend.h5s",function(){t&&(t.removeClass(o.draggingClass),t.attr("aria-grabbed","false"),t.show(),r.detach(),c=e(this).parent(),t.parent().triggerHandler("sortstop",{item:t,startparent:g}),(s!==t.index()||g.get(0)!==c.get(0))&&t.parent().triggerHandler("sortupdate",{item:t,index:c.children(c.data("items")).index(t),oldindex:p.index(t),elementIndex:t.index(),oldElementIndex:s,startparent:g,endparent:c}),t=null,a=null)}),e(this).add([v]).on("drop.h5s",function(a){return u(i,e(t).parent())?(a.stopPropagation(),r.filter(":visible").after(t),t.trigger("dragend.h5s"),!1):void 0}),p.add([this]).on("dragover.h5s dragenter.h5s",function(n){if(u(i,e(t).parent())){if(n.preventDefault(),n.originalEvent.dataTransfer.dropEffect="move",p.is(this)){var d=e(this).height();if(o.forcePlaceholderSize&&v.height(a),d>a){var s=d-a,l=e(this).offset().top;if(v.index()<e(this).index()&&n.originalEvent.pageY<l+s)return!1;if(v.index()>e(this).index()&&n.originalEvent.pageY>l+d-s)return!1}t.hide(),v.index()<e(this).index()?e(this).after(v):e(this).before(v),r.not(v).detach()}else r.is(this)||e(this).children(o.items).length||(r.detach(),e(this).append(v));return!1}})})};return x.destroy=function(e){p(e)},x.enable=function(e){m(e)},x.disable=function(e){v(e)},e.fn.sortable=function(e){return x(this,e)},x});
var $exeSortableLists = {
	init : function(){
		var activity = $(".exe-sortableList");
		var lists = $("ul",activity);
		if (lists.length==1) {
			lists.css("visibility","hidden");
			lists.each(
				function(i){
					var lis = [];
					$("LI",this).each(function(){
						lis.push(this.innerHTML);
					});
					lis = $exeSortableLists.randomizeArray(lis);
					$exeSortableLists.getListHTML(activity,lis,this,i);
				}
			);
			var style = '\
			<style type="text/css">\
				.exe-sortableList-options{margin:0;padding:0;list-style:none}\
				.exe-sortableList-options li{background:#FFF;color:#333;padding:.5em 65px .5em 10px;margin:0 0 .5em 0!important;border:1px solid #CCC;border-radius:4px;;list-style-image:none!important}\
				.exe-sortableList .first .up,.exe-sortableList-options .last .down{visibility:hidden}\
				.exe-sortableList li{position:relative}\
				.exe-sortableList li a{display:block;width:21px;height:21px;background:url('+$exeSortableLists.getPath()+'sortable-lists.png) no-repeat 0 0;position:absolute;right:33px;top:6px}\
				.exe-sortableList li a:hover,.exe-sortableList li a:focus{background-position:0 -21px}\
				.exe-sortableList li .down{background-position:-21px 0;right:6px}\
				.exe-sortableList li .down:hover{background-position:-21px -21px}\
			</style>\
			';
			$("HEAD").append(style)
		}
	},
	getPath : function(){
		var path = "";
		if (typeof($exeAuthoring)!= 'undefined') path = '/scripts/idevices/sortable-lists/export/files/';
		return path;
	},
	getLinksHTML : function(i,listOrder){
		return '<span> <a href="#" class="up" onclick="$exeSortableLists.sortList(this,'+i+','+(i-1)+',\''+listOrder+'\');return false" title="Subir ('+(i+1)+' &rarr; '+i+')"><span class="sr-av">Subir</span></a> <a href="#" class="down" onclick="$exeSortableLists.sortList(this,'+i+','+(i+1)+',\''+listOrder+'\');return false" title="Bajar ('+(i+1)+' &rarr; '+(i+2)+')"><span class="sr-av">Bajar</span></a></span>';
	},
	getListLinks : function(listOrder) {
		var ul = $("#exe-sortableList-"+listOrder);
		var lis = $("li",ul);
		$("SPAN",ul).remove();
		lis.each(function(i){
			this.className = "";
			if (i==0) this.className = "first";
			if ((i+1)==lis.length) this.className = "last";
			this.innerHTML += $exeSortableLists.getLinksHTML(i,listOrder);
		});
	},
	sortList : function(e,a,b,listOrder){ // LI - FROM - TO
		var list = $("#exe-sortableList-"+listOrder);
		list.sortable("destroy");
		var lis = $("LI",list);
		if (b<0 || b>(lis.length-1)) return false;
		var newList = [];
		var li, prev, current, next;
		for (var i=0;i<lis.length;i++) {
			li = lis[i].innerHTML.split("<span>")[0].split("<SPAN>")[0];
			newList.push(li);
			if (i==(a-1)) prev = li;
			else if (i==a) current = li;
			else if (i==(a+1)) next = li;
		}
		newList[b] = current;
		if (b<a) { // Up
			newList[a] = prev;
		} else { // Down
			newList[a] = next;
		}
		list.html($exeSortableLists.getULhtml(newList,listOrder)).sortable();
	},	
	getULhtml : function(lis,listOrder){
		html = '';
		for (var i=0;i<lis.length;i++) {
			html += '<li>'+lis[i]+'</li>';
		}
		$("#exe-sortableList-"+listOrder).html(html).sortable();
		$exeSortableLists.getListLinks(listOrder);
	},
	getListHTML : function(activity,lis,list,listOrder) {
		var html = '<ul class="exe-sortableList-options" id="exe-sortableList-'+listOrder+'">';
		for (var i=0;i<lis.length;i++) {
			html += '<li>'+lis[i]+'</li>';
		}
		html += "</ul>";
		html += '<p><input type="button" class="feedbackbutton" value="'+$("P",activity).eq(1).text()+'" onclick="$exeSortableLists.check(this,'+listOrder+')" /></p>';
		html += '<div id="exe-sortableList-'+listOrder+'-feedback"></div>';
		// html = $(html);
		$(list).hide().attr("id","exe-sortableListResults-"+listOrder).before(html);
		$("#exe-sortableList-"+listOrder).sortable().bind('sortupdate', function(e, ui) {
			$exeSortableLists.getListLinks(listOrder);
		});			
		$exeSortableLists.getListLinks(listOrder);
	},
	check : function(e,listOrder){
		var activity = $(e).parents(".exe-sortableList");
		var right = true;
		var userList = $("#exe-sortableList-"+listOrder);
		var rightAnswers = $("#exe-sortableListResults-"+listOrder);
		var rightAnswersLis = $("li",rightAnswers);
		$("LI",userList).each(function(i){
			var currentText = $(this).html().split("<span>")[0].split("<SPAN>")[0];
			if (currentText != rightAnswersLis.eq(i).html()) right = false;
		});
		var feedback = $('#exe-sortableList-'+listOrder+'-feedback');
		if (right) feedback.html("<p>"+$(".exe-sortableList-rightText",activity).text()+"</p>");
		else feedback.html("<p>"+$(".exe-sortableList-wrongText",activity).text()+"</p><ul>"+rightAnswers.html()+"</ul>");
	},
	randomizeArray : function(o){
		var original = [];
		for (var w=0;w<o.length;w++) original.push(o[w]);
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		var hasChanged = false;
		for (var y=0;y<o.length;y++){
			if (!hasChanged && original[y]!=o[y]) hasChanged = true;
		}
		if (hasChanged) return o;
		else return this.randomizeArray(original);
	}
}
$(function(){
	$exeSortableLists.init();
});