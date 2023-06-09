import React, {Component} from 'react'

/*
    CLASSE BREADCRUMB: renderizza automaticamente il breadcrumb della pagina. Stile associato a Bootstrap. 
    ATTENZIONE: non esportare questo componente, viene richiamato solamente dalla classe Header sotto descritta
*/
class Breadcrumb extends Component{
    render(){
        return(
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Home</li>
                </ol>
            </nav>
        )
    }
}

/*
    CLASSE HEADER: renderizza automaticamente l'header della pagina (breadcrumb incluso). Stile associato a Bootstrap.
*/
export class Header extends Component{
    render(){
        return(
            <header>
                <h1>Lumos Minima</h1>
                <Breadcrumb />
            </header>
        )
    }
}