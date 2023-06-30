import React, {Component} from 'react'
import { LampioneTable } from './LampioneTable'
import { SensoreTable } from './SensoreTable'
import { AreaTable } from './AreaTable'

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
                <h2>Sensori Collegati</h2>
                <div className='row'>
                    <SensoreTable/>
                </div>
                <h2>Area Illuminata</h2>
                <div className='row'>
                    <AreaTable />
                </div>
            </main>
        )
    }
}