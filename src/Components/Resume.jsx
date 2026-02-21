import React from "react";
import { Avatar, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import {
  Code,
  EmojiPeople,
  Work,
  Subject,
  Source as SourceIcon,
  GitHub,
  LinkedIn,
  Print,
} from "@mui/icons-material";
import img from "../img/avatar.jpg";

export default function Resume() {
  const coreSkills = [
    {
      label: "Frontend",
      items: "React, TypeScript, Next.js, Vite, Redux, MUI, HTML, CSS",
    },
    {
      label: "Backend",
      items: "Node.js, Express, MongoDB, Mongoose, JWT, Socket.IO, GridFS",
    },
    {
      label: "Infrastructure",
      items: "Docker, NGINX, AWS (Lightsail, S3, CloudFront), Cloudflare (DNS/SSL)",
    },
    {
      label: "Engineering",
      items:
        "Refactoring, performance optimization, debugging production issues, SEO/SSG/SSR, CI/CD basics",
    },
  ];

  return (
    <Container maxWidth="md" disableGutters>
      <Grid container>
        <Grid
          size={12}
          container
          sx={{
            fontWeight: 500,
            backgroundColor: "#263544",
            borderRadius: "12.5px 12.5px 0 0",
            color: "white",
            order: 1,
            position: "relative",
          }}
        >
          <Grid container size={4} sx={{ justifyContent: "center" }}>
            <Avatar
              alt="pic"
              src={img}
              sx={{
                height: "125px",
                width: "125px",
                margin: "5px",
              }}
            />
          </Grid>

          <Grid container size={8} sx={{ paddingLeft: "12.5px", alignItems: "center" }}>
            <Grid size={12}>
              <Typography variant="h2">Matt Kearns</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="h6">Senior Frontend / Full-Stack Engineer</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2">
                Gilbert, AZ • Open to Onsite / Hybrid / Remote
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ position: "absolute", top: 6, right: 40, display: "flex" }}>
            <IconButton
              aria-label="Print to PDF"
              onClick={() => window.print()}
              sx={{
                color: "white",
                border: "1px solid rgba(255,255,255,0.6)",
                borderRadius: "8px",
                padding: "6px",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <Print fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          size={{ sm: 12, md: 4, }}
          sm={12}
          md={4}
          sx={{
            backgroundColor: "#F3F3F3",
            textAlign: "center",
            color: "#1D1D1D",
            order: {
              xs: 4,
              md: 2,
            },
            padding: "10px",
          }}
        >
          <Grid container size={12}>
            <Grid size={12} sx={{ paddingBottom: "7.5px" }}>
              <Typography variant="h4" sx={{ color: "black" }}>
                CONTACT
              </Typography>
            </Grid>

            <Grid container size={12} sx={{ paddingBottom: "7.5px" }}>
              <Grid size={12}>
                <Typography variant="subtitle1">Email</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="caption">matt.kearns39@gmail.com</Typography>
              </Grid>
            </Grid>

            <Grid container size={12} sx={{ paddingBottom: "7.5px" }}>
              <Grid size={12}>
                <Typography variant="subtitle1">Core Skills</Typography>
              </Grid>
              {coreSkills.map((group) => (
                <Grid key={group.label} size={12} sx={{ textAlign: "left", paddingBottom: "6px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {group.label}
                  </Typography>
                  <Typography variant="body2">{group.items}</Typography>
                </Grid>
              ))}
            </Grid>

            <Grid
              container
              size={12}
              sx={{
                paddingBottom: "7.5px",
                "@media print": {
                  display: "none",
                },
              }}
            >
              <Grid size={12}>
                <Typography variant="subtitle1">Social Media</Typography>
              </Grid>
              <Grid size={12}>
                <IconButton
                  onClick={() => window.open("https://www.github.com/clocktower39", "_blank")}
                >
                  <GitHub />
                </IconButton>
              </Grid>
              <Grid size={12}>
                <IconButton
                  onClick={() =>
                    window.open("https://www.linkedin.com/in/matthew-kearns-6b8865117/", "_blank")
                  }
                >
                  <LinkedIn />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          size={{ sm: 12, md: 8, }}
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#111111",
            order: 3,
            padding: "10px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 500, marginBottom: "6px", color: "#111" }}>
            <EmojiPeople /> Summary
          </Typography>
          <Grid container size={12} sx={{ paddingLeft: "25px", paddingBottom: "20px" }}>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              Systems-focused software engineer with 6+ years of experience building and
              refactoring production web applications. Strong in React-based frontends and
              full-stack JavaScript systems, with emphasis on reliability, performance, and
              maintainability. Experienced owning features end-to-end, from frontend architecture
              through backend APIs and infrastructure.
            </Typography>
          </Grid>

          <Typography variant="4" sx={{ fontWeight: 500, marginBottom: "6px", color: "#111" }}>
            <Code /> Selected Projects
          </Typography>
          <Grid container size={12} sx={{ paddingLeft: "25px", paddingBottom: "20px" }}>
            <Grid size={12}>
              <Typography variant="h6">Firebelly Fitness (Trainer/Client Platform)</Typography>
              <Typography variant="subtitle2">
                React, Redux, Node.js, MongoDB, Socket.IO, JWT
              </Typography>
              <Typography variant="body2">
                • Built trainer-client workflows with real-time updates and secure auth.
              </Typography>
              <Typography variant="body2">
                • Implemented predictable state management to prevent client/server
                desynchronization.
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="h6">Dauntless Athletics (Site Migration + Infra)</Typography>
              <Typography variant="subtitle2">
                React, MUI, AWS Lightsail, NGINX, Cloudflare
              </Typography>
              <Typography variant="body2">
                • Migrated a WordPress site to a custom React frontend.
              </Typography>
              <Typography variant="body2">
                • Configured NGINX + SSL/DNS routing for stable deployments and improved
                performance.
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="h6">Social Picture App</Typography>
              <Typography variant="subtitle2">React, Node.js, MongoDB, Multer, JWT</Typography>
              <Typography variant="body2">
                • Built an authenticated image-sharing app with secure upload handling.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h4" sx={{ fontWeight: 500, marginBottom: "6px", color: "#111" }}>
            <SourceIcon /> Experience
          </Typography>
          <Grid container size={12} sx={{ paddingLeft: "25px", paddingBottom: "20px" }}>
            <Typography variant="subtitle1">
              Senior Web Developer / Systems Engineer (Freelance / Independent)
            </Typography>
            <Grid size={12}>
              <Typography variant="subtitle2">2018 - Present</Typography>
            </Grid>
            <Grid
              size={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">
                • Designed, built, and maintained production React and full-stack applications for
                small businesses and real users.
              </Typography>
              <Typography variant="body2">
                • Owned end-to-end delivery: requirements → implementation → deployment → monitoring
                and bug fixes.
              </Typography>
              <Typography variant="body2">
                • Built real-time workflows (messaging, presence, updates) using Socket.IO with
                server-side authorization checks.
              </Typography>
              <Typography variant="body2">
                • Migrated WordPress sites to modern static/hybrid architectures (Vite/SSG + CDN) to
                improve performance and SEO.
              </Typography>
              <Typography variant="body2">
                • Implemented authentication and role-based access control using JWT and secure
                backend patterns.
              </Typography>
              <Typography variant="body2">
                • Diagnosed and resolved infrastructure issues involving NGINX, SSL, DNS, and
                reverse proxies.
              </Typography>
              <Typography variant="body2">
                • Reduced recurring production issues via targeted refactors (state ownership, data
                flow cleanup, and component reuse).
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h4" sx={{ fontWeight: 500, marginBottom: "6px", color: "#111" }}>
            <Work /> Additional Experience
          </Typography>
          <Grid container size={12} sx={{ paddingLeft: "25px", paddingBottom: "20px" }}>
            <Typography variant="subtitle1">
              Operations Support Lead — McKesson Specialty Health (Scottsdale, AZ)
            </Typography>
            <Grid size={12}>
              <Typography variant="subtitle2">2019 - 2024</Typography>
            </Grid>
            <Grid
              size={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">
                • Automated reporting and operational workflows using SharePoint, scripting, and
                browser automation/web scraping.
              </Typography>
              <Typography variant="body2">
                • Acted as operations liaison to IT to diagnose customer-facing issues and support
                production triage.
              </Typography>
              <Typography variant="body2">
                • Led team meetings, training, and documentation improvements (SOPs/work
                instructions).
              </Typography>
              <Typography variant="body2">
                • Performed data analysis and reporting to support program performance improvements.
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="subtitle1">
                Seasonal Supervisor — McKesson Specialty Health (Scottsdale, AZ)
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle2">2021 - 2022</Typography>
            </Grid>
            <Grid
              size={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">
                • Supervised and trained team members; ran QA checks and coached on accuracy and
                process improvements.
              </Typography>
              <Typography variant="body2">
                • Coordinated training sessions and improved team communication to meet
                service-level goals.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h4" sx={{ fontWeight: 500, marginBottom: "6px", color: "#111" }}>
            <Subject /> Education
          </Typography>
          <Grid container sx={{ paddingLeft: "25px", paddingBottom: "20px" }}>
            <Typography variant="subtitle1">
              Self-taught software engineer
            </Typography>
            <Grid size={12} sx={{ paddingLeft: "35px", paddingBottom: "7.5px" }}>
              <Typography variant="body2">
                • Ongoing independent study in web architecture, system design, and infrastructure.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
