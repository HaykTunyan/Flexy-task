# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



## The Documentation For the Project.

The make a Custome Slider in Vite React and TypeScript:

- [Vite](https://vitejs.dev/)



The use clsx library (https://www.npmjs.com/package/clsx) and add plagin for  join class to styles.
To run the example locally:


The Slider has 4 small component with  handle of slider:

The global Types in  types.ts,  url is [Slider/types.ts].



In [index.tsx] I use the Mouse Event and Touch Event functional:


The run [npm run dev] :

You can see how it works on the  Local: [http://localhost:5176/]:


The run [npm run dev -- --host]:

And Network [http://192.168.2.104:5176/]:
