import { useMemo, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Terminal, { TerminalOutput, TerminalInput } from "react-terminal-ui";
import { projects, games, books, movies, tvShows } from "../states";
import { facts } from "../data/facts";
import { useReducedMotion } from "../hooks/useReducedMotion";

const colors = {
  green: { hex: "#01A252" },
  red: { hex: "#DB2D20" },
  yellow: { hex: "#FDED02" },
  blue: { hex: "#01A0E4" },
  purple: { hex: "#A16A94" },
  grey: { hex: "#8a93a0" },
};

// Lightweight presentational components — same prop API the rest of the file
// expects, but plain inline styles instead of Emotion `styled`. Clickable
// elements get a class so `:hover` underline can live in index.css.
const StyledSpan = ({ color, cursor, word, style, children, ...rest }) => (
  <span
    {...rest}
    className={cursor ? "term-clickable" : undefined}
    style={{
      color: color || "inherit",
      cursor: cursor ? "pointer" : "inherit",
      wordWrap: word || "break-word",
      ...style,
    }}
  >
    {children}
  </span>
);

const BoldItalicSpan = ({ color, fontWeight, fontStyle, style, children, ...rest }) => (
  <span
    {...rest}
    style={{
      color: color || colors.yellow.hex,
      fontWeight: fontWeight || 500,
      fontStyle: fontStyle || "italic",
      ...style,
    }}
  >
    {children}
  </span>
);

const StyledLink = ({ textDecoration, color, style, children, ...rest }) => (
  <a
    {...rest}
    className="term-link"
    style={{
      textDecoration: textDecoration || "none",
      color: color || colors.blue.hex,
      ...style,
    }}
  >
    {children}
  </a>
);

const Pre = ({ style, children, ...rest }) => (
  <span
    {...rest}
    style={{
      whiteSpace: "pre-wrap",
      fontFamily:
        'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
      ...style,
    }}
  >
    {children}
  </span>
);

const normalize = (s = "") => s.toLowerCase().trim();

const slugify = (s = "") =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* ----------------------------------------------------------------------------
 * Virtual filesystem
 * --------------------------------------------------------------------------
 * Everything the terminal can navigate lives in a single tree rooted at "~".
 * A node is either a directory (has `children`) or a file (has a `kind` that
 * tells `cat`/`open` how to render it). Path resolution is done generically,
 * so cd/ls/cat/tree all understand "~", "/", "..", ".", and multi-segment
 * relative or absolute paths — just like a real shell.
 * ------------------------------------------------------------------------- */

const ABOUT_TXT = `Matt Kearns — developer, tinkerer, problem-solver.

I spend most of my time building, breaking, fixing, and rebuilding
things, usually with code, hardware, or systems that weren't quite
working the way they should. I care about why something exists, how it
fits into real life, and whether it actually does what it's supposed to.

Outside of code I'm coaching cheer and tumbling, lifting, gaming, or
tinkering purely for fun.

Tip: try 'ls', 'cd projects', then 'cat <name>'. 'help' lists everything.`;

const STACK_TXT = `Languages    JavaScript · TypeScript · Python · PHP
Frontend     React · Redux · MUI · HTML5 · CSS · Bootstrap
Backend      Node.js · Express · Socket.IO · JWT
Data         MongoDB · PostgreSQL
Infra        Docker · Nginx · Linux · AWS · Cloudflare · Let's Encrypt
Tools        Git · Postman · Figma · VS Code`;

const buildContactNode = () => ({
  type: "file",
  name: "contact.txt",
  kind: "contact",
});

// Builds the children map for a media category (games/books/movies/shows).
const buildPosterDir = (name, items, label) => {
  const children = {};
  items.forEach((item, i) => {
    let slug = slugify(item.title);
    if (!slug) slug = `${name}-${i}`;
    if (children[slug]) slug = `${slug}-${i}`;
    children[slug] = {
      type: "file",
      name: slug,
      kind: "poster",
      label,
      display: item.title,
      data: item,
    };
  });
  return { type: "dir", name, children };
};

const buildProjectsDir = () => {
  const children = {};
  projects.forEach((p, i) => {
    let slug = slugify(p.name);
    if (!slug) slug = `project-${i}`;
    if (children[slug]) slug = `${slug}-${i}`;
    children[slug] = {
      type: "file",
      name: slug,
      kind: "project",
      display: p.name,
      data: p,
    };
  });
  return { type: "dir", name: "projects", children };
};

const ROOT = {
  type: "dir",
  name: "~",
  children: {
    "about.txt": { type: "file", name: "about.txt", kind: "text", content: ABOUT_TXT },
    "stack.txt": { type: "file", name: "stack.txt", kind: "text", content: STACK_TXT },
    "contact.txt": buildContactNode(),
    resume: { type: "file", name: "resume", kind: "route", route: "/web_resume" },
    projects: buildProjectsDir(),
    games: buildPosterDir("games", games, "Game"),
    books: buildPosterDir("books", books, "Book"),
    movies: buildPosterDir("movies", movies, "Movie"),
    shows: buildPosterDir("shows", tvShows, "Show"),
  },
};

// Resolve a path string against a current working directory (array of
// segments). Returns the resolved segment array (relative to ~). Supports
// "~", "/", ".", "..", and any number of segments.
const resolvePath = (cwdSegs, input = "") => {
  const trimmed = input.trim();
  let parts;
  if (trimmed === "" || trimmed === ".") return [...cwdSegs];
  if (trimmed === "~" || trimmed === "/") return [];
  if (trimmed.startsWith("~/")) parts = trimmed.slice(2).split("/");
  else if (trimmed.startsWith("/")) parts = trimmed.slice(1).split("/");
  else parts = [...cwdSegs, ...trimmed.split("/")];

  const out = [];
  for (const raw of parts) {
    const seg = raw.trim();
    if (seg === "" || seg === ".") continue;
    if (seg === "~") {
      out.length = 0;
      continue;
    }
    if (seg === "..") {
      out.pop();
      continue;
    }
    out.push(seg.toLowerCase());
  }
  return out;
};

// Walk the tree to the node at the given resolved segments. null if missing.
const nodeAt = (segs) => {
  let node = ROOT;
  for (const seg of segs) {
    if (node.type !== "dir") return null;
    const child = node.children[seg];
    if (!child) return null;
    node = child;
  }
  return node;
};

const segsToLabel = (segs) => (segs.length ? `~/${segs.join("/")}` : "~");
const segsToPath = (segs) => (segs.length ? `~/${segs.join("/")}` : "~");

// --- file renderers -------------------------------------------------------

const ProjectResponse = (p) => (
  <StyledSpan color={colors.green.hex}>
    <BoldItalicSpan>Project:</BoldItalicSpan> {p.name}
    <br />
    <BoldItalicSpan>Link:</BoldItalicSpan>{" "}
    {p.link ? (
      <StyledLink href={p.link} target="_blank" rel="noreferrer">
        {p.link}
      </StyledLink>
    ) : (
      <span style={{ color: colors.grey.hex }}>null</span>
    )}
    <br />
    <BoldItalicSpan>Client Source:</BoldItalicSpan>{" "}
    {p.github.client ? (
      <StyledLink href={p.github.client} target="_blank" rel="noreferrer">
        {p.github.client}
      </StyledLink>
    ) : (
      <span style={{ color: colors.grey.hex }}>null</span>
    )}
    <br />
    <BoldItalicSpan>Server Source:</BoldItalicSpan>{" "}
    {p.github.server ? (
      <StyledLink href={p.github.server} target="_blank" rel="noreferrer">
        {p.github.server}
      </StyledLink>
    ) : (
      <span style={{ color: colors.grey.hex }}>null</span>
    )}
    <br />
    <Pre>
      <BoldItalicSpan>Description:</BoldItalicSpan> {p.desc}
    </Pre>
    {p.img && (
      <div>
        <img src={p.img} alt={p.name} style={{ maxWidth: "500px", marginTop: "8px" }} />
      </div>
    )}
  </StyledSpan>
);

// `cat <item>` — a compact poster card (cover + label + title) for the
// games/books/movies/shows categories. Replaces the old PosterResponse.
const PosterCard = (node) => (
  <div className="term-poster-card">
    {node.data.poster && (
      <img className="term-poster-cover" src={node.data.poster} alt={node.display} />
    )}
    <div>
      <div style={{ color: colors.yellow.hex, fontStyle: "italic", marginBottom: 4 }}>
        {node.label}
      </div>
      <div style={{ color: colors.green.hex, fontWeight: 600, fontSize: "1.05em" }}>
        {node.display}
      </div>
    </div>
  </div>
);

// A directory whose every child is a poster (games/books/movies/shows) gets a
// thumbnail gallery from `ls` instead of a plain list of names.
const isPosterDir = (node) =>
  node?.type === "dir" &&
  Object.values(node.children).length > 0 &&
  Object.values(node.children).every((c) => c.kind === "poster");

const posterGrid = (targetSegs, dirNode, onItemClick) => (
  <div className="term-poster-grid">
    {Object.values(dirNode.children).map((child) => {
      const abs = segsToPath([...targetSegs, child.name]);
      return (
        <button
          type="button"
          key={child.name}
          className="term-poster"
          title={child.display}
          onClick={() => onItemClick(`cat ${abs}`)}
        >
          {child.data?.poster ? (
            <img src={child.data.poster} alt={child.display} loading="lazy" />
          ) : (
            <span className="term-poster-fallback">{child.display}</span>
          )}
          <span className="term-poster-label">{child.display}</span>
        </button>
      );
    })}
  </div>
);

// --- neofetch -------------------------------------------------------------

const MK_LOGO = ` __  __ _  __
|  \\/  | |/ /
| |\\/| | ' /
| |  | | . \\
|_|  |_|_|\\_\\`;

const renderNeofetch = ({ themeName, uptime, cmdCount }) => {
  const row = (k, v) => (
    <div key={k}>
      <span style={{ display: "inline-block", width: 92, color: colors.yellow.hex }}>{k}</span>
      <span style={{ color: colors.green.hex }}>{v}</span>
    </div>
  );
  const dots = ["#DB2D20", "#FDED02", "#01A252", "#01A0E4", "#A16A94", "#8a93a0"];
  return (
    <div className="term-neofetch">
      <Pre style={{ color: colors.green.hex }}>{MK_LOGO}</Pre>
      <div className="term-neofetch-info">
        <div>
          <span style={{ color: colors.yellow.hex }}>matt</span>@
          <span style={{ color: colors.yellow.hex }}>mattkearns.dev</span>
        </div>
        <div style={{ color: colors.grey.hex }}>─────────────────────</div>
        {row("OS", "mattOS (web build)")}
        {row("Shell", "mattsh 1.0")}
        {row("Uptime", uptime)}
        {row("Theme", themeName)}
        {row("Commands", `${cmdCount} run`)}
        {row("Stack", "React · Node · Linux")}
        {row("IRL", "cheer & tumbling coach")}
        {row("Contact", "cat contact.txt")}
        <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
          {dots.map((c) => (
            <span key={c} className="term-neofetch-dot" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- cowsay ---------------------------------------------------------------

const cowsay = (text) => {
  const t = ` ${text} `;
  const bar = (ch) => " " + ch.repeat(t.length);
  return [
    bar("_"),
    `<${t}>`,
    bar("-"),
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ].join("\n");
};

// --- matrix rain ----------------------------------------------------------

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘ".split("");

// 🍍 rain — mostly pineapples with the occasional tropical friend.
const PINEAPPLE_CHARS = ["🍍", "🍍", "🍍", "🍍", "🌴", "🥥"];

function MatrixRain({ onDone, glyphs = MATRIX_CHARS, fontSize = 16 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let running = true;
    let drops = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = new Array(Math.ceil(canvas.width / fontSize)).fill(1);
    };
    resize();
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#22c55e";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      if (running) raf = requestAnimationFrame(draw);
    };
    draw();
    const stop = () => onDone(null);
    const timer = setTimeout(stop, 6000);
    // Defer the dismiss listeners so the Enter/click that launched matrix
    // doesn't immediately close it on the same tick.
    const armTimer = setTimeout(() => {
      window.addEventListener("keydown", stop);
      window.addEventListener("click", stop);
    }, 80);
    window.addEventListener("resize", resize);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      clearTimeout(armTimer);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("click", stop);
      window.removeEventListener("resize", resize);
    };
  }, [onDone, glyphs, fontSize]);

  // Portal to <body> so the fixed overlay escapes any transformed ancestor
  // (animated sections create a containing block that would otherwise trap it).
  return createPortal(
    <>
      <canvas ref={canvasRef} className="term-matrix" />
      <div className="term-matrix-hint">press any key to exit</div>
    </>,
    document.body
  );
}

const THEMES = ["default", "dracula", "solarized", "amber", "matrix"];

export default function TerminalController() {
  // current working directory as resolved segments ([] === home/~)
  const [cwd, setCwd] = useState([]);
  const cwdRef = useRef([]);
  useEffect(() => {
    cwdRef.current = cwd;
  }, [cwd]);

  // fun: theme palette, matrix overlay, uptime baseline
  const [themeName, setThemeName] = useState("default");
  // matrixCfg is null when off, or { glyphs, fontSize } when the rain is on.
  const [matrixCfg, setMatrixCfg] = useState(null);
  const reducedMotion = useReducedMotion();
  const loadTimeRef = useRef(Date.now());

  // command registry (used for help + command-name autocomplete)
  const COMMANDS = useMemo(
    () => [
      { name: "help", usage: "help", desc: "list available commands" },
      { name: "man", usage: "man <command>", desc: "show usage for a command" },
      { name: "ls", usage: "ls [-l] [path]", desc: "list directory contents" },
      {
        name: "cd",
        usage: "cd <path>",
        desc: "change directory (supports ~, .., absolute & relative paths)",
      },
      { name: "pwd", usage: "pwd", desc: "print the current directory path" },
      { name: "cat", usage: "cat <file>", desc: "print a file (project info, poster, text)" },
      { name: "tree", usage: "tree [path]", desc: "print the directory tree" },
      { name: "open", usage: "open <project>", desc: "open a project's live link in a new tab" },
      { name: "source", usage: "source <project>", desc: "show a project's source code links" },
      { name: "whoami", usage: "whoami", desc: "print the current user" },
      { name: "echo", usage: "echo <text>", desc: "print text back" },
      { name: "history", usage: "history", desc: "show command history" },
      { name: "date", usage: "date", desc: "print the current date and time" },
      { name: "neofetch", usage: "neofetch", desc: "show system info + logo" },
      { name: "roll", usage: "roll [category]", desc: "random pick from games/books/movies/shows" },
      { name: "theme", usage: "theme [name]", desc: `switch palette (${THEMES.join(", ")})` },
      { name: "matrix", usage: "matrix", desc: "follow the white rabbit" },
      { name: "pineapple", usage: "pineapple", desc: "🍍 (you'll see)" },
      { name: "clear", usage: "clear", desc: "clear the screen" },
    ],
    []
  );
  const commandNames = useMemo(() => COMMANDS.map((c) => c.name), [COMMANDS]);

  // command history / navigation
  const [history, setHistory] = useState([]);
  const historyRef = useRef([]);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const [historyIndex, setHistoryIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const currentInputRef = useRef("");
  const suggestionsRef = useRef([]);

  // monotonically increasing key generator so React keys never collide
  const keyCounter = useRef(0);
  const nextKey = () => `ln-${keyCounter.current++}`;

  useEffect(() => {
    currentInputRef.current = currentInput;
  }, [currentInput]);

  useEffect(() => {
    suggestionsRef.current = suggestions;
  }, [suggestions]);

  // --- listing helper: turns a directory node into clickable lines --------
  const listingLines = (targetSegs, dirNode) => {
    const entries = Object.values(dirNode.children);
    if (!entries.length) {
      return [
        <TerminalOutput key={nextKey()}>
          <StyledSpan color={colors.grey.hex}>(empty)</StyledSpan>
        </TerminalOutput>,
      ];
    }
    return entries.map((child) => {
      const isDir = child.type === "dir";
      const abs = segsToPath([...targetSegs, child.name]);
      const cmd = isDir ? `cd ${abs}` : `cat ${abs}`;
      return (
        <TerminalOutput key={nextKey()}>
          <StyledSpan
            color={isDir ? colors.blue.hex : colors.green.hex}
            cursor="pointer"
            onClick={() => handleInput(cmd)}
          >
            {child.name}
            {isDir ? "/" : ""}
          </StyledSpan>
        </TerminalOutput>
      );
    });
  };

  // The welcome banner + an initial `ls` of home. Shown after the boot
  // sequence (or immediately when reduced motion is preferred).
  const buildWelcomeBlock = () => [
    <TerminalOutput key={nextKey()}>
      <StyledSpan color={colors.purple.hex}>Welcome to mattkearns.dev</StyledSpan> — type{" "}
      <BoldItalicSpan>help</BoldItalicSpan> to get started.
    </TerminalOutput>,
    <TerminalOutput key={nextKey()}></TerminalOutput>,
    <TerminalOutput key={nextKey()}>
      <StyledSpan color={colors.green.hex}>user@MattKearns</StyledSpan>{" "}
      <StyledSpan color={colors.yellow.hex}>~</StyledSpan>
    </TerminalOutput>,
    <TerminalInput key={nextKey()}>ls</TerminalInput>,
    ...listingLines([], ROOT),
    <TerminalOutput key={nextKey()}></TerminalOutput>,
  ];

  // Scrollback starts empty; the boot effect fills it in on mount.
  const [terminalLineData, setTerminalLineData] = useState([]);

  // Boot sequence — type out a short fake boot log, then the welcome block.
  // Skipped (jumps straight to welcome) when the user prefers reduced motion.
  // No guard ref is needed: under StrictMode's mount→unmount→remount the
  // cleanup clears the first (unfired) timer batch before it runs, so the
  // remount schedules a single clean run. The reduced-motion branch replaces
  // (not appends) the scrollback, so it's idempotent too.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTerminalLineData(buildWelcomeBlock());
      return;
    }

    const bootLines = [
      "mattkearns.dev BIOS v4.8 — POST … OK",
      "Detecting hardware … coffee machine [FOUND]",
      "Mounting /home/matt … OK",
      "Starting mattsh … OK",
      "",
    ];
    const timers = [];
    bootLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setTerminalLineData((prev) => [
            ...prev,
            <TerminalOutput key={nextKey()}>
              <Pre style={{ color: colors.grey.hex }}>{line}</Pre>
            </TerminalOutput>,
          ]);
        }, i * 140)
      );
    });
    timers.push(
      setTimeout(() => {
        setTerminalLineData((prev) => [...prev, ...buildWelcomeBlock()]);
      }, bootLines.length * 140 + 120)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- autocomplete (path-aware) -----------------------------------------
  const buildSuggestionList = (inputValueRaw) => {
    const raw = inputValueRaw || "";
    const trimmedStart = raw.replace(/^\s+/, "");
    if (!trimmedStart) return [];

    const firstSpaceIdx = trimmedStart.indexOf(" ");
    const hasArgs = firstSpaceIdx !== -1;

    // still typing the command name
    if (!hasArgs) {
      const cmdNorm = normalize(trimmedStart);
      const dirEntries = Object.values(nodeAt(cwdRef.current)?.children || {}).map(
        (c) => c.name
      );
      return Array.from(new Set([...commandNames, ...dirEntries]))
        .filter((name) => name.startsWith(cmdNorm) && name !== cmdNorm)
        .slice(0, 6);
    }

    const cmd = normalize(trimmedStart.slice(0, firstSpaceIdx));
    const argRaw = trimmedStart.slice(firstSpaceIdx + 1).replace(/^\s+/, "");

    // path-completing commands
    if (["cd", "ls", "cat", "tree"].includes(cmd)) {
      const lastSlash = argRaw.lastIndexOf("/");
      const dirPart = lastSlash === -1 ? "" : argRaw.slice(0, lastSlash + 1);
      const base = (lastSlash === -1 ? argRaw : argRaw.slice(lastSlash + 1)).toLowerCase();
      const dirNode = nodeAt(resolvePath(cwdRef.current, dirPart || "."));
      if (!dirNode || dirNode.type !== "dir") return [];
      let entries = Object.values(dirNode.children);
      if (cmd === "cd") entries = entries.filter((e) => e.type === "dir");
      return entries
        .filter((e) => e.name.startsWith(base) && e.name !== base)
        .slice(0, 6)
        .map((e) => `${cmd} ${dirPart}${e.name}${e.type === "dir" ? "/" : ""}`);
    }

    // project-completing commands
    if (["open", "source"].includes(cmd)) {
      const projNode = nodeAt(["projects"]);
      const base = argRaw.toLowerCase();
      return Object.values(projNode.children)
        .filter((e) => e.name.startsWith(base) && e.name !== base)
        .slice(0, 6)
        .map((e) => `${cmd} ${e.name}`);
    }

    if (cmd === "man") {
      const base = argRaw.toLowerCase();
      return commandNames
        .filter((n) => n.startsWith(base) && n !== base)
        .slice(0, 6)
        .map((n) => `man ${n}`);
    }

    if (cmd === "theme") {
      const base = argRaw.toLowerCase();
      return THEMES.filter((t) => t.startsWith(base) && t !== base)
        .slice(0, 6)
        .map((t) => `theme ${t}`);
    }

    if (cmd === "roll" || cmd === "random") {
      const base = argRaw.toLowerCase();
      return ["games", "books", "movies", "shows", "projects"]
        .filter((c) => c.startsWith(base) && c !== base)
        .slice(0, 6)
        .map((c) => `${cmd} ${c}`);
    }

    return [];
  };

  useEffect(() => {
    const inputEl = document.querySelector(".terminal-hidden-input");
    if (!inputEl) return;
    const handleInputChange = (event) => setCurrentInput(event.target.value);
    inputEl.addEventListener("input", handleInputChange);
    return () => inputEl.removeEventListener("input", handleInputChange);
  }, []);

  useEffect(() => {
    setSuggestions(buildSuggestionList(currentInput));
  }, [currentInput, cwd]);

  useEffect(() => {
    if (inputValue !== currentInput) setCurrentInput(inputValue);
  }, [inputValue]);

  // Tab → accept top suggestion
  useEffect(() => {
    const handleTabKey = (event) => {
      if (event.key !== "Tab") return;
      const nextValue = suggestionsRef.current?.[0];
      if (!nextValue || !currentInputRef.current) return;
      event.preventDefault();
      setInputValue(nextValue);
      setCurrentInput(nextValue);
    };
    window.addEventListener("keydown", handleTabKey);
    return () => window.removeEventListener("keydown", handleTabKey);
  }, []);

  // --- ghost (inline autocomplete preview) --------------------------------
  const measureTextWidth = (text, referenceEl) => {
    if (!referenceEl) return 0;
    const span = document.createElement("span");
    const stylesComputed = window.getComputedStyle(referenceEl);
    span.style.visibility = "hidden";
    span.style.whiteSpace = "pre";
    span.style.fontSize = stylesComputed.fontSize;
    span.style.fontFamily = stylesComputed.fontFamily;
    span.innerText = text || "";
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return width;
  };

  useEffect(() => {
    const activeLine = document.querySelector(".react-terminal-active-input");
    if (!activeLine) return;

    let ghostEl = activeLine.querySelector(".terminal-ghost");
    if (!ghostEl) {
      ghostEl = document.createElement("span");
      ghostEl.className = "terminal-ghost";
      activeLine.appendChild(ghostEl);
    }

    const clearGhost = () => {
      ghostEl.textContent = "";
      activeLine.style.removeProperty("--ghost-left");
    };

    const hiddenInput = document.querySelector(".terminal-hidden-input");
    if (
      hiddenInput &&
      hiddenInput.selectionStart !== null &&
      hiddenInput.selectionStart !== hiddenInput.value.length
    ) {
      clearGhost();
      return;
    }

    const suggestion = suggestions[0] || "";
    const input = currentInput || "";
    if (!suggestion || !input || !suggestion.toLowerCase().startsWith(input.toLowerCase())) {
      clearGhost();
      return;
    }

    const remainder = suggestion.slice(input.length);
    if (!remainder) {
      clearGhost();
      return;
    }

    const promptText = activeLine.getAttribute("data-terminal-prompt") || "$";
    const promptWidth = measureTextWidth(promptText, activeLine);
    const inputWidth = measureTextWidth(input, activeLine);
    const fontSize = parseFloat(window.getComputedStyle(activeLine).fontSize || "16");
    const promptGap = fontSize * 0.75;
    const cursorEl = activeLine.querySelector(".cursor");
    const cursorWidth = cursorEl?.getBoundingClientRect().width || Math.max(6, fontSize * 0.55);
    activeLine.style.setProperty("--ghost-left", `${promptWidth + promptGap + inputWidth + cursorWidth}px`);
    ghostEl.textContent = remainder;
  }, [currentInput, suggestions]);

  // ------------------------------------------------------------------------
  // command execution
  // ------------------------------------------------------------------------
  function handleInput(terminalInput) {
    const rawInput = (terminalInput || "").trim();
    const baseCwd = cwdRef.current;

    setTerminalLineData((prev) => {
      const ld = [...prev];
      const out = (content, color) =>
        ld.push(
          <TerminalOutput key={nextKey()}>
            {color ? <StyledSpan color={color}>{content}</StyledSpan> : content}
          </TerminalOutput>
        );
      const blank = () => ld.push(<TerminalOutput key={nextKey()}></TerminalOutput>);
      const errorLine = (content) =>
        ld.push(
          <TerminalOutput key={nextKey()}>
            <Pre style={{ color: colors.red.hex }}>{content}</Pre>
          </TerminalOutput>
        );

      // echo the entered command with its prompt
      ld.push(<TerminalInput key={nextKey()}>{terminalInput}</TerminalInput>);

      if (!rawInput) return ld;

      const tokens = rawInput.split(/\s+/);
      let cmd = normalize(tokens[0]);
      let argTokens = tokens.slice(1);

      // bare path (starts with ./ ../ ~/ or /) is treated as cd
      if (/^(\.\.?\/|~\/|\/)/.test(tokens[0]) || tokens[0] === ".." || tokens[0] === "~") {
        cmd = "cd";
        argTokens = tokens;
      }

      const argStr = argTokens.join(" ");

      switch (cmd) {
        case "help":
        case "commands": {
          out("Available commands:", colors.purple.hex);
          COMMANDS.forEach((c) => {
            ld.push(
              <TerminalOutput key={nextKey()}>
                <BoldItalicSpan>{c.usage.padEnd(18)}</BoldItalicSpan>
                <StyledSpan color={colors.green.hex}>{c.desc}</StyledSpan>
              </TerminalOutput>
            );
          });
          blank();
          out("Tip: click any highlighted entry, or press Tab to autocomplete.", colors.grey.hex);
          out("psst… a few commands aren't on this list. Poke around. 🥚", colors.grey.hex);
          break;
        }

        case "man": {
          const target = normalize(argStr);
          if (!target) {
            errorLine("Usage: man <command>");
            break;
          }
          const c = COMMANDS.find((x) => x.name === target);
          if (!c) {
            errorLine(`No manual entry for ${target}`);
            break;
          }
          out(c.usage, colors.yellow.hex);
          out(c.desc, colors.green.hex);
          break;
        }

        case "ls": {
          const pathArgs = argTokens.filter((t) => !t.startsWith("-"));
          const flags = argTokens.filter((t) => t.startsWith("-")).join("");
          const longFmt = flags.includes("l");
          const targetSegs = resolvePath(baseCwd, pathArgs[0] || ".");
          const node = nodeAt(targetSegs);
          if (!node) {
            errorLine(`ls: cannot access '${pathArgs[0]}': No such file or directory`);
            break;
          }
          if (node.type === "file") {
            out(node.name, colors.green.hex);
            break;
          }
          if (longFmt) {
            const entries = Object.values(node.children);
            if (!entries.length) out("(empty)", colors.grey.hex);
            entries.forEach((child) => {
              const isDir = child.type === "dir";
              const abs = segsToPath([...targetSegs, child.name]);
              ld.push(
                <TerminalOutput key={nextKey()}>
                  <StyledSpan color={colors.grey.hex}>
                    {isDir ? "drwxr-xr-x  " : "-rw-r--r--  "}
                  </StyledSpan>
                  <StyledSpan
                    color={isDir ? colors.blue.hex : colors.green.hex}
                    cursor="pointer"
                    onClick={() => handleInput(isDir ? `cd ${abs}` : `cat ${abs}`)}
                  >
                    {child.name}
                    {isDir ? "/" : ""}
                  </StyledSpan>
                </TerminalOutput>
              );
            });
          } else if (isPosterDir(node)) {
            ld.push(
              <TerminalOutput key={nextKey()}>
                <StyledSpan color={colors.grey.hex}>
                  {Object.values(node.children).length} items — click a cover, or{" "}
                  <BoldItalicSpan>cat &lt;name&gt;</BoldItalicSpan> for one
                </StyledSpan>
              </TerminalOutput>
            );
            ld.push(
              <TerminalOutput key={nextKey()}>
                {posterGrid(targetSegs, node, handleInput)}
              </TerminalOutput>
            );
          } else {
            listingLines(targetSegs, node).forEach((line) => ld.push(line));
          }
          blank();
          break;
        }

        case "cd": {
          const targetSegs = resolvePath(baseCwd, argStr || "~");
          const node = nodeAt(targetSegs);
          if (!node) {
            errorLine(`cd: no such file or directory: ${argStr}`);
            break;
          }
          if (node.type !== "dir") {
            errorLine(`cd: not a directory: ${argStr}`);
            break;
          }
          setCwd(targetSegs);
          ld.push(
            <TerminalOutput key={nextKey()}>
              <StyledSpan color={colors.green.hex}>user@MattKearns</StyledSpan>{" "}
              <StyledSpan color={colors.yellow.hex}>{segsToLabel(targetSegs)}</StyledSpan>
            </TerminalOutput>
          );
          blank();
          break;
        }

        case "pwd": {
          out(segsToPath(baseCwd), colors.yellow.hex);
          break;
        }

        case "cat": {
          if (!argStr) {
            errorLine("Usage: cat <file>");
            break;
          }
          // resolve relative to cwd, then fall back to projects/<arg>
          let node = nodeAt(resolvePath(baseCwd, argStr));
          if (!node) node = nodeAt(resolvePath([], `projects/${argStr}`));
          if (!node) {
            errorLine(`cat: ${argStr}: No such file or directory`);
            break;
          }
          if (node.type === "dir") {
            errorLine(`cat: ${argStr}: Is a directory`);
            break;
          }
          if (node.kind === "project") {
            ld.push(<TerminalOutput key={nextKey()}>{ProjectResponse(node.data)}</TerminalOutput>);
          } else if (node.kind === "poster") {
            ld.push(<TerminalOutput key={nextKey()}>{PosterCard(node)}</TerminalOutput>);
          } else if (node.kind === "text") {
            ld.push(
              <TerminalOutput key={nextKey()}>
                <Pre style={{ color: colors.green.hex }}>{node.content}</Pre>
              </TerminalOutput>
            );
          } else if (node.kind === "contact") {
            ld.push(
              <TerminalOutput key={nextKey()}>
                <StyledSpan color={colors.green.hex}>
                  <BoldItalicSpan>Email:    </BoldItalicSpan>
                  <StyledLink href="mailto:matt.kearns39@gmail.com">
                    matt.kearns39@gmail.com
                  </StyledLink>
                  <br />
                  <BoldItalicSpan>GitHub:   </BoldItalicSpan>
                  <StyledLink href="https://github.com/clocktower39" target="_blank" rel="noreferrer">
                    github.com/clocktower39
                  </StyledLink>
                  <br />
                  <BoldItalicSpan>LinkedIn: </BoldItalicSpan>
                  <StyledLink
                    href="https://www.linkedin.com/in/matthew-kearns-6b8865117/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/matthew-kearns
                  </StyledLink>
                  <br />
                  <BoldItalicSpan>Instagram:</BoldItalicSpan>{" "}
                  <StyledLink href="https://www.instagram.com/kearns39/" target="_blank" rel="noreferrer">
                    instagram.com/kearns39
                  </StyledLink>
                </StyledSpan>
              </TerminalOutput>
            );
          } else if (node.kind === "route") {
            ld.push(
              <TerminalOutput key={nextKey()}>
                <StyledSpan color={colors.green.hex}>
                  My web resume lives at{" "}
                  <StyledLink href={node.route}>{node.route}</StyledLink>. Run{" "}
                  <BoldItalicSpan>open resume</BoldItalicSpan> to go there.
                </StyledSpan>
              </TerminalOutput>
            );
          }
          blank();
          break;
        }

        case "tree": {
          const targetSegs = resolvePath(baseCwd, argStr || ".");
          const node = nodeAt(targetSegs);
          if (!node) {
            errorLine(`tree: ${argStr}: No such file or directory`);
            break;
          }
          const lines = [segsToLabel(targetSegs)];
          const walk = (n, prefix) => {
            if (n.type !== "dir") return;
            const kids = Object.values(n.children);
            kids.forEach((child, i) => {
              const last = i === kids.length - 1;
              lines.push(
                `${prefix}${last ? "└── " : "├── "}${child.name}${child.type === "dir" ? "/" : ""}`
              );
              if (child.type === "dir") walk(child, `${prefix}${last ? "    " : "│   "}`);
            });
          };
          walk(node, "");
          ld.push(
            <TerminalOutput key={nextKey()}>
              <Pre style={{ color: colors.green.hex }}>{lines.join("\n")}</Pre>
            </TerminalOutput>
          );
          blank();
          break;
        }

        case "open": {
          if (!argStr) {
            errorLine("Usage: open <project>");
            break;
          }
          let node = nodeAt(resolvePath(baseCwd, argStr));
          if (!node) node = nodeAt(resolvePath([], `projects/${argStr}`));
          if (!node || node.type === "dir") {
            errorLine(`open: ${argStr}: not an openable file`);
            break;
          }
          if (node.kind === "route") {
            window.location.assign(node.route);
            out(`Opening ${node.route} ...`, colors.green.hex);
            break;
          }
          if (node.kind === "project") {
            if (node.data.link) {
              window.open(node.data.link, "_blank", "noopener,noreferrer");
              out(`Opening ${node.display} ...`, colors.green.hex);
            } else {
              errorLine(`open: ${node.display} has no live link.`);
            }
            break;
          }
          errorLine(`open: ${argStr}: nothing to open`);
          break;
        }

        case "source": {
          if (!argStr) {
            errorLine("Usage: source <project>");
            break;
          }
          let node = nodeAt(resolvePath(baseCwd, argStr));
          if (!node) node = nodeAt(resolvePath([], `projects/${argStr}`));
          if (!node || node.kind !== "project") {
            errorLine(`source: ${argStr}: not a project`);
            break;
          }
          const p = node.data;
          ld.push(
            <TerminalOutput key={nextKey()}>
              <StyledSpan color={colors.green.hex}>
                <BoldItalicSpan>Client Source:</BoldItalicSpan>{" "}
                {p.github.client ? (
                  <StyledLink href={p.github.client} target="_blank" rel="noreferrer">
                    {p.github.client}
                  </StyledLink>
                ) : (
                  <span style={{ color: colors.grey.hex }}>null</span>
                )}
                <br />
                <BoldItalicSpan>Server Source:</BoldItalicSpan>{" "}
                {p.github.server ? (
                  <StyledLink href={p.github.server} target="_blank" rel="noreferrer">
                    {p.github.server}
                  </StyledLink>
                ) : (
                  <span style={{ color: colors.grey.hex }}>null</span>
                )}
              </StyledSpan>
            </TerminalOutput>
          );
          blank();
          break;
        }

        case "whoami": {
          out("matt", colors.green.hex);
          break;
        }

        case "echo": {
          out(argStr, colors.green.hex);
          break;
        }

        case "date": {
          out(new Date().toString(), colors.green.hex);
          break;
        }

        case "history": {
          const hist = [...historyRef.current, rawInput];
          hist.forEach((h, i) => {
            ld.push(
              <TerminalOutput key={nextKey()}>
                <StyledSpan color={colors.grey.hex}>{String(i + 1).padStart(4)} </StyledSpan>
                <StyledSpan color={colors.green.hex}>{h}</StyledSpan>
              </TerminalOutput>
            );
          });
          break;
        }

        case "neofetch": {
          const secs = Math.max(0, Math.round((Date.now() - loadTimeRef.current) / 1000));
          const uptime = secs < 60 ? `${secs}s` : `${Math.floor(secs / 60)}m ${secs % 60}s`;
          ld.push(
            <TerminalOutput key={nextKey()}>
              {renderNeofetch({ themeName, uptime, cmdCount: historyRef.current.length + 1 })}
            </TerminalOutput>
          );
          blank();
          break;
        }

        case "roll":
        case "random": {
          const want = normalize(argStr);
          const cats =
            want && ["games", "books", "movies", "shows", "projects"].includes(want)
              ? [want]
              : ["games", "books", "movies", "shows"];
          const pool = [];
          cats.forEach((c) => {
            const dn = nodeAt([c]);
            if (dn) Object.values(dn.children).forEach((child) => pool.push(child));
          });
          if (!pool.length) {
            errorLine(`roll: nothing to pick from`);
            break;
          }
          const pick = pool[Math.floor(Math.random() * pool.length)];
          out(`🎲 You rolled: ${pick.display}`, colors.purple.hex);
          ld.push(
            <TerminalOutput key={nextKey()}>
              {pick.kind === "project" ? ProjectResponse(pick.data) : PosterCard(pick)}
            </TerminalOutput>
          );
          blank();
          break;
        }

        case "theme": {
          const want = normalize(argStr);
          if (!want) {
            out(`Available themes: ${THEMES.join(", ")}`, colors.green.hex);
            out(`Current: ${themeName}. Usage: theme <name>`, colors.grey.hex);
            break;
          }
          if (!THEMES.includes(want)) {
            errorLine(`theme: unknown theme '${want}'. Try: ${THEMES.join(", ")}`);
            break;
          }
          setThemeName(want);
          out(`Theme set to ${want}.`, colors.green.hex);
          break;
        }

        case "matrix": {
          if (reducedMotion) {
            out("matrix: animation skipped (reduced motion is on).", colors.grey.hex);
            break;
          }
          out("Wake up, Neo… press any key (or click) to exit.", colors.green.hex);
          setMatrixCfg({ glyphs: MATRIX_CHARS, fontSize: 16 });
          break;
        }

        case "pineapple":
        case "pineapples": {
          if (reducedMotion) {
            out("pineapple: animation skipped (reduced motion is on).", colors.grey.hex);
            break;
          }
          out("🍍 Raining pineapples… press any key (or click) to exit.", colors.yellow.hex);
          setMatrixCfg({ glyphs: PINEAPPLE_CHARS, fontSize: 28 });
          break;
        }

        // ---- easter eggs (intentionally not in `help`) ----
        case "sudo": {
          errorLine("matt is not in the sudoers file. This incident will be reported.");
          break;
        }

        case "rm": {
          const joined = argTokens.join(" ");
          if (/-\w*[rf]\w*/.test(joined) && /(~|\/|\*)/.test(joined)) {
            out("Deleting everything …", colors.red.hex);
            out("rm: just kidding. Nice try though. 😏", colors.green.hex);
          } else {
            errorLine("rm: this is a read-only portfolio — nothing to remove.");
          }
          break;
        }

        case "fortune": {
          out(facts[Math.floor(Math.random() * facts.length)], colors.green.hex);
          break;
        }

        case "cowsay": {
          const text = argStr || facts[Math.floor(Math.random() * facts.length)];
          ld.push(
            <TerminalOutput key={nextKey()}>
              <Pre style={{ color: colors.green.hex }}>{cowsay(text)}</Pre>
            </TerminalOutput>
          );
          break;
        }

        case "hire":
        case "hireme": {
          out("Matt Kearns — full-stack dev who ships and sticks the landing.", colors.purple.hex);
          out("Available for interesting problems. Let's talk:", colors.green.hex);
          ld.push(
            <TerminalOutput key={nextKey()}>
              <StyledSpan color={colors.green.hex}>
                <StyledLink href="mailto:matt.kearns39@gmail.com">
                  matt.kearns39@gmail.com
                </StyledLink>
                {" · "}
                <StyledLink href="https://github.com/clocktower39" target="_blank" rel="noreferrer">
                  GitHub
                </StyledLink>
                {" · "}
                <StyledLink
                  href="https://www.linkedin.com/in/matthew-kearns-6b8865117/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </StyledLink>
              </StyledSpan>
            </TerminalOutput>
          );
          blank();
          break;
        }

        case "exit":
        case "logout": {
          out("There is no escape… but fine. 👋 (click the yellow dot to reopen)", colors.grey.hex);
          setTerminalHeight("0px");
          break;
        }

        case "make": {
          if (normalize(argStr) === "coffee") {
            out("☕  Brewing… done. (HTTP 418: I'm a teapot, but I tried.)", colors.green.hex);
          } else {
            errorLine(`make: *** No rule to make target '${argStr || ""}'.  Try 'make coffee'.`);
          }
          break;
        }

        case "sl": {
          out("🚂💨  woo woo! (you meant 'ls', didn't you?)", colors.yellow.hex);
          break;
        }

        case "clear": {
          return [];
        }

        default: {
          errorLine(`command not found: ${cmd}`);
          out("Type 'help' for a list of available commands.", colors.grey.hex);
          break;
        }
      }

      return ld;
    });

    if (rawInput) setHistory((prev) => [...prev, rawInput]);
    setHistoryIndex(null);
    setInputValue("");
    setCurrentInput("");
    setSuggestions([]);
  }

  // history navigation (up/down)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        if (!history.length) return;
        e.preventDefault();
        const newIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      } else if (e.key === "ArrowDown") {
        if (!history.length || historyIndex === null) return;
        e.preventDefault();
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(null);
          setInputValue("");
        } else {
          setHistoryIndex(newIndex);
          setInputValue(history[newIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [history, historyIndex]);

  const pathLabel = segsToLabel(cwd);

  const [terminalHeight, setTerminalHeight] = useState("600px");
  const onRedButtonClick = () => setTerminalHeight("0px");
  const onYellowButtonClick = () => setTerminalHeight("600px");
  const onGreenButtonClick = () => setTerminalHeight("100vh");

  return (
    <div className="w-full" data-term-theme={themeName}>
      <Terminal
        name={`MattKearns: ${pathLabel}`}
        onInput={handleInput}
        startingInputValue={inputValue}
        prompt={`[user@MattKearns ${pathLabel}]$ `}
        height={terminalHeight}
        style={{ minHeight: "600px" }}
        redBtnCallback={onRedButtonClick}
        yellowBtnCallback={onYellowButtonClick}
        greenBtnCallback={onGreenButtonClick}
      >
        {terminalLineData}
      </Terminal>
      {matrixCfg && (
        <MatrixRain
          onDone={setMatrixCfg}
          glyphs={matrixCfg.glyphs}
          fontSize={matrixCfg.fontSize}
        />
      )}
    </div>
  );
}
