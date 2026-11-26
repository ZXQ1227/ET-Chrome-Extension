# Contributing to ET

Thanks for your interest in improving ET! This is an early-stage MVP, so the codebase is intentionally small (a single content script + manifest). That should make it easy to get started.

## Ways to contribute

- **Bug reports** — open an Issue with the website URL, Chrome version, OS, and steps to reproduce.
- **Site compatibility** — report pages where text selection, the ET icon, or the popup positioning misbehave (e.g. Google Docs, PDF viewers, SPAs).
- **Features** — check the Roadmap in the README first; pick anything marked as open, or propose a new one in an Issue before opening a large PR.
- **Docs & i18n** — improvements to the README and UI copy translations are always welcome.

## Development setup

1. Clone this repository.
2. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the cloned folder.
3. After editing `content.js`, click the reload icon on the extension card, then refresh the target page.

There is no build step or dependency — plain HTML/CSS/JS only.

## Code style

- Keep the extension dependency-free and build-free.
- The in-page UI lives inside a Shadow DOM host (`#et-extension-host`) to avoid clashing with page styles — keep it that way.
- All dynamic HTML insertion must be escaped (`escapeHtml`) to avoid injecting page/translation content as markup.
- Keep permissions in `manifest.json` minimal. New host permissions need justification in the PR description.

## Pull requests

1. Fork the repo and create a branch from `main`.
2. Keep PRs focused: one feature or fix per PR.
3. Describe what you changed and how to test it manually.
4. Make sure the extension still works after a reload on a few different sites (article page, SPA, PDF viewer if relevant).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
