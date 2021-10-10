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
    };

    constructor() {
        super();
        this.setState({
            shapeIndices: this.shuffleIndices(this.state.shapeIndices),
            targetIndices: this.shuffleIndices(this.state.targetIndices),
            colors: this.shuffleIndices(this.state.colors),
            snap: false,
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
        if (
            Math.abs(this.props.shapeX - (this.state.targetIndices[0] * window.innerWidth) / 6) < 50 &&
            Math.abs(this.props.shapeX - window.innerHeight / 3) < 50
        ) {
            this.setState({ snap: true });
            console.log("SNAP", this.state.snap);
        }
    }

    render() {
        return (
            <div>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        <PolygonP
                            shapeX={
                                this.state.snap
                                    ? (this.state.targetIndices[0] * window.innerWidth) / 6
                                    : this.props.shapeX
                            }
                            shapeY={this.state.snap ? window.innerHeight / 3 : this.props.shapeY}
                            targetX={(this.state.targetIndices[0] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            sides={3}
                            fill={this.state.colors[0]}
                        />
                        {/* <PolygonP
                            x={(this.state.shapeIndices[1] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[1] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            sides={4}
                            fill={this.state.colors[1]}
                        /> */}
                        <CircleP
                            x={(this.state.shapeIndices[2] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[2] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            fill={this.state.colors[2]}
                        />
                        <StarP
                            x={(this.state.shapeIndices[3] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[3] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            fill={this.state.colors[3]}
                        />
                        <RingP
                            x={(this.state.shapeIndices[4] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[4] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            fill={this.state.colors[4]}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default Canvas;
