const SHORT_WORDS =
  /(^|[\s([{«„"'])((?:в|во|к|ко|с|со|у|о|об|обо|от|до|по|за|на|из|над|под|при|без|для|про|через|и|а|но|да|или))\s+/giu;

export function preventHangingPrepositions(text: string) {
  return text.replace(SHORT_WORDS, "$1$2\u00A0");
}