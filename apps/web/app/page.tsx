'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface PreviewMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState<PreviewMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPreview(null);

    try {
      const response = await fetch(`http://localhost:8000/api/v1/preview?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch preview');
      }

      const data = await response.json();
      setPreview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Link Preview</h1>
        <p className={styles.subtitle}>Enter a URL to get its preview metadata</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className={styles.input}
            disabled={loading}
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Loading...' : 'Get Preview'}
          </button>
        </form>

        {error && (
          <div className={styles.error}>
            <p>Error: {error}</p>
          </div>
        )}

        {preview && (
          <div className={styles.preview}>
            {preview.image && (
              <img src={preview.image} alt={preview.title || 'Preview'} className={styles.previewImage} />
            )}

            {preview.title && <h2 className={styles.previewTitle}>{preview.title}</h2>}

            {preview.description && <p className={styles.previewDescription}>{preview.description}</p>}
          </div>
        )}
      </main>
    </div>
  );
}