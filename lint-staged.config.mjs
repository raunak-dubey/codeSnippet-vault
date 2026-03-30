export default {
  "backend/**/*.{ts,js,tsx,jsx}": ["eslint --fix --max-warnings=0", "prettier --write"],
  "frontend/**/*.{ts,js,tsx,jsx}": ["eslint --fix --max-warnings=0", "prettier --write"]
};