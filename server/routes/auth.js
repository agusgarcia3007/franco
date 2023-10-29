import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
  const fixedAdminPassword = "admin5840";
  try {
    const { username, password, rememberMe } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    if (password !== fixedAdminPassword && username !== "admin") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    let refreshToken;
    if (rememberMe) {
      refreshToken = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    }

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.json({ accessToken });
  });
});

export default router;
