import halo from "./img/posters/games/haloMCC_600x900.jpg";
import fallout3 from "./img/posters/games/fallout3.png";
import fallout_new_vegas from "./img/posters/games/fallout_new_vegas.jpg";
import fallout4 from "./img/posters/games/fallout4_600x900.jpg";
import arma3 from "./img/posters/games/arma_600x900.jpg";
import gearsOfWar4 from "./img/posters/games/GearsOfWar4_600x900.jpg";
import starwarsJKJA from "./img/posters/games/starwars_jkja_600x900.png";
import portal2 from "./img/posters/games/portal2_600x900.jpg";
import metroidDread from "./img/posters/games/metroid_dread.png";
import metroid_fusion from "./img/posters/games/metroid_fusion.png";
import witcher3 from "./img/posters/games/witcher3.png";
import forza_horizon_5 from "./img/posters/games/forza_horizon_5.png";
import super_smash_bros_ultimate from "./img/posters/games/super_smash_bros_ultimate.png";
import untitled_goose_game from "./img/posters/games/untitled_goose_game.png";
import binding_of_isaac from "./img/posters/games/binding_of_isaac.png";

import pulpFiction from "./img/posters/movies/pulpFiction_library_600x900.jpg";
import southPark from "./img/posters/movies/south_park_bigger_longer_and_uncut_library_600x900.jpg";
import donnieDarko from "./img/posters/movies/donnie_darko_library_600x900.jpg";
import truman from "./img/posters/movies/truman_library_600x900.jpg";
import nightcrawler from "./img/posters/movies/nightcrawler_600x900.jpg";
import collector from "./img/posters/movies/collector_600x900.jpg";
import matrix from "./img/posters/movies/matrix_600x900.jpg";
import wordwordswords from "./img/posters/movies/wordswordswords_600x900.jpg";
import django_unchained from "./img/posters/movies/django_unchained_600x900.jpg";
import inglourious_basterds from "./img/posters/movies/inglourious_basterds_600x900.jpg";
import kill_bill from "./img/posters/movies/kill_bill_600x900.jpg";
import hollywood from "./img/posters/movies/hollywood_600x900.jpg";
import fired_up from "./img/posters/movies/fired_up_600x900.jpg";

export const projects = [
  {
    name: "Firebelly Fitness",
    link: "https://app.firebellyfitness.com/",
    github: {
      client: 'https://github.com/clocktower39/firebelly-client',
      server: 'https://github.com/clocktower39/firebelly-server',
    },
    img: "/img/projects/firebelly-fitness-poster.png",
    desc: "Personal Traning web app for client, trainer able to view and and manage training clients. Track weight lifting progress, goals, and nutrition",
  },
  {
    name: "Dauntless Athletics",
    link: "https://www.dauntlessathletics.com/",
    github: {
      client: 'https://github.com/clocktower39/dauntless-athletics',
      server: null,
    },
    img: null,
    desc: "Cheer and Gymnastics facility offering training to beginners and advanced athletes in a supportive environment.",
  },
  {
    name: "Social Picture App",
    link: "https://mattkearns.dev/social-picture-app/",
    github: {
      client: 'https://github.com/clocktower39/social-picture-app',
      server: 'https://github.com/clocktower39/social-server-pic-app',
    },
    img: "/img/projects/social-picture-app-poster-black-bg.jpg",
    desc: "Share, like, and comment on user uploaded pictures. Message with other users using socket.io for real time message interface",
  },
  {
    name: "CEC-TV Controller",
    link: null,
    github: {
      client: "https://github.com/clocktower39/tv-controller-client",
      server: "https://github.com/clocktower39/tv-controller",
    },
    img: null,
    desc: "Control your TV via a raspberry pi using the HDMI CEC commands.",
  },
  {
    name: "Self Driving Car Simulator",
    link: "https://mattkearns.dev/self-driving-car-sim",
    github: {
      client: "https://github.com/clocktower39/self-driving-car-sim",
      server: null,
    },
    img: "/img/projects/selfdrivingcar-poster.png",
    desc: "1000 instances of a car are deployed all driven by neural networks. Save the best car position to teach the neural network how to drive by avoiding other cars on the road.",
  },
  {
    name: "Activity Tracker",
    link: "https://mattkearns.dev/activity-tracker",
    github: {
      client: "https://github.com/clocktower39/activity-tracker-app",
      server: "https://github.com/clocktower39/activity-server",
    },
    img: "/img/projects/activity-tracker-poster-black-bg.jpg",
    desc: "Create personalized daily tasks to check off each day and track progress",
  },
];

export const books = [
  {
    title: "The Blind Watchmaker",
    poster: "/img/posters/books/blindWatchmaker_library_600x900.jpg",
  },
  {
    title: "Climbing Mount Improbable",
    poster: "/img/posters/books/richard_dawkins_climbing_mount_improbable.jpg",
  },
  {
    title: "Unweaving The Rainbow",
    poster: "/img/posters/books/unweavingTheRainbow_library_600x900.jpg",
  },
  {
    title: "Code: The Hidden Language of Computer Hardware and Software",
    poster: "/img/posters/books/code_library_600x900.jpg",
  },
  {
    title: "Cryptography: A Very Short Introduction",
    poster: "/img/posters/books/cryptography_library_600x900.jpg",
  },
  {
    title: "The Selfish Gene",
    poster: "/img/posters/books/richard_dawkins_the_selfish_gene.jpg",
  },
  {
    title: "The Extended Phenotype",
    poster: "/img/posters/books/richard_dawkins_the_extended_phenotype.jpg",
  },
  {
    title: "The Ancestor's Tale",
    poster: "/img/posters/books/richard_dawkins_the_ancestors_tale.jpg",
  },
];

