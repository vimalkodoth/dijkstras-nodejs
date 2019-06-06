import { TripSorter } from './tripsorter.js';

if(!window.customElements.get('trip-sorter')){
    window.customElements.define('trip-sorter', TripSorter);
}