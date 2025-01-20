// BASE SETUP
// =============================================================================

// Import required packages
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

// Configure app
app.use(morgan('dev')); // Log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the port
var port = process.env.PORT || 5000;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// Middleware for all requests
router.use(function (req, res, next) {
  console.log('Request received: ' + req.method + ' ' + req.originalUrl);
  next();
});

// Default route (GET http://localhost:5000/api)
router.get('/', function (req, res) {
  res.json({ message: 'Welcome to our API!' });
});

// Suppress favicon.ico errors
app.get('/favicon.ico', (req, res) => res.status(204).send());

// Routes that end in /items (mock API)
router
  .route('/items')
  .post(function (req, res) {
    const newItem = req.body;
    res.json({ message: 'Item created successfully!', item: newItem });
  })
  .get(function (req, res) {
    const mockItems = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
    res.json(mockItems);
  });

// Routes that end in /items/:item_id
router
  .route('/items/:item_id')
  .get(function (req, res) {
    const itemId = req.params.item_id;
    res.json({ id: itemId, name: `Item ${itemId}` });
  })
  .put(function (req, res) {
    const itemId = req.params.item_id;
    const updatedItem = req.body;
    res.json({ message: `Item ${itemId} updated successfully!`, item: updatedItem });
  })
  .delete(function (req, res) {
    const itemId = req.params.item_id;
    res.json({ message: `Item ${itemId} deleted successfully!` });
  });

// Register routes
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
