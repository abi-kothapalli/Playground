import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { findByPlaceholderText } from "@testing-library/react";
import * as fp from "fingerpose";
import { pinchGesture } from "./pinch";
import "./App.css";
import Canvas from "./components/canvas";
import background from "./assets/topo.jpg";
import { Button, Navbar, Container } from "react-bootstrap";
import { getAuth, signOut } from "@firebase/auth";
import Nav from "./Nav";
import { drawHand } from "./utilities";

let net = null;

async function setup() {
    net = await handpose.load();
    console.log("Handpose model loaded.");
}

setup();

function Home({ history }) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const logout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem("token");
                history.push("/");
            })
            .catch((e) => alert(e.message));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            history.push("/");
        }
    }, []);
    const auth = getAuth();
    const user = auth.currentUser;

    const [shapeX, setX] = useState(0);
    const [shapeY, setY] = useState(0);

    const [curX, setCurX] = useState(0);
    const [curY, setCurY] = useState(0);
    const [active, setActive] = useState(false);
    let move = false;

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
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const hand = await net.estimateHands(video);

            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([pinchGesture]);

                const gesture = await GE.estimate(hand[0].landmarks, 8);

                try {
                    console.log(gesture.gestures[0].name);
                    move = true;
                } catch (TypeError) {
                    console.log("no pinch");
                    move = false;
                }
            }

            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx, move);

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
                setCurX(
                    window.innerWidth -
                        (((hand[0].boundingBox.bottomRight[0] + hand[0].boundingBox.topLeft[0]) / 2 - 20) / 600.0) *
                            window.innerWidth
                );
                setCurY(
                    (((hand[0].boundingBox.bottomRight[1] + hand[0].boundingBox.topLeft[1]) / 2 - 15) / 440.0) *
                        window.innerHeight
                );
                setActive(true);
            } else if (hand.length == 1 && !move) {
                setCurX(
                    window.innerWidth -
                        (((hand[0].boundingBox.bottomRight[0] + hand[0].boundingBox.topLeft[0]) / 2 - 20) / 600.0) *
                            window.innerWidth
                );
                setCurY(
                    (((hand[0].boundingBox.bottomRight[1] + hand[0].boundingBox.topLeft[1]) / 2 - 15) / 440.0) *
                        window.innerHeight
                );
                setActive(false);
            }
        }
    };

    runHandPose();

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <Navbar className="bg-dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home" className="align-center">
                        <img
                            alt=""
                            src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/78587/sandbox-clipart-md.png"
                            width="80"
                            height="50"
                            className="d-inline-block align-center text-align-center"
                        />{" "}
                        <span className="align-center p-3 display-6">Welcome, {user && user.displayName}</span>
                    </Navbar.Brand>
                    <Button variant="primary" onClick={logout}>
                        Logout
                    </Button>
                </Container>
            </Navbar>

            <Canvas shapeX={shapeX} shapeY={shapeY} curX={curX} curY={curY} active={active} />

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

            <canvas
                ref={canvasRef}
                style={{
                    textAlign: "center",
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    zindex: 9,
                    width: 240,
                    height: 180,
                    transform: "scaleX(-1)",
                }}
            />
        </div>
    );
}
export default Home;
