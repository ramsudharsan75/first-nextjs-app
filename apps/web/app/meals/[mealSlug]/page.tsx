type MealDetailsPageProps = {
  params: {
    mealSlug: string;
  };
};

export default function MealDetailsPage({ params }: MealDetailsPageProps) {
  return <h1>Meal Details Page for {params.mealSlug}</h1>;
}
