import React, {
  Component
}
from 'react';
import {
  createContainer
}
from 'meteor/react-meteor-data';
import {
  Lokasyonlar
}
from '../../imports/collections/lokasyonlar';

var mapsapi = require('google-maps-api')('AIzaSyBQX2_qg9UKvahh4zlhuuLHAGy2kyUvHiI');
var mark = [];
var markTMP = [];
var DBB;
class Markers extends Component {
  constructor(props) {
    super(props);
     DBB = {ID: this.props.groupId,
            PW:  this.props.groupPW,
            UN: this.props.username
     };
  }
  componentDidMount() {
        Meteor.subscribe('lokasyonlar', DBB);
  }
  markerRender() {
    DBSIZE = Lokasyonlar.find().count();
    mapsapi().then(function(maps) {
      for (var k = 0; k < mark.length; k++) {
        mark[k].setMap(null);
      }
      mark = [];
    })
    this.denemeBu();
  }

  denemeBu() {
    return this.props.lokasyonlar.map((lk) => {
      var latTmp = lk.lat;
      var lngTmp = lk.lng;
      var username = lk.username;
      var pos = {
        lat: latTmp,
        lng: lngTmp
      };
      mapsapi().then(function(maps) {
        var marker = new google.maps.Marker({
          position: pos,
          title: username,
          username: username,
          lat: latTmp,
          lng: lngTmp,
          icon: {
            url: "http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png",
          }
        });
        google.maps.event.addListener(marker, 'click', function() {
          // console.log(marker.username, marker.id, marker.title, marker.position);
        });

        DBSIZE = Lokasyonlar.find().count();

        mark.push(marker);
        for (var i = 0; i < DBSIZE; i++) {
          mark[i].setMap(map);
          console.log(mark[i]);
        }


      });
    })

  }


  render() {
    return (<div className = "content" >
    {this.markerRender()}
    </div>

    );
  }
}

export default createContainer(() => {
  console.log();
  return {
    lokasyonlar: Lokasyonlar.find({}).fetch(),
  };

}, Markers);
