//modules
const { getWordInformation, translate } = require('../index.js')

//sentence to translate
var sentence = 'Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur.'

translate(sentence, res => console.log(res))