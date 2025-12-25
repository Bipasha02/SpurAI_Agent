export function validateMessage(text: string): { valid: boolean; message?: string } {
  if (!text || text.trim() === '') {
    return { valid: false, message: 'Message cannot be empty.' };
  }
  if (text.length > 500) {
    return { valid: true, message: 'Message was truncated to 500 characters.' };
  }
  return { valid: true };
}