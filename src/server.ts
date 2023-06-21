import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

export default server;
