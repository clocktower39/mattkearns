import React, { useMemo, useState, useEffect, useRef } from "react";
import Terminal, { TerminalOutput, TerminalInput } from "react-terminal-ui";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import { projects, games, books, movies, tvShows } from "../states";

const colors = {
  green: { hex: "#01A252" },
  red: { hex: "#DB2D20" },
  yellow: { hex: "#FDED02" },
  blue: { hex: "#01A0E4" },
  purple: { hex: "#A16A94" },
};

const StyledSpan = styled("span")`
  color: ${(props) => props.color || "inherit"};
  cursor: ${(props) => (props.cursor ? "pointer" : "inherit")};
  word-wrap: ${(props) => props.word || "break-word"};
`;

const BoldItalicSpan = styled("span")`
  color: ${(props) => props.color || colors.yellow.hex};
  font-weight: ${(props) => props.fontWeight || "500"};
  font-style: ${(props) => props.fontStyle || "italic"};
`;

const StyledLink = styled("a")`
  text-decoration: ${(props) => props.textDecoration || "none"};
  color: ${(props) => props.color || "inherit"};
`;

const normalize = (s = "") => s.toLowerCase().trim();
const COMMANDS = ["help", "man", "commands", "ls", "cd", "clear", "open", "source", "projects"];
const DIRECTORIES = ["Projects", "games", "books", "movies", "shows"];

const ProjectResponse = (p, lnIndex) => (
  <TerminalOutput key={`${p.name}-${lnIndex}`}>
    <StyledSpan color={colors.green.hex}>
      <BoldItalicSpan>-Project:</BoldItalicSpan> {p.name}
      <br />
      <BoldItalicSpan>-Link:</BoldItalicSpan>{" "}
      <StyledLink href={p.link} target="_blank" rel="noreferrer">
        {p.link || "null"}
      </StyledLink>
      <br />
      <BoldItalicSpan>-Client Source Code:</BoldItalicSpan>{" "}
      <StyledLink href={p.github.client} target="_blank" rel="noreferrer">
        {p.github.client || "null"}
      </StyledLink>
      <br />
      <BoldItalicSpan>-Server Source Code:</BoldItalicSpan>{" "}
      <StyledLink href={p.github.server} target="_blank" rel="noreferrer">
        {p.github.server || "null"}
      </StyledLink>
      <br />
      <span style={{ whiteSpace: "pre-wrap" }}>
        <BoldItalicSpan>-Description:</BoldItalicSpan> {p.desc}
      </span>
    </StyledSpan>
    <div>{p.img && <img src={p.img} style={{ maxWidth: "500px" }} />}</div>
  </TerminalOutput>
);

const GameResponse = (g, lnIndex) => (
  <TerminalOutput key={`${g.title}-${lnIndex}`}>
    <StyledSpan color={colors.green.hex}>
      <BoldItalicSpan>-Game:</BoldItalicSpan> {g.title}
    </StyledSpan>
    <div>{g.poster && <img src={g.poster} style={{ maxWidth: "500px" }} />}</div>
  </TerminalOutput>
);

const BookResponse = (b, lnIndex) => (
  <TerminalOutput key={`${b.title}-${lnIndex}`}>
    <StyledSpan color={colors.green.hex}>
      <BoldItalicSpan>-Book:</BoldItalicSpan> {b.title}
    </StyledSpan>
    <div>{b.poster && <img src={b.poster} style={{ maxWidth: "500px" }} />}</div>
  </TerminalOutput>
);

const MovieResponse = (m, lnIndex) => (
  <TerminalOutput key={`${m.title}-${lnIndex}`}>
    <StyledSpan color={colors.green.hex}>
      <BoldItalicSpan>-Movie:</BoldItalicSpan> {m.title}
    </StyledSpan>
    <div>{m.poster && <img src={m.poster} style={{ maxWidth: "500px" }} />}</div>
  </TerminalOutput>
);

const ShowResponse = (s, lnIndex) => (
  <TerminalOutput key={`${s.title}-${lnIndex}`}>
    <StyledSpan color={colors.green.hex}>
      <BoldItalicSpan>-Show:</BoldItalicSpan> {s.title}
    </StyledSpan>
    <div>{s.poster && <img src={s.poster} style={{ maxWidth: "500px" }} />}</div>
  </TerminalOutput>
);

