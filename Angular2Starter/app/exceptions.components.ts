import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { exception } from './exception';
import { exceptionType } from './exceptionType';
import { ExceptionService } from './exception.service';
import { ColorService } from './color.service';

@Component({
    selector: 'my-exceptions',
    template: ` 
	<div class="form-group">
            <label>Exception Type</label>
            <select (change)="onExTypeChange($event.target.value)">
                <option *ngFor="let exceptionType of exceptionTypes"
                    [value]="exceptionType.ExceptionTypeId">
                    {{exceptionType.MatchName}}
                </option>
            </select>
            <label>Invoice Id# {{ invoiceId }}</label>
	</div>
	<div class='row'>
       <div class="panel panel-default">
        <!-- Default panel contents -->        
        <div class='panel-body'>
			<table class="table table-bordered table-condensed ">
				<thead>
					<th *ngFor="let property of properties">{{ property.field }}</th>
				</thead>
				<tbody>
					<tr *ngFor="let exception of exceptions">
                        <td *ngFor="let property of properties" [ngStyle]="getColor(exception.inOrder)">
                            <div *ngIf="!property.overridable; else showyesno">{{ exception[property.field] }}</div>
                            <ng-template #showyesno>
                                <select [(ngModel)]="exception.overrideFlag"><option value="1">yes</option><option value="0">no</option></select>
                            </ng-template>                          
                        </td>
					</tr>
				</tbody>
			</table>			
		</div>
	</div>
    <button type="submit" (click)="save(exceptions)">save</button>
    <button type="submit" (click)="refresh()">refresh</button>
    <pre>{{ exceptions | json }}</pre> 
  `,
    providers: [ExceptionService, ColorService]
})
export class ExceptionsComponent implements OnInit {
    name = 'Exceptions';
    exceptions: exception[];
    exceptionTypes: exceptionType[];    
    properties: any[] = [{ 'field': 'id', 'overridable': true }, { 'field': 'name', 'overridable': false }];
    invoiceId: number;    
    apType: boolean; 

    constructor(private exceptionService: ExceptionService,
        private colorService: ColorService,        
        private activatedRoute: ActivatedRoute)        
    {                
    }

    getExceptions(): void {
        //this.exceptionService.getExceptions().then(exceptions => this.exceptions = exceptions);
        this.exceptionService.getExceptionsAPI().subscribe(exceptions => this.exceptions = exceptions);;
    }

    // comes from model
    getExceptionTypes(): exceptionType[] {        
        var results = new Array<exceptionType>();
        var exception1 = { "MatchStatus": 5, "MatchLevel": 0, "ExceptionTypeId": 1, "MatchName": "OverQuantity", "MatchDisplayName": "Quantity Exception", "IsOverridable": false }
        var exception2 = { "MatchStatus": 38, "MatchLevel": 1, "ExceptionTypeId": 2, "MatchName": "NonPOException", "MatchDisplayName": "Non PO Exception", "IsOverridable": false }
        var exceptions = [exception1, exception2];
        for (var i = 0; i < exceptions.length; i++) {
            var result = new exceptionType();
            Object.assign(result, exceptions[i]);
            results.push(result);
        }
       
        return results;
    }
    
    mapExceptionTypeToProperties(exceptionTypeId: string): any[] {
        switch (exceptionTypeId)
        {
            case "1":
                return [{ 'field': 'id', 'overridable': true }, {'field': 'name', 'overridable': false }];
            case "2":
                return [{ 'field': 'inOrder', 'overridable': false }, { 'field': 'description', 'overridable': false }];
        }
    }

    onExTypeChange(event: string): void {        
        this.properties = this.mapExceptionTypeToProperties(event);
    }

    getColor(id: number) {
        return this.colorService.getColor(id);
    }

    getAPType()
    {
        return true;
    }

    save(e: exception[]) {       
        this.exceptions.forEach(e => {
            if (e.overrideFlag) {
                this.exceptionService.update(e).subscribe(r => e = r);
            }
        });      
//        window.parent.postMessage(JSON.stringify(this.exceptions), '*');          
        window.parent.postMessage(this.exceptions, '*');     
    }

    refresh() {
        this.getExceptions();
    }

    ngOnInit(): void {
        this.getExceptions();        
        this.exceptionTypes = this.getExceptionTypes();
        this.apType = this.getAPType();           
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.invoiceId = params['invoiceId'];            
        });
        
        var y = window.location.search;
    }
}

