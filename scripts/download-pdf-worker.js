import fs from "fs"
import https from "https"
import path from "path"

const version = "3.11.174" // Use a stable version
const workerUrl = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.js`
const outputPath = path.join(process.cwd(), "public", "pdf.worker.min.js")

console.log(`Downloading PDF.js worker from ${workerUrl}...`)

https
  .get(workerUrl, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download worker: ${response.statusCode} ${response.statusMessage}`)
      return
    }

    const file = fs.createWriteStream(outputPath)
    response.pipe(file)

    file.on("finish", () => {
      file.close()
      console.log(`PDF.js worker downloaded successfully to ${outputPath}`)
    })
  })
  .on("error", (err) => {
    console.error(`Error downloading PDF.js worker: ${err.message}`)
    fs.unlink(outputPath, () => {}) // Clean up partial file
  })
