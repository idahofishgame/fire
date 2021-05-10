// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/ThreatAnalysis/setting/ColorPickerEditor.html":'\x3cdiv class\x3d"colorPickerEditor"\x3e\r\n  \x3cdiv class\x3d"colorPicker" data-dojo-attach-point\x3d"colorPicker"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"sliderWrapper"\x3e\r\n    \x3cdiv class\x3d"sliderbar" data-dojo-attach-point\x3d"sliderBar"\x3e\r\n      \x3col data-dojo-type\x3d"dijit/form/HorizontalRuleLabels" style\x3d"height:2.5em;" container\x3d"topDecoration"\x3e\r\n        \x3cli\x3e${nls.transparencyLabel}\x3c/li\x3e\r\n        \x3cli\x3e\x3c/li\x3e\r\n      \x3c/ol\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberSpinner" value\x3d"0" data-dojo-attach-point\x3d"spinner"\r\n    data-dojo-props\x3d"smallDelta:10,intermediateChanges:true,constraints: {min:0,max:100}"\x3e\r\n  \x3cdiv class\x3d\'styleSelectSection\'\x3e\r\n    \x3clabel for\x3d"${id}_select"\x3e${nls.style}\x3c/label\x3e\r\n    \x3cselect class\x3d"styleSelect" data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"dropdown" /\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/Color dojo/on dojo/query dojo/_base/html dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./ColorPickerEditor.html dijit/form/HorizontalSlider jimu/dijit/ColorPickerPopup dijit/form/NumberSpinner".split(" "),function(p,k,e,q,l,r,t,u,v,w,x,y,z){return p([u,v,w],{_defaultColor:"#485566",templateString:x,nls:null,postCreate:function(){this.colorPicker=new z({color:this._defaultColor},this.colorPicker);
this.colorPicker.startup();this.slider=new y({name:"slider",value:100,minimum:0,maximum:100,discreteValues:101,intermediateChanges:!0,showButtons:!1,style:"display: inline-block;"},this.sliderBar);this.slider.startup();var a=[],b,f="esriSLSDash esriSLSDashDot esriSLSDashDotDot esriSLSDot esriSLSLongDash esriSLSLongDashDot esriSLSNull esriSLSShortDash esriSLSShortDashDot esriSLSShortDashDotDot esriSLSShortDot esriSLSSolid".split(" "),d="esriSFSBackwardDiagonal esriSFSCross esriSFSDiagonalCross esriSFSForwardDiagonal esriSFSHorizontal esriSFSNull esriSFSSolid esriSFSVertical".split(" ");
"line"===this.type?k.forEach(f,e.hitch(this,function(c){b={value:c,label:'\x3cspan title\x3d"'+this.nls.lineStyles[c]+'"\x3e'+this.nls.lineStyles[c]+"\x3c/span\x3e"};a.push(b)})):k.forEach(d,e.hitch(this,function(c){b={value:c,label:'\x3cspan title\x3d"'+this.nls.fillStyles[c]+'"\x3e'+this.nls.fillStyles[c]+"\x3c/span\x3e"};a.push(b)}));this.dropdown.addOption(a);this.inherited(arguments)},startup:function(){this.own(l(this.slider,"change",e.hitch(this,function(a){isNaN(a)||!1===this._isSameVal()&&
(a>this.spinner.maximum?this.spinner.setValue(this.spinner.maximum):this.spinner.setValue(a))})));this.own(l(this.spinner,"change",e.hitch(this,function(a){isNaN(a)||!1===this._isSameVal()&&a<=this.slider.maximum&&this.slider.setValue(a)})));this._stylePolyfill();this.inherited(arguments)},_isSameVal:function(){return this.slider.getValue()===this.spinner.getValue()},getValues:function(){var a=null,b=null;(b=this.colorPicker.getColor())&&b.toHex&&(a=b.toHex());b=this.spinner.getValue()/100;return{color:a,
transparency:b}},setValues:function(a){if("object"===typeof a||"string"===typeof a)this.colorPicker.setColor(new q(a.color)),a.transparency="undefined"===typeof a.transparency?0:100*a.transparency,this.slider.setValue(a.transparency),this.spinner.setValue(a.transparency)},_stylePolyfill:function(){var a=r(".dijitSliderLeftBumper",this.domNode)[0];a&&a.parentNode&&t.setStyle(a.parentNode,"background-color","#24b5cc")},validateSpinner:function(){var a=!0;this.spinner.isValid()||(this._shake(this.spinner.domNode,
16),this.spinner.focus(),a=!1);return a},_shake:function(a,b){function f(){if(15>d){a.style.transform="translate(0px, 0px)";b-=c;var g=m(-b,b),h=m(-b,b);a.style.transform="translate("+g+"px, "+h+"px)";d+=1;requestAnimationFrame(f)}15<=d&&(a.style.transform="translate(0, 0)",n._shakingElements.splice(n._shakingElements.indexOf(a),1))}var d=1,c=b/15,m=function(g,h){return Math.floor(Math.random()*(h-g+1))+g};this._shakingElements||(this._shakingElements=[]);if(-1===this._shakingElements.indexOf(a)){this._shakingElements.push(a);
var n=this;f()}}})});