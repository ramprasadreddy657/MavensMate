/* compile-metadata commander component
 * To use add require('../cmds/delete-metadata.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

var util 				= require('../util').instance;
var inherits 		= require('inherits');
var BaseCommand = require('../command');

function Command() {
	Command.super_.call(this, Array.prototype.slice.call(arguments, 0));
}

inherits(Command, BaseCommand);

Command.prototype.execute = function() {
	var self = this;
	
	var project = self.getProject();
	project.deleteFromServer(self.payload.files)
		.then(function(result) {
			self.respond(result);
		})
		['catch'](function(error) {
			self.respond('Could not delete metadata', false, error);
		})
		.done();
};

exports.command = Command;
exports.addSubCommand = function(client) {
	client.program
		.command('delete-metadata')
		.alias('delete')
		.version('0.0.1')
		.description('Deletes metadata from the salesforce.com server')
		.action(function(/* Args here */){
			util.getPayload()
				.then(function(payload) {
					client.executeCommand(this._name, payload);	
				});
		});
};