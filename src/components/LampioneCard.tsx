import React, {Component} from 'react';

import lamp_on from '../img/lamp_on.png'

export class LampioneCard extends Component{
    render(){
        return(
            <div className='col'>
                <div className="card" style={{width:'10em', textAlign:'center', border: '1px solid black'}}>
                    <img className="card-img-top" src={lamp_on} alt="Card image cap"/>
                    <div className="card-body">
                        <p className="card-text">[Lamp Data]</p>
                    </div>
                </div>
            </div>
        )
    }
}