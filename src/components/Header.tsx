import React from "react";
import logo from "../assets/logo.png";

export default function Header() {
    return (
        <div className="header">
            <img src={logo} alt="NoX World Logo"/>
            <h1>
                <span className="title">NoX World</span>
            </h1>
        </div>
    )
}