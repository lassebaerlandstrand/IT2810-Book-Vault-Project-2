import json
from pymongo import MongoClient, TEXT

client = MongoClient('mongodb://localhost:27017/')
db = client['bookvault']
db.drop_collection('authors')
db.drop_collection('genres')
db.drop_collection('publishers')
db.drop_collection('books')

authors = db['authors']
genres = db['genres']
publishers = db['publishers']
books = db['books']

for file in ['authors.json', 'genres.json', 'publishers.json', 'books.json']:
    with open(f'preprocessing/{file}', 'r') as f:
        data = json.load(f)
        if file == 'authors.json':
            authors.insert_many(data)
        elif file == 'genres.json':
            genres.insert_many(data)
        elif file == 'publishers.json':
            publishers.insert_many(data)
        else:
            books.insert_many(data)

client.close()
