using Microsoft.Azure.CognitiveServices.Language.TextAnalytics;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class KeyPhraseExtraction
    {
        public BsonArray array;

        public KeyPhraseExtraction()
        {
            array = new BsonArray();
        }

        public async Task Extract(string endpoint, string key, List<string> sentences)
        {
            var credentials = new ApiKeyServiceClientCredentials(key);
            var client = new TextAnalyticsClient(credentials)
            {
                Endpoint = endpoint
            };

            StringBuilder input = new StringBuilder();

            foreach (string sentence in sentences)
            {
                input.Append(sentence);
            }

            var result = client.KeyPhrases(input.ToString());

            //Console.WriteLine("Key phrases:");

            foreach (string keyphrase in result.KeyPhrases)
            {
            //    Console.WriteLine($"\t{keyphrase}");
                array.Add(keyphrase);
            }
        }
    }
}
