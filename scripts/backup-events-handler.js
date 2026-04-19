const fs = require("fs")
const filePath = "articles.json"
const eventType = process.env.EVENT_TYPE
const payload = JSON.parse(process.env.PAYLOAD || "{}")
let articles = []
if (fs.existsSync(filePath)) {
  try {
    articles = JSON.parse(fs.readFileSync(filePath, "utf8"))
  } catch {
    articles = []
  }
}
if (!Array.isArray(articles)) {
  articles = []
}
if (eventType === "article.created") {
  if (!articles.find(a => a._id === payload._id)) {
    articles.push(payload);
  }
  articles.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
if (eventType === "article.updated") {
  articles = articles.map(a =>
    a._id === payload._id ? payload : a
  )
}
if (eventType === "article.deleted") {
  articles = articles.filter(a => a._id !== payload.articleId)
}
fs.writeFileSync(filePath, JSON.stringify(articles, null, 2))
