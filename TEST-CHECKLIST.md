# V3.6.0 validation checklist

## Automated checks

- [x] CSV/TSV parsing, UTF-8 BOM, German umlauts, quoted commas and escaped quotes.
- [x] `german` is the only required CSV field; all other fields remain optional.
- [x] The exact 17-column import/export schema.
- [x] Independent Leitner and SM-2 scheduling.
- [x] Plural distractors come from transformations of the same singular noun and are skipped when safe options are unavailable.
- [x] Verb practice uses only imported, populated verb forms.
- [x] Five app pages and four bottom navigation items.
- [x] Simplified Library with search, edit, individual deletion, CSV import and batch deletion.
- [x] Practice availability is derived from the user's imported data.
- [x] German voice selector contains only System/Jarvis; English contains only System/Amy.
- [x] Worker code uses ONNX Runtime Web 1.18.0 WASM-only and one thread.
- [x] Mocked Worker downloads, OPFS completion markers, session reuse and language switching.
- [x] Legacy MLS/Thorsten cache cleanup; no Thorsten-to-Jarvis relabelling.
- [x] JavaScript syntax, HTML IDs, service-worker core files, manifest JSON and ZIP integrity.

## Still requires real browser/device validation

- [ ] Desktop Chrome/Firefox: first-launch runtime/model downloads complete and models appear in OPFS.
- [ ] Desktop: actual Jarvis and Amy models synthesize a word and a full sentence.
- [ ] Desktop: repeated utterances reuse the same session and do not cause growing memory use.
- [ ] Desktop: switching languages releases the previous session and plays the new voice.
- [ ] iPhone 16 / iOS 26 Safari: app remains responsive during the sequential background downloads.
- [ ] iPhone: Jarvis plays German words and full sentences with umlauts.
- [ ] iPhone: Amy plays English words and full sentences.
- [ ] iPhone: a neural failure immediately falls back to the system voice.
- [ ] iPhone: reload while offline; vocabulary and progress remain available.
- [ ] iPhone: cold-start offline neural playback after runtime assets have been cached.
- [ ] iPhone: interrupted download recovery and storage quota/eviction behaviour.

The real-model and physical-device items above are not covered by the mocked automated tests. Do not describe this release as iPhone-verified until they pass.
