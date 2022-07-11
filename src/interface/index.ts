export interface User {
  email: string;
  password: string;
  name?: string;
  photo?: string;
}

export interface Tabs {
  title: string;
  id: number;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strCategoryThumb?: string;
  strArea: string;
  strInstructions: string | Array<string>;
  strYoutube?: string;
}

export interface Comment {
  message?: string;
  rate: number;
  uid: string;
  updateAt: number | Date;
  name?: string;
  photo?: string;
}
