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
    var PayloadComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /*
             * Displays the JSON payload from the user to Watson and from Watson to the client.
             */
            PayloadComponent = (function () {
                function PayloadComponent() {
                }
                /*
                 *Creates line numbers for payload section.
                 */
                PayloadComponent.prototype.createLineNumberString = function () {
                    var numberOfLines = (this.getText().match(/\n/g) || []).length + 1;
                    if (numberOfLines === 1) {
                        return '';
                    }
                    var lineString = '';
                    var prefix = '';
                    for (var i = 1; i <= numberOfLines; i++) {
                        lineString += prefix;
                        lineString += i;
                        prefix = '\n';
                    }
                    return lineString;
                };
                PayloadComponent.prototype.getText = function () {
                    // This method will be invoked from the Angular 2.0 component template (above). The component receives a 'payload'
                    // and a 'label' param when initialized. This method is responsible for converting the JSON to a syntax highlighted
                    // text area.
                    if (this.payload == null) {
                        return '';
                    }
                    var convert = JSON.stringify(this.payload, null, 2);
                    convert = convert.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    convert = convert.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                        var cls = 'number';
                        if (/^"/.test(match)) {
                            if (/:$/.test(match)) {
                                cls = 'key';
                            }
                            else {
                                cls = 'string';
                            }
                        }
                        else if (/true|false/.test(match)) {
                            cls = 'boolean';
                        }
                        else if (/null/.test(match)) {
                            cls = 'null';
                        }
                        return '<span class="' + cls + '">' + match + '</span>';
                    });
                    return convert;
                };
                PayloadComponent = __decorate([
                    core_1.Component({
                        inputs: ['payload', 'label'],
                        selector: 'payload',
                        template: "\n    <div>\n        <div class='header-text'>{{ label }}</div>\n        <div class='code-line responsive-columns-wrapper'>\n        <pre class='line-numbers' [innerHtml]='createLineNumberString()'></pre>\n        <pre class='payload-text responsive-column' [innerHtml]='getText()'></pre></div>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], PayloadComponent);
                return PayloadComponent;
            }());
            exports_1("PayloadComponent", PayloadComponent);
        }
    }
});

//# sourceMappingURL=payload.js.map
