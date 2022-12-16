<template>
    <div class="home-page">
        <div class="home-page__content">
            <div class="home-page__title">Hi 我是余光</div>
            <p class="home-page__desc">欢迎来到余光的前端进阶指南</p>
            <div class="home-page__btns">
                <a-button type="link" size="large" @click="start" class="btn">
                    🌈进入博客🌈
                </a-button>
                <a-button type="link" size="large" @click="more" class="btn">
                    ✨更多项目✨
                </a-button>
            </div>
        </div>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
import Canvas from './canvas';
import Button from "ant-design-vue/lib/button";
import "ant-design-vue/lib/button/style/css";
export default {
    name: "Home",
    components: {
        "a-button": Button,
    },
    data() {
        return {
            canvas: null,
        };
    },
    mounted() {
        this.init();
    },
    destoryed() {
        this.canvas.cancel();
    },
    methods: {
        start() {
            window.location.href = "/summary/blog/";
        },
        more() {
            window.open('https://github.com/webbj97')
        },
        init() {
            this.canvas = new Canvas();
            this.canvas.init();
            this.canvas.draw();
        },
    },
};
</script>
<style lang='sass'>
.home-page
    position: relative
    width: 100vw
    height: 100vh
    &__content
        position: absolute
        z-index: 3
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 100%
        height: 100%
    &__title
        font-weight: 500
        font-size: 30px
    &__desc
        font-size: 18px
        margin-top: 15px
        margin-bottom: 40px
    &__btns
        width: 300px
        font-size: 16px
        display: flex
        justify-content: space-around
        animation: opacity 2s
        animation-iteration-count: infinite
        transition: all .4s
        .btn
            cursor: pointer
            &:hover
                font-size: 20px
                text-shadow: 3px 3px 3px #ccc
    #canvas
        position: absolute
        z-index: 1
        top: 0
        left: 0
    @keyframes opacity
        0%
            opacity: 1
        50%
            opacity: 0.5 
        100%
            opacity: 1  
        

</style>