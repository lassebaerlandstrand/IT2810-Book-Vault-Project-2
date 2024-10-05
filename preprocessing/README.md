# Preprocessing the dataset

## Why

As we wanted to make a book-site, we needed a book-dataset. For this dataset we had a few criterias about what each information each entry should contain about each book. These were:

- A rating
- Book title
- Description
- Genres
- Page count
- Author
- An image of the book cover
- More than 10 000 entries (books)

The problem was that few datasets satisfied most of our criterias, and only one satisfied all: [the "Best Books Ever Dataset" by Lorena Casanova Lozano and Sergio Costa Planells](https://zenodo.org/records/4265096). The dataset satisfied all the criterias, but had another problem: lots and lots of missing values. The solution: preprocessing of the data.

## The preprocessing

We chose to preprocess the data using pandas as it is ["a fast, powerful, flexible and easy to use open source data analysis and manipulation tool"](https://pandas.pydata.org/).

First we looked at the dataset to get an idea of what it looked like. It has 52478 entries, and some columns were missing more values than others. The columns with too many missing values that we also were not that interrested in, like price, likedPercent, etc. were just dropped. We also found that some of the bookIds were duplicates, so we removed them.

Then we moved on to trying to remove rows with missing values in the columns we cared about. We replaced all empty strings with NAN values. We also replaced the other standard values for some columns with NAN. The standard page number for unknown values were 0, which would be confusing for a user.

```python
df['pages'] = df['pages'].replace('0', np.nan)
```

About 30 000 entries had one date format, and the other 20 000 entries had another, so we standardized the formats to one format.

```python
df['publishDate'] = pd.to_datetime(df['publishDate'], errors='coerce')
df['publishDate'] = df['publishDate'].dt.strftime('%m/%d/%Y')
```

Then we dropped all the NAN values, indexed the dataset around bookId, and saved the pandas dataframe to JSON.

```python
df.to_json('books.json', orient='index', lines=False)
```

In the end we ended up with a clean dataset with around 40 000 entries.
