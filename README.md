## Prerequisiti

Sul vostro sistema dovete avere installato NodeJS e NPM, seguendo le istruzioni
ai link di riferimento:

- [Windows](https://github.com/coreybutler/nvm-windows)
- [Linux/Mac](https://nodejs.org/en/download/package-manager)

### Comandi disponibili

I vari comandi che si possono eseguire al momento sono:\

### `npm start`

Va dato nella cartella 'client' e fa partire l'applicazione.\
Si apre la pagina al link [http://localhost:3000](http://localhost:3000) per
visualizzare il sito.

La pagina viene ricaricata ad ogni modifica salvata.\
Si vedranno eventuali errori nel terminale.

### `npx tsc`

Serve per fare la build del server. Va usato nella cartella 'server'.\

### `node .\dist\server.js o node ./dist/server.js`

Comando da dare dentro la cartella 'server' per far partire il server. Scegliete
il comando in base al vostro sistema operativo (Windows il primo, Linux/Mac per
il secondo).\
Nel dubbio tentate entrambi.
