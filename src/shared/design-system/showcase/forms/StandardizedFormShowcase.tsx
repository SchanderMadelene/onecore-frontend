
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export const StandardizedFormShowcase = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    description: "",
    priority: "",
    notifications: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standardized Form Layout</CardTitle>
        <CardDescription>Consistent form styling using FormWrapper</CardDescription>
      </CardHeader>
      <CardContent>
        <FormWrapper onSubmit={handleSubmit} maxHeight="60vh">
          <div className="space-y-2">
            <Label htmlFor="name">Namn</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ange ditt namn" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-post</Label>
            <Input 
              id="email" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="din@email.se" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Välj kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="sales">Försäljning</SelectItem>
                <SelectItem value="technical">Teknisk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea 
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Beskriv ditt ärende..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Prioritet</Label>
            <RadioGroup 
              value={formData.priority} 
              onValueChange={(value) => setFormData({...formData, priority: value})}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="cursor-pointer">Låg</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="cursor-pointer">Hög</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notifications" 
              checked={formData.notifications}
              onCheckedChange={(checked) => setFormData({...formData, notifications: !!checked})}
            />
            <Label htmlFor="notifications" className="cursor-pointer">
              Få notifikationer via e-post
            </Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-border">
            <Button variant="outline" type="button">
              Avbryt
            </Button>
            <Button type="submit">Skicka</Button>
          </div>
        </FormWrapper>
      </CardContent>
    </Card>
  );
};
