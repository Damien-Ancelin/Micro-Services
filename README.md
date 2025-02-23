# µServices

## Accéder à la bdd bsn-db-users

```shell
docker exec -it bsn-db-users mongosh -u bsn-admin -p bsn-password --authenticationDatabase admin
```

```shell
docker exec -it bsn-db-posts mongosh -u bsn-admin -p bsn-password --authenticationDatabase admin
```
