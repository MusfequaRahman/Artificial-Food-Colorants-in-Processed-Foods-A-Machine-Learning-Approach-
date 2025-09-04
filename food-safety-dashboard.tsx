import React, { useState, useEffect } from 'react';
import { Upload, AlertTriangle, CheckCircle, XCircle, Eye, FileText, Palette } from 'lucide-react';

const FoodSafetyDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data for demonstration
  const mockResults = [
    {
      id: 1,
      productName: "Red Velvet Cake Mix",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2ZmZWJlZSIvPjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2RjMjYyNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+UmVkIFZlbHZldCBDYWtlPC90ZXh0Pjwvc3ZnPg==",
      flaggedColorants: ["Red 40", "Yellow 6"],
      detectedText: "Contains: Red 40, Yellow 6, Artificial Flavors",
      riskLevel: "high",
      confidence: 0.89,
      timestamp: "2025-06-16T10:30:00Z"
    },
    {
      id: 2,
      productName: "Natural Fruit Juice",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Y0ZjRmNSIvPjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+RnJ1aXQgSnVpY2U8L3RleHQ+PC9zdmc+",
      flaggedColorants: [],
      detectedText: "100% Natural Fruit Juice, No Artificial Colors",
      riskLevel: "low",
      confidence: 0.95,
      timestamp: "2025-06-16T10:25:00Z"
    },
    {
      id: 3,
      productName: "Orange Candy",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2ZlZjNjNyIvPjx0ZXh0IHg9IjEwMCIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2Y1OWUwYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+T3JhbmdlIENhbmR5PC90ZXh0Pjwvc3ZnPg==",
      flaggedColorants: ["Yellow 5", "Red 3"],
      detectedText: "Ingredients: Sugar, Yellow 5, Red 3, Natural Flavors",
      riskLevel: "medium",
      confidence: 0.92,
      timestamp: "2025-06-16T10:20:00Z"
    }
  ];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis result
      const mockResult = {
        productName: file.name.replace(/\.[^/.]+$/, ""),
        image: URL.createObjectURL(file),
        flaggedColorants: ["Red 40", "Yellow 6"],
        detectedText: "Mock detected text from uploaded image",
        riskLevel: "medium",
        confidence: 0.87,
        timestamp: new Date().toISOString()
      };
      
      setAnalysisResult(mockResult);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'high': return <XCircle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'low': return <CheckCircle className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Food Safety BD</h1>
                <p className="text-sm text-gray-600">AI-Powered Food Colorant Detection</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Protecting Bangladesh's Food Safety</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Upload className="w-6 h-6 mr-3 text-blue-500" />
            Upload Product Image
          </h2>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg text-gray-600 mb-2">Click to upload product image</p>
              <p className="text-sm text-gray-500">Supports JPG, PNG, WebP files</p>
            </label>
          </div>

          {loading && (
            <div className="mt-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Analyzing image...</span>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Analysis Result */}
        {analysisResult && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Result</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img
                  src={analysisResult.image}
                  alt={analysisResult.productName}
                  className="w-full h-64 object-cover rounded-lg border border-gray-200"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{analysisResult.productName}</h3>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(analysisResult.riskLevel)}`}>
                    {getRiskIcon(analysisResult.riskLevel)}
                    <span className="ml-2 capitalize">{analysisResult.riskLevel} Risk</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Flagged Colorants
                  </h4>
                  {analysisResult.flaggedColorants.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.flaggedColorants.map((colorant, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          {colorant}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-green-600">No harmful colorants detected</p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Detected Text
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{analysisResult.detectedText}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Confidence Score</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${analysisResult.confidence * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{Math.round(analysisResult.confidence * 100)}% confident</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Analyses */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Analyses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResults.map((result) => (
              <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <img
                  src={result.image}
                  alt={result.productName}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">{result.productName}</h3>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mb-2 ${getRiskColor(result.riskLevel)}`}>
                  {getRiskIcon(result.riskLevel)}
                  <span className="ml-1 capitalize">{result.riskLevel}</span>
                </div>
                {result.flaggedColorants.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-600 mb-1">Flagged:</p>
                    <div className="flex flex-wrap gap-1">
                      {result.flaggedColorants.map((colorant, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                          {colorant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  {new Date(result.timestamp).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-gray-600">Products Analyzed</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">342</div>
            <div className="text-gray-600">High Risk Detected</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">465</div>
            <div className="text-gray-600">Medium Risk</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">440</div>
            <div className="text-gray-600">Safe Products</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Food Safety BD</h3>
            <p className="text-gray-400 mb-4">
              Empowering consumers with AI-powered food safety detection for a healthier Bangladesh
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:text-blue-400">About</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoodSafetyDashboard;