import React, {Component} from 'react'
import { LampioneCard } from './LampioneCard'
import { LampioneTable } from './LampioneTable'

export class Content extends Component{
    render(){
        return(
            <main>
                <h2>Lampioni Collegati</h2>
                <div className='row'>
                    <LampioneTable/>
                </div>
            </main>
        )
    }
}