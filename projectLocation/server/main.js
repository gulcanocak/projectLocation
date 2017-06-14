import { Meteor } from 'meteor/meteor';
import { Lokasyonlar } from '../imports/collections/lokasyonlar';
// import { WebApp } from 'meteor/webapp';
// import ConnectRoute from 'connect-route';
Meteor.startup(() => {
  Meteor.publish('lokasyonlar', function(DBB) {
     return Lokasyonlar.find({  groupId: {$eq: DBB.ID },groupPw: {$eq: DBB.PW } });
  });
});
