PrimeFaces.widget.Panel=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);this.header=this.jq.children(".ui-panel-m-titlebar");this.content=this.jq.children(".ui-panel-m-content");this.onshowHandlers=this.onshowHandlers||{};this.bindEvents()},bindEvents:function(){var a=this;if(this.cfg.toggleable){this.toggler=this.header.children(".ui-panel-m-titlebar-icon");this.toggleStateHolder=$(this.jqId+"_collapsed");this.toggler.on("click",function(b){a.toggle();b.preventDefault()})}},toggle:function(){if(this.content.is(":visible")){this.collapse()}else{this.expand()}},collapse:function(){this.toggleState(true,"ui-icon-minus","ui-icon-plus");this.content.hide()},expand:function(){this.toggleState(false,"ui-icon-plus","ui-icon-minus");this.content.show();this.invokeOnshowHandlers()},toggleState:function(c,b,a){this.toggler.removeClass(b).addClass(a);this.cfg.collapsed=c;this.toggleStateHolder.val(c);this.fireToggleEvent()},fireToggleEvent:function(){if(this.cfg.behaviors){var a=this.cfg.behaviors.toggle;if(a){a.call(this)}}},addOnshowHandler:function(b,a){this.onshowHandlers[b]=a},invokeOnshowHandlers:function(){for(var b in this.onshowHandlers){if(this.onshowHandlers.hasOwnProperty(b)){var a=this.onshowHandlers[b];if(a.call()){delete this.onshowHandlers[b]}}}}});