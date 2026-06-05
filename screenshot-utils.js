export function classifyScreenshotResult(result, existingScreenshotAvailable) {
  if (result.ok) {
    return { ...result, reusedExisting: false };
  }

  if (existingScreenshotAvailable) {
    return {
      ...result,
      ok: true,
      reusedExisting: true
    };
  }

  return {
    ...result,
    ok: false,
    reusedExisting: false
  };
}

export function scoreScreenshotCandidate(candidate, hints = []) {
  const text = String(candidate.text ?? "");
  const width = Number(candidate.width ?? 0);
  const height = Number(candidate.height ?? 0);
  const top = Number(candidate.top ?? 0);
  const areaScore = Math.min((width * height) / 10000, 120);
  const sizePenalty = height < 180 || width < 320 ? 120 : 0;
  const headerPenalty = top < 120 && height < 180 ? 80 : 0;
  const hintScore = hints.reduce((score, hint) => {
    if (!hint) return score;
    return text.includes(hint) ? score + 90 : score;
  }, 0);
  const textScore = Math.min(text.length / 18, 80);

  return areaScore + hintScore + textScore - sizePenalty - headerPenalty;
}
