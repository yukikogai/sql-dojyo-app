import { Progress, Review } from "@/types";

const KEY = "sql-dojo-progress";
const REVIEW_KEY = "sql-dojo-review";

export function loadProgress(): Progress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveProgress(progress: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(progress));
}

export function loadReview(): Review {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(REVIEW_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveReview(review: Review): void {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(review));
}
