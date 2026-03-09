import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ComponentDefinition, ViewMode } from "./types";
import { ControlsPanel } from "./ControlsPanel";
import { CodeBlock } from "./CodeBlock";
import { PropsTable } from "./PropsTable";

interface ComponentViewerProps {
  definition: ComponentDefinition;
}

export const ComponentViewer = ({ definition }: ComponentViewerProps) => {
  const { name, description, component: Component, props: propDefs, defaultCode } = definition;

  const initialValues = useMemo(() => {
    const v: Record<string, any> = {};
    propDefs.forEach((p) => {
      if (p.defaultValue != null) v[p.name] = p.defaultValue;
    });
    return v;
  }, [propDefs]);

  const [values, setValues] = useState<Record<string, any>>(initialValues);

  const handleChange = (propName: string, value: any) => {
    setValues((prev) => ({ ...prev, [propName]: value }));
  };

  const generatedCode = useMemo(() => {
    const propsStr = Object.entries(values)
      .filter(([key, val]) => {
        const def = propDefs.find((p) => p.name === key);
        return def && val !== def.defaultValue;
      })
      .map(([key, val]) => {
        if (typeof val === "boolean") return val ? key : `${key}={false}`;
        if (key === "children") return null;
        return `${key}="${val}"`;
      })
      .filter(Boolean)
      .join(" ");

    const children = values.children ?? name;
    const space = propsStr ? " " : "";
    return `<${name}${space}${propsStr}>${children}</${name}>`;
  }, [values, propDefs, name]);

  // Build component props, filtering out 'children'
  const componentProps = useMemo(() => {
    const p: Record<string, any> = {};
    Object.entries(values).forEach(([k, v]) => {
      if (k !== "children") p[k] = v;
    });
    return p;
  }, [values]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="canvas">
          <TabsList className="mb-4">
            <TabsTrigger value="canvas" className="text-xs">Canvas</TabsTrigger>
            <TabsTrigger value="code" className="text-xs">Code</TabsTrigger>
            <TabsTrigger value="props" className="text-xs">Props</TabsTrigger>
          </TabsList>

          <TabsContent value="canvas">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-4">
              <div className="flex items-center justify-center min-h-[120px] rounded-md border border-dashed bg-background p-6">
                <Component {...componentProps}>
                  {values.children ?? name}
                </Component>
              </div>
              <ControlsPanel props={propDefs} values={values} onChange={handleChange} />
            </div>
          </TabsContent>

          <TabsContent value="code">
            <CodeBlock code={generatedCode} />
          </TabsContent>

          <TabsContent value="props">
            <PropsTable props={propDefs} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
