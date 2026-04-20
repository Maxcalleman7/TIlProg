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

        string logFilePath = $"C:\\Users\\cjj\\fldigi.files\\fldigi20260316.log";

        string writeFilePath = "MessageLog.txt";

        List<string> messages = new List<string>();

        using (StreamReader sr = new StreamReader(logFilePath))
        {
            while (sr.Peek() >= 0)
            {
                char c = (char)sr.Read();
                if (c == '>' && readingMsg == false) //när meddelandet i logen börjar, börja spara meddelandet
                {
                    readingMsg = true;
                    msg += c;
                }
                else if(c=='<') //när meddelandet avslutar, sluta spara
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
            for(int i = 0; i < messages.Count; i++)
            {
                sw.WriteLine(messages[i]); //varje meddelande är 1 Line
            }
            
            
        }



     }

}