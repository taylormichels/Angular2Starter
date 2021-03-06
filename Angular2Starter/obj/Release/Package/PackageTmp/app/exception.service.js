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
var core_1 = require('@angular/core');
var exception_mocks_1 = require('./exception-mocks');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var ExceptionService = (function () {
    function ExceptionService(http) {
        this.http = http;
        this.apiUrl = 'api/exceptions'; // URL to web API
        this.headers = new http_2.Headers({ 'Content-Type': 'application/json' });
    } // TODO
    ExceptionService.prototype.getExceptions = function () {
        return Promise.resolve(exception_mocks_1.Exceptions);
    };
    ExceptionService.prototype.getExceptionsAPI = function () {
        return this.http.get(this.apiUrl).map(function (response) {
            return response.json().data;
        });
    };
    ExceptionService.prototype.update = function (e) {
        var url = this.apiUrl + "/" + e.id;
        //return this.http.put(url, JSON.stringify(e), { headers: this.headers })
        //            .map(response => <exception>response.json().data);
        return this.http.put(url, JSON.stringify(e), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    ExceptionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ExceptionService);
    return ExceptionService;
}());
exports.ExceptionService = ExceptionService;
//# sourceMappingURL=exception.service.js.map