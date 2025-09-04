
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabLayout } from "@/components/ui/tab-layout";
import { FileText, Upload, Download, Calendar, User, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  category: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Energideklaration_2024.pdf",
    type: "PDF",
    size: "2.3 MB",
    uploadedBy: "Anna Andersson",
    uploadedDate: "2024-03-15",
    category: "Energi"
  },
  {
    id: "2",
    name: "Besiktningsprotokoll_Ventilation.pdf",
    type: "PDF",
    size: "1.8 MB",
    uploadedBy: "Erik Nilsson",
    uploadedDate: "2024-02-28",
    category: "Besiktning"
  },
  {
    id: "3",
    name: "Ritningar_Fasad.dwg",
    type: "DWG",
    size: "5.1 MB",
    uploadedBy: "Maria Svensson",
    uploadedDate: "2024-01-12",
    category: "Ritningar"
  },
  {
    id: "4",
    name: "Garantihandlingar_Hiss.xlsx",
    type: "Excel",
    size: "0.9 MB",
    uploadedBy: "Johan Larsson",
    uploadedDate: "2023-12-08",
    category: "Garanti"
  }
];

export const PropertyDocumentsTab = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulera upload
    setTimeout(() => {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('excel') ? 'Excel' : 'Okänd',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedBy: "Du",
        uploadedDate: new Date().toISOString().split('T')[0],
        category: "Övrigt"
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      setIsUploading(false);
      
      toast({
        title: "Dokument uppladdat",
        description: `${file.name} har laddats upp framgångsrikt.`,
      });
      
      // Rensa input
      event.target.value = '';
    }, 2000);
  };

  const handleDownload = (document: Document) => {
    toast({
      title: "Laddar ner",
      description: `${document.name} laddas ner...`,
    });
  };

  const handleDelete = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "Dokument borttaget",
      description: "Dokumentet har tagits bort.",
      variant: "destructive"
    });
  };



  return (
    <TabLayout 
      title="Dokument" 
      icon={FileText}
      count={documents.length}
      showCard={true}
    >
      {/* Upload sektion */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
        <div className="text-center space-y-4">
          <Upload className="h-8 w-8 text-gray-400 mx-auto" />
          <div>
            <Label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="outline" disabled={isUploading} asChild>
                <span>
                  {isUploading ? "Laddar upp..." : "Välj fil att ladda upp"}
                </span>
              </Button>
            </Label>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.jpg,.jpeg,.png"
              disabled={isUploading}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Stöder PDF, Word, Excel, DWG, och bildformaten. Max 10 MB.
          </p>
        </div>
      </div>

      {/* Dokumentlista */}
      <div className="space-y-3">
        {documents.map((document) => (
          <Card key={document.id} className="p-4">
            {isMobile ? (
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-base mb-2">{document.name}</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{document.uploadedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{document.uploadedDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{document.size}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {document.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(document)}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(document.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{document.name}</h4>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {document.uploadedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {document.uploadedDate}
                      </span>
                      <span>{document.size}</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                        {document.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(document)}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(document.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground">Inga dokument uppladdade än</p>
          <p className="text-sm text-muted-foreground mt-1">
            Ladda upp ditt första dokument för att komma igång
          </p>
        </div>
      )}
    </TabLayout>
  );
};
