console.time("devtools-metadata");
const devtoolsFile = Bun.file("static/.well-known/appspecific/com.chrome.devtools.json");
if (!(await devtoolsFile.exists())) {
  await Bun.write(
    devtoolsFile,
    JSON.stringify({
      root: `${import.meta.dir}/dist`,
      uuid: crypto.randomUUID(),
    }),
  );
}
console.timeEnd("devtools-metadata");

console.time("prebuild");
await Bun.$`rm -rf dist`;
await Bun.$`cp -r static dist`;
console.timeEnd("prebuild");

console.time("build");
await Bun.build({
  entrypoints: ["src/index.ts", "src/index.css"],
  outdir: "dist",
  target: "browser",
  sourcemap: "linked",
});
console.timeEnd("build");
