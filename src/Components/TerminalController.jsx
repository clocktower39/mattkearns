import React, { useMemo, useState, useEffect } from "react";
import Terminal, { TerminalOutput, TerminalInput } from "react-terminal-ui";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import { projects, games } from "../states";

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

// Initial header + first ls
const buildInitialLines = () => [
  <TerminalOutput key="prompt-line">
    <StyledSpan color={colors.green.hex}>user@MattKearns</StyledSpan>{" "}
    <StyledSpan color={colors.yellow.hex}>~/Projects</StyledSpan>
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

  // directory structure:
  // "~" (home)
  //   ├─ Projects
  //   └─ games
  const [currentDir, setCurrentDir] = useState("Projects");

  const [terminalLineData, setTerminalLineData] = useState(() => [
    ...buildInitialLines(),
    ...projects.map((p) => (
      <TerminalOutput key={`project-list-init-${p.name}`}>
        <StyledSpan
          color={colors.green.hex}
          cursor="pointer"
          onClick={() => handleInput(p.name)}
        >
          {p.name}
        </StyledSpan>
      </TerminalOutput>
    )),
    <TerminalOutput key="blank-end"></TerminalOutput>,
  ]);

  // command history / navigation
  const [history, setHistory] = useState(["ls"]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const directories = ["Projects", "games"]; // children of ~

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

  const handleInput = (terminalInput) => {
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
        ld.push(<TerminalOutput key="help-blank-5"></TerminalOutput>);
      } else if (["ls", "projects"].includes(cmd)) {
        if (currentDir === "~") {
          // list directories
          directories.forEach((dirName) => {
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
                : "~/games";

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
        // treat as possible project or game name
        const projIdx = projectNameMap.get(normalize(rawInput));
        const gameIdx = gameNameMap.get(normalize(rawInput));

        if (projIdx !== undefined) {
          runProjectDetails(ld, rawInput);
        } else if (gameIdx !== undefined) {
          runGameDetails(ld, rawInput);
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
      : "~/games";

  return (
    <Grid container>
      <Terminal
        name={`- MattKearns ${pathLabel}`}
        onInput={handleInput}
        startingInputValue={inputValue}
      >
        {terminalLineData}
      </Terminal>
    </Grid>
  );
}
