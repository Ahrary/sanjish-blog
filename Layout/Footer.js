import * as React from "react";
import PropTypes from "prop-types";

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer(props) {
  const { description, title, social } = props;

  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          {title}
        </Typography>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
        >
          {social.map((network) => (
            <Link
              display="block"
              variant="body1"
              href={network.url}
              key={network.name}
              sx={{ mb: 0.5 }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                sx={{ m: 1 }}
              >
                <network.icon />
              </Stack>
            </Link>
          ))}
        </Grid>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Footer;
