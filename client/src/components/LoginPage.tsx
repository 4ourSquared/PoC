import React, {ReactElement} from 'react';
import {Link, useNavigate} from 'react-router-dom'

export default function LoginPage(): ReactElement {

    const navigate = useNavigate();

    const login = (e:React.MouseEvent) => {
        e.preventDefault();
        
        const username: String = (document.getElementById("username") as HTMLInputElement).value;
        
        if(username.startsWith("manut"))
        {
            document.cookie="user-type=manutentore"
            navigate("/home")
        }
        else if(username.startsWith("admin"))
        {
            document.cookie="user-type=amministratore"
            navigate("/home")
        }
    }

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
                    <button type="submit" className="btn btn-primary" onClick={(e) => {login(e)}}>
                        Entra
                    </button>
                </div>
            </fieldset>
        </form>
    </div>
    )
}