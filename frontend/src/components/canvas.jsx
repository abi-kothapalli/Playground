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
    };

    constructor() {
        super();
        this.setState({
            shapeIndices: this.shuffleIndices(this.state.shapeIndices),
            targetIndices: this.shuffleIndices(this.state.targetIndices),
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

    render() {
        return (
            <div>
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        <PolygonP
                            x={(this.state.shapeIndices[0] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[0] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            sides={3}
                        />
                        <PolygonP
                            x={(this.state.shapeIndices[1] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[1] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                            sides={4}
                        />
                        <CircleP
                            x={(this.state.shapeIndices[2] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[2] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                        />
                        <StarP
                            x={(this.state.shapeIndices[3] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[3] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                        />
                        <RingP
                            x={(this.state.shapeIndices[4] * window.innerWidth) / 6}
                            y={(2 * window.innerHeight) / 3}
                            targetX={(this.state.targetIndices[4] * window.innerWidth) / 6}
                            targetY={window.innerHeight / 3}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default Canvas;
