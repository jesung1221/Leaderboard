PlayerList = new Mongo.Collection('players');
//meteor.publish determines what data could be accessible
Meteor.publish('thePlayers',function(){
	var currentUserId = this.userId; //
	return PlayerList.find({createdBy: currentUserId});
})

Meteor.methods({
	'sendLogMessage': function(){
		console.log("Hello World");
	},
	'insertPlayerData': function(playerNameVar){
		var currentUserId = Meteor.userId();
		PlayerList.insert({
			name: playerNameVar,
			score:0,
			createdBy:currentUserId
		});
	},
	'removePlayerData': function(selectedPlayer){
		var currentUserId = Meteor.userId();
		PlayerList.remove({_id: selectedPlayer, createdBy: currentUserId});
	},
	'modifyPlayerScore': function(selectedPlayer,scoreValue){
		var currentUserId = Meteo.userId();
		PlayerList.update({_id: selectedPlayer, createdBy: currentUserId}, {$inc: {score:scoreValue}}); //mongo operator $set (updates without deleting the original document)
	}

});