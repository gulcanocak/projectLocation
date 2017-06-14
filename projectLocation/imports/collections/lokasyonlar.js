import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';
export const Lokasyonlar = new Mongo.Collection('lokasyonlar');


Meteor.methods({
  'lokasyonlar.remove': function (usr) {
      Lokasyonlar.remove({username: usr});
  },
  'lokasyonlar.update': function (user,lt,lg) {
      Lokasyonlar.update({username:user}, {$set:{lat:lt, lng: lg}})
  },
  'lokasyonlar.insert': function (groupId,groupPW,user,lt,lg) {
      Lokasyonlar.insert({groupId:groupId, groupPW:groupPW, username:user, lat:lt,lng:lg,createdAt: new Date()})
  }
});
