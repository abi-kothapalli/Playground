import React, { Component } from "react";
import { RegularPolygon } from "react-konva";

class PolygonP extends Component {
    state = {
        isDragging: false,
        radius: 70,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        x: this.props.x,
        y: this.props.y,
        targetX: this.props.targetX,
        targetY: this.props.targetY,
        targetReached: false,
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
                    x={this.state.x}
                    y={this.state.y}
                    sides={this.props.sides}
                    radius={this.state.radius}
                    draggable={!this.state.targetReached}
                    fill={this.props.fill}
                    stroke={"black"}
                    strokeWidth={this.state.isDragging ? 6 : 3}
                    lineJoin={"round"}
                    onMouseDown={() => {
                        this.setState({ isDragging: true });
                    }}
                    onMouseUp={() => {
                        this.setState({ isDragging: false });
                    }}
                    onDragStart={() => {
                        this.setState({
                            isDragging: true,
                        });
                    }}
                    onDragEnd={(e) => {
                        let finalX = e.target.x();
                        let finalY = e.target.y();
                        let targetReached = this.state.targetReached;
                        if (
                            Math.abs(e.target.x() - this.state.targetX) < 100 &&
                            Math.abs(e.target.y() - this.state.targetY) < 100
                        ) {
                            finalX = this.state.targetX;
                            finalY = this.state.targetY;
                            targetReached = true;
                            e.target.absolutePosition({ x: finalX, y: finalY });
                        }
                        this.setState({
                            isDragging: false,
                            x: finalX,
                            y: finalY,
                            targetReached,
                        });
                    }}
                    dragBoundFunc={(pos) => {
                        return {
                            x: Math.min(Math.max(pos.x, 65), this.state.windowWidth - this.state.radius + 10),
                            y: Math.min(Math.max(pos.y, 70), this.state.windowHeight - this.state.radius / 2),
                        };
                    }}
                />
            </React.Fragment>
        );
    }
}

export default PolygonP;
