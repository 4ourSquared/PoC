import React, {Component} from 'react'
import { LampioneTable } from './LampioneTable'
import { SensoreTable } from './SensoreTable'

/*
    CLASSE CONTENT: classe che renderizza automaticamente il content. Stile associato a Bootstrap.
    ATTENZIONE: attualmente questa classe renderizza solamente la table del lampione e del sensore. Probabilmente in futuro verrà rimossa a favore del routing base
*/ 
export class Content extends Component{
    render(){
        return(
            <main>
                <h2>Lampioni Collegati</h2>
                <div className='row'>
                    <LampioneTable/>
                </div>
                <h2>Sensori Collegati</h2>
                <div className='row'>
                    <SensoreTable/>
                </div>
            </main>
        )
    }
}