import './App.css';

// Importazione Componenti
import {Header} from './components/breadcrumb';

/*
export function App() {
  return (
    <body>
      <header><h1>Lumos Minima</h1></header>
      <nav id="breadcrumb">Home</nav>
      <main>
        <h2>Lampioni Collegati</h2>
        <div id="lamp-box">
          [placeholder-lampioni]
        </div>
      </main>
      <footer>
        4ourSquared Team <br></br>
        Università degli Studi di Padova<br></br>
        Progetto Didattico di SWE
        </footer>
    </body>
  );
}
*/

export function App(){
  return(
    <Header />
  )
}

