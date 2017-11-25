System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var CeDocComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /*
             * This component is responsible for the CE Section layout under Expand/Collapse button.
             * Also contains the modal layout with detailed information
             */
            CeDocComponent = (function () {
                function CeDocComponent() {
                    this.isExpand = true;
                    this.heighSet = false;
                }
                CeDocComponent.prototype.toggle = function (newval) {
                    this.isExpand = newval;
                };
                CeDocComponent.prototype.getTitle = function () {
                    if (this.doc) {
                        return this.doc.title;
                    }
                    return '';
                };
                CeDocComponent.prototype.getSourceUrl = function () {
                    if (this.doc) {
                        return this.doc.sourceUrl;
                    }
                    return '';
                };
                CeDocComponent.prototype.getBody = function () {
                    if (this.doc) {
                        return this.doc.body;
                    }
                    return '';
                };
                CeDocComponent.prototype.getBodySnippet = function () {
                    if (this.doc) {
                        return this.doc.bodySnippet;
                    }
                    return '';
                };
                CeDocComponent = __decorate([
                    core_1.Component({
                        inputs: ['doc', 'body'],
                        selector: 'ce-doc',
                        template: "\n  <div>\n      <div title='View detailed Content' (click)='toggle(!isExpand)' class='docBody'>\n        <div class='docBodyTitle' [innerHtml]='getTitle()'></div>\n        <div class='docBodySnippet' [innerHtml]='getBodySnippet()'></div>\n      </div>\n      <div class ='modal' [hidden]='isExpand'>\n      <div class='modal-header'><div [innerHtml]='getTitle()' class='modal-doc'></div>\n        <span class='modal-close' (click)='toggle(!isExpand)'>\n        <img src='../img/close-button.png' class='close-button'></span>\n      </div>\n      <div class='modalDocTitle'>\n        <a title='View content file' target='_blank' class='docLink' [href]='getSourceUrl()'>\n          <div class='titleText'>Read the full document here</div>\n        </a>\n      </div>\n      <div class='bodyText' [innerHtml]='getBody()'></div>\n      <div class='disclaimer'>We\u2019re demonstrating text limiting using only two paragraphs of the full article.\n       You can turn this off for your own application.</div>\n    </div>\n    <div class='docTitle'>\n      <a title='View content file' target='_blank' class='docLink' [href]='getSourceUrl()'>\n        <div class='titleText'>Read the full document here</div>\n      </a>\n    </div>\n  </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], CeDocComponent);
                return CeDocComponent;
            }());
            exports_1("CeDocComponent", CeDocComponent);
        }
    }
});

//# sourceMappingURL=ce.docs.js.map