export const games = [
  {
    title: "Halo: MCC",
    poster: halo,
  },
  {
    title: "Fallout 4",
    poster: fallout4,
  },
  {
    title: "Metroid Dread",
    poster: metroidDread,
  },
  {
    title: "The Witcher 3: Wild Hunt",
    poster: witcher3,
  },
  {
    title: "Metroid Fusion",
    poster: metroid_fusion,
  },
  {
    title: "Super Smash Bros Ultimate",
    poster: super_smash_bros_ultimate,
  },
  {
    title: "Forza Horizon 5",
    poster: forza_horizon_5,
  },
  {
    title: "Gears of War 4",
    poster: gearsOfWar4,
  },
  {
    title: "Fallout 3",
    poster: fallout3,
  },
  {
    title: "Fallout New Vegas",
    poster: fallout_new_vegas,
  },
  {
    title: "Untitled Goose Game",
    poster: untitled_goose_game,
  },
  {
    title: "Star Wars: Jedi Knight Jedi Academy",
    poster: starwarsJKJA,
  },
  {
    title: "Portal 2",
    poster: portal2,
  },
  {
    title: "Binding of Isaac",
    poster: binding_of_isaac,
  },
  {
    title: "Arma 3",
    poster: arma3,
  },
];

export const movies = [
  {
    title: "Nightcrawler",
    poster: nightcrawler,
  },
  {
    title: "Django Unchained",
    poster: django_unchained,
  },
  {
    title: "Donnie Darko",
    poster: donnieDarko,
  },
  {
    title: "The Truman Show",
    poster: truman,
  },
  {
    title: "Pulp Fiction",
    poster: pulpFiction,
  },
  {
    title: "The Collector",
    poster: collector,
  },
  {
    title: "The Matrix",
    poster: matrix,
  },
  {
    title: "Inglourious Basterds",
    poster: inglourious_basterds,
  },
  {
    title: "South Park Bigger Longer & Uncut",
    poster: southPark,
  },
  {
    title: "Bo Burnham: Words Words Words",
    poster: wordwordswords,
  },
  {
    title: "Kill Bill",
    poster: kill_bill,
  },
  {
    title: "Fired Up",
    poster: fired_up,
  },
  {
    title: "Once Upon a Time... In Hollywood",
    poster: hollywood,
  },
  // { title: "Idiocracy" },
  // { title: "What." },
  // { title: "Fired Up" },
  // { title: "Gattaca" },
  // { title: "Gran Torino" },
  // { title: "The Lego Movie" },
  // { title: "Shutter Island" },
  // { title: "Silver Linings Playbook" },
  // { title: "Step Brothers" },
  // { title: "Team America World Police" },
  // { title: "Employee of the Month" },
  // { title: "Gattaca" },
  // { title: "Harold & Kumar Go to White Castle" },
  // { title: "Hot Rod" },
  // { title: "John Wick" },
  // { title: "Rubber" },
  // { title: "Terminator" },
  // { title: "Logan" },
];

export const tvShows = [
  { title: "South Park" },
  { title: "Archer" },
  { title: "Bob's Burgers" },
  { title: "Criminal Minds" },
  { title: "Dexter" },
  { title: "Rick and Morty" },
  { title: "The Office" },
  { title: "Futurama" },
  { title: "Aqua Team Hunger Force" },
  { title: "Chernobyl" },
  { title: "Barry" },
  { title: "Avatar: The Last Airbender" },
  { title: "Criminal Minds" },
  { title: "Fallout" },
  { title: "Mr. Robot" },
  { title: "Nathan for You" },
  { title: "Severance" },
  { title: "Scavengers Reign" },
  { title: "Trailer Park Boys" },
  { title: "True Detective" },
  { title: "It's Always Sunny in Philadelphia" },
];

export const inspirational = [
  { firstName: "Bo", lastName: "Burnham", medium: "comedy" },
  { firstName: "Matt", lastName: "Stone", medium: "comedy" },
  { firstName: "Trey", lastName: "Parker", medium: "comedy" },
  { firstName: "Quintin", lastName: "Tarantino", medium: "director" },
  { firstName: "Samuel", lastName: "Jackson", medium: "actor" },
  { firstName: "Jake", lastName: "Gyllenhaal", medium: "actor" },
  { firstName: "Steve", lastName: "Wozniak", medium: "hardware" },
  { firstName: "Steve", lastName: "Jobs", medium: "design" },
  { firstName: "Bill", lastName: "Gates", medium: "software" },
  { firstName: "Brad", lastName: "Harris", medium: "historian" },
  { firstName: "Richard", lastName: "Dawkins", medium: "biologist" },
  { firstName: "Alan", lastName: "Turning", medium: "computing" },
  { firstName: "Jay", lastName: "Freeman", medium: "developer" },
  { firstName: "Ian", lastName: "Beer", medium: "security" },
];

export const list = [...books, ...movies, ...games];
