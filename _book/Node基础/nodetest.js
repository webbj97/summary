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

var baseUrl = 'https://blog.csdn.net/jbj6568839z/category_10069610.html'; // 专栏
var list = []
var func = function() {
    axios.get(baseUrl).then(res => {
        var $ = cheerio.load(res.data);
        var articleList = $('.column_article_list li'); // 拿到文章列表
        var len = articleList.length;
        for (let i = 0; i < len; i++) {
            var now = $(articleList[i]).find('a');
            var title = now.find('.title');
            var obj = {
                link: now.attr('href'),
                title: title.text().replace(/(\s+|原创|原力计划)/g, '')
            }
            list.push(obj)
        }

        let str = JSON.stringify(list, null, "\t")
        fs.writeFile('csdn-data.js', str, { flag: 'a' }, function(err) {
            if (err) console.log('error!!!');
            console.log('写入完成');
        })
    }).catch(err => {
        console.log(err);
    })
}
func()


// var func = function(id) {
//     const nowUrl = baseUrl + id
//     axios.get(nowUrl).then(res => {
//         var $ = cheerio.load(res.data);
//         var articleList = $('.article-item-box'); // 拿到文章列表
//         var len = articleList.length;

//         for (let i = 0; i < len; i++) {
//             var now = $(articleList[i]).find('h4 a');
//             var visit = $(articleList[i]).find('.read-num')[0].children[1].data;
//             var discuss = $(articleList[i]).find('.read-num')[1].children[1].data
//             list.push({
//                 titie: now.text().replace(/(\s+|原创|原力计划)/g, ''), // 结构原因，需要剔除不需要的部分
//                 link: now.attr('href'),
//                 visit,
//                 discuss
//             })
//         }

//         let str = JSON.stringify(list, null, "\t")
//         fs.writeFile('csdn-data.js', str, { flag: 'a' }, function(err) {
//             if (err) console.log('error!!!');
//             console.log('写入完成');
//         })
//     }).catch(err => {
//         console.log(err);
//     })
// }

// func(1)