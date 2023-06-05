import React, {Component} from 'react'
import { LampioneTable } from './LampioneTable'

/*
    CLASSE CONTENT: classe che renderizza automaticamente il content. Stile associato a Bootstrap.
    ATTENZIONE: attualmente questa classe renderizza solamente la table del lampione. Probabilmente in futuro verrà rimossa a favore del routing base
*/ 
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