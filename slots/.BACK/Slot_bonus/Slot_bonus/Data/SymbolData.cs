using Slot_bonus.Models.Helper_types;

namespace Slot_bonus.Data
{
    public static class SymbolData
    {
        private static Random random = new Random();
        public static int MaxSymbolValue = 20;
        public static int MinSymbolValue = 1;
        public static int MinSniperValue = 2;
        public static Dictionary<int,int> probabilities = new Dictionary<int,int>{
             { 0, 900 },
             { 1, 985 },
             { 2, 990 },
             { 3, 995 },
             { 4, 1000 },
        };
        public static int maxtargetsforsniper = 8;
        public static int mintargetsforsniper = 3;

        public static int GenerateRandomValue()
        {
            Random random = new Random();
            double randomNumber = random.NextDouble();
            double cumulativeProbability = 0.0;
            int max = 20;
            int result = max;

            for (int i = 1; i <= max; i++)
            {
                double probability = Math.Pow(0.5, i - 1);
                cumulativeProbability += probability;

                if (randomNumber < cumulativeProbability)
                {
                    result = i;
                    break;
                }
            }

            return result;
        }
        public static int GenerateRandomId()
        {
            double randomNumber = random.NextDouble() * 1000;
            int result = 0;
            foreach (var kvp in probabilities)
            {
                if (randomNumber <= kvp.Value)
                {
                    result = kvp.Key;
                    break;
                }
            }

            return result;
        }

        public static SymbolInfo Generatesymbol()
        {
            int value = GenerateRandomValue();
            int id = GenerateRandomId();
            return new SymbolInfo(id, value);
        }
        public static SymbolInfo Generetastartingsymbol()
        {
            int value = GenerateRandomValue();
            int id = 1;
            return new SymbolInfo(id, value);
        }
    }
}
