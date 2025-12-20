import { BadRequestException, Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';

export interface PreviewMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

@Injectable()
export class AppService {
  async getPreview(url: string): Promise<PreviewMetadata> {
    if (!url) {
      throw new BadRequestException('URL is required');
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      throw new BadRequestException('Invalid URL format');
    }

    try {
      // Fetch the HTML content
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Extract metadata with fallbacks
      const title =
        $('meta[property="og:title"]').attr('content') ||
        $('meta[name="twitter:title"]').attr('content') ||
        $('title').text() ||
        null;

      const description =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="twitter:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        null;

      const image =
        $('meta[property="og:image"]').attr('content') ||
        $('meta[name="twitter:image"]').attr('content') ||
        null;

      return {
        title: title?.trim() || null,
        description: description?.trim() || null,
        image: image?.trim() || null,
      };
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch preview: ${error.message}`
      );
    }
  }
}