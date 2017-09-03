/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // cordova.plugins.email is now available
        app.receivedEvent('deviceready');
        cordova.plugins.email.isAvailable(
          function (isAvailable) {
            if(!isAvailable) alert('Service is not available');
          }
        );
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var $ = function(id) {
    var element = document.getElementById(id)
    return element.value === 'getChecked' ? element.checked : element.value;
}

var getPlainText = function() {
  var lf = String.fromCharCode(10);
  var body = [
    ' - User Info - ',
    lf,
    'Name: ', $('name'),
    lf,
    'Phone   : ', $('phone'),
    lf,
    'Email   : ', $('email'),
    lf + lf,
    ' - Appointment Info - ',
    lf,
    'Date    : ', $('date'),
    lf,
    'Time    : ', $('time'),
    lf,
    'Location: ', $('location'),
    lf,
    'Detail  : ', $('detail')
  ];
  return body.join('')
}

var handleSubmit = function() {
    cordova.plugins.email.open({
      to:      ['info@angelvri.com'],
      cc:      [''],
      bcc:     [''],
      attachments: [], // file paths or base64 data streams
      subject: 'I Need An Interpreter',
      body: getPlainText(),
      isHtml: false
    });
    //TODO use the callback arg to save the user's preferred email client if possible...
    //TODO do more tests with sending HTML emails
}