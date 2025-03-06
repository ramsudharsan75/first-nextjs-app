import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

export default function MealsGrid({
  meals,
}: {
  meals: { id: string; title: string; slug: string; image: string; summary: string; creator: string }[];
}) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
