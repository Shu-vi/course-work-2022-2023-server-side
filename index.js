const express = require('express');
const cors = require('cors');
const natural = require('natural');
const PorterStemmerRu = require('./node_modules/natural/lib/natural/stemmers/porter_stemmer_ru');

const app = express();
app.use(cors())
let classifier;

natural.BayesClassifier.load('classifier.json', PorterStemmerRu, function(err, loadedClassifier) {
    classifier = loadedClassifier;
});

app.get('/classify', (req, res) => {
    const text = req.query.text;
    if (!text) {
        res.status(400).send('Не передан текст для классификации');
        return;
    }
    if (!classifier) {
        res.status(500).send('Попробуйте позже');
        return;
    }
    const label = classifier.classify(text);
    res.send(label);
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});