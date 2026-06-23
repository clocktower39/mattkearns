import { motion } from "motion/react";
import { Section } from "@/components/layout/Section";

/*
  Tech stack, grouped by area instead of a random mosaic — reads like an
  organized "what I work with" breakdown. Each entry: logo + name.
*/
const GROUPS = [
  {
    label: "frontend",
    items: [
      { name: "JavaScript", src: "/img/logos/javascript_logo.svg" },
      { name: "TypeScript", src: "/img/logos/ts-logo.svg" },
      { name: "React", src: "/img/logos/reactjs_logo.svg" },
      { name: "Redux", src: "/img/logos/redux_logo.svg" },
      { name: "MUI", src: "/img/logos/mui_logo.svg" },
      { name: "HTML5", src: "/img/logos/html5_logo.svg" },
      { name: "CSS", src: "/img/logos/css_logo.svg" },
      { name: "Figma", src: "/img/logos/figma_logo.svg" },
      { name: "WordPress", src: "/img/logos/wordpress_logo.svg" },
    ],
  },
  {
    label: "backend",
    items: [
      { name: "Node.js", src: "/img/logos/nodejs_logo.svg" },
      { name: "Python", src: "/img/logos/python_logo.svg" },
      { name: "PHP", src: "/img/logos/php_logo.svg" },
      { name: "MongoDB", src: "/img/logos/mongodb_logo.svg" },
      { name: "PostgreSQL", src: "/img/logos/postgresql-logo.svg" },
      { name: "Socket.IO", src: "/img/logos/socketio_logo.svg" },
      { name: "JWT", src: "/img/logos/jwt_logo.svg" },
      { name: "Postman", src: "/img/logos/postman_logo.svg" },
    ],
  },
  {
    label: "infrastructure",
    items: [
      { name: "Docker", src: "/img/logos/docker_logo.svg" },
      { name: "NGINX", src: "/img/logos/nginx_logo.svg" },
      { name: "AWS", src: "/img/logos/amazon_web_services_logo.svg" },
      { name: "Cloudflare", src: "/img/logos/cloudflare_logo.svg" },
      { name: "Linux", src: "/img/logos/linux_logo.svg" },
      { name: "Arch", src: "/img/logos/archlinux_logo.svg" },
      { name: "Manjaro", src: "/img/logos/manjaro_logo.svg" },
      { name: "Debian", src: "/img/logos/debian_logo.svg" },
      { name: "Raspberry Pi", src: "/img/logos/raspberrypi_logo.svg" },
      { name: "Let's Encrypt", src: "/img/logos/letsencrypt_logo.svg" },
      { name: "Heroku", src: "/img/logos/heroku_logo.svg" },
      { name: "Git", src: "/img/logos/git_logo.svg" },
      { name: "VS Code", src: "/img/logos/visualstudio_logo.svg" },
    ],
  },
  {
    label: "homelab & misc",
    items: [
      { name: "Home Assistant", src: "/img/logos/home_assistant_logo.svg" },
      { name: "Plex", src: "/img/logos/plex_logo.svg" },
      { name: "Frigate", src: "/img/logos/frigate_logo.svg" },
      { name: "Discord", src: "/img/logos/discord_logo.svg" },
      { name: "Steam", src: "/img/logos/steampowered_logo.svg" },
      { name: "F-Droid", src: "/img/logos/fdroid_logo.svg" },
      { name: "Tor", src: "/img/logos/torproject_logo.svg" },
      { name: "Bitcoin", src: "/img/logos/bitcoin_logo.svg" },
    ],
  },
];

function ToolTile({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.03 }}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all hover:-translate-y-1 hover:border-green/30 hover:bg-white/[0.06]"
    >
      <img
        src={item.src}
        alt={item.name}
        loading="lazy"
        className="h-9 w-9 object-contain opacity-80 brightness-110 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
      />
      <span className="text-center font-mono text-xs text-fg-muted transition-colors group-hover:text-fg">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function Logos() {
  return (
    <Section
      id="tech"
      kicker="cat stack.txt"
      title="Tools of the Trade"
      intro="The stack I reach for across web apps, automation, and the homelab — grouped by where it lives."
    >
      <div className="space-y-10">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-4 font-mono text-sm text-leaf">
              <span className="text-fg-faint">{"// "}</span>
              {group.label}
            </p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {group.items.map((item, i) => (
                <ToolTile key={`${group.label}-${item.name}`} item={item} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
