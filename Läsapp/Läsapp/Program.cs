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

        string msgs="";

        string logFilePath = $"C:\\Users\\cjj\\fldigi.files\\fldigi20260316.log";

        string writeFilePath = "MessageLog.txt";

        List<string> messages = new List<string>();

        using (StreamReader sr = new StreamReader(logFilePath))
        {
            while (sr.Peek() >= 0)
            {
                char c = (char)sr.Read();
                if (c == '=' && readingMsg == false) //när meddelandet i logen börjar, börja spara meddelandet
                {
                    readingMsg = true;
                }
                else if(c=='=') //när meddelandet avslutar, sluta spara men spara avgränsaren
                {
                    readingMsg = false;
                    msgs += c;
                }
                if (readingMsg == true)
                {
                    msgs += c;
                }
            }
        }

    }

}