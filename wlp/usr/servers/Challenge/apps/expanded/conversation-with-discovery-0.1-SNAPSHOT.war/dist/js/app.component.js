System.register(['angular2/core', './dialog.response', './dialog.service', 'angular2/http', './ce.docs', './payload'], function(exports_1, context_1) {
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
    var core_1, dialog_response_1, dialog_service_1, http_1, ce_docs_1, payload_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dialog_response_1_1) {
                dialog_response_1 = dialog_response_1_1;
            },
            function (dialog_service_1_1) {
                dialog_service_1 = dialog_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ce_docs_1_1) {
                ce_docs_1 = ce_docs_1_1;
            },
            function (payload_1_1) {
                payload_1 = payload_1_1;
            }],
        execute: function() {
            /*
             * Main entry point to the application. This component is responsible for the entire page layout.
             */
            AppComponent = (function () {
                function AppComponent(_dialogService, http) {
                    this._dialogService = _dialogService;
                    this.http = http;
                    // Store the response so we can display the JSON for end user to see
                    // We will also need to use the response's context for subsequent calls
                    this.response = null;
                    this.timer = null;
                    this.setupTimer = null;
                    this.question = null;
                    this.segments = []; // Array of requests and responses
                    this.workspace_id = null;
                    this.getLang();
                }
                /*
                 * This method is responsible for detecting user locale and getting locale specific content to be displayed by making a
                 * GET request to the respective file.
                 */
                AppComponent.prototype.getLang = function () {
                    var _this = this;
                    var browserLang = window.navigator.language || window.navigator.userLanguage;
                    var complLang = browserLang.split('-');
                    var lang = complLang[0];
                    var lang_url = 'locale/' + lang + '.json';
                    this.http.get(lang_url).map(function (res) { return res.json(); }).subscribe(function (data) {
                        _this.langData = data;
                        _this.segments.push(new dialog_response_1.DialogResponse(_this.langData.Description, false, null, null));
                    }, function (error) {
                        var lang_url = 'locale/en.json';
                        _this.http.get(lang_url).map(function (res) { return res.json(); }).subscribe(function (data) {
                            _this.langData = data;
                            _this.segments.push(new dialog_response_1.DialogResponse(_this.langData.Description, false, null, null));
                        }, function (error) { return alert(JSON.stringify(error)); });
                    });
                };
                AppComponent.prototype.ngAfterViewInit = function (_dialogService) {
                    this.checkSetup(_dialogService);
                    var rightColumn = document.querySelector('.right');
                    this.resizePayloadColumn(rightColumn);
                };
                /*
                 * This method is responsible for detecting if the set-up processs involving creation of various Watson services
                 * and configuring them is complete. The status is checked every 5 seconds till its complete.
                 * A loading screen is displayed to show set-up progress accordingly.
                 */
                AppComponent.prototype.checkSetup = function (_dialogService) {
                    var _this = this;
                    this._dialogService.setup().subscribe(function (data) {
                        _this.workspace_id = data.WORKSPACE_ID;
                        var setup_state = data.setup_state;
                        var setup_status_msg = data.setup_status_message;
                        var setup_phase = data.setup_phase;
                        var setup_message = data.setup_message;
                        var setup_step = data.setup_step;
                        var setup = document.querySelector('.setup');
                        var setup_status = document.querySelector('.setup-msg');
                        var chat_app = document.querySelector('chat-app');
                        var setupLoader = document.querySelector('.setup-loader');
                        var setupPhase = document.querySelector('.setup-phase');
                        var setupPhaseMsg = document.querySelector('.setup-phase-msg');
                        var errorPhase = document.querySelector('.error-phase');
                        var errorPhaseMsg = document.querySelector('.error-phase-msg');
                        var circles = document.querySelector('.circles');
                        var gerror = document.querySelector('.gerror');
                        var werror = document.querySelector('.werror');
                        var activeCircle = document.querySelector('.active-circle');
                        var nactiveCircle = document.querySelector('.non-active-circle');
                        setup_status.innerHTML = setup_status_msg;
                        if (setup_state === 'not_ready') {
                            document.body.style.backgroundColor = 'darkgray';
                            chat_app.style.opacity = '0.25';
                            setup.style.display = 'block';
                            setupPhase.innerHTML = setup_phase;
                            setupPhaseMsg.innerHTML = setup_message;
                            if (setup_step === '0') {
                                errorPhase.innerHTML = setup_phase;
                                errorPhaseMsg.innerHTML = setup_message;
                                setupLoader.style.display = 'none';
                                setupPhase.style.display = 'none';
                                setupPhaseMsg.style.display = 'none';
                                circles.style.display = 'none';
                                if (setup_phase !== 'Error') {
                                    werror.style.display = 'block';
                                }
                                else {
                                    gerror.style.display = 'block';
                                }
                                errorPhase.style.display = 'block';
                                errorPhaseMsg.style.display = 'block';
                            }
                            else {
                                setupLoader.style.display = 'block';
                                setupPhase.style.display = 'block';
                                setupPhaseMsg.style.display = 'block';
                                circles.style.display = 'block';
                                gerror.style.display = 'none';
                                werror.style.display = 'none';
                                errorPhase.style.display = 'none';
                                errorPhaseMsg.style.display = 'none';
                            }
                            if (setup_step === '2') {
                                activeCircle.classList.remove('active-circle');
                                activeCircle.classList.add('non-active-circle');
                                nactiveCircle.classList.remove('non-active-circle');
                                nactiveCircle.classList.add('active-circle');
                            }
                            _this.setupTimer = setTimeout(function () {
                                _this.checkSetup(_dialogService);
                            }, 5000);
                        }
                        else {
                            var payload = { 'input': { 'text': '' } };
                            var chatColumn = document.querySelector('#scrollingChat');
                            _this.callConversationService(chatColumn, payload);
                            document.body.style.backgroundColor = 'white';
                            chat_app.style.opacity = '1';
                            setup.style.display = 'none';
                            if (_this.setupTimer) {
                                clearTimeout(_this.setupTimer);
                            }
                        }
                    }, function (error) { return alert(JSON.stringify(error)); });
                };
                AppComponent.prototype.onResize = function (event) {
                    var rightColumn = document.querySelector('.right');
                    this.resizePayloadColumn(rightColumn);
                };
                /*
                 * This method is responsible for toggling Expand/Collapse section of CE content.
                 */
                AppComponent.prototype.CeToggle = function (event) {
                    var targetElement;
                    if (event.srcElement) {
                        targetElement = event.srcElement;
                    }
                    else {
                        targetElement = event.target;
                    }
                    if (targetElement.className === 'sign') {
                        targetElement = targetElement.parentElement;
                    }
                    if (targetElement.innerText.indexOf('Collapse') !== -1) {
                        targetElement.innerHTML = this.langData.EResults + '<span class=sign>+</span>';
                        targetElement.style.border = '';
                        targetElement.title = this.langData.Expand;
                    }
                    else {
                        targetElement.innerHTML = this.langData.CResults + '<span class=sign>-</span>';
                        targetElement.style.border = 'none';
                        targetElement.title = this.langData.Collapse;
                    }
                    var expcoll = targetElement.nextElementSibling;
                    if (expcoll && (expcoll.style.display === 'block' || expcoll.style.display === '')) {
                        expcoll.style.display = 'none';
                    }
                    else {
                        expcoll.style.display = 'block';
                    }
                };
                /*
                 * This method is responsible for triggering a request whenever a Enter key is pressed .
                 */
                AppComponent.prototype.keypressed = function (event) {
                    var element = document.querySelector('.draw');
                    var nw = element.offsetWidth + 7;
                    if (event && event.keyCode === 8) {
                        nw = element.offsetWidth - 7;
                    }
                    if (nw > 360) {
                        nw = 360;
                    }
                    element.style.width = String(nw + 'px');
                    if (event && event.keyCode === 13) {
                        this.sendData();
                        element.style.width = '0px';
                    }
                };
                /*
                 * This method is responsible for changing the layout of payload section based on screen resolution.
                 */
                AppComponent.prototype.resizePayloadColumn = function (rightColumn) {
                    if (window.innerWidth < 730) {
                        rightColumn.classList.add('no-show');
                    }
                    else if (window.innerWidth < 830) {
                        rightColumn.classList.remove('no-show');
                        rightColumn.style.width = '340px';
                    }
                    else if (window.innerWidth < 860) {
                        rightColumn.classList.remove('no-show');
                        rightColumn.style.width = '445px';
                    }
                    else if (window.innerWidth < 951) {
                        rightColumn.classList.remove('no-show');
                        rightColumn.style.width = '395px';
                    }
                    else {
                        rightColumn.classList.remove('no-show');
                        rightColumn.style.width = '445px';
                    }
                };
                /*
                 * This method is responsible for toggling the payload section to full screen or fixed layout by
                 * clicking the Code Expand/Collapse icons at the top right .
                 */
                AppComponent.prototype.togglePanel = function (event) {
                    var payloadColumn = document.querySelector('#payload-column');
                    var toggleButton = document.querySelector('#view-change-button');
                    var rightColumn = document.querySelector('.right');
                    var element;
                    if (event.srcElement) {
                        element = event.srcElement;
                    }
                    else {
                        element = event.target;
                    }
                    if (toggleButton.classList.contains('full')) {
                        toggleButton.classList.remove('full');
                        payloadColumn.classList.remove('full');
                        this.resizePayloadColumn(rightColumn);
                    }
                    else {
                        rightColumn.classList.remove('no-show');
                        rightColumn.style.width = '100%';
                        toggleButton.classList.add('full');
                        payloadColumn.classList.add('full');
                    }
                };
                /*
                 * This method is responsible for preparing the data to send and call the method for Conversation Service
                 */
                AppComponent.prototype.sendData = function () {
                    var chatColumn = document.querySelector('#scrollingChat');
                    chatColumn.classList.add('loading');
                    var q = '';
                    if (this.question != null) {
                        q = this.question;
                    }
                    this.question = '';
                    var context = null;
                    if (this.response != null) {
                        context = this.response.context;
                        // we are going to delete the context variable 'callRetrieveAndRank' before
                        // sending back to the Conversation service
                        if (context && context.callRetrieveAndRank) {
                            delete context.callRetrieveAndRank;
                        }
                    }
                    var input = { 'text': q };
                    var payload = { input: input, context: context };
                    // Add the user utterance to the list of chat segments
                    this.segments.push(new dialog_response_1.DialogResponse(q, true, null, payload));
                    // Call the method which calls the proxy for the message api
                    this.callConversationService(chatColumn, payload);
                };
                /*
                 * This method is responsible for making a request to Conversation service with the corresponding user query.
                 */
                AppComponent.prototype.callConversationService = function (chatColumn, payload) {
                    var _this = this;
                    var responseText = '';
                    var ce = null;
                    // Send the user utterance to dialog, also send previous context
                    this._dialogService.message(this.workspace_id, payload).subscribe(function (data1) {
                        _this.response = data1;
                        if (data1) {
                            if (data1.error) {
                                responseText = data1.error;
                                data1 = _this.langData.NResponse;
                            }
                            else if (data1.output) {
                                if (data1.output.CEPayload && data1.output.CEPayload.length > 0) {
                                    ce = data1.output.CEPayload;
                                    responseText = _this.langData.Great;
                                    if (ce.length === 1 && ce[0].title === 'No results found') {
                                        responseText = _this.langData.NoResult;
                                        ce = null;
                                    }
                                }
                                else if (data1.output.text) {
                                    if (data1.output.text.length >= 1) {
                                        responseText = data1.output.text.join('<br>');
                                    }
                                }
                            }
                        }
                        _this.segments.push(new dialog_response_1.DialogResponse(responseText, false, ce, data1));
                        chatColumn.classList.remove('loading');
                        if (_this.timer) {
                            clearTimeout(_this.timer);
                        }
                        _this.timer = setTimeout(function () {
                            var messages = document.getElementById('scrollingChat').getElementsByClassName('clear');
                            document.getElementById('scrollingChat').scrollTop = messages[messages.length - 1].offsetTop;
                        }, 50);
                        document.getElementById('textInput').focus();
                    }, function (error) {
                        var serviceDownMsg = _this.langData.Log;
                        _this.segments.push(new dialog_response_1.DialogResponse(serviceDownMsg, false, ce, _this.langData.NResponse));
                        chatColumn.classList.remove('loading');
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        directives: [ce_docs_1.CeDocComponent, payload_1.PayloadComponent],
                        providers: [dialog_service_1.DialogService],
                        selector: 'chat-app',
                        template: "\n  <div id='view-change-button' class='button' (click)='togglePanel($event)'>\n    <img title='Click to Collapse' class='option full' src='../img/Chat Button.png'>\n    <img title='Click to Expand' class='option not-full' src='../img/Code Button.png'>\n  </div>\n  <div id='parent' class='parentDiv' (window:resize)='onResize($event)'>\n      <div id='scrollingChat'>\n        <div id='segments' *ngFor='#segment of segments'>\n          <div [class]='segment.isUser() ? \"from-user\" :\n            (segment !== segments[segments.length - 1] ? \"from-watson\" : \"from-watson-latest\")'>\n            <p class='padding' [innerHtml]='segment.getText()'></p>\n            <div *ngIf='!segment.isUser() && segment.getCe().length>0 && segment !== segments[0]'>\n              <span title='Click to Collapse' (click)='CeToggle($event)' style='border : none;'\n              class='expcoll'>Collapse Results <span class='sign'>-</span></span>\n              <div class='toggleCe'>\n                <ce-doc *ngFor='#doc of segment.getCe()' [doc]='doc'></ce-doc>\n              </div>\n            </div>\n          </div>\n          <div class='clear'></div>\n          <div *ngIf='segment.isUser() && segment == segments[segments.length - 1]' class='load'></div>\n        </div>\n      </div>\n      <div class='right'> <!-- Display the payload to/from Watson -->\n        <div id='payload-column' class='fixed-column content-column'>\n          <payload id='payload-request' class='payload' label='Sent to Watson' [style]='segments.length <= 2 ?\n            \"display : none;\" : \"\"' [payload]='(segments.length > 1 && segments[segments.length - 2].isUser()) ?\n            segments[segments.length - 2].getPayload() : null'></payload>\n          <payload id='payload-response' class='payload' label='Watson understands' [style]='segments.length <= 1 ?\n            \"display : none;\" : \"\"' [payload]='(segments.length > 0 && !segments[segments.length - 1].isUser()) ?\n            segments[segments.length - 1].getPayload() : null'></payload>\n        </div>\n      </div>\n      <footer>\n      <label for='textInput' class='inputOutline'>\n        <input id='textInput' class='input responsive-column' placeholder='Type something' type='text'\n          [(ngModel)]='question' (keydown)='keypressed($event)' style='width:100%'>\n      </label>\n      <div class='draw'></div>\n    </footer>\n  </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [dialog_service_1.DialogService, http_1.Http])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
