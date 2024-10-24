import json
from pymongo import MongoClient, TEXT
from datetime import UTC, datetime, timedelta

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
            for book in data:
                if book['publishDate'] < 0:
                    book['publishDate'] = datetime(1970, 1, 1) + timedelta(seconds=book['publishDate']/1000)
                else:
                    book['publishDate'] = datetime.fromtimestamp(book['publishDate']/1000, tz=UTC)
            books.insert_many(data)
            books.create_index([('title', TEXT)], language_override='dummy')

client.close()
