using Microsoft.Azure.CognitiveServices.Language.TextAnalytics;
using Microsoft.Azure.CognitiveServices.Language.TextAnalytics.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    public class SentimentAnalysis
    {
        public BsonArray array;
        public double total;

        public SentimentAnalysis() {
            array = new BsonArray();
        }

        public async Task Analyze(string endpoint, string key, string sentence)
        {
            var credentials = new ApiKeyServiceClientCredentials(key);
            var client = new TextAnalyticsClient(credentials)
            {
                Endpoint = endpoint
            };

            var result = client.Sentiment(sentence, "en");

            array.Add(new BsonDocument { { "sentence", sentence }, { "score", result.Score} });
            total += (double) result.Score;
            Console.WriteLine($"Sentiment Score: {result.Score:0.00}");
        }
    }
}
