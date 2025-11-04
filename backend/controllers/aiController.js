const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();
const { conceptExplainPrompt, questionAnswerPrompt } = require('../utils/prompt.js');

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateInterviewQuestions = async (req, res) => {
  try {
    console.log("AI Request received:", req.body);
    console.log("User:", req.user?.email);
    
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    console.log("Generating questions for:", { role, experience, topicsToFocus, numberOfQuestions });
    
    // Temporary mock response for testing
    const mockQuestions = [];
    const topics = topicsToFocus.split(',').map(t => t.trim());
    
    for (let i = 0; i < numberOfQuestions; i++) {
      const topic = topics[i % topics.length];
      const difficulties = ["Easy", "Medium", "Hard"];
      mockQuestions.push({
        id: i + 1,
        question: "What is your experience with " + topic + " in " + role + " development?",
        answer: topic + " is a key technology for " + role + " developers. It involves understanding core concepts, best practices, and practical implementation.",
        difficulty: difficulties[i % 3]
      });
    }
    
    const mockResponse = {
      questions: mockQuestions
    };
    
    console.log("Mock response generated:", mockResponse);
    res.status(200).json(mockResponse);
    
  } catch (error) {
    console.error("AI generation error:", error);
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

const generateConceptExplanation = async (req, res) => {
  try {
    console.log("Explanation request received:", req.body);
    
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Temporary mock response for concept explanation
    const mockExplanation = {
      explanation: "This is a fundamental concept that involves understanding key principles and best practices. It requires knowledge of core technologies, implementation patterns, and real-world applications. Key areas to focus on include: theoretical foundations, practical implementation, common pitfalls to avoid, and industry best practices.",
      keyPoints: [
        "Understanding the fundamental principles",
        "Practical implementation techniques", 
        "Common use cases and applications",
        "Best practices and optimization strategies"
      ],
      examples: [
        "Real-world implementation example",
        "Code snippet demonstration",
        "Industry use case scenario"
      ]
    };
    
    console.log("Mock explanation generated for question:", question);
    res.status(200).json(mockExplanation);
    
  } catch (error) {
    console.error("AI explanation error:", error);
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation
};