from flask import Flask, make_response, request, render_template, send_from_directory
from controller import services as function
import requests as rq
import json
import os

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def main():
   return "Online"

@app.route('/homepage')
def homepage():
    return render_template('index.html')

@app.route('/articles')
def getArticles():
  articles = []
  selectedCategory = request.args.get('category')
  fenixToken = function.GetFenixToken()
  url = "https://faq.directtalk.com.br/1.0/api/article/department/summary?id=1f0cf10b-f3e4-462e-88fe-61a461385d4b&filterActiveArticles=true&skip=0&count=9999&orderBy=1"
  payload = {}
  headers = {
  'Authorization': 'DT-Fenix-Token ' + fenixToken['token']
}
  response = rq.request("GET", url, headers=headers, data=payload)
  response = response.json()
  for i in range(len(response['items'])):
     if response['items'][i]['categories'][0]['text'] == selectedCategory:
      article = {
        "category": response['items'][i]['categories'][0]['text'],
        "title": response['items'][i]['question'],
        "content": response['items'][i]['answer']
     }
      articles.append(article)
  articles = json.dumps(articles)
  return articles

@app.route('/categories')
def getCategories():
   categories = []
   url = "https://faq.directtalk.com.br/1.0/api/category/department/?id=1f0cf10b-f3e4-462e-88fe-61a461385d4b"
   payload = {}
   headers = {
  'authority': 'faq.directtalk.com.br',
  'accept': 'application/json, text/plain, */*'
  }
   response = rq.request("GET", url, headers=headers, data=payload)
   response = response.json()
   for i in range(len(response)):
      category = {
         "id": response[i]['id'],
         "name": response[i]['text']
      }
      categories.append(category)
   categories = json.dumps(categories)
   return categories
   

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8080, debug=True)