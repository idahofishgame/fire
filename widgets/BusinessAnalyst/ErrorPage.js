// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

require({cache:{"url:widgets/BusinessAnalyst/ErrorPage.html":'\x3cdiv\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"noPermissionsErrorDiv"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"servicesErrorDiv"\r\n\x3c/div\x3e\r\n'}});
define(["dojo/_base/declare","dijit/_TemplatedMixin","dijit/_WidgetBase","esri/dijit/geoenrichment/_WizardPage","dojo/text!./ErrorPage.html"],function(b,c,d,e,f){return b([d,c,e],{templateString:f,postCreate:function(){this.inherited(arguments);var a=this.displayErrors;a.gePrivilege?this.noPermissionsErrorDiv.innerHTML=this.nls.noPermissions:this.noPermissionsErrorDiv.parentNode.removeChild(this.noPermissionsErrorDiv);a.geServiceNotConfigured||a.dirRoutingServiceNotConfigured?this.servicesErrorDiv.innerHTML=
a.geServiceNotConfigured?a.dirRoutingServiceNotConfigured?this.nls.geAndDirRoutingServicesNotConfigured:this.nls.geServiceNotConfigured:this.nls.dirRoutingServiceNotConfigured:this.servicesErrorDiv.parentNode.removeChild(this.servicesErrorDiv)},startup:function(){this.inherited(arguments)}})});