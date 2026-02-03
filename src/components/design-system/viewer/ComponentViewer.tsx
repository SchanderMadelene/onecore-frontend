import { useState, ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Code, Settings, FileText } from "lucide-react";
import { ComponentDefinition, ComponentState, ViewMode } from "./types";
import { CodeBlock } from "./CodeBlock";
import { PropsTable } from "./PropsTable";
import { ControlsPanel } from "./ControlsPanel";
import { cn } from "@/lib/utils";

interface ComponentViewerProps {
  definition: ComponentDefinition;
  children: (props: ComponentState) => ReactNode;
  defaultProps?: ComponentState;
  className?: string;
}

export const ComponentViewer = ({
  definition,
  children,
  defaultProps = {},
  className,
}: ComponentViewerProps) => {
  // Initialize state with defaults from definition + passed defaults
  const getInitialState = (): ComponentState => {
    const state: ComponentState = { ...defaultProps };
    definition.props.forEach((prop) => {
      if (state[prop.name] === undefined && prop.default !== undefined) {
        // Convert default value based on control type
        if (prop.control === "boolean") {
          state[prop.name] = prop.default === "true";
        } else if (prop.control === "number") {
          state[prop.name] = Number(prop.default);
        } else {
          state[prop.name] = prop.default;
        }
      }
    });
    return state;
  };

  const [propValues, setPropValues] = useState<ComponentState>(getInitialState);
  const [viewMode, setViewMode] = useState<ViewMode>("interactive");

  const handlePropChange = (name: string, value: unknown) => {
    setPropValues((prev) => ({ ...prev, [name]: value }));
  };

  // Generate code example based on current props
  const generateCode = (): string => {
    const propsString = Object.entries(propValues)
      .filter(([key, value]) => {
        // Find the prop definition to check default
        const propDef = definition.props.find((p) => p.name === key);
        if (!propDef) return false;
        // Don't include if it's the default value
        if (propDef.default !== undefined) {
          if (propDef.control === "boolean") {
            return value !== (propDef.default === "true");
          }
          return String(value) !== propDef.default;
        }
        return value !== undefined && value !== "";
      })
      .map(([key, value]) => {
        if (typeof value === "boolean") {
          return value ? key : `${key}={false}`;
        }
        if (typeof value === "string") {
          return `${key}="${value}"`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(" ");

    const hasChildren = definition.props.some((p) => p.name === "children");
    const childrenValue = propValues.children || definition.name;

    if (hasChildren && childrenValue) {
      return `<${definition.name}${propsString ? ` ${propsString}` : ""}>\n  ${childrenValue}\n</${definition.name}>`;
    }

    return `<${definition.name}${propsString ? ` ${propsString}` : ""} />`;
  };

  // Filter controllable props (excluding children for controls)
  const controllableProps = definition.props.filter((p) => p.name !== "children");

  const categoryLabels: Record<string, string> = {
    ui: "UI",
    form: "Formulär",
    layout: "Layout",
    feedback: "Feedback",
    navigation: "Navigation",
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              {definition.name}
              <Badge variant="secondary" className="text-xs font-normal">
                {categoryLabels[definition.category]}
              </Badge>
            </CardTitle>
            <CardDescription className="mt-1.5">
              {definition.description}
            </CardDescription>
          </div>
          <code className="text-xs bg-muted px-2 py-1 rounded font-mono text-muted-foreground">
            {definition.importPath}
          </code>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="canvas" className="w-full">
          <div className="px-6 border-b">
            <TabsList className="h-10 bg-transparent p-0 gap-4">
              <TabsTrigger
                value="canvas"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-3"
              >
                <Eye className="h-4 w-4 mr-1.5" />
                Canvas
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-3"
              >
                <Code className="h-4 w-4 mr-1.5" />
                Kod
              </TabsTrigger>
              <TabsTrigger
                value="props"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1 pb-3"
              >
                <FileText className="h-4 w-4 mr-1.5" />
                Props
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Main content area */}
            <div className="flex-1 min-w-0">
              <TabsContent value="canvas" className="m-0 p-6">
                <div className="flex items-center justify-center min-h-[120px] p-6 bg-muted/30 rounded-lg border-2 border-dashed">
                  {children(propValues)}
                </div>
                {definition.usage && (
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    {definition.usage}
                  </p>
                )}
              </TabsContent>

              <TabsContent value="code" className="m-0">
                <CodeBlock code={generateCode()} showLineNumbers />
              </TabsContent>

              <TabsContent value="props" className="m-0 p-6">
                <PropsTable props={definition.props} />
              </TabsContent>
            </div>

            {/* Controls sidebar - visible on desktop */}
            {controllableProps.length > 0 && (
              <div className="w-full lg:w-72 border-t lg:border-t-0 lg:border-l bg-muted/20 p-4">
                <ControlsPanel
                  props={controllableProps}
                  values={propValues}
                  onChange={handlePropChange}
                />
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
