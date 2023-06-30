FROM mongo:7.0.0-rc3-jammy

USER root

WORKDIR /db-dir

COPY entrypoint.sh ./entrypoint.sh
COPY testFiles/lamps.json ./lamps.json
COPY testFiles/sensori.json ./sensori.json

ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]
CMD mongoimport --db lumosminima --collection lampioni --jsonArray --file ./lamps.json; mongoimport --db lumosminima --collection sensori --jsonArray --file ./sensori.json
