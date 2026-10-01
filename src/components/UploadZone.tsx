'use client';

import React, { useState, useRef, useEffect, useCallback, DragEvent } from 'react';
import NextImage from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
  disabled?: boolean;
  error?: string | null;
}

type PreviewFile = File & { preview: string };
const SUPPORTED_IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);

export default function UploadZone({ onUpload, isLoading, disabled, error }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewFile, setPreviewFile] = useState<PreviewFile | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback((file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Canvas unavailable'));
          return;
        }

        let { naturalWidth: w, naturalHeight: h } = img;
        const MAX_WIDTH = 1080;
        if (w > MAX_WIDTH) {
          h = Math.round((h * MAX_WIDTH) / w);
          w = MAX_WIDTH;
        }
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);
            if (!blob) {
              reject(new Error('Compression failed'));
              return;
            }
            const compressed = new File([blob], file.name, {
              type: 'image/png',
              lastModified: Date.now(),
            });
            resolve(compressed);
          },
          'image/png',
          0.9
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('Invalid image'));
      };

      img.src = objectUrl;
    });
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
      setLocalError('Choose a PNG, JPG, WebP or GIF screenshot.');
      return;
    }

    setLocalError(null);
    setIsProcessing(true);
    try {
      const finalFile = file.size > 5 * 1024 * 1024 ? await compressImage(file) : file;
      const preview: PreviewFile = new File([finalFile], finalFile.name, {
        type: finalFile.type,
        lastModified: finalFile.lastModified,
      }) as PreviewFile;
      Object.assign(preview, { preview: URL.createObjectURL(finalFile) });
      setPreviewFile(preview);
    } catch {
      setLocalError('Could not prepare this image. Try a smaller PNG or JPG screenshot.');
    } finally {
      setIsProcessing(false);
    }
  }, [compressImage]);

  useEffect(() => {
    if (previewFile || disabled || isLoading) return;
    const handleWindowPaste = (event: globalThis.ClipboardEvent) => {
      const imageItem = Array.from(event.clipboardData?.items || []).find((item) => item.type.startsWith('image/'));
      const file = imageItem?.getAsFile();
      if (file) void handleFile(file);
    };
    window.addEventListener('paste', handleWindowPaste);
    return () => window.removeEventListener('paste', handleWindowPaste);
  }, [previewFile, disabled, isLoading, handleFile]);

  useEffect(() => () => {
    if (previewFile?.preview) URL.revokeObjectURL(previewFile.preview);
  }, [previewFile]);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled || isLoading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleRemove = () => {
    setPreviewFile(null);
    setLocalError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {!previewFile ? (
        <>
          <div
            className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl bg-[#0F0F11]/50 transition-all duration-200 ${
              dragActive
                ? 'border-[#FF006E] bg-[#FF006E]/5 shadow-[0_0_25px_rgba(255,0,110,0.3)]'
                : 'border-[#27272A] hover:border-[#3A3A3A]'
            } ${disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
            onDrop={handleDrop}
            onDragOver={handleDrag}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              id="screenshot-upload"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
              }}
              disabled={disabled || isLoading}
            />
            <label
              htmlFor="screenshot-upload"
              className={`flex flex-col items-center justify-center gap-3 w-full py-10 sm:py-12 px-4 ${
                disabled || isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div
                className={`p-4 rounded-xl bg-[#1A1A1A] border transition-all ${
                  dragActive
                    ? 'border-[#FF006E] shadow-[0_0_15px_rgba(255,0,110,0.4)]'
                    : 'border-[#27272A]'
                }`}
              >
                <Upload className={`w-7 h-7 text-[#FF006E] ${isLoading ? 'animate-pulse' : ''}`} />
              </div>
              <div className="text-center">
                <span className="font-display font-bold text-white text-lg block mb-1">
                  {isProcessing ? 'Preparing your screenshot...' : 'Drop your screenshot'}
                </span>
                <span className="text-sm text-neutral-400 block">or tap to upload (PNG, JPG, WebP or GIF, max 5MB)</span>
                <span className="text-xs font-mono text-neutral-500 mt-2 block">Paste a screenshot with Ctrl+V / ⌘V</span>
              </div>
            </label>
          </div>

          {(localError || error) && (
            <div className="mt-3 text-sm font-mono text-[#FF2D2D] bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-lg px-3 py-2 flex items-center gap-2">
              <span>💀</span>
              <span>{localError || error}</span>
            </div>
          )}
        </>
      ) : (
        <div className="relative aspect-[9/16] max-w-xs mx-auto rounded-xl overflow-hidden border border-[#27272A] bg-[#0A0A0A]">
          <NextImage
            src={previewFile.preview}
            alt="Preview of selected screenshot"
            fill
            unoptimized
            sizes="(max-width: 384px) 100vw, 384px"
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove selected screenshot"
            className="absolute top-2 right-2 p-1 rounded-full bg-[#FF2D2D]/20 hover:bg-[#FF2D2D]/40 text-[#FF2D2D] transition-colors"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
          </button>
          {isLoading && (
            <div className="absolute inset-0 bg-[#0A0A0A]/80 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#FF006E]" />
              <span className="text-xs font-mono text-neutral-300">A.U.R.A. is analyzing...</span>
            </div>
          )}
        </div>
      )}

      {previewFile && (
        <button
          type="button"
          onClick={() => onUpload(previewFile)}
          disabled={disabled || isLoading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF006E] px-4 py-4 font-display text-sm font-bold tracking-wider text-white shadow-[0_0_20px_rgba(255,0,110,0.3)] transition hover:bg-[#ff1a7d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload className="h-4 w-4" /> SCAN MY AURA
        </button>
      )}
    </div>
  );
}
