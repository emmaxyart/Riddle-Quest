import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Check if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// If in production, use empty config to effectively disable ESLint
const eslintConfig = isProduction 
  ? []
  : [
      ...compat.extends("next/core-web-vitals", "next/typescript"),
      {
        rules: {
          "react/no-unescaped-entities": "off",
          "@typescript-eslint/no-explicit-any": "warn",
          "typescript-eslint/no-unsafe-assignment": "off",
          "typescript-eslint/no-unsafe-member-access": "off",
          "@typescript-eslint/consistent-type-assertions": "warn"
        },
      },
    ];

export default eslintConfig;
