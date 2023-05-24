import React, {Component} from 'react'

export class LampioneTable extends Component{
    render(){
        return(
            <div className="row justify-content-center">
                <table className="table table-hover" style={{width: '90%' }}>
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Stato</th>
                        <th scope="col">Intensità</th>
                        <th scope="col">Zona Illuminata</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td style={{backgroundColor: 'yellow'}}>ON</td>
                        <td>5</td>
                        <td>Piazza Mazzini</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td style={{backgroundColor: 'black', color:'white'}}>OFF</td>
                        <td>8</td>
                        <td>Via Crescente</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td style={{backgroundColor: 'yellow'}}>ON</td>
                        <td>7</td>
                        <td>Navigli</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}