import sql from "better-sqlite3";
import { Meal } from "../types/meal";
import slugify from "slugify";
import xss from "xss";
import fs from "fs";

const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

export function getMeal(mealSlug: string): Meal {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(mealSlug) as Meal;
}

export async function saveMeal(meal: {
  title: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
  image: File | string;
  slug?: string;
}) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = (meal.image as File).name.split(".").pop();
  const fileName = `${meal.slug}-${Date.now()}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await (meal.image as File).arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image");
    }
  });

  meal.image = `/images/${fileName}`;
  db.prepare(
    `INSERT INTO meals (title, slug, summary, instructions, image, creator, creator_email) 
    VALUES (@title, @slug, @summary, @instructions, @image, @creator, @creator_email)`,
  ).run(meal);
}
