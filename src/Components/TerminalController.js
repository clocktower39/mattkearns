import React, { useState } from "react";
import Terminal, { TerminalOutput, TerminalInput } from "react-terminal-ui";
import { Grid } from "@mui/material";
import { projects } from "../states";

export default function TerminalController(props = {}) {
  const colors = {
    green: { hex: "#01A252" },
    red: { hex: "#DB2D20" },
    yellow: { hex: "#FDED02" },
    blue: { hex: "#01A0E4" },
    purple: { hex: "#A16A94" },
  };
  const ProjectResponse = (p) => (
    <TerminalOutput key={`output-${p.name}`}>
      <span style={{ color: colors.blue.hex }}>
        Project: {p.name}<br />
        Link: <a href={p.link}>{p.link}</a><br />
        Client Source Code: <a href={p.github.client}>{p.github.client}</a><br />
        Server Source Code: <a href={p.github.server}>{p.github.server}</a><br />
        Description: {p.desc}
      </span>
    </TerminalOutput>);
    
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
        <span style={{ color: colors.blue.hex, cursor: "pointer" }} onClick={handleClick}>
          {p.name}
        </span>
      </TerminalOutput>
    );
  });

  const initTerminalLineData = [
    <TerminalOutput>
      <span style={{ color: colors.green.hex }}>user@MattKearns</span>{" "}
      <span style={{ color: colors.yellow.hex }}>~/Projects</span>
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
            <span style={{ color: colors.blue.hex }}>
              <span style={{ fontStyle: "italic" }}>
                <strong>ls, projects</strong>
              </span>
              : list all projects
            </span>
          </TerminalOutput>
          <TerminalOutput></TerminalOutput>
          <TerminalOutput>
            <span style={{ color: colors.blue.hex }}>
              <span style={{ fontStyle: "italic" }}>
                <strong>[project title]</strong>
              </span>
              : list all information for the project
            </span>
          </TerminalOutput>
          {/* <TerminalOutput>
            <span style={{ color: colors.blue.hex }}>
              <span style={{ fontStyle: "italic" }}>
                <strong>-d, -description</strong>
              </span>
              : list project description
            </span>
          </TerminalOutput>
          <TerminalOutput>
            <span style={{ color: colors.blue.hex }}>
              <span style={{ fontStyle: "italic" }}>
                <strong>-s, -source</strong>
              </span>
              : list project source
            </span>
          </TerminalOutput>
          <TerminalOutput>
            <span style={{ color: colors.blue.hex }}>
              <span style={{ fontStyle: "italic" }}>
                <strong>-o, -open</strong>
              </span>
              : open project in new tab
            </span>
          </TerminalOutput> */}
          <TerminalOutput></TerminalOutput>
          <TerminalOutput>
            <span style={{ color: colors.blue.hex }}>
              <span style={{ fontStyle: "italic" }}>
                <strong>clear</strong>
              </span>
              : reset to original view
            </span>
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
      ld.push(ProjectResponse(projects[matchingProjectIndex]),
      <TerminalOutput key="empty"></TerminalOutput>);
    } else if (terminalInput.toLocaleLowerCase().trim() === "clear") {
      ld = [initTerminalLineData];
    } else if (terminalInput) {
      ld.push(
        <TerminalOutput>
          <span style={{ color: colors.blue.hex }}>
            Unrecognized command, use command{" "}
            <span style={{ fontStyle: "italic" }}>
              <strong>help</strong>
            </span>{" "}
            for list of available commands
          </span>
        </TerminalOutput>
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
