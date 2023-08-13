![Website](https://img.shields.io/website?url=https%3A%2F%2Farchie-adams.github.io%2Fkeyboard-shortcut-map-maker%2F)
![GitHub](https://img.shields.io/github/license/archie-adams/keyboard-shortcut-map-maker)

# Keyboard Shortcut Map Maker

This is a website tool for creating a visual map/image of keyboard shortcuts or keybindings.  

It originally started as a tool to generate help pages for my [ahk-scripts](https://github.com/Archie-Adams/ahk-scripts) project.  

Note: A single file version of this website for easier local use can be found in the [releases](https://github.com/Archie-Adams/keyboard-shortcut-map-maker/releases) page.  

---

### Features:
- Saving and loading using html files.
- Saving to a png file.
- Styling for printing.
- Adding infinite keyboards.
- Adding infinite sections.
- Renaming keyboards and sections.
- Re-ordering the list of keyboards and sections.
- Multiple colour options.

### Planned Features:
- Adding key chord tables/sections.
- Collapsable notes section for each keyboard.
- Custom colours.
- Full control over key text.
- Different keyboard layouts.
- One HTML file version of the site.
- Better styling + more key animations.
- Code refactor and clean-up.
- Collapsable sections.
- Keyboard control.

### Known Issues:
- Cannot reload same file without loading another in-between.
  - Caused by load function being called on input file change.

&nbsp;

# [Live Site ↪](https://archie-adams.github.io/keyboard-shortcut-map-maker/)

# Images

![A keyboard with the key text being its keyboard shortcut function.](images/readmeimage.png "")  

# Dependencies

[dom-to-image](https://github.com/tsayen/dom-to-image)  
[file-saver](https://github.com/eligrey/FileSaver.js/)  

# Contributing

If you would like to improve upon this project and feel welcome to submit a pull request.  

# Acknowledgments
[Keyboard](https://github.com/guido732/mechanical-keyboard) inspiration: [Guido Torres](https://github.com/guido732)  


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
