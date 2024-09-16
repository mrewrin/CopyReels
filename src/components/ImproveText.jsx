import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function ImproveText() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Hello ImproveText
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste omnis
          architecto dolores exercitationem amet deserunt molestias commodi,
          aspernatur maiores nulla mollitia magnam quia dolorum consequatur
          placeat ad dolor provident debitis!
        </Typography>
      </Box>
    </Container>
  );
}
