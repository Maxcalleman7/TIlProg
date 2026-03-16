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

        string logFilePath = $"\"C:\\Users\\cjj\\fldigi.files\\fldigi{date}.log\"";

        string writeFilePath = "MessageLog.txt";

        List<string> messages = new List<string>();


    }

}