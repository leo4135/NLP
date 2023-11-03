const natural = require('natural');
const pos = require('pos');
const {set} = require("pos/lexicon");
const fs = require("fs");

const tokenizer = new natural.WordTokenizer();


async function parseArticle() {
    const article = await fetch('https://www.w3.org/DesignIssues/TimBook-old/History.html')
        .then(res => res.text())
    console.log(article)
    const tokens = tokenizer.tokenize(article);
const tagger = new pos.Tagger();
const taggerWords =  tagger.tag(tokens);
    // console.log(taggerWords)
let parse = [];
    taggerWords.map((x) => {
parse.push(x[1])
})
   // console.log(parse)
    let parseUnique = [...new Set(parse)]
    console.log(parseUnique)
    let tagsCalculate = {};
    for (let valueOfGlobalMassive of parseUnique) {
        tagsCalculate[`${valueOfGlobalMassive}`] = 0;
        for (let item of parse) {
            if (valueOfGlobalMassive === item) {
                tagsCalculate[`${valueOfGlobalMassive}`] += 1;
            }
        }
    }
    const sortable = Object.fromEntries(
        Object.entries(tagsCalculate).sort(([,a],[,b]) => b - a)
    );
    fs.writeFile("list.json", JSON.stringify(sortable), (e) => {
        if (e) {
            console.log(e)
        }
        console.log('Все успешно')
    })

}

parseArticle();