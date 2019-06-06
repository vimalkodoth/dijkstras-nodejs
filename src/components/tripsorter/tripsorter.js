import css from './tripsorter.module.scss';

var Handlebars = require('handlebars/dist/handlebars.min.js');

const formTemplateString = `
    <form class="Tripsorter">
        <h1>Trip Sorter!</h1>
        <div class="Tripsorter__from">
            <select>
            <option value="" disabled selected>Select From</option>
            {{#each fromList}}
                <option value="{{this}}">{{this}}</option>
            {{/each}}
            </select>
        </div>
        <div class="Tripsorter__to">
            <select>
            <option value="" disabled selected>Select To</option>
            {{#each toList}}
                <option value="{{this}}">{{this}}</option>
            {{/each}}
            </select>
        </div>
        <div class="Tripsorter__options">
            <span> Cheapest </span> <input type="radio" name="options" value="cost" checked>
            <span> Fastest </span> <input type="radio" name="options" value="duration"><br/>
        </div>
        <div class="Tripsorter__discount">
            <span> Apply Discount ? </span> <input type="checkbox" name="discount" value=""><br/>
        </div>
        <div class="Tripsorter__submit">
            <input id="submit" type="submit" value="Submit">
        </div>
    </form>`;

const routeTemplateString = `<div class="Tripsorter">
    <h1>Trip Sorter!</h1>
    {{#if routes.length}}
    <h4>Available Routes</h4>
    {{else}}
    <h3>No routes available from origin to destination!</h3>
    {{/if}}
    <div class="Tripsorter__routes">
        <ul>
        {{#each routes}}
            <li><span id="from">{{this.from}}</span><span id="details"><span id="cost">{{this.cost}}</span><span id="duration">{{this.duration}}</span><span id="transport">{{this.transport}}</span></span></span><span id="to">{{this.node}}</span>
        {{/each}}
        </ul>
    </div>
    <div class="Tripsorter__backButton">
        <input id="back" type="submit" value="Back">
    </div>
    `;

let _fetchAndPopulateRoutes = function(data){
    return fetch('http://localhost:3000/tripsorter',{ method: 'POST', headers:{ 'Content-Type':'application/json'}, body : JSON.stringify(data)})
    .then((response) => {
        return response.json();
    })
    .then(function(json){
        return json || [];
    })
}

let _attachEventListeners = function(self){
    if(self.state.routes){
        self.querySelector('input#back').addEventListener('click', (e) => {
            e.preventDefault();
            let state = self.state;
            state.routes = null;
            self.state = state;
        });
        return;
    }
    var f = onFormSubmit.bind(self);
    let form = self.querySelector('form');
    form.removeEventListener('submit', f)
    form.addEventListener('submit', f);
}

let onFormSubmit = function(e){
    var self = this,
    data = {},
    fromElm = self.querySelector('.Tripsorter__from select'),
    toElm = self.querySelector('.Tripsorter__to select');
    data['fromVal'] = fromElm.options[fromElm.selectedIndex].value;
    data['toVal'] = toElm.options[toElm.selectedIndex].value;
    data['option'] = self.querySelector('input[name="options"]:checked').value;
    data['discount'] = self.querySelector('input[name="discount"]').checked;
    e.preventDefault();
    if(!(data.fromVal && data.toVal)){
        return;
    }
    _fetchAndPopulateRoutes(data).then((routes) => {
        var state = self.state;
        state.routes = routes;
        self.state = state;
        console.log(routes);
    });
}

let template = document.createElement('template');

export class TripSorter extends HTMLElement {
    constructor(){
        super();
        this._state = {
            toList: [],
            fromList: [],
            routes : null
        }
        this.getFormList();
        Object.defineProperty(this, 'state', {
            set: (val) => {
                this._state = val;
                this.render();
            },
            get: () => {
                return this._state;
            }
        });
    }

    connectedCallback(){
        this.render();
        this.visible = !!this.hasAttribute('visible');
    }

    disconnectedCallback(){

    }

    attributeChangedCallback(name, oldVal, newVal) {

    }

    getFormList(){
        var that = this;
        fetch('http://localhost:3000/tripsorter/destinations').then(function(resp){
            return resp.json();
        }).then(function(data){
            var state = that.state;
            state.toList = data.toList;
            state.fromList = data.fromList;
            that.state = state;
        });
    }

    render(){
        console.log('render');
        var templateString = this.state.routes ? routeTemplateString : formTemplateString;

        this.innerHTML = '';
        console.log(templateString);
        let compiled = Handlebars.compile(templateString), html;
        if(this.state.routes){
            html = compiled({routes: this.state.routes});
        } else {
            html = compiled({fromList: this.state.fromList, toList:this.state.toList});
        }
        template.innerHTML = html;
        this.appendChild(template.content.cloneNode(true));
        _attachEventListeners(this);
    }
}

