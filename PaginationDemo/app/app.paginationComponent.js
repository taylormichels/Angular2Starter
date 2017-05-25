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
var data_1 = require('./data');
var Pagination = (function () {
    function Pagination() {
        this.pages = 4;
        this.pageSize = 5;
        this.pageNumber = 0;
        this.currentIndex = 1;
        this.pageStart = 1;
        this.inputName = '';
        this.filteredItems = data_1.productList;
        this.init();
    }
    ;
    Pagination.prototype.init = function () {
        this.currentIndex = 1;
        this.pageStart = 1;
        this.pages = 4;
        this.pageNumber = parseInt("" + (this.filteredItems.length / this.pageSize));
        if (this.filteredItems.length % this.pageSize != 0) {
            this.pageNumber++;
        }
        if (this.pageNumber < this.pages) {
            this.pages = this.pageNumber;
        }
        this.refreshItems();
        console.log("this.pageNumber :  " + this.pageNumber);
    };
    Pagination.prototype.FilterByName = function () {
        var _this = this;
        this.filteredItems = [];
        if (this.inputName != "") {
            data_1.productList.forEach(function (element) {
                if (element.name.toUpperCase().indexOf(_this.inputName.toUpperCase()) >= 0) {
                    _this.filteredItems.push(element);
                }
            });
        }
        else {
            this.filteredItems = data_1.productList;
        }
        console.log(this.filteredItems);
        this.init();
    };
    Pagination.prototype.fillArray = function () {
        var obj = new Array();
        for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
            obj.push(index);
        }
        return obj;
    };
    Pagination.prototype.refreshItems = function () {
        this.items = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
        this.pagesIndex = this.fillArray();
    };
    Pagination.prototype.prevPage = function () {
        if (this.currentIndex > 1) {
            this.currentIndex--;
        }
        if (this.currentIndex < this.pageStart) {
            this.pageStart = this.currentIndex;
        }
        this.refreshItems();
    };
    Pagination.prototype.nextPage = function () {
        if (this.currentIndex < this.pageNumber) {
            this.currentIndex++;
        }
        if (this.currentIndex >= (this.pageStart + this.pages)) {
            this.pageStart = this.currentIndex - this.pages + 1;
        }
        this.refreshItems();
    };
    Pagination.prototype.setPage = function (index) {
        this.currentIndex = index;
        this.refreshItems();
    };
    Pagination = __decorate([
        core_1.Component({
            selector: 'my-pagination',
            template: " \n\t<div class=\"form-group\">\n\t\t\t<label>Filter </label>\n\t\t\t<input  type=\"text\"   id=\"inputName\" [(ngModel)]=\"inputName\"/>\n\t\t\t<input type=\"button\" (click)=\"FilterByName()\" value=\"Apply\"/>\n\t</div>\n\t<div class='row'>\n       <div class=\"panel panel-default\">\n        <!-- Default panel contents -->\n        <div class='panel-heading'>Product List</div>\n        <div class='panel-body'>\n\t\t\t<table class=\"table table-bordered table-condensed \">\n\t\t\t\t<thead>\n\t\t\t\t\t<th>Id</th>\n\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t<th>Description</th>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr *ngFor=\"let item of items\">\n\t\t\t\t\t\t<td>{{item.id}}</td>\n\t\t\t\t\t\t<td>{{item.name}}</td>\n\t\t\t\t\t\t<td>{{item.description}}</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t<div class=\"btn-toolbar\" role=\"toolbar\" style=\"margin: 0;\">\n\t\t\t   <div class=\"btn-group\">\n\t\t\t\t\t<label style=\"margin-top:10px\">Page {{currentIndex}}/{{pageNumber}}</label>\n\t\t\t\t</div>\n\t\t\t\t <div class=\"btn-group pull-right\">\n\t\t\t\t\t<ul class=\"pagination\" >\n\t\t\t\t\t\t<li [ngClass]=\"{'disabled': (currentIndex == 1 || pageNumber == 0)}\" ><a  (click)=\"prevPage()\" href=\"#\">Prev</a></li>\n\t\t\t\t\t\t\t<li *ngFor=\"let page of pagesIndex\"   [ngClass]=\"{'active': (currentIndex == page)}\">\n\t\t\t\t\t\t\t\t<a (click)=\"setPage(page)\" href=\"#\" >{{page}}</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li [ngClass]=\"{'disabled': (currentIndex == pageNumber || pageNumber == 0)}\" ><a    (click)=\"nextPage()\" href=\"#\">Next</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t </div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\t\n  ",
            styles: ['.pagination { margin: 0px !important; }']
        }), 
        __metadata('design:paramtypes', [])
    ], Pagination);
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=app.paginationComponent.js.map