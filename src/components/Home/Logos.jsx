import { useState } from "react";
import { motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

const LOGOS = [
  { src: "/img/logos/javascript_logo.svg", category: "Frontend" },
  { src: "/img/logos/ts-logo.svg", category: "Frontend" },
  { src: "/img/logos/reactjs_logo.svg", category: "Frontend" },
  { src: "/img/logos/redux_logo.svg", category: "Frontend" },
  { src: "/img/logos/mui_logo.svg", category: "Frontend" },
  { src: "/img/logos/html5_logo.svg", category: "Frontend" },
  { src: "/img/logos/css_logo.svg", category: "Frontend" },
  { src: "/img/logos/figma_logo.svg", category: "Frontend" },
  { src: "/img/logos/wordpress_logo.svg", category: "Frontend" },
  { src: "/img/logos/nodejs_logo.svg", category: "Backend" },
  { src: "/img/logos/python_logo.svg", category: "Backend" },
  { src: "/img/logos/php_logo.svg", category: "Backend" },
  { src: "/img/logos/mongodb_logo.svg", category: "Backend" },
  { src: "/img/logos/postgresql-logo.svg", category: "Backend" },
  { src: "/img/logos/socketio_logo.svg", category: "Backend" },
  { src: "/img/logos/jwt_logo.svg", category: "Backend" },
  { src: "/img/logos/postman_logo.svg", category: "Backend" },
  { src: "/img/logos/git_logo.svg", category: "Infra" },
  { src: "/img/logos/heroku_logo.svg", category: "Infra" },
  { src: "/img/logos/raspberrypi_logo.svg", category: "Infra" },
  { src: "/img/logos/visualstudio_logo.svg", category: "Infra" },
  { src: "/img/logos/docker_logo.svg", category: "Infra" },
  { src: "/img/logos/amazon_web_services_logo.svg", category: "Infra" },
  { src: "/img/logos/cloudflare_logo.svg", category: "Infra" },
  { src: "/img/logos/letsencrypt_logo.svg", category: "Infra" },
  { src: "/img/logos/linux_logo.svg", category: "Infra" },
  { src: "/img/logos/archlinux_logo.svg", category: "Infra" },
  { src: "/img/logos/manjaro_logo.svg", category: "Infra" },
  { src: "/img/logos/debian_logo.svg", category: "Infra" },
  { src: "/img/logos/nginx_logo.svg", category: "Infra" },
  { src: "/img/logos/home_assistant_logo.svg", category: "Misc" },
  { src: "/img/logos/plex_logo.svg", category: "Misc" },
  { src: "/img/logos/frigate_logo.svg", category: "Misc" },
  { src: "/img/logos/bitcoin_logo.svg", category: "Misc" },
  { src: "/img/logos/discord_logo.svg", category: "Misc" },
  { src: "/img/logos/fdroid_logo.svg", category: "Misc" },
  { src: "/img/logos/steampowered_logo.svg", category: "Misc" },
  { src: "/img/logos/torproject_logo.svg", category: "Misc" },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Infra", "Misc"];

export default function Logos() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? LOGOS : LOGOS.filter((logo) => logo.category === active);

  return (
    <Section
      id="tech"
      kicker="cat stack.txt"
      title="Tools of the Trade"
      intro="The stack I reach for across web apps, automation, and the homelab."
    >
      {/* filter row */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-sm transition-all",
              active === category
                ? "border-green/50 bg-green/15 text-green shadow-glow"
                : "border-white/12 bg-white/5 text-fg-muted hover:border-white/25 hover:text-fg"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* logo mosaic */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="columns-2 gap-4 sm:columns-3 lg:columns-4"
      >
        {filtered.map((logo, index) => {
          const size =
            index % 7 === 0 ? "h-24" : index % 3 === 0 ? "h-16" : "h-20";
          return (
            <div
              key={`${logo.src}-${index}`}
              className={cn(
                "lift mb-4 flex break-inside-avoid items-center justify-center rounded-2xl border border-white/8 bg-white/5 p-4 hover:border-green/30",
                size
              )}
            >
              <img
                src={logo.src}
                alt=""
                loading="lazy"
                className="max-h-12 max-w-[100px] opacity-80 brightness-110 transition-all duration-300 hover:scale-110 hover:opacity-100"
              />
            </div>
          );
        })}
      </motion.div>
    </Section>
  );
}
