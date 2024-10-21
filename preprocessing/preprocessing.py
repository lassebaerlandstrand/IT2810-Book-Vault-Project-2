import numpy as np
import pandas as pd
import uuid
from ast import literal_eval

# Set UUID namespace
namespace = uuid.UUID('12345678123456781234567812345678')

# Read original dataset
df = pd.read_csv('preprocessing/dataset.csv')

# Drop columns with too many NaN values that are not needed
df.drop(['price', 'likedPercent', 'firstPublishDate', 'edition',
        'rating', 'numRatings', 'bbeScore', 'bbeVotes'], axis=1, inplace=True)

# Replace empty strings with NaN
df.replace('', np.nan, inplace=True)

# Convert to datetime, coercing errors (invalid dates will become NaT)
df['publishDate'] = pd.to_datetime(df['publishDate'], errors='coerce')

# Correct invalid values in isbn and pages
df['isbn'].replace('9999999999999', np.nan, inplace=True)
df['pages'].replace('0', np.nan, inplace=True)
df['genres'].replace('[]', np.nan, inplace=True)

# Remove duplicate bookIds
df.drop_duplicates(subset='bookId', keep='first', inplace=True)

# Drop rows with NaN values in the specified columns
df.dropna(subset=['description', 'language', 'bookFormat', 'pages', 'publisher',
          'publishDate', 'coverImg', 'isbn', 'author', 'genres'], inplace=True)

# rename author into authors
df.rename(columns={'author': 'authors'}, inplace=True)

# Create new DataFrames for authors, genres, publishers
authors = pd.DataFrame(df['authors'].str.split(
    ',').explode().str.strip().unique(), columns=['name'])
genres = pd.DataFrame(df['genres'].apply(
    literal_eval).explode().str.strip().unique(), columns=['name'])
publishers = pd.DataFrame(
    df['publisher'].str.strip().unique(), columns=['name'])

# # Assign mongodb uuid to each row
# authors['uuid'] = authors['name'].apply(lambda x: uuid.uuid5(namespace, str(x)).hex)
# genres['uuid'] = genres['name'].apply(lambda x: uuid.uuid5(namespace, str(x)).hex)
# publishers['uuid'] = publishers['name'].apply(lambda x: uuid.uuid5(namespace, str(x)).hex)

# Save the new DataFrames as JSON lists
authors.to_json('preprocessing/authors.json', orient='records')
genres.to_json('preprocessing/genres.json', orient='records')
publishers.to_json('preprocessing/publishers.json', orient='records')


# # Create dictionaries for quick lookups by 'name'
# author_dict = dict(zip(authors['name'], authors['uuid']))
# genre_dict = dict(zip(genres['name'], genres['uuid']))
# publisher_dict = dict(zip(publishers['name'], publishers['uuid']))

# Replace values in authors, genres, and publisher columns. Also trim
df['authors'] = df['authors'].str.split(',').apply(lambda x: [y.strip() for y in x])
df['genres'] = df['genres'].apply(literal_eval).apply(lambda x: [y.strip() for y in x])
df['publisher'] = df['publisher'].str.strip()

# Split the series field
df = df[~df['series'].str.contains(r'#.*-', na=False)]
df['numberInSeries'] = df['series'].apply(lambda x: ((int(x.split('#')[1].strip()) if x.split(
    '#')[1].strip().isnumeric() else None) if len(x.split('#')) > 1 else None) if isinstance(x, str) else None)
df['series'] = df['series'].apply(lambda x: x.split(
    '#')[0].strip() if isinstance(x, str) else None)

# Interpret JSON strings of other columns
df['characters'] = df['characters'].apply(literal_eval)
df['awards'] = df['awards'].apply(literal_eval)
df['ratingsByStars'] = df['ratingsByStars'].apply(literal_eval).apply(
    lambda x: {5-stars: int(reviews) for stars, reviews in enumerate(x)})
df['setting'] = df['setting'].apply(literal_eval)

# Extract digits from pages and convert to int
df['pages'] = pd.to_numeric(
    df['pages'].str.extract('(\d+)')[0], errors='coerce')

# Set bookId as the index and add id column
df.set_index('bookId', inplace=True)
df['id'] = df.index

# Save the DataFrame as a JSON list
df.to_json('preprocessing/books.json', orient='records')

