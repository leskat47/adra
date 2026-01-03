import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "./api";
import type { Recipe, RecipeIngredient } from "./types";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RecipeSection = ({title, content}: {title: string, content: JSX}) => {
  return (<Accordion defaultExpanded
    sx={{
      boxShadow: "none", // removes shadow
      "&:before": { display: "none" }, // removes the divider line at the top
      mb: 0, // removes default margin-bottom
      "&.Mui-expanded": { mb: 0 }, // ensures no extra margin when expanded
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
      sx={{
        py: 0, 
        borderBottom: "solid 1px lightblue",
        my: 2
      }}
    >
      <Typography variant="h5">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ py: 0}}>
      {content}
      </AccordionDetails>
      </Accordion>
  );
}

export default function RecipeShow() {
  const [checked, setChecked] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id!),
    enabled: !!id,
  });

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  if (isLoading) return <Typography>Loading recipe...</Typography>;
  if (error || !recipe) return <Typography color="error">Error loading recipe</Typography>;

  return (
    <Container maxWidth="md">
      {/* Recipe Name and Servings */}
      <Typography variant="h2" gutterBottom>{recipe.name}</Typography>
      <Typography variant="body1" gutterBottom>Serves: {recipe.servings}</Typography>

      {/* Ingredients */}
      <RecipeSection 
        title="Ingredients"
        content={
          <List>
            {recipe.recipe_ingredients.map((ri: RecipeIngredient) => (
              <ListItem key={ri.id} sx={{ p: 0 }}>
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(ri.id)}
                    tabIndex={-1}
                    disableRipple
                    onClick={handleToggle(ri.id)}
                    sx={{ py: 0, pr: 1, pl: 2 }}
                    size="small"
                  />
                </ListItemIcon>
                <Typography variant="body2">
                  {ri.amount} {ri.ingredient.name}
                </Typography>
              </ListItem>
            ))}
          </List>}
      />

      {/* Instructions */}
      <RecipeSection
        title="Instructions"
        content={
          <List component="ol">
            {recipe.instructions.map((step: string, idx: number) => (
              <ListItem key={idx} component="li" sx={{ display: "list-item", pl: 2, pb: 1 }}>
                <Typography variant="body2">{idx + 1}. {step}</Typography>
              </ListItem>
            ))}
          </List>
        }
      />

      {/* Nutrition */}
      <RecipeSection
        title="Nutrition"
        content={
          <Box maxWidth="300px">
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Calories</TableCell>
                  <TableCell>{recipe.calories}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Protein</TableCell>
                  <TableCell>{recipe.protein} g</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fat</TableCell>
                  <TableCell>{recipe.fat} g</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fiber</TableCell>
                  <TableCell>{recipe.fiber} g</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        }
      />
    </Container>
  );
}
