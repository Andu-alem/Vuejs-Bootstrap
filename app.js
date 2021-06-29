var data = {
	items: [{text: 'Bananas', checked: false}, {text: 'Apples', checked:true}],
	title: 'My Shopping List',
	newitem: '',
	counter: null,
	min: 2,
	sec: 0,
	isFinished: false,
	isStarted: false,
	changeMessage: "",
	view: 'Home',
	statusState: '',
	countingMsg: "Start Counting",
	counterClass: "btn btn-sm btn-outline-primary"
};

var watcherComponent = Vue.extend({
	template:`<div class="form-group">
	<strong class="h4">Practicing Watcher or watch property</strong><hr>
	<label>Kilometers</label>
	<input type="text" class="form-control" v-model="kilometers">
	<label>Meters</label>
	<input type="text" class="form-control" v-model="meters">
	</div>`,
	data: function(){
		return{
			kilometers: 0,
			meters: 0
		}
	},
	watch: {
		kilometers: function(val){
			this.kilometers = val;
			this.meters = val*1000;
		},
		meters: function(val){
			this.kilometers = val/1000;
			this.meters = val;
		}
	}
});
Vue.component('watch-component',watcherComponent);

var homeComponent = Vue.extend({
	template: `<div class="home"><h5>This is from Home Component</h5>
	<p class="p-2">As you can see this is done using the concept of dynamic component
	<br> This Home page is can be used to display basic info </p>
	</div>`
});
var contactusComponent = Vue.extend({
	template: `<div class="contactus"><h5>This is from Contact Us Component</h5>
	<p class="p-2">As you can see this is done using the concept of dynamic component
	<br> In this page you can list your contact info</p>
	</div>`
});
var aboutusComponent = Vue.extend({
	template: `<div class="aboutus"><h5>This is from About Us Component</h5>
	<p class="p-2">As you can see this is done using the concept of dynamic component
	<br> In this about us page you can describe about your personal info</p>
	</div>`
});

var navigationComponent = Vue.extend({
	template:'<ul><li class="pointer" v-for="option in listOptions" :id="option" @click="showSetting(option)">{{ option }}<div class="p-3" v-if="option == `Settings` && isSettingPressed" v-html="element"></div></li></ul>',
	data: function(){
		return{
			listOptions: ['Find by id', 'Settings','Edit Profile','Log out', 'See more things'],
			isSettingPressed: false,
			element: "<div><h5>under settng</h5>\
					<p>the settings go here</p></div>"
		}
	},
	methods:{
		showSetting(val){
			if(val == "Settings"){
				if(this.isSettingPressed){
					this.isSettingPressed = false;
				}else{
					this.isSettingPressed = true;
				}
			}
		}
	}
});
Vue.component('navigation-component', navigationComponent);

var footerComponent = Vue.extend({
	template:`<div class="row">
		<div class="col-12 col-sm-4 border-sm-left">
		<h3>Footer one</h3>
		<p>This is footer body used to put some ideas here</p></div>
		<div class="col-12 col-sm-4">
		<h3>Footer Two</h3>
		<p>This is footer body used to put some ideas here</p></div>
		<div class="col-12 col-sm-4">
		<h3>Footer Three</h3>
		<p>This is footer body used to put some ideas here</p></div>
		</div>`
});
Vue.component('footer-component', footerComponent);

Vue.component('slot-component',{
	template: `<div><span><slot></slot></span>
	<p>This part is for Practicing the usage of a slot</p></div>`
});

var showMoreComponent = Vue.extend({
	template:`<div class="mt-2 p-1">
			<a class="border font-weight-bold" v-if="!isShowedMore" @click="showMore()">More</a>
			<div class="row" v-if="isShowedMore">
			<div class="col-12 col-sm-4 pb-2">
			<img class="w-100" src="img/2.jpg"></div>
			<div class="col-12 col-sm-4 pb-2">
			<img class="w-100" src="img/1.jpg"></div>
			<div class="col-12 col-sm-4 pb-2">
			<img class="w-100" src="img/6.jpg"></div>
			</div>
			<a class="border font-weight-bold" v-if="isShowedMore" @click="showMore()">Minimize</a></div>`,
	data: function(){
		return{
			isShowedMore: false
		}
	},
	methods:{
		showMore: function(){
			this.isShowedMore = !this.isShowedMore
		}
	}
});
Vue.component('showmore-component', showMoreComponent);

Vue.component('computed-component',{
	template:`<div>
		<input type="number" v-model="incrementOne"/>
		<h3>Get input: {{ incrementOne }} and Count: {{ count }}</h3>
		</div>`,
	data: function(){
		return{
			count: -1,
			name: ''
		}
	},
	computed: {
		incrementOne: {
			get(){
				return this.count + 1
			},
			set(val){
				this.count = val - 1
				//this.name = "andualem"
			}
		}
	}
})

