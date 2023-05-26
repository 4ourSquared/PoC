import React, {Component} from 'react'
import testRequest from './testRequest'

export class LampioneTable extends Component{
    render(){
        return(
            <div className="row justify-content-center">
                <table className="table table-hover align-middle" style={{width: '90%' }}>
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Stato</th>
                        <th scope="col">Intensità</th>
                        <th scope="col">Zona Illuminata</th>
                        <th scope="col">Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td style={{backgroundColor: 'yellow'}}>ON</td>
                        <td>5</td>
                        <td>Piazza Mazzini</td>
                        <td><button type="button" className="btn btn-outline-info" onClick={() => testRequest(1)}>Info</button></td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td style={{backgroundColor: 'black', color:'white'}}>OFF</td>
                        <td>8</td>
                        <td>Via Crescente</td>
                        <td><button type="button" className="btn btn-outline-info" onClick={() => testRequest(2)}>Info</button></td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td style={{backgroundColor: 'yellow'}}>ON</td>
                        <td>7</td>
                        <td>Navigli</td>
                        <td><button type="button" className="btn btn-outline-info" onClick={() => testRequest(3)}>Info</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}