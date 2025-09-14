// Google Vision API integration for OCR
export class GoogleVisionService {
  private static instance: GoogleVisionService;
  private apiKey: string;

  public static getInstance(): GoogleVisionService {
    if (!GoogleVisionService.instance) {
      GoogleVisionService.instance = new GoogleVisionService();
    }
    return GoogleVisionService.instance;
  }

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY || '';
  }

  async extractTextFromImage(imageData: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Google Vision API key not configured');
    }

    try {
      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: imageData.split(',')[1], // Remove data:image/jpeg;base64, prefix
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                  maxResults: 1,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Google Vision API error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.responses || !data.responses[0] || !data.responses[0].textAnnotations) {
        throw new Error('No text detected in image');
      }

      return data.responses[0].textAnnotations[0].description;
    } catch (error) {
      console.error('Error extracting text from image:', error);
      throw new Error('Failed to process receipt image');
    }
  }

  // Convert file to base64
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

export const googleVisionService = GoogleVisionService.getInstance();

