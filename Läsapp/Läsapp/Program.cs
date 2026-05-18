using System.Data.SQLite;
using System.IO;
using System.Linq.Expressions;
using System.Xml.Linq;

static class Program
{
    class SQLiteHandler
    {
        readonly string? _database_name;
        string _connection_string;
        SQLiteConnection _connection; 
        SQLiteCommand _command;
        private void Open()
        {
            if (_connection != null)
            {
                _connection.Open();
            }
        }


        private void Close()
        {
            if (_connection != null)
            {
                _connection.Close();
            }
        }

        public SQLiteHandler(string databaseName)
        {
            _database_name = databaseName;
            _connection_string = "URI=file:" + databaseName;
            _connection = new SQLiteConnection(_connection_string);
            _command = new SQLiteCommand(_connection);
        }

        public void AddMessage(string user, string msg)
        {
            Open();
            string sqlcommand = $"INSERT INTO msgLog(user, message) VALUES (@user, @msg);";
            _command.CommandText = sqlcommand;

            SQLiteParameter userParam = new SQLiteParameter("@user", System.Data.DbType.String);
            SQLiteParameter msgParam = new SQLiteParameter("@msg", System.Data.DbType.String);
            

            userParam.Value = user;
            msgParam.Value = msg;
            

            _command.Parameters.Add(userParam);
            _command.Parameters.Add(msgParam);
            

            _command.Prepare();
            _command.ExecuteNonQuery();
            Close();
        }

    }
    public static void Main()
    {
        bool readingMsg = false;

        string msg = "";

        DateTime dateTime = DateTime.Now;

        string date = $"{dateTime.Year}";//fldigi separerar loggar med datum, så den behöver dagens datum för att hitta loggen från samma dag
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

        

        List<string> list = new List<string>();

        //string logFilePath = $"C:\\Users\\cjj\\fldigi.files\\fldigi20260518.log";//för test
        string logFilePath = $"../../../fldigi.files/fldigi{date}.log";


        //skapar en kopia av fldigi-logen för att kunna läsa texten i den, ger errors om man inte har fldigi så är utkommenterad här
        /*
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
        */


        string writeFilePath = "MessageLog.txt";

        List<string> messages = new List<string>();

        using (StreamReader sr = new StreamReader("fldigiLogCopy.txt"))
        {
            while (sr.Peek() >= 0) //kollar så att nästa char inte är null
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
        }
        
        using (StreamWriter sw = new StreamWriter(writeFilePath, true))
        {
            for (int i = 0; i < messages.Count; i++)
            {
                sw.WriteLine(messages[i]); //varje meddelande är 1 Line, sparas som text
            }
        }
        //exempel på output:
        

        



        

        List<string> msgTexts = new List<string>();
        List<string> msgUsers = new List<string>();

        

        string user = "";
        string msgText = "";

        bool savedUser = false;
        bool readingUser = false;
        readingMsg=false;

        using (StreamReader sr = new StreamReader("MessageLog.txt")) //de sparade meddelandena sparas i en sqlite fil med meddelandet och den tänkta mottagaren.
        {
            while (sr.Peek() >= 0)
            {
                char c = (char)sr.Read();
                if (c == ':' && readingUser == false&&savedUser==false) //när usernamet börjar, läs in usernamnet
                {
                    readingUser = true;

                }
                else if (c == ' '&&readingUser==true) //när usernamet är slut, spara usern
                {
                    readingUser = false;
                    
                    msgUsers.Add(user);
                    savedUser = true;
                    user = "";
                }
                else if (readingUser == true) 
                {
                    user += c;
                }


                if (c == ':' &&savedUser==true && readingMsg==false)
                {
                    readingMsg = true;
                }
                else if (c == '<'&&readingMsg==true) //när meddelandet är slut, spara meddelandet
                {
                    readingMsg = false;

                    msgTexts.Add(msgText);
                    
                    msgText = "";
                    savedUser = false;
                }
                else if (readingMsg == true)
                {
                    msgText += c;
                }
            }
               
        }

        SQLiteHandler db = new SQLiteHandler("msgs.db");

        bool running = true;

        while (running)
        {
            for (int i = 0; i < msgUsers.Count; i++)
            {
                db.AddMessage(msgUsers[i], msgTexts[i]);
            }
            running = false;
        }


    }
    
}
