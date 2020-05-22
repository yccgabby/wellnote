using Microsoft.Azure.CognitiveServices.Language.TextAnalytics;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Program
    {
        private static readonly string key = Values.getKey();
        private static readonly string endpoint = Values.getEndpoint();

        static void Main(string[] args)
        {
            var db_client = new MongoClient(Values.GetDatabase());
            var db = db_client.GetDatabase("wellnote-entries");
            var res_collection = db.GetCollection<BsonDocument>("analysis");
            var audio_collection = db.GetCollection<BsonDocument>("audio");
            var links = audio_collection.Find(new BsonDocument()).ToList();
            var link = links[links.Count - 1];
            string filename = @"C:\Users\grace\source\repos\ConsoleApp1\ConsoleApp1\" + link.GetValue("date").ToString() + ".wav";

            using (var client = new WebClient())
            {
                client.DownloadFile(link.GetValue("audio").ToString(), filename);
            }

            AudioToText audio = new AudioToText();
            audio.RecognizeSpeech(filename).Wait();
            List<string> sentences = audio.sentences;

            SentimentAnalysis analyzer = new SentimentAnalysis();
        
            StringBuilder transcript = new StringBuilder();
            foreach (string sentence in sentences)
            {
                analyzer.Analyze(endpoint, key, sentence).Wait();
                transcript.Append(sentence);
                transcript.Append(" ");
            }

            SentimentAnalysis overall_analyzer = new SentimentAnalysis();
            overall_analyzer.Analyze(endpoint, key, transcript.ToString()).Wait();

            KeyPhraseExtraction phrases = new KeyPhraseExtraction();
            phrases.Extract(endpoint, key, sentences).Wait();

            var document = new BsonDocument { { "date", link.GetValue("date") }, { "transcript", transcript.ToString() }, { "score", overall_analyzer.total }, { "key_phrases", phrases.array }, { "sentences", analyzer.array } };
            res_collection.InsertOne(document);

            //Console.Write("Press any key to exit.");
            //Console.ReadKey();
        }
    }
}
