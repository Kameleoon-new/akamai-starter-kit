import { create } from "tar";
create(
  {
    gzip: true,
    file: "dist/bundle.tgz",
    cwd: "dist",
  },
  ["main.js", "bundle.json"]
).then((_) => {
  console.log("bundle.tgz has been created");
});
