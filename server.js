//initialize express app
var express = require('express');
var app = express();

//for scraping
var request = require('request');
var cheerio = require('cheerio');
var ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'
var url = 'http://www.newyorker.com/popular?intcid=mod-most-popular'

//db config
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({

})

var scrapePage = function(error, response, html){
	if (error || response.statusCode != 200){
		console.log(error);
	}
	else{
		var result = [];
		var $ = cheerio.load(html);

		$('.popular-page1').each(function(i, element){

		var title = $(this).children('article').children('figure').children('a').children('img').attr('alt');

		var img_url = $(this).children('article').children('figure').children('a').children('img').attr('src');

		var link = $(this).children('article').children('figure').children('a').attr('href');

		var author = $(this).children('article').children('.text').children('h3').children('a').text();

		var author_url = $(this).children('article').children('.text').children('h3').children('a').attr('href');;

		result.push({
			title: title,
			img_url: img_url,
			link: link,
			author: author,
			author_url: author_url});
		});

		console.log(result);
	}
}

request(
	{
		url: url,
		headers: {
			"User-Agent" : ua
		}
	}, scrapePage
);
