const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serve frontend

app.post("/download", async (req, res) => {
  const { url } = req.body;

  try {
    if (!ytdl.validateURL(url)) {
      return res.json({ error: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(url);

    const format = ytdl.chooseFormat(info.formats, {
      quality: "18"
    });

    res.json({
      video: format.url,
      title: info.videoDetails.title
    });

  } catch (err) {
    res.json({ error: "Error fetching video" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running...");
});
