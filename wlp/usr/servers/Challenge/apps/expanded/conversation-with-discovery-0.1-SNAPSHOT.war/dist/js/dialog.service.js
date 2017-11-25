System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var DialogService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            /*
             * This class is responsible for making REST calls to trigger setup process or call Conversation service.
             */
            DialogService = (function () {
                function DialogService(http) {
                    this.http = http;
                }
                DialogService.prototype.setup = function () {
                    return this.http.get('/rest/setup').map(function (res) { return res.json(); });
                };
                DialogService.prototype.message = function (workspace_id, payloadToWatson) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    if (workspace_id) {
                        payloadToWatson = payloadToWatson || {};
                        return this.http.post('/rest/conversation/api/v1/workspaces/' + workspace_id.trim() + '/message', JSON.stringify(payloadToWatson), { headers: headers }).map(function (res) { return res.json(); });
                    }
                    else {
                        throw 'workspace_id must be defined!';
                    }
                };
                DialogService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DialogService);
                return DialogService;
            }());
            exports_1("DialogService", DialogService);
        }
    }
});

//# sourceMappingURL=dialog.service.js.map
