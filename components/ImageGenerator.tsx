import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Image as ImageIcon, Loader2, Download, Wand2, Check } from 'lucide-react';

interface ImageGeneratorProps {
  onClose: () => void;
  initialPrompt?: string;
  initialReferenceImage?: string;
  initialAspectRatio?: string;
  onApply?: (imageUrl: string) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ 
  onClose, 
  initialPrompt = 'A cheerful display of colorful wooden toys in a bright retail store setting, professional photography, 4k',
  initialReferenceImage,
  initialAspectRatio = '16:9',
  onApply
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState(initialAspectRatio);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(initialReferenceImage || null);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    try {
      if ((window as any).aistudio && !await (window as any).aistudio.hasSelectedApiKey()) {
         await (window as any).aistudio.openSelectKey();
      }
    } catch (e) {
      console.error("API Key check failed", e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
       if ((window as any).aistudio && !await (window as any).aistudio.hasSelectedApiKey()) {
         await (window as any).aistudio.openSelectKey();
       }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const parts: any[] = [];
      
      if (referenceImage) {
         try {
             // Handle both data URLs and regular URLs by fetching if needed
             let base64Data = '';
             if (referenceImage.startsWith('data:')) {
                 base64Data = referenceImage.split(',')[1];
             } else {
                 // For static assets, we need to fetch and convert to base64
                 // Note: This might fail with CORS if the image server doesn't allow it.
                 // In a real app, you'd proxy this. For this demo, we'll try/catch.
                 const resp = await fetch(referenceImage);
                 const blob = await resp.blob();
                 base64Data = await new Promise((resolve) => {
                     const reader = new FileReader();
                     reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
                     reader.readAsDataURL(blob);
                 }) as string;
             }

             parts.push({
                 inlineData: {
                     data: base64Data,
                     mimeType: 'image/jpeg'
                 }
             });
         } catch (e) {
             console.warn("Could not load reference image for API", e);
             // Proceed without reference image if it fails (e.g. CORS)
         }
      }
      
      parts.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts },
        config: {
          imageConfig: {
            imageSize: size,
            aspectRatio: aspectRatio
          }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } else {
        setError('No image generated. Please try again.');
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
      if (generatedImage && onApply) {
          onApply(generatedImage);
          onClose();
      }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col md:flex-row">
        
        {/* Controls Side */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#0f172a] flex items-center gap-2">
                <Wand2 className="text-[#dc2626]" size={20}/> Nano Banana Pro
            </h2>
            <button onClick={onClose} className="md:hidden text-gray-500"><X size={24}/></button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a] outline-none resize-none"
                placeholder="Describe the image you need..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Reference Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors relative group">
                <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" />
                {referenceImage ? (
                    <div className="relative">
                        <img src={referenceImage} alt="Reference" className="h-24 mx-auto object-contain rounded shadow-sm" />
                        <div className="text-[10px] text-gray-500 mt-2">Click to replace</div>
                    </div>
                ) : (
                    <div className="text-gray-400 text-xs flex flex-col items-center py-4">
                        <ImageIcon size={24} className="mb-2"/>
                        <span>Upload Reference</span>
                    </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Resolution</label>
                    <div className="flex bg-white rounded-lg border border-gray-300 p-1">
                        {['1K', '2K', '4K'].map((s) => (
                        <button 
                            key={s}
                            onClick={() => setSize(s as any)}
                            className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${size === s ? 'bg-[#0f172a] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {s}
                        </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Aspect Ratio</label>
                    <select 
                        value={aspectRatio} 
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-1 focus:ring-[#0f172a] outline-none"
                    >
                        <option value="16:9">16:9 (Landscape)</option>
                        <option value="1:1">1:1 (Square)</option>
                        <option value="4:3">4:3 (Standard)</option>
                        <option value="3:4">3:4 (Portrait)</option>
                        <option value="9:16">9:16 (Mobile)</option>
                    </select>
                </div>
            </div>

            <button 
              onClick={generateImage}
              disabled={isGenerating}
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shadow-sm"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
              Generate Asset
            </button>
            
            <div className="text-[10px] text-gray-400 text-center leading-tight">
                Model: gemini-3-pro-image-preview
            </div>
          </div>
        </div>

        {/* Preview Side */}
        <div className="flex-1 bg-[#1e293b] flex flex-col relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white hidden md:block z-10 bg-black/20 p-2 rounded-full backdrop-blur-sm"><X size={24}/></button>
          
          <div className="flex-1 flex items-center justify-center p-8 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
            {isGenerating ? (
               <div className="text-center text-white/80">
                 <div className="relative">
                    <div className="absolute inset-0 bg-[#dc2626] blur-xl opacity-20 animate-pulse rounded-full"></div>
                    <Loader2 size={64} className="animate-spin mx-auto mb-6 relative z-10"/>
                 </div>
                 <p className="text-lg font-light tracking-wide animate-pulse">Designing your asset...</p>
                 <p className="text-xs text-white/40 mt-2">This may take a few seconds</p>
               </div>
            ) : generatedImage ? (
                <div className="relative group">
                    <img src={generatedImage} alt="Generated Asset" className="max-w-full max-h-[70vh] object-contain shadow-2xl rounded-lg ring-1 ring-white/10" />
                    <div className="absolute inset-0 ring-4 ring-[#dc2626]/50 rounded-lg opacity-0 animate-pulse pointer-events-none"></div>
                </div>
            ) : (
                <div className="text-center text-white/20 border-2 border-dashed border-white/10 rounded-2xl p-16">
                    <ImageIcon size={80} className="mx-auto mb-4"/>
                    <p className="text-lg font-light">Preview Area</p>
                </div>
            )}
          </div>

          {generatedImage && (
              <div className="p-6 bg-[#0f172a] border-t border-white/10 flex justify-between items-center">
                  <div className="text-white/60 text-xs">
                      Generated with Gemini 3 Pro
                  </div>
                  <div className="flex gap-3">
                    <a href={generatedImage} download="toysinbulk-asset.png" className="bg-white/10 text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-white/20 transition-colors text-sm">
                        <Download size={16}/> Download
                    </a>
                    {onApply && (
                        <button onClick={handleApply} className="bg-[#dc2626] text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#b91c1c] transition-colors shadow-lg shadow-red-900/20 text-sm">
                            <Check size={16}/> Apply to Website
                        </button>
                    )}
                  </div>
              </div>
          )}
          
          {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-500/90 text-white p-4 rounded-lg text-center backdrop-blur-md shadow-lg animate-in slide-in-from-bottom-2">
                  {error}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};