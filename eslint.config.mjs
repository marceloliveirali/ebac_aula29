import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier"; // Importante!

export default defineConfig([
  // 1. Configurações de Arquivos e Globais
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    },
    // Configurações específicas para o React
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React
      },
    },
  },

  // 2. Extensões de Regras (Ordem importa!)
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // 3. Integração com Prettier (Sempre por último)
  // Isso desativa as regras do ESLint que você já configurou no .prettierrc
  eslintConfigPrettier,

  // 4. Regras Customizadas
  {
    rules: {
      "react/react-in-jsx-scope": "off", // Desnecessário em versões modernas do React
      "no-unused-vars": "warn",          // Avisa sobre variáveis não usadas
      "@typescript-eslint/no-explicit-any": "warn", // Evita o uso excessivo de 'any'
    },
  },

  // 5. Pastas Ignoradas (Substitui o antigo .eslintignore)
  {
    ignores: ["dist/", "node_modules/", "build/"],
  }
]);
