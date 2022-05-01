//modules
const {getWordInformation} = require('../index');

//sentence to translate
var sentence = 'Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur.'

//init result object
var res = {}

//prepare sentence as an array
sentence = sentence.split(',').join('').split('.').join('').split(' ')

//get sentence word length
var length = sentence.length

//loop through words
sentence.forEach(async (w, key) => {
    //get word info
    var wordInfo = await getWordInformation(w) ? await getWordInformation(w) : w

    //put word info into result array
    res[key] = wordInfo

    //print object when all translations fetched
    if(Object.keys(res).length == length) await console.log(res)
})