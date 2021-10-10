import React, { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { findByPlaceholderText } from "@testing-library/react";
import * as fp from "fingerpose";
import { pinchGesture } from "./pinch";
import "./App.css";
import Canvas from "./components/canvas";
import background from "./assets/background.jpeg";

let net = null;

async function setup() {
    net = await handpose.load();
    console.log("Handpose model loaded.");
}

setup();

function Home() {
    const [shapeX, setX] = useState(0);
    const [shapeY, setY] = useState(0);
    let move = false;

    const webcamRef = useRef(null);

    const runHandPose = async () => {
        setInterval(() => {
            detect(net);
        }, 100);
    };

    const detect = async (net) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videowidth;
            const videoHeight = webcamRef.current.video.height.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const hand = await net.estimateHands(video);
            move = false;

            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([pinchGesture]);

                const gesture = await GE.estimate(hand[0].landmarks, 8);

                try {
                    // console.log(gesture.gestures[0].name); pinch
                    move = true;
                } catch (TypeError) {
                    //No pinch
                    move = false;
                }
            }

            if (hand.length == 1 && move) {
                setX(
                    window.innerWidth -
                        (((hand[0].boundingBox.bottomRight[0] + hand[0].boundingBox.topLeft[0]) / 2 - 20) / 600.0) *
                            window.innerWidth
                );
                setY(
                    (((hand[0].boundingBox.bottomRight[1] + hand[0].boundingBox.topLeft[1]) / 2 - 15) / 440.0) *
                        window.innerHeight
                );
            }
        }
    };

    runHandPose();

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: document.body.scrollHeight * 1.35,
            }}
        >
            <Canvas shapeX={shapeX} shapeY={shapeY} />
            <Webcam
                ref={webcamRef}
                style={{
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    zindex: 9,
                    width: 240,
                    height: 180,
                }}
                mirrored
            />
        </div>
    );
}
export default Home;
