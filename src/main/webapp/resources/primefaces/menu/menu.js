PrimeFaces.widget.Menu=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);if(this.cfg.overlay){this.initOverlay()}this.keyboardTarget=this.jq.children(".ui-helper-hidden-accessible")},initOverlay:function(){var c=this;this.trigger=PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.trigger);this.trigger.data("primefaces-overlay-target",true).find("*").data("primefaces-overlay-target",true);if(this.jq.length>1){$(document.body).children(this.jqId).remove();this.jq=$(this.jqId);this.jq.appendTo(document.body)}else{if(this.jq.parent().is(":not(body)")){this.jq.appendTo(document.body)}}this.cfg.pos={my:this.cfg.my,at:this.cfg.at,of:this.trigger};this.trigger.bind(this.cfg.triggerEvent+".ui-menu",function(f){var d=$(this);if(c.jq.is(":visible")){c.hide()}else{c.show();if(d.is(":button")){d.addClass("ui-state-focus")}f.preventDefault()}});var b="mousedown."+this.id;$(document.body).off(b).on(b,function(f){if(c.jq.is(":hidden")){return}var d=$(f.target);if(d.is(c.trigger.get(0))||c.trigger.has(d).length>0){return}var g=c.jq.offset();if(f.pageX<g.left||f.pageX>g.left+c.jq.width()||f.pageY<g.top||f.pageY>g.top+c.jq.height()){c.hide(f)}});var a="resize."+this.id;$(window).off(a).on(a,function(){if(c.jq.is(":visible")){c.align()}});this.setupDialogSupport()},setupDialogSupport:function(){var a=this.trigger.parents(".ui-dialog:first");if(a.length==1){this.jq.css("position","fixed")}},show:function(){this.align();this.jq.css("z-index",++PrimeFaces.zindex).show()},hide:function(){this.jq.fadeOut("fast");if(this.trigger&&this.trigger.is(":button")){this.trigger.removeClass("ui-state-focus")}},align:function(){var b=this.jq.css("position")=="fixed",c=$(window),a=b?"-"+c.scrollLeft()+" -"+c.scrollTop():null;this.cfg.pos.offset=a;this.jq.css({left:"",top:""}).position(this.cfg.pos)}});PrimeFaces.widget.TieredMenu=PrimeFaces.widget.Menu.extend({init:function(a){this._super(a);this.cfg.toggleEvent=this.cfg.toggleEvent||"hover";this.links=this.jq.find("a.ui-menuitem-link:not(.ui-state-disabled)");this.rootLinks=this.jq.find("> ul.ui-menu-list > .ui-menuitem > .ui-menuitem-link");this.bindEvents()},bindEvents:function(){this.bindItemEvents();this.bindKeyEvents();this.bindDocumentHandler()},bindItemEvents:function(){if(this.cfg.toggleEvent==="hover"){this.bindHoverModeEvents()}else{if(this.cfg.toggleEvent==="click"){this.bindClickModeEvents()}}},bindHoverModeEvents:function(){var a=this;this.links.mouseenter(function(){var b=$(this),c=b.parent();var d=c.siblings(".ui-menuitem-active");if(d.length===1){d.find("li.ui-menuitem-active").each(function(){a.deactivate($(this))});a.deactivate(d)}if(a.cfg.autoDisplay||a.active){if(c.hasClass("ui-menuitem-active")){a.reactivate(c)}else{a.activate(c)}}else{a.highlight(c)}});this.rootLinks.click(function(f){var c=$(this),d=c.parent(),b=d.children("ul.ui-menu-child");a.itemClick=true;if(b.length===1){if(b.is(":visible")){a.active=false;a.deactivate(d)}else{a.active=true;a.highlight(d);a.showSubmenu(d,b)}}});this.links.filter(".ui-submenu-link").click(function(b){a.itemClick=true;b.preventDefault()});this.jq.find("ul.ui-menu-list").mouseleave(function(b){if(a.activeitem){a.deactivate(a.activeitem)}b.stopPropagation()})},bindClickModeEvents:function(){var a=this;this.links.mouseenter(function(){var b=$(this).parent();if(!b.hasClass("ui-menuitem-active")){b.addClass("ui-menuitem-highlight").children("a.ui-menuitem-link").addClass("ui-state-hover")}}).mouseleave(function(){var b=$(this).parent();if(!b.hasClass("ui-menuitem-active")){b.removeClass("ui-menuitem-highlight").children("a.ui-menuitem-link").removeClass("ui-state-hover")}});this.links.filter(".ui-submenu-link").on("click.tieredMenu",function(f){var c=$(this),d=c.parent(),b=d.children("ul.ui-menu-child");a.itemClick=true;var g=d.siblings(".ui-menuitem-active");if(g.length){g.find("li.ui-menuitem-active").each(function(){a.deactivate($(this))});a.deactivate(g)}if(b.length){if(b.is(":visible")){a.deactivate(d);d.addClass("ui-menuitem-highlight").children("a.ui-menuitem-link").addClass("ui-state-hover")}else{d.addClass("ui-menuitem-active").children("a.ui-menuitem-link").removeClass("ui-state-hover").addClass("ui-state-active");a.showSubmenu(d,b)}}f.preventDefault()})},bindKeyEvents:function(){},bindDocumentHandler:function(){var b=this,a="click."+this.id;$(document.body).off(a).on(a,function(c){if(b.itemClick){b.itemClick=false;return}b.reset()})},deactivate:function(b,a){this.activeitem=null;b.children("a.ui-menuitem-link").removeClass("ui-state-hover ui-state-active");b.removeClass("ui-menuitem-active ui-menuitem-highlight");if(a){b.children("ul.ui-menu-child").fadeOut("fast")}else{b.children("ul.ui-menu-child").hide()}},activate:function(b){this.highlight(b);var a=b.children("ul.ui-menu-child");if(a.length==1){this.showSubmenu(b,a)}},reactivate:function(d){this.activeitem=d;var c=d.children("ul.ui-menu-child"),b=c.children("li.ui-menuitem-active:first"),a=this;if(b.length==1){a.deactivate(b)}},highlight:function(a){this.activeitem=a;a.children("a.ui-menuitem-link").addClass("ui-state-hover");a.addClass("ui-menuitem-active")},showSubmenu:function(b,a){var c={my:"left top",at:"right top",of:b,collision:"flipfit"};a.css("z-index",++PrimeFaces.zindex).show().position(c)},reset:function(){var a=this;this.active=false;this.jq.find("li.ui-menuitem-active").each(function(){a.deactivate($(this),true)})}});PrimeFaces.widget.Menubar=PrimeFaces.widget.TieredMenu.extend({showSubmenu:function(b,a){var c=null;if(b.parent().hasClass("ui-menu-child")){c={my:"left top",at:"right top",of:b,collision:"flipfit"}}else{c={my:"left top",at:"left bottom",of:b,collision:"flipfit"}}a.css("z-index",++PrimeFaces.zindex).show().position(c)},bindKeyEvents:function(){var a=this;this.keyboardTarget.on("focus.menubar",function(b){a.highlight(a.links.eq(0).parent())}).on("blur.menubar",function(){a.reset()}).on("keydown.menu",function(j){var h=a.activeitem;if(!h){return}var g=!h.closest("ul").hasClass("ui-menu-child"),l=$.ui.keyCode;switch(j.which){case l.LEFT:if(g){var k=h.prevAll(".ui-menuitem:not(.ui-menubar-options):first");if(k.length){a.deactivate(h);a.highlight(k)}j.preventDefault()}else{if(h.hasClass("ui-menu-parent")&&h.children(".ui-menu-child").is(":visible")){a.deactivate(h);a.highlight(h)}else{var f=h.parent().parent();a.deactivate(h);a.deactivate(f);a.highlight(f)}}break;case l.RIGHT:if(g){var c=h.nextAll(".ui-menuitem:not(.ui-menubar-options):first");if(c.length){a.deactivate(h);a.highlight(c)}j.preventDefault()}else{if(h.hasClass("ui-menu-parent")){var b=h.children(".ui-menu-child");if(b.is(":visible")){a.highlight(b.children(".ui-menuitem:first"))}else{a.activate(h)}}}break;case l.UP:if(!g){var k=h.prev(".ui-menuitem");if(k.length){a.deactivate(h);a.highlight(k)}}j.preventDefault();break;case l.DOWN:if(g){var b=h.children("ul.ui-menu-child");if(b.is(":visible")){a.highlight(b.children(".ui-menuitem:first"))}else{a.activate(h)}}else{var c=h.next(".ui-menuitem");if(c.length){a.deactivate(h);a.highlight(c)}}j.preventDefault();break;case l.ENTER:case l.NUMPAD_ENTER:var i=h.children(".ui-menuitem-link");i.trigger("click");a.jq.blur();var d=i.attr("href");if(d&&d!=="#"){window.location.href=d}j.preventDefault();break}})}});PrimeFaces.widget.SlideMenu=PrimeFaces.widget.Menu.extend({init:function(c){this._super(c);this.submenus=this.jq.find("ul.ui-menu-list");this.wrapper=this.jq.children("div.ui-slidemenu-wrapper");this.content=this.wrapper.children("div.ui-slidemenu-content");this.rootList=this.content.children("ul.ui-menu-list");this.links=this.jq.find("a.ui-menuitem-link:not(.ui-state-disabled)");this.backward=this.wrapper.children("div.ui-slidemenu-backward");this.rendered=false;this.stack=[];this.jqWidth=this.jq.width();if(!this.jq.hasClass("ui-menu-dynamic")){if(this.jq.is(":not(:visible)")){var a=this.jq.closest(".ui-hidden-container"),b=a.data("widget"),e=this;if(b){var d=PF(b);if(d){d.addOnshowHandler(function(){return e.render()})}}}else{this.render()}}this.bindEvents()},bindEvents:function(){var a=this;this.links.mouseenter(function(){$(this).addClass("ui-state-hover")}).mouseleave(function(){$(this).removeClass("ui-state-hover")}).click(function(d){var c=$(this),b=c.next();if(b.length){a.forward(b);d.preventDefault()}});this.backward.click(function(){a.back()})},forward:function(c){var a=this;this.push(c);var b=-1*(this.depth()*this.jqWidth);c.show().css({left:this.jqWidth});this.rootList.animate({left:b},500,"easeInOutCirc",function(){if(a.backward.is(":hidden")){a.backward.fadeIn("fast")}})},back:function(){if(!this.rootList.is(":animated")){var a=this,c=this.pop(),d=this.depth();var b=-1*(d*this.jqWidth);this.rootList.animate({left:b},500,"easeInOutCirc",function(){if(c){c.hide()}if(d==0){a.backward.fadeOut("fast")}})}},push:function(a){this.stack.push(a)},pop:function(){return this.stack.length!==0?this.stack.pop():null},last:function(){return this.stack[this.stack.length-1]},depth:function(){return this.stack.length},render:function(){this.submenus.width(this.jq.width());this.wrapper.height(this.rootList.outerHeight(true)+this.backward.outerHeight(true));this.content.height(this.rootList.outerHeight(true));this.rendered=true},show:function(){this.align();this.jq.css("z-index",++PrimeFaces.zindex).show();if(!this.rendered){this.render()}}});PrimeFaces.widget.PlainMenu=PrimeFaces.widget.Menu.extend({init:function(a){this._super(a);this.menuitemLinks=this.jq.find(".ui-menuitem-link:not(.ui-state-disabled)");this.bindEvents();if(this.cfg.toggleable){this.collapsedIds=[];this.stateKey="menu-"+this.id;this.restoreState()}},bindEvents:function(){var a=this;this.menuitemLinks.mouseenter(function(b){if(a.jq.is(":focus")){a.jq.blur()}$(this).addClass("ui-state-hover")}).mouseleave(function(b){$(this).removeClass("ui-state-hover")});if(this.cfg.overlay){this.menuitemLinks.click(function(){a.hide()})}if(this.cfg.toggleable){this.jq.find("> .ui-menu-list > .ui-widget-header").on("mouseover.menu",function(){$(this).addClass("ui-state-hover")}).on("mouseout.menu",function(){$(this).removeClass("ui-state-hover")}).on("click.menu",function(b){var c=$(this);if(c.find("> h3 > .ui-icon").hasClass("ui-icon-triangle-1-s")){a.collapseSubmenu(c,true)}else{a.expandSubmenu(c,true)}PrimeFaces.clearSelection();b.preventDefault()})}this.keyboardTarget.on("focus.menu",function(){a.menuitemLinks.eq(0).addClass("ui-state-hover")}).on("blur.menu",function(){a.menuitemLinks.filter(".ui-state-hover").removeClass("ui-state-hover")}).on("keydown.menu",function(h){var f=a.menuitemLinks.filter(".ui-state-hover"),g=$.ui.keyCode;switch(h.which){case g.UP:var c=f.parent().prevAll(".ui-menuitem:first");if(c.length){f.removeClass("ui-state-hover");c.children(".ui-menuitem-link").addClass("ui-state-hover")}h.preventDefault();break;case g.DOWN:var b=f.parent().nextAll(".ui-menuitem:first");if(b.length){f.removeClass("ui-state-hover");b.children(".ui-menuitem-link").addClass("ui-state-hover")}h.preventDefault();break;case g.ENTER:case g.NUMPAD_ENTER:f.trigger("click");a.jq.blur();var d=f.attr("href");if(d&&d!=="#"){window.location.href=d}h.preventDefault();break}})},collapseSubmenu:function(c,b){var a=c.nextUntil("li.ui-widget-header");c.attr("aria-expanded",false).find("> h3 > .ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");a.hide();if(b){this.collapsedIds.push(c.attr("id"));this.saveState()}},expandSubmenu:function(d,b){var a=d.nextUntil("li.ui-widget-header");d.attr("aria-expanded",false).find("> h3 > .ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");a.show();if(b){var c=d.attr("id");this.collapsedIds=$.grep(this.collapsedIds,function(e){return(e!==c)});this.saveState()}},saveState:function(){PrimeFaces.setCookie(this.stateKey,this.collapsedIds.join(","))},restoreState:function(){var b=PrimeFaces.getCookie(this.stateKey);if(b){this.collapsedIds=b.split(",");for(var a=0;a<this.collapsedIds.length;a++){this.collapseSubmenu($(PrimeFaces.escapeClientId(this.collapsedIds[a])),false)}}},clearState:function(){PrimeFaces.setCookie(this.stateKey,null)}});PrimeFaces.widget.MenuButton=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.menuId=this.jqId+"_menu";this.button=this.jq.children("button");this.menu=this.jq.children(".ui-menu");this.menuitems=this.jq.find(".ui-menuitem");this.cfg.disabled=this.button.is(":disabled");if(!this.cfg.disabled){this.bindEvents();this.appendPanel()}},bindEvents:function(){var c=this;this.button.mouseover(function(){if(!c.button.hasClass("ui-state-focus")){c.button.addClass("ui-state-hover")}}).mouseout(function(){if(!c.button.hasClass("ui-state-focus")){c.button.removeClass("ui-state-hover ui-state-active")}}).mousedown(function(){$(this).removeClass("ui-state-focus ui-state-hover").addClass("ui-state-active")}).mouseup(function(){var d=$(this);d.removeClass("ui-state-active");if(c.menu.is(":visible")){d.addClass("ui-state-hover");c.hide()}else{d.addClass("ui-state-focus");c.show()}}).focus(function(){$(this).addClass("ui-state-focus")}).blur(function(){$(this).removeClass("ui-state-focus")});this.button.data("primefaces-overlay-target",true).find("*").data("primefaces-overlay-target",true);this.menuitems.mouseover(function(f){var d=$(this);if(!d.hasClass("ui-state-disabled")){d.addClass("ui-state-hover")}}).mouseout(function(d){$(this).removeClass("ui-state-hover")}).click(function(){c.button.removeClass("ui-state-focus");c.hide()});var b="mousedown."+this.id;$(document.body).off(b).on(b,function(f){if(c.menu.is(":hidden")||c.cfg.disabled){return}var d=$(f.target);if(d.is(c.button)||c.button.has(d).length>0){return}var g=c.menu.offset();if(f.pageX<g.left||f.pageX>g.left+c.menu.width()||f.pageY<g.top||f.pageY>g.top+c.menu.height()){c.button.removeClass("ui-state-focus ui-state-hover");c.hide()}});var a="resize."+this.id;$(window).unbind(a).bind(a,function(){if(c.menu.is(":visible")){c.alignPanel()}});this.button.attr("role","button").attr("aria-disabled",this.button.is(":disabled"))},appendPanel:function(){var a=this.cfg.appendTo?PrimeFaces.expressions.SearchExpressionFacade.resolveComponentsAsSelector(this.cfg.appendTo):$(document.body);if(!a.is(this.jq)){a.children(this.menuId).remove();this.menu.appendTo(a)}},show:function(){this.alignPanel();this.menu.show()},hide:function(){this.menu.fadeOut("fast")},alignPanel:function(){this.menu.css({left:"",top:"","z-index":++PrimeFaces.zindex});if(this.menu.parent().is(this.jq)){this.menu.css({left:0,top:this.jq.innerHeight()})}else{this.menu.position({my:"left top",at:"left bottom",of:this.button})}}});PrimeFaces.widget.ContextMenu=PrimeFaces.widget.TieredMenu.extend({init:function(b){b.autoDisplay=true;this._super(b);this.cfg.selectionMode=this.cfg.selectionMode||"multiple";var a=this,d=(this.cfg.target===undefined);this.cfg.event=this.cfg.event||"contextmenu";this.jqTargetId=d?document:PrimeFaces.escapeClientId(this.cfg.target);this.jqTarget=$(this.jqTargetId);if(!this.jq.parent().is(document.body)){this.jq.appendTo("body")}if(d){$(document).off("contextmenu.ui-contextmenu").on("contextmenu.ui-contextmenu",function(g){a.show(g)})}else{var c=false;if(this.cfg.targetWidgetVar){var f=PrimeFaces.widgets[this.cfg.targetWidgetVar];if(f){if(typeof f.bindContextMenu==="function"){f.bindContextMenu(this,f,this.jqTargetId,this.cfg);c=true}}else{PrimeFaces.warn("ContextMenu targets a widget which is not available yet. Please place the contextMenu after the target component. targetWidgetVar: "+this.cfg.targetWidgetVar)}}if(c===false){var e=this.cfg.event+".ui-contextmenu";$(document).off(e,this.jqTargetId).on(e,this.jqTargetId,null,function(g){a.show(g)})}}},refresh:function(b){var a=PrimeFaces.escapeClientId(b.id),c=$(a);if(c.length>1){$(document.body).children(a).remove()}this.init(b)},bindItemEvents:function(){this._super();var a=this;this.links.bind("click",function(c){var b=$(c.target),d=b.hasClass("ui-submenu-link")?b:b.closest(".ui-submenu-link");if(d.length){return}a.hide()})},bindDocumentHandler:function(){var b=this,a="click."+this.id;$(document.body).off(a).on(a,function(f){var d=$(f.target),c=d.hasClass("ui-menuitem-link")?d:d.closest(".ui-menuitem-link");if(b.jq.is(":hidden")||c.is(".ui-menuitem-link,.ui-state-disabled")){return}b.hide()})},show:function(h){if(this.cfg.targetFilter&&$(h.target).is(":not("+this.cfg.targetFilter+")")){return}$(document.body).children(".ui-contextmenu:visible").hide();if(this.cfg.beforeShow){var g=this.cfg.beforeShow.call(this,h);if(g===false){return}}var f=$(window),d=h.pageX,c=h.pageY,b=this.jq.outerWidth(),a=this.jq.outerHeight();if((d+b)>(f.width())+f.scrollLeft()){d=d-b}if((c+a)>(f.height()+f.scrollTop())){c=c-a}this.jq.css({left:d,top:c,"z-index":++PrimeFaces.zindex}).show();h.preventDefault();h.stopPropagation()},hide:function(){var a=this;this.jq.find("li.ui-menuitem-active").each(function(){a.deactivate($(this),true)});this.jq.fadeOut("fast")},isVisible:function(){return this.jq.is(":visible")},getTarget:function(){return this.jqTarget}});PrimeFaces.widget.MegaMenu=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.cfg.vertical=this.jq.hasClass("ui-megamenu-vertical");this.rootList=this.jq.children("ul.ui-menu-list");this.rootLinks=this.rootList.find("> li.ui-menuitem > a.ui-menuitem-link:not(.ui-state-disabled)");this.subLinks=this.jq.find(".ui-menu-child a.ui-menuitem-link:not(.ui-state-disabled)");this.keyboardTarget=this.jq.children(".ui-helper-hidden-accessible");if(this.cfg.activeIndex!==undefined){this.rootLinks.eq(this.cfg.activeIndex).addClass("ui-state-hover").closest("li.ui-menuitem").addClass("ui-menuitem-active")}this.bindEvents();this.bindKeyEvents()},bindEvents:function(){var a=this;this.rootLinks.mouseenter(function(f){var b=$(this),d=b.parent();var c=d.siblings(".ui-menuitem-active");if(c.length>0){c.find("li.ui-menuitem-active").each(function(){a.deactivate($(this))});a.deactivate(c,false)}if(a.cfg.autoDisplay||a.active){a.activate(d)}else{a.highlight(d)}});if(this.cfg.autoDisplay===false){this.rootLinks.data("primefaces-megamenu",this.id).find("*").data("primefaces-megamenu",this.id);this.rootLinks.click(function(f){var c=$(this),d=c.parent(),b=c.next();if(b.length===1){if(b.is(":visible")){a.active=false;a.deactivate(d,true)}else{a.active=true;a.activate(d)}}f.preventDefault()})}else{this.rootLinks.filter(".ui-submenu-link").click(function(b){b.preventDefault()})}this.subLinks.mouseenter(function(){if(a.activeitem&&!a.isRootLink(a.activeitem)){a.deactivate(a.activeitem)}a.highlight($(this).parent())}).mouseleave(function(){if(a.activeitem&&!a.isRootLink(a.activeitem)){a.deactivate(a.activeitem)}$(this).removeClass("ui-state-hover")});this.rootList.mouseleave(function(c){var b=a.rootList.children(".ui-menuitem-active");if(b.length===1){a.deactivate(b,false)}});this.rootList.find("> li.ui-menuitem > ul.ui-menu-child").mouseleave(function(b){b.stopPropagation()});$(document.body).click(function(c){var b=$(c.target);if(b.data("primefaces-megamenu")===a.id){return}a.active=false;a.deactivate(a.rootList.children("li.ui-menuitem-active"),true)})},bindKeyEvents:function(){var a=this;this.keyboardTarget.on("focus.megamenu",function(b){a.highlight(a.rootLinks.eq(0).parent())}).on("blur.megamenu",function(){a.reset()}).on("keydown.megamenu",function(j){var h=a.activeitem;if(!h){return}var g=a.isRootLink(h),m=$.ui.keyCode;switch(j.which){case m.LEFT:if(g&&!a.cfg.vertical){var k=h.prevAll(".ui-menuitem:first");if(k.length){a.deactivate(h);a.highlight(k)}j.preventDefault()}else{if(h.hasClass("ui-menu-parent")&&h.children(".ui-menu-child").is(":visible")){a.deactivate(h);a.highlight(h)}else{var f=h.closest("ul.ui-menu-child").parent();if(f.length){a.deactivate(h);a.deactivate(f);a.highlight(f)}}}break;case m.RIGHT:if(g&&!a.cfg.vertical){var c=h.nextAll(".ui-menuitem:visible:first");if(c.length){a.deactivate(h);a.highlight(c)}j.preventDefault()}else{if(h.hasClass("ui-menu-parent")){var b=h.children(".ui-menu-child");if(b.is(":visible")){a.highlight(b.find("ul.ui-menu-list:visible > .ui-menuitem:visible:first"))}else{a.activate(h)}}}break;case m.UP:if(!g||a.cfg.vertical){var k=a.findPrevItem(h);if(k.length){a.deactivate(h);a.highlight(k)}}j.preventDefault();break;case m.DOWN:if(g&&!a.cfg.vertical){var b=h.children("ul.ui-menu-child");if(b.is(":visible")){var l=a.getFirstMenuList(b);a.highlight(l.children(".ui-menuitem:visible:first"))}else{a.activate(h)}}else{var c=a.findNextItem(h);if(c.length){a.deactivate(h);a.highlight(c)}}j.preventDefault();break;case m.ENTER:case m.NUMPAD_ENTER:var i=h.children(".ui-menuitem-link");i.trigger("click");a.jq.blur();var d=i.attr("href");if(d&&d!=="#"){window.location.href=d}a.deactivate(h);j.preventDefault();break;case m.ESCAPE:if(h.hasClass("ui-menu-parent")){var b=h.children("ul.ui-menu-list:visible");if(b.length>0){b.hide()}}else{var f=h.closest("ul.ui-menu-child").parent();if(f.length){a.deactivate(h);a.deactivate(f);a.highlight(f)}}j.preventDefault();break}})},findPrevItem:function(c){var b=c.prev(".ui-menuitem");if(!b.length){var a=c.closest("ul.ui-menu-list").prev(".ui-menu-list");if(!a.length){a=c.closest("td").prev("td").children(".ui-menu-list:visible:last")}if(a.length){b=a.find("li.ui-menuitem:visible:last")}}return b},findNextItem:function(c){var a=c.next(".ui-menuitem");if(!a.length){var b=c.closest("ul.ui-menu-list").next(".ui-menu-list");if(!b.length){b=c.closest("td").next("td").children(".ui-menu-list:visible:first")}if(b.length){a=b.find("li.ui-menuitem:visible:first")}}return a},getFirstMenuList:function(a){return a.find(".ui-menu-list:not(.ui-state-disabled):first")},isRootLink:function(b){var a=b.closest("ul");return a.parent().hasClass("ui-menu")},reset:function(){var a=this;this.active=false;this.jq.find("li.ui-menuitem-active").each(function(){a.deactivate($(this),true)})},deactivate:function(d,a){var c=d.children("a.ui-menuitem-link"),b=c.next();d.removeClass("ui-menuitem-active");c.removeClass("ui-state-hover");this.activeitem=null;if(b.length>0){if(a){b.fadeOut("fast")}else{b.hide()}}},highlight:function(b){var a=b.children("a.ui-menuitem-link");b.addClass("ui-menuitem-active");a.addClass("ui-state-hover");this.activeitem=b},activate:function(c){var a=c.children(".ui-menu-child"),b=this;b.highlight(c);if(a.length>0){b.showSubmenu(c,a)}},showSubmenu:function(b,a){var c=null;if(this.cfg.vertical){c={my:"left top",at:"right top",of:b,collision:"flipfit"}}else{c={my:"left top",at:"left bottom",of:b,collision:"flipfit"}}a.css("z-index",++PrimeFaces.zindex).show().position(c)}});PrimeFaces.widget.PanelMenu=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.headers=this.jq.find("> .ui-panelmenu-panel > h3.ui-panelmenu-header:not(.ui-state-disabled)");this.menuContent=this.jq.find("> .ui-panelmenu-panel > .ui-panelmenu-content");this.menuitemLinks=this.menuContent.find(".ui-menuitem-link:not(.ui-state-disabled)");this.menuText=this.menuitemLinks.find(".ui-menuitem-text");this.treeLinks=this.menuContent.find(".ui-menu-parent > .ui-menuitem-link:not(.ui-state-disabled)");this.focusedItem=null;this.menuText.attr("tabindex",-1);this.menuText.attr("role","menuitem");this.treeLinks.find("> .ui-menuitem-text").attr("aria-expanded",false);this.bindEvents();if(this.cfg.stateful){this.stateKey="panelMenu-"+this.id}this.restoreState()},bindEvents:function(){var a=this;this.headers.mouseover(function(){var b=$(this);if(!b.hasClass("ui-state-active")){b.addClass("ui-state-hover")}}).mouseout(function(){var b=$(this);if(!b.hasClass("ui-state-active")){b.removeClass("ui-state-hover")}}).click(function(b){var c=$(this);if(c.hasClass("ui-state-active")){a.collapseRootSubmenu($(this))}else{a.expandRootSubmenu($(this),false)}a.removeFocusedItem();c.focus();b.preventDefault()});this.menuitemLinks.mouseover(function(){$(this).addClass("ui-state-hover")}).mouseout(function(){$(this).removeClass("ui-state-hover")}).click(function(d){var c=$(this);a.focusItem(c.closest(".ui-menuitem"));var b=c.attr("href");if(b&&b!=="#"){window.location.href=b}d.preventDefault()});this.treeLinks.click(function(f){var d=$(this),c=d.parent(),b=d.next();if(b.is(":visible")){a.collapseTreeItem(c)}else{a.expandTreeItem(c,false)}f.preventDefault()});this.bindKeyEvents()},bindKeyEvents:function(){var b=this;if(PrimeFaces.env.isIE()){this.focusCheck=false}this.headers.on("focus.panelmenu",function(){$(this).addClass("ui-menuitem-outline")}).on("blur.panelmenu",function(){$(this).removeClass("ui-menuitem-outline ui-state-hover")}).on("keydown.panelmenu",function(f){var d=$.ui.keyCode,c=f.which;if(c===d.SPACE||c===d.ENTER||c===d.NUMPAD_ENTER){$(this).trigger("click");f.preventDefault()}});this.menuContent.on("mousedown.panelmenu",function(c){if($(c.target).is(":not(:input:enabled)")){c.preventDefault()}}).on("focus.panelmenu",function(){if(!b.focusedItem){b.focusItem(b.getFirstItemOfContent($(this)));if(PrimeFaces.env.isIE()){b.focusCheck=false}}});this.menuContent.off("keydown.panelmenu blur.panelmenu").on("keydown.panelmenu",function(k){if(!b.focusedItem){return}var j=$.ui.keyCode;switch(k.which){case j.LEFT:if(b.isExpanded(b.focusedItem)){b.focusedItem.children(".ui-menuitem-link").trigger("click")}else{var f=b.focusedItem.closest("ul.ui-menu-list");if(f.parent().is(":not(.ui-panelmenu-content)")){b.focusItem(f.closest("li.ui-menuitem"))}}k.preventDefault();break;case j.RIGHT:if(b.focusedItem.hasClass("ui-menu-parent")&&!b.isExpanded(b.focusedItem)){b.focusedItem.children(".ui-menuitem-link").trigger("click")}k.preventDefault();break;case j.UP:var i=null,c=b.focusedItem.prev();if(c.length){i=c.find("li.ui-menuitem:visible:last");if(!i.length){i=c}}else{i=b.focusedItem.closest("ul").parent("li")}if(i.length){b.focusItem(i)}k.preventDefault();break;case j.DOWN:var i=null,h=b.focusedItem.find("> ul > li:visible:first");if(h.length){i=h}else{if(b.focusedItem.next().length){i=b.focusedItem.next()}else{if(b.focusedItem.next().length===0){i=b.searchDown(b.focusedItem)}}}if(i&&i.length){b.focusItem(i)}k.preventDefault();break;case j.ENTER:case j.NUMPAD_ENTER:case j.SPACE:var g=b.focusedItem.children(".ui-menuitem-link");setTimeout(function(){g.trigger("click")},1);b.jq.blur();var d=g.attr("href");if(d&&d!=="#"){window.location.href=d}k.preventDefault();break;case j.TAB:if(b.focusedItem){if(PrimeFaces.env.isIE()){b.focusCheck=true}$(this).focus()}break}}).on("blur.panelmenu",function(c){if(PrimeFaces.env.isIE()&&!b.focusCheck){return}b.removeFocusedItem()});var a="click."+this.id;$(document.body).off(a).on(a,function(c){if(!$(c.target).closest(".ui-panelmenu").length){b.removeFocusedItem()}})},searchDown:function(b){var a=b.closest("ul").parent("li").next(),c=null;if(a.length){c=a}else{if(b.closest("ul").parent("li").length===0){c=b}else{c=this.searchDown(b.closest("ul").parent("li"))}}return c},getFirstItemOfContent:function(a){return a.find("> .ui-menu-list > .ui-menuitem:visible:first-child")},getItemText:function(a){return a.find("> .ui-menuitem-link > span.ui-menuitem-text")},focusItem:function(a){this.removeFocusedItem();this.getItemText(a).addClass("ui-menuitem-outline").focus();this.focusedItem=a},removeFocusedItem:function(){if(this.focusedItem){this.getItemText(this.focusedItem).removeClass("ui-menuitem-outline");this.focusedItem=null}},isExpanded:function(a){return a.children("ul.ui-menu-list").is(":visible")},collapseRootSubmenu:function(b){var a=b.next();b.attr("aria-expanded",false).removeClass("ui-state-active ui-corner-top").addClass("ui-state-hover ui-corner-all").children(".ui-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");a.attr("aria-hidden",true).slideUp("normal","easeInOutCirc");this.removeAsExpanded(a)},expandRootSubmenu:function(c,b){var a=c.next();c.attr("aria-expanded",true).addClass("ui-state-active ui-corner-top").removeClass("ui-state-hover ui-corner-all").children(".ui-icon").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");if(b){a.attr("aria-hidden",false).show()}else{a.attr("aria-hidden",false).slideDown("normal","easeInOutCirc");this.addAsExpanded(a)}},expandTreeItem:function(a,b){var c=a.find("> .ui-menuitem-link");c.find("> .ui-menuitem-text").attr("aria-expanded",true);c.find("> .ui-panelmenu-icon").addClass("ui-icon-triangle-1-s");a.children(".ui-menu-list").show();if(!b){this.addAsExpanded(a)}},collapseTreeItem:function(a){var b=a.find("> .ui-menuitem-link");b.find("> .ui-menuitem-text").attr("aria-expanded",false);b.find("> .ui-panelmenu-icon").removeClass("ui-icon-triangle-1-s");a.children(".ui-menu-list").hide();this.removeAsExpanded(a)},saveState:function(){if(this.cfg.stateful){var a=this.expandedNodes.join(",");PrimeFaces.setCookie(this.stateKey,a,{path:"/"})}},restoreState:function(){var d=null;if(this.cfg.stateful){d=PrimeFaces.getCookie(this.stateKey)}if(d){this.collapseAll();this.expandedNodes=d.split(",");for(var c=0;c<this.expandedNodes.length;c++){var b=$(PrimeFaces.escapeClientId(this.expandedNodes[c]));if(b.is("div.ui-panelmenu-content")){this.expandRootSubmenu(b.prev(),true)}else{if(b.is("li.ui-menu-parent")){this.expandTreeItem(b,true)}}}}else{this.expandedNodes=[];var a=this.headers.filter(".ui-state-active"),e=this.jq.find(".ui-menu-parent > .ui-menu-list:not(.ui-helper-hidden)");for(var c=0;c<a.length;c++){this.expandedNodes.push(a.eq(c).next().attr("id"))}for(var c=0;c<e.length;c++){this.expandedNodes.push(e.eq(c).parent().attr("id"))}}},removeAsExpanded:function(a){var b=a.attr("id");this.expandedNodes=$.grep(this.expandedNodes,function(c){return c!=b});this.saveState()},addAsExpanded:function(a){this.expandedNodes.push(a.attr("id"));this.saveState()},clearState:function(){if(this.cfg.stateful){PrimeFaces.deleteCookie(this.stateKey,{path:"/"})}},collapseAll:function(){this.headers.filter(".ui-state-active").each(function(){var a=$(this);a.removeClass("ui-state-active").children(".ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e").removeClass("ui-icon-triangle-1-s");a.next().addClass("ui-helper-hidden")});this.jq.find(".ui-menu-parent > .ui-menu-list:not(.ui-helper-hidden)").each(function(){$(this).addClass("ui-helper-hidden").prev().children(".ui-panelmenu-icon").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e")})}});PrimeFaces.widget.TabMenu=PrimeFaces.widget.Menu.extend({init:function(a){this._super(a);this.items=this.jq.find("> .ui-tabmenu-nav > li:not(.ui-state-disabled)");this.bindEvents();this.bindKeyEvents()},bindEvents:function(){this.items.on("mouseover.tabmenu",function(b){var a=$(this);if(!a.hasClass("ui-state-active")){a.addClass("ui-state-hover")}}).on("mouseout.tabmenu",function(a){$(this).removeClass("ui-state-hover")})},bindKeyEvents:function(){this.items.attr("tabindex",0);this.items.on("focus.tabmenu",function(a){$(this).addClass("ui-menuitem-outline")}).on("blur.tabmenu",function(){$(this).removeClass("ui-menuitem-outline")}).on("keydown.tabmenu",function(f){var d=$.ui.keyCode,c=f.which;if(c===d.SPACE||c===d.ENTER||c===d.NUMPAD_ENTER){var b=$(this).children("a");b.trigger("click");var a=b.attr("href");if(a&&a!=="#"){window.location.href=a}f.preventDefault()}})}});