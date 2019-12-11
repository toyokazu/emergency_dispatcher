# emergency_dispatcher
A sample code for emergency dispatcher (webpack)

```
git clone https://github.com/toyokazu/emergency_dispatcher.git
cd emergency_dispatcher
npm install
npx webpack --config webpack.development.config.js
```

If DocumentRoot of your web server is set to /usr/local/var/www,
you need to create a link as follows:

```
ln -s /path/to/emergency_dispatcher/dist /usr/local/var/www/emergency_dispatcher
```

Now you can access to the sample site.

http://localhost:8080/emergency_dispatcher
