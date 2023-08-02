<template>
<div class='m-2 bg-white border rounded' id="video">
    <canvas id="video-canvas"></canvas>
	
</div>

</template>

<script>
//import * as pendulum from "../pendulum";
//import { eventBus } from "../main";
//import { JSMpeg } from "../../public/js/jsmpeg.min.js";
//import JSMpeg from "jsmpeg";
import JSMpeg from '@cycjimmy/jsmpeg-player';
//playerUrl = scheme + host + ':' + port + '/' + stream;
//let playerUrl = 'ws://video.practable.io:8080/out/dpr/video0';

export default {
    name: "WebcamStream",
    data(){
        return{

        }
    },
    created(){
		
	},
	mounted(){
		let canvas = document.getElementById("video-canvas");
		let playerUrl = 'wss://video.practable.io:443/out/dpr/video0';
		console.log(playerUrl);
		let player = new JSMpeg.Player(playerUrl, {canvas: canvas});
		console.log(player);

	},
}


</script>

<style scoped>

</style>