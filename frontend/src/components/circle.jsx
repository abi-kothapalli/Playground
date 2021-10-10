import React, { Component } from "react";
import { Circle } from "react-konva";

class CircleP extends Component {
    state = {
        radius: 70,
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
                <Circle
                    x={this.state.targetX}
                    y={this.state.targetY}
                    radius={this.state.radius}
                    stroke={"black"}
                    strokeWidth={8}
                />
                <Circle
                    x={this.props.shapeX}
                    y={this.props.shapeY}
                    radius={this.state.radius}
                    fill={this.props.fill}
                    stroke={"black"}
                    strokeWidth={4}
                />
            </React.Fragment>
        );
    }
}

export default CircleP;
