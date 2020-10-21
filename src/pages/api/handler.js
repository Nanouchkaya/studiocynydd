import nextConnect from 'next-connect';

export default nextConnect({
  onError(err, req, res) {
    const statusCode = err.code || (err.status ==='pending') ? 200 : err.status || 500;
    res.status(statusCode).end(err.toString());
    console.log(`erreur: ${err.status} - request: ${req} - response: ${res}`)
  },
  onNoMatch(req, res) {
    res.status(405).end(`Method not allowed: ${req.method}`);
  }
})