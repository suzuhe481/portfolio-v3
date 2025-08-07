/**
 * NOTE: When saving markdown for the descriptions, there can no NO indents or it will be treated
 * as a code block.
 * Start each line at the leftmost start of the object, keeping the start in line with the object's
 * closing bracket.
 *
 * For line break: Add...
 * \n &nbsp;
 */

export const projects = [
  {
    title: "Rubik's Cube Simulator (In progress)",
    thumbnail_image: "/images/projects/rubiks.jpg",
    demo_link: "https://rubikscubesolver.hectorsuazo.com/",
    github_link: "",
    tech_stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "ChatGPT",
      "GitHub Copilot",
    ],
    description: `
  This is an experimental project where I want to create a Rubik's Cube simulator with Three.js, 
  which I don't have experience in. The goal is to build this project by using AI to generate the 
  Three.js portion in a controlled way. I want to see AI's efficiency in using a complex animation 
  technology. I used ChatGPT to do a long brainstorming session to plan the entire process and 
  split it up into phases. Then I'll build the file structure, add detailed file/function 
  descriptions, and have Copilot generate the files. This has been a very hit/miss project 
  where it sometimes gets some nuanced parts wrong, and I have to debug to see how it went wrong.
  \n &nbsp;

  A secondary goal was to build this project without needing to learn Three.js, but I've had to 
  learn some basics in order to debug. The project is still in progress, but my main takeaway is 
  that AI still cannot handle complex 3D design in a way where it can be easily expanded on. You can 
  see how I try and manage the AI's prompts by referencing my requirements.md and copilot-instructions.md file.
  `,
  },
  {
    title: "Portfolio v3 (Latest)",
    thumbnail_image: "/images/projects/portfoliov3.jpg",
    demo_link: "https://hectorsuazo.com/",
    github_link: "https://github.com/suzuhe481/portfolio-v3",
    tech_stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Postgres",
      "AWS S3",
      "Three.js",
      "Motion Library",
    ],
    description: `
  My latest portfolio, made as a fullstack Next.js application with a Postgres database and image 
  storage with AWS S3. I used components from the Aceternity component library for my animated 
  components, where I ocmbined and customized many of them to suit my needs. I also used the 
  Motion animation library to make my own animations on SVGs and components. I also 
  incorporated Three.js for the interactive 3D globe.
  `,
  },
  {
    title: "MNGMNT Tasks App",
    thumbnail_image: "/images/projects/mngmnt.jpg",
    demo_link: "https://mngmnt.hectorsuazo.com/",
    github_link: "https://github.com/suzuhe481/mngmnt-tasks-app",
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "dnd kit"],
    description: `
  Organize your tasks in a Jira like table or a Trello like Kanban board. Add/edit/delete tasks, 
  or even add new columns to be more organized!
  \n &nbsp;

  This is a React application that was originally a take home assignment, but I definitely 
  enjoyed working on this and implementing Dnd-kit for the drag and drop functionality of the cards 
  in the Kanban board. I also added multiple features such as pagination, using localStorage 
  for persistent data, bulk editing/deleting tasks. I also enjoyed adding subtle animations on 
  components such as hover effects on cards, and fade in/out effects on modals.
  `,
  },
  {
    title: "Vehicle Imager Classifier (ML)",
    thumbnail_image: "/images/projects/vehicleImageClassifier.jpg",
    demo_link: "https://huggingface.co/spaces/hextor43/VehicleClassifier",
    github_link:
      "https://www.kaggle.com/code/hectorsuazo/vehicle-image-classifier-model-trainer",
    tech_stack: ["Python", "fast.ai", "Hugging Face"],
    description: `
  This is my first machine learning application where I trained my own model to create an app. 
  I learned from courses by Fast.ai to train my own model by giving it images of cars, 
  motorcycles, and trucks. With that, you can submit an image and it will identify if it's one 
  of those three.
  `,
  },
  {
    title: "Blogga",
    thumbnail_image: "/images/projects/blogga.jpg",
    demo_link: "https://www.myblogga.com/",
    github_link: "https://github.com/suzuhe481/blogga-frontend",
    tech_stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node",
      "Express",
      "MongoDB",
    ],
    description: `
  My first fullstack application of a blogging website. Users can browse through blogs, 
  or create an account to be able to create their own blogs with a rich text editor. 
  \n &nbsp;

  With an Express backend connected to a MongoDB database, users can create and then email verify 
  their account, which is handled by JWTs. Express sessions 
  keep user session's stored in the database. Users can browse through blogs, create their own, and also
  save them as drafts to work on later. They can also unpublish blogs and republish them later.
  `,
  },
  {
    title: "Typeshift",
    thumbnail_image: "/images/projects/typeshift.jpg",
    demo_link: "https://typeshift.hectorsuazo.com/",
    github_link: "https://github.com/suzuhe481/typeshift",
    tech_stack: ["React", "TypeScript"],
    description: `
  This is a React app where I attempted to recreate the game of the same name. Users need to 
  spell words by sliding columns of letters up/down. They can choose between difficulties 
  where more columns are added to make longer words.
  `,
  },
  {
    title: "Regulation Slider (fan project)",
    thumbnail_image: "/images/projects/regulationSlider.jpg",
    demo_link: "https://www.regulationslider.com/",
    github_link: "",
    tech_stack: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    description: `
  This is a fan project, so ignore references to things you might not understand. This project uses 
  the recharts library to create a real-time, interactive chart that is made by the user.
  \n &nbsp;

  After starting the timer, users can change the value on a scale between 0-10, and the chart will 
  update to add a point at that time of that value. Users can customize their line color, add notes 
  to specific points, and even export their graph to overlay multiple graphs on top of each other.
  `,
  },
  {
    title: "Battleship",
    thumbnail_image: "/images/projects/battleship.jpg",
    demo_link: "https://battleship.hectorsuazo.com/",
    github_link: "https://github.com/suzuhe481/battleship",
    tech_stack: ["JavaScript", "Webpack"],
    description: `
  This is Battleship. This is a HTML, CSS, JavaScript project bundled with Webpack, but I built in 
  a React way with components. 
  \n &nbsp;

  Users can play against an AI opponent. Place your ships, and guess where each other placed their ships. 
  I made two difficulty levels, Easy and Realistic, where Easy is just the computer guessing 
  randomly. But Realistic, I made a custom AI algorithm that acts based on it's previous 
  guesses to behave like a human. It will guess randomly until it receives a hit. Then it will guess 
  the cells surrounding it's last hit until it completely sinks the ship that was there.
  `,
  },
  {
    title: "Portfolio v2",
    thumbnail_image: "/images/projects/portfoliov2.jpg",
    demo_link: "",
    github_link: "",
    tech_stack: ["React", "JavaScript", "SASS"],
    description: `
  My first frontend React portfolio. This was the first time I felt like I could style components
  easily, so I added subtle fade in animations, hover effects, and was able to provide a
  place to showcase my projects.
  `,
  },
  {
    title: "Secret Posts",
    thumbnail_image: "/images/projects/secretPosts.jpg",
    demo_link: "",
    github_link: "https://github.com/suzuhe481/secret-posts",
    tech_stack: ["Node", "Express", "MongoDB", "Bcrypt", "Passport.js", "SASS"],
    description: `
  My first attempt at making a simple social media site with Node/Express and using EJS to 
  create HTML templates.
  \n &nbsp;

  Users can create an account and choose their membership. Member, Member+, or Admin, where each had 
  different permissions. Though you needed a special password to become a Member+ or Admin.

  - Public: Can view posts with anonymized post names.
  - Member: Can make/delete posts, and delete their profile.
  - Member+: Can see post authors.
  - Admin: Can delete any post or profile.
  `,
  },
  {
    title: "Video Game Inventory Management",
    thumbnail_image: "/images/projects/inventoryManagement.jpg",
    demo_link: "",
    github_link: "",
    tech_stack: ["Node", "Express", "MongoDB", "SASS"],
    description: `
  My first backend Node/Express project in which I practiced making an inventory system. I 
  created a CRUD app to manage an inventory of video games. You can manage video games by creating 
  instances of games, developers, genres, and consoles, then create multiple copies of a game for 
  inventory purposes.
  `,
  },
  {
    title: "Node/Express Quick Start Guide",
    thumbnail_image: "/images/projects/nodeExpressGuide.jpg",
    demo_link: "https://github.com/suzuhe481/node-express-quick-start-guide",
    github_link: "https://github.com/suzuhe481/node-express-quick-start-guide",
    tech_stack: ["Markdown"],
    description: `
  This is a quick start guide I made to help me set up new Express projects. I feel that configuration 
  is one of the hardest parts of a project, and it is easily forgettable because it's a problem 
  that only gets solved once, so it's rarely practiced unless you make multiple projects. So I 
  created this README as a handy guide to help me remember the setup. Some things might be out of 
  date though, since I haven't updated this in a while.
  `,
  },
  {
    title: "React Quick Start Guide",
    thumbnail_image: "/images/projects/reactGuide.jpg",
    demo_link: "https://github.com/suzuhe481/react-quick-start-guide",
    github_link: "https://github.com/suzuhe481/react-quick-start-guide",
    tech_stack: ["Markdown"],
    description: `
  A quick start guide to setting up React applications. I feel that configuration is one of the 
  hardest parts of a project, and it is easily forgettable because it's a problem that only gets 
  solved once, so it's rarely practiced unless you make multiple projects. This README is a handy 
  guide to help me remember the setup, as well as recommending some helpful libraries, that one might 
  use. Some things might be out of date though, since I haven't updated this in a while.
  `,
  },
  {
    title: "Yard Sale",
    thumbnail_image: "/images/projects/yardsale.jpg",
    demo_link: "https://yardsale.hectorsuazo.com/",
    github_link: "https://github.com/suzuhe481/yard-sale-shopping-cart",
    tech_stack: ["JavaScript", "React"],
    description: `
  One my my early React applications where I create a shopping cart which users can add items to. 
  There are items from multiple categories and you can individually edit items in the cart by changing 
  the number of items or removing it completely.
  `,
  },
  {
    title: "Japanese Cuisine Memory Match Game",
    thumbnail_image: "/images/projects/japaneseMemoryMatch.jpg",
    demo_link: "https://japanese-cuisine-memory-match-game.pages.dev/",
    github_link:
      "https://github.com/suzuhe481/japanese-cuisine-memory-match-game",
    tech_stack: ["JavaScript", "React"],
    description: `
  My first game I made with React. A memory matching game where the goal is to remember which 
  Japanese foods you've clicked. If you click on the same one again, you'll have to start over.`,
  },
  {
    title: "CV App Creator",
    thumbnail_image: "/images/projects/cvCreator.jpg",
    demo_link: "https://cv-app-creator.pages.dev/",
    github_link: "https://github.com/suzuhe481/cv-app-creator",
    tech_stack: ["JavaScript", "React"],
    description: `
  One of my first ever React applications where I practice the use of 
  useState. A user can fill out the form on the left and have the same data replicated 
  in a resume format on the right. Users can also save the resume as a PDF when finished.`,
  },
];
