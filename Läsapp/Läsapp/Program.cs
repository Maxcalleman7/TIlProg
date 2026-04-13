using System.IO;

static class Program
{
    public static void Main()
    {
        DateTime dateTime = DateTime.Now;

        string date = $"{dateTime.Year}";
        if (dateTime.Month < 10)
        {
            date += $"0{dateTime.Month}";
        }
        else
        {
            date += $"{dateTime.Month}";
        }
        if (dateTime.Day < 10)
        {
            date += $"0{dateTime.Day}";
        }
        else
        {
            date += $"{dateTime.Day}";
        }

        bool readingMsg= false;

        string msg="";

        List<string> list = new List<string>();

        //string logFilePath = $"C:\\Users\\cjj\\fldigi.files\\fldigi20260316.log";
        string logFilePath = $"../../../fldigi.files/fldigi{date}.log";

        using (var inputFile = new FileStream(
            logFilePath,
            FileMode.Open,
            FileAccess.Read,
            FileShare.ReadWrite))
        {
            using (var outputFile = new FileStream("fldigiLogCopy.txt", FileMode.Create))
            {
                var buffer = new byte[0x10000];
                int bytes;

                while ((bytes = inputFile.Read(buffer, 0, buffer.Length)) > 0)
                {
                    outputFile.Write(buffer, 0, bytes);
                }
            }
        }

        string writeFilePath = "MessageLog.txt";

        List<string> messages = new List<string>();

        using (StreamReader sr = new StreamReader("fldigiLogCopy.txt"))
        {
            while (sr.Peek() >= 0)
            {
                char c = (char)sr.Read();
                if (c == '>' && readingMsg == false) //när meddelandet i logen börjar, börja spara meddelandet
                {
                    readingMsg = true;
                    
                }
                else if (c == '<') //när meddelandet avslutar, sluta spara men spara avgränsaren
                {
                    readingMsg = false;
                    msg += c;
                    messages.Add(msg);
                    msg = "";
                }

                if (readingMsg == true) //när ett meddelande finns läses dess chars
                {
                    msg += c;
                }
            }
        }//TODO göra så att filen som läses rensas så meddelanden inte dupliceras

        using (StreamWriter sw = new StreamWriter(writeFilePath, true))
        {
            for (int i = 0; i < messages.Count; i++)
            {
                sw.WriteLine(messages[i]); //varje meddelande är 1 Line
            }
        }



    }

}