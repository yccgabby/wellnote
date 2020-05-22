using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class AudioToText
    {
        public List<string> sentences;

        public AudioToText()
        {
            sentences = new List<string>();
        }

        public async Task RecognizeSpeech(string filename)
        {
            var stopRecognition = new TaskCompletionSource<int>();
            var config = SpeechConfig.FromSubscription("d5f4078e7dae47b7a62eca019c5cc1b4", "westus");

            using (var audioInput = AudioConfig.FromWavFileInput(filename))
            {
                using (var recognizer = new SpeechRecognizer(config, audioInput))
                {
                    recognizer.Recognized += (s, e) =>
                    {
                        if (e.Result.Reason == ResultReason.RecognizedSpeech)
                        {
                            //Console.WriteLine($"RECOGNIZED: Text={e.Result.Text}");
                            sentences.Add(e.Result.Text);
                        }
                        else if (e.Result.Reason == ResultReason.NoMatch)
                        {
                            Console.WriteLine($"NOMATCH: Speech could not be recognized.");
                        }
                    };

                    recognizer.Canceled += (s, e) =>
                    {
                        Console.WriteLine($"CANCELED: Reason={e.Reason}");

                        if (e.Reason == CancellationReason.Error)
                        {
                            Console.WriteLine($"CANCELED: ErrorCode={e.ErrorCode}");
                            Console.WriteLine($"CANCELED: ErrorDetails={e.ErrorDetails}");
                            Console.WriteLine($"CANCELED: Did you update the subscription info?");
                        }

                        stopRecognition.TrySetResult(0);
                    };

                    //recognizer.SessionStarted += (s, e) =>
                    //{
                    //    Console.WriteLine("\n    Session started event.");
                    //};

                    //recognizer.SessionStopped += (s, e) =>
                    //{
                    //    Console.WriteLine("\n    Session stopped event.");
                    //    Console.WriteLine("\nStop recognition.");
                    //    stopRecognition.TrySetResult(0);
                    //};

                    await recognizer.StartContinuousRecognitionAsync().ConfigureAwait(false);
                    Task.WaitAny(new[] { stopRecognition.Task });
                    await recognizer.StopContinuousRecognitionAsync().ConfigureAwait(false);
                }
            }
        }
    }
}
