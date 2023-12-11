import { getCookie, setCookie } from './cookie.js';
import { fullScreenMode, normalScreenMode } from './screen.js';
import {TouchHelper} from './touch.js';


export class Presentation{

    constructor(isLooped=false){
        this.content = document.querySelector('.slides');
        this.slides = this.content.querySelectorAll('section');
        this.currentSlideNo=0;
        if (getCookie('currentSlideNo')!=''){
            this.currentSlideNo = Number(getCookie('currentSlideNo'));
        }
        setCookie('currentSlideNo', this.currentSlideNo);
        this.totalSlidesNo = 0;
        this.currentSlide = null;
        this.isLooped = isLooped;
        this.updateCurrentSlide();
        this.currentSlide.classList.add('show');
        this.intervalTimer = null;

        this.listener = {};
        this.addKeyListener(this);
        this.addTouchListener(this);
    }

    updateCurrentSlide() {
        this.currentSlide = this.slides[this.currentSlideNo];
        this.currentSlide.classList.add('show');
    }

    updateSlideNo() {
        this.slideCounter.innerText = `${this.currentSlideNo+1} of ${this.totalSlidesNo}`;
    }

    update() {
        this.totalSlidesNo = this.slides.length;
        this.updateCurrentSlide();
        // this.updateSlideNo();
    }

    changeCurrentSlideNo(newSlideNumber){
        this.currentSlide.classList.remove('show');
        this.currentSlideNo = newSlideNumber;
        setCookie('currentSlideNo', this.currentSlideNo);
    }

    moveToLeftSlide() {
        if (this.currentSlideNo == 0){
            if (this.isLooped) {
                this.currentSlideNo = this.totalSlidesNo;
            } else {
                return;
            }
        }
        this.changeCurrentSlideNo(this.currentSlideNo-1);
        this.update();
    }

    moveToRightSlide() {
        if (this.currentSlideNo == this.totalSlidesNo-1){
            if (this.isLooped) {
                this.currentSlideNo = -1;
            } else {
                return;
            }
        }
        this.changeCurrentSlideNo(this.currentSlideNo+1);
        this.update();
    }

    switchLooping() {
        this.isLooped = !this.isLooped;
        if (this.intervalTimer != null){
            this.stopAutomation();
        }
    }

    startAutomation() {
        let self = this;
        this.isLooped = true;
        this.intervalTimer = window.setInterval(() => {
                self.moveToRightSlide();
            }, 
            5000
        );
    }

    stopAutomation(){
        window.clearInterval(this.intervalTimer);
        this.intervalTimer = null;
    }

    automateLoop(){
        if (this.intervalTimer == null){
            this.startAutomation();
        } else {
            this.stopAutomation();
        }
        
    }


    addTouchListener(self){
        this.listener['touch'] = new TouchHelper(
            ()=>{self.moveToRightSlide();},
            ()=>{self.moveToLeftSlide();}
        );
    }


    addKeyListener(self) {
        document.addEventListener('keydown', function(event){
            let presentation = self;
            //console.log(event.code);
            switch (event.code) {
                case 'ArrowLeft':
                    presentation.moveToLeftSlide();
                    break;
                case 'ArrowRight':
                    presentation.moveToRightSlide();
                    break;
                case 'ArrowUp':
                    // Up pressed
                    break;
                case 'ArrowDown':
                    // Down pressed
                    break;
                case 'Escape':
                    normalScreenMode();
                    break;
                case 'KeyF':
                    fullScreenMode();
                    break;
                case 'KeyL':
                    presentation.switchLooping();
                    break;
                case 'KeyA':
                    presentation.automateLoop();
                    break;
            }
        });
    }
}
