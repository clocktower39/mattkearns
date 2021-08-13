import scheduleGeneratorImg from "./img/schedule-generator-img.jpg";
import exerciseAppImg from "./img/exerciseBWImg.jpg";
import socialPhotoAppImg from "./img/socialPhotoAppImg.jpg";
import bonfireImg from "./img/bonfireImg.jpg";
import medicationImg from "./img/medication.jpg";

import halo from './img/posters/976730_library_600x900.jpg'
import fallout4 from './img/posters/377160_library_600x900.jpg'
import r6s from './img/posters/359550_library_600x900.jpg'
import skyrim from './img/posters/489830_library_600x900.jpg'
import portal2 from './img/posters/620_library_600x900.jpg'
import alyx from './img/posters/546560_library_600x900.jpg'
import wolfenstein from './img/posters/201810_library_600x900.jpg'
import amoungUs from './img/posters/945360_library_600x900.jpg'
import tabletop from './img/posters/286160_library_600x900.jpg'

export const projects = [
  {
    name: "Bonfire",
    link: "https://mattkearns.dev/message",
    github: {
      client: 'https://github.com/clocktower39/message-react-redux',
      server: 'https://github.com/clocktower39/message-server',
    },
    img: bonfireImg,
    desc: "Message app using socket.io for real time updates, JWT for authentication, mongoDB for storage",
  },
  {
    name: "Schedule Generator",
    link: "https://mattkearns.dev/random-schedule-generator",
    github: {
      client: 'https://github.com/clocktower39/react-scheduler',
      server: null,
    },
    img: scheduleGeneratorImg,
    desc: "Creates a daily schedule based on a weighted system and availablility",
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
  {
    name: "Social Picture App",
    link: "https://mattkearns.dev/social-picture-app/",
    github: {
      client: 'https://github.com/clocktower39/social-picture-app',
      server: 'https://github.com/clocktower39/social-server-pic-app',
    },
    img: socialPhotoAppImg,
    desc: "Instagram mock application",
  },
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
];


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
    title: 'Skyrim',
    poster: skyrim,
  },
  {
    title: 'Portal 2',
    poster: portal2,
  },
  {
    title: 'Alyx',
    poster: alyx,
  },
  {
    title: 'Wolfenstein',
    poster: wolfenstein,
  },
  {
    title: 'Amoung Us',
    poster: amoungUs,
  },
  {
    title: 'Tabletop Simulator',
    poster: tabletop,
  },
];

export const movies = [
  { title: "South Park Bigger" },
  { title: "Longer & Uncut" },
  { title: "Idiocracy" },
  { title: "Truman" },
  { title: "The Matrix" },
  { title: "Words Words Words" },
  { title: "What." },
  { title: "Django Unchained" },
  { title: "Pulp Fiction" },
  { title: "Nightcrawler" },
  { title: "Donnie Darko" },
  { title: "Fired Up" },
  { title: "Gattaca" },
  { title: "Gran Torino" },
  { title: "Inglourious Basterds" },
  { title: "The Lego Movie" },
  { title: "Shutter Island" },
  { title: "Silver Linings Playbook" },
  { title: "Step Brothers" },
  { title: "Team America World Police" },
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