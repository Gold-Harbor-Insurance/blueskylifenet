# Apache Alternative Configuration

If your server uses Apache instead of Nginx:

## Apache Virtual Host Config

Create file at `/etc/apache2/sites-available/blueskylife.conf`:

```apache
<VirtualHost *:80>
    ServerName blueskylife.net
    ServerAlias www.blueskylife.net blueskylife.io www.blueskylife.io

    # Enable required modules
    # Run: sudo a2enmod proxy proxy_http headers rewrite

    ProxyPreserveHost On
    ProxyPass / http://localhost:5000/
    ProxyPassReverse / http://localhost:5000/

    # Forward real IP to app
    RequestHeader set X-Real-IP %{REMOTE_ADDR}s
    RequestHeader set X-Forwarded-For %{REMOTE_ADDR}s
    RequestHeader set X-Forwarded-Proto https

    ErrorLog ${APACHE_LOG_DIR}/blueskylife-error.log
    CustomLog ${APACHE_LOG_DIR}/blueskylife-access.log combined
</VirtualHost>
```

## Enable the Site

```bash
# Enable required modules
sudo a2enmod proxy proxy_http headers rewrite

# Enable site
sudo a2ensite blueskylife.conf

# Test configuration
sudo apache2ctl configtest

# Restart Apache
sudo systemctl restart apache2
```

## Check Apache Status
```bash
sudo systemctl status apache2
```
