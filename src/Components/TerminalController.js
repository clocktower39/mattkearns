import React, { useState } from "react";
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
  textdecoration: ${(props) => props.textDecoration || "none"};
  color: ${(props) => props.color || "inherit"};
`;

const ProjectResponse = (p) => (
  <TerminalOutput key={p.name}>
    <StyledSpan color={colors.green.hex}>
      <BoldItalicSpan>-Project:</BoldItalicSpan> {p.name}
      <br />
      <BoldItalicSpan>-Link:</BoldItalicSpan> <StyledLink href={p.link}>{p.link}</StyledLink>
      <br />
      <BoldItalicSpan>-Client Source Code:</BoldItalicSpan>{" "}
      <StyledLink href={p.github.client}>{p.github.client}</StyledLink>
      <br />
      <BoldItalicSpan>-Server Source Code:</BoldItalicSpan>{" "}
      <StyledLink href={p.github.server}>{p.github.server}</StyledLink>
      <br />
      <span style={{ whiteSpace: "pre-wrap" }}>
        <BoldItalicSpan>-Description:</BoldItalicSpan> {p.desc}
      </span>
    </StyledSpan>
  </TerminalOutput>
);

export default function TerminalController(props = {}) {
  const projectOutputs = projects.map((p) => {
    const handleClick = () => {
      setTerminalLineData((prevData) => [
        ...prevData,
        <TerminalInput key={`input-${p.name}`}>{p.name}</TerminalInput>,
        // Display information for the clicked project
        ProjectResponse(p),
        // ... other projects
        <TerminalOutput key="empty"></TerminalOutput>,
      ]);
    };

    return (
      <TerminalOutput key={p.name}>
        <StyledSpan color={colors.green.hex} cursor="pointer" onClick={handleClick}>
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

  const handleInput = (terminalInput) => {
    /*
      commands:
        ls, projects: list all projects

        [project title]: list all information for the project
        -d, -description: list project description
        -s, -source: list project source
        -o, -open: open project in new tab

        clear: reset to original view

    */
    let ld = [...terminalLineData];
    ld.push(<TerminalInput>{terminalInput}</TerminalInput>);

    if (["commands", "help", "man"].includes(terminalInput.toLocaleLowerCase().trim())) {
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
          {/* <TerminalOutput>
          <StyledSpan color={colors.green.hex}>
              <span style={{ fontStyle: "italic" }}>
                <strong>-d, -description</strong>
              </span>
              : list project description
            </StyledSpan>
          </TerminalOutput>
          <TerminalOutput>
          <StyledSpan color={colors.green.hex}>
              <span style={{ fontStyle: "italic" }}>
                <strong>-s, -source</strong>
              </span>
              : list project source
            </StyledSpan>
          </TerminalOutput>
          <TerminalOutput>
          <StyledSpan color={colors.green.hex}>
              <span style={{ fontStyle: "italic" }}>
                <strong>-o, -open</strong>
              </span>
              : open project in new tab
            </StyledSpan>
          </TerminalOutput> */}
          <TerminalOutput></TerminalOutput>
          <TerminalOutput>
            <StyledSpan color={colors.green.hex}>
              <BoldItalicSpan>clear: </BoldItalicSpan>: reset to original view
            </StyledSpan>
          </TerminalOutput>
          <TerminalOutput></TerminalOutput>
        </>
      );
    } else if (["ls", "projects"].includes(terminalInput.toLocaleLowerCase().trim())) {
      ld.push(...projectOutputs, <TerminalOutput></TerminalOutput>);
    } else if (
      projects
        .map((p) => p.name.toLocaleLowerCase().trim())
        .includes(terminalInput.toLocaleLowerCase().trim())
    ) {
      const matchingProjectIndex = projects
        .map((p) => p.name.toLocaleLowerCase().trim())
        .indexOf(terminalInput.toLocaleLowerCase().trim());
      ld.push(
        ProjectResponse(projects[matchingProjectIndex]),
        <TerminalOutput key="empty"></TerminalOutput>
      );
    } else if (terminalInput.toLocaleLowerCase().trim() === "clear") {
      ld = [initTerminalLineData];
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
    setTerminalLineData(ld);
  };

  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <Grid container item>
      <Terminal
        name="- MattKearns ./Projects"
        onInput={(terminalInput) => handleInput(terminalInput)}
      >
        {terminalLineData}
      </Terminal>
    </Grid>
  );
}
