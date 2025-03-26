"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"

interface EssayUploadProps {
  onUpload: (content: string) => void
  isUploading: boolean
}

export function EssayUpload({ onUpload, isUploading }: EssayUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      onUpload(text)
      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,.doc,.docx,.pdf"
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload
      </Button>
    </>
  )
} 