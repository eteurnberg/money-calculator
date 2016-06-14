import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Ledgers = new Mongo.Collection('ledgers');

Meteor.methods({
    'ledgers.insert'(title) {
        check(title, String);

        // Check if user is logged in before inserting a task

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Ledgers.insert({
            title,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
    },
    'ledgers.remove'(taskId) {
        check(taskId, String);

        Ledgers.remove(taskId);
    },
});