Vue.component('search-component',{
	template:`<div class="p-4">
		<h2 class="text-info">List of Frameworks</h2>
		<input class="m-1" v-model="input" @keyup="searchList" placeholder="Search with Methods"/><br/>
		<input class="m-1" v-model="input1" placeholder="Search with Watcher"/><br/>
		<input class="m-1" v-model="input3" placeholder="Search with computed"/>
		<ol class="mt-2">
			<li v-for="(item, i) in methodFilterList" :key="i"> {{ item }}</li>
		</ol>
		</div>`,
	data(){
		return{
			frameWorkList:[
			'Vue',
			'React',
			'Backbone',
			'Ember',
			'Knockout',
			'jQuery',
			'Angular',
			],
			input: '',
			input1: '',
			inputValue: '',
			methodFilterList: []
		}
	},
	created(){
		this.methodFilterList = this.frameWorkList
	},
	computed:{
		input3: {
			get(){
				return this.inputValue
			},
			set(val){
				this.inputValue = val
				this.methodFilterList = this.frameWorkList.filter(item =>
				item.toLowerCase().includes(val.toLowerCase()))
			}
		}
	},
	watch:{
		input1(newValue, oldValue){
			this.methodFilterList = this.frameWorkList.filter(item =>
				item.toLowerCase().includes(newValue.toLowerCase()))
		}
	},
	methods: {
		searchList: function(){
			this.methodFilterList = this.frameWorkList.filter(item =>
				item.toLowerCase().includes(this.input.toLowerCase()))
		}
	}
});


//using localStroage concept  adding notes 
var localStorageComponent = {
	template : `<div>
				<h2>Local Storage Example</h2>
				<div class="row">
					<lebel class="col-4 font-weight-bold">Choose Notes</lebel>
					<select class="form-control m-2 p-3 col-7" id="select" @change="slctChange">
						<option class="form-control" disabled>Notes List</option>
						<option class="form-control" v-for="name in options" :selected="selected">{{ name }}</option>
					</select>
				</div>
				<button class="btn btn-sm btn-outline-primary m-2" @click="addNote">Add Note</button>
				<button class="btn btn-sm btn-outline-danger m-2" @click="removeNote">Remove All Notes</button>
				<textarea class="form-control m-2" id="ta" :value="val" @change="textChange" rows="4"></textarea>
				</div>`,
	data:function(){
		return{
			val: "",
			options: [],
			state: {},
			selected: false
		}
	},
	methods: {
		setState(newState){
			this.options.splice(0)
			for(var name of Object.keys(newState.notes)){
				if(newState.selected == name) this.selected = true;
				this.options.push(name)
			}
			this.val = newState.notes[newState.selected]
			localStorage.setItem("Notes",JSON.stringify(newState))
			this.state = newState
		},
		slctChange: function(e){
			this.setState({notes: this.state.notes, selected: e.target.value})
		},
		textChange(e){
			this.setState({notes: Object.assign({}, this.state.notes,
				{[this.state.selected]: e.target.value}),
			selected: this.state.selected})
		},
		addNote(e){
			let name = prompt("Note Name")
			if(name) {
				this.setState({
				notes: Object.assign({}, this.state.notes, {[name]: ""}),
				selected: name
			})}
		},
		removeNote(){
			localStorage.removeItem("Notes");
			this.setState(JSON.parse(localStorage.getItem("Notes")) || {
			notes: {"shopping list": "Carrots\nRaisins"},
			selected: "shopping list"
		})

		}
	},
	mounted(){
		this.setState(JSON.parse(localStorage.getItem("Notes")) || {
			notes: {"shopping list": "Carrots\nRaisins"},
			selected: "shopping list"
		})
	}
}
Vue.component('localstorage-component', localStorageComponent);




new Vue({
	el: '#app',
	data: data,
	computed:{
		timestamp: function(){
			return this.min+" : "+this.sec;
		},
		status:{
			get: function(){
				return (this.statusState ==='online'? true:false);
			},
			set: function(val){
				if(val){
					this.statusState = 'online';
				}else{
					this.statusState = 'offline';
				}
			}
		}
	},
	methods:{
		additem: function(){
			var text;
			text = this.newitem.trim();
			if(text){
				this.items.push({
					text: text,
					checked: false
				});
				this.newitem = '';
			}
		},
		toggleCounter: function(){
			if(this.isStarted){
				clearInterval(this.counter);
				if(this.isFinished){
					this.min = 2;
					this.sec = 0;
					this.isFinished = false;
				}
				this.isStarted = false;
				this.countingMsg = "Start Counting";
				this.counterClass = "btn btn-sm btn-outline-primary";
			}else{
				this.counter = setInterval(this.counting, 1000);
				this.isStarted = true;
				this.countingMsg = "Stop Counting";
				this.counterClass = "btn btn-sm btn-outline-secondary";
			}
		},
		counting: function(){
			if(this.sec !== 0){
				this.sec--;
				return;
			}
			if(this.min !== 0){
				this.min--;
				this.sec = 59;
				return;
			}
			this.isFinished = true;
			this.toggleCounter();
			return;
		},
		changeView: function(e){
			var view_name = e.split(" ");
			this.view = (view_name).join("_");
		},
		removeItem(val){
			if(val=="all"){
				this.items.splice(0);
			}else{
				this.items = this.items.filter(item => item != this.items[val]);
			}
		}
	},
	watch:{
		title: function(val){
			this.changeMessage = "You are changing the title To - "+val;
		}
	},
	components:{
		'Home': homeComponent,
		'About_us': aboutusComponent,
		'Contact_us': contactusComponent
	}
});