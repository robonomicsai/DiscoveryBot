System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DialogResponse;
    return {
        setters:[],
        execute: function() {
            /**
             * (C) Copyright IBM Corp. 2016. All Rights Reserved.
             *
             * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
             * in compliance with the License. You may obtain a copy of the License at
             *
             * http://www.apache.org/licenses/LICENSE-2.0
             *
             * Unless required by applicable law or agreed to in writing, software distributed under the License
             * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
             * or implied. See the License for the specific language governing permissions and limitations under
             * the License.
             */
            /*
            * This class is responsible for storing Dialog service class's response payload.
            */
            DialogResponse = (function () {
                function DialogResponse(text, user, ce, payload) {
                    this.arr = [];
                    this.user = user;
                    this.text = text;
                    this.ce = ce;
                    if (ce) {
                        this.arr = [];
                        for (var i = 0; i < ce.length; i++) {
                            this.arr.push({ body: ce[i].body, bodySnippet: ce[i].bodySnippet, confidence: ce[i].confidence,
                                highlight: ce[i].highlight, sourceUrl: ce[i].sourceUrl, title: ce[i].title });
                        }
                    }
                    this.payload = payload;
                }
                DialogResponse.prototype.getText = function () {
                    return this.text;
                };
                DialogResponse.prototype.isUser = function () {
                    return this.user;
                };
                DialogResponse.prototype.getCe = function () {
                    return this.arr;
                };
                DialogResponse.prototype.getPayload = function () {
                    return this.payload;
                };
                return DialogResponse;
            }());
            exports_1("DialogResponse", DialogResponse);
        }
    }
});

//# sourceMappingURL=dialog.response.js.map
