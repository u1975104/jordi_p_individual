const back = "../resources/back.png";
const items = ["../resources/cb.png","../resources/co.png","../resources/sb.png",
"../resources/so.png","../resources/tb.png","../resources/to.png"];

var game = new Vue({
	el: "#game_id",
	data: {
		username:'',
		current_card: [],
		items: [],
		num_cards: 2,
		bad_clicks: 0,
		difficulty:"normal",
		started: false
	},
	created: function(){
		this.username = sessionStorage.getItem("username","unknown");
		//NUMERO DE CARTES
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		options_data = JSON.parse(json);
		this.num_cards = options_data.cards;
		//DIFICULTAT
		this.difficulty = options_data.dificulty;
		this.items = items.slice(); // Copiem l'array
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		this.items = this.items.slice(0, this.num_cards); // Agafem els primers numCards elements
		this.items = this.items.concat(this.items); // Dupliquem els elements
		this.items.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		for (var i = 0; i < this.items.length; i++){
			this.current_card.push({done: false, texture: back});
		}
		setTimeout(this.girarCartes, 2000);
		setTimeout(this.tornarNormalitat, 6000);
	},
	methods: {
		clickCard: function(i){
			if (!this.current_card[i].done && this.current_card[i].texture === back)
				Vue.set(this.current_card, i, {done: false, texture: this.items[i]});
		},

		girarCartes: function(i){
			for (var i = 0; i < this.current_card.length; i++){
				Vue.set(this.current_card, i, {done: false, texture: this.items[i]});
			}
		},
		tornarNormalitat: function(i){
			for (var i = 0; i < this.current_card.length; i++){
				Vue.set(this.current_card, i, {done: false, texture: back});
			}
			this.started = true;
		}
	},
	watch: {
		current_card: function(value){
			if (value.texture === back || !this.started) return;
			var front = null;
			var i_front = -1;
			for (var i = 0; i < this.current_card.length; i++){
				if (!this.current_card[i].done && this.current_card[i].texture !== back){
					if (front){
						if (front.texture === this.current_card[i].texture){
							front.done = this.current_card[i].done = true;
							this.num_cards--;
						}
						else{
							Vue.set(this.current_card, i, {done: false, texture: back});
							Vue.set(this.current_card, i_front, {done: false, texture: back});
							this.bad_clicks++;
							break;
						}
					}
					else{
						front = this.current_card[i];
						i_front = i;
					}
				}
			}			
		}
	},
	computed: {
		score_text: function(){
			if (this.difficulty == "hard") {
				return 100 - this.bad_clicks * 40
			} else if (this.difficulty == "normal") {
				return 100 - this.bad_clicks * 20
			} else { //easy
				return 100 - this.bad_clicks * 10
			}
			;
		}
	}
});





