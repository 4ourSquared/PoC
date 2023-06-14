FROM mongoclient/mongoclient

WORKDIR /db-dir

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
CMD ["mongo"]
