"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { checkEssayCoherence, calculateWordCount, formatWordCount } from "@/lib/essay-coherence";
import { useToast } from "@/components/ui/use-toast";

interface Essay {
  id: string;
  content: string;
  prompt: string;
  wordCount: number;
  university: string;
}

interface CoherenceResult {
  score: number;
  feedback: string[];
  suggestions: string[];
  themes: string[];
}

export default function EssayCoherencePage() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [currentEssay, setCurrentEssay] = useState<Partial<Essay>>({
    content: "",
    prompt: "",
    university: "",
  });
  const [coherenceResult, setCoherenceResult] = useState<CoherenceResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleAddEssay = () => {
    if (!currentEssay.content || !currentEssay.prompt || !currentEssay.university) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before adding an essay.",
        variant: "destructive",
      });
      return;
    }

    const newEssay: Essay = {
      id: Date.now().toString(),
      content: currentEssay.content,
      prompt: currentEssay.prompt,
      university: currentEssay.university,
      wordCount: calculateWordCount(currentEssay.content),
    };

    setEssays([...essays, newEssay]);
    setCurrentEssay({
      content: "",
      prompt: "",
      university: "",
    });

    toast({
      title: "Essay Added",
      description: "Your essay has been added to the analysis.",
    });
  };

  const handleAnalyzeCoherence = async () => {
    if (essays.length < 2) {
      toast({
        title: "Not Enough Essays",
        description: "Please add at least 2 essays to analyze coherence.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await checkEssayCoherence(essays);
      setCoherenceResult(result);
      toast({
        title: "Analysis Complete",
        description: "Your essays have been analyzed for coherence.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your essays.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Essay Coherence Analysis</h1>
      
      <Tabs defaultValue="add" className="space-y-4">
        <TabsList>
          <TabsTrigger value="add">Add Essays</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Essay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={currentEssay.university}
                  onChange={(e) =>
                    setCurrentEssay({ ...currentEssay, university: e.target.value })
                  }
                  placeholder="Enter university name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Essay Prompt</Label>
                <Input
                  id="prompt"
                  value={currentEssay.prompt}
                  onChange={(e) =>
                    setCurrentEssay({ ...currentEssay, prompt: e.target.value })
                  }
                  placeholder="Enter essay prompt"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Essay Content</Label>
                <Textarea
                  id="content"
                  value={currentEssay.content}
                  onChange={(e) =>
                    setCurrentEssay({ ...currentEssay, content: e.target.value })
                  }
                  placeholder="Enter your essay content"
                  className="min-h-[200px]"
                />
                {currentEssay.content && (
                  <p className="text-sm text-muted-foreground">
                    {formatWordCount(calculateWordCount(currentEssay.content), 650)}
                  </p>
                )}
              </div>

              <Button onClick={handleAddEssay}>Add Essay</Button>
            </CardContent>
          </Card>

          {essays.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Added Essays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {essays.map((essay) => (
                    <div
                      key={essay.id}
                      className="p-4 border rounded-lg space-y-2"
                    >
                      <h3 className="font-semibold">{essay.university}</h3>
                      <p className="text-sm text-muted-foreground">
                        {essay.prompt}
                      </p>
                      <p className="text-sm">
                        {formatWordCount(essay.wordCount, 650)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          {coherenceResult ? (
            <Card>
              <CardHeader>
                <CardTitle>Coherence Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Overall Coherence Score</h3>
                  <div className="flex items-center space-x-4">
                    <Progress value={coherenceResult.score * 100} className="w-full" />
                    <span className="text-sm font-medium">
                      {(coherenceResult.score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Key Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {coherenceResult.themes.map((theme) => (
                      <Badge key={theme} variant="secondary">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Feedback</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {coherenceResult.feedback.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Suggestions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {coherenceResult.suggestions.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Add at least 2 essays to analyze their coherence.</p>
                <Button
                  onClick={handleAnalyzeCoherence}
                  disabled={isAnalyzing || essays.length < 2}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Coherence"}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 