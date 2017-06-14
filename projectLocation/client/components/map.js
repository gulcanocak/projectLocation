import React, {
    Component
}
from 'react';
import Markers from './markers';
import {
    createContainer
}
from 'meteor/react-meteor-data';
import {
    Lokasyonlar
}
from '../../imports/collections/lokasyonlar';
var mapsapi = require('google-maps-api')('AIzaSyBQX2_qg9UKvahh4zlhuuLHAGy2kyUvHiI');

var geo_basla_dur, wpid = false,
    z, op, prev_lat, prev_long, min_speed = 0,
    max_speed = 0,
    min_altitude = 0,
    max_altitude = 0,
    distance_travelled = 0,
    min_accuracy = 150,
    date_pos_updated = "",
    sayacTest = 0,
    lat_tmp = 0,
    lng_tmp = 0,
    info_string = "";
var DBB;
 
     
class Map extends Component {

    constructor(props) {
        super(props);
       
        this.handleClick = this.handleClick.bind(this);
    }



    handleClick() {
 DBB = {
            ID: this.props.groupId,
            PW: this.props.groupPW,
            UN: this.props.username
        };
        console.log("init_geo");
        op = document.getElementById("veriler");
        lt = document.getElementById("lt"); //emre
        if (1 == 1) {
            geo_basla_dur = document.querySelector('.geo_basla_dur')


            console.log("aaa");
            if (wpid) {
                geo_basla_dur.innerHTML = "Baslat";
                navigator.geolocation.clearWatch(wpid);
                wpid = false;
            }
            else {
                geo_basla_dur.innerHTML = "Lokasyon alınıyor.";
                get_pos();
            }
        }



        function geo_success(position) { //Lokasyonlar yazılıyor.
            console.log("geo_success");
            geo_basla_dur.innerHTML = "Durdur";
             document.getElementById("veriler").innerHTML = "<table><tr><td>Latitude:</td><th>" + position.coords.latitude + "</th></tr><tr><td>Longitude:</td><th>" + position.coords.longitude + "</th></tr></table>";
            sayacTest++;
            lat_tmp = position.coords.latitude;
            lng_tmp = position.coords.longitude;
            lt.innerHTML = "Total Location " + sayacTest;
            Meteor.call('lokasyonlar.update',DBB.UN,lat_tmp,lng_tmp);

        }

        function geo_error(error) {
            console.log("geo_error");

            switch (error.code) {
                case error.TIMEOUT:
                    op.innerHTML = "Zaman aşımı!";
                    break;
            };
        } //hata

        function get_pos() {
            console.log("get_pos");

            if (navigator.geolocation)
                wpid = navigator.geolocation.watchPosition(geo_success, geo_error, {
                    enableHighAccuracy: true,
                    maximumAge: 30000,
                    timeout: 27000
                });
            else
                op.innerHTML = "HATA! Tarayıcı desteklemiyor.";
        }



    }
    markerKontrol() {
        this.harita();
        return (
            <div>
          <div id="map"></div>
          <Markers groupId={this.props.groupId} groupPW={this.props.groupPW} username={this.props.username} />
         </div>);
    }
    harita() {
        var pos = {
            lat: 38.369399,
            lng: 27.1926986
        };
        mapsapi().then(function(maps) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 20
            });
        });
    }
    centerMap() {

        mapsapi().then(function(maps) {
           
             var center = new google.maps.LatLng(lat_tmp, lng_tmp);
            map.panTo(center);
           
        });
        
    }
    render() {
        return (
            <div>
          
           {this.markerKontrol()}


           <a className="btn-large right waves-effect waves-light btn blue lighten-1" style={{margin:'10px 0px 10px 10px'}} onClick={this.centerMap}>
          Center Map
          </a>
          <a className="geo_basla_dur btn-large right waves-effect waves-light btn blue lighten-1" style={{margin:'10px 0px 10px 0px'}} onClick={this.handleClick}>
          Start Location
          </a>
                    <p>Username: {this.props.username} Group Id: {this.props.groupId} Group Pw: {this.props.groupPW}</p>
             
   
<div className="icerik">
    <div className="veriler" id="veriler"></div>
    <div className="lt" id="lt"></div>
 
  </div> 
</div>
        );
    }
}
export default Map;
