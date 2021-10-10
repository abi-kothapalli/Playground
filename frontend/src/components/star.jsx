import React, { Component } from "react";
import { Star } from "react-konva";

class StarP extends Component {
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
                <Star
                    x={this.state.targetX}
                    y={this.state.targetY}
                    numPoints={5}
                    innerRadius={this.state.innerRadius}
                    outerRadius={this.state.outerRadius}
                    stroke={"black"}
                    strokeWidth={8}
                    lineJoin={"round"}
                />
                <Star
                    x={this.props.shapeX}
                    y={this.props.shapeY}
                    numPoints={5}
                    innerRadius={this.state.innerRadius}
                    outerRadius={this.state.outerRadius}
                    fill={this.props.fill}
                    stroke={"black"}
                    strokeWidth={this.state.isDragging ? 6 : 3}
                    lineJoin={"round"}
                />
            </React.Fragment>
        );
    }
}

export default StarP;
