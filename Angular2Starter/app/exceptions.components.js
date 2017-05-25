"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var exceptionType_1 = require('./exceptionType');
var exception_service_1 = require('./exception.service');
var color_service_1 = require('./color.service');
var ExceptionsComponent = (function () {
    function ExceptionsComponent(exceptionService, colorService, activatedRoute) {
        this.exceptionService = exceptionService;
        this.colorService = colorService;
        this.activatedRoute = activatedRoute;
        this.name = 'Exceptions';
        this.properties = [{ 'field': 'id', 'overridable': true }, { 'field': 'name', 'overridable': false }];
    }
    ExceptionsComponent.prototype.getExceptions = function () {
        var _this = this;
        //this.exceptionService.getExceptions().then(exceptions => this.exceptions = exceptions);
        this.exceptionService.getExceptionsAPI().subscribe(function (exceptions) { return _this.exceptions = exceptions; });
        ;
    };
    // comes from model
    ExceptionsComponent.prototype.getExceptionTypes = function () {
        var results = new Array();
        var exception1 = { "MatchStatus": 5, "MatchLevel": 0, "ExceptionTypeId": 1, "MatchName": "OverQuantity", "MatchDisplayName": "Quantity Exception", "IsOverridable": false };
        var exception2 = { "MatchStatus": 38, "MatchLevel": 1, "ExceptionTypeId": 2, "MatchName": "NonPOException", "MatchDisplayName": "Non PO Exception", "IsOverridable": false };
        var exceptions = [exception1, exception2];
        for (var i = 0; i < exceptions.length; i++) {
            var result = new exceptionType_1.exceptionType();
            Object.assign(result, exceptions[i]);
            results.push(result);
        }
        return results;
    };
    ExceptionsComponent.prototype.mapExceptionTypeToProperties = function (exceptionTypeId) {
        switch (exceptionTypeId) {
            case "1":
                return [{ 'field': 'id', 'overridable': true }, { 'field': 'name', 'overridable': false }];
            case "2":
                return [{ 'field': 'inOrder', 'overridable': false }, { 'field': 'description', 'overridable': false }];
        }
    };
    ExceptionsComponent.prototype.onExTypeChange = function (event) {
        this.properties = this.mapExceptionTypeToProperties(event);
    };
    ExceptionsComponent.prototype.getColor = function (id) {
        return this.colorService.getColor(id);
    };
    ExceptionsComponent.prototype.getAPType = function () {
        return true;
    };
    ExceptionsComponent.prototype.save = function (e) {
        var _this = this;
        this.exceptions.forEach(function (e) {
            if (e.overrideFlag) {
                _this.exceptionService.update(e).subscribe(function (r) { return e = r; });
            }
        });
        //        window.parent.postMessage(JSON.stringify(this.exceptions), '*');          
        window.parent.postMessage(this.exceptions, '*');
    };
    ExceptionsComponent.prototype.refresh = function () {
        this.getExceptions();
    };
    ExceptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getExceptions();
        this.exceptionTypes = this.getExceptionTypes();
        this.apType = this.getAPType();
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.invoiceId = params['invoiceId'];
        });
        var y = window.location.search;
    };
    ExceptionsComponent = __decorate([
        core_1.Component({
            selector: 'my-exceptions',
            template: " \n\t<div class=\"form-group\">\n            <label>Exception Type</label>\n            <select (change)=\"onExTypeChange($event.target.value)\">\n                <option *ngFor=\"let exceptionType of exceptionTypes\"\n                    [value]=\"exceptionType.ExceptionTypeId\">\n                    {{exceptionType.MatchName}}\n                </option>\n            </select>\n            <label>Invoice Id# {{ invoiceId }}</label>\n\t</div>\n\t<div class='row'>\n       <div class=\"panel panel-default\">\n        <!-- Default panel contents -->        \n        <div class='panel-body'>\n\t\t\t<table class=\"table table-bordered table-condensed \">\n\t\t\t\t<thead>\n\t\t\t\t\t<th *ngFor=\"let property of properties\">{{ property.field }}</th>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr *ngFor=\"let exception of exceptions\">\n                        <td *ngFor=\"let property of properties\" [ngStyle]=\"getColor(exception.inOrder)\">\n                            <div *ngIf=\"!property.overridable; else showyesno\">{{ exception[property.field] }}</div>\n                            <ng-template #showyesno>\n                                <select [(ngModel)]=\"exception.overrideFlag\"><option value=\"1\">yes</option><option value=\"0\">no</option></select>\n                            </ng-template>                          \n                        </td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\t\t\t\n\t\t</div>\n\t</div>\n    <button type=\"submit\" (click)=\"save(exceptions)\">save</button>\n    <button type=\"submit\" (click)=\"refresh()\">refresh</button>\n    <pre>{{ exceptions | json }}</pre> \n  ",
            providers: [exception_service_1.ExceptionService, color_service_1.ColorService]
        }), 
        __metadata('design:paramtypes', [exception_service_1.ExceptionService, color_service_1.ColorService, router_1.ActivatedRoute])
    ], ExceptionsComponent);
    return ExceptionsComponent;
}());
exports.ExceptionsComponent = ExceptionsComponent;
//# sourceMappingURL=exceptions.components.js.map