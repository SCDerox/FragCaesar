const {getWordInformation} = require('../index');

const sentence = 'Gallia est omnis divisa in partes tres, quarum unam incolunt Belgae, aliam Aquitani, tertiam qui ipsorum lingua Celtae, nostra Galli appellantur.'

sentence.split(',').join('').split('.').join('').split(' ').forEach(async w => {
    console.log(await getWordInformation(w) ? await getWordInformation(w) : w)
})
