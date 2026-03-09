static class Program
{
    public static void Main()
    {
        Console.WriteLine("log in\nusername:");
        string userName = Console.ReadLine().ToUpper();

        

        Console.WriteLine("Password:");
        string password =Console.ReadLine();

        

        
        string message = "";

        string morseMessage = "";

        string filepath = "Messages\\Message.txt";

        Console.WriteLine("enter message");
        message = Console.ReadLine().ToUpper();

        //string messageTime=($"{DateTime.Now.Hour}:{DateTime.Now.Minute}");

        morseMessage = "Filetype: Flipper Music Format\r\nVersion: 0 \r\nBPM: 480 \r\nDuration: 8\r\nOctave: 4\r\nNotes:2P..," + Translate($"USERNAME:{userName} ") +","+ Translate($"MESSAGE:{message}");

        File.WriteAllText(filepath, morseMessage);
    }

    static string Translate(string message)
    {
        string _ = "8P,"; //signalspace

        string dot = "8C,";

        string dash = "4C.,";

        string letterspace = "4P.,";

        string wordspace = "2P..,";

        string A = dot + _ + dash;
        string B = dash + _ + dot + _ + dot + _ + dot;
        string C = dash + _ + dot + _ + dash + _ + dot;
        string D = dash + _ + dot + _ + dot;
        string E = dot;
        string F = dot + _ + dot + _ + dash + _ + dot;
        string G = dash + _ + dash + _ + dot;
        string H = dot + _ + dot + _ + dot + _ + dot;
        string I = dot + _ + dot;
        string J = dot + _ + dash + _ + dash + _ + dash;
        string K = dash + _ + dot + _ + dash;
        string L = dot + _ + dash + _ + dot + _ + dot;
        string M = dash + _ + dash;
        string N = dash + _ + dot;
        string O = dash + _ + dash + _ + dash;
        string P = dot + _ + dash + _ + dash + _ + dot;
        string Q = dash + _ + dash + _ + dot + _ + dash;
        string R = dot + _ + dash + _ + dot;
        string S = dot + _ + dot + _ + dot;
        string T = dash;
        string U = dot + _ + dot + _ + dash;
        string V = dot + _ + dot + _ + dot + _ + dash;
        string W = dot + _ + dash + _ + dash;
        string X = dash + _ + dot + _ + dot + _ + dash;
        string Y = dash + _ + dot + _ + dash + _ + dash;
        string Z = dash + _ + dash + _ + dot + _ + dot;

        string one = dot + _ + dash + _ + dash + _ + dash + _ + dash;
        string two = dot + _ + dot + _ + dash + _ + dash + _ + dash;
        string three = dot + _ + dot + _ + dot + _ + dash + _ + dash;
        string four= dot + _ + dot + _ + dot + _ + dot + _ + dash;
        string five = dot + _ + dot + _ + dot + _ + dot + _ + dot;
        string six = dash + _ + dot + _ + dot + _ + dot + _ + dot;
        string seven = dash + _ + dash + _ + dot + _ + dot + _ + dot;
        string eight = dash + _ + dash + _ + dash + _ + dot + _ + dot;
        string nine = dash + _ + dash + _ + dash + _ + dash + _ + dot;
        string zero = dash + _ + dash + _ + dash + _ + dash + _ + dash;

        string comma = dash + _ + dash + _ + dot + _ + dot + _ + dash + _ + dash;
        string questionmark = dot + _ + dot + _ + dash + _ + dash + _ + dot + _ + dot;
        string colon = dash + _ + dash + _ + dash + _ + dot + _ + dot + _ + dot;
        string period = dot + _ + dash + _ + dot + _ + dash + _ + dot + _ + dash;
        


        Dictionary<char, string> translator = new Dictionary<char, string>
        {
            ['A'] = A,
            ['B'] = B,
            ['C'] = C,
            ['D'] = D,
            ['E'] = E,
            ['F'] = F,
            ['G'] = G,
            ['H'] = H,
            ['I'] = I,
            ['J'] = J,
            ['K'] = K,
            ['L'] = L,
            ['M'] = M,
            ['N'] = N,
            ['O'] = O,
            ['P'] = P,
            ['Q'] = Q,
            ['R'] = R,
            ['S'] = S,
            ['T'] = T,
            ['U'] = U,
            ['V'] = V,
            ['W'] = W,
            ['X'] = X,
            ['Y'] = Y,
            ['Z'] = Z,

            ['1'] = one,
            ['2'] = two,
            ['3'] = three,
            ['4'] = four,
            ['5'] = five,
            ['6'] = six,
            ['7'] = seven,
            ['8'] = eight,
            ['9'] = nine,
            ['0'] = zero,




            [' '] = wordspace,

            [','] = comma,
            ['?']=questionmark,
            [':']=colon,
            ['.']=period,
            
        };

        message = message.ToUpper();

        string morseMessage = "";

        
        for (int i = 0; i < message.Length; i++)
        {
            char c = message[i];

            if (translator.ContainsKey(c))
            {
                morseMessage += (translator[c]);
                if (i < message.Length - 1 && message[i + 1] != ' ')
                {
                    morseMessage += (letterspace);
                }
            }
        }
        if (morseMessage.Length > 0)
        {
            morseMessage = morseMessage.Remove(morseMessage.Length - 1);
        }
        return morseMessage;
    }

}