# Changelog

All notable changes to ET will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-11-27

### Changed
- Selection icon positioning: the ET icon now prefers appearing to the right of where the selection ends. When there is no room on the right edge of the viewport, it tucks in just above (or below) the end of the selection aligned to its right edge, instead of being clamped onto the screen edge where it overlapped page text.

## [0.1.0] - 2026-11-26

### Added
- Selection-triggered ET action icon with in-page Shadow DOM popup.
- Translation of selected English text into Chinese, Japanese, Korean, French, German, and Spanish via Google's public web translation endpoint.
- Single-word dictionary lookup (IPA + up to 3 definitions) via the Free Dictionary API.
- British (`en-GB`) and American (`en-US`) pronunciation playback using browser SpeechSynthesis.
- Save selected words locally with `chrome.storage.local`.
- Pin / swap-language / close controls on the translation card.

### Known limitations (MVP)
- Translation and dictionary endpoints are public web APIs, not official commercial APIs — availability is best-effort.
- Pronunciation depends on voices installed by the OS/browser; a matching `en-GB`/`en-US` voice may not exist on every device.
- No automated tests yet.

[0.1.0]: https://github.com/ZXQ1227/ET-Chrome-Extension/releases/tag/v0.1.0
