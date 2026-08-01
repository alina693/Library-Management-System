# How to record the demo GIF

This shows a recruiter that the app is genuinely connected to a live database — not just a nice-looking frontend.

## What to capture

A short (10-15 second) screen recording split into two halves of your screen:
- **Left half:** your website (`index.html`) open in the browser
- **Right half:** your Neon dashboard, on the **Tables → books** view

Then:
1. On the website, click **+ Add Book**, type a title (e.g. "1984"), and submit
2. Switch to the Neon tab and click the small **refresh icon** near the table
3. Show the new row appearing in Neon
4. (Optional) Go back to the website, delete that book, then refresh Neon again to show the row disappearing

## Free tools to record this

- **Windows:** [ScreenToGif](https://www.screentogif.com/) — free, records directly to GIF
- **Mac:** built-in screen recording (Cmd+Shift+5), then convert the video to GIF using [ezgif.com/video-to-gif](https://ezgif.com/video-to-gif)
- **Any OS:** [Kap](https://getkap.co/) (Mac) or [Loom](https://www.loom.com/) (records a shareable video link instead of a GIF — also fine, just link it in the README instead of embedding)

## Where to put it

Save the file as:
```
docs/screenshots/demo.gif
```
That's the exact path the README already links to, so once you drop the file there, it will show up automatically on your GitHub repo page.

## Tip

Keep the GIF under ~5MB so it loads fast on GitHub. Trim it down to just the essential moment (add → refresh → see it appear) rather than a long recording.
