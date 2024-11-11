# Book Vault 🗿

<img src="media/LogoFull.png" alt="Book Vault Logo" width="300" />

## Table of Contents

1. [Description](#description)
2. [Folder structure](#folder-structure)
3. [How to run](#how-to-run)
4. [Pages](#pages)
5. [Design](#design)
6. [Dataset](#dataset)
7. [Testing](#testing)
8. [Tech stack](#tech-stack)
9. [How to contribute](#how-to-contribute)

## Description 📖

Book Vault is a comprehensive web-based book catalogue, with over 37 thousands literary works. It is built with modern web technologies, offering an intuitive interface for discovering, tracking, and reviewing books. On it you can browse books of different genres, length, publishers and whatever else you would want to filter your selection by. You can leave reviews on books you have read, and view other peoples reviews to inform your next book pick. The application is designed to be accessible and sustainable, with a focus on user experience and performance.

### Key Features

- **Extensive Catalog**: Browse through our collection of 37,000+ books.
- **Community Engagement**:
  - Rate books on a 5-star scale
  - See the distribution of ratings for each book
  - Write and share your own detailed reviews
  - Read community reviews to discover new reads
- **Personalization**:
  - Create and manage your reading list
  - Track books you've read
  - See your own reviews
- **User Experience**:
  - Responsive design that works across all devices
  - Minimalistic and modern interface providing an intuitive user experience
  - Efficient pagination for smooth browsing
  - Fast search and filtering capabilities
  - Dark mode for reduced eye strain
- **Advanced Selection Options**:

  - Debounced Search 🔍

  Sort books by:

  - Book title
  - Author name
  - Publisher name

  Filter books by:

  - Publishers
  - Authors
  - Average rating
  - Year published
  - Number of pages
  - Genres

## Folder structure 📂

We are using a monorepo structure with both frontend and backend in the same repository.

## How to run ⚙️

### Frontend

To start with the frontend, you need to run the following commands:

```
cd frontend
npm install
npm run dev
```

### Backend

[Click here to go to the tutorial on how to run the backend locally](/backend/README.md)

## Virtual Machine

The application is running on a VM at [http://it2810-05.idi.ntnu.no/project2](http://it2810-05.idi.ntnu.no/project2)

## Pages 📃

### Home page

This is our home page. From this page you can navigate to all other pages, as well as view a random book.

| ![Homepage](/media/homepage.png) |
| :------------------------------: |
|          The home-page           |

### Booklist page

On this page you can browse and filter books.

| ![Booklist page](/media/bookbrowsing.png) |
| :---------------------------------------: |
|             The booklist page             |

### Book-info page

On this page you can view more info about a book, like average rating, description, genres, ...

You can also leave a review of the book, as well as view other peoples reviews.

| ![Book-info page](/media/bookinfo.png) |
| :------------------------------------: |
|           The book-info page           |

### Reviews page

Here you can view all the reviews you have left on books. The reviews will however be shortened down if they are too long. To read the full reviews you have to click on them and read them on their respective book-info pages.

| ![Reviews page without reviews](/media/noreviewspage.png) |
| :-------------------------------------------------------: |
|           The reviews page without any reviews            |

| ![Reviews page with reviews](/media/reviewspage.png) |
| :--------------------------------------------------: |
|            The reviews page with reviews             |

### User page

Information about user

### Testing page

This page will only be available during development of the website. It can be used to manually test different parts of the website.

**Example test made easier by this page:**

> You want to make sure new users can create reviews

> You want to look at how multiple reviews looks on a book-info page

| ![Testing page](/media/testpage.png) |
| :----------------------------------: |
|           The testing page           |

## Design 🖌️

### Theme

During the development of this website, we explored various themes to find the most suitable design. Initially, we adopted a dark blue theme inspired by our first logo. However, this theme did not integrate well with the overall aesthetic of the webfsite, leading to a mix of inconsistent themes. Additionally, the original logo contained excessive detail, which we attempted to simplify, but the results were not convincing.

Therefore, we experimented with several new themes, including a beige color scheme intended to evoke a book-like feel. Unfortunately, this theme did not align with the minimalistic design we aimed for and would require a lot of work to change Mantine's light theme and would go against adviced practices with Mantine. Ultimately, we selected a vibrant blue color that complements our minimalistic design approach. To add visual interest, we incorporated a gradient into the theme.

| <img src="media/OldBookVaultLogo.png" alt="Old logo" width="300" /> | <img src="media/BookVaultLogo.png" alt="New logo" width="300" /> |
| :-----------------------------------------------------------------: | :--------------------------------------------------------------: |
|                              Old Logo                               |                             New Logo                             |

We also support a light theme and a dark theme. The default theme is based on the user's system preferences, but the user can change the theme manually. Sine we support both themes, we have been careful to use colors that work well in both themes and adhere to WCAG guidelines.

### Images 🖼️

The images used on this website were created using DALL-E 3 and Bing Image Creator. These tools generate images that are not subject to copyright restrictions and can be used freely. Since the generated images were not perfect, we utilized the GIMP image editor to adjust them to better fit our website's design. Additionally, to adhere to sustainable web design principles, we compressed the images using the WebP format, with PNG as a fallback for browsers that do not support WebP. The images for the book covers are from Goodreads, we also use [Placehold.co](https://placehold.co/200x300?text=Cover%20image%20for%20book) for fallbacks.

### Universal Design 🌍

### Accessibility ♿

We have made an effort to make our application as accessible as possible.

The Mantine UI library follows the Accessible Rich Internet Applications Suite (WAI-ARIA) accessibility guidelines. To further increase accessibility, we have added aria-attributes to the relevant components. We also follow the Web Content Accessibility Guidelines (WCAG) to ensure that our website is accessible to all users. The website should be usable to all people, regardless of their abilities (except complete blindness 🧑‍🦯🧑‍🦯‍➡️👨‍🦯👨‍🦯‍➡️👩‍🦯👩‍🦯).

Examples on accessibility accommodations:

- Sight impaired:
  - Support for screen readers
  - WCAG 2.1 compliant color contrast between text and background
  - Scalable text
  - Website is zoomable
- Hearing:
  - No sound is used to convey information
- Motor impaired:
  - Website is navigable with a keyboard
  - Large clickable areas
- Cognitive:
  - Consistent and intuitive design
  - Clear and concise language

With the use of various developer tools, we have ensured that the website is accessible in various ways.

**Colors** 🎨

We have high contrast between text and background to support people who struggle with varying degrees of colorblindness. Mantine uses the [Open Color](https://yeun.github.io/open-color/) color palette, and have set it up such that colors are accessible. We have also made manual adjustments to the Mantine theme, as we found some edge cases where that was not the case. The colors are now WCAG compliant.

## Sustainability 🌱

**TODO: Add data and analytics from lighthouse once the application is done**

## Dataset 📚

Read about how we got the dataset [here](./preprocessing/README.md).

## Test coverage 🧪

[_This part is partually copied from the first project_](https://git.ntnu.no/IT2810-H24/T05-Project-1/blob/main/README.md)

We use Vitest with Jest for testing.

![Test logos](/media/vitestjest.png)

**Snapshot tests**

Snapshot tests are a simple way to ensure no unexpected changes are made to components. We are using snapshot tests for most of our components to ensure that we avoid unexpected changes in the generated html.

**Unit tests**

We have unit tests for most of our components. In these tests we check important attributes and functionalities. We however do not test most pages, as the pages mainly just consist of components which are already well tested by unit tests.

**Mocking the API**

We mock the API when we do tests in the frontend. This is mainly done through mocking our hooks as we mainly use hooks to query the API.

### End-to-end tests &nbsp;<img src="media/CypressLogo.png" alt="Cypress Logo" width="25" />

We are using Cypress to do end-to-end tests. We have followed best practices and have created both small and large tests. The small tests are more focused, e.g. only checking if reviews are working, while the large tests are more comprehensive. We have aimed for 80% smaller feature-focused tests and 20% larger end-to-end tests, both simulate a user's interaction with the application.

The end-to-end tests will test the application as a whole, with the frontend and backend connected. When running these tests you can either choose to run the backend locally or use the backend in the virtual machine. To change this you go to this [env-file](./frontend/.env) and change it to either

- `VITE_GRAPHQL_ENDPOINT="http://localhost:3001/graphql"` for a local backend.
- `VITE_GRAPHQL_ENDPOINT="http://it2810-05.idi.ntnu.no/graphql"` for the backend in the virtual machine.

It is best practice to run the E2E on a local test database (or in this course we could use a test database on the VM). However, we know it can take some time to setup a local database if you don't already have MongoDB installed. Therefore we have made it possible to run the tests on the backend in the virtual machine. We have created a predefined test user which you will take control of, when running the E2E tests if you use the virtual machine. In a real-world scenario, we would have not done this and instead used a local test database.

To run the tests you can run the following commands in **separate terminals**:

```
# Do this only if you want to run e2e tests on the local backend. If you want to run the tests on the backend in the virtual machine, skip this step.
# Run the backend (in its own terminal)
cd backend
npm install
npm run start
```

```
# Run the frontend (in its own terminal)
cd frontend
npm install
npm run dev
```

```
# Run the e2e tests (in its own terminal)
cd e2e
npm install
npm run cypress
```

After running `npm run cypress` a window should open. You then choose `E2E Testing` and the browser of your choice. You can run all tests by selecting `allTests.cy.ts` or run a single test by selecting the test you want to run.

## Tech stack 🛠️

![Tech stack](/media/techstack.png)

### Complete Tech Stack List

- **Frontend**
  - TypeScript
  - React
  - PostCSS
  - Mantine
  - Vite
  - GraphQL/Apollo Client
  - GraphQL Codegen
- **Backend**
  - TypeScript
  - Express
  - Node.js
  - GraphQL/Apollo Server
  - MongoDB
- **Testing**
  - Vitest
  - Cypress
  - React Testing Library
- **Linting/Formatting**
  - ESLint
  - Prettier
  - Stylelint
- **Preprocessing**
  - Python
  - Pandas

### Why we chose this tech stack

We chose the MERN tech stack with Apollo Client to query the API in frontend. MERN stands for MongoDB, Express, React and Node. The framework of the application is Vite (with TypeScript + React).

We chose MongoDB as our database and not a relational database because of MongoDBs horizontal scalability. We have almost 40 000 books, and almost no relations. Therefore it is more important that the database has the ability to scale well. This also means that relations have to be implemented in resolvers in the backend, as entities and relations in the database are just represented as documents.

Since we want our site to be sustainable we wanted caching in the frontend. This hinders fetching the same information from the database multiple times. This can very easily be done if you use Apollo Client to query the backends API, but then the API has to understand GraphQL. Express with ApolloServer allows us to build such an API.

MongoDB with Express is often combined with either Angular og React. We chose React because we wanted to use the [Mantine UI library](https://mantine.dev/). We wanted to use this library because we wanted to support dark-mode for our application to be more sustainable. Components from this library has light- and darkmode versions, which allows us to support darkmode without too much effort.

Mantine offers GitHub [templates](https://mantine.dev/getting-started/) for the project structure. This includes the setup with Vite, TypeScript, React, linting dependencies and testing dependencies. This makes it easier to get started with the project. We did however have to change some of the setup to fit our needs, e.g. we removed the Storybook dependency as this is not needed for our project.

![Mantine UI library logo](/media/mantine.png)

## How to contribute 🤝

Please read the [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) to learn how you can contribute to the project.

[Go to top](#book-vault)
