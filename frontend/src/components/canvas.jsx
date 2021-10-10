import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import PolygonP from "./polygon";
import CircleP from "./circle";
import StarP from "./star";
import RingP from "./ring";

class Canvas extends Component {
    state = {
        shapeIndices: [1, 2, 3, 4, 5],
        targetIndices: [1, 2, 3, 4, 5],
        colors: ["#173f5f", "#20639b", "#3caea3", "#f6d55c", "#ed553b"],
        snap: [false, false, false, false, false],
        shapeIdx: 0,
    };

    constructor() {
        super();

        this.setState({
            shapeIndices: this.shuffleIndices(this.state.shapeIndices),
            targetIndices: this.shuffleIndices(this.state.targetIndices),
            colors: this.shuffleIndices(this.state.colors),
        });
    }

    shuffleIndices = (indices) => {
        let currIdx = indices.length,
            randIdx;
        while (currIdx !== 0) {
            randIdx = Math.floor(Math.random() * currIdx);
            currIdx--;

            [indices[currIdx], indices[randIdx]] = [indices[randIdx], indices[currIdx]];
        }
        return indices;
    };

    componentDidUpdate() {
        let snap = [...this.state.snap];

        if (
            !this.state.snap[this.state.shapeIdx] &&
            Math.abs(this.props.shapeX - (this.state.targetIndices[this.state.shapeIdx] * window.innerWidth) / 6) <
                30 &&
            Math.abs(this.props.shapeY - window.innerHeight / 3) < 30
        ) {
            snap[this.state.shapeIdx] = true;
            this.setState({ snap, shapeIdx: this.state.shapeIdx + 1 });
        }
    }

    render() {
        return (
            <div>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        <PolygonP
                            shapeX={
                                this.state.snap[0]
                                    ? (this.state.targetIndices[0] * window.innerWidth) / 6
                                    : this.props.shapeX
                            }
                            shapeY={this.state.snap[0] ? window.innerHeight / 3 : this.props.shapeY}
                            targetX={(this.state.targetIndices[0] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            sides={3}
                            fill={this.state.snap[0] ? "green" : this.state.colors[0]}
                        />
                        <PolygonP
                            shapeX={
                                this.state.snap[1]
                                    ? (this.state.targetIndices[1] * window.innerWidth) / 6
                                    : this.state.shapeIdx === 1
                                    ? this.props.shapeX
                                    : (this.state.shapeIndices[1] * window.innerWidth) / 6
                            }
                            shapeY={
                                this.state.snap[1]
                                    ? window.innerHeight / 3
                                    : this.state.shapeIdx === 1
                                    ? this.props.shapeY
                                    : (2 * window.innerHeight) / 3
                            }
                            targetX={(this.state.targetIndices[1] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            sides={4}
                            fill={this.state.snap[1] ? "green" : this.state.colors[1]}
                        />
                        <CircleP
                            shapeX={
                                this.state.snap[2]
                                    ? (this.state.targetIndices[2] * window.innerWidth) / 6
                                    : this.state.shapeIdx === 2
                                    ? this.props.shapeX
                                    : (this.state.shapeIndices[2] * window.innerWidth) / 6
                            }
                            shapeY={
                                this.state.snap[2]
                                    ? window.innerHeight / 3
                                    : this.state.shapeIdx === 2
                                    ? this.props.shapeY
                                    : (2 * window.innerHeight) / 3
                            }
                            targetX={(this.state.targetIndices[2] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            fill={this.state.snap[2] ? "green" : this.state.colors[2]}
                        />
                        <StarP
                            shapeX={
                                this.state.snap[3]
                                    ? (this.state.targetIndices[3] * window.innerWidth) / 6
                                    : this.state.shapeIdx === 3
                                    ? this.props.shapeX
                                    : (this.state.shapeIndices[3] * window.innerWidth) / 6
                            }
                            shapeY={
                                this.state.snap[3]
                                    ? window.innerHeight / 3
                                    : this.state.shapeIdx === 3
                                    ? this.props.shapeY
                                    : (2 * window.innerHeight) / 3
                            }
                            targetX={(this.state.targetIndices[3] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            fill={this.state.snap[3] ? "green" : this.state.colors[3]}
                        />
                        <RingP
                            shapeX={
                                this.state.snap[4]
                                    ? (this.state.targetIndices[4] * window.innerWidth) / 6
                                    : this.state.shapeIdx === 4
                                    ? this.props.shapeX
                                    : (this.state.shapeIndices[4] * window.innerWidth) / 6
                            }
                            shapeY={
                                this.state.snap[4]
                                    ? window.innerHeight / 3
                                    : this.state.shapeIdx === 4
                                    ? this.props.shapeY
                                    : (2 * window.innerHeight) / 3
                            }
                            targetX={(this.state.targetIndices[4] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            fill={this.state.snap[4] ? "green" : this.state.colors[4]}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default Canvas;
