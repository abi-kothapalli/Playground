import React, { Component } from "react";
import { RegularPolygon } from "react-konva";

class PolygonP extends Component {
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
                <RegularPolygon
                    x={this.state.targetX}
                    y={this.state.targetY}
                    sides={this.props.sides}
                    radius={this.state.radius}
                    stroke={"black"}
                    strokeWidth={8}
                    lineJoin={"round"}
                />
                <RegularPolygon
                    x={this.props.shapeX}
                    y={this.props.shapeY}
                    sides={this.props.sides}
                    radius={this.state.radius}
                    fill={this.props.fill}
                    stroke={"black"}
                    strokeWidth={4}
                    lineJoin={"round"}
                />
            </React.Fragment>
        );
    }
}

export default PolygonP;
