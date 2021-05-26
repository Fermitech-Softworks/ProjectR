import React, { Component } from 'react'

class Table extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = props
    }

    renderData(){
        return this.state.data.map((char, index) => {
            const {id, nome, livello, razza} = char
            return (
                <tr key={id}>
                    <td>{nome}</td>
                    <td>{livello}</td>
                    <td>{razza}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.data[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
        return (
            <div>
                <table id="characters">
                    <thead>
                    <tr>{this.render}</tr>
                    </thead>
                <tbody>
                {this.renderData()}
                </tbody>
                </table>
            </div>
        )
    }
}

export default Table