// Initial header + first ls
const buildInitialLines = (pathLabel) => [
  <TerminalOutput key="prompt-line">
    <StyledSpan color={colors.green.hex}>user@MattKearns</StyledSpan>{" "}
    <StyledSpan color={colors.yellow.hex}>{pathLabel}</StyledSpan>
  </TerminalOutput>,
  <TerminalOutput key="blank-1"></TerminalOutput>,
  <TerminalOutput key="ls-line">$ ls</TerminalOutput>,
  <TerminalOutput key="blank-2"></TerminalOutput>,
];

export default function TerminalController() {
  // quick lookup maps
  const projectNameMap = useMemo(() => {
    const map = new Map();
    projects.forEach((p, i) => {
      map.set(normalize(p.name), i);
    });
    return map;
  }, [projects]);

  const gameNameMap = useMemo(() => {
    const map = new Map();
    games.forEach((g, i) => {
      map.set(normalize(g.title), i);
    });
    return map;
  }, [games]);

  const bookNameMap = useMemo(() => {
    const map = new Map();
    books.forEach((b, i) => {
      map.set(normalize(b.title), i);
    });
    return map;
  }, [books]);

  const movieNameMap = useMemo(() => {
    const map = new Map();
    movies.forEach((m, i) => {
      map.set(normalize(m.title), i);
    });
    return map;
  }, [movies]);

  const showNameMap = useMemo(() => {
    const map = new Map();
    tvShows.forEach((s, i) => {
      map.set(normalize(s.title), i);
    });
    return map;
  }, [tvShows]);

  // directory structure:
  // "~" (home)
  //   ├─ Projects
  //   ├─ games
  //   ├─ books
  //   ├─ movies
  //   └─ shows
  const [currentDir, setCurrentDir] = useState("~");

  const [terminalLineData, setTerminalLineData] = useState(() => [
    ...buildInitialLines("~"),
    ...DIRECTORIES.map((dirName) => (
      <TerminalOutput key={`dir-init-${dirName}`}>
        <StyledSpan
          color={colors.blue.hex}
          cursor="pointer"
          onClick={() => handleInput(`cd ./${dirName}`)}
        >
          {dirName}
        </StyledSpan>
      </TerminalOutput>
    )),
    <TerminalOutput key="blank-end"></TerminalOutput>,
  ]);

  // command history / navigation
  const [history, setHistory] = useState(["ls"]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const currentInputRef = useRef("");
  const suggestionsRef = useRef([]);

  useEffect(() => {
    currentInputRef.current = currentInput;
  }, [currentInput]);

  useEffect(() => {
    suggestionsRef.current = suggestions;
  }, [suggestions]);

  const runProjectDetails = (ld, projectNameRaw) => {
    const key = normalize(projectNameRaw);
    const idx = projectNameMap.get(key);
    if (idx === undefined) {
      ld.push(
        <TerminalOutput key={`unknown-project-${projectNameRaw}`}>
          <span style={{ color: colors.red.hex, whiteSpace: "pre-wrap" }}>
            Unknown project: <strong>{projectNameRaw}</strong>
          </span>
        </TerminalOutput>
      );
      return;
    }

    const project = projects[idx];
    ld.push(ProjectResponse(project, ld.length));
    ld.push(<TerminalOutput key={`after-project-${project.name}`}></TerminalOutput>);
  };

  const runGameDetails = (ld, gameTitleRaw) => {
    const key = normalize(gameTitleRaw);
    const idx = gameNameMap.get(key);
    if (idx === undefined) {
      ld.push(
        <TerminalOutput key={`unknown-game-${gameTitleRaw}`}>
          <span style={{ color: colors.red.hex, whiteSpace: "pre-wrap" }}>
            Unknown game: <strong>{gameTitleRaw}</strong>
          </span>
        </TerminalOutput>
      );
      return;
    }

    const game = games[idx];
    ld.push(GameResponse(game, ld.length));
    ld.push(<TerminalOutput key={`after-game-${game.title}`}></TerminalOutput>);
  };

  const runBookDetails = (ld, bookTitleRaw) => {
    const key = normalize(bookTitleRaw);
    const idx = bookNameMap.get(key);
    if (idx === undefined) {
      ld.push(
        <TerminalOutput key={`unknown-book-${bookTitleRaw}`}>
          <span style={{ color: colors.red.hex, whiteSpace: "pre-wrap" }}>
            Unknown book: <strong>{bookTitleRaw}</strong>
          </span>
        </TerminalOutput>
      );
      return;
    }

    const book = books[idx];
    ld.push(BookResponse(book, ld.length));
    ld.push(<TerminalOutput key={`after-book-${book.title}`}></TerminalOutput>);
  };

  const runMovieDetails = (ld, movieTitleRaw) => {
    const key = normalize(movieTitleRaw);
    const idx = movieNameMap.get(key);
    if (idx === undefined) {
      ld.push(
        <TerminalOutput key={`unknown-movie-${movieTitleRaw}`}>
          <span style={{ color: colors.red.hex, whiteSpace: "pre-wrap" }}>
            Unknown movie: <strong>{movieTitleRaw}</strong>
          </span>
        </TerminalOutput>
      );
      return;
    }

    const movie = movies[idx];
    ld.push(MovieResponse(movie, ld.length));
    ld.push(<TerminalOutput key={`after-movie-${movie.title}`}></TerminalOutput>);
  };

  const runShowDetails = (ld, showTitleRaw) => {
    const key = normalize(showTitleRaw);
    const idx = showNameMap.get(key);
    if (idx === undefined) {
      ld.push(
        <TerminalOutput key={`unknown-show-${showTitleRaw}`}>
          <span style={{ color: colors.red.hex, whiteSpace: "pre-wrap" }}>
            Unknown show: <strong>{showTitleRaw}</strong>
          </span>
        </TerminalOutput>
      );
      return;
    }

    const show = tvShows[idx];
    ld.push(ShowResponse(show, ld.length));
    ld.push(<TerminalOutput key={`after-show-${show.title}`}></TerminalOutput>);
  };

  const getItemsForDir = (dirName) => {
    if (dirName === "Projects") return projects.map((p) => p.name);
    if (dirName === "games") return games.map((g) => g.title);
    if (dirName === "books") return books.map((b) => b.title);
    if (dirName === "movies") return movies.map((m) => m.title);
    if (dirName === "shows") return tvShows.map((s) => s.title);
    return [];
  };

  const buildSuggestionList = (inputValueRaw) => {
    const raw = inputValueRaw || "";
    const trimmedStart = raw.replace(/^\s+/, "");
    if (!trimmedStart) return [];

    const firstSpaceIdx = trimmedStart.indexOf(" ");
    const hasArgs = firstSpaceIdx !== -1;
    const cmdPart = hasArgs ? trimmedStart.slice(0, firstSpaceIdx) : trimmedStart;
    const cmdNorm = normalize(cmdPart);
    const argPartRaw = hasArgs ? trimmedStart.slice(firstSpaceIdx + 1) : "";
    const argPrefix = normalize(argPartRaw);

    const filterByPrefix = (list, prefix) =>
      list.filter((item) => normalize(item).startsWith(prefix));

    if (!hasArgs) {
      const candidates = [...COMMANDS];
      if (currentDir === "~") {
        candidates.push(...DIRECTORIES);
      } else {
        candidates.push(...getItemsForDir(currentDir));
      }
      const matches = filterByPrefix(candidates, cmdNorm)
        .filter((item) => normalize(item) !== cmdNorm)
        .slice(0, 5);
      return Array.from(new Set(matches));
    }

    if (cmdNorm === "cd") {
      const cdTargets = ["..", "~", ...DIRECTORIES];
      return filterByPrefix(cdTargets, argPrefix)
        .map((match) => `cd ${match}`)
        .filter((item) => normalize(item) !== normalize(trimmedStart))
        .slice(0, 5);
    }

    if (cmdNorm === "open" || cmdNorm === "source") {
      return filterByPrefix(
        projects.map((p) => p.name),
        argPrefix
      )
        .map((match) => `${cmdNorm} ${match}`)
        .filter((item) => normalize(item) !== normalize(trimmedStart))
        .slice(0, 5);
    }

    return [];
  };

  useEffect(() => {
    const inputEl = document.querySelector(".terminal-hidden-input");
    if (!inputEl) return;

    const handleInputChange = (event) => {
      setCurrentInput(event.target.value);
    };

    inputEl.addEventListener("input", handleInputChange);
    return () => inputEl.removeEventListener("input", handleInputChange);
  }, []);

  useEffect(() => {
    setSuggestions(buildSuggestionList(currentInput));
  }, [currentInput, currentDir, projects, games, books, movies, tvShows]);

  useEffect(() => {
    if (inputValue !== currentInput) {
      setCurrentInput(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    const handleTabKey = (event) => {
      if (event.key !== "Tab") return;
      const nextValue = suggestionsRef.current?.[0];
      if (!nextValue) return;
      if (!currentInputRef.current) return;
      event.preventDefault();
      setInputValue(nextValue);
      setCurrentInput(nextValue);
    };

    window.addEventListener("keydown", handleTabKey);
    return () => window.removeEventListener("keydown", handleTabKey);
  }, []);

  const measureTextWidth = (text, referenceEl) => {
    if (!referenceEl) return 0;
    const span = document.createElement("span");
    const styles = window.getComputedStyle(referenceEl);
    span.style.visibility = "hidden";
    span.style.whiteSpace = "pre";
    span.style.fontSize = styles.fontSize;
    span.style.fontFamily = styles.fontFamily;
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

    const hiddenInput = document.querySelector(".terminal-hidden-input");
    if (
      hiddenInput &&
      hiddenInput.selectionStart !== null &&
      hiddenInput.selectionStart !== hiddenInput.value.length
    ) {
      ghostEl.textContent = "";
      activeLine.style.removeProperty("--ghost-left");
      return;
    }

    const suggestion = suggestions[0] || "";
    const input = currentInput || "";
    const suggestionLower = suggestion.toLowerCase();
    const inputLower = input.toLowerCase();

    if (!suggestion || !input || !suggestionLower.startsWith(inputLower)) {
      ghostEl.textContent = "";
      activeLine.style.removeProperty("--ghost-left");
      return;
    }

    const remainder = suggestion.slice(input.length);
    if (!remainder) {
      ghostEl.textContent = "";
      activeLine.style.removeProperty("--ghost-left");
      return;
    }

    const promptText = activeLine.getAttribute("data-terminal-prompt") || "$";
    const promptWidth = measureTextWidth(promptText, activeLine);
    const inputWidth = measureTextWidth(input, activeLine);
    const fontSize = parseFloat(window.getComputedStyle(activeLine).fontSize || "16");
    const promptGap = fontSize * 0.75;
    const cursorEl = activeLine.querySelector(".cursor");
    const cursorWidth =
      cursorEl?.getBoundingClientRect().width || Math.max(6, fontSize * 0.55);
    const left = promptWidth + promptGap + inputWidth + cursorWidth;

    activeLine.style.setProperty("--ghost-left", `${left}px`);
    ghostEl.textContent = remainder;
  }, [currentInput, suggestions]);

  function handleInput(terminalInput) {
    const rawInput = terminalInput.trim();
    if (!rawInput) return;

    setTerminalLineData((prev) => {
      let ld = [...prev];

      // echo input
      ld.push(<TerminalInput key={`input-${ld.length}`}>{terminalInput}</TerminalInput>);

      let [rawCmd, ...rawArgs] = rawInput.split(/\s+/);
      let cmd = normalize(rawCmd);
      let args = rawArgs.join(" ");

      // treat bare paths like "../games" or "../" as cd
      if (cmd.startsWith("./") || cmd.startsWith("../")) {
        args = rawInput;
        cmd = "cd";
      }

      // ---- command handling ----
      if (["commands", "help", "man"].includes(cmd)) {
        ld.push(
          <TerminalOutput key="help-1">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>ls: </BoldItalicSpan>
              list items in the current directory
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(<TerminalOutput key="help-blank-1"></TerminalOutput>);
        ld.push(
          <TerminalOutput key="help-2">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>[project title]: </BoldItalicSpan>
              show project details (when in ~/Projects)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-2b">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>[game title]: </BoldItalicSpan>
              show game poster (when in ~/games)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-2c">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>[book title]: </BoldItalicSpan>
              show book cover (when in ~/books)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-2d">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>[movie title]: </BoldItalicSpan>
              show movie poster (when in ~/movies)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-2e">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>[show title]: </BoldItalicSpan>
              show TV show poster (when in ~/shows)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(<TerminalOutput key="help-blank-2"></TerminalOutput>);
        ld.push(
          <TerminalOutput key="help-3">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>cd .. or cd ../: </BoldItalicSpan>
              go to parent (~)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-3b">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>cd ../games: </BoldItalicSpan>
              go to games directory (also accepts <code>cd games</code>)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-3c">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>cd ../Projects: </BoldItalicSpan>
              go back to projects (also accepts <code>cd projects</code>)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-3d">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>cd ../books: </BoldItalicSpan>
              go to books (also accepts <code>cd books</code>)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-3e">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>cd ../movies: </BoldItalicSpan>
              go to movies (also accepts <code>cd movies</code>)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-3f">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>cd ../shows: </BoldItalicSpan>
              go to TV shows (also accepts <code>cd shows</code>)
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(<TerminalOutput key="help-blank-3"></TerminalOutput>);
        ld.push(
          <TerminalOutput key="help-4">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>open [project]: </BoldItalicSpan>
              open project link in new tab
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-5">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>source [project]: </BoldItalicSpan>
              show project source links
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(<TerminalOutput key="help-blank-4"></TerminalOutput>);
        ld.push(
          <TerminalOutput key="help-6">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>clear: </BoldItalicSpan>
              clear the screen
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(
          <TerminalOutput key="help-7">
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>tab: </BoldItalicSpan>
              autocomplete the top suggestion
            </StyledSpan>
          </TerminalOutput>
        );
        ld.push(<TerminalOutput key="help-blank-5"></TerminalOutput>);
      } else if (["ls", "projects"].includes(cmd)) {
        if (currentDir === "~") {
          // list directories
          DIRECTORIES.forEach((dirName) => {
            ld.push(
              <TerminalOutput key={`dir-${dirName}-${ld.length}`}>
                <StyledSpan
                  color={colors.blue.hex}
                  cursor="pointer"
                  onClick={() => handleInput(`cd ./${dirName}`)}
                >
                  {dirName}
                </StyledSpan>
              </TerminalOutput>
            );
          });
        } else if (currentDir === "Projects") {
          projects.forEach((p) => {
            ld.push(
              <TerminalOutput key={`project-list-${p.name}-${ld.length}`}>
                <StyledSpan
                  color={colors.green.hex}
                  cursor="pointer"
                  onClick={() => handleInput(p.name)}
                >
                  {p.name}
                </StyledSpan>
              </TerminalOutput>
            );
          });
        } else if (currentDir === "games") {
          games.forEach((g) => {
            ld.push(
              <TerminalOutput key={`game-list-${g.title}-${ld.length}`}>
                <StyledSpan
                  color={colors.green.hex}
                  cursor="pointer"
                  onClick={() => handleInput(g.title)}
                >
                  {g.title}
                </StyledSpan>
              </TerminalOutput>
            );
          });
        } else if (currentDir === "books") {
          books.forEach((b) => {
            ld.push(
              <TerminalOutput key={`book-list-${b.title}-${ld.length}`}>
                <StyledSpan
                  color={colors.green.hex}
                  cursor="pointer"
                  onClick={() => handleInput(b.title)}
                >
                  {b.title}
                </StyledSpan>
              </TerminalOutput>
            );
          });
        } else if (currentDir === "movies") {
          movies.forEach((m) => {
            ld.push(
              <TerminalOutput key={`movie-list-${m.title}-${ld.length}`}>
                <StyledSpan
                  color={colors.green.hex}
                  cursor="pointer"
                  onClick={() => handleInput(m.title)}
                >
                  {m.title}
                </StyledSpan>
              </TerminalOutput>
            );
          });
        } else if (currentDir === "shows") {
          tvShows.forEach((s) => {
            ld.push(
              <TerminalOutput key={`show-list-${s.title}-${ld.length}`}>
                <StyledSpan
                  color={colors.green.hex}
                  cursor="pointer"
                  onClick={() => handleInput(s.title)}
                >
                  {s.title}
                </StyledSpan>
              </TerminalOutput>
            );
          });
        }
        ld.push(<TerminalOutput key={`ls-blank-${ld.length}`}></TerminalOutput>);
      } else if (cmd === "cd") {
        const rawPath = args.trim();
        // no path or "~" => go home
        if (!rawPath || rawPath === "~") {
          if (currentDir !== "~") {
            setCurrentDir("~");
            ld.push(
              <TerminalOutput key={`cd-home-${ld.length}`}>
                <StyledSpan color={colors.green.hex}>user@MattKearns</StyledSpan>{" "}
                <StyledSpan color={colors.yellow.hex}>~</StyledSpan>
              </TerminalOutput>
            );
            ld.push(<TerminalOutput key={`cd-home-blank-${ld.length}`}></TerminalOutput>);
          }
        } else {
          const lowerPath = rawPath.toLowerCase().replace(/\/+$/, ""); // strip trailing slash

          let targetDir = currentDir;

          if (lowerPath === "..") {
            // go to parent
            targetDir = "~";
          } else if (
            lowerPath === "../games" ||
            lowerPath === "./games" ||
            lowerPath === "games" ||
            lowerPath === "~/games"
          ) {
            targetDir = "games";
          } else if (
            lowerPath === "../projects" ||
            lowerPath === "./projects" ||
            lowerPath === "projects" ||
            lowerPath === "~/projects"
          ) {
            targetDir = "Projects";
          } else if (
            lowerPath === "../books" ||
            lowerPath === "./books" ||
            lowerPath === "books" ||
            lowerPath === "~/books"
          ) {
            targetDir = "books";
          } else if (
            lowerPath === "../movies" ||
            lowerPath === "./movies" ||
            lowerPath === "movies" ||
            lowerPath === "~/movies"
          ) {
            targetDir = "movies";
          } else if (
            lowerPath === "../shows" ||
            lowerPath === "./shows" ||
            lowerPath === "shows" ||
            lowerPath === "~/shows"
          ) {
            targetDir = "shows";
          } else {
            ld.push(
              <TerminalOutput key={`cd-nosuch-${ld.length}`}>
                <span style={{ color: colors.red.hex }}>
                  No such directory: <strong>{rawPath}</strong>
                </span>
              </TerminalOutput>
            );
            return ld;
          }

          if (targetDir !== currentDir) {
            setCurrentDir(targetDir);
            const pathLabel =
              targetDir === "~"
                ? "~"
                : targetDir === "Projects"
                ? "~/Projects"
                : targetDir === "games"
                ? "~/games"
                : targetDir === "books"
                ? "~/books"
                : targetDir === "movies"
                ? "~/movies"
                : "~/shows";

            ld.push(
              <TerminalOutput key={`cd-${targetDir}-${ld.length}`}>
                <StyledSpan color={colors.green.hex}>user@MattKearns</StyledSpan>{" "}
                <StyledSpan color={colors.yellow.hex}>{pathLabel}</StyledSpan>
              </TerminalOutput>
            );
            ld.push(<TerminalOutput key={`cd-blank-${ld.length}`}></TerminalOutput>);
          }
        }
      } else if (cmd === "clear") {
        ld = [];
      } else if (cmd === "open") {
        const projectName = args;
        if (!projectName) {
          ld.push(
            <TerminalOutput key="open-missing">
              <span style={{ color: colors.red.hex }}>
                Usage: <strong>open [project name]</strong>
              </span>
            </TerminalOutput>
          );
        } else {
          const key = normalize(projectName);
          const idx = projectNameMap.get(key);
          if (idx === undefined) {
            ld.push(
              <TerminalOutput key={`open-unknown-${projectName}`}>
                <span style={{ color: colors.red.hex }}>
                  Unknown project: <strong>{projectName}</strong>
                </span>
              </TerminalOutput>
            );
          } else {
            const proj = projects[idx];
            if (proj.link) {
              window.open(proj.link, "_blank", "noopener,noreferrer");
              ld.push(
                <TerminalOutput key={`open-success-${proj.name}`}>
                  <span style={{ color: colors.green.hex }}>
                    Opening <strong>{proj.name}</strong>...
                  </span>
                </TerminalOutput>
              );
            } else {
              ld.push(
                <TerminalOutput key={`open-null-${proj.name}`}>
                  <span style={{ color: colors.red.hex }}>
                    Project <strong>{proj.name}</strong> has no link.
                  </span>
                </TerminalOutput>
              );
            }
          }
        }
      } else if (cmd === "source") {
        const projectName = args;
        if (!projectName) {
          ld.push(
            <TerminalOutput key="source-missing">
              <span style={{ color: colors.red.hex }}>
                Usage: <strong>source [project name]</strong>
              </span>
            </TerminalOutput>
          );
        } else {
          const key = normalize(projectName);
          const idx = projectNameMap.get(key);
          if (idx === undefined) {
            ld.push(
              <TerminalOutput key={`source-unknown-${projectName}`}>
                <span style={{ color: colors.red.hex }}>
                  Unknown project: <strong>{projectName}</strong>
                </span>
              </TerminalOutput>
            );
          } else {
            const proj = projects[idx];
            ld.push(
              <TerminalOutput key={`source-${proj.name}`}>
                <StyledSpan color={colors.green.hex}>
                  <BoldItalicSpan>-Client Source Code:</BoldItalicSpan>{" "}
                  <StyledLink href={proj.github.client} target="_blank" rel="noreferrer">
                    {proj.github.client || "null"}
                  </StyledLink>
                  <br />
                  <BoldItalicSpan>-Server Source Code:</BoldItalicSpan>{" "}
                  <StyledLink href={proj.github.server} target="_blank" rel="noreferrer">
                    {proj.github.server || "null"}
                  </StyledLink>
                </StyledSpan>
              </TerminalOutput>
            );
          }
        }
      } else {
        // treat as possible project, game, book, movie, or show name
        const normalized = normalize(rawInput);
        const projIdx = projectNameMap.get(normalized);
        const gameIdx = gameNameMap.get(normalized);
        const bookIdx = bookNameMap.get(normalized);
        const movieIdx = movieNameMap.get(normalized);
        const showIdx = showNameMap.get(normalized);

        if (projIdx !== undefined) {
          runProjectDetails(ld, rawInput);
        } else if (gameIdx !== undefined) {
          runGameDetails(ld, rawInput);
        } else if (bookIdx !== undefined) {
          runBookDetails(ld, rawInput);
        } else if (movieIdx !== undefined) {
          runMovieDetails(ld, rawInput);
        } else if (showIdx !== undefined) {
          runShowDetails(ld, rawInput);
        } else {
          ld.push(
            <TerminalOutput key={`unknown-command-${ld.length}`}>
              <span style={{ color: colors.red.hex, whiteSpace: "pre-wrap" }}>
                Unrecognized command, use{" "}
                <span style={{ fontStyle: "italic" }}>
                  <strong>help</strong>
                </span>{" "}
                for list of available commands
              </span>
            </TerminalOutput>
          );
          ld.push(<TerminalOutput key={`unknown-command-blank-${ld.length}`}></TerminalOutput>);
        }
      }

      return ld;
    });

    if (terminalInput.trim()) {
      setHistory((prev) => [...prev, terminalInput]);
    }
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

        let newIndex;
        if (historyIndex === null) {
          newIndex = history.length - 1;
        } else {
          newIndex = Math.max(0, historyIndex - 1);
        }

        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      } else if (e.key === "ArrowDown") {
        if (!history.length || historyIndex === null) return;
        e.preventDefault();

        let newIndex = historyIndex + 1;
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

  const pathLabel =
    currentDir === "~"
      ? "~"
      : currentDir === "Projects"
      ? "~/Projects"
      : currentDir === "games"
      ? "~/games"
      : currentDir === "books"
      ? "~/books"
      : currentDir === "movies"
      ? "~/movies"
      : "~/shows";
  
  const [terminalHeight, setTerminalHeight] = useState('600px');
  
  const onRedButtonClick = (e) => {
    setTerminalHeight('0px')
  }

  const onYellowButtonClick = (e) => {
    setTerminalHeight('600px')
  }

  const onGreenButtonClick = (e) => {
    setTerminalHeight('100vh')
  }

  return (
    <Grid container>
      <Terminal
        name={`- MattKearns ${pathLabel}`}
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
    </Grid>
  );
}
