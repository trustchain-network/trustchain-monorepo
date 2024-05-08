# Run Certbot

```bash
docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ --dry-run -d trustchain.network -d www.trustchain.network
```

Wait for the procedure to finish. If Docker reports no errors, run the command without the --dry-run flag:

```bash
docker compose run --rm certbot certonly --webroot --webroot-path /var/www/html/ -d trustchain.network -d www.trustchain.network
```


# Renew Certificates

```bash
docker compose run --rm certbot renew
```