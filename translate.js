//modules
const { getWordInformation, translate } = require('./index.js')

//sentence
const sentence = 'Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur.'

//translate sentence and set callback for result array
translate(sentence, res => console.log(res))