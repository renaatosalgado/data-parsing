import { Router } from "express";
import fs from "fs";
import connection from "./db.js";
import { Parser } from "json2csv";

const route = Router();

async function getRepos(req, res) {
  const { rows } = await connection.query(`
    SELECT * FROM repositories WHERE "hasSponsorship" = true
`);
  const newRepos = rows.map((repo) => {
    const { name, owner, description, topic, language, stars } = repo;

    return {
      name,
      owner,
      description,
      topic,
      language,
      stars,
    };
  });
  const jsonRepos = JSON.stringify(newRepos);
  console.log(jsonRepos)

  fs.writeFileSync("repos.json", jsonRepos);

  const fields = ["name", "owner", "description", "topic", "language", "stars"];
  const opts = { fields };

  const parser = new Parser(opts);
  const csv = parser.parse(jsonRepos);

  fs.writeFileSync("repos.csv", csv);

  console.log(csv);
  res.sendStatus(200);
}

route.use("/app", getRepos);

export default route;
