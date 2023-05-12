const natural = require('natural');
const PorterStemmerRu = require('./node_modules/natural/lib/natural/stemmers/porter_stemmer_ru');

natural.BayesClassifier.load('classifier.json', PorterStemmerRu, function(err, classifier) {
    //Загрузка классификатора из файла
    console.log(classifier.classify('Программирование для самых маленьких'))
});