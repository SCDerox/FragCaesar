const {getWordInformation} = require('../index');

var sentence = 'Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur.'

var res = {}

sentence = sentence.split(',').join('').split('.').join('').split(' ')

var length = sentence.length

sentence.forEach(async (w, key) => {
    var wordInfo = await getWordInformation(w) ? await getWordInformation(w) : w
    res[key] = wordInfo
    if(Object.keys(res).length == length) await console.log(res)
})