import React, { Component } from "react";
import { Ring } from "react-konva";

class RingP extends Component {
    state = {
        outerRadius: 70,
        innerRadius: 40,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        x: this.props.shapeX,
        y: this.props.shapeY,
        targetX: this.props.targetX,
        targetY: this.props.targetY,
    };

    render() {
        return (
            <React.Fragment>
                <Ring
                    x={this.state.targetX}
                    y={this.state.targetY}
                    innerRadius={this.state.innerRadius}
                    outerRadius={this.state.outerRadius}
                    stroke={"black"}
                    strokeWidth={8}
                    lineJoin={"round"}
                />
                <Ring
                    x={this.props.shapeX}
                    y={this.props.shapeY}
                    innerRadius={this.state.innerRadius}
                    outerRadius={this.state.outerRadius}
                    fill={this.props.fill}
                    stroke={"black"}
                    strokeWidth={4}
                />
            </React.Fragment>
        );
    }
}

export default RingP;
