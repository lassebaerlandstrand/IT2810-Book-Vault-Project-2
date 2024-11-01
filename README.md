![navbar](/media/navbar.png)

# Book Vault

_Done_

Book Vault is a web-catalogue for books. On it you can browse books of different genres, length, publishers and whatever else you would want to filter your selection by. You can leave reviews on books you have read, and view other peoples reviews to inform your next book pick.

_ToDo_

You'll have the opportunity to keep track of books you have read, and which you want to read. You will also be able to keep track of your friends literary journeys by following them.

## Pages

### Home page

### Booklist page

### Book-info page

### Reviews page

### Testing page

This page will only be available during development of the website. It can be used to manually test different parts of the website.

**Example test made easier by this page:**

> You want to make sure new users can create reviews

> You want to look at how multiple reviews looks on a book-info page

| ![Testing page](/media/testpage.png) |
| :----------------------------------: |
|           The testing page           |

## Folder structure

We are using a monorepo structure with both frontend and backend in the same repository.

## How to run

### Frontend

To start with the frontend, you need to run the following commands:

```
cd frontend
npm install
npm run dev
```

## Virtual Machine

The application is running on a VM at [http://it2810-05.idi.ntnu.no/project2](http://it2810-05.idi.ntnu.no/project2)

## Dataset

Read about how we got the dataset [here](./preprocessing/README.md)

## How to contribute

Please read the [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) to learn how you can contribute to the project.

## Design

### Theme

During the development of this website, we explored various themes to find the most suitable design. Initially, we adopted a dark blue theme inspired by our first logo. However, this theme did not integrate well with the overall aesthetic of the website, leading to a mix of inconsistent themes. Additionally, the original logo contained excessive detail, which we attempted to simplify, but the results were not convincing.

Therefore, we experimented with several new themes, including a beige color scheme intended to evoke a book-like feel. Unfortunately, this theme did not align with the minimalistic design we aimed for and would require a lot of work to change Mantine's light theme and would go against adviced practices with Mantine. Ultimately, we selected a vibrant blue color that complements our minimalistic design approach. To add visual interest, we incorporated a gradient into the theme.

| <img src="media/OldBookVaultLogo.png" alt="Old logo" width="300" /> | <img src="media/BookVaultLogo.png" alt="New logo" width="300" /> |
| :-----------------------------------------------------------------: | :--------------------------------------------------------------: |
|                              Old Logo                               |                             New Logo                             |

We also support a light theme and a dark theme. The default theme is based on the user's system preferences, but the user can change the theme manually. Sine we support both themes, we have been careful to use colors that work well in both themes and adhere to WCAG guidelines.

### Images

The images used on this website were created using DALL-E 3 and Bing Image Creator. These tools generate images that are not subject to copyright restrictions and can be used freely. Since the generated images were not perfect, we utilized the GIMP image editor to adjust them to better fit our website's design. Additionally, to adhere to sustainable web design principles, we compressed the images using the WebP format, with PNG as a fallback for browsers that do not support WebP.
