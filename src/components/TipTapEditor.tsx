import React, { useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  ImageIcon,
  Upload,
  Link as LinkIcon,
  Sparkles,
  Undo,
  Redo,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  theme?: string;
}

export const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-xl border border-white/20 my-4 max-h-[420px] object-cover w-full",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-400 underline decoration-blue-500/50 hover:text-blue-300 transition-colors",
        },
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content || "<p>Commencez à rédiger votre article ici...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[320px] p-4 text-xs sm:text-sm text-zinc-200 leading-relaxed focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Mettre à jour le contenu si la prop externe change
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  // Option 1 : Insérer une image via une URL externe
  const addImageByUrl = () => {
    const url = window.prompt("URL de l'image (ex: https://images.unsplash.com/...) :");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Option 2 : Uploader un fichier image local vers Supabase Storage et l'insérer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `editor-${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file);

      if (uploadError) {
        alert("Erreur lors de l'envoi de l'image sur Supabase Storage : " + uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("site-assets").getPublicUrl(filePath);

      if (data?.publicUrl) {
        editor.chain().focus().setImage({ src: data.publicUrl }).run();
      }
    } catch (err) {
      console.error("Erreur d'upload TipTap:", err);
      alert("Une erreur est survenue lors de l'envoi de l'image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL du lien :", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertKeyTakeawayBlock = () => {
    editor
      .chain()
      .focus()
      .insertContent(
        `<blockquote class="p-4 my-4 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-200 text-xs font-medium"><strong>💡 Point Clé :</strong> Saisissez votre point fort ici...</blockquote>`
      )
      .run();
  };

  return (
    <div className="rounded-2xl border border-blue-500/20 glass-card overflow-hidden shadow-xl">
      {/* Input de fichier caché pour l'upload PC */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Barre d'outils (Toolbar) */}
      <div className="p-2 sm:p-3 border-b border-white/10 bg-black/40 backdrop-blur-md flex flex-wrap items-center gap-1 sm:gap-1.5 text-zinc-300">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg text-xs font-medium transition-all ${
            editor.isActive("bold")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Gras"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg text-xs transition-all ${
            editor.isActive("italic")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Italique"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-lg text-xs transition-all ${
            editor.isActive("strike")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Barré"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded-lg text-xs transition-all ${
            editor.isActive("code")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Code en ligne"
        >
          <Code className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg text-xs font-bold transition-all ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Titre H2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg text-xs font-bold transition-all ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Titre H3"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg text-xs transition-all ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Liste à puces"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg text-xs transition-all ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Liste numérotée"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg text-xs transition-all ${
            editor.isActive("blockquote")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Citation"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded-lg text-xs transition-all ${
            editor.isActive("codeBlock")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Bloc de code"
        >
          <Code2 className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded-lg text-xs transition-all ${
            editor.isActive("link")
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "hover:bg-white/10 hover:text-white"
          }`}
          title="Insérer un lien"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>

        {/* Image via URL externe */}
        <button
          type="button"
          onClick={addImageByUrl}
          className="p-2 rounded-lg text-xs hover:bg-white/10 hover:text-white transition-all"
          title="Insérer une image via une URL"
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>

        {/* Upload d'image PC vers Supabase Storage */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold flex items-center gap-1 transition-all disabled:opacity-50"
          title="Uploader une image depuis votre ordinateur"
        >
          {isUploading ? (
            <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
          ) : (
            <Upload className="w-3 h-3 text-blue-400" />
          )}
          <span>Image PC</span>
        </button>

        <button
          type="button"
          onClick={insertKeyTakeawayBlock}
          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1 transition-all"
          title="Insérer un encadré 'Point Clé'"
        >
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>Point Clé</span>
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded-lg text-xs hover:bg-white/10 disabled:opacity-30 transition-all"
            title="Annuler"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded-lg text-xs hover:bg-white/10 disabled:opacity-30 transition-all"
            title="Rétablir"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Zone de texte éditable */}
      <div className="bg-black/20 backdrop-blur-sm">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};