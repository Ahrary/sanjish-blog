import * as React from "react";
import PropTypes from "prop-types";

import Link from "next/link";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

function Header(props) {
  const { sections, title } = props;

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link href="/">
            <a style={{ textDecoration: "none", color: "#333" }}>
              <b>{title}</b>
            </a>
          </Link>
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Typography
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0, textDecoration: "none" }}
          >
            <a
              href={section.url}
              style={{ textDecoration: "none", color: "#333" }}
            >
              {section.title}
            </a>
          </Typography>
        ))}
      </Toolbar>
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
