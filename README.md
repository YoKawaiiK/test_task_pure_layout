# Test task for Metastudio24

## Short decription

Test task for layout by layout, as well as using only raw javascript without frameworks and UI frameworks.
The project uses the Webpack 5 builder, which allows for scss, svg-loader, etc.

## Launching and compiling application

### 1. Install all dependencies
```
npm install
```

### 2. Compile project and hot reloading for development app
```
npm run serve
```

### 3.1 Build distributive and preview

Сompiled project in dist folder and start http-server for preview project.
```
npm run preview
```

Available at the links:
1. Sign Up page (unavailable if there is a login in localstorage): http://localhost:8080/layout/sign-up.html

2. Main page (needs login in localstorage or redirect to Sign-Up): http://localhost:8080/layout/main.html

### 3.2 Compile project and build distributive

Сompiled project in dist folder.

```
npm run build
```

