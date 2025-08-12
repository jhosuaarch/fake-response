export default function handler(req, res) {
  const generateRandomString = (length = 32) => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      randomString += characters[Math.floor(Math.random() * characters.length)];
    }
    
    return randomString;
  };

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Handle GET request
  if (req.method === 'GET') {
    const { x1, x2 } = req.query;

    if (x1 && x2) {
      const randomString = generateRandomString();
      const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
      const result = `${hash};${x1};2025-09-08 16:06:02`;
      const response = Buffer.from(result).toString('base64');
      
      // Return as plain text
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(response);
    } else {
      res.setHeader('Content-Type', 'text/plain');
      return res.status(400).send("Error: Please provide both x1 and x2 parameters.");
    }
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      let x1, x2;
      
      // Handle both JSON and form-urlencoded POST data
      if (req.headers['content-type'] === 'application/json') {
        ({ x1, x2 } = req.body);
      } else {
        // For form data or other formats
        const body = typeof req.body === 'string' ? require('querystring').parse(req.body) : req.body;
        x1 = body.x1;
        x2 = body.x2;
      }

      if (!x1 || !x2) {
        res.setHeader('Content-Type', 'text/plain');
        return res.status(400).send("Error: Please provide both x1 and x2 in the request body.");
      }

      const randomString = generateRandomString();
      const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
      const result = `${hash};${x1};2025-09-08 16:06:02`;
      const response = Buffer.from(result).toString('base64');

      // Return as plain text
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(response);
    } catch (error) {
      res.setHeader('Content-Type', 'text/plain');
      return res.status(500).send(`Error: Internal server error - ${error.message}`);
    }
  }

  // Handle other methods
  res.setHeader('Content-Type', 'text/plain');
  return res.status(405).send("Error: Method not allowed");
}
