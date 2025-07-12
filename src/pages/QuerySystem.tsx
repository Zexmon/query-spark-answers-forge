
import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface QAItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const QuerySystem = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [results, setResults] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  // Mock data for demonstration - replace with your Flask API calls
  const mockData: QAItem[] = [
    {
      id: 1,
      question: "What are the fundamental principles of public buying?",
      answer: "Transparency, competition, fairness, and value for money are the key principles of public procurement. These principles ensure that the procurement process is conducted in an open, competitive manner that provides the best value for public funds while maintaining integrity and accountability.",
      category: "Fundamental Principles"
    },
    {
      id: 2,
      question: "Why is transparency important in public procurement?",
      answer: "Transparency ensures fairness and builds trust in the procurement process by making all procedures visible to stakeholders. It prevents corruption, promotes accountability, and allows for public scrutiny of government spending decisions.",
      category: "Fundamental Principles"
    },
    // Add more mock data as needed
  ];

  // Initialize categories and data
  useEffect(() => {
    // In your actual implementation, replace this with API call to Flask backend
    // fetch('/api/categories').then(res => res.json()).then(setCategories);
    const uniqueCategories = ['All', ...new Set(mockData.map(item => item.category))];
    setCategories(uniqueCategories);
    setResults(mockData);
  }, []);

  // Search function - replace with actual API call to your Flask backend
  const handleSearch = async () => {
    setLoading(true);
    
    // Replace this with actual Flask API call
    // const response = await fetch(`/api/search?q=${query}&category=${selectedCategory}`);
    // const data = await response.json();
    
    // Mock search logic
    let filtered = mockData;
    
    if (query.trim()) {
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(query.toLowerCase()) ||
        item.answer.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setTimeout(() => {
      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    handleSearch();
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Procurement Knowledge Base
          </h1>
          <p className="text-muted-foreground text-lg">
            Search through procurement guidelines, policies, and best practices
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Query
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter your question about procurement..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by category:</span>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              Search Results ({results.length})
            </h2>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="space-y-4 pr-4">
              {results.map((item) => (
                <Card key={item.id} className="transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-lg leading-tight">
                        <MessageSquare className="h-4 w-4 inline mr-2 text-primary" />
                        {item.question}
                      </CardTitle>
                      <Badge variant="secondary" className="shrink-0">
                        {item.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {results.length === 0 && !loading && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No results found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search query or category filter
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default QuerySystem;
