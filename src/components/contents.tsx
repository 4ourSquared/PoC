import React, {Component} from 'react'
import { LampioneCard } from './LampioneCard'

export class Content extends Component{
    render(){
        return(
            <main>
                <h2>Lampioni Collegati</h2>
                <div className='row'>
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                    <LampioneCard />
                </div>
            </main>
        )
    }
}