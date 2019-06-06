let data = require('../static/cities');


class Helpers {

    constructor(){
        this.arrivals = [];
        this.departures = [];
        for(let i=0;i<data.deals.length;i++){
            if(data.deals[i].departure && this.departures.indexOf(data.deals[i].departure) === -1){
              this.departures.push(data.deals[i].departure);
            }
            if(data.deals[i].arrival && this.arrivals.indexOf(data.deals[i].arrival) === -1){
              this.arrivals.push(data.deals[i].arrival);
            }
        }
    }

    getArrivals(){
        return this.arrivals;
    }

    getDepartures(){
        return this.departures;
    }

    getUniqueNodes(){
        let that = this;
        let unique = this.departures.concat(this.arrivals.filter((item, i) => {
            return that.departures.indexOf(item) < 0;
        }));

        return unique || [];
    }
}

module.exports = new Helpers();