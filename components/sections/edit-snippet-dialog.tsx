import React, { useState, useEffect } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconX } from "@tabler/icons-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SelectContent } from "@radix-ui/react-select";
import Loader from "../Loader";
import { useRouter } from "next/navigation";
import { SnippetProps } from "@/lib/utils";

// Define the schema for validation
const formSchema = z.object({
  snippetName: z
    .string()
    .min(2)
    .max(100, "Snippet name must be between 2 and 100 characters."),
  category: z.string().min(1, "Please select a category."),
  codeSnippet: z.string().min(1, "Code snippet is required."),
  keywords: z.array(z.string()).optional(),
  isPublic: z.boolean(),
});

const categories = [
  "JavaScript",
  "Python",
  "Java",
  "Ruby",
  "C++",
  "Go",
  "TypeScript",
  "PHP",
  "Swift",
];

const EditSnippetDialog = ({
  Snippet,
  closeDialog,
}: {
  Snippet: SnippetProps;
  closeDialog: () => void;
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Local error message
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      snippetName: "",
      category: "",
      codeSnippet: "",
      keywords: [],
      isPublic: true,
    },
  });

  useEffect(() => {
    form.setValue("snippetName", Snippet.snippetName);
    form.setValue("category", Snippet.category);
    form.setValue("codeSnippet", Snippet.codeSnippet);
    form.setValue("keywords", Snippet.keywords || []); // Initialize keywords
    form.setValue("isPublic", Snippet.isPublic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Snippet]);

  const [keywords, setKeywords] = useState<string[]>(Snippet.keywords || []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const keywordsArray = inputValue
      .split(" ")
      .filter((word) => word.trim() !== "");
    form.setValue("keywords", keywordsArray);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    if (
      e.key === "Enter" ||
      (e.code === "Space" && inputElement.value.trim() !== "")
    ) {
      e.preventDefault();

      const newKeyword = inputElement.value.trim();
      if (newKeyword === "") return;
      setKeywords((prevKeywords) => [...prevKeywords, newKeyword]);
      form.resetField("keywords");
      inputElement.value = "";
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedValues = { ...values, keywords };
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/snippets`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedValues, _id: Snippet._id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update snippet");
      }

      setShowLoader(true);
      closeDialog();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setLoading(false);
      setShowLoader(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/snippets/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: Snippet._id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete snippet");
      }

      setShowLoader(true);
      closeDialog();
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    } finally {
      setLoading(false);
      setShowLoader(false);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((item) => item !== keyword)
    );
  };

  if (showLoader) {
    return <Loader />;
  }

  return (
    <DialogContent className="bg-background border-foreground/30 max-w-6xl w-[90%] overflow-auto max-h-[80vh] flex flex-col justify-start gap-s">
      <DialogTitle className="text-h3">Edit Snippet</DialogTitle>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between w-full gap-xs relative"
        >
          {/* Name and Category */}
          <div className="flex flex-col md:flex-row gap-xxs">
            <FormField
              control={form.control}
              name="snippetName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Snippet Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter snippet name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full md:max-w-sm">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        handleLanguageChange(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border rounded-sm border-foreground/30">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Code Snippet (with syntax highlighting based on category) */}
          <FormField
            control={form.control}
            name="codeSnippet"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel>Code Snippet</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your code here..."
                    rows={8}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                {form.watch("category") && selectedLanguage && (
                  <FormDescription
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center justify-end cursor-pointer"
                  >
                    {showCode ? "Close Editor View" : "Open Editor View"}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Display Syntax Highlighted Code */}
          {selectedLanguage && form.watch("codeSnippet") && showCode && (
            <FormItem>
              <FormLabel>Highlighted Code</FormLabel>
              <FormControl>
                <SyntaxHighlighter
                  language={selectedLanguage.toLowerCase()}
                  style={vscDarkPlus}
                >
                  {form.watch("codeSnippet")}
                </SyntaxHighlighter>
              </FormControl>
            </FormItem>
          )}

          <div className="flex flex-col md:flex-row gap-xxs">
            {/* Keywords Field */}
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter keywords (press Enter to add)"
                      {...field}
                      onKeyDown={handleKeyDown}
                      onChange={handleKeywordsChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Keywords can help others find your snippet more easily.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Public/Private Field */}
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="w-full md:max-w-sm">
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "true" : "false"}
                      onValueChange={(value) => {
                        field.onChange(value === "true");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Visibility" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border rounded-sm border-foreground/30">
                        <SelectItem key="true" value="true">
                          Public
                        </SelectItem>
                        <SelectItem key="false" value="false">
                          Private
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Render Keywords as Cards */}
          <div className="mt-4">
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex bg-foreground/30 items-center bg-blue-200 text-blue-700 rounded-lg px-3 py-1"
                  >
                    <small>{keyword}</small>
                    <span
                      onClick={() => handleRemoveKeyword(keyword)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <IconX size={16} />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="mt-4 text-error text-sm">{errorMessage}</div>
          )}

          <div className="flex item-center flex-row-reverse justify-start gap-xxs">
            <Button
              className="bg-red hover:bg-red/90 focus:border-2 focus:border-white text-background"
              type="submit"
              disabled={loading}
            >
              {loading ? "Wait..." : "Save Changes"}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="focus:border-2 focus:border-white"
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditSnippetDialog;
