import { Capacitor, registerPlugin } from '@capacitor/core';

export type SaveFileOptions = {
  filename: string;
  mimeType: string;
  base64Data: string;
};

export type SaveFileResult = {
  uri?: string;
};

type AndroidFileSaverPlugin = {
  saveFile(options: SaveFileOptions): Promise<SaveFileResult>;
};

const AndroidFileSaver = registerPlugin<AndroidFileSaverPlugin>('AndroidFileSaver');

async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = bytes.subarray(offset, offset + chunkSize);
    binary += String.fromCharCode(...Array.from(chunk));
  }
  return btoa(binary);
}

export async function saveBlobWithNativePicker(filename: string, blob: Blob): Promise<SaveFileResult | null> {
  if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') return null;

  const base64Data = await blobToBase64(blob);
  return AndroidFileSaver.saveFile({
    filename,
    mimeType: blob.type || 'application/octet-stream',
    base64Data,
  });
}
