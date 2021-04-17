/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-07-10 11:45:48
 */
var http = require("http");
var axios = require('axios');
var cheerio = require('cheerio');
const fs = require('fs');

// http.createServer(function(request, response) {

//     // 发送 HTTP 头部
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, { 'Content-Type': 'text/plain' });

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

const funcArticle = function({ baseUrl, domStr, type }) {
    const list = [];
    axios.get(baseUrl).then(res => {
        const $ = cheerio.load(res.data);
        const listArr = Array.from($(domStr)); // 传入文章节点数组的dom节点

        listArr.forEach(e => {
            const params = {};
            let article;
            if (type === 'article') {
                article = $(e).find('h4');
                params.link = article.find('a').attr('href');
            } else {
                article = $(e);
                params.link = article.attr('href');
            }
            params.title = article.text().replace(/(\s+|原创|原力计划)/g, '').slice(0, 20);
            list.push(params);
        });

        let str = JSON.stringify(list, null, "\t")
        fs.writeFile('data.js', str, { flag: 'a' }, (err) => {
            if (err) console.log('error!!!');
            console.log('写入完成');
        })
    }).catch(err => {
        console.log(err);
    })
}
const params1 = {
    baseUrl: 'https://blog.csdn.net/jbj6568839z/article/list/1',
    domStr: '.article-list .article-item-box',
    type: 'article' // 文章列表
}

const params2 = {
    baseUrl: 'https://blog.csdn.net/jbj6568839z/category_10069610.html',
    domStr: '.column_article_list li a',
    type: 'category' // 文章专栏
}
funcArticle(params2);