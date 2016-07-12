//meteor add accounts-password <-a package which manages user collection (Ex: meteor.users)
//meteor add accounts-ui <-package which helps build ui for login
//meteor remove autopublish <- so that users can't access entire database.
//meteor remove insecure <- prevent users from inserting data into collection

PlayerList = new Mongo.Collection('players'); //reference variable PlayerList points to a Collection called players

Meteor.subscribe('thePlayers'); //subscribe retrieves accessible data

Template.leaderboard.helpers({ //helper functions go inside templates
	'player': function(){
		var currentUserId = Meteor.userId();
		return PlayerList.find({},{sort: {score:-1, name:1}});
	},
		 //1st argument: returns all documents. 2nd argument, sort scores in descending, names in ascending order.
	'selectedClass': function(){
		var playerId = this._id;
		var selectedPlayer = Session.get('selectedPlayer');
		if(playerId == selectedPlayer){
			return "selected";
		}
	},
	'showSelectedPlayer': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		return PlayerList.findOne(selectedPlayer);
	}
});

Template.leaderboard.events({
	'click .player': function(){ //this player class refrers to <li class="player"> in html 
		var playerId = this._id; //refers to the primary key of the document
		Session.set('selectedPlayer', playerId); //store playerId on session called selectedPlayer
	},
	'click .increment': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		Meteor.call('modifyPlayerScore',selectedPlayer, 5);

		
	},
	'click .decrement': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		Meteor.call('modifyPlayerScore',selectedPlayer, -5);
	}
});

Template.addPlayerForm.events({
	'submit form': function(event){
	event.preventDefault();//prevents default behavior of submmiting forms.(Prevents refreshing of the page)
	var playerNameVar = event.target.playerName.value;
	var currentUserId = Meteor.userId(); //returns unique ID of the currently logged in user
	
	Meteor.call('insertPlayerData',playerNameVar);
	},

	'click .remove': function(){
		var selectedPlayer = Session.get('selectedPlayer');
		Meteor.call('removePlayerData', selectedPlayer);
	}
});