import React, { Component } from "react";

export class NewLampForm extends Component{
    render(){    
    return (
        <div className="content" style={{width: '90%' }}>
            <form action="http://localhost:5000/api/lampioni" method="POST">
                <div className="form-group">
                    <label htmlFor="StatoLampione">Stato</label>
                    <select className="form-control" id="StatoLampione">
                        <option>Attivo</option>
                        <option>Disattivo</option>
                    </select>
                    <small id="statusHelp" className="form-text text-muted">Indica se il lampione deve essere attivo o no al momento dell'insreimento a sistema.</small>
                </div>
                <div className="form-group">
                <label htmlFor="IntensitaLampione">Intensità Luminosa</label>
                    <select className="form-control" id="IntensitaLampione">
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                    <small id="intensityHelp" className="form-text text-muted">Indica l'intensità luminosa del lampione qualora fosse fosse importato lo stato di attivazione.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="Locazione">Luogo di Installazione</label>
                    <input type="text" className="form-control" id="Locazione" aria-describedby="locazioneHelp" placeholder=""/>
                    <small id="locazioneHelp" className="form-text text-muted">Indica il luogo in cui è situato il lampione.</small>
                </div>
                <button type="submit" className="btn btn-primary">Crea</button>
            </form>
            </div>
        )
    }
}