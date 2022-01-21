import exerciseAppImg from "./img/exerciseBWImg.jpg";
import bonfireImg from "./img/bonfireImg.jpg";
import medicationImg from "./img/medication.jpg";
import trackerImg from "./img/activity-tracker.jpg";
import fiveDayForecast from "./img/five-day-forecast.jpg";

import halo from './img/posters/976730_library_600x900.jpg'
import fallout4 from './img/posters/377160_library_600x900.jpg'
import r6s from './img/posters/359550_library_600x900.jpg'
import alyx from './img/posters/546560_library_600x900.jpg'
// import skyrim from './img/posters/489830_library_600x900.jpg'
// import portal2 from './img/posters/620_library_600x900.jpg'
// import wolfenstein from './img/posters/201810_library_600x900.jpg'
// import amoungUs from './img/posters/945360_library_600x900.jpg'
// import tabletop from './img/posters/286160_library_600x900.jpg'

import pulpFiction from './img/posters/pulpFiction_library_600x900.jpg'
import southPark from './img/posters/south_park_bigger_longer_and_uncut_library_600x900.jpg'
import donnieDarko from './img/posters/donnie_darko_library_600x900.jpg'
import truman from './img/posters/truman_library_600x900.jpg'

import blindWatchmaker from './img/posters/blindWatchmaker_library_600x900.jpg'
import unweavingTheRainbow from './img/posters/unweavingTheRainbow_library_600x900.jpg'
import code from './img/posters/code_library_600x900.jpg'
import cryptography from './img/posters/cryptography_library_600x900.jpg'

export const projects = [
  {
    name: "Medication Tracking System",
    link: "https://mattkearns.dev/medication-tracking-system/",
    github: {
      client: 'https://github.com/clocktower39/medication-client',
      server: 'https://github.com/clocktower39/medication-server',
    },
    img: medicationImg,
    desc: "Application to monitor and track patient blood levels",
  },
  {
    name: "Activity Tracker",
    link: "https://mattkearns.dev/activity-tracker",
    github: {
      client: 'https://github.com/clocktower39/activity-tracker-app',
      server: null,
    },
    img: trackerImg,
    desc: "Create personalized daily tasks to check off each day and track progress",
  },
  {
    name: "Bonfire",
    link: "https://mattkearns.dev/message",
    github: {
      client: 'https://github.com/clocktower39/message-react-redux',
      server: 'https://github.com/clocktower39/message-server',
    },
    img: bonfireImg,
    desc: "Message application using socket.io for real time updates, JWT for authentication, mongoDB for storage",
  },
  {
    name: "5 day Forecast",
    link: "https://mattkearns.dev/five-day-forecast",
    github: {
      client: 'https://github.com/clocktower39/five-day-forecast',
      server: null,
    },
    img: fiveDayForecast,
    desc: "Search by zip code to get a five day forecast of the weather using the openweathermap api",
  },
  {
    name: "Fitness Exercises App",
    link: "https://mattkearns.dev/fitness-exercises",
    github: {
      client: 'https://github.com/clocktower39/Fitness-Exercises',
      server: null,
    },
    img: exerciseAppImg,
    desc: "Lists fitness exercises by muscle group and provides a description",
  },
];

export const books = [
  {
    title: "The Blind Watchmaker",
    poster: blindWatchmaker,
  },
  {
    title: "Unweaving The Rainbow",
    poster: unweavingTheRainbow,
  },
  {
    title: "Code: The Hidden Language of Computer Hardware and Software",
    poster: code,
  },
  {
    title: "Cryptography: A Very Short Introduction",
    poster: cryptography,
  },
]

export const games = [
  {
    title: 'Halo: MCC',
    poster: halo,
  },
  {
    title: 'Fallout 4',
    poster: fallout4,
  },
  {
    title: 'Rainbow Six Siege',
    poster: r6s,
  },
  {
    title: 'Alyx',
    poster: alyx,
  },
  // {
  //   title: 'Skyrim',
  //   poster: skyrim,
  // },
  // {
  //   title: 'Portal 2',
  //   poster: portal2,
  // },
  // {
  //   title: 'Wolfenstein',
  //   poster: wolfenstein,
  // },
  // {
  //   title: 'Amoung Us',
  //   poster: amoungUs,
  // },
  // {
  //   title: 'Tabletop Simulator',
  //   poster: tabletop,
  // },
]

export const movies = [
  {
    title: 'Pulp Fiction',
    poster: pulpFiction,
  },
  {
    title: "South Park Bigger Longer & Uncut",
    poster: southPark,
  },
  {
    title: "Donnie Darko",
    poster: donnieDarko,
  },
  {
    title: "The Truman Show",
    poster: truman,
  },
  // { title: "Idiocracy" },
  // { title: "The Matrix" },
  // { title: "Words Words Words" },
  // { title: "What." },
  // { title: "Django Unchained" },
  // { title: "Nightcrawler" },
  // { title: "Fired Up" },
  // { title: "Gattaca" },
  // { title: "Gran Torino" },
  // { title: "Inglourious Basterds" },
  // { title: "The Lego Movie" },
  // { title: "Shutter Island" },
  // { title: "Silver Linings Playbook" },
  // { title: "Step Brothers" },
  // { title: "Team America World Police" },
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
]

export const inspirational = [
  { firstName: "Bo", lastName: "Burnham", medium: "comedy" },
  { firstName: "Matt", lastName: "Stone", medium: "comedy" },
  { firstName: "Trey", lastName: "Parker", medium: "comedy" },
  { firstName: "Quintin", lastName: "Tarantino", medium: "director" },
  { firstName: "Samuel", lastName: "Jackson", medium: "actor" },
  { firstName: "Jake", lastName: "Gyllenhaal", medium: "actor" },
  { firstName: "Steve", lastName: "Woz", medium: "hardware" },
  { firstName: "Steve", lastName: "Jobs", medium: "design" },
  { firstName: "Bill", lastName: "Gates", medium: "software" },
  { firstName: "Brad", lastName: "Harris", medium: "historian" },
  { firstName: "Richard", lastName: "Dawkins", medium: "biologist" },
  { firstName: "Alan", lastName: "Turning", medium: "computing" },
  { firstName: "Jay", lastName: "Freeman", medium: "developer" },
  { firstName: "Ian", lastName: "Beer", medium: "security" },
];

export const list = [
  ...books,
  ...movies,
  ...games,
];