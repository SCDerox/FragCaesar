//modules
const centra = require('centra');
const cheerio = require('cheerio');

//german translations for attrs
const attr_translations = {
    'Latein': 'latin',
    'Typ': 'type',
    'Flexionsart': 'flexion_type',
    'Form': 'form',
    'Deutsch': 'german',
    'Geschlecht': 'gender'
};

//word information
module.exports.getWordInformation = async function (word) {
    //send http request
    let res = await centra(`https://www.frag-caesar.de/lateinwoerterbuch/${word}-uebersetzung.html`).send();

    //when more results exist
    if (res.body.toString().includes(`Ihr Suchwort <strong><span class="textmarker">${word}</span></strong> entspricht`))
        //redirect to first result
        res = await centra(`https://www.frag-caesar.de/lateinwoerterbuch/${word}-uebersetzung-1.html`).send();

    //load content
    const $ = await cheerio.load(res.body.toString());

    //put all table rows in array
    const tableElements = $('.table-responsive table tr').toArray();

    //init counter and content for loop
    let i = 0;
    const content = {};

    //for each tr
    tableElements.forEach(tr => {
        //increment counter
        i++;

        //add array for current table row
        if (!content[i]) content[i] = [];

        //for each td
        tr.children.forEach(td => {
            //init child content
            let childContent = '';

            //for each td child as c (different translation of word)
            if (td.children) td.children.forEach(c => {
                //add c to content string
                if (c.data) childContent = childContent + `${c.data}|`;
            });

            //push td content string to content array
            content[i].push(childContent);
        });
    });

    //init result
    const returnForm = {};

    //return if content does not exist
    if (!content[1]) return null;

    //init counter
    let y = 0;

    //for each td content string from first tr as c
    content[1].forEach(c => {
        //get keys
        var key_returnForm = attr_translations[c.split('|').join('')] ? attr_translations[c.split('|').join('')] : c.split('|').join('');
        var key_content = content?.[3]?.[y] ? 3 : 2;

        //get y-th translation
        returnForm[key_returnForm] = content[key_content][y].substring(0, content[key_content][y].length - 1);

        //increment
        y++;
    });
    
    //add word to result array
    returnForm['latin'] = word;
    
    //delete element with empty key
    delete returnForm[''];

    //return result
    return returnForm;
};


module.exports.translate = async function (sentence, callback) {
    //init result object
    var res = {}
    
    //prepare sentence as an array
    sentence = sentence.split(',').join('').split('.').join('').split(' ')
    
    //get sentence word length
    var length = sentence.length
    
    //loop through words
    sentence.forEach(async (w, key) => {
        //get word info
        var wordInfo = await module.exports.getWordInformation(w) ? await module.exports.getWordInformation(w) : w
    
        //put word info into result array
        res[key] = wordInfo
    
        //print object when all translations fetched
        if(Object.keys(res).length === length) await callback(res)
    })
}