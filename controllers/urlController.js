const shortid = require('shortid');
const URL = require('../models/Url');

async function shortenUrl(req, res) {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortId = shortid.generate();

    await URL.create({
        shortId,
        redirectUrl: url,
        visitedHistory: [],
    });

    return res.json({ id: shortId });
}

async function redirectUrl(req, res) {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitedHistory: new Date() } },
        { new: true }
    );

    if (!entry) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.redirect(302, entry.redirectUrl);
}

module.exports = { shortenUrl, redirectUrl };