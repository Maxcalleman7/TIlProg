using System;
using System.Collections.Generic;
using System.Text;

namespace Läsapp
{
    internal class StreamReader
    {
        public string _logFilePath {  get; private set; }
        public StreamReader(string logFilePath)
        {
            _logFilePath = logFilePath;
        }

        public static string ReadLog(string logFilePath)
        {
            string message = "";
            

            return message;
        }
    }
}
