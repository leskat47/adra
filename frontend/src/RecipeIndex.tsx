import { useRecipes } from "./queries/recipes"
import type { Recipe } from "./types";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box"

export default function RecipeIndex() {

  const { data: recipes, isLoading, error } = useRecipes();

  if (isLoading) return <Box>Loading recipes...</Box>;
  if (error) return <Box>Error loading recipes</Box>;
  if (!isLoading && !recipes || recipes.length === 0) {
    return <Box>No recipes found.</Box>;
  }
  return (
    <Container maxWidth="md">
      <Typography variant="h2">Recipes</Typography>
      <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Type
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
        {recipes?.map((recipe: Recipe) => (
          <TableRow key={recipe.id}>
            <TableCell>
              <Link to={`/recipes/${recipe.id}`}>
                {recipe.name}
              </Link>
            </TableCell>
            <TableCell>{recipe.recipe_type}</TableCell>
            <TableCell>
              <IconButton aria-label="add" size="small">
                <AddIcon fontSize="inherit"/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
