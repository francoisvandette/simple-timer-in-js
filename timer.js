class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.intervalTimeInMilli = 20;
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener(`click`, this.start/*.bind(this)*/);
        this.pauseButton.addEventListener(`click`, this.pause);
    }

    // start() {
    //     console.log(`FV Timer:`, this);
    // }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, this.intervalTimeInMilli);
    };

    pause = () => {
        clearInterval(this.interval);
    };

    tick = () => {
        // const timeRemaining = this.timeRemaining;
        // this.timeRemaining = timeRemaining - 1;

        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - (this.intervalTimeInMilli / 1000);
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }

    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}