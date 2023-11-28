import init, { greet } from "snake_game";

init().then((_) => {
  greet("Noah");
  console.log("OK!");
});
