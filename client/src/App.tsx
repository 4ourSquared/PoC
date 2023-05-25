import './App.css';

// Importazione Componenti
import {Header} from './components/breadcrumb';
import {Content} from './components/contents';
import {Footer} from './components/footer';

export function App(){
  return(
    <>
      <Header />
      <Content />
      <Footer />
    </>
  )
}

