const path = require('path');
const app = require('express')();
const edge = require('edge.js');

// Set express views path
app.set('views', path.join(__dirname, './views'));
// Set edge.js views path
edge.registerViews(path.join(__dirname, './views'));

// Instruct express to use edge.js as the view engine
app.set('view engine', '.edge');

// Instruct express how to compile edge files
app.engine('edge', (filePath, options, callback) => {
  // filePath is the absolute path to your view, edge.reder method
  // required only the basename
  const basename = path.basename(filePath);

  // Use edge.js to compile your view and get te html back
  const html = edge.render(basename, options)

  // return the compiled html
  return callback(null, html)
});

app.get('/',(_, res) => {
  res.render('welcome', { username: 'joaofnds' })
});

app.listen(3000, () => console.log('listening on port 3000'));
