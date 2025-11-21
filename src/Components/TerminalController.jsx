import React, { useMemo, useState, useCallback } from "react";
import Terminal, { TerminalOutput, TerminalInput } from "react-terminal-ui";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import { projects } from "../states";

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
  // map project names → index for quick lookup
  const projectNameMap = useMemo(() => {
    const map = new Map();
    projects.forEach((p, i) => {
      map.set(normalize(p.name), i);
    });
    return map;
  }, [projects]);

  const projectOutputs = useMemo(
    () =>
      projects.map((p) => (
        <TerminalOutput key={`project-list-${p.name}`}>
          <StyledSpan
            color={colors.green.hex}
            cursor="pointer"
            onClick={() => handleInput(p.name)}
            data-project-name={p.name}
          >
            {p.name}
          </StyledSpan>
        </TerminalOutput>
      )),
    []
  );

  const [terminalLineData, setTerminalLineData] = useState(() => [
    ...buildInitialLines(),
    ...projectOutputs,
    <TerminalOutput key="blank-end"></TerminalOutput>,
  ]);

  const runProjectDetails = useCallback(
    (ld, projectNameRaw) => {
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
    },
    [projectNameMap]
  );

  const handleInput = useCallback(
    (terminalInput) => {
      const rawInput = terminalInput.trim();
      if (!rawInput) return;

      setTerminalLineData((prev) => {
        let ld = [...prev];

        // Echo the input
        ld.push(<TerminalInput key={`input-${ld.length}`}>{terminalInput}</TerminalInput>);

        const [rawCmd, ...rawArgs] = rawInput.split(/\s+/);
        const cmd = normalize(rawCmd);
        const args = rawArgs.join(" "); // everything after the command

        if (["commands", "help", "man"].includes(cmd)) {
          ld.push(
            <TerminalOutput key="help-1">
              <StyledSpan color={colors.green.hex}>
                <BoldItalicSpan>ls, projects: </BoldItalicSpan>
                list all projects
              </StyledSpan>
            </TerminalOutput>
          );
          ld.push(<TerminalOutput key="help-blank-1"></TerminalOutput>);
          ld.push(
            <TerminalOutput key="help-2">
              <StyledSpan color={colors.green.hex}>
                <BoldItalicSpan>[project title]: </BoldItalicSpan>
                list all information for the project
              </StyledSpan>
            </TerminalOutput>
          );
          ld.push(<TerminalOutput key="help-blank-2"></TerminalOutput>);
          ld.push(
            <TerminalOutput key="help-3">
              <StyledSpan color={colors.green.hex}>
                <BoldItalicSpan>open [project]: </BoldItalicSpan>
                open project link in new tab
              </StyledSpan>
            </TerminalOutput>
          );
          ld.push(
            <TerminalOutput key="help-4">
              <StyledSpan color={colors.green.hex}>
                <BoldItalicSpan>source [project]: </BoldItalicSpan>
                show project source links
              </StyledSpan>
            </TerminalOutput>
          );
          ld.push(<TerminalOutput key="help-blank-3"></TerminalOutput>);
          ld.push(
            <TerminalOutput key="help-5">
              <StyledSpan color={colors.green.hex}>
                <BoldItalicSpan>clear: </BoldItalicSpan>
                reset to original view
              </StyledSpan>
            </TerminalOutput>
          );
          ld.push(<TerminalOutput key="help-blank-4"></TerminalOutput>);
        } else if (["ls", "projects"].includes(cmd)) {
          ld.push(...projectOutputs);
          ld.push(<TerminalOutput key={`ls-blank-${ld.length}`}></TerminalOutput>);
        } else if (cmd === "clear") {
          console.log(ld);
          ld = [
            <TerminalOutput key={`blank-end-${Date.now()}`}></TerminalOutput>,
          ];
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
          // Treat the entire input as a potential project name
          const projectIndex = projectNameMap.get(normalize(rawInput));
          if (projectIndex !== undefined) {
            runProjectDetails(ld, rawInput);
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
    },
    [projectNameMap, projectOutputs, runProjectDetails]
  );

  // Terminal
  return (
    <Grid container>
      <Terminal name="- MattKearns ./Projects" onInput={handleInput}>
        {/* Reuse terminalLineData; optionally you could integrate clickableProjectOutputs there */}
        {terminalLineData}
      </Terminal>
    </Grid>
  );
}
