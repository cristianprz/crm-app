import app from './app.js';  // Note: .js extension is required in ES modules

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});