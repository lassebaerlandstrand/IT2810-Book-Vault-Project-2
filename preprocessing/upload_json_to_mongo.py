import json
from pymongo import MongoClient

print("Connecting to client...")
client = MongoClient('mongodb://localhost:27017/')
db     = client['bookvault']

print("Dopping collections...")
db.drop_collection('authors')
db.drop_collection('genres')
db.drop_collection('publishers')
db.drop_collection('books')
db.drop_collection('nouns')
db.drop_collection('adjectives')
db.drop_collection('users')

print("Creating collections...")
authors    = db['authors']
genres     = db['genres']
publishers = db['publishers']
books      = db['books']
nouns      = db['nouns']
adjectives = db['adjectives']
users      = db['users']

print("Populating collections...")
for file in ['authors.json', 'genres.json', 'publishers.json', 'books.json', 'nouns.json', 'adjectives.json', 'users.json']:
    with open(f'preprocessing/{file}', 'r') as f:
        data = json.load(f)
        match file:
            case 'authors.json':
                authors.insert_many(data)
            case 'genres.json':
                genres.insert_many(data)
            case 'publishers.json':
                publishers.insert_many(data)
            case 'books.json':
                books.insert_many(data)
            case 'nouns.json':
                nouns.insert_many(data)
            case 'adjectives.json':
                adjectives.insert_many(data)
            case 'users.json':
                users.insert_many(data)
client.close()
print("Connections closed successfully")