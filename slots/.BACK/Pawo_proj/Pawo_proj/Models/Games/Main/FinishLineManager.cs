namespace Pawo_proj.Models.Games.Main
{
    public class FinishLineManager
    {
        private List<int> finishlines = new List<int> { 0, 5, 10, 20, 100, 1000 };
        private List<int> probabilities = new List<int> { 850, 980, 990, 995, 998, 1000 };
        private Random rand = new Random();

        public FinishLineManager() { }
        public int getFinish()
        {
            int listcount = this.probabilities.Count();
            int random = rand.Next(this.probabilities[listcount - 1]);
            for(int i = 0; i < listcount; i++)
            {
                if(random <= finishlines[i])
                {
                    return finishlines[i];
                }
            }
            return 0;
        }
    }
}
