import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Ledgers = new Mongo.Collection('ledgers');

if (Meteor.isServer) {
    // This runs on the server only 
    // Only publish ledgers that are public or belong to the current user
    Meteor.publish('ledgers', function ledgersPublication() {
        return Ledgers.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'ledgers.insert'(title) {
        check(title, String);

        // Check if user is logged in before inserting a ledger

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Ledgers.insert({
            title,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
            private: true,
        });
    },
    'ledgers.remove'(ledgerId) {
        check(ledgerId, String);

        const ledger = Ledgers.findOne(ledgerId);

        if (ledger.owner !== Meteor.userId()) {
            // If the current user isn't the owner of a task, they can't delete it
            throw new Meteor.Error('not-authorised');
        }

        Ledgers.remove(ledgerId);
    },
    'ledgers.setPrivate'(ledgerId){
        check(ledgerId, String);
        check(setToPrivate, Boolean);

        const ledger = Ledgers.findOne(ledgerId);

        // Only ledger owner can make it private/public
        if (ledger.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Ledgers.update(ledgerId, { $set: { private: setToPrivate } });
    },
    'ledgers.addPerson'(ledgerId, personName, personEmail) {
        check(ledgerId, String);
        check(personName, String);
        check(personEmail, String);

        const ledger = Ledgers.findOne(ledgerId);

        if (ledger.owner !== Meteor.userId()) {
            // If the current user isn't the owner of the ledger they cannot edit
            throw new Meteor.Error('not-authorised');
        }

        let ledgerPeople = ledger.people;
        if (ledgerPeople == null) {
            ledgerPeople = { personName: personEmail };
        } else if (ledgerPeople.personName !== null) {
            throw new Meteor.Error('non-unique-person-name');
        } else {
            ledgerPeople.personName = personEmail;
        }

        Ledgers.update(ledgerId, { $set: { people: ledgerPeople } });
    },
});
