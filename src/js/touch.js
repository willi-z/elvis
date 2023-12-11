export class TouchHelper{
    constructor (
        left = null,
        right = null,
        up = null,
        down = null
    ) {
        this.left = left;
        this.right = right;
        this.up = up;
        this.down = down;
        this._start = null;

        this.addTouchStartListener();
        this.addTouchedListener();
    }

    addTouchStartListener(){
        let self = this;
        window.addEventListener('touchstart',function(event){
            if(event.touches.length === 1){
               //just one finger touched
               var touch = event.touches.item(0);
               self.start = [touch.clientX, touch.clientY];
             }else{
               //a second finger hit the screen, abort the touch
               self.start = null;
             }
        });
    }

    addTouchedListener(){
        let self = this;
        window.addEventListener('touchend',function(event){
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            var offsetX = vw * 0.6; // the swipe mist be 60% of the windows size
            var offsetY = vh * 0.4;
            if(self.start){
              //the only finger that hit the screen left it
              var touch = event.changedTouches.item(0);
              var end = [touch.clientX, touch.clientY];
        
              if(end[0] - self.start[0] >  offsetX){
                //a left -> right swipe
                if(self.right != null){
                    self.right();
                }
              }
              if(end[0] - self.start[0] < -offsetX ){
                //a right -> left swipe
                if(self.left != null){
                    self.left();
                }
              }
              if (end[1] - self.start[1] < -offsetY){
                console.log('up');
              }
              if (end[1] - self.start[1] >  offsetY){
                console.log('down');
              }
            }
          });
    }
}