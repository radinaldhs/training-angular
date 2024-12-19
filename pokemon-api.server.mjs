import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4001;

// Base API URLs
const POKE_API_BASE = "https://pokeapi.co/api/v2/pokemon";
const POKE_API_SPECIES = "https://pokeapi.co/api/v2/pokemon-species";
const POKE_API_TYPE = "https://pokeapi.co/api/v2/type";

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// API Endpoints

// 1. Get Pokémon Types
app.get("/get-types", async (req, res) => {
  try {
    const response = await axios.get(POKE_API_TYPE);
    const types = response.data.results.map((type) => type.name);
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokémon types" });
  }
});

// 2. Get Pokémon List
app.get("/get-list", async (req, res) => {
  const limit = req.query["limit"] || 20;
  try {
    const response = await axios.get(`${POKE_API_BASE}?limit=${limit}`);
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokémon list" });
  }
});

// 3. Get Pokémon Details by URL
app.post("/get-details", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Pokémon details" });
  }
});

// 4. Get Pokémon by Name
app.get("/get-pokemon/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(`${POKE_API_BASE}/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch Pokémon: ${name}` });
  }
});

// 5. Get Pokémon Species
app.get("/get-species/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(`${POKE_API_SPECIES}/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch species for: ${name}` });
  }
});

// 6. Get Evolution Chain
app.post("/get-evolution-chain", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  try {
    const response = await axios.get(url);
    const chain = parseEvolutionChain(response.data.chain);
    res.json(chain);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch evolution chain" });
  }
});

// Utility: Parse Evolution Chain
function parseEvolutionChain(chain) {
  const evolutions = [];
  let current = chain;

  while (current) {
    evolutions.push({
      name: current.species.name,
      url: current.species.url,
    });
    current = current.evolves_to[0];
  }

  return evolutions;
}

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
