const PorterStemmerRu = require('../node_modules/natural/lib/natural/stemmers/porter_stemmer_ru');
const natural = require('natural');
const classifier = new natural.BayesClassifier(PorterStemmerRu);
const fs = require('fs');
const parse = require('csv-parse');

fs.readFile('data.csv', 'utf8', (err, fileContent) => {
    if (err) {
        console.error(err);
        return;
    }

    parse.parse(fileContent, {
        columns: ['text', 'label'],
        skip_empty_lines: true,
        delimiter: ';'
    }, (err, records) => {
        if (err) {
            console.error(err);
            return;
        }

        records.forEach(row =>{
            classifier.addDocument(row.text, row.label)
        })
        classifier.train();
        classifier.save('classifier.json', function(err, classifier) {
            //Сохранение классификатора в файл
        });
    });
});
