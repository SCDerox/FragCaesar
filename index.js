const centra = require('centra');
const cheerio = require('cheerio');

const translations = {
    'Latein': 'latin',
    'Typ': 'type',
    'Flexionsart': 'flexion_type',
    'Form': 'form',
    'Deutsch': 'german',
    'Geschlect': 'gender'
};

module.exports.getWordInformation = async function (word) {
    let res = await centra(`https://www.frag-caesar.de/lateinwoerterbuch/${word}-uebersetzung.html`).send();
    if (res.body.toString().includes(`Ihr Suchwort <strong><span class="textmarker">${word}</span></strong> entspricht`)) res = await centra(`https://www.frag-caesar.de/lateinwoerterbuch/${word}-uebersetzung-1.html`).send();
    const $ = await cheerio.load(res.body.toString());
    const tableElements = $('.table-responsive table tr').toArray();
    let i = 0;
    const content = {};
    tableElements.forEach(element => {
        i++;
        if (!content[i]) content[i] = [];
        element.children.forEach(children => {
            let childContent = '';
            if (children.children) children.children.forEach(c => {
                if (c.data) childContent = childContent + `${c.data}|`;
            });
            content[i].push(childContent);
        });
    });

    const returnForm = {};

    if (!content[1]) return null;

    let y = 0;
    content[1].forEach(c => {
        if (content[3][y]) returnForm[translations[c.split('|').join('')] ? translations[c.split('|').join('')] : c.split('|').join('')] = content[3][y].substring(0, content[3][y].length - 1);
        else returnForm[translations[c.split('|').join('')] ? translations[c.split('|').join('')] : c.split('|').join('')] = content[2][y].substring(0, content[2][y].length - 1);
        y++;
    });
    returnForm['latin'] = word;
    delete returnForm[''];

    return returnForm;
};