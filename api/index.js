export default function handler(req, res) {
  // Fungsi generate random string
  const generateRandomString = (length = 32) => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
      randomString += characters[Math.floor(Math.random() * characters.length)];
    }
    
    return randomString;
  };

  // Ambil parameter query
  const { x1, x2 } = req.query;

  if (x1 && x2) {
    const randomString = generateRandomString();
    const hash = require('crypto').createHash('md5').update(randomString).digest('hex');
    const result = `${hash};${x1};2025-09-08 16:06:02`;
    const response = Buffer.from(result).toString('base64');
    
    res.status(200).send(response);
  } else {
    res.status(400).send("Please provide both x1 and x2 parameters.");
  }
}
