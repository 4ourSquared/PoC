import React, {ReactElement, useState} from 'react';
import {Link} from 'react-router-dom'

export default function LoginPage(): ReactElement {
    return(
    <div>
        <h1>Lumos Minima</h1>
        <h2>Login</h2>
        <form className='container'>
            <fieldset>
                <legend>Inserisci le credenziali</legend>

                <div className="form-group">
                    <label htmlFor="username">
                        Nome utente
                    </label>

                    <input className="form-control" id="username" type="text" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password
                    </label>

                    <input className="form-control" id="password" type="password" />
                </div>

                <div>
                    <Link to="/" type="button" className="btn btn-primary">
                        Entra
                    </Link>
                </div>
            </fieldset>
        </form>
    </div>
    )
}