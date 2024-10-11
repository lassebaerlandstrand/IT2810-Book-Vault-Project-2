import numpy as np
import pandas as pd

# Read original dataset
df = pd.read_csv('preprocessing/books_1.Best_Books_Ever.csv')

# Dop columns with too many NAN values (that we also are not interrested in)
df.drop(['price', 'likedPercent', 'firstPublishDate',
        'edition'], axis=1, inplace=True)

# Replace empty strings with NaN
df.replace('', np.nan, inplace=True)

# Convert to datetime, coercing errors (invalid dates will become NaT)
df['publishDate'] = pd.to_datetime(df['publishDate'], errors='coerce')

# Format all dates to mm/dd/yyyy
df['publishDate'] = df['publishDate'].dt.strftime('%m/%d/%Y')

# isbn and pages had some standard values that didnt make sense
df['isbn'] = df['isbn'].replace('9999999999999', np.nan)
df['pages'] = df['pages'].replace('0', np.nan)
df['genres'] = df['genres'].replace('[]', np.nan)

# Remove duplicate bookIds
df = df.drop_duplicates(subset='bookId', keep='first')

# Drop rows with NaN values
df.dropna(subset=['description', 'language', 'bookFormat', 'pages',
          'publisher', 'publishDate', 'coverImg', 'isbn', 'author', 'genres'], inplace=True)

# rename author into authors and split at comma and trim
df.rename(columns={'author': 'authors'}, inplace=True)
df['authors'] = df['authors'].str.split(',')
df['authors'] = df['authors'].apply(lambda x: [i.strip() for i in x])

# interpret the json string of genres
df['genres'] = df['genres'].apply(lambda x: eval(x))

# Set bookId as the index
df.set_index('bookId', inplace=True)

# include the id as a column
df['id'] = df.index

# Limit rows to the first 5000
df = df.iloc[:5000]

# Save the DataFrame as a JSON list
df.to_json('preprocessing/books.json', orient='records')
