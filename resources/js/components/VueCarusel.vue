<template>
    <div class="slider-container">
        <div class="slider" :style="{ transform: 'translateX(' + -currentSlide * 100 + '%)' }" @mousedown="handleMouseDown"
            @mousemove="handleMouseMove" @mouseup="handleMouseUp" @touchstart="handleTouchStart"
            @touchmove="handleTouchMove" @touchend="handleTouchEnd" @transitionend="transitionEnd">
            <div class="slide" v-for="(slide, index) in sliders" :key="index" :class="{ active: currentSlide === index }">
                <h1>{{ slide.title }}</h1>
                <p>{{ slide.text }}</p>
                <button @click="buttonClicked(index)">Order Now</button>
            </div>
        </div>
        <div class="dots" v-if="sliders.length > 1">
            <span class="dot" v-for="(slide, index) in sliders" :key="index" :class="{ active: currentSlide === index }"
                @click="changeSlide(index)"></span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {

    data() {
        return {
            sliders: [],
            currentSlide: 0,
            startX: null,
            endX: null,
            isDragging: false,
            autoSlideInterval: null
        };
    },
    computed: {
        prevSlide() {
            return this.currentSlide === 0 ? this.sliders.length - 1 : this.currentSlide - 1;
        },
        nextSlide() {
            return this.currentSlide === this.sliders.length - 1 ? 0 : this.currentSlide + 1;
        }
    },
    created() {
        this.fetchTasks();
        this.startAutoSlide();

    },
    methods: {
        buttonClicked(index) {
            console.log('Кнопка нажата для слайда с индексом:', index);
        },
        changeSlide(index) {
            this.currentSlide = index;
        },
        handleMouseDown(event) {
            this.startX = event.clientX;
            this.isDragging = true;
        },
        handleMouseMove(event) {
            if (this.isDragging) {
                const deltaX = event.clientX - this.startX;
                const currentX = -this.currentSlide * 100 + deltaX / window.innerWidth * 100;
                this.$el.querySelector('.slider').style.transform = 'translateX(' + currentX + '%)';
            }
        },
        handleMouseUp(event) {
            if (this.isDragging) {
                const deltaX = event.clientX - this.startX;
                const threshold = 0.2; // минимальное смещение для переключения слайда
                if (deltaX / window.innerWidth < -threshold && this.currentSlide < this.sliders.length - 1) {
                    this.currentSlide++;
                } else if (deltaX / window.innerWidth > threshold && this.currentSlide > 0) {
                    this.currentSlide--;
                }
                this.startX = null;
                this.isDragging = false;
            }
        },
        handleTouchStart(event) {
            this.startX = event.changedTouches[0].clientX;
            this.isDragging = true;
        },
        handleTouchMove(event) {
            if (this.isDragging) {
                const deltaX = event.changedTouches[0].clientX - this.startX;
                const currentX = -this.currentSlide * 100 + deltaX / window.innerWidth * 100;
                this.$el.querySelector('.slider').style.transform = 'translateX(' + currentX + '%)';
            }
        },
        handleTouchEnd(event) {
            if (this.isDragging) {
                const deltaX = event.changedTouches[0].clientX - this.startX;
                const threshold = 0.2; // минимальное смещение для переключения слайда
                if (deltaX / window.innerWidth < -threshold && this.currentSlide < this.sliders.length - 1) {
                    this.currentSlide++;
                } else if (deltaX / window.innerWidth > threshold && this.currentSlide > 0) {
                    this.currentSlide--;
                }
                this.startX = null;
                this.isDragging = false;
            }
        },
        startAutoSlide() {
            this.autoSlideInterval = setInterval(() => {
                this.currentSlide = this.nextSlide;
                this.sliderOffset = -(this.currentSlide * 100);
                this.goToSlide(this.currentSlide); // добавлено
                if (this.currentSlide === 0) { // добавлено
                    this.$el.querySelector('.slider').classList.add('no-transition'); // добавлено
                    setTimeout(() => {
                        this.$el.querySelector('.slider').classList.remove('no-transition');
                    }, 5000);
                } else if (this.currentSlide === this.sliders.length - 1) {
                    this.$el.querySelector('.slider').classList.add('no-transition');
                    setTimeout(() => {
                        this.$el.querySelector('.slider').classList.remove('no-transition');
                    }, 5000);
                }
            }, 5000);
        },
        stopAutoSlide() {
            clearInterval(this.autoSlideInterval);
        },
        goToSlide(index) {
            this.currentSlide = index;
        },
        transitionEnd() {
            if (this.currentSlide === this.sliders.length - 1) {
                this.currentSlide = this.nextSlide;
                this.$el.querySelector('.slider').style.transition = 'none';
                this.$el.querySelector('.slider').style.transform = 'translateX(' + -this.currentSlide * 100 + '%)';
                setTimeout(() => {
                    this.$el.querySelector('.slider').style.transition = 'transform 0.5s ease-in-out';
                }, 0);
            } else if (this.currentSlide === 0) {
                this.currentSlide = this.sliders.length - 1;
                this.sliderOffset = -(this.currentSlide * 100);
            }
        },
        fetchTasks() {
            axios.get('/api/sliders')
                .then(response => {
                    this.sliders = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
};
</script>

<style scoped>
h1, p {
    color: white;
}

.slider-container {


    position: relative;
    margin-left: 350px;
    overflow: hidden;
    width: 100%;
    height: 300px;
    background-color: transparent;

}

.slider {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease-in-out;
}

.slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    position: relative;
    z-index: 1;
    transition: transform 0.5s ease-in-out;
    background-color: transparent;
}

.slide.active {
    z-index: 2;
    transform: translateX(0);
}

.slide.next {
    transform: translateX(100%);
}

.slide.prev {
    transform: translateX(-100%);
}

.slide p {
    color: beige;
    width: 555px;
}

.dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    z-index: 3;
    left: 75px;
}

.dot {
    width: 12px;
    height: 12px;

    border-radius: 50%;
    background-color: white;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.5s;
}

.dot.active {
    width: 20px;
    height: 20px;
    background-color: #ffbe33;

}
button {

        padding: 10px 40px;
        height: 40px;
        border-radius:45px;
        background: #ffbe33;
        font-size: 15px;
        font-weight: 700;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;





};
</style>
