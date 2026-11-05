# Changelog

## 3.6.0 — Simplification and voice stability work

- Simplified Home, Practice, Library, Progress and Settings; removed extra Library filters, favourite controls and duplicate Home shortcuts.
- Kept the four main navigation destinations and the Settings shortcut.
- Kept exactly two voice choices per language: System/Jarvis for German and System/Amy for English.
- First-launch voice downloads run sequentially in the background; the system voice remains available during downloads.
- Kept voice weights out of the app bundle. Models are streamed into OPFS; runtime assets are cached by the service worker.
- Waited for the service worker to control the page before starting the virtual runtime-asset downloads, avoiding a first-launch cache race.
- Removed repeated runtime-asset draining before each inference; the Worker loads the required cached scripts and WASM assets when it initializes.
- Pinned ONNX Runtime Web 1.18.0's WASM-only bundle and one-thread execution, avoiding the newer default JSEP bundle implicated in Safari/WebKit memory reports.
- Kept inference in a dedicated Worker, reused the phonemizer and active-language session, and released the previous session when switching languages.
- Corrected model-cache handling: legacy Thorsten files are no longer relabelled as Jarvis. The old MLS/Thorsten/Amy cache is cleaned and the two selected models are downloaded from their configured sources.
- Added stronger voice-config and model-file checks, explicit ONNX tensor dimensions, phoneme-ID range validation and a bounded text length for neural inference.
- Added graceful system-voice fallback and release of audio/Worker resources when the app is backgrounded.
- Cached practice availability until the user's vocabulary changes and retained 100-word Library pagination.
- Preserved CSV/TSV import/export, all 17 columns, independent Leitner/SM-2 schedules, user-only vocabulary, individual deletion and CSV-batch deletion.

## Validation

- Automated Node suite: 42 tests pass.
- JavaScript syntax, HTML ID references, service-worker asset list, manifest, CSV template and ZIP integrity are checked before packaging.
- Mocked Worker tests do not prove that the real downloaded ONNX files synthesize correctly.
- No physical iPhone 16 / iOS 26 test has been performed; do not claim iPhone verification.
