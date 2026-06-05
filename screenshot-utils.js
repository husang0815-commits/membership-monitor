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
