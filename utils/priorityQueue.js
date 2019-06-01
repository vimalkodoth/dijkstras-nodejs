class PriorityQueue{
    constructor(){
        this.queue = [];
    }
   
    enqueue(node, label){
      if(!this.queue.length){
        this.queue.push(node);
        return;
      }
      var length = this.queue.push(node), pos, parent;
      pos = length-1;
      if(pos % 2 === 0){
        parent = Math.floor(pos/2)-1;
      } else {
        parent = Math.floor(pos/2);
      }
      
      while((parent > pos)  && this.queue[pos][1] < this.queue[parent][1]){
         var temp = this.queue[pos];
              this.queue[pos] = this.queue[parent];
              this.queue[parent] = temp;
              pos = parent;
        
        if(pos % 2 === 0){
          parent = Math.floor(pos/2)-1;
        } else {
          parent = Math.floor(pos/2);
        } 
      }
      
    }
   
   dequeue(node){
       return this.queue.shift();
   }
   
   isEmpty(){
     return !this.queue.length;
   }
 }

 module.exports = PriorityQueue;