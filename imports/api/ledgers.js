import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Ledgers = new Mongo.Collection('ledgers');

Meteor.methods({
    'ledgers.insert'(title) {
        check(title, String);
    },
});
