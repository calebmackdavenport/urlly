var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const Airtable = require('airtable');

const app = require('../app');
const base = new Airtable({apiKey: 'keyllUfIbKpAKqs96'}).base('appQqO16KrlaKtsyL');
const grid = base('db').select({ view: 'Grid view' })

/* GET users listing. */
router.get('/', function(req, res, next) {
  let response = []
  grid.firstPage(function(err, records) {
    if (err) { 
      throw err
    }

    response = records.map(record => record.get('Link')).filter(x => !!x);
    res.send(response);
  });
});

router.get('/slugs', function(req, res, next) {
  let response = [];
  grid.firstPage(function(err, records) {
    if (err) {
      throw err
    }

    response = records.map(record => record.get('slug')).filter(x => !!x);
    res.send(response);
  })
})

router.post('/new', function(req, res, next) {
  console.log(req.body);
  const {url, slug} = req.body
  base('db').create([
    {
      fields: {
        Link: `https://url.ly/${slug}`,
        url: url,
        slug: slug
      }
    }
  ], function(err, records) {
    if (err) {
      throw err
    }

    res.send(true)
  });
})

module.exports = router;
