import sql from "better-sqlite3";
import { Meal } from "../types/meal";

const db = sql("meals.db");

export function getMeals(): Meal[] {
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}
