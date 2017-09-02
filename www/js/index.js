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

function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/ /g, '%20')
        .replace(/!n/g, '%0A');
}

var getHtmlEncodedBody = function() {
    var body = [
        'User Info!n',
        'Username: ', $('username'),
        '!n',
        'Phone   : ', $('phone'),
        '!n',
        'Email   : ', $('email'),
        '!n!n',
        'Appointment Info!n',
        'Date    : ', $('date'),
        '!n',
        'Time    : ', $('time'),
        '!n',
        'Location: ', $('location'),
        '!n',
        'Detail  : ', $('detail')
    ]
    return htmlEntities(body.join(''))
}
var getHtmlBody = function() {
    var body = [
        '<h2>User Info</h2>',
        '<b>Username: </b>', $('username'),
        '<br>',
        '<b>Phone: </b>', $('phone'),
        '<br>',
        '<b>Email: </b>', $('email'),
        '<h1>Appointment Info</h1>',
        '<b>Date: </b>', $('date'),
        '<br>',
        '<b>Time: </b>', $('time'),
        '<br>',
        '<b>Location: </b>', $('location'),
        '<br>',
        '<b>Detail: </b>', $('detail')
    ]
    return body.join('')
}
var getPlainText = function() {
    var lf = String.fromCharCode(10)
    var body = [
        ' - User Info - ',
        lf,
        'Username: ', $('username'),
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
    ]
    return body.join('')
}

var handleSubmit = function() {
    // window.open('mailto:info@angelvri.com?subject=I%20Need%20An%20Interpreter&body=' + getBody());
    //var usePlainText = $('plainText')
    cordova.plugins.email.open({
        to:      'info@angelvri.com',
        // cc:      'erika@mustermann.de',
        // bcc:     ['john@doe.com', 'jane@doe.com'],
        subject: 'I Need An Interpreter',
        //isHtml: !usePlainText,
        //body: usePlainText ? getPlainText() : getHtmlBody()
        body: getPlainText()
    });
}