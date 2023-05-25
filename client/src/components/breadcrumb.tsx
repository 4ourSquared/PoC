import React, {Component} from 'react'

class Breadcrumb extends Component{
    render(){
        return(
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav>
        )
    }
}

export class Header extends Component{
    render(){
        return(
            <header>
                <h1>Lumos Minima</h1>
                <Breadcrumb />
            </header>
        )
    }
}