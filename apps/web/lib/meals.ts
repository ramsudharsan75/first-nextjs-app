import sql from "better-sqlite3";
import { Meal } from "../types/meal";

const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}
