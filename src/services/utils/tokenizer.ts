class Tokenizer {
  private avgCharsPerToken = 4;

  public count(text: string): number {
    return Math.ceil(text.length / this.avgCharsPerToken);
  }

  public truncateToTokens(text: string, maxTokens: number): string {
    const maxChars = maxTokens * this.avgCharsPerToken;
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars);
  }
}

export const tokenizer = new Tokenizer();