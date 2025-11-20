import React, { useState, useMemo, } from "react";
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

const ProjectResponse = (p, lnIndex) => (
  <TerminalOutput key={`${p.name}-${lnIndex}`}>
    <StyledSpan color={colors.green.hex}>
      <BoldItalicSpan>-Project:</BoldItalicSpan> {p.name}
      <br />
      <BoldItalicSpan>-Link:</BoldItalicSpan>{" "}
      <StyledLink href={p.link}>{p.link || "null"}</StyledLink>
      <br />
      <BoldItalicSpan>-Client Source Code:</BoldItalicSpan>{" "}
      <StyledLink href={p.github.client}>{p.github.client || "null"}</StyledLink>
      <br />
      <BoldItalicSpan>-Server Source Code:</BoldItalicSpan>{" "}
      <StyledLink href={p.github.server}>{p.github.server || "null"}</StyledLink>
      <br />
      <span style={{ whiteSpace: "pre-wrap" }}>
        <BoldItalicSpan>-Description:</BoldItalicSpan> {p.desc}
      </span>
    </StyledSpan>
    <div>{p.img && <img src={p.img} style={{ maxWidth: "500px" }} />}</div>
  </TerminalOutput>
);

export default function TerminalController(props = {}) {
  const handleClick = (projectName) => {
    handleInput(projectName);
  };

  const normalize = (s = "") => s.toLowerCase().trim();

  const projectNameMap = useMemo(() => {
    const map = new Map();
    projects.forEach((p, index) => {
      map.set(normalize(p.name), index);
    });
    return map;
  }, [projects]);

  const projectOutputs = projects.map((p) => {
    return (
      <TerminalOutput key={p.name}>
        <StyledSpan color={colors.green.hex} cursor="pointer" onClick={() => handleClick(p.name)}>
          {p.name}
        </StyledSpan>
      </TerminalOutput>
    );
  });

  const initTerminalLineData = [
    <TerminalOutput>
      <StyledSpan color={colors.green.hex}>user@MattKearns</StyledSpan>{" "}
      <StyledSpan color={colors.yellow.hex}>~/Projects</StyledSpan>
    </TerminalOutput>,
    <TerminalOutput></TerminalOutput>,
    <TerminalOutput>$ ls</TerminalOutput>,
    ...projectOutputs,
    <TerminalOutput></TerminalOutput>,
  ];

  const [terminalLineData, setTerminalLineData] = useState(initTerminalLineData);

  /*
      commands:
        ls, projects: list all projects

        [project title]: list all information for the project
        -d, -description: list project description
        -s, -source: list project source
        -o, -open: open project in new tab

        clear: reset to original view

    */
  const handleInput = (terminalInput) => {
    // Create a copy of the existing data
    let ld = [...terminalLineData];

    // Add the input line to the terminal
    ld.push(<TerminalInput>{terminalInput}</TerminalInput>);

    const command = terminalInput.toLocaleLowerCase().trim();
    const projectIndex = projectNameMap.get(command);

    // Handle different commands
    if (["commands", "help", "man"].includes(command)) {
      ld.push(
        <>
          <TerminalOutput>
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>ls, projects: </BoldItalicSpan>
              list all projects
            </StyledSpan>
          </TerminalOutput>
          <TerminalOutput></TerminalOutput>
          <TerminalOutput>
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>[project title]: </BoldItalicSpan>: list all information for the
              project
            </StyledSpan>
          </TerminalOutput>
          <TerminalOutput></TerminalOutput>
          <TerminalOutput>
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>clear: </BoldItalicSpan>: reset to original view
            </StyledSpan>
          </TerminalOutput>
          <TerminalOutput></TerminalOutput>
        </>
      );
    } else if (["ls", "projects"].includes(command)) {
      ld.push(...projectOutputs, <TerminalOutput></TerminalOutput>);
    } else if (projectIndex !== undefined) {
      ld.push(
        ProjectResponse(projects[projectIndex], ld.length),
        <TerminalOutput key="empty"></TerminalOutput>
      );
    } else if (command === "clear") {
      // Reset to the initial view
      ld = [...initTerminalLineData];
    } else if (terminalInput) {
      ld.push(
        <TerminalOutput>
          <span style={{ color: colors.red.hex, whiteSpace: "pre-wrap" }}>
            Unrecognized command, use command{" "}
            <span style={{ fontStyle: "italic" }}>
              <strong>help</strong>
            </span>{" "}
            for list of available commands
          </span>
        </TerminalOutput>,
        <TerminalOutput></TerminalOutput>
      );
    }

    // Update the terminal data state
    setTerminalLineData(ld);
  };

  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <Grid container>
      <Terminal
        name="- MattKearns ./Projects"
        onInput={(terminalInput) => handleInput(terminalInput)}
      >
        {terminalLineData}
      </Terminal>
    </Grid>
  );
}
