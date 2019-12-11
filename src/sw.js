console.log('[Service Worker] Start up');

self.addEventListener('install', function(event){
  console.log('installed!');
});

self.addEventListener('activate', function(event){
  console.log('activated!');
});

//const sensor = new AbsoluteOrientationSensor();
self.addEventListener('message', function(event){
  switch (event.data) {
    case 'start':
      console.log('[Service Worker] Start logging.');
      /*
      Promise.all([navigator.permissions.query({ name: "accelerometer" }),
        navigator.permissions.query({ name: "magnetometer" }),
        navigator.permissions.query({ name: "gyroscope" })])
        .then(results => {
          if (results.every(result => result.state === "granted")) {
            sensor.start();
            console.log(sensor.accelerometer);
            console.log(sensor.magnetometer);
            console.log(sensor.gyroscope);
          } else {
            console.log("No permissions to use AbsoluteOrientationSensor.");
          }
        });
        */
      break;
    case 'stop':
      console.log('[Service Worker] Stop logging.');
      //sensor.stop();
      break;
    default:
      console.log('[Service Worker] Not supported message: ' + event.data);
  }
});